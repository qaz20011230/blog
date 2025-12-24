import React from 'react';
import { Mail, Github, Twitter } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">关于我 / About Me</h1>
      
      <div className="prose prose-lg prose-slate mb-8">
        <p>
          欢迎来到【良的世界】。你好，我是「思想助产士」。
        </p>
        <p>
          这不是一个职业，而是一种定位——我致力于成为你思维之旅中的协作者与催化剂。我的工作并非灌输观点，而是通过严谨的梳理、结构化的追问与跨领域的连接，助你清晰地显影那些尚在雏形的思想，并推动其逻辑自洽、落地生长。
        </p>
        <p>
          我的学科背景是广东工业大学电子商务管理学学士，这让我对商业逻辑和系统结构有天然的敏感；而对哲学、心理学与形式逻辑的持续研习，则塑造了我追问本质与洞察人性的思维习惯。正是这种“电商的系统思维”与“人文的叩问精神”的结合，让我相信，真正的洞察往往诞生于学科的交界处。
        </p>
        <p>
          在这里，对话是核心。无论是像“将SICAS模型安顿于七美德框架”这样的跨界思辨，还是对具体商业、科技与人文现象的深度剖析，我们都将一同探索事物背后的脉络、框架与可能性。我相信，真正有力的思想诞生于高质量的对话之中。
        </p>
        <p>
          此博客是我的思考“工坊”，记录并分享这些助产的过程与成果。它是一座桥梁，连接抽象理论与具体实践，也连接你我这样对世界保持好奇与追问的个体。
        </p>
        <p>
          欢迎你常来，更期待与你交流。若想更便捷地追踪思考脉络、参与日常讨论，欢迎关注我的微信公众号：
        </p>
        <p className="font-bold text-primary">
          微信公众号：思想助产士
        </p>
        <p>
          在那里，我们将继续这场无止境的思维助产。
        </p>

        <hr className="my-8" />

        <p>
          Welcome to [Liang's World]. Hello, I am the “Thought Midwife.”
        </p>
        <p>
          This is not a profession, but a calling—I strive to be a collaborator and catalyst in your journey of thinking. My work is not to impart doctrines, but to help you bring nascent ideas into clear focus and foster their logical coherence and practical growth, through rigorous analysis, structured inquiry, and interdisciplinary connections.
        </p>
        <p>
          My academic foundation is a Bachelor of Management in E-Commerce from Guangdong University of Technology, which attuned me to business logic and systemic structures. My ongoing engagement with philosophy, psychology, and formal logic, meanwhile, has shaped my habit of questioning essences and discerning human nature. It is precisely this fusion of “the systematic thinking of e-commerce” and “the interrogative spirit of the humanities” that convinces me true insight often emerges at the intersection of disciplines.
        </p>
        <p>
          Here, dialogue is central. Whether it’s cross-disciplinary contemplation like “embedding the SICAS model within the framework of the seven virtues,” or in-depth analysis of specific phenomena in business, technology, and the humanities, we will explore together the underlying structures, frameworks, and possibilities. I believe that truly robust thought is born from high-quality dialogue.
        </p>
        <p>
          This blog is my thinking “atelier,” documenting and sharing these processes and outcomes of intellectual midwifery. It serves as a bridge—connecting abstract theory with concrete practice, and connecting individuals like you and me who remain curious and questioning about the world.
        </p>
        <p>
          You are always welcome here, and I look forward to our exchanges. For a more immediate connection to the flow of thoughts and daily discussions, you are warmly invited to follow my WeChat Official Account:
        </p>
        <p className="font-bold text-primary">
          WeChat Official Account: 思想助产士 (Thought Midwife)
        </p>
        <p>
          There, we shall continue this never-ending practice of thinking together.
        </p>
      </div>

      <div className="border-t border-gray-100 pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Connect</h2>
        <div className="flex flex-col space-y-3">
          <a href="mailto:contact@liang.world" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <Mail className="mr-3" size={20} />
            contact@liang.world
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <Github className="mr-3" size={20} />
            Follow on GitHub
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <Twitter className="mr-3" size={20} />
            Follow on Twitter
          </a>
        </div>
      </div>
    </div>
  );
}
