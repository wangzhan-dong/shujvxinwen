"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import dynamic from 'next/dynamic';
const Scene3D = dynamic(() => import('@/components/canvas/Scene3D'), { ssr: false });

// Import our sections
import Hero from '@/components/sections/Hero';
const Paradigm = dynamic(() => import('@/components/sections/Paradigm'), { ssr: false });
import Timeline from '@/components/sections/Timeline';
import Assets from '@/components/sections/Assets';
const Data = dynamic(() => import('@/components/sections/Data'), { ssr: false });
import DataDeepDive from '@/components/sections/DataDeepDive';
const SourceDataViz = dynamic(() => import('@/components/sections/SourceDataViz'), { 
  ssr: false,
  loading: () => <div className="min-h-[500px] flex items-center justify-center bg-[#06061a] text-white/20">加载信源数据...</div>
});
const AssetEvaluator = dynamic(() => import('@/components/sections/AssetEvaluator'), { 
  ssr: false,
  loading: () => <div className="min-h-[500px] flex items-center justify-center bg-[#0a0a14] text-white/20">加载身价评估中心...</div>
});
const TrueOwnershipBalance = dynamic(() => import('@/components/sections/TrueOwnershipBalance'), {
  ssr: false,
  loading: () => <div className="min-h-[500px] flex items-center justify-center bg-[#070714] text-white/20">加载所有权天平...</div>
});
const AssetDepreciationFunnel = dynamic(() => import('@/components/sections/AssetDepreciationFunnel'), {
  ssr: false,
  loading: () => <div className="min-h-[500px] flex items-center justify-center bg-[#0a0a14] text-white/20">加载残值蒸发漏斗...</div>
});
const DataExplorer = dynamic(() => import('@/components/sections/DataExplorer'), {
  ssr: false,
  loading: () => <div className="min-h-[500px] flex items-center justify-center bg-[#05050A] text-white/20">加载数据探索器...</div>
});
const InteractiveQuiz = dynamic(() => import('@/components/sections/InteractiveQuiz'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] flex items-center justify-center bg-[#08081a] text-white/20">加载知识挑战...</div>
});
const LivePoll = dynamic(() => import('@/components/sections/LivePoll'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] flex items-center justify-center bg-[#0a0a18] text-white/20">加载实时民调...</div>
});
import Psychology from '@/components/sections/Psychology';
const Legal = dynamic(() => import('@/components/sections/Legal'), { ssr: false });
import Sources from '@/components/sections/Sources';

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in animation for elements with .content-box
    const contentBoxes = gsap.utils.toArray('.content-box');
    
    contentBoxes.forEach((box) => {
      gsap.fromTo(box as HTMLElement, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: box as HTMLElement,
            start: "top 85%", // Triggers when the top of the box hits 85% down the viewport
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Cleanup scroll triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="relative w-full overflow-x-hidden min-h-screen selection:bg-sky-500/30 font-sans">
      
      {/* 3D Background */}
      <Scene3D />

      {/* Navigation Layer */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md px-6 py-4 transition-all duration-300 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs lg:text-sm">
          <div className="flex items-center space-x-2 pointer-events-auto">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-bold italic shadow-lg">N</div>
            <span className="font-bold text-base lg:text-xl tracking-tighter text-white">虚拟资产发展全景观察</span>
          </div>
          <div className="hidden lg:flex space-x-4 text-slate-400 pointer-events-auto font-medium">
            <a href="#hero" className="hover:text-sky-400 transition">起势</a>
            <a href="#evolution" className="hover:text-sky-400 transition">时代演进</a>
            <a href="#assets" className="hover:text-sky-400 transition">核心锚点</a>
            <a href="#deepdive" className="hover:text-sky-400 transition font-bold text-sky-500">📊 数据深潜</a>
            <a href="#sourcedata" className="hover:text-amber-400 transition font-bold text-amber-400">📋 信源数据</a>
            <a href="#data-explorer" className="hover:text-emerald-400 transition font-bold text-emerald-400">🔍 探索库</a>
            <a href="#evaluator" className="hover:text-sky-400 transition px-2 py-1 bg-white/5 rounded-lg border border-white/10">✨ 身价</a>
            <a href="#ownership-balance" className="hover:text-sky-400 transition px-2 py-1 bg-white/5 rounded-lg border border-white/10">⚖️ 天平</a>
            <a href="#depreciation-funnel" className="hover:text-amber-400 transition px-2 py-1 bg-white/5 rounded-lg border border-white/10">📉 漏斗</a>
            <a href="#quiz" className="hover:text-emerald-400 transition px-2 py-1 bg-white/5 rounded-lg border border-white/10">🧠 挑战</a>
            <a href="#poll" className="hover:text-rose-400 transition">🗳️ 投票</a>
            <a href="#legal" className="hover:text-sky-400 transition">合规</a>
          </div>
          <button onClick={() => document.getElementById('sources')?.scrollIntoView()} className="pointer-events-auto bg-white/10 text-white px-3 lg:px-5 py-2 rounded-full text-[10px] lg:text-xs font-bold hover:bg-sky-600 border border-white/20 transition shadow-md whitespace-nowrap">
            数据源
          </button>
        </div>
      </nav>

      {/* Main Content Sections */}
      <Hero />
      <div className="relative bg-[#05050A]/80 backdrop-blur-sm z-10 w-full">
        <Paradigm />
        <Timeline />
        <Assets />
        <Data />
        <DataDeepDive />
        <SourceDataViz />
        <DataExplorer />
        <AssetEvaluator />
        <TrueOwnershipBalance />
        <AssetDepreciationFunnel />
        <InteractiveQuiz />
        <LivePoll />
        <Psychology />
        <Legal />
        <Sources />
      </div>

    </main>
  );
}
