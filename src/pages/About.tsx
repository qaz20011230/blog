import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  useEffect(() => {
    // Inject Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Noto+Serif+SC:wght@300;400;600;900&family=Inter:wght@300;400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="relative text-[#1a1a1a] font-['Inter',sans-serif] min-h-screen pb-20">
      <Helmet>
        <title>关于良之 | 良之世界</title>
      </Helmet>
      
      <style dangerouslySetInnerHTML={{__html: `
        .font-serif-zh { font-family: 'Noto Serif SC', 'Cormorant Garamond', serif; }
        .zeta-bg {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(400px, 80vw, 800px);
          color: rgba(184, 144, 60, 0.03);
          font-family: 'Cormorant Garamond', serif;
          z-index: -1;
          pointer-events: none;
          user-select: none;
        }
        .timeline-dot::before {
          content: '';
          position: absolute;
          left: -29px;
          top: 8px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background-color: #b8903c;
          box-shadow: 0 0 0 4px #ffffff;
        }
        .quote-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-left: 2px solid #b8903c;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
        }
        .skill-tag {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }
        .skill-tag-primary {
          background-color: #fafafa;
          color: #1a1a1a;
          border: 1px solid #eaeaea;
        }
        .skill-tag-gold {
          background-color: #fff;
          color: #b8903c;
          border: 1px solid #b8903c;
        }
        /* Details animation */
        details > summary {
          list-style: none;
        }
        details > summary::-webkit-details-marker {
          display: none;
        }
      `}} />

      {/* Watermark */}
      <div className="zeta-bg">ζ(s)</div>

      <div className="relative z-10 pt-8 md:pt-16">
        {/* Header / Hero */}
        <header className="mb-24 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-serif-zh font-bold mb-4 tracking-tight text-[#1a1a1a]">
            Ang Li <span className="text-3xl md:text-4xl text-gray-400 font-light ml-4">李昂</span>
          </h1>
          <p className="text-lg md:text-xl text-[#b8903c] font-serif-zh mb-8 tracking-wide">
            Co-Founder & CTO of Phaenarete AI · 前阿里巴巴 CTO · 思想者
          </p>
          <div className="inline-block quote-card p-6 md:p-8 text-lg md:text-xl font-serif-zh italic text-gray-700">
            “以人机协同，叩问希尔伯特第八问题——黎曼猜想。”
          </div>
        </header>

        {/* Section 1: 当下 */}
        <section className="mb-20">
          <h2 className="text-2xl font-serif-zh font-bold mb-8 flex items-center">
            <span className="w-6 h-[1px] bg-[#b8903c] mr-4"></span>
            当下：Phaenarete 之火
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-1 text-sm text-gray-400 font-medium uppercase tracking-widest pt-1">
              2026 - Present <br/><span className="text-gray-300">Guangzhou</span>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-lg font-bold mb-3">广州菲娜睿特人工智能科技有限责任公司</h3>
              <p className="text-gray-600 mb-4 leading-relaxed font-light">
                作为联合创始人与 CTO，致力于推进 <strong className="font-medium text-[#1a1a1a]">Phaenarete 项目</strong>。这是一个试图通过人类与 AI 深度协作，直指黎曼假设的宏大工程。
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                主导研发了 <strong className="font-medium text-[#1a1a1a]">PrimeClaw 多智能体框架</strong>，该框架专为数学猜想探索与 Lean 4 形式化验证而设计，旨在构建机器与人类数学直觉之间的桥梁。
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: 阿里巴巴岁月 */}
        <section className="mb-20">
          <h2 className="text-2xl font-serif-zh font-bold mb-10 flex items-center">
            <span className="w-6 h-[1px] bg-[#b8903c] mr-4"></span>
            阿里巴巴岁月：数字王国的锻造
          </h2>
          <div className="border-l border-gray-200 ml-2 pl-6 space-y-10 relative">
            <div className="relative">
              <div className="timeline-dot"></div>
              <h3 className="text-lg font-bold">CTO <span className="text-[#b8903c] text-sm font-normal ml-3">2010 - 2018</span></h3>
              <p className="mt-2 text-gray-600 leading-relaxed font-light text-sm md:text-base">
                领导全球最大 B2B 电商平台技术战略，服务 2500 万企业、1100 万活跃买家。在此期间，主导了 2012 年阿里巴巴的私有化退市与深度的技术架构重组。
              </p>
            </div>
            <div className="relative">
              <div className="timeline-dot"></div>
              <h3 className="text-lg font-bold">VP <span className="text-[#b8903c] text-sm font-normal ml-3">2004 - 2010</span></h3>
              <p className="mt-2 text-gray-600 leading-relaxed font-light text-sm md:text-base">
                搭建支撑日调用 10 亿次的分布式服务框架。亲历 2007 年史诗级 IPO，创下 258 倍超额认购记录，冻结 4500 亿港元资本，见证了中国电商的历史性时刻。
              </p>
            </div>
            <div className="relative">
              <div className="timeline-dot"></div>
              <h3 className="text-lg font-bold">Senior Director <span className="text-[#b8903c] text-sm font-normal ml-3">2004 - 2007</span></h3>
              <p className="mt-2 text-gray-600 leading-relaxed font-light text-sm md:text-base">
                入职即全面主导平台架构与系统可靠性建设，技术赋能业务，带动市场份额攀升至 74%，为公司的首次上市护航。
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 & 4: 硅谷与缘起 / 学术与育人 */}
        <section className="mb-20 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-serif-zh font-bold mb-6 text-gray-800">学术与育人</h2>
            <div className="p-6 bg-[#fafafa] border border-gray-100 rounded-sm h-full">
              <div className="text-xs text-[#b8903c] mb-1 font-bold tracking-widest">2007 - Present</div>
              <h3 className="text-base font-bold mb-2">浙江大学软件学院</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                担任电子商务技术系创系主任。联合阿里巴巴，在产学研结合的边界，为中国数字商业培养核心技术人才。
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-serif-zh font-bold mb-6 text-gray-800">硅谷与缘起</h2>
            <div className="space-y-6">
              <div className="border-l-2 border-gray-200 pl-4">
                <h3 className="text-base font-bold">Angilon, Inc. <span className="text-xs font-normal text-gray-400 ml-2">硅谷</span></h3>
                <div className="text-xs text-[#b8903c] mt-1 mb-1 font-medium tracking-wide">2000 - 2004 | Founder & Chief Consultant</div>
              </div>
              <div className="border-l-2 border-gray-200 pl-4">
                <h3 className="text-base font-bold">Independent Consultant</h3>
                <div className="text-xs text-[#b8903c] mt-1 mb-2 font-medium tracking-wide">1997 - 2000</div>
                <p className="text-gray-600 text-sm leading-relaxed font-light">为互联网早期架构与分布式系统提供前瞻性的技术战略指引。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: 思想与书写 */}
        <section className="mb-20">
          <h2 className="text-2xl font-serif-zh font-bold mb-8 flex items-center">
            <span className="w-6 h-[1px] bg-[#b8903c] mr-4"></span>
            思想与书写
          </h2>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 space-y-6">
              <details className="group border-b border-gray-100 pb-4 cursor-pointer" open>
                <summary className="text-lg font-serif-zh font-semibold flex justify-between items-center text-[#1a1a1a]">
                  “产婆术框架”（Maieutica）
                  <span className="text-[#b8903c] font-light text-xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed font-light pr-4">
                  一种苏格拉底式的人机数学协作模型。我们不是为了建造更快的机器，而是为了更深刻地理解问题本身。AI 并非给出答案，而是通过不断追问，助产出人类未曾触及的数学直觉。
                </p>
              </details>
              <details className="group border-b border-gray-100 pb-4 cursor-pointer">
                <summary className="text-lg font-serif-zh font-semibold flex justify-between items-center text-[#1a1a1a]">
                  “北斗七星美德”
                  <span className="text-[#b8903c] font-light text-xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed font-light pr-4">
                  基于德性的哲学践行框架。在算法重塑心灵的时代，重建个体内在的秩序与伦理坐标。
                </p>
              </details>
              <details className="group border-b border-gray-100 pb-4 cursor-pointer">
                <summary className="text-lg font-serif-zh font-semibold flex justify-between items-center text-[#1a1a1a]">
                  “关系动力学”
                  <span className="text-[#b8903c] font-light text-xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed font-light pr-4">
                  连接与时间的数理伦理架构。在实体消融的网络中，重新审视“之间”的拓扑与引力。
                </p>
              </details>
            </div>
            <div className="md:col-span-2 flex flex-col justify-center">
              <div className="quote-card p-6 rounded-sm">
                <div className="text-3xl font-serif-zh text-[#b8903c] mb-3">365,000+</div>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  在 <a href="https://liang.world" className="text-[#1a1a1a] font-medium border-b border-[#b8903c] hover:text-[#b8903c] transition-colors">liang.world</a> 上累计书写三十六万五千余字，涵盖逻辑、哲学、心理学与电商，记录下对科技与人文交叉领域的深刻沉思。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: 技术修行 */}
        <section className="mb-24">
          <h2 className="text-xl font-serif-zh font-bold mb-6 text-center text-gray-400 tracking-widest">· 技术修行 ·</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            <span className="skill-tag skill-tag-primary">Lean 4</span>
            <span className="skill-tag skill-tag-primary">依赖类型论</span>
            <span className="skill-tag skill-tag-primary">元语言设计</span>
            <span className="skill-tag skill-tag-primary">证明工程</span>
            <span className="skill-tag skill-tag-gold">大规模分布式架构</span>
            <span className="skill-tag skill-tag-gold">搜索与推荐系统</span>
            <span className="skill-tag skill-tag-gold">零信任身份</span>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-10 text-center">
          <a href="https://liang.world" className="inline-block text-lg font-serif-zh font-bold text-[#1a1a1a] hover:text-[#b8903c] transition-colors mb-6">
            良之世界 · 在逻辑与存在的边界漫步
          </a>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 mb-8 font-light">
            <a href="mailto:contact@liang.world" className="hover:text-[#b8903c] transition-colors">contact@liang.world</a>
            <span className="text-gray-300">|</span>
            <span>Guangzhou</span>
            <span className="text-gray-300">|</span>
            <span>Mandarin & English</span>
          </div>
          <div className="text-xs text-gray-400 flex flex-col items-center space-y-1 font-light">
            <p>© 2026 Ang Li · 良之世界</p>
            <p>最后更新 2026年4月24日 — <a href="https://liang.world/cv" className="hover:text-gray-600 border-b border-gray-300 pb-0.5">https://liang.world/cv</a></p>
          </div>
        </footer>
      </div>
    </div>
  );
}