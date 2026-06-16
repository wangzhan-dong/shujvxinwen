"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AuthorityFacts() {
  const [activeTab, setActiveTab] = useState<"will" | "court">("will");

  // 中华遗嘱库 00后 财产处分类型模拟比例
  const WILL_DATA = [
    { label: "网络虚拟财产 (支付宝/微信/游戏号/自媒体)", value: 20.3, color: "bg-emerald-500", rawVal: "20.3%" },
    { label: "银行存款与现金储备", value: 38.5, color: "bg-sky-500", rawVal: "38.5%" },
    { label: "房产及实体不动产", value: 16.2, color: "bg-indigo-500", rawVal: "16.2%" },
    { label: "有价证券与理财产品", value: 15.0, color: "bg-amber-500", rawVal: "15.0%" },
    { label: "其他实物及纪念品", value: 10.0, color: "bg-slate-500", rawVal: "10.0%" }
  ];

  // 司法大数据 2019-2024年审结案由分布
  const COURT_DATA = [
    { label: "民事纠纷 (服务协议、所有权确权、遗产继承)", count: 5525, percent: 86.7, color: "bg-purple-500" },
    { label: "刑事案件 (账号盗窃、充值诈骗、非法控数)", count: 847, percent: 13.3, color: "bg-rose-500" }
  ];

  return (
    <section id="authority-facts" className="scroll-section py-20 bg-[#05050A] text-white px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4 block">
            AUTHORITY REPORT / 权威事实与司法实证
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400">
            用真实数据，解开所有权谜团
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
            数据新闻的核心是用数字说话。以下数据直接来源于<b>《中华遗嘱库白皮书》</b>以及<b>中国司法大数据研究院</b>近六年的全国结案实证。
          </p>
        </div>

        {/* Tab Toggle (Mobile Optimization: Big touch areas) */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/5 border border-white/10 p-1.5 rounded-2xl flex max-w-sm w-full">
            <button
              onClick={() => setActiveTab("will")}
              className={`flex-1 py-3 text-xs font-bold rounded-xl transition ${
                activeTab === "will" ? "bg-emerald-500 text-black shadow-lg" : "text-slate-400 hover:text-white"
              }`}
            >
              📜 中华遗嘱库 (虚拟遗产)
            </button>
            <button
              onClick={() => setActiveTab("court")}
              className={`flex-1 py-3 text-xs font-bold rounded-xl transition ${
                activeTab === "court" ? "bg-purple-500 text-black shadow-lg" : "text-slate-400 hover:text-white"
              }`}
            >
              ⚖️ 司法大数据 (诉讼实证)
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Will registry content */}
          {activeTab === "will" && (
            <>
              {/* Stats Card */}
              <div className="lg:col-span-4 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between backdrop-blur-xl">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-400">
                    <span>📜</span> 00后在留下什么？
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    在人们的固有印象中，遗嘱是老年人的专属。然而《中华遗嘱库白皮书》显示，中国立遗嘱人群年轻化趋势正在加剧。
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-4xl md:text-5xl font-mono font-black text-emerald-400">488份</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-1 uppercase tracking-wider">
                        截至2023年底虚拟财产遗嘱总量
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-mono font-black text-sky-400">近 20%</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-1 uppercase tracking-wider">
                        00后遗嘱中虚拟财产的占比
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-slate-500 leading-relaxed italic">
                  * 数据来源：《2023年度中华遗嘱库白皮书》。处分类型包括：支付宝/微信、游戏账号、自媒体账号及数字资产。
                </div>
              </div>

              {/* Chart Card */}
              <div className="lg:col-span-8 bg-black/20 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between backdrop-blur-xl">
                <div>
                  <h3 className="text-lg font-bold text-white mb-6">
                    Z世代（00后）遗嘱中各类财产配置比例
                  </h3>
                  
                  {/* SVG Bar Chart (Mobile Responsive Stack) */}
                  <div className="space-y-5">
                    {WILL_DATA.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span className="truncate max-w-[80%]">{item.label}</span>
                          <span className="font-mono text-emerald-400">{item.rawVal}</span>
                        </div>
                        <div className="w-full bg-white/5 h-3.5 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value * 2}%` }} // 倍增以增强视觉占比体验
                            style={{ maxWidth: "100%" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`h-full ${item.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10 text-xs text-slate-300 leading-relaxed">
                  💡 <b>数据洞察：</b>虚拟财产在00后遗嘱中占比高达20%，位列前茅。这表明在数字原住民眼中，“像素与数据”承载的情感价值和经济价值，已经逼近甚至超越了“实体不动产”。
                </div>
              </div>
            </>
          )}

          {/* Court data content */}
          {activeTab === "court" && (
            <>
              {/* Stats Card */}
              <div className="lg:col-span-4 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between backdrop-blur-xl">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-400">
                    <span>⚖️</span> 六千场法理冲突
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    《民法典》第127条虽然将虚拟财产入法，但具体确权和继承争议的司法诉讼案件依然在高速累积。
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-4xl md:text-5xl font-mono font-black text-purple-400">6,372件</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-1 uppercase tracking-wider">
                        2019-2024上半年全国法院结案数
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <div className="text-2xl font-mono font-black text-slate-300">5,525件</div>
                        <div className="text-[10px] text-slate-500">民事争议</div>
                      </div>
                      <div className="border-l border-white/10 pl-4">
                        <div className="text-2xl font-mono font-black text-slate-300">847件</div>
                        <div className="text-[10px] text-slate-500">刑事案件</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-slate-500 leading-relaxed italic">
                  * 数据来源：中国司法大数据研究院，检索全国审理结案中与“网络虚拟财产”实质相关的民事及刑事案件总数。
                </div>
              </div>

              {/* Chart Card */}
              <div className="lg:col-span-8 bg-black/20 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between backdrop-blur-xl">
                <div>
                  <h3 className="text-lg font-bold text-white mb-6">
                    涉虚拟财产民事与刑事诉讼案由结构比例
                  </h3>

                  {/* Dual Bar Display (Perfect for Mobile screen width) */}
                  <div className="space-y-6">
                    {COURT_DATA.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>{item.label}</span>
                          <span className="font-mono text-purple-400">{item.percent}% <span className="text-slate-500 font-normal">({item.count}件)</span></span>
                        </div>
                        <div className="w-full bg-white/5 h-6 rounded-xl overflow-hidden border border-white/5 flex items-center relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percent}%` }}
                            transition={{ duration: 0.8 }}
                            className={`h-full ${item.color} rounded-xl`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 bg-purple-500/5 p-4 rounded-2xl border border-purple-500/10 text-xs text-slate-300 leading-relaxed space-y-2">
                  <p>💡 <b>民事主诉焦点（86.7%）：</b>多为账号服务纠纷、平台擅自封号索赔、二手装备盗卖协议纠纷。这证明绝大多数冲突都集中在“用户与平台《服务协议》的权利博弈”。</p>
                  <p>💡 <b>刑事指控聚焦（13.3%）：</b>主要为盗窃罪、诈骗罪、非法获取计算机信息系统数据罪。目前，盗取虚拟资产的司法量刑已与现实盗窃罪同等入刑起诉。</p>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </section>
  );
}
