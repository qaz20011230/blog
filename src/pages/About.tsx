import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, Github, Calendar, Clock, Shield, Users, Sparkles, BookOpen, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UI } from '../types';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-gray-800/50 pt-10 pb-4">
      <h2 className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-6">{title}</h2>
      {children}
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-base font-medium text-gray-200 mb-3 font-serif">{title}</h3>
      {children}
    </div>
  );
}

export default function About() {
  const { locale, t } = useLanguage();
  const isEn = locale === 'en';

  const content = {
    pageTitle: isEn ? 'About | Consultation — Liang.World' : '关于 | 哲学咨询 — 良之世界',
    heroTitle: isEn ? 'Dr. Liangzhi · Philosophical Consultation' : '良之博士 · 咨询预约',
    heroSub: isEn ? 'Co-founder, Guangzhou Phaenarete AI · APPA Affiliate Member · IPP Research Assistant' : '广州菲娜睿特AI联合创始人 · APPA附属会员 · 法国哲学践行研究所研究助理',
    consultationBadge: isEn ? 'PHILOSOPHICAL PRACTICE OPEN TO THE WORLD' : '哲学践行向全世界开放',

    philosLabel: isEn ? 'Philosophy' : '哲学理念',
    philosDesc: isEn
      ? 'All our activities point toward one ultimate purpose. Aristotle called it Eudaimonia (εὐδαιμονία) — not fleeting pleasure, not the satisfaction of fame, but like a tree growing, branching, blooming, and bearing fruit according to its own nature: a human life flourishing through the full realization of reason and virtue. Two millennia later, Confucius said the same in another language: "At seventy, I could follow my heart\'s desire without transgressing the norm." The unity of freedom and order, the harmony of inner desire and outer norms — this is the happiness of tian ren he yi (the unity of heaven and humanity). The consultation I offer is rooted at this intersection — between Western rational inquiry and Eastern cultivation of virtue, helping you see your situation clearly, clarify your confusion, and make choices that are truly your own.'
      : '我们的一切活动都指向一个终极目的。亚里士多德称之为 Eudaimonia（εὐδαιμονία）——不是短暂的快乐，不是功名的满足，而是如一棵树按照自己的本性生长、抽枝、开花、结果那样，一个人的生命因理性与美德的充分实现而繁盛。两千多年后，孔子用另一种语言说出了同样的事："七十而从心所欲，不逾矩。"自由与秩序的合一，内在渴望与外在规范的和谐——这正是天人合一的幸福。我做的咨询工作，正是以这个交汇点为根基——在西方的理性思辨与东方的德性涵养之间，帮助你看见自己的处境，澄清自己的困惑，做出属于自己的选择。',

    methodLabel: isEn ? 'Methodology' : '方法取向',
    methodDesc: isEn ? 'I employ Integrative Philosophical Counseling, framed by three pillars:' : '我采用的是整合型哲学咨询，以三个支柱为框架：',
    methodItems: [
      {
        title: 'PEACE Process',
        desc: isEn
          ? 'Proposed by Lou Marinoff: five steps — Problem, constructive expression of Emotion, Analysis, Contemplation of a philosophical disposition, and Equilibrium regained. These five steps are not a mechanical procedure, but a navigational chart guiding the dialogue from confusion toward clarity.'
          : '由 Lou Marinoff 提出，五个步骤依次为 P——辨识问题、E——建设性地表达情绪、A——分析选择、C——沉思哲学性情、E——重获平衡。这五步不是机械的程序，而是一张导航图，指引对话从困惑走向澄明。',
      },
      {
        title: isEn ? 'Seven Virtues of the North Star' : '北辰七德',
        desc: isEn
          ? 'Wisdom, Conscience, Courage, Temperance, Justice, Sincerity, and Magnanimity. The Seven Virtues are not external moral doctrines, but an inner compass that I calibrate together with you in every dialogue. When you feel lost between advance and retreat, we will examine together: which virtue is calling you?'
          : '明智、良心、勇毅、节制、正义、至诚、弘仁。七德不是外在的道德教条，而是我在每一次对话中与你共同校准的内在罗盘。当你感到进退失据，我们会一起检视：是哪一项德行在呼唤你？',
      },
      {
        title: isEn ? 'Socratic Dialogue' : '苏格拉底对话',
        desc: isEn
          ? 'I do not provide answers. Through questioning, definition, counterexample, and induction, I help you discover what you already know but have not yet clearly articulated. I am the midwife; you are the producer — truth must be born from your own thinking.'
          : '我不提供答案。我通过诘问、定义、反例和归纳，帮助你发现自己已经知道但尚未清晰表达的东西。我是助产士，你是生产者——真理必须从你自己的思考中诞生。',
      },
    ],

    bioLabel: isEn ? 'About the Consultant' : '咨询师简介',
    bioItems: [
      isEn
        ? 'Ang Li (Liangzhi), PhD — philosophical practitioner, researcher in AI and energy technology.'
        : '良之（Ang Li）博士，哲学践行者，人工智能与能源科技研究者。',
      isEn
        ? 'PhD in Linguistics, University of Edinburgh; Bachelor of Management, Guangdong University of Technology.'
        : '爱丁堡大学语言学博士，广东工业大学管理学学士。',
      isEn
        ? 'Affiliate Member, American Philosophical Practitioners Association (APPA).'
        : '美国哲学从业者协会（APPA）附属会员。',
      isEn
        ? 'Research Assistant, Institut de Pratiques Philosophiques (IPP), France.'
        : '法国哲学践行研究所（Institut de Pratiques Philosophiques）研究助理。',
      isEn
        ? 'Speaker at the 2026 APPA Annual Conference. Presentation: "The Seven Virtues of the North Star."'
        : '2026 年 APPA 年会讲演者，报告主题：The Seven Virtues of the North Star。',
      isEn
        ? 'Author of The Biography of Li Sheng; translator of Philosophical Counseling and The Unthinkable Guide to Argumentation.'
        : '著有《李晟传》，译有《哲学咨询》《不可思议的论证指南》。',
      isEn
        ? 'Co-founder, Guangzhou Phaenarete AI Technology Co., Ltd.'
        : '广州菲娜睿特人工智能科技有限责任公司联合创始人。',
    ],

    slotsLabel: isEn ? 'Open Slots' : '开放名额',
    slotsDesc: isEn
      ? 'Three consultation slots per week, including one pro bono slot for: full-time students (with student ID), members of low-income households, persons with disabilities, and others in financial difficulty confirmed through communication. The pro bono slot is not a "lower-quality service" — it is philosophical consultation of the same quality and investment. This is the "Magnanimity" of the Seven Virtues: establishing oneself while establishing others.'
      : '每周开放 3 个咨询名额，其中 1 个名额为公益咨询，面向：全日制在校学生（凭学生证）、低保家庭成员、残障人士、其他经沟通确认的经济困难者。公益名额并非"低质量服务"，而是同等质量、同等投入的哲学咨询。这是我的北辰七德之"弘仁"——立己立人。',

    pricingLabel: isEn ? 'Pricing' : '收费标准',
    regularPricing: isEn
      ? 'Regular: One-tenth of the local statutory monthly minimum wage of the client\'s location. Example: if the monthly minimum wage is ¥2,500, the session fee is ¥250. The exact amount is determined after pre-consultation based on your location\'s latest standard.'
      : '常规咨询：每次咨询的费用为来访者所在地全日制用工月最低工资标准的十分之一。示例：广州市 2026 年月最低工资标准为 2500 元，则广州来访者的单次咨询费为 250 元。具体金额在预咨询后根据您所在地最新标准确定。',
    proBonoPricing: isEn
      ? 'Pro Bono: 20% discount on the regular rate. Example: if your local minimum wage is ¥2,500/month, the pro bono fee is ¥200/session.'
      : '公益咨询：在常规标准基础上八折收取。示例：若您所在地最低工资标准为 2500 元/月，则公益咨询费用为 200 元/次。',
    pricingPhilosophy: isEn
      ? 'This pricing logic is rooted in my conviction: philosophical counseling should not be a luxury — it should be a necessity. In the Apology, Plato has Socrates say: "The god commanded me to spend my life in the pursuit of wisdom, and while I wished to obey, the shadow of poverty has darkened my path." I hope no one will be barred from philosophical counseling by poverty. At the same time, paying is itself part of the counseling work — it establishes a reciprocal contractual relationship and reflects the client\'s serious commitment to their own growth. Things that are free are often not valued — this is a lesson drawn from extensive practice. The pro bono slot retains a nominal fee precisely to safeguard this seriousness.'
      : '这个定价逻辑，源于我的信念：哲学咨询不应是奢侈品，而应是必需品。柏拉图在《申辩篇》中借苏格拉底之口说："神命我终生从事爱智之学，我虽想从命，但贫困的阴影遮蔽着我。"我希望，没有人会因为贫困而被挡在哲学咨询的门外。同时，付费本身就是咨询工作的一部分——它建立对等的契约关系，体现来访者对自己成长的郑重承诺。免费的东西往往不会被珍惜——这是我从大量实践中得出的经验。公益咨询保留象征性收费，正是为了守护这份郑重。',

    preConsultLabel: isEn ? 'Pre-Consultation' : '首次预咨询',
    preConsultDesc: isEn
      ? 'All new clients receive one free pre-consultation (approximately 30 minutes). Purpose: understand your intentions and expectations; assess whether philosophical counseling is suitable for you (if not, I will honestly tell you and provide referral suggestions where possible); jointly decide whether to enter formal counseling.'
      : '所有新来访者均享有一次免费的预咨询（约 30 分钟）。目的：了解您的来意与期待；评估哲学咨询是否适合您（若不合适，我将坦诚告知并尽可能提供转介建议）；双方共同决定是否进入正式咨询。',

    formatLabel: isEn ? 'Format & Duration' : '咨询形式与时长',
    formatDesc: isEn
      ? 'Format: primarily online video (via Tencent Meeting or Zoom); in-person sessions available in Guangzhou (venue to be confirmed in advance). Duration: 50 minutes per session. Frequency: typically once per week, to be negotiated after pre-consultation.'
      : '形式：线上视频咨询为主（使用腾讯会议或 Zoom）；广州地区可安排线下面询（需提前确认场地）。时长：每次 50 分钟。频率：通常每周一次，具体频率在预咨询后协商确定。',

    cancelLabel: isEn ? 'Cancellation & Rescheduling' : '取消与改期',
    cancelDesc: isEn
      ? 'Please provide at least 24 hours\' notice for cancellation or rescheduling. Sessions not cancelled in time and missed will still be charged at the regular rate. The purpose of this policy is not punishment, but mutual commitment to time — yours and mine are equally precious.'
      : '如需取消或改期，请至少提前 24 小时告知。逾时未取消且未出席的，仍按正常标准计收当次费用。此设置的目的不是惩罚，而是共同维护时间的承诺——您的时间与我的时间，同样珍贵。',

    scopeLabel: isEn ? 'Scope & Boundaries' : '服务范围与边界',
    scopeProvided: isEn ? 'I provide:' : '我提供的：',
    scopeProvidedItems: isEn
      ? 'Philosophical dialogue for personal growth, value conflicts, meaning crises, decision dilemmas, interpersonal relationships, career choices, creative blocks, and related issues. Methods: Socratic questioning, conceptual clarification, philosophical text discussion, thought experiments, etc.'
      : '面向个人成长、价值冲突、意义困惑、决策困境、人际关系、职业选择、创造性阻滞等问题的哲学对话。方法为苏格拉底式诘问、概念澄清、哲学文本讨论、思想实验等。',
    scopeNotProvided: isEn ? 'I do NOT provide:' : '我不提供的：',
    scopeNotProvidedItems: [
      isEn
        ? 'Psychiatric diagnosis or medication (please visit a licensed medical institution).'
        : '精神科诊断与药物治疗（请前往正规医疗机构就诊）。',
      isEn
        ? 'Emergency psychological crisis intervention (please contact your local psychological crisis hotline).'
        : '紧急心理危机干预（请联系当地心理援助热线）。',
      isEn
        ? 'Long-term psychotherapy (for psychology-oriented counseling, please consult a qualified psychologist).'
        : '长期心理治疗（心理学取向的咨询请咨询有资质的心理师）。',
    ],
    scopeNote: isEn
      ? 'If during pre-consultation or consultation I find that what you need is one of the above services rather than philosophical counseling, I will honestly inform you and provide referral suggestions where possible. This is the "Wisdom" of the Seven Virtues — knowing one\'s boundaries is more important than knowing what one can do.'
      : '如果在预咨询或咨询过程中，我发现您需要的是以上服务而非哲学咨询，我将坦诚告知并尽可能提供转介建议。这是北辰七德的"明智"——知道自己的边界，比知道自己能做什么更重要。',

    confLabel: isEn ? 'Confidentiality' : '保密原则',
    confDesc: isEn
      ? 'All information you share in consultation is strictly confidential. It will not be disclosed to any third party without your written consent. Exceptions (in accordance with Chinese law and professional ethical standards): imminent intention to harm yourself or others; abuse or neglect involving minors, the elderly, or other persons lacking civil capacity; other circumstances requiring disclosure by law. In these exceptional cases, I will discuss with you before disclosure whenever possible and limit the scope and recipients of the disclosure.'
      : '您在咨询中透露的全部信息，均受严格保密。未经您书面同意，不会向任何第三方披露。例外情况（依据中国法律法规及专业伦理规范）：您有即刻的自伤或伤人意向；涉及未成年人、老年人或其他无民事行为能力人的虐待或忽视；法律要求披露的其他情形。在上述例外情况下，我会尽可能在披露前与您讨论，并限制披露的范围和对象。',

    bookingLabel: isEn ? 'Booking Process' : '预约流程',
    bookingSteps: [
      isEn
        ? 'Submit Application: Send an email to contact@liang.world with the subject "Consultation Booking + Your Name." Briefly state your intentions (one or two sentences will suffice), and include your city and preferred consultation time.'
        : '提交申请：发送邮件至 contact@liang.world，标题注明"咨询预约+姓名"。邮件中请简要说明来意（不必详述，一两句话即可），并附上您所在城市和首选咨询时段。',
      isEn
        ? 'Pre-Consultation Confirmation: I will reply within 3 working days to confirm the pre-consultation time.'
        : '预咨询确认：我将在 3 个工作日内回复，与您确认预咨询时间。',
      isEn
        ? 'Pre-Consultation: Approximately 30 minutes, free of charge. We assess whether formal consultation is suitable.'
        : '预咨询：约 30 分钟，免费。评估是否适合进入正式咨询。',
      isEn
        ? 'Formal Consultation: Once confirmed, we agree on the first session time and subsequent arrangements.'
        : '正式咨询：确认进入后，商定首次咨询时间和后续安排。',
    ],

    closingLabel: isEn ? 'A Word to the Hesitant' : '写给犹豫的你',
    closingText: isEn
      ? 'Perhaps you find yourself in a moment of confusion — unsure which path to take, uncertain whether a relationship should continue or end, not knowing what you are doing, why you are doing it, or whether it is worth doing. Perhaps you only have a vague sense that "something is off," but cannot quite articulate it. These feelings are all where philosophy begins. Socrates said: "The unexamined life is not worth living." This sounds harsh, but the opposite is true — examination is not judgment; it is liberation. The moment you begin to question, you have already begun to change. Philosophical counseling is not only for those who are "ill" — it is for everyone who takes their life seriously. You only need to come with your confusion and your sincerity. If you are unsure whether this is right for you, why not begin with a pre-consultation? Thirty minutes, the time it takes for a cup of tea, free of charge, with no further obligation. Let us talk.'
      : '也许你正处在一段困惑中——不知道该选哪条路，不知道一段关系该继续还是结束，不知道自己在做什么、为什么做、值不值得做。也许你只是隐约感到，"哪里不对"，却又说不清楚。这些感受，都是哲学开始的地方。苏格拉底说："未经省察的人生不值得过。"这句话听起来严苛，其实恰恰相反——省察不是审判，而是解放。当你开始追问，你就已经开始改变。哲学咨询不是只有"病了"才来——它是给每一个认真对待自己生命的人准备的。你只需要带着困惑和诚意来。如果你不确定自己是否适合，不妨从预咨询开始。30 分钟，一杯茶的时间，不收费，没有后续义务。我们聊聊。',

    footerNote: isEn
      ? 'Liangzhi · May 2026 · Guangzhou. Information on this page is subject to change without notice. Please refer to the latest version.'
      : '良之 · 2026年5月 · 广州。本页面信息如有更新，恕不另行通知。请以最新版本为准。',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <Helmet>
        <title>{content.pageTitle}</title>
        <meta name="description" content={isEn ? 'Philosophical Consultation with Dr. Ang Li (Liangzhi). Socratic dialogue, PEACE process, Seven Virtues framework. Book online or in Guangzhou.' : '良之博士的哲学咨询：苏格拉底对话、PEACE流程、北辰七德框架。支持线上预约，广州可面询。'} />
        <meta property="og:title" content={content.pageTitle} />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="https://liang.world/favicon.jpg" />
      </Helmet>

      {/* Hero */}
      <div className="flex flex-col items-center text-center py-16 space-y-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center ring-1 ring-primary/20">
          <span className="text-3xl font-serif font-bold text-primary/80">{isEn ? 'L' : '良'}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-[0.1em]">
          {content.heroTitle}
        </h1>
        <p className="text-sm text-gray-500 font-mono tracking-widest leading-relaxed">
          {content.heroSub}
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/30">
          <Sparkles size={14} className="text-primary" />
          <span className="text-xs font-mono text-primary tracking-wider uppercase">
            {content.consultationBadge}
          </span>
        </div>
      </div>

      {/* Philosophy */}
      <Section title={content.philosLabel}>
        <p className="text-gray-300 leading-relaxed font-serif text-sm md:text-base">
          {content.philosDesc}
        </p>
      </Section>

      {/* Methodology */}
      <Section title={content.methodLabel}>
        <p className="text-gray-400 text-sm mb-6">{content.methodDesc}</p>
        <div className="space-y-6">
          {content.methodItems.map((item, i) => (
            <div key={i} className="flex items-start gap-4 pl-2 border-l-2 border-primary/40">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-200 font-mono tracking-wide uppercase mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Bio */}
      <Section title={content.bioLabel}>
        <ul className="space-y-2">
          {content.bioItems.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
              <Star size={12} className="text-primary/60 mt-1 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Slots & Pricing */}
      <Section title={content.slotsLabel}>
        <div className="flex items-start gap-4 pl-2 border-l-2 border-emerald-500/40 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Users size={14} className="text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">{isEn ? '3 slots/week' : '每周 3 个名额'}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{content.slotsDesc}</p>
          </div>
        </div>

        <SubSection title={content.pricingLabel}>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-gray-300 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
              <span>{content.regularPricing}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-300 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 mt-2 shrink-0" />
              <span>{content.proBonoPricing}</span>
            </div>
            <blockquote className="border-l-2 border-gray-700 pl-4 py-1 text-gray-500 text-xs leading-relaxed italic">
              {content.pricingPhilosophy}
            </blockquote>
          </div>
        </SubSection>

        <SubSection title={content.preConsultLabel}>
          <p className="text-gray-300 text-sm leading-relaxed">{content.preConsultDesc}</p>
        </SubSection>

        <SubSection title={content.formatLabel}>
          <p className="text-gray-300 text-sm leading-relaxed">{content.formatDesc}</p>
        </SubSection>

        <SubSection title={content.cancelLabel}>
          <p className="text-gray-300 text-sm leading-relaxed">{content.cancelDesc}</p>
        </SubSection>
      </Section>

      {/* Scope */}
      <Section title={content.scopeLabel}>
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">{content.scopeProvided}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{content.scopeProvidedItems}</p>
          </div>
          <div>
            <h4 className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-2">{content.scopeNotProvided}</h4>
            <ul className="space-y-1">
              {content.scopeNotProvidedItems.map((item, i) => (
                <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                  <span className="text-orange-500/60 shrink-0">-</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed italic">{content.scopeNote}</p>
        </div>
      </Section>

      {/* Confidentiality */}
      <Section title={content.confLabel}>
        <div className="flex items-start gap-4 pl-2 border-l-2 border-gray-700">
          <Shield size={18} className="text-gray-600 mt-0.5 shrink-0" />
          <p className="text-gray-300 text-sm leading-relaxed">{content.confDesc}</p>
        </div>
      </Section>

      {/* Booking */}
      <Section title={content.bookingLabel}>
        <ol className="space-y-4">
          {content.bookingSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-4 pl-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-mono text-primary shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-gray-300 text-sm leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex items-center gap-3 px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg">
          <Mail size={16} className="text-primary shrink-0" />
          <a href="mailto:contact@liang.world" className="text-primary font-mono text-sm tracking-wide hover:underline">contact@liang.world</a>
        </div>
      </Section>

      {/* Closing */}
      <Section title={content.closingLabel}>
        <div className="flex items-start gap-4 pl-2 border-l-2 border-primary/30">
          <BookOpen size={18} className="text-primary/60 mt-0.5 shrink-0" />
          <p className="text-gray-300 text-sm leading-relaxed font-serif">{content.closingText}</p>
        </div>
      </Section>

      {/* Footer */}
      <div className="mt-16 text-center text-gray-600 text-xs font-mono tracking-wider">
        {content.footerNote}
      </div>
    </div>
  );
}
