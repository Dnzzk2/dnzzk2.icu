import type { CollectionEntry } from 'astro:content'

export interface RSSConfig {
  title: string
  description: string
  siteUrl: string
  author: string
  posts: CollectionEntry<'posts'>[]
}

// XML转义函数
export function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

// 获取文章完整内容
function getFullContent(post: CollectionEntry<'posts'>): string {
  // 返回文章的完整 markdown 内容
  // RSS 阅读器通常可以处理 markdown 格式
  // 或者可以显示为纯文本
  return post.body || post.data.description || ''
}

// 生成RSS 2.0格式
export function generateRSS20(config: RSSConfig): string {
  const { title, description, siteUrl, author, posts } = config
  const lastBuildDate = new Date().toUTCString()

  const items = posts
    .map((post) => {
      const postUrl = `${siteUrl}posts/${post.id}/`
      const pubDate = new Date(post.data.pubDate).toUTCString()
      const fullContent = getFullContent(post)

      return `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.data.description || ''}]]></description>
      <content:encoded><![CDATA[${fullContent}]]></content:encoded>
      <author>${escapeXml(post.data.author || author)}</author>
      ${post.data.tags ? post.data.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('') : ''}
    </item>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/rss/rss-styles.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(title)}</title>
    <description>${escapeXml(description)}</description>
    <link>${siteUrl}</link>
    <language>zh-CN</language>
    <managingEditor>${escapeXml(author)}</managingEditor>
    <webMaster>${escapeXml(author)}</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`
}

// 生成Atom 1.0格式
export function generateAtom10(config: RSSConfig): string {
  const { title, description, siteUrl, author, posts } = config
  const updated = new Date().toISOString()

  const entries = posts
    .map((post) => {
      const postUrl = `${siteUrl}posts/${post.id}/`
      const published = new Date(post.data.pubDate).toISOString()
      const updatedDate = post.data.updatedDate ? new Date(post.data.updatedDate).toISOString() : published
      const fullContent = getFullContent(post)

      return `
  <entry>
    <title>${escapeXml(post.data.title)}</title>
    <link href="${postUrl}"/>
    <id>${postUrl}</id>
    <published>${published}</published>
    <updated>${updatedDate}</updated>
    <summary type="text">${escapeXml(post.data.description || '')}</summary>
    <content type="html"><![CDATA[${fullContent}]]></content>
    <author>
      <name>${escapeXml(post.data.author || author)}</name>
    </author>
    ${post.data.tags ? post.data.tags.map((tag) => `<category term="${escapeXml(tag)}"/>`).join('') : ''}
  </entry>`
    })
    .join('')

  return `<?xml version="1.0" encoding="utf-8"?>
<?xml-stylesheet type="text/xsl" href="/rss/atom-styles.xsl"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(title)}</title>
  <subtitle>${escapeXml(description)}</subtitle>
  <link href="${siteUrl}"/>
  <link href="${siteUrl}atom.xml" rel="self"/>
  <updated>${updated}</updated>
  <id>${siteUrl}</id>
  <author>
    <name>${escapeXml(author)}</name>
  </author>
  ${entries}
</feed>`
}
