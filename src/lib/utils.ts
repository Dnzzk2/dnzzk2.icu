import type { CollectionEntry } from 'astro:content'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
