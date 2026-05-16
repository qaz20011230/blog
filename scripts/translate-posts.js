import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ZH_DIR = 'src/content/posts/zh';
const EN_DIR = 'src/content/posts/en';

// English frontmatter translations for common terms
// Simple slug-to-English-title mapping for known posts
const TITLE_MAP = {
  'hello-world': {
    title: 'Hello, World — Opening Liang\'s World in Cyberspace',
    description: 'The first post marking the birth of a digital garden where philosophy, psychoanalysis, and business logic converge.',
    tags: ['digital garden', 'philosophy', 'introduction'],
  },
  'what-is-philosophy': {
    title: 'When Thought First Awakened: What Is Philosophy?',
    description: 'Exploring the origins of philosophical inquiry and what it means to think philosophically in a world of ready-made answers.',
    tags: ['philosophy', 'thought', 'wisdom'],
  },
  'what-is-love': {
    title: 'What Is Love?',
    description: 'A philosophical and psychological exploration of love beyond romantic clichés, examining its nature, varieties, and transformative power.',
    tags: ['love', 'philosophy', 'psychology'],
  },
  'on-criticism': {
    title: 'On Criticism',
    description: 'A meditation on the art of critique — distinguishing constructive criticism from destructive judgment, and learning to give and receive feedback with wisdom.',
    tags: ['criticism', 'communication', 'wisdom'],
  },
  'on-equality': {
    title: 'On Equality',
    description: 'A philosophical examination of equality — what it means, how it differs from sameness, and why it matters for human dignity and social justice.',
    tags: ['equality', 'philosophy', 'justice'],
  },
  'venus': {
    title: 'Venus',
    description: 'A poetic and philosophical reflection on love, beauty, desire, and the eternal feminine principle embodied in the mythological Venus.',
    tags: ['venus', 'love', 'mythology', 'philosophy'],
  },
  'essence-of-religion': {
    title: 'What Is the Essence of Religion?',
    description: 'Exploring the core nature of religious experience — beyond dogma and institution — to understand its psychological and existential foundations.',
    tags: ['religion', 'philosophy', 'psychology'],
  },
  'logic-basics': {
    title: 'The Basics of Logic',
    description: 'An introduction to formal logic: propositions, syllogisms, and the fundamental tools of rational thought.',
    tags: ['logic', 'reasoning', 'philosophy'],
  },
  'syllogism-logic': {
    title: 'Introduction to Syllogistic Logic: From Definitions to Symbolic Translation',
    description: 'A beginner-friendly guide to Aristotelian syllogisms — understanding categorical propositions and translating natural language arguments into formal logic.',
    tags: ['syllogism', 'logic', 'philosophy'],
  },
  'presence-the-power-of-now': {
    title: 'The Power of Presence — Why "Having No Time" Is an Excuse',
    description: '"Having no time" is not a statement about time but a diagnosis of attention — drawing from Marcus Aurelius\'s Meditations, revealing the fundamental difference between being occupied and being preoccupied.',
    tags: ['presence', 'attention', 'Marcus Aurelius', 'Stoicism', 'time management', 'anxiety'],
  },
  'light-energy-convergence-manifesto-communism-new-stage': {
    title: 'Light-Energy Convergence Manifesto: On Phaenarete\'s Path and the New Stage of Communism',
    description: 'Light-energy convergence, wisdom creating the future. As AI and controlled nuclear fusion converge at history\'s watershed, Phaenarete answers the fundamental question in manifesto form: who controls these forces, whom do they serve, and where are they headed?',
    tags: ['communism', 'Phaenarete', 'political manifesto', 'fusion', 'AI', 'Seven Virtues', 'people\'s enterprise'],
  },
  'tendre-is-all-we-want-xanthippe-architecture': {
    title: 'Tendre Is All We Want — The Theoretical Foundation of Xanthippe V3.0: From Statistical Approximity to Logical Necessity',
    description: 'A system achieving zero-failure perfect scores on Gaokao mathematics with probability 1 necessarily exists, and its minimal cognitive architecture must satisfy Attentional breadth, Intentional depth, and Tensional rigidity. From the Latin root tendere to formal proof, from Wittgensteinian diagnosis to four-layer cognitive loop architecture.',
    tags: ['cognitive architecture', 'mathematical reasoning', 'Xanthippe', 'Transformer', 'epistemology', 'Saussure', 'Wittgenstein', 'Tendre'],
  },
  'key-value-memory-mnemosyne-to-silicon-intelligence': {
    title: 'Key-Value Memory: From Mnemosyne\'s Gift to the Awakening of Silicon Intelligence',
    description: 'A systematic interdisciplinary exploration tracing memory research from ancient Greek wisdom to contemporary AI. Using the Key-Value memory framework as the central thread, this paper integrates neuroscience, cognitive psychology, and artificial intelligence into a unified narrative.',
    tags: ['key-value memory', 'hippocampus', 'neural network', 'Transformer', 'attention mechanism', 'memory consolidation', 'cognitive science', 'RAG'],
  },
};

function translateTags(tags) {
  const tagMap = {
    '哲学': 'philosophy',
    '心理学': 'psychology',
    '逻辑': 'logic',
    '逻辑学': 'logic',
    '人工智能': 'AI',
    '数学': 'mathematics',
    '数学推理': 'mathematical reasoning',
    '认知科学': 'cognitive science',
    '认知架构': 'cognitive architecture',
    '知识论': 'epistemology',
    '精神分析': 'psychoanalysis',
    '思维': 'thinking',
    '思想': 'thought',
    '学习': 'learning',
    '记忆': 'memory',
    '注意力': 'attention',
    '注意力机制': 'attention mechanism',
    '神经网络': 'neural network',
    '深度学习': 'deep learning',
    'Transformer': 'Transformer',
    'RAG': 'RAG',
    '教育': 'education',
    '商业': 'business',
    '电商': 'ecommerce',
    '创业': 'entrepreneurship',
    '写��': 'writing',
    '创造': 'creativity',
    '关系动力学': 'relational dynamics',
    '亲密关系': 'intimate relationships',
    '爱情': 'love',
    '关系': 'relationships',
    '伦理': 'ethics',
    '道德': 'morality',
    '正义': 'justice',
    '批评': 'criticism',
    '信仰': 'faith',
    '宗教': 'religion',
    '艺术': 'art',
    '美学': 'aesthetics',
    '历史': 'history',
    '文化': 'culture',
    '社会': 'society',
    '政治': 'politics',
    '共产主义': 'communism',
    '国际主义': 'internationalism',
    '管理': 'management',
    '效率': 'productivity',
    '个人成长': 'personal growth',
    '修行': 'practice',
    '儒家': 'Confucianism',
    '斯多葛': 'Stoicism',
    '存在主义': 'existentialism',
    '现象学': 'phenomenology',
    '拉康': 'Lacan',
    '海马体': 'hippocampus',
    '记忆巩固': 'memory consolidation',
    '睡眠': 'sleep',
    '遗忘': 'forgetting',
    '黎曼猜想': 'Riemann Hypothesis',
    '数学史': 'math history',
    '统计': 'statistics',
    '推荐系统': 'recommendation systems',
    '算法': 'algorithms',
    '机器人': 'robotics',
    '控制论': 'cybernetics',
    '经济': 'economics',
    '投资': 'investment',
    '财富': 'wealth',
    '健康': 'health',
    '焦虑': 'anxiety',
    '死亡': 'death',
    '自由': 'freedom',
    '存在': 'existence',
    '语言': 'language',
    '语言学': 'linguistics',
    '索绪尔': 'Saussure',
    '维特根斯坦': 'Wittgenstein',
    '奥勒留': 'Marcus Aurelius',
    '沉思录': 'Meditations',
    '哲学践行': 'philosophical practice',
    '智慧': 'wisdom',
    '爱': 'love',
    '真理': 'truth',
    '在场': 'presence',
    '时间管理': 'time management',
    '菲娜睿特': 'Phaenarete',
    '赞希佩': 'Xanthippe',
    '聚变': 'fusion',
    '政治宣言': 'political manifesto',
    '人民企业': 'people\'s enterprise',
    '北辰七德': 'Polaris Seven Virtues',
    'DNC': 'DNC',
    'LSTM': 'LSTM',
    'GPT': 'GPT',
    'MoE': 'MoE',
    'AI': 'AI',
    'AGI': 'AGI',
    'ASI': 'ASI',
  };
  return tags.map(t => tagMap[t] || t);
}

function translateDescription(desc, slug) {
  if (TITLE_MAP[slug]?.description) return TITLE_MAP[slug].description;
  // Keep original if no translation available
  return desc || '';
}

function translateTitle(title, slug) {
  if (TITLE_MAP[slug]?.title) return TITLE_MAP[slug].title;
  return title;
}

const files = fs.readdirSync(ZH_DIR).filter(f => f.endsWith('.md'));
let count = 0;

for (const f of files) {
  const raw = fs.readFileSync(path.join(ZH_DIR, f), 'utf-8');
  const { data, content: body } = matter(raw);
  const slug = f.replace('.md', '');

  // Build English frontmatter
  const enTags = translateTags(data.tags || []);
  const enTitle = translateTitle(data.title || '', slug);
  const enDesc = translateDescription(data.description || '', slug);
  const cat = data.category || 'Others';

  const copyright = '\n\n> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.\n';

  const enContent = `---
title: ${enTitle.replace(/"/g, '\\"')}
date: '${data.date}'
category: ${cat}
tags:
  - ${enTags.slice(0, 10).join('\n  - ')}
description: >
  ${enDesc.replace(/\n/g, '\n  ')}
---

${body}${copyright}`;

  fs.writeFileSync(path.join(EN_DIR, f), enContent, 'utf-8');
  count++;
}

console.log(`Generated ${count} English posts in ${EN_DIR}/`);
