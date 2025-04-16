import type { FeedItem } from "./types"
import { getSettings } from "./settings-service"
import { parseStringPromise } from "xml2js"

export async function fetchFeedItems(sources: string[], customUrls: string[] = []): Promise<FeedItem[]> {
  try {
    const settings = await getSettings()
    const rsshubUrl = settings?.rsshubUrl || "http://qcks8sg8440os8o0s8cssook.35.186.152.46.sslip.io"
    const maxItems = settings?.maxItems || 10

    // Only fetch Twitter (x) feeds, ignore all other sources
    let feedPromises: Promise<FeedItem[]>[] = [];
    const twitterSources = sources.filter((src) => src === "x");
    for (const source of twitterSources) {
      const endpoints = getRsshubEndpoint(source, rsshubUrl);
      for (const endpoint of endpoints) {
        feedPromises.push(fetchSourceFeed(source, endpoint, maxItems));
      }
    }

    // Ignore customUrls and all other sources

    const feedResults = await Promise.allSettled(feedPromises)

    // Combine and sort all feed items by date
    const allItems: FeedItem[] = []

    feedResults.forEach((result) => {
      if (result.status === "fulfilled") {
        allItems.push(...result.value)
      }
    })

    // Sort by publication date (newest first)
    return allItems.sort((a, b) => {
      if (!a.pubDate) return 1
      if (!b.pubDate) return -1
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    })
  } catch (error) {
    console.error("Error fetching feed items:", error)
    return []
  }
}

// Accept endpoint as a string (not array) for each fetch
async function fetchSourceFeed(source: string, endpoint: string, maxItems: number): Promise<FeedItem[]> {
  try {
    // Fetch the RSS feed
    const response = await fetch(endpoint, { next: { revalidate: 60 } })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${source} feed: ${response.status}`)
    }

    const xmlData = await response.text()

    // Parse XML to JSON
    const result = await parseStringPromise(xmlData, { explicitArray: false })

    if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
      return []
    }

    // Extract profile image once per feed
    const profileImage = result.rss.channel.image?.url;

    // Ensure items is an array
    const items = Array.isArray(result.rss.channel.item) ? result.rss.channel.item : [result.rss.channel.item]

    // Map RSS items to our FeedItem format
    return items.slice(0, maxItems).map((item: any, index: number) => {
      // Extract media (images/videos) from description
      let media: string[] = [];
      if (item.description) {
        // Images
        const imgRegex = /<img[^>]+src=["']([^"'>]+)["']/g;
        let match;
        while ((match = imgRegex.exec(item.description)) !== null) {
          let imgUrl = match[1];
          // Remove &name=... or &name=orig from the URL, keep up to ?format=xxx
          imgUrl = imgUrl.replace(/([?&]format=[a-zA-Z0-9]+).*$/, '$1');
          media.push(imgUrl);
        }
        // Videos
        const videoRegex = /<video[^>]+src=["']([^"'>]+)["']/g;
        while ((match = videoRegex.exec(item.description)) !== null) {
          media.push(match[1]);
        }
      }
      // Remove duplicates
      media = [...new Set(media)];

      // Use channel image as authorAvatar unless a more specific one is present
      let authorAvatar = profileImage;
      if (item['media:thumbnail']?.url) {
        authorAvatar = item['media:thumbnail'].url;
      } else if (item['media:content']?.url) {
        authorAvatar = item['media:content'].url;
      }

      const feedItem: FeedItem = {
        id: `${source}-${index}-${Date.now()}`,
        title: item.title,
        content: item.description || "",
        author: item["dc:creator"] || "",
        pubDate: item.pubDate,
        link: item.link,
        source: source,
        media,
        authorAvatar,
      };

      // Add source-specific data
      if (source === "tradingview") {
        // Extract price and symbol from title or description
        const priceMatch = item.title?.match(/\$([0-9,]+)/)
        if (priceMatch) {
          feedItem.price = priceMatch[0]
        }

        const symbolMatch = item.title?.match(/([A-Z]+)\/([A-Z]+)/)
        if (symbolMatch) {
          feedItem.symbol = symbolMatch[0]
        }
      }

      return feedItem
    })
  } catch (error) {
    console.error(`Error fetching ${source} feed:`, error)
    return []
  }
}

async function fetchCustomFeed(url: string, maxItems: number): Promise<FeedItem[]> {
  try {
    // Extract domain for source name
    const domain = new URL(url).hostname.replace("www.", "")

    // Fetch the RSS feed
    const response = await fetch(url, { next: { revalidate: 60 } })

    if (!response.ok) {
      throw new Error(`Failed to fetch custom feed: ${response.status}`)
    }

    const xmlData = await response.text()

    // Parse XML to JSON
    const result = await parseStringPromise(xmlData, { explicitArray: false })

    if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
      return []
    }

    // Ensure items is an array
    const items = Array.isArray(result.rss.channel.item) ? result.rss.channel.item : [result.rss.channel.item]

    // Map RSS items to our FeedItem format
    return items.slice(0, maxItems).map((item: any, index: number) => {
      return {
        id: `custom-${domain}-${index}-${Date.now()}`,
        title: item.title,
        content: item.description || "",
        author: item["dc:creator"] || result.rss.channel.title || domain,
        pubDate: item.pubDate,
        link: item.link,
        source: `custom-${domain}`,
      }
    })
  } catch (error) {
    console.error(`Error fetching custom feed:`, error)
    return []
  }
}

function getRsshubEndpoint(source: string, rsshubUrl: string): string[] {
  switch (source) {
    case "reddit":
      return [`${rsshubUrl}/reddit/user/spez`]
    case "facebook":
      return [`${rsshubUrl}/facebook/page/meta`]
    case "x":
      // Default Twitter users: elonmusk, vitalik, openai, google, realDonaldTrump
      // const params = "?readable=1&authorNameBold=1&showAuthorInTitle=1&showAuthorInDesc=1&showQuotedAuthorAvatarInDesc=1&showAuthorAvatarInDesc=1&showEmojiForRetweetAndReply=1&showRetweetTextInTitle=0&addLinkForPics=1&showTimestampInDescription=1&showQuotedInTitle=1&heightOfPics=150";
      const params = ''
      return [
        `${rsshubUrl}/twitter/user/elonmusk${params}`,
        `${rsshubUrl}/twitter/user/VitalikButerin${params}`,
        `${rsshubUrl}/twitter/user/openai${params}`,
        `${rsshubUrl}/twitter/user/google${params}`,
        `${rsshubUrl}/twitter/user/realDonaldTrump${params}`
      ]
    case "tradingview":
      return [`${rsshubUrl}/tradingview/ticker/BTC.D`]
    case "bbc":
      return [`${rsshubUrl}/bbc/news`]
    default:
      throw new Error(`Unknown source: ${source}`)
  }
}
