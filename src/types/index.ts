export type Category =
  | 'Philosophy'
  | 'Psychology'
  | 'Logic'
  | 'Ecommerce'
  | 'Others';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: Category;
  tags: string[];
  pinned?: boolean;
  content?: string;
}

export type Locale = 'zh' | 'en';

export const UI = {
  siteName: { zh: '良之世界', en: 'Liang.World' },
  tagline: { zh: '思想助产士的数字花园', en: 'Digital Garden of the Midwife of Thought' },
  description: {
    zh: '怀瑾握瑜，解惑忘隙。融合精神分析、哲学践行与商业逻辑，助你澄清概念、暴露预设、重构认知。',
    en: 'Where psychoanalysis, philosophical practice, and business logic converge. Clarify concepts, expose presuppositions, reconstruct cognition.',
  },
  nav: {
    home: { zh: '首页', en: 'Home' },
    categories: { zh: '分类', en: 'Categories' },
    books: { zh: '书架', en: 'Library' },
    about: { zh: '关于', en: 'About' },
  },
  home: {
    recent: { zh: '最近文章', en: 'Recent' },
    motto: { zh: '"你们祈求，就给你们；寻找，就寻见；叩门，就给你们开门。"', en: '"Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you."' },
    subtitle: { zh: '架构 / 哲学 / 数学', en: 'Architecture / Philosophy / Mathematics' },
  },
  categories: {
    heading: { zh: '分类', en: 'CATEGORIES' },
    all: { zh: '全部', en: 'All' },
    noPosts: { zh: '该分类下暂无文章。', en: 'No posts found in this category.' },
  },
  blogDetail: {
    back: { zh: '返回', en: 'Back' },
    share: { zh: '分享', en: 'Share' },
    notFound: { zh: '文章未找到', en: 'Post not found' },
  },
  books: {
    heading: { zh: '书架', en: 'LIBRARY' },
    tagline: { zh: '// 思想的载体，数字的档案馆', en: '// Vessels of thought, digital archives' },
    empty: { zh: '[ 档案馆当前为空 ]', en: '[ The archive is currently empty ]' },
    readPdf: { zh: '阅读PDF', en: 'READ_PDF' },
  },
  about: {
    title: { zh: '关于良之 | 良之世界', en: 'About | Liang.World' },
    name: { zh: '良之', en: 'LeoZ' },
    role: { zh: '广州菲娜睿特人工智能科技有限责任公司首席技术官', en: 'CTO, Guangzhou Phaenarete AI Technology Co., Ltd.' },
  },
  footer: {
    copyright: { zh: '版权所有', en: 'All rights reserved' },
  },
  langSwitch: {
    zh: '中文',
    en: 'EN',
  },
  gate: {
    zhHint: { zh: '请输入黎曼猜想的原始命题以进入网站', en: 'Enter the original statement of the Riemann Hypothesis to proceed' },
    enHint: { zh: '输入黎曼猜想命题的英文进入英文网站', en: 'Enter the original statement of the Riemann Hypothesis to proceed' },
  },
} as const;
