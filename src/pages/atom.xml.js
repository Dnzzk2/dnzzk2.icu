import { getCollection } from 'astro:content'
import { SITE } from '~/config'
import { generateAtom10 } from '~/lib/feed'

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

  return new Response(generateAtom10(config), {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  })
}
