"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="scroll-section relative h-[90vh] w-full flex items-center justify-center overflow-hidden px-4 z-10 text-center bg-transparent">
      <div className="content-box max-w-4xl mt-10">
        <motion.p 
          className="text-emerald-700 font-mono tracking-widest mb-4 uppercase text-xs border border-emerald-200 inline-block px-4 py-1 rounded-full bg-emerald-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          2026 年度硬核数据新闻特别报道
        </motion.p>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-black text-slate-950 mb-6 leading-tight"
          initial={{ letterSpacing: "0.2em", opacity: 0 }}
          animate={{ letterSpacing: "0.02em", opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          消失的赛博遗产<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600">
            我们真的“拥有”虚拟资产吗？
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-slate-500 text-sm md:text-base mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          这不是代码的狂欢，而是数字权属的隐形困局。<br/>
          聚焦虚拟资产的权属悖论、二级贬值折旧、司法纠纷大盘与数字遗产继承。
        </motion.p>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="flex flex-col items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="text-[10px] uppercase font-mono text-slate-400 tracking-widest">
            向下滚动开始数据探索
          </span>
          <div className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ 
                y: [0, 10, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-1.5 h-1.5 bg-emerald-600 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
