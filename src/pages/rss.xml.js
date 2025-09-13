import { getCollection } from 'astro:content'
import { SITE } from '~/config'
import { generateRSS20, generateAtom10 } from '~/lib/feed'

export async function GET(context) {
  const posts = await getCollection('posts')
  const sortedPosts = posts.sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf())

  const siteUrl = context.site?.toString() || SITE.website
  const config = {
    title: SITE.title,
    description: SITE.description,
    siteUrl,
    author: SITE.author,
    posts: sortedPosts,
  }

  // 根据查询参数决定格式：?format=atom 返回Atom 1.0，否则返回RSS 2.0
  const url = new URL(context.request.url)
  const format = url.searchParams.get('format')

  if (format === 'atom') {
    return new Response(generateAtom10(config), {
      headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
    })
  }

  // 默认返回RSS 2.0
  return new Response(generateRSS20(config), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
