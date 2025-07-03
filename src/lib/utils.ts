import type { CollectionEntry } from 'astro:content'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { PostType } from '~/types'
import { POSTS_CONFIG } from '~/config'

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes))
}

// 随笔按时间排序
export function postsSort(posts: CollectionEntry<'posts'>[]) {
  return posts.sort((a, b) => {
    const dateA = a.data.updatedDate || a.data.pubDate
    const dateB = b.data.updatedDate || b.data.pubDate
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })
}

// 日期格式化
export const formatDate = (date: Date) =>
  date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

/**
 * 布局选择逻辑 / Post layout selection logic
 * @description 根据用户配置选择文章布局，用户指定优先，否则使用默认布局 / Select post layout based on user configuration, user-specified takes priority, otherwise use default layout
 * @param {any} frontmatter - 文章 frontmatter 数据 / Post frontmatter data
 * @returns {PostLayout} 选定的布局类型 / Selected layout type
 */
export function getPostType(frontmatter: any): PostType {
  // 用户显式指定布局，优先级最高
  if (frontmatter.postType) {
    return frontmatter.postType
  }

  // 使用配置中的默认布局
  return POSTS_CONFIG.defaultPostType
}
