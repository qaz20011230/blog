export type Category =
  | 'Philosophy'
  | 'Psychology'
  | 'AI & Technology'
  | 'Mathematics & Logic'
  | 'Business & Strategy'
  | 'Culture & Art'
  | 'Logic'
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
    nameSub: { zh: 'Ang Li', en: 'Ang Li' },
    role: { zh: '广州菲娜睿特人工智能科技有限责任公司首席技术官', en: 'CTO, Guangzhou Phaenarete AI Technology Co., Ltd.' },
    location: { zh: '广州 / 爱丁堡', en: 'Guangzhou / Edinburgh' },
    contact: { zh: '联系方式', en: 'Contact' },
    email: { zh: 'contact@liang.world', en: 'contact@liang.world' },
    github: { zh: 'github.com/qaz20011230', en: 'github.com/qaz20011230' },
    bio: {
      zh: '思想助产士。融合精神分析、哲学践行、语言学与人工智能，致力于以认知之光穿透黑暗，以技术之火点燃未来。',
      en: 'Midwife of Thought. Bridging psychoanalysis, philosophical practice, linguistics, and artificial intelligence — illuminating cognition and igniting the future through technology.',
    },
    education: {
      heading: { zh: '教育背景', en: 'Education' },
      items: [
        {
          degree: { zh: '语言学博士', en: 'PhD in Linguistics' },
          school: { zh: '爱丁堡大学', en: 'University of Edinburgh' },
          period: { zh: '', en: '' },
        },
        {
          degree: { zh: '管理学学士', en: 'Bachelor of Management' },
          school: { zh: '广东工业大学', en: 'Guangdong University of Technology' },
          period: { zh: '', en: '' },
        },
      ],
    },
    position: {
      heading: { zh: '现任职务', en: 'Current Position' },
      title: { zh: '首席技术官', en: 'Chief Technology Officer' },
      org: { zh: '广州菲娜睿特人工智能科技有限责任公司', en: 'Guangzhou Phaenarete AI Technology Co., Ltd.' },
      period: { zh: '2025 – 至今', en: '2025 – Present' },
    },
    expertise: {
      heading: { zh: '研究领域与技能', en: 'Areas of Expertise' },
      autoBuilt: { zh: '（以下数据基于博客内容自动生成）', en: '(Auto-generated from blog content)' },
    },
    writings: {
      heading: { zh: '代表著述', en: 'Selected Writings' },
      autoBuilt: { zh: '（以下筛选自最新博文）', en: '(Selected from recent posts)' },
      viewAll: { zh: '查看全部文章 →', en: 'View All Posts →' },
    },
    stats: {
      heading: { zh: '网站统计', en: 'Site Stats' },
      posts: { zh: '篇文章', en: ' posts' },
      tags: { zh: '个标签', en: ' tags' },
      categories: { zh: '个领域', en: ' categories' },
    },
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
  gate: {
    zhHint: { zh: '请输入黎曼猜想的原始命题以进入网站', en: 'Enter the original statement of the Riemann Hypothesis to proceed' },
    enHint: { zh: '输入黎曼猜想命题的英文进入英文网站', en: 'Enter the original statement of the Riemann Hypothesis to proceed' },
  },
} as const;
