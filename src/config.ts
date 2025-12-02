import type {
  AnalyticsConfig,
  CommentConfig,
  GithubConfig,
  Link,
  PhotosConfig,
  PostConfig,
  ProjectConfig,
  Site,
  SkillsShowcaseConfig,
  SocialLink,
  TagsConfig,
} from '~/types'

//--- Readme Page Config ---
export const SITE: Site = {
  title: 'Dnzzk2',
  description:
    'Dnzzk2 的个人网站 - 前端开发者与 UI 设计爱好者，分享前端技术、设计思考、开源项目与生活感悟。探索技术之美，记录成长点滴。ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ！',
  website: 'https://dnzzk2.icu',
  lang: 'zh-CN',
  base: '/',
  author: 'Dnzzk2',
  ogImage: '/og.png',
}

export const HEADER_LINKS: Link[] = [
  {
    name: '随笔',
    url: '/posts',
  },
  {
    name: '项目',
    url: '/projects',
  },
  {
    name: '照片',
    url: '/photos',
  },
]

export const FOOTER_LINKS: Link[] = [
  {
    name: '关于我',
    url: '/',
  },
  {
    name: '随笔',
    url: '/posts',
  },
  {
    name: '项目',
    url: '/projects',
  },
  {
    name: '标签',
    url: '/tags',
  },
  {
    name: '照片',
    url: '/photos',
  },
]

// get icon https://icon-sets.iconify.design/
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',
    url: 'https://github.com/Dnzzk2',
    icon: 'icon-[ri--github-fill]',
    count: 19,
  },
  {
    name: 'qq',
    url: 'https://qm.qq.com/q/8lgxX5lyrC',
    icon: 'icon-[ri--qq-fill]',
  },
  {
    name: 'peerList',
    url: 'https://peerlist.io/dnzzk2',
    icon: 'icon-[simple-icons--peerlist]',
  },
  {
    name: 'email',
    url: 'mailto:dnzzk2@126.com',
    icon: 'icon-[ri--mail-fill]',
  },
]

/**
 * SkillsShowcase 配置接口 / SkillsShowcase configuration type
 * @property {boolean} SKILLS_ENABLED  - 是否启用SkillsShowcase功能 / Whether to enable SkillsShowcase features
 * @property {Object} SKILLS_DATA - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.direction - 技能展示方向 / Skills showcase direction
 * @property {Object} SKILLS_DATA.skills - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.skills.icon - 技能图标 / Skills icon
 * @property {string} SKILLS_DATA.skills.name - 技能名称 / Skills name
 * get icon https://icon-sets.iconify.design/
 */
export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig = {
  SKILLS_ENABLED: true,
  SKILLS_DATA: [
    {
      direction: 'left',
      skills: [
        {
          name: 'JavaScript',
          icon: 'icon-[mdi--language-javascript]',
        },
        {
          name: 'CSS',
          icon: 'icon-[mdi--language-css3]',
        },
        {
          name: 'HTML',
          icon: 'icon-[mdi--language-html5]',
        },
        {
          name: 'TypeScript',
          icon: 'icon-[mdi--language-typescript]',
        },
      ],
    },
    {
      direction: 'right',
      skills: [
        {
          name: 'Astro',
          icon: 'icon-[lineicons--astro]',
        },
        {
          name: 'Node.js',
          icon: 'icon-[mdi--nodejs]',
        },
        {
          name: 'React',
          icon: 'icon-[mdi--react]',
        },
        {
          name: 'Next.js',
          icon: 'icon-[devicon--nextjs]',
        },
        {
          name: 'Tailwind CSS',
          icon: 'icon-[mdi--tailwind]',
        },
        {
          name: 'Iconify',
          icon: 'icon-[line-md--iconify2-static]',
        },
      ],
    },
    {
      direction: 'left',
      skills: [
        {
          name: 'Ubuntu',
          icon: 'icon-[mdi--ubuntu]',
        },
        {
          name: 'Git',
          icon: 'icon-[mdi--git]',
        },
        {
          name: 'MongoDB',
          icon: 'icon-[lineicons--mongodb]',
        },
        {
          name: 'Vercel',
          icon: 'icon-[lineicons--vercel]',
        },
      ],
    },
  ],
}

/**
 * GitHub配置 / GitHub configuration
 *
 * @property {boolean} ENABLED - 是否启用GitHub功能 / Whether to enable GitHub features
 * @property {string} GITHUB_USERNAME - GITHUB用户名 / GitHub username
 * @property {boolean} TOOLTIP_ENABLED - 是否开启Tooltip功能 / Whether to enable Github Tooltip features
 */

export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  GITHUB_USERNAME: 'Dnzzk2',
  TOOLTIP_ENABLED: true,
}

//--- Posts Page Config ---
export const POSTS_CONFIG: PostConfig = {
  title: '随笔',
  description:
    'Dnzzk2 的技术随笔与生活感悟 - 前端开发经验分享、UI 设计思考、JavaScript 技术探索、React 开发心得，以及照片与游戏的日常记录。',
  introduce: '我想，生命这卷书，落笔应是亭亭常青树。',
  author: 'Dnzzk2',
  homePageConfig: {
    size: 5,
    type: 'compact',
  },
  postPageConfig: {
    size: 10,
    type: 'image',
    coverLayout: 'right',
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line',
  },
  ogImageUseCover: true,
  postType: 'metaOnly',
  imageDarkenInDark: true,
  readMoreText: '阅读更多',
  prevPageText: '上一页',
  nextPageText: '下一页',
  tocText: '本页目录',
  backToPostsText: '返回随笔',
  nextPostText: '下一篇',
  prevPostText: '上一篇',
  recommendText: '精选',
}

export const ANALYTICS_CONFIG: AnalyticsConfig = {
  busuanzi: {
    enabled: true,
  },
  umami: {
    enabled: true,
    websiteId: '5237dab1-1d06-4422-a5f9-9f54ef14f434',
    serverUrl: 'https://cloud.umami.is/script.js',
  },
}

export const COMMENT_CONFIG: CommentConfig = {
  enabled: true,
  system: 'gitalk',
  gitalk: {
    clientID: import.meta.env.PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.PUBLIC_GITHUB_CLIENT_SECRET,
    repo: 'gitalk-comment',
    owner: 'Dnzzk2',
    admin: ['Dnzzk2'],
    language: 'zh-CN',
    perPage: 5,
    pagerDirection: 'last',
    createIssueManually: false,
    distractionFreeMode: false,
    enableHotKey: true,
  },
}

export const TAGS_CONFIG: TagsConfig = {
  title: '标签',
  description: '按标签浏览 Dnzzk2 的技术文章 - 前端开发、React、JavaScript、UI 设计、照片技巧等分类标签，快速找到您感兴趣的技术内容。',
  introduce: '通过标签快速查找相关主题的随笔，发现您感兴趣的内容。',
}

export const PROJECTS_CONFIG: ProjectConfig = {
  title: '项目',
  description: 'Dnzzk2 的开源项目作品集 - 包含 Astro 博客主题等开源项目，展示技术实践成果与开发经验分享。',
  introduce: '种下种子，静待花开。',
}

export const PHOTOS_CONFIG: PhotosConfig = {
  title: '照片',
  description: 'Dnzzk2 的照片作品集 - 记录生活中的美好瞬间，分享风景、人像、街拍等照片，探索光影之美与构图技巧。',
  introduce: '在这里我会记录一些在日常生活中拍摄的照片。',
}
