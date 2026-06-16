"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// 数据模型定义
const DEP_MODELS = [
  {
    id: "gacha_game",
    name: "二次元抽卡游戏 (如原神/鸣潮)",
    icon: "✨",
    initial: 10000,
    steps: [
      { label: "初始充值", value: 10000, desc: "充值获取游戏内代币" },
      { label: "渠道税与分成", value: 7000, desc: "iOS/Android渠道强行抽税 30%，厂商实得 70%" },
      { label: "绑定贬值", value: 2000, desc: "不可单件流转，绑定整号。二手交易中位数折扣为 2.0 折" },
      { label: "平台交易费", value: 1840, desc: "交易平台中介抽成 8%" },
      { label: "实际回血", value: 1820, desc: "提现手续费 1%，最终资金留存率约 18.2%" }
    ],
    summary: "二次元游戏极其注重“角色情感连接”，账号不具备单件交易流通性，且角色池随着版本迭代迅速贬值。充值即意味着 80% 以上资金瞬间沉没。"
  },
  {
    id: "competitive_skins",
    name: "竞技射击饰品 (如 CS2 / 无畏契约)",
    icon: "🎯",
    initial: 10000,
    steps: [
      { label: "初始充值", value: 10000, desc: "购入武器皮肤或箱子" },
      { label: "Steam交易税", value: 8500, desc: "官方交易抽税 15% (如在官方市场回血)" },
      { label: "第三方溢价/折扣", value: 7500, desc: "第三方平台交易存在均值 15% 的价格差及磨损折损" },
      { label: "中介抽成", value: 7310, desc: "第三方流转平台扣除 2.5% 服务费" },
      { label: "实际回血", value: 7237, desc: "提现扣除 1% 汇率/手续费，最终保留 72.3%" }
    ],
    summary: "由于拥有极其强劲的二级饰品流转生态与独立的单件交易权，射击类游戏皮肤保值率非常高。但需要警惕饰品暴跌风险及第三方交易非法欺诈。"
  },
  {
    id: "moba_account",
    name: "大众MOBA皮肤 (如王者荣耀)",
    icon: "⚔️",
    initial: 10000,
    steps: [
      { label: "初始充值", value: 10000, desc: "购买英雄皮肤/限定皮肤" },
      { label: "渠道扣除", value: 7500, desc: "官方渠道商与结算扣除约 25%" },
      { label: "账号折价", value: 1200, desc: "成品号交易市场极其惨烈。限定皮肤人均持有率高，整号折价率高达 1.2 折" },
      { label: "交易抽成", value: 1104, desc: "交易猫等交易服务平台抽取 8% 担保费" },
      { label: "实际回血", value: 1092, desc: "最终提现至银行卡扣除 1% 手续费，最终留存率约 10.9%" }
    ],
    summary: "MOBA类游戏虽然用户基数庞大，但皮肤由于不具备稀缺性（量产且人手皆有），在二级市场整号售卖时折旧极为严重。老账号充值数万仅卖一千元是行业常态。"
  }
];

export default function AssetDepreciationFunnel() {
  const [activeModel, setActiveModel] = useState(DEP_MODELS[0]);

  const handleSelectModel = (model: typeof DEP_MODELS[0]) => {
    setActiveModel(model);
    
    // 手机端交互感知优化：自动平滑滚动到漏斗柱状图的展示顶部
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById("mobile-funnel-view")?.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }, 150);
    }
  };

  return (
    <section id="depreciation-funnel" className="scroll-section py-24 bg-white text-slate-900 px-6 relative z-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-amber-600 font-mono text-sm tracking-widest uppercase mb-4 block">
            THE DEPRECIATION FUNNEL / 虚拟残值蒸发漏斗
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-950">
            “充钱一时爽，退坑剩两响”
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
            你充值的每一分钱，在经历渠道税、锁定贬值、平台抽佣之后，最终在二级市场流转中变成了“像素泡沫”。以下为三种主流虚拟资产从充值到变现的资金缩损漏斗。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Selector & Description (Hidden on mobile for better flow) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between bg-slate-50 border border-slate-200/80 p-8 rounded-[2.5rem] shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-5 bg-amber-500 rounded-full"></span>
                选择资产类型进行评估
              </h3>
              
              <div className="flex flex-col gap-3 mb-8">
                {DEP_MODELS.map((model) => {
                  const isActive = activeModel.id === model.id;
                  return (
                    <button
                      key={model.id}
                      onClick={() => handleSelectModel(model)}
                      className={`w-full text-left px-5 py-4 rounded-2xl flex items-center justify-between transition-all border ${
                        isActive
                          ? "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 text-slate-900 shadow-sm"
                          : "bg-white border-slate-200 text-slate-650 text-slate-800 hover:bg-slate-100/50"
                      }`}
                    >
                      <span className="flex items-center gap-3 text-sm font-semibold">
                        <span className="text-xl">{model.icon}</span>
                        {model.name}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-bold">充值 ¥{model.initial.toLocaleString()}</span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-amber-700">📊 贬值本质透视：</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {activeModel.summary}
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-50/50 rounded-2xl border border-amber-200/70">
              <div className="text-xs font-bold text-amber-700 mb-1">💡 融合新闻视角</div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                游戏资产具备天然的“停服通缩”与“运营贬值”特征。大多数玩家往往误将“娱乐开支”当成“资产投资”，忽视了极高的残值蒸发率。
              </p>
            </div>
          </div>

          {/* Right SVG Funnel Visualization */}
          <div id="mobile-funnel-view" className="lg:col-span-7 bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-center">
            
            {/* Mobile Selector: 3-column tabs */}
            <div className="grid grid-cols-3 gap-2 lg:hidden w-full mb-6">
              {DEP_MODELS.map((model) => {
                const isActive = activeModel.id === model.id;
                return (
                  <button
                    key={model.id}
                    onClick={() => handleSelectModel(model)}
                    className={`px-2 py-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      isActive
                        ? "bg-amber-600 border-amber-600 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100/50"
                    }`}
                  >
                    <span className="text-lg">{model.icon}</span>
                    <span className="text-[9px] font-bold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
                      {model.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-mono text-slate-500 mb-6 flex justify-between font-bold">
              <span>CAPITAL LOSS SEQUENCE / 资金流失演进</span>
              <span className="text-amber-700">初始充值 ¥10,000</span>
            </div>

            {/* Funnel Rows */}
            <div className="space-y-4">
              {activeModel.steps.map((step, index) => {
                const percent = (step.value / activeModel.initial) * 100;
                let barColor = "bg-gradient-to-r from-amber-500 to-orange-500";
                if (index === 0) barColor = "bg-gradient-to-r from-sky-400 to-indigo-500";
                else if (index === 4) barColor = "bg-gradient-to-r from-rose-500 to-red-600";

                return (
                  <div key={index} className="relative group">
                    {/* Step Name & Value */}
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2 px-1">
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center font-mono text-[10px] text-slate-600">
                          {index + 1}
                        </span>
                        {step.label}
                      </span>
                      <span className="font-mono text-sm text-slate-800">
                        ¥{step.value.toLocaleString()} <span className="opacity-50 text-xs font-normal">({percent.toFixed(1)}%)</span>
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full bg-slate-200/50 h-8 rounded-xl overflow-hidden border border-slate-200/60 flex items-center relative">
                      
                      {/* Flowing animated fill */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full ${barColor} relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-white/10 animate-[pulse_2s_infinite] pointer-events-none"></div>
                      </motion.div>

                      {/* Small text description inside bar */}
                      <span className="absolute left-3 text-[10px] text-slate-650 text-slate-800 font-bold pointer-events-none truncate max-w-[90%]">
                        {step.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Return rate box */}
            <div className="mt-8 border-t border-slate-200 pt-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block font-bold">FINAL RECOVERY RATE</span>
                <span className="text-xs text-slate-600 font-bold">最终资金回血率</span>
              </div>
              <div className="text-right">
                <motion.span
                  key={activeModel.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-3xl font-black text-rose-600 font-mono"
                >
                  {((activeModel.steps[4].value / activeModel.initial) * 100).toFixed(1)}%
                </motion.span>
              </div>
            </div>

            {/* Mobile-only Summary and Tips */}
            <div className="lg:hidden mt-6 pt-6 border-t border-slate-200/80 space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-amber-700">📊 贬值本质透视：</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {activeModel.summary}
                </p>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/70 text-[10px] text-slate-500 leading-relaxed font-medium">
                <span className="font-bold text-amber-700">💡 融合新闻视角：</span>
                游戏资产具备天然的“停服通缩”与“运营贬值”特征。大多数玩家往往误将“娱乐开支”当成“资产投资”，忽视了极高的残值蒸发率。
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
