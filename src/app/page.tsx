"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

// 导入核心 Hero 块
import Hero from '@/components/sections/Hero';

// 动态载入数据可视化和探索组件
const TrueOwnershipBalance = dynamic(() => import('@/components/sections/TrueOwnershipBalance'), {
  ssr: false,
  loading: () => <div className="min-h-[500px] flex items-center justify-center bg-white text-slate-400 font-mono text-xs">加载所有权天平...</div>
});
const AuthorityFacts = dynamic(() => import('@/components/sections/AuthorityFacts'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] flex items-center justify-center bg-white text-slate-400 font-mono text-xs">加载权威事实数据...</div>
});
const DataExplorer = dynamic(() => import('@/components/sections/DataExplorer'), {
  ssr: false,
  loading: () => <div className="min-h-[500px] flex items-center justify-center bg-white text-slate-400 font-mono text-xs">加载数据探索实验室...</div>
});
const AssetDepreciationFunnel = dynamic(() => import('@/components/sections/AssetDepreciationFunnel'), {
  ssr: false,
  loading: () => <div className="min-h-[500px] flex items-center justify-center bg-white text-slate-400 font-mono text-xs">加载残值蒸发漏斗...</div>
});
const CyberWill = dynamic(() => import('@/components/sections/CyberWill'), {
  ssr: false,
  loading: () => <div className="min-h-[500px] flex items-center justify-center bg-white text-slate-400 font-mono text-xs">加载数字遗嘱生成器...</div>
});

const Legal = dynamic(() => import('@/components/sections/Legal'), { ssr: false });
import Sources from '@/components/sections/Sources';

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const contentBoxes = gsap.utils.toArray('.content-box');
    
    contentBoxes.forEach((box) => {
      gsap.fromTo(box as HTMLElement, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: box as HTMLElement,
            start: "top 85%", 
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="relative w-full overflow-x-hidden min-h-screen selection:bg-emerald-100 bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      
      {/* Light Grid Overlay Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Navigation Layer */}
      <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md px-4 sm:px-6 py-4 border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs lg:text-sm">
          <div className="flex items-center space-x-2 pointer-events-auto">
            <div className="w-8 h-8 lg:w-9 lg:h-9 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black shadow-md">D</div>
            <span className="font-black text-sm lg:text-lg tracking-tighter text-slate-800">消失的赛博遗产 / 数据新闻</span>
          </div>
          
          {/* Scroll Anchors */}
          <div className="hidden md:flex space-x-4 text-slate-500 pointer-events-auto font-medium text-xs">
            <a href="#hero" className="hover:text-emerald-600 transition">起势</a>
            <a href="#ownership-balance" className="hover:text-emerald-600 transition">1. 介绍问题 (权属天平)</a>
            <a href="#authority-facts" className="hover:text-emerald-600 transition">2. 讲现状 (数据实证)</a>
            <a href="#data-explorer" className="hover:text-emerald-600 transition">3. 探索库</a>
            <a href="#depreciation-funnel" className="hover:text-emerald-600 transition">4. 分析原因 (贬值漏斗)</a>
            <a href="#cyber-will" className="hover:text-emerald-600 transition">5. 解决对策 (数字遗嘱)</a>
            <a href="#legal" className="hover:text-emerald-600 transition">司法合规</a>
          </div>
          
          <button onClick={() => document.getElementById('sources')?.scrollIntoView()} className="pointer-events-auto bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-[10px] lg:text-xs font-bold hover:bg-emerald-600 hover:text-white border border-slate-200 transition shadow-sm whitespace-nowrap">
            数据信源
          </button>
        </div>
      </nav>

      {/* Main Content Sections */}
      <div className="relative z-10 w-full">
        <Hero />
        <TrueOwnershipBalance />
        <AuthorityFacts />
        <DataExplorer />
        <AssetDepreciationFunnel />
        <CyberWill />
        <Legal />
        <Sources />
      </div>

    </main>
  );
}
