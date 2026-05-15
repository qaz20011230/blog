import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';

function checkChinese(input: string): boolean {
  const clean = input.trim().toLowerCase();
  const hasRiemann = clean.includes('黎曼');
  const hasZeros = clean.includes('非平凡零点') || clean.includes('非平凡零點');
  const hasReal = clean.includes('实部') || clean.includes('實部');
  const hasHalf = clean.includes('1/2') || clean.includes('二分之一') || clean.includes('一半');
  return hasRiemann && hasZeros && hasReal && hasHalf;
}

function checkEnglish(input: string): boolean {
  const clean = input.trim().toLowerCase();
  const hasRiemann = clean.includes('riemann');
  const hasZeta = clean.includes('zeta') || clean.includes('ζ');
  const hasZeros = clean.includes('non-trivial zeros') || clean.includes('nontrivial zeros') || clean.includes('non trivial zeros');
  const hasReal = clean.includes('real part');
  const hasHalf = clean.includes('1/2') || clean.includes('one-half') || clean.includes('one half') || clean.includes('0.5');
  return hasRiemann && hasZeta && hasZeros && hasReal && hasHalf;
}

export default function Gate() {
  const { setLocale } = useLanguage();
  const [value, setValue] = useState('');
  const [shaking, setShaking] = useState(false);
  const [result, setResult] = useState<'none' | 'zh' | 'en'>('none');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (checkChinese(value)) {
      setResult('zh');
      setTimeout(() => {
        setLocale('zh');
        localStorage.setItem('liang_world_gate_passed', 'true');
        window.location.reload();
      }, 800);
    } else if (checkEnglish(value)) {
      setResult('en');
      setTimeout(() => {
        setLocale('en');
        localStorage.setItem('liang_world_gate_passed', 'true');
        window.location.reload();
      }, 800);
    } else {
      setShaking(true);
      setResult('none');
      setTimeout(() => setShaking(false), 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-hilbert overflow-hidden select-none">
      {/* Ambient background: dot grid + subtle gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,47,167,0.05) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/[0.03] rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Zeta function decorative equation */}
      <div className="absolute top-10 right-10 text-primary/10 font-mono text-xs tracking-wider hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
        {`ζ(s) = ∑_{n=1}^{∞} 1/n^s`}<br />
        {`Re(s) > 1`}
      </div>

      <div className="relative z-10 max-w-xl w-full px-6 text-center space-y-8">
        {/* Title */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-[1px] bg-primary/40" />
            <span className="text-primary/60 font-mono text-xs tracking-[0.3em] uppercase">Protocol</span>
            <div className="w-8 h-[1px] bg-primary/40" />
          </div>
          <h2 className="text-xl md:text-2xl font-serif text-gray-300 tracking-widest">
            LIANG<span className="text-primary">.</span>WORLD
          </h2>
        </div>

        {/* Prompt */}
        <div className="space-y-4">
          <p className="text-gray-500 font-mono text-sm tracking-wider leading-relaxed">
            {`// 请输入黎曼猜想的原始命题以进入网站`}
          </p>
          <p className="text-gray-600 font-mono text-xs tracking-wider">
            Enter the original statement of the Riemann Hypothesis to proceed
          </p>
        </div>

        {/* Input */}
        <div className={cn(
          'relative group transition-all duration-500',
          result === 'zh' && 'animate-scale-in',
          result === 'en' && 'animate-scale-in'
        )}>
          <div className={cn(
            'flex items-center border transition-all duration-500 bg-gray-900/50',
            result === 'zh' || result === 'en'
              ? 'border-primary shadow-[0_0_30px_rgba(0,47,167,0.3)]'
              : shaking
                ? 'border-red-500/50 shake'
                : 'border-gray-800 group-hover:border-gray-700'
          )}>
            <span className={cn(
              'pl-4 font-mono text-sm transition-colors duration-500',
              result === 'zh' || result === 'en' ? 'text-primary' : 'text-gray-600'
            )}>
              &gt;
            </span>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => { setValue(e.target.value); setResult('none'); }}
              onKeyDown={handleKeyDown}
              placeholder={result === 'none' ? '...' : ''}
              disabled={result !== 'none'}
              autoFocus
              className={cn(
                'flex-1 bg-transparent border-none outline-none px-3 py-4 font-mono text-sm tracking-wider placeholder-gray-700 transition-all duration-500',
                result === 'zh' ? 'text-primary' : result === 'en' ? 'text-primary' : 'text-gray-300'
              )}
            />
            <button
              onClick={handleSubmit}
              disabled={result !== 'none'}
              className={cn(
                'px-4 py-4 font-mono text-xs tracking-widest uppercase transition-all duration-500',
                result !== 'none'
                  ? 'text-primary/40 cursor-default'
                  : 'text-gray-600 hover:text-primary'
              )}
            >
              ↵
            </button>
          </div>

          {/* Result glow */}
          {result !== 'none' && (
            <div className="absolute inset-0 bg-primary/5 animate-pulse-glow pointer-events-none" />
          )}
        </div>

        {/* Footer hint */}
        <p className="text-gray-700 font-mono text-[10px] tracking-widest">
          ζ(s) · Re(s) = 1/2
        </p>
      </div>
    </div>
  );
}
