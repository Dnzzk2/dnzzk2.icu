'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '~/lib/utils'
import Tooltip, { TooltipProvider } from './Tooltip'

interface ContributionDay {
  date: string
  count: number
  level: 0
}

interface YearData {
  contributions: ContributionDay[]
  total: {
    lastYear: number
  }
}

interface ErrorData {
  error: string
}

interface Props {
  username: string
  tooltipEnabled: boolean
}

async function fetchContributions(username: string): Promise<YearData> {
  const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
  const data: YearData | ErrorData = await response.json()

  if (!response.ok) {
    throw Error(`Fetching GitHub contribution data for "${username}" failed: ${(data as ErrorData).error}`)
  }

  return data as YearData
}

export default function GithubContributions({ username, tooltipEnabled }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<YearData | null>({
    contributions: Array.from({ length: 371 }, (_, index) => ({
      date: new Date(Date.now() - (371 - index) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      count: 0,
      level: 0,
    })),
    total: {
      lastYear: 0,
    },
  })
  const [error, setError] = useState<Error | null>(null)
  const [errorVisible, setErrorVisible] = useState(false)

  const fetchData = useCallback(() => {
    setError(null)
    fetchContributions(username)
      .then(setData)
      .catch(() => {
        setErrorVisible(true)
        // 生成ERROR格子数据
        const errorContributions = Array.from({ length: 371 }, (_, index) => {
          const weekIndex = Math.floor(index / 7)
          const dayIndex = index % 7

          // ERROR图案 (5行×19列，每个字母间隔1格)
          const errorPattern = [
            [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
          ]

          // 计算居中位置
          const patternStartWeek = Math.floor((53 - 19) / 2)
          const patternStartRow = Math.floor((7 - 5) / 2)
          const relativeWeek = weekIndex - patternStartWeek
          const relativeRow = dayIndex - patternStartRow

          let count = 0
          if (relativeWeek >= 0 && relativeWeek < 19 && relativeRow >= 0 && relativeRow < 5) {
            count = errorPattern[relativeRow]?.[relativeWeek] === 1 ? 10 : 0 // 10表示最深色
          }

          return {
            date: '1',
            count,
            level: 0,
          } as ContributionDay
        })

        setData({
          contributions: errorContributions,
          total: {
            lastYear: 0,
          },
        })
      })
  }, [username])

  useEffect(fetchData, [fetchData])

  // 将贡献数据按周分组
  const weeks =
    data?.contributions.reduce<ContributionDay[][]>((acc, day, index) => {
      const weekIndex = Math.floor(index / 7)
      if (!acc[weekIndex]) {
        acc[weekIndex] = []
      }
      acc[weekIndex].push(day)
      return acc
    }, []) || []

  return (
    <TooltipProvider>
      <div ref={containerRef} className="grid grid-flow-col gap-1 overflow-x-auto py-2 px-2 max-md:px-0">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-rows-7 gap-1">
            {week.map((contribution, dayIndex) => {
              const { date, count } = contribution
              const formattedDate = new Date(date).toLocaleDateString('zh-CN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })

              const tooltipContent = `${formattedDate} — ${count === 1 ? '1 次提交 🪴' : count === 0 ? '休息日 💤' : `${count} 次提交`}`

              return (
                <Tooltip key={dayIndex} content={tooltipContent} disabled={!tooltipEnabled || errorVisible}>
                  <div
                    className={cn(
                      'size-2 relative hover:scale-125 transition-all duration-700',
                      count === 0
                        ? 'bg-zinc-200 dark:bg-zinc-900'
                        : count < 5
                          ? 'bg-zinc-300 dark:bg-zinc-700'
                          : count < 10
                            ? 'bg-zinc-500'
                            : 'bg-zinc-900 dark:bg-zinc-50'
                    )}
                  />
                </Tooltip>
              )
            })}
          </div>
        ))}
      </div>
    </TooltipProvider>
  )
}
