import type { PhotoData } from '~/types'
import cat1 from '~/assets/photos/cat1.webp'
import cat2 from '~/assets/photos/cat2.webp'
import cat3 from '~/assets/photos/cat3.webp'
import cat4 from '~/assets/photos/cat4.webp'
import dqh1 from '~/assets/photos/dqh1.webp'
import dqh2 from '~/assets/photos/dqh2.jpg'
import dqh3 from '~/assets/photos/dqh3.jpg'
import zs1 from '~/assets/photos/zs1.webp'
import zs2 from '~/assets/photos/zs2.webp'

export const PhotosList: PhotoData[] = [
  {
    title: '朋友家的可爱猫猫',
    icon: {
      type: 'emoji',
      value: '🐱',
    },
    description: '太卡哇伊(*^ω^*)了,cute.',
    date: '2025-06-21',
    travel: '',
    photos: [
      {
        src: cat1,
        alt: '朋友家的可爱猫猫',
        width: cat1.width,
        height: cat1.height,
        variant: '4x3',
      },
      {
        src: cat2,
        alt: '朋友家的可爱猫猫',
        width: cat2.width,
        height: cat2.height,
        variant: '4x3',
      },
      {
        src: cat3,
        alt: '朋友家的可爱猫猫',
        width: cat3.width,
        height: cat3.height,
        variant: '4x3',
      },
      {
        src: cat4,
        alt: '朋友家的可爱猫猫',
        width: cat4.width,
        height: cat4.height,
        variant: '4x3',
      },
    ],
  },
  {
    title: '宁波 · 东钱湖',
    icon: {
      type: 'emoji',
      value: '🚴',
    },
    description: '东钱湖骑行，虽然腿抽筋了几次，但是风景很美。',
    date: '2025-03-01',
    travel: '',
    photos: [
      {
        src: dqh1,
        alt: '宁波·东钱湖',
        width: dqh1.width,
        height: dqh1.height,
        variant: '4x5',
      },
      {
        src: dqh2,
        alt: '宁波·东钱湖',
        width: dqh2.width,
        height: dqh2.height,
        variant: '1x1',
      },
      {
        src: dqh3,
        alt: '宁波·东钱湖',
        width: dqh3.width,
        height: dqh3.height,
        variant: '4x3',
      },
    ],
  },
  {
    title: '宁波 · 舟山',
    icon: {
      type: 'emoji',
      value: '🏞️',
    },
    description: '',
    date: '2024-09-07',
    travel: '',
    photos: [
      {
        src: zs1,
        alt: '宁波·舟山',
        width: zs1.width,
        height: zs1.height,
        variant: '4x3',
      },
      {
        src: zs2,
        alt: '宁波·舟山',
        width: zs2.width,
        height: zs2.height,
        variant: '4x3',
      },
    ],
  },
]
