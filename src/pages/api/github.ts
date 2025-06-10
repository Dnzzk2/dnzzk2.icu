import { GITHUB_CONFIG } from '~/config'
import type { APIRoute } from 'astro'
import NodeCache from 'node-cache'

const { CACHE_DURATION, USE_MOCK_DATA_FOR_DEVELOPMENT } = GITHUB_CONFIG

const DEFAULT_GITHUB_RESPONSE = {
  data: {
    viewer: {
      login: '',
      repositories: {
        totalCount: 0,
        nodes: [],
      },
      followers: {
        totalCount: 10000,
      },
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 427,
          weeks: [
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-03-31',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-01',
                },
                {
                  contributionCount: 1,
                  date: '2024-04-02',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-03',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-04',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-05',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-06',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-04-07',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-08',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-09',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-10',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-11',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-12',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-13',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-04-14',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-15',
                },
                {
                  contributionCount: 2,
                  date: '2024-04-16',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-17',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-18',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-19',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-20',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-04-21',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-22',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-23',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-24',
                },
                {
                  contributionCount: 1,
                  date: '2024-04-25',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-26',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-27',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-04-28',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-29',
                },
                {
                  contributionCount: 0,
                  date: '2024-04-30',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-01',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-02',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-03',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-04',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-05-05',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-06',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-07',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-08',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-09',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-10',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-11',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-05-12',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-13',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-14',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-15',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-16',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-17',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-18',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-05-19',
                },
                {
                  contributionCount: 7,
                  date: '2024-05-20',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-21',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-22',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-23',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-24',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-25',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-05-26',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-27',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-28',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-29',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-30',
                },
                {
                  contributionCount: 0,
                  date: '2024-05-31',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-01',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-06-02',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-03',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-04',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-05',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-06',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-07',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-08',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-06-09',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-10',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-11',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-12',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-13',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-14',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-15',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-06-16',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-17',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-18',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-19',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-20',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-21',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-22',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-06-23',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-24',
                },
                {
                  contributionCount: 0,
                  date: '2024-06-25',
                },
                {
                  contributionCount: 2,
                  date: '2024-06-26',
                },
                {
                  contributionCount: 18,
                  date: '2024-06-27',
                },
                {
                  contributionCount: 19,
                  date: '2024-06-28',
                },
                {
                  contributionCount: 1,
                  date: '2024-06-29',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-06-30',
                },
                {
                  contributionCount: 2,
                  date: '2024-07-01',
                },
                {
                  contributionCount: 2,
                  date: '2024-07-02',
                },
                {
                  contributionCount: 3,
                  date: '2024-07-03',
                },
                {
                  contributionCount: 2,
                  date: '2024-07-04',
                },
                {
                  contributionCount: 5,
                  date: '2024-07-05',
                },
                {
                  contributionCount: 0,
                  date: '2024-07-06',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-07-07',
                },
                {
                  contributionCount: 0,
                  date: '2024-07-08',
                },
                {
                  contributionCount: 0,
                  date: '2024-07-09',
                },
                {
                  contributionCount: 0,
                  date: '2024-07-10',
                },
                {
                  contributionCount: 2,
                  date: '2024-07-11',
                },
                {
                  contributionCount: 0,
                  date: '2024-07-12',
                },
                {
                  contributionCount: 0,
                  date: '2024-07-13',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 3,
                  date: '2024-07-14',
                },
                {
                  contributionCount: 1,
                  date: '2024-07-15',
                },
                {
                  contributionCount: 0,
                  date: '2024-07-16',
                },
                {
                  contributionCount: 5,
                  date: '2024-07-17',
                },
                {
                  contributionCount: 1,
                  date: '2024-07-18',
                },
                {
                  contributionCount: 4,
                  date: '2024-07-19',
                },
                {
                  contributionCount: 0,
                  date: '2024-07-20',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-07-21',
                },
                {
                  contributionCount: 1,
                  date: '2024-07-22',
                },
                {
                  contributionCount: 1,
                  date: '2024-07-23',
                },
                {
                  contributionCount: 3,
                  date: '2024-07-24',
                },
                {
                  contributionCount: 2,
                  date: '2024-07-25',
                },
                {
                  contributionCount: 2,
                  date: '2024-07-26',
                },
                {
                  contributionCount: 0,
                  date: '2024-07-27',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 5,
                  date: '2024-07-28',
                },
                {
                  contributionCount: 0,
                  date: '2024-07-29',
                },
                {
                  contributionCount: 0,
                  date: '2024-07-30',
                },
                {
                  contributionCount: 1,
                  date: '2024-07-31',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-01',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-02',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-03',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-08-04',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-05',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-06',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-07',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-08',
                },
                {
                  contributionCount: 1,
                  date: '2024-08-09',
                },
                {
                  contributionCount: 5,
                  date: '2024-08-10',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 1,
                  date: '2024-08-11',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-12',
                },
                {
                  contributionCount: 1,
                  date: '2024-08-13',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-14',
                },
                {
                  contributionCount: 1,
                  date: '2024-08-15',
                },
                {
                  contributionCount: 1,
                  date: '2024-08-16',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-17',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 1,
                  date: '2024-08-18',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-19',
                },
                {
                  contributionCount: 1,
                  date: '2024-08-20',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-21',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-22',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-23',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-24',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-08-25',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-26',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-27',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-28',
                },
                {
                  contributionCount: 1,
                  date: '2024-08-29',
                },
                {
                  contributionCount: 7,
                  date: '2024-08-30',
                },
                {
                  contributionCount: 0,
                  date: '2024-08-31',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 2,
                  date: '2024-09-01',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-02',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-03',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-04',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-05',
                },
                {
                  contributionCount: 2,
                  date: '2024-09-06',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-07',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-09-08',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-09',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-10',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-11',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-12',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-13',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-14',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-09-15',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-16',
                },
                {
                  contributionCount: 0,
                  date: '2024-09-17',
                },
                {
                  contributionCount: 2,
                  date: '2024-09-18',
                },
                {
                  contributionCount: 1,
                  date: '2024-09-19',
                },
                {
                  contributionCount: 1,
                  date: '2024-09-20',
                },
                {
                  contributionCount: 8,
                  date: '2024-09-21',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 12,
                  date: '2024-09-22',
                },
                {
                  contributionCount: 10,
                  date: '2024-09-23',
                },
                {
                  contributionCount: 1,
                  date: '2024-09-24',
                },
                {
                  contributionCount: 12,
                  date: '2024-09-25',
                },
                {
                  contributionCount: 2,
                  date: '2024-09-26',
                },
                {
                  contributionCount: 1,
                  date: '2024-09-27',
                },
                {
                  contributionCount: 1,
                  date: '2024-09-28',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-09-29',
                },
                {
                  contributionCount: 6,
                  date: '2024-09-30',
                },
                {
                  contributionCount: 2,
                  date: '2024-10-01',
                },
                {
                  contributionCount: 3,
                  date: '2024-10-02',
                },
                {
                  contributionCount: 0,
                  date: '2024-10-03',
                },
                {
                  contributionCount: 0,
                  date: '2024-10-04',
                },
                {
                  contributionCount: 3,
                  date: '2024-10-05',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-10-06',
                },
                {
                  contributionCount: 3,
                  date: '2024-10-07',
                },
                {
                  contributionCount: 10,
                  date: '2024-10-08',
                },
                {
                  contributionCount: 3,
                  date: '2024-10-09',
                },
                {
                  contributionCount: 4,
                  date: '2024-10-10',
                },
                {
                  contributionCount: 4,
                  date: '2024-10-11',
                },
                {
                  contributionCount: 2,
                  date: '2024-10-12',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 10,
                  date: '2024-10-13',
                },
                {
                  contributionCount: 6,
                  date: '2024-10-14',
                },
                {
                  contributionCount: 3,
                  date: '2024-10-15',
                },
                {
                  contributionCount: 2,
                  date: '2024-10-16',
                },
                {
                  contributionCount: 7,
                  date: '2024-10-17',
                },
                {
                  contributionCount: 0,
                  date: '2024-10-18',
                },
                {
                  contributionCount: 0,
                  date: '2024-10-19',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 1,
                  date: '2024-10-20',
                },
                {
                  contributionCount: 5,
                  date: '2024-10-21',
                },
                {
                  contributionCount: 0,
                  date: '2024-10-22',
                },
                {
                  contributionCount: 4,
                  date: '2024-10-23',
                },
                {
                  contributionCount: 0,
                  date: '2024-10-24',
                },
                {
                  contributionCount: 0,
                  date: '2024-10-25',
                },
                {
                  contributionCount: 1,
                  date: '2024-10-26',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-10-27',
                },
                {
                  contributionCount: 0,
                  date: '2024-10-28',
                },
                {
                  contributionCount: 0,
                  date: '2024-10-29',
                },
                {
                  contributionCount: 0,
                  date: '2024-10-30',
                },
                {
                  contributionCount: 2,
                  date: '2024-10-31',
                },
                {
                  contributionCount: 0,
                  date: '2024-11-01',
                },
                {
                  contributionCount: 0,
                  date: '2024-11-02',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-11-03',
                },
                {
                  contributionCount: 0,
                  date: '2024-11-04',
                },
                {
                  contributionCount: 0,
                  date: '2024-11-05',
                },
                {
                  contributionCount: 0,
                  date: '2024-11-06',
                },
                {
                  contributionCount: 0,
                  date: '2024-11-07',
                },
                {
                  contributionCount: 0,
                  date: '2024-11-08',
                },
                {
                  contributionCount: 1,
                  date: '2024-11-09',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-11-10',
                },
                {
                  contributionCount: 0,
                  date: '2024-11-11',
                },
                {
                  contributionCount: 0,
                  date: '2024-11-12',
                },
                {
                  contributionCount: 4,
                  date: '2024-11-13',
                },
                {
                  contributionCount: 1,
                  date: '2024-11-14',
                },
                {
                  contributionCount: 1,
                  date: '2024-11-15',
                },
                {
                  contributionCount: 16,
                  date: '2024-11-16',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 6,
                  date: '2024-11-17',
                },
                {
                  contributionCount: 2,
                  date: '2024-11-18',
                },
                {
                  contributionCount: 2,
                  date: '2024-11-19',
                },
                {
                  contributionCount: 3,
                  date: '2024-11-20',
                },
                {
                  contributionCount: 1,
                  date: '2024-11-21',
                },
                {
                  contributionCount: 2,
                  date: '2024-11-22',
                },
                {
                  contributionCount: 1,
                  date: '2024-11-23',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-11-24',
                },
                {
                  contributionCount: 5,
                  date: '2024-11-25',
                },
                {
                  contributionCount: 6,
                  date: '2024-11-26',
                },
                {
                  contributionCount: 3,
                  date: '2024-11-27',
                },
                {
                  contributionCount: 2,
                  date: '2024-11-28',
                },
                {
                  contributionCount: 1,
                  date: '2024-11-29',
                },
                {
                  contributionCount: 3,
                  date: '2024-11-30',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 3,
                  date: '2024-12-01',
                },
                {
                  contributionCount: 2,
                  date: '2024-12-02',
                },
                {
                  contributionCount: 1,
                  date: '2024-12-03',
                },
                {
                  contributionCount: 4,
                  date: '2024-12-04',
                },
                {
                  contributionCount: 4,
                  date: '2024-12-05',
                },
                {
                  contributionCount: 0,
                  date: '2024-12-06',
                },
                {
                  contributionCount: 0,
                  date: '2024-12-07',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 1,
                  date: '2024-12-08',
                },
                {
                  contributionCount: 0,
                  date: '2024-12-09',
                },
                {
                  contributionCount: 1,
                  date: '2024-12-10',
                },
                {
                  contributionCount: 4,
                  date: '2024-12-11',
                },
                {
                  contributionCount: 1,
                  date: '2024-12-12',
                },
                {
                  contributionCount: 1,
                  date: '2024-12-13',
                },
                {
                  contributionCount: 4,
                  date: '2024-12-14',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-12-15',
                },
                {
                  contributionCount: 2,
                  date: '2024-12-16',
                },
                {
                  contributionCount: 0,
                  date: '2024-12-17',
                },
                {
                  contributionCount: 11,
                  date: '2024-12-18',
                },
                {
                  contributionCount: 4,
                  date: '2024-12-19',
                },
                {
                  contributionCount: 8,
                  date: '2024-12-20',
                },
                {
                  contributionCount: 0,
                  date: '2024-12-21',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 1,
                  date: '2024-12-22',
                },
                {
                  contributionCount: 3,
                  date: '2024-12-23',
                },
                {
                  contributionCount: 4,
                  date: '2024-12-24',
                },
                {
                  contributionCount: 0,
                  date: '2024-12-25',
                },
                {
                  contributionCount: 5,
                  date: '2024-12-26',
                },
                {
                  contributionCount: 5,
                  date: '2024-12-27',
                },
                {
                  contributionCount: 0,
                  date: '2024-12-28',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2024-12-29',
                },
                {
                  contributionCount: 2,
                  date: '2024-12-30',
                },
                {
                  contributionCount: 0,
                  date: '2024-12-31',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-01',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-02',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-03',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-04',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2025-01-05',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-06',
                },
                {
                  contributionCount: 7,
                  date: '2025-01-07',
                },
                {
                  contributionCount: 1,
                  date: '2025-01-08',
                },
                {
                  contributionCount: 3,
                  date: '2025-01-09',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-10',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-11',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2025-01-12',
                },
                {
                  contributionCount: 1,
                  date: '2025-01-13',
                },
                {
                  contributionCount: 3,
                  date: '2025-01-14',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-15',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-16',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-17',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-18',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2025-01-19',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-20',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-21',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-22',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-23',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-24',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-25',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2025-01-26',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-27',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-28',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-29',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-30',
                },
                {
                  contributionCount: 0,
                  date: '2025-01-31',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-01',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2025-02-02',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-03',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-04',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-05',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-06',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-07',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-08',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2025-02-09',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-10',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-11',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-12',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-13',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-14',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-15',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2025-02-16',
                },
                {
                  contributionCount: 1,
                  date: '2025-02-17',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-18',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-19',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-20',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-21',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-22',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2025-02-23',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-24',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-25',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-26',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-27',
                },
                {
                  contributionCount: 0,
                  date: '2025-02-28',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-01',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2025-03-02',
                },
                {
                  contributionCount: 7,
                  date: '2025-03-03',
                },
                {
                  contributionCount: 1,
                  date: '2025-03-04',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-05',
                },
                {
                  contributionCount: 2,
                  date: '2025-03-06',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-07',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-08',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2025-03-09',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-10',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-11',
                },
                {
                  contributionCount: 1,
                  date: '2025-03-12',
                },
                {
                  contributionCount: 1,
                  date: '2025-03-13',
                },
                {
                  contributionCount: 1,
                  date: '2025-03-14',
                },
                {
                  contributionCount: 2,
                  date: '2025-03-15',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: '2025-03-16',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-17',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-18',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-19',
                },
                {
                  contributionCount: 1,
                  date: '2025-03-20',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-21',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-22',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 3,
                  date: '2025-03-23',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-24',
                },
                {
                  contributionCount: 2,
                  date: '2025-03-25',
                },
                {
                  contributionCount: 2,
                  date: '2025-03-26',
                },
                {
                  contributionCount: 2,
                  date: '2025-03-27',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-28',
                },
                {
                  contributionCount: 1,
                  date: '2025-03-29',
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 1,
                  date: '2025-03-30',
                },
                {
                  contributionCount: 0,
                  date: '2025-03-31',
                },
                {
                  contributionCount: 1,
                  date: '2025-04-01',
                },
                {
                  contributionCount: 0,
                  date: '2025-04-02',
                },
                {
                  contributionCount: 0,
                  date: '2025-04-03',
                },
              ],
            },
          ],
        },
      },
    },
  },
}

// 初始化 node-cache - Initialize node cache
const cache = new NodeCache({
  stdTTL: CACHE_DURATION,
  checkperiod: 60, // 每60秒检查一次过期时间
})

// 使用定时器检查和更新缓存
const checkAndUpdateCache = async () => {
  const cacheKey = 'github-data'
  const ttl = cache.getTtl(cacheKey)

  if (ttl) {
    const timeToExpire = ttl - Date.now()
    console.log(`Cache will expire in ${timeToExpire / 1000 / 60} minutes`)

    // 如果剩余时间少于5分钟，更新缓存
    if (timeToExpire < 60 * 5 * 1000) {
      try {
        console.log('Refreshing cache...')
        const data = await fetchGitHubData()
        cache.set(cacheKey, data)
        console.log('Cache refreshed successfully')
      } catch (error) {
        console.error('Failed to refresh cache:', error)
      }
    }
  }
}

// 每5分钟检查一次缓存状态
setInterval(checkAndUpdateCache, 60 * 5 * 1000)

export const GET: APIRoute = async () => {
  try {
    if (import.meta.env.DEV && USE_MOCK_DATA_FOR_DEVELOPMENT) {
      return new Response(JSON.stringify(DEFAULT_GITHUB_RESPONSE), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const cacheKey = 'github-data'
    let cachedResponse = cache.get(cacheKey)

    // 如果缓存不存在，立即获取数据
    if (!cachedResponse) {
      console.log('Cache miss, fetching new data...')
      const data = await fetchGitHubData()
      cache.set(cacheKey, data)
      cachedResponse = data
      console.log('New data cached successfully')
    }

    return new Response(JSON.stringify(cachedResponse), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('GitHub API 错误:', error)
    return new Response(JSON.stringify(DEFAULT_GITHUB_RESPONSE), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// 数据获取函数
async function fetchGitHubData() {
  const query = `{
    viewer {
      login
      repositories(
        first: 20
        affiliations: OWNER
        isFork: false
        orderBy: {field: STARGAZERS, direction: DESC}
      ) {
        totalCount
        nodes {
          nameWithOwner
          name
          description
          forkCount
          stargazerCount
          createdAt
          updatedAt
        }
      }
      followers {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }`

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.SECRET_GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  })

  return await res.json()
}
