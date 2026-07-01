export type Category =
  | 'Philosophy'
  | 'Psychology'
  | 'AI & Technology'
  | 'Mathematics & Logic'
  | 'Business & Strategy'
  | 'Culture & Art'
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
    zh: '菲娜睿特AI首席技术官。融合哲学、精神分析、语言学、AI与商业战略的深度思想世界。',
    en: 'CTO of Phaenarete AI. A world of deep thought bridging philosophy, psychoanalysis, linguistics, AI, and business strategy.',
  },
  keywords: {
    zh: '良之,Leon,菲娜睿特,人工智能,哲学,精神分析,语言学,核聚变,数学,商业战略,认知科学',
    en: 'Leon,LeoZ,Phaenarete AI,artificial intelligence,philosophy,psychoanalysis,linguistics,nuclear fusion,mathematics,business strategy,cognitive science',
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
  footer: {
    copyright: { zh: '版权所有', en: 'All rights reserved' },
    stats: {
      words: { zh: '站点总字数', en: 'Total Words' },
      wordUnit: { zh: '字', en: ' words' },
      pv: { zh: '总访问量', en: 'PV' },
      pvUnit: { zh: '次', en: '' },
      uv: { zh: '总访问人数', en: 'UV' },
      uvUnit: { zh: '人', en: '' },
    },
  },
  langSwitch: {
    zh: '中文',
    en: 'EN',
  },
} as const;
