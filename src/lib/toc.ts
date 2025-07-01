import type { MarkdownHeading } from 'astro'

export function filterHeadings(headings: MarkdownHeading[], maxDepth = 4): (MarkdownHeading & { order: number })[] {
  return headings
    .filter((h) => h.depth <= maxDepth && h.text.trim())
    .map((h, idx) => ({
      ...h,
      text: h.text.replace(/\s*[Hh][1-6]$/g, ''),
      order: idx + 1,
    }))
}
