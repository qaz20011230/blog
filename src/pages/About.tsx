import React from 'react';
import { Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">关于我 / About Me</h1>
      
      <div className="prose prose-lg prose-slate mb-8">
        <h3 className="text-xl font-bold mt-6 mb-4">良之世界：思想助产与科学探索的工坊</h3>
        <p>
          欢迎来到「良之世界」。我是<strong>良之</strong>，一名「思想助产士」，也是 <strong>Phaenarete Project（菲娜睿特计划）</strong>的发起者。
        </p>
        <p>
          这不是一份官方登记的职业，而是源于生命深处的召唤。我愿成为你思想觉醒之路的同行者，亦愿成为人类智识探索的铺路石——不为提供标准答案，而是通过严谨而深邃的对话与协作，协助个体辨识思想主权，协助科学孕育真理。
        </p>
        <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4">
          <p><strong>“我不生产真理，我只助产真理。”</strong></p>
          <p>无论面对的是一个困惑的灵魂，还是一个悬而未决的世纪猜想，我的角色从未改变：<strong>创造让真理得以自行显现的场域。</strong></p>
        </blockquote>
        
        <h3 className="text-xl font-bold mt-6 mb-4">一、三重根：我之所从来</h3>
        <p>
          我的视角由三条线索交织而成，它们共同构成了 Phaenarete Project 的底层逻辑：
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>系统之思（管理学背景）</strong>：
            早年在国内一所理工科大学接受管理学科训练，赋予我剖析商业逻辑与复杂系统的结构化思维。我擅长将抽象哲思转化为清晰、可推演、可实践的认知模型，让思想得以在现实中扎根。在科研项目中，这体现为对资源的高效配置与工程架构的系统设计。
          </li>
          <li>
            <strong>叩问之志（哲学博士训练）</strong>：
            随后在欧洲一所知名研究型大学攻读哲学，并在哲学践行研究所长期浸润，让我在现象学、精神分析与古典思想的深处，养成了穿透表象、追问本质的习惯。每一次发问，都旨在触及事物底层的逻辑与真实的意义。
          </li>
          <li>
            <strong>跨界之历（生命实感）</strong>：
            曾亲历科技与商业的实战博弈，亦曾深入工厂流水线、大学讲台与特殊机构，观察“他者”的生存状态。这些生命的切片，让我对人的生存状态拥有超越理论的切身理解。
          </li>
        </ul>
        <p className="mt-4">
          正是 <strong>系统思维、哲学深度与生命实感</strong> 的融合，让我深信：真正的洞见，往往诞生于理性与经验、结构与自由、逻辑与意义的交界地带。
        </p>

        <h3 className="text-xl font-bold mt-6 mb-4">二、双轨实践：微观对话与宏观攻关</h3>
        <p>
          在这个网站上，您将看到两条并行不悖的实践轨迹：
        </p>
        
        <h4 className="text-lg font-semibold mt-4 mb-2">🌱 轨迹 A：个体思想助产</h4>
        <p>
          这是我始终坚守的初心。我每周开放一定时段，用于基于 <strong>精神分析与哲学践行</strong> 的一对一深度对话。
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>对话对象</strong>：深陷意义虚无的追问者、困于逻辑悖论的思想者、寻求建立思想主权的个体。</li>
          <li><strong>对话方法</strong>：以「北辰七德」为伦理框架，协助你澄清概念、暴露预设、重构认知。</li>
          <li><strong>对话契约</strong>：费用参照你所在地月最低工资标准的十分之一设定。这并非商业交易，而是你对自己思想严肃性的 <strong>契约性确认</strong>。</li>
          <li><strong>对话预约</strong>：请通过邮件联系 <strong>contact@liang.world</strong>，并在来信中简要描述你所面临的思想困境或希望探讨的议题。我们将在收到邮件后与你沟通后续安排。</li>
        </ul>

        <h4 className="text-lg font-semibold mt-4 mb-2">🚀 轨迹 B：Phaenarete Project（菲娜睿特计划）</h4>
        <p>
          这是面向未来的宏大实验。我们正集结全球顶尖数学力量（包括 <strong>希尔伯特问题解决者</strong> 与 <strong>多国科学院院士</strong>），构建 <strong>Maieutica Framework</strong>，试图攻克黎曼猜想等百年难题。
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>使命</strong>：探索“人机共生”的科研新范式，让 AI 成为数学家的“助产士”，而非替代者。</li>
          <li><strong>产出</strong>：开源的多智能体系统、形式化数学库，以及关于科学方法论的持续思考。</li>
          <li><strong>信念</strong>：<strong>寻找本身就是意义。</strong> 即使最终未能证明猜想，过程中建立的工具与伦理也将照亮后来者的路。</li>
          <li><strong>支持</strong>：本项目已申请 <strong>AI for Math Fund 2026</strong> 资助，承诺所有代码与数据开源。</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-4">三、归宿：通往生命的繁花盛开</h3>
        <p>
          无论是协助个体厘清内在冲突，还是辅助团队攻关数学难题，我们的终点始终一致：
        </p>
        <p className="font-medium text-primary">
          指向一种更整全、更蓬勃的生命状态。
        </p>
        <p>
          它印证了孔子 <strong>“从心所欲不逾矩”</strong> 的圆融——内心直觉与外在逻辑的和谐统一；<br/>
          它呼应了亚里士多德的 <strong>“Eudaimonia”</strong> ——人的潜能之花在理性与践行中的圆满绽放。
        </p>
        <p>
          <strong>我们的工作，是扫除思想荆棘，让属于你的生命之树（或人类的智识之树），依其本性，向着阳光自由生长。</strong>
        </p>

        <h3 className="text-xl font-bold mt-6 mb-4">四、连接与共鸣</h3>
        <p>
          这个博客记录了从个体咨询到科学攻关的思考脉络。它是一座桥，连接着抽象理论与具体生命，连接着孤独的追问者与宏大的共同体。
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>项目进展与深度文章</strong>：请浏览 <a href="/" className="text-primary hover:underline">首页</a> 与 <a href="/weekly" className="text-primary hover:underline">周刊</a></li>
          <li><strong>个体对话预约</strong>：请发邮件至 <strong>contact@liang.world</strong>，并在标题注明“预约咨询”</li>
          <li><strong>商务合作与项目联络</strong>：contact@liang.world（请在邮件中说明来意）</li>
        </ul>
        
        <blockquote className="border-l-4 border-gray-200 pl-4 italic my-6">
          <p><strong>“北辰在上，众星共之。”</strong></p>
          <p>欢迎你常来。期待与你相遇在思想最诚实、最富于勇气的边缘——无论是在内心的幽微处，还是在真理的浩瀚中。</p>
        </blockquote>
      </div>

      <div className="border-t border-gray-100 pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Connect</h2>
        <div className="flex flex-col space-y-3">
          <a href="mailto:contact@liang.world" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <Mail className="mr-3" size={20} />
            contact@liang.world
          </a>
        </div>
      </div>
    </div>
  );
}
