export interface AboutContent {
  pageTitle: string;
  heroTitle: string;
  heroSub: string;
  consultationBadge: string;
  philosLabel: string;
  philosDesc: string;
  methodLabel: string;
  methodDesc: string;
  methodItems: { title: string; desc: string }[];
  bioLabel: string;
  bioItems: string[];
  slotsLabel: string;
  slotsDesc: string;
  pricingLabel: string;
  regularPricing: string;
  proBonoPricing: string;
  pricingPhilosophy: string;
  preConsultLabel: string;
  preConsultDesc: string;
  formatLabel: string;
  formatDesc: string;
  cancelLabel: string;
  cancelDesc: string;
  scopeLabel: string;
  scopeProvided: string;
  scopeProvidedItems: string;
  scopeNotProvided: string;
  scopeNotProvidedItems: string[];
  scopeNote: string;
  confLabel: string;
  confDesc: string;
  bookingLabel: string;
  bookingSteps: string[];
  closingLabel: string;
  closingText: string;
  footerNote: string;
}

const zh: AboutContent = {
  pageTitle: '关于 | 哲学咨询 — 良之世界',
  heroTitle: '良之博士 · 咨询预约',
  heroSub: '爱丁堡大学语言学博士 · 广州菲娜睿特人工智能科技有限责任公司联合创始人 · 菲娜睿特专深人工智能实验室首席研究员',
  consultationBadge: '哲学践行向全世界开放',

  philosLabel: '哲学理念',
  philosDesc: '我们的一切活动都指向一个终极目的。亚里士多德称之为 Eudaimonia（εὐδαιμονία）——不是短暂的快乐，不是功名的满足，而是如一棵树按照自己的本性生长、抽枝、开花、结果那样，一个人的生命因理性与美德的充分实现而繁盛。两千多年后，孔子用另一种语言说出了同样的事："七十而从心所欲，不逾矩。"自由与秩序的合一，内在渴望与外在规范的和谐——这正是天人合一的幸福。我做的咨询工作，正是以这个交汇点为根基——在西方的理性思辨与东方的德性涵养之间，帮助你看见自己的处境，澄清自己的困惑，做出属于自己的选择。',

  methodLabel: '方法取向',
  methodDesc: '我采用的是整合型哲学咨询，以三个支柱为框架：',
  methodItems: [
    {
      title: 'PEACE Process',
      desc: '由 Lou Marinoff 提出，五个步骤依次为 P——辨识问题、E——建设性地表达情绪、A——分析选择、C——沉思哲学性情、E——重获平衡。这五步不是机械的程序，而是一张导航图，指引对话从困惑走向澄明。',
    },
    {
      title: '北辰七德',
      desc: '明智、良心、勇毅、节制、正义、至诚、弘仁。七德不是外在的道德教条，而是我在每一次对话中与你共同校准的内在罗盘。当你感到进退失据，我们会一起检视：是哪一项德行在呼唤你？',
    },
    {
      title: '苏格拉底对话',
      desc: '我不提供答案。我通过诘问、定义、反例和归纳，帮助你发现自己已经知道但尚未清晰表达的东西。我是助产士，你是生产者——真理必须从你自己的思考中诞生。',
    },
  ],

  bioLabel: '咨询师简介',
  bioItems: [
    '良之博士（Ang Li），哲学践行者，人工智能与能源科技研究者。',
    '爱丁堡大学语言学博士。',
    '广州菲娜睿特人工智能科技有限责任公司联合创始人。',
    '菲娜睿特专深人工智能实验室首席研究员。',
  ],

  slotsLabel: '开放名额',
  slotsDesc: '每周开放 3 个咨询名额，其中 1 个名额为公益咨询，面向：全日制在校学生（凭学生证）、低保家庭成员、残障人士、其他经沟通确认的经济困难者。公益名额并非"低质量服务"，而是同等质量、同等投入的哲学咨询。这是我的北辰七德之"弘仁"——立己立人。',

  pricingLabel: '收费标准',
  regularPricing: '每次咨询的费用为来访者所在地全日制用工月最低工资标准的十分之一。示例：广州市 2026 年月最低工资标准为 2500 元，则广州来访者的单次咨询费为 250 元。具体金额在预咨询后根据您所在地最新标准确定。',
  proBonoPricing: '公益咨询：在常规标准基础上八折收取。示例：若您所在地最低工资标准为 2500 元/月，则公益咨询费用为 200 元/次。',
  pricingPhilosophy: '这个定价逻辑，源于我的信念：哲学咨询不应是奢侈品，而应是必需品。柏拉图在《申辩篇》中借苏格拉底之口说："神命我终生从事爱智之学，我虽想从命，但贫困的阴影遮蔽着我。"我希望，没有人会因为贫困而被挡在哲学咨询的门外。同时，付费本身就是咨询工作的一部分——它建立对等的契约关系，体现来访者对自己成长的郑重承诺。免费的东西往往不会被珍惜——这是我从大量实践中得出的经验。公益咨询保留象征性收费，正是为了守护这份郑重。',

  preConsultLabel: '首次预咨询',
  preConsultDesc: '所有新来访者均享有一次免费的预咨询（约 15 分钟）。目的：了解您的来意与期待；评估哲学咨询是否适合您（若不合适，我将坦诚告知并尽可能提供转介建议）；双方共同决定是否进入正式咨询。',

  formatLabel: '咨询形式与时长',
  formatDesc: '形式：线上视频咨询为主（使用腾讯会议或 Zoom）；广州地区可安排线下面询（需提前确认场地）。时长：每次 50 分钟。频率：通常每周一次，具体频率在预咨询后协商确定。',

  cancelLabel: '取消与改期',
  cancelDesc: '如需取消或改期，请至少提前 24 小时告知。逾时未取消且未出席的，仍按正常标准计收当次费用。此设置的目的不是惩罚，而是共同维护时间的承诺——您的时间与我的时间，同样珍贵。',

  scopeLabel: '服务范围与边界',
  scopeProvided: '我提供的：',
  scopeProvidedItems: '面向个人成长、价值冲突、意义困惑、决策困境、人际关系、职业选择、创造性阻滞等问题的哲学对话。方法为苏格拉底式诘问、概念澄清、哲学文本讨论、思想实验等。',
  scopeNotProvided: '我不提供的：',
  scopeNotProvidedItems: [
    '精神科诊断与药物治疗（请前往正规医疗机构就诊）。',
    '紧急心理危机干预（请联系当地心理援助热线）。',
    '长期心理治疗（心理学取向的咨询请咨询有资质的心理师）。',
  ],
  scopeNote: '如果在预咨询或咨询过程中，我发现您需要的是以上服务而非哲学咨询，我将坦诚告知并尽可能提供转介建议。这是北辰七德的"明智"——知道自己的边界，比知道自己能做什么更重要。',

  confLabel: '保密原则',
  confDesc: '您在咨询中透露的全部信息，均受严格保密。未经您书面同意，不会向任何第三方披露。例外情况（依据中国法律法规及专业伦理规范）：您有即刻的自伤或伤人意向；涉及未成年人、老年人或其他无民事行为能力人的虐待或忽视；法律要求披露的其他情形。在上述例外情况下，我会尽可能在披露前与您讨论，并限制披露的范围和对象。',

  bookingLabel: '预约流程',
  bookingSteps: [
    '提交申请：发送邮件至 contact@liang.world，标题注明"咨询预约+姓名"。邮件中请简要说明来意（不必详述，一两句话即可），并附上您所在城市和首选咨询时段。',
    '预咨询确认：我将在 3 个工作日内回复，与您确认预咨询时间。',
    '预咨询：约 15 分钟，免费。评估是否适合进入正式咨询。',
    '正式咨询：确认进入后，商定首次咨询时间和后续安排。',
  ],

  closingLabel: '写给犹豫的你',
  closingText: '也许你正处在一段困惑中——不知道该选哪条路，不知道一段关系该继续还是结束，不知道自己在做什么、为什么做、值不值得做。也许你只是隐约感到，"哪里不对"，却又说不清楚。这些感受，都是哲学开始的地方。苏格拉底说："未经省察的人生不值得过。"这句话听起来严苛，其实恰恰相反——省察不是审判，而是解放。当你开始追问，你就已经开始改变。哲学咨询不是只有"病了"才来——它是给每一个认真对待自己生命的人准备的。你只需要带着困惑和诚意来。如果你不确定自己是否适合，不妨从预咨询开始。15 分钟，一杯茶的时间，不收费，没有后续义务。我们聊聊。',

  footerNote: '良之 · 2026年5月 · 广州。本页面信息如有更新，恕不另行通知。请以最新版本为准。',
};

const en: AboutContent = {
  pageTitle: 'About | Consultation — Liang.World',
  heroTitle: 'Dr. Liangzhi · Philosophical Consultation',
  heroSub: 'PhD in Linguistics, University of Edinburgh · Co-founder, Guangzhou Phaenarete AI Technology Co., Ltd. · PI, Phaenarete ASI Lab',
  consultationBadge: 'PHILOSOPHICAL PRACTICE OPEN TO THE WORLD',

  philosLabel: 'Philosophy',
  philosDesc: 'All our activities point toward one ultimate purpose. Aristotle called it Eudaimonia (εὐδαιμονία) — not fleeting pleasure, not the satisfaction of fame, but like a tree growing, branching, blooming, and bearing fruit according to its own nature: a human life flourishing through the full realization of reason and virtue. Two millennia later, Confucius said the same in another language: "At seventy, I could follow my heart\'s desire without transgressing the norm." The unity of freedom and order, the harmony of inner desire and outer norms — this is the happiness of tian ren he yi (the unity of heaven and humanity). The consultation I offer is rooted at this intersection — between Western rational inquiry and Eastern cultivation of virtue, helping you see your situation clearly, clarify your confusion, and make choices that are truly your own.',

  methodLabel: 'Methodology',
  methodDesc: 'I employ Integrative Philosophical Counseling, framed by three pillars:',
  methodItems: [
    {
      title: 'PEACE Process',
      desc: 'Proposed by Lou Marinoff: five steps — Problem, constructive expression of Emotion, Analysis, Contemplation of a philosophical disposition, and Equilibrium regained. These five steps are not a mechanical procedure, but a navigational chart guiding the dialogue from confusion toward clarity.',
    },
    {
      title: 'Seven Virtues of the North Star',
      desc: 'Wisdom, Conscience, Courage, Temperance, Justice, Sincerity, and Magnanimity. The Seven Virtues are not external moral doctrines, but an inner compass that I calibrate together with you in every dialogue. When you feel lost between advance and retreat, we will examine together: which virtue is calling you?',
    },
    {
      title: 'Socratic Dialogue',
      desc: 'I do not provide answers. Through questioning, definition, counterexample, and induction, I help you discover what you already know but have not yet clearly articulated. I am the midwife; you are the producer — truth must be born from your own thinking.',
    },
  ],

  bioLabel: 'About the Consultant',
  bioItems: [
    'Dr. Ang Li (Liangzhi) — philosophical practitioner, researcher in AI and energy technology.',
    'PhD in Linguistics, University of Edinburgh.',
    'Co-founder, Guangzhou Phaenarete AI Technology Co., Ltd.',
    'PI, Phaenarete ASI Lab.',
  ],

  slotsLabel: 'Open Slots',
  slotsDesc: 'Three consultation slots per week, including one pro bono slot for: full-time students (with student ID), members of low-income households, persons with disabilities, and others in financial difficulty confirmed through communication. The pro bono slot is not a "lower-quality service" — it is philosophical consultation of the same quality and investment. This is the "Magnanimity" of the Seven Virtues: establishing oneself while establishing others.',

  pricingLabel: 'Pricing',
  regularPricing: 'Regular: One-tenth of the local statutory monthly minimum wage of the client\'s location. Example: if the monthly minimum wage is ¥2,500, the session fee is ¥250. The exact amount is determined after pre-consultation based on your location\'s latest standard.',
  proBonoPricing: 'Pro Bono: 20% discount on the regular rate. Example: if your local minimum wage is ¥2,500/month, the pro bono fee is ¥200/session.',
  pricingPhilosophy: 'This pricing logic is rooted in my conviction: philosophical counseling should not be a luxury — it should be a necessity. In the Apology, Plato has Socrates say: "The god commanded me to spend my life in the pursuit of wisdom, and while I wished to obey, the shadow of poverty has darkened my path." I hope no one will be barred from philosophical counseling by poverty. At the same time, paying is itself part of the counseling work — it establishes a reciprocal contractual relationship and reflects the client\'s serious commitment to their own growth. Things that are free are often not valued — this is a lesson drawn from extensive practice. The pro bono slot retains a nominal fee precisely to safeguard this seriousness.',

  preConsultLabel: 'Pre-Consultation',
  preConsultDesc: 'All new clients receive one free pre-consultation (approximately 15 minutes). Purpose: understand your intentions and expectations; assess whether philosophical counseling is suitable for you (if not, I will honestly tell you and provide referral suggestions where possible); jointly decide whether to enter formal counseling.',

  formatLabel: 'Format & Duration',
  formatDesc: 'Format: primarily online video (via Tencent Meeting or Zoom); in-person sessions available in Guangzhou (venue to be confirmed in advance). Duration: 50 minutes per session. Frequency: typically once per week, to be negotiated after pre-consultation.',

  cancelLabel: 'Cancellation & Rescheduling',
  cancelDesc: 'Please provide at least 24 hours\' notice for cancellation or rescheduling. Sessions not cancelled in time and missed will still be charged at the regular rate. The purpose of this policy is not punishment, but mutual commitment to time — yours and mine are equally precious.',

  scopeLabel: 'Scope & Boundaries',
  scopeProvided: 'I provide:',
  scopeProvidedItems: 'Philosophical dialogue for personal growth, value conflicts, meaning crises, decision dilemmas, interpersonal relationships, career choices, creative blocks, and related issues. Methods: Socratic questioning, conceptual clarification, philosophical text discussion, thought experiments, etc.',
  scopeNotProvided: 'I do NOT provide:',
  scopeNotProvidedItems: [
    'Psychiatric diagnosis or medication (please visit a licensed medical institution).',
    'Emergency psychological crisis intervention (please contact your local psychological crisis hotline).',
    'Long-term psychotherapy (for psychology-oriented counseling, please consult a qualified psychologist).',
  ],
  scopeNote: 'If during pre-consultation or consultation I find that what you need is one of the above services rather than philosophical counseling, I will honestly inform you and provide referral suggestions where possible. This is the "Wisdom" of the Seven Virtues — knowing one\'s boundaries is more important than knowing what one can do.',

  confLabel: 'Confidentiality',
  confDesc: 'All information you share in consultation is strictly confidential. It will not be disclosed to any third party without your written consent. Exceptions (in accordance with Chinese law and professional ethical standards): imminent intention to harm yourself or others; abuse or neglect involving minors, the elderly, or other persons lacking civil capacity; other circumstances requiring disclosure by law. In these exceptional cases, I will discuss with you before disclosure whenever possible and limit the scope and recipients of the disclosure.',

  bookingLabel: 'Booking Process',
  bookingSteps: [
    'Submit Application: Send an email to contact@liang.world with the subject "Consultation Booking + Your Name." Briefly state your intentions (one or two sentences will suffice), and include your city and preferred consultation time.',
    'Pre-Consultation Confirmation: I will reply within 3 working days to confirm the pre-consultation time.',
    'Pre-Consultation: Approximately 15 minutes, free of charge. We assess whether formal consultation is suitable.',
    'Formal Consultation: Once confirmed, we agree on the first session time and subsequent arrangements.',
  ],

  closingLabel: 'A Word to the Hesitant',
  closingText: 'Perhaps you find yourself in a moment of confusion — unsure which path to take, uncertain whether a relationship should continue or end, not knowing what you are doing, why you are doing it, or whether it is worth doing. Perhaps you only have a vague sense that "something is off," but cannot quite articulate it. These feelings are all where philosophy begins. Socrates said: "The unexamined life is not worth living." This sounds harsh, but the opposite is true — examination is not judgment; it is liberation. The moment you begin to question, you have already begun to change. Philosophical counseling is not only for those who are "ill" — it is for everyone who takes their life seriously. You only need to come with your confusion and your sincerity. If you are unsure whether this is right for you, why not begin with a pre-consultation? Fifteen minutes, the time it takes for a cup of tea, free of charge, with no further obligation. Let us talk.',

  footerNote: 'Liangzhi · May 2026 · Guangzhou. Information on this page is subject to change without notice. Please refer to the latest version.',
};

export const aboutContent = { zh, en };
