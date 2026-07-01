import type { ReactNode } from 'react';
import { Head } from 'vite-react-ssg';
import { Mail, Shield, Users, Sparkles, BookOpen, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { aboutContent } from '../content/about-content';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-gray-800/50 pt-10 pb-4">
      <h2 className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-6">{title}</h2>
      {children}
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-base font-medium text-gray-200 mb-3 font-serif">{title}</h3>
      {children}
    </div>
  );
}

export function Component() {
  const { locale } = useLanguage();
  const isEn = locale === 'en';
  const content = aboutContent[locale];

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <Head>
        <title>{content.pageTitle}</title>
        <meta name="description" content={isEn ? 'Philosophical Consultation with Leon. Socratic dialogue, PEACE process, Seven Virtues framework. Book online or in Guangzhou.' : '良之的哲学咨询：苏格拉底对话、PEACE流程、北辰七德框架。支持线上预约，广州可面询。'} />
        <meta property="og:title" content={content.pageTitle} />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="https://liang.world/favicon.jpg" />
      </Head>

      {/* Hero */}
      <div className="flex flex-col items-center text-center py-16 space-y-6">
        <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-[0_0_30px_rgba(0,47,167,0.15)]">
          <img src="/AngPhD.png" alt={isEn ? 'Leon' : '良之'} className="w-full h-full object-cover" />
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
