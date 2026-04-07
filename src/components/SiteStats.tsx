import React, { useEffect, useMemo, useState } from 'react';

type StatsPayload = {
  totalWords: number;
};

function formatWords(words: number) {
  if (!Number.isFinite(words) || words <= 0) return '0';
  if (words >= 1000) return `${(words / 1000).toFixed(1)}k`;
  return `${Math.round(words)}`;
}

function readBusuanziValue(id: string) {
  const el = document.getElementById(id);
  const raw = (el?.textContent || '').trim();
  return raw || '';
}

export default function SiteStats() {
  const [totalWords, setTotalWords] = useState<number | null>(null);
  const [pv, setPv] = useState<string>('');
  const [uv, setUv] = useState<string>('');

  const formattedWords = useMemo(() => {
    if (totalWords == null) return '—';
    return formatWords(totalWords);
  }, [totalWords]);

  useEffect(() => {
    let cancelled = false;
    fetch('/stats.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: StatsPayload) => {
        if (cancelled) return;
        if (typeof data?.totalWords === 'number') setTotalWords(data.totalWords);
      })
      .catch(() => {
        if (cancelled) return;
        setTotalWords(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      const nextPv = readBusuanziValue('busuanzi_value_site_pv');
      const nextUv = readBusuanziValue('busuanzi_value_site_uv');
      if (nextPv) setPv(nextPv);
      if (nextUv) setUv(nextUv);
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="text-gray-500 text-sm">
      <span className="hidden" id="busuanzi_value_site_pv" />
      <span className="hidden" id="busuanzi_value_site_uv" />
      站点总字数: {formattedWords} 字 | 总访问量: {pv || '—'} 次 | 总访问人数: {uv || '—'} 人
    </div>
  );
}
