"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WillItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  desc: string;
}

const WILL_ASSETS: WillItem[] = [
  { id: "steam", name: "Steam 游戏库", icon: "🎮", category: "娱乐", desc: "上百款游戏与数千小时的青春存档" },
  { id: "wechat", name: "微信/QQ账号", icon: "💬", category: "社交", desc: "聊天记录、联系人以及表情包库存" },
  { id: "music", name: "云音乐红心歌单", icon: "🎵", category: "精神", desc: "你深夜听过最多次的私房旋律" },
  { id: "photos", name: "云端私密相册", icon: "🖼️", category: "记忆", desc: "记录生活点滴的未公开照片" },
  { id: "media", name: "个人自媒体账号", icon: "📕", category: "流量", desc: "小红书/B站的粉丝与创作版权" }
];

const INHERITORS = [
  { id: "friend", name: "给死党/好闺蜜", desc: "懂我所有奇奇怪怪的笑点，能替我继续擦亮徽章" },
  { id: "child", name: "传给未来的子女", desc: "让下一代见证本世纪初人类的娱乐遗产" },
  { id: "parents", name: "移交给父母", desc: "让父母通过我的数字痕迹，多看看我的世界" },
  { id: "destroy", name: "一键彻底注销/销毁", desc: "质本洁来还洁去，不愿在服务器上留下任何赛博灰尘" }
];

export default function CyberWill() {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [willMapping, setWillMapping] = useState<Record<string, string>>({});
  const [currentAssignIndex, setCurrentAssignIndex] = useState(0);

  const toggleAsset = (id: string) => {
    if (selectedAssets.includes(id)) {
      setSelectedAssets(selectedAssets.filter((a) => a !== id));
    } else {
      setSelectedAssets([...selectedAssets, id]);
    }
  };

  const handleNextStep1 = () => {
    if (!userName.trim()) {
      alert("请输入你的赛博代号");
      return;
    }
    if (selectedAssets.length === 0) {
      alert("请至少选择一个虚拟资产");
      return;
    }
    setStep(2);
  };

  const assignInheritor = (inheritorId: string) => {
    const assetId = selectedAssets[currentAssignIndex];
    setWillMapping({
      ...willMapping,
      [assetId]: inheritorId
    });

    if (currentAssignIndex < selectedAssets.length - 1) {
      setCurrentAssignIndex(currentAssignIndex + 1);
    } else {
      setStep(3);
    }
  };

  const resetWill = () => {
    setStep(1);
    setSelectedAssets([]);
    setWillMapping({});
    setCurrentAssignIndex(0);
  };

  const getInheritorName = (id: string) => {
    return INHERITORS.find((i) => i.id === id)?.name || "平台回收";
  };

  return (
    <section id="cyber-will" className="scroll-section py-24 bg-slate-50 text-slate-900 px-6 relative z-10 border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-purple-600 font-mono text-sm tracking-widest uppercase mb-4 block">
            INTERACTIVE EXPERIENCE / 赛博数字遗嘱生成器
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-950 to-purple-950">
            立下你的第一份数字遗嘱
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
            如果明天我们突然断网下线，我们在云端留下的回忆、账号与装备该去往何处？亲身参与互动，生成属于你的《数字遗产分配意愿单》。
          </p>
        </div>

        {/* Wizard Panel */}
        <div className="bg-white border border-slate-200/80 p-8 md:p-12 rounded-[3rem] shadow-sm relative min-h-[480px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            
            {/* Step 1: Input Name & Select Assets */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-left"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    1. 你的赛博代号 / Nickname
                  </label>
                  <input
                    type="text"
                    placeholder="输入你的互联网ID或代号"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:border-purple-400 focus:bg-white transition placeholder:opacity-50 font-medium text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    2. 挑选你最在乎的赛博遗产 (可多选)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {WILL_ASSETS.map((asset) => {
                      const isSelected = selectedAssets.includes(asset.id);
                      return (
                        <button
                          key={asset.id}
                          onClick={() => toggleAsset(asset.id)}
                          className={`text-left p-4 rounded-2xl border transition-all ${
                            isSelected
                              ? "bg-purple-50 border-purple-300 text-purple-950 shadow-sm"
                              : "bg-slate-50 border-slate-150 border-slate-200/80 text-slate-600 hover:bg-slate-100/60"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold flex items-center gap-2 text-slate-800">
                              <span>{asset.icon}</span> {asset.name}
                            </span>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-slate-200/60 text-slate-500 font-mono font-bold">
                              {asset.category}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{asset.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={handleNextStep1}
                  className="w-full py-4 bg-purple-600 text-white hover:bg-purple-700 font-bold rounded-2xl transition active:scale-95 text-sm shadow-md"
                >
                  下一步：指定继承人 ➡️
                </button>
              </motion.div>
            )}

            {/* Step 2: Assign Inheritor for each asset */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-left"
              >
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>STEP 2: INHERITANCE ASSIGNMENT</span>
                    <span>
                      正在分配第 {currentAssignIndex + 1} / {selectedAssets.length} 项
                    </span>
                  </div>
                  
                  {/* Current Asset Banner */}
                  {(() => {
                    const currentAsset = WILL_ASSETS.find((a) => a.id === selectedAssets[currentAssignIndex])!;
                    return (
                      <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl flex items-center gap-4">
                        <span className="text-4xl">{currentAsset.icon}</span>
                        <div>
                          <h4 className="text-lg font-bold text-purple-950">{currentAsset.name}</h4>
                          <p className="text-xs text-purple-650 text-purple-800 mt-1 font-medium">{currentAsset.desc}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Selection Cards */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                    为此资产选择意向归宿：
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {INHERITORS.map((inheritor) => (
                      <button
                        key={inheritor.id}
                        onClick={() => assignInheritor(inheritor.id)}
                        className="text-left px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white hover:border-purple-400 transition-all flex justify-between items-center group shadow-sm"
                      >
                        <div>
                          <span className="text-sm font-bold text-slate-700 group-hover:text-purple-700 transition-colors">
                            {inheritor.name}
                          </span>
                          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">{inheritor.desc}</p>
                        </div>
                        <span className="text-slate-400 group-hover:text-purple-600 font-bold transition">➡️</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Result Will Card */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8"
              >
                {/* Formal Certificate Display */}
                <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-purple-400/60 p-8 rounded-[2rem] shadow-md relative overflow-hidden">
                  
                  {/* Decorative stamp */}
                  <div className="absolute top-6 right-6 w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-purple-500/30 flex items-center justify-center font-bold text-[8px] md:text-[10px] text-purple-500/40 uppercase tracking-widest rotate-12 select-none pointer-events-none">
                    CYBER WILL
                  </div>

                  <div className="text-center border-b border-slate-200 pb-6 mb-6">
                    <h3 className="text-xl font-bold tracking-widest uppercase text-purple-900">
                      网络虚拟财产处分意愿单
                    </h3>
                    <p className="text-[9px] text-slate-400 font-mono mt-1">
                      CERTIFICATE ID: {Math.random().toString(36).substring(2, 10).toUpperCase()} · 2026版
                    </p>
                  </div>

                  <div className="space-y-5 text-slate-700 text-left">
                    <p className="text-sm">
                      立意愿人代号：<strong className="text-slate-900 text-base">{userName}</strong>
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      鉴于网络空间财产具备明确的经济与人身依附属性，立意愿人依照独立意志，对其离线后的赛博财产做出如下分配声明：
                    </p>

                    {/* Mapping List */}
                    <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200 max-h-[220px] overflow-y-auto pr-2">
                      {selectedAssets.map((assetId) => {
                        const asset = WILL_ASSETS.find((a) => a.id === assetId)!;
                        const inheritorId = willMapping[assetId];
                        return (
                          <div key={assetId} className="flex justify-between items-center text-xs border-b border-slate-250 border-slate-200 pb-2.5 last:border-0 last:pb-0">
                            <span className="flex items-center gap-2">
                              <span>{asset.icon}</span>
                              <span className="font-bold text-slate-800">{asset.name}</span>
                            </span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                              inheritorId === "destroy"
                                ? "bg-red-100 text-red-700"
                                : "bg-purple-100 text-purple-750 text-purple-750 text-purple-700"
                            }`}>
                              {getInheritorName(inheritorId)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-[10px] text-slate-400 italic leading-relaxed pt-2 font-medium">
                      声明条款：由于目前绝大多数平台《服务条款》规定用户仅享有“使用权”而“禁止转让继承”，本意愿单仅代表立遗嘱人之个人自主处分意向。最终能否成功执行，受限于平台技术协议与最高法《民事案由规定》之博弈。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={resetWill}
                    className="flex-1 py-4 bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition text-xs active:scale-95 shadow-sm"
                  >
                    🔄 重新制定
                  </button>
                  <button
                    onClick={() => alert("截屏或长按即可保存你的赛博遗嘱单！")}
                    className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition text-xs active:scale-95 shadow-md"
                  >
                    📸 保存我的意愿卡
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
