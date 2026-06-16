"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// 资产类型定义与真实条款数据
const ASSETS_DATA = [
  {
    id: "game_account",
    name: "主流游戏账号 (如王者荣耀/DNF)",
    icon: "🎮",
    score: 15,
    specs: {
      inheritable: { status: false, text: "不可继承", desc: "腾讯协议：“游戏数据和角色所有权属于腾讯，用户仅享有使用权，不得赠与、借用、租用、转让或售卖。”" },
      tradable: { status: false, text: "禁止交易", desc: "私下交易或第三方平台交易一旦被检测，面临永久封号，且无法对抗平台确权。" },
      offline: { status: false, text: "依赖在线", desc: "必须联机。一旦服务器关闭或停服（如暴雪国服往事），玩家本地不留存任何资产。" },
      protection: { status: false, text: "单方封禁", desc: "平台拥有单方面封号的“终极裁判权”，无需经过司法程序即可清空你的资产。" },
      compensation: { status: false, text: "极低补偿", desc: "停服通常仅补偿其他游戏的礼包代币，不退还充值人民币，沉没成本达100%。" }
    }
  },
  {
    id: "steam_library",
    name: "Steam 游戏库",
    icon: "💨",
    score: 30,
    specs: {
      inheritable: { status: false, text: "不可继承", desc: "Steam订户协议明确规定：“您的账户和相关的订阅信息是属于您的个人财产，不可转让，亦不可遗赠。”" },
      tradable: { status: false, text: "禁止转让", desc: "游戏库无法拆分交易，只能整体转让账号，但面临被V社检测永久红锁封禁风险。" },
      offline: { status: true, text: "支持离线", desc: "部分单机游戏支持离线模式运行，即使Steam服务器宕机，本地文件仍可运行（有DRM限制除外）。" },
      protection: { status: false, text: "单方红锁", desc: "若违反服务条款（如跨区购买、滥用退款），整个游戏库会被红锁，资产全部冻结。" },
      compensation: { status: false, text: "无停服补偿", desc: "若Valve停止运营，用户协议不承诺任何游戏库保存或赔偿方案。" }
    }
  },
  {
    id: "digital_music",
    name: "云音乐/电子书 (QQ/网易云/Kindle)",
    icon: "🎵",
    score: 20,
    specs: {
      inheritable: { status: false, text: "不可继承", desc: "QQ音乐/网易云协议：“本服务仅供用户个人非商业性使用，购买的数字单曲仅限本账号在服务期内在线收听/下载。”" },
      tradable: { status: false, text: "无法转卖", desc: "购买的数字音视频与电子书绑定个人账号，不存在二级流转平台，购买即锁死。" },
      offline: { status: true, text: "限期离线", desc: "支持下载本地，但文件大多经过加密（如DRM加密），必须使用指定客户端且定期在线联网认证。" },
      protection: { status: false, text: "版权下架", desc: "即便已付费购买，若平台与唱片公司/出版社版权到期，音乐或书籍仍可能在你的歌单/书架中变灰消失。" },
      compensation: { status: false, text: "停服清空", desc: "Kindle退出中国市场即是先例，虽有过渡期，但最终未下载及过期的云端资产将不再提供服务。" }
    }
  },
  {
    id: "domain_names",
    name: "网络域名 (如 .com / .cn)",
    icon: "🌐",
    score: 85,
    specs: {
      inheritable: { status: true, text: "可以继承", desc: "域名作为独立无形资产，可以通过提供公证书在注册商处办理过户和继承。" },
      tradable: { status: true, text: "自由交易", desc: "在全球域名解析体系下，可通过Sedo、聚名网等平台进行完全合法的自由定价交易与转移过户。" },
      offline: { status: false, text: "依赖根服务器", desc: "属于全球互联网基础设施，需依赖ICANN和全球根DNS解析服务器，若未续费会被清空释放。" },
      protection: { status: true, text: "司法确权", desc: "域名所有权受国际WIPO及国内法院司法裁判保护，注册商不得无故单方面强行收回所有权。" },
      compensation: { status: true, text: "有市场溢价", desc: "不受单一商业公司兴衰影响，具有极强的抗风险和保值升值能力。" }
    }
  },
  {
    id: "crypto_nft",
    name: "数字藏品 / 去中心化NFT",
    icon: "🖼️",
    score: 60,
    specs: {
      inheritable: { status: true, text: "可以继承", desc: "只要持有私钥，私钥可作为实物遗嘱的一部分进行代际传递，无需平台审核。" },
      tradable: { status: true, text: "部分可流转", desc: "海外NFT可自由转让；国内数字藏品受合规限制，通常仅支持满足特定条件后的“无偿赠予”或挂牌流转。" },
      offline: { status: true, text: "区块链共识", desc: "代币数据链上永久记录，即使发行平台倒闭，智能合约和代币所有权记录依然存在于公链/联盟链上。" },
      protection: { status: true, text: "私钥即所有", desc: "非对称加密保障，只要私钥不泄露，没有任何中心化机构能够强行划走或冻结你的钱包资产。" },
      compensation: { status: false, text: "市场自负盈亏", desc: "虽然所有权归你，但如果承载该藏品元数据的图片服务器（IPFS/Web2服务器）关停，你可能只拥有一串“指向虚无的链接”。" }
    }
  }
];

export default function TrueOwnershipBalance() {
  const [selectedAsset, setSelectedAsset] = useState(ASSETS_DATA[0]);

  const score = selectedAsset.score;
  const tiltAngle = ((50 - score) / 50) * 20;

  const handleSelectAsset = (asset: typeof ASSETS_DATA[0]) => {
    setSelectedAsset(asset);
    
    // 手机端交互感知优化：自动平滑滚动到天平动画及判定区域
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById("mobile-balance-view")?.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        });
      }, 150);
    }
  };

  return (
    <section id="ownership-balance" className="scroll-section py-24 bg-white text-slate-900 px-6 relative z-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-mono text-sm tracking-widest uppercase mb-4 block">
            THE ILLUSION OF OWNERSHIP / 所有权幻觉天平
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950">
            你真的“拥有”你的虚拟资产吗？
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
            根据《民法典》第127条，网络虚拟财产受法律保护。然而，各大平台的《用户协议》（TOS）却悄无声息地将你的所有权降格为“临时使用权”。通过天平，直观量化你的财产控制力。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Panel: Selector (Hidden on mobile for better mobile-first layout) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between bg-slate-50 border border-slate-200/80 p-6 rounded-[2.5rem] shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-5 bg-emerald-600 rounded-full"></span>
                选择你的虚拟资产
              </h3>
              <div className="space-y-3">
                {ASSETS_DATA.map((asset) => {
                  const isSelected = selectedAsset.id === asset.id;
                  return (
                    <button
                      key={asset.id}
                      onClick={() => handleSelectAsset(asset)}
                      className={`w-full text-left px-5 py-4 rounded-2xl flex items-center justify-between transition-all border ${
                        isSelected
                          ? "bg-gradient-to-r from-sky-50 to-purple-50 border-sky-300 text-slate-900 shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100/50"
                      }`}
                    >
                      <span className="flex items-center gap-3 text-sm font-semibold">
                        <span className="text-xl">{asset.icon}</span>
                        {asset.name}
                      </span>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        asset.score >= 60 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      }`}>
                        得分 {asset.score}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <h4 className="text-xs font-bold text-emerald-700 mb-1">⚖️ 司法冲突小贴士</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                中国司法实践中，虚拟财产确权案不断增加。但由于平台协议属于“格式合同”，用户往往默认放弃了继承与转让权。这导致民事诉讼中，用户维权成本极高。
              </p>
            </div>
          </div>

          {/* Center Panel: Interactive Balance Animation */}
          <div id="mobile-balance-view" className="lg:col-span-4 flex flex-col justify-between items-center bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden min-h-[420px]">
            
            {/* Panel Title & Mobile Guide */}
            <div className="w-full flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-slate-400">
                PHYSICAL VS DIGITAL / 权属天平
              </span>
              <span className="lg:hidden text-[10px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded font-bold">
                滑动切换芯片 📊
              </span>
            </div>

            {/* Mobile Selector: Horizontal scrolling chips */}
            <div className="flex lg:hidden overflow-x-auto w-full gap-2 pb-3 mb-2 scrollbar-none snap-x snap-mandatory">
              {ASSETS_DATA.map((asset) => {
                const isSelected = selectedAsset.id === asset.id;
                return (
                  <button
                    key={asset.id}
                    onClick={() => handleSelectAsset(asset)}
                    className={`flex-shrink-0 snap-center px-4 py-2.5 rounded-2xl flex items-center gap-2 border text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100/50"
                    }`}
                  >
                    <span>{asset.icon}</span>
                    <span className="whitespace-nowrap">{asset.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Scale SVG Container */}
            <div className="w-full max-w-[280px] h-[180px] flex items-end justify-center relative mt-2">
              
              {/* Stand / Base (Static) */}
              <svg className="absolute bottom-0 w-[120px] h-[100px] text-slate-300 z-0" viewBox="0 0 100 100" fill="currentColor">
                <path d="M45 10 h10 v80 h-10 z" />
                <path d="M20 90 h60 v10 h-60 z" />
                <circle cx="50" cy="15" r="8" className="text-slate-400" />
              </svg>

              {/* Lever Beam */}
              <motion.g
                animate={{ rotate: tiltAngle }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                className="absolute w-[240px] h-[30px] top-[15px] origin-[50%_15px] flex items-center justify-between z-10 px-2"
                style={{ transformOrigin: "center 15px" }}
              >
                {/* Lever Line */}
                <div className="absolute left-0 right-0 top-[14px] h-[3px] bg-slate-300 rounded-full"></div>

                {/* Left Pan (Player Control) */}
                <div className="absolute left-2 top-[15px] flex flex-col items-center origin-top" style={{ transform: `rotate(${-tiltAngle}deg)` }}>
                  {/* String */}
                  <svg width="40" height="60" viewBox="0 0 40 60" fill="none" className="text-slate-300">
                    <line x1="20" y1="0" x2="2" y2="60" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="20" y1="0" x2="38" y2="60" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M2 60 h36" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {/* Pan */}
                  <div className="w-14 h-6 bg-sky-100 border-2 border-sky-400 rounded-b-full shadow-sm flex items-center justify-center text-[10px] font-bold text-sky-700">
                    玩家所有
                  </div>
                </div>

                {/* Right Pan (Platform Restrictions) */}
                <div className="absolute right-2 top-[15px] flex flex-col items-center origin-top" style={{ transform: `rotate(${-tiltAngle}deg)` }}>
                  {/* String */}
                  <svg width="40" height="60" viewBox="0 0 40 60" fill="none" className="text-slate-300">
                    <line x1="20" y1="0" x2="2" y2="60" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="20" y1="0" x2="38" y2="60" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M2 60 h36" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {/* Pan */}
                  <div className="w-14 h-6 bg-purple-100 border-2 border-purple-400 rounded-b-full shadow-sm flex items-center justify-center text-[10px] font-bold text-purple-750 text-purple-700">
                    平台条款
                  </div>
                </div>
              </motion.g>

            </div>

            {/* Score Text */}
            <div className="text-center mt-6 z-10">
              <div className="text-xs text-slate-400 uppercase font-mono">所有权掌控指数 (True Ownership Index)</div>
              <div className="text-4xl font-black mt-2 bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                {score}%
              </div>
              <div className="text-[10px] text-slate-500 mt-2 px-6 font-medium">
                {score <= 30
                  ? "⚠️ 严重失衡：你只拥有极其有限的临时使用权，资产实际上由平台绝对掌控。"
                  : score <= 60
                  ? "⚡ 部分受限：拥有一定的转让或去中心化资产，但仍受平台条款/法理解析制约。"
                  : "🛡️ 高度掌控：资产所有权受国家公权力或共识协议保护，不易停服消失。"}
              </div>
            </div>

          </div>

          {/* Right Panel: Spec Detail Breakdown */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200/80 p-6 rounded-[2.5rem] shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-5 bg-purple-600 rounded-full"></span>
                所有权判定维度
              </h3>
              
              <div className="space-y-4">
                {/* Row 1: Inheritable */}
                <div className="border-b border-slate-200 pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-slate-700">👪 遗赠继承权</span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      selectedAsset.specs.inheritable.status ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}>
                      {selectedAsset.specs.inheritable.text}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{selectedAsset.specs.inheritable.desc}</p>
                </div>

                {/* Row 2: Tradable */}
                <div className="border-b border-slate-200 pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-slate-700">🔄 自由转让权</span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      selectedAsset.specs.tradable.status ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}>
                      {selectedAsset.specs.tradable.text}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{selectedAsset.specs.tradable.desc}</p>
                </div>

                {/* Row 3: Offline */}
                <div className="border-b border-slate-200 pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-slate-700">🔌 离线可访问性</span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      selectedAsset.specs.offline.status ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}>
                      {selectedAsset.specs.offline.text}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{selectedAsset.specs.offline.desc}</p>
                </div>

                {/* Row 4: Protection */}
                <div className="border-b border-slate-200 pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-slate-700">🛡️ 问责防单方封号</span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      selectedAsset.specs.protection.status ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}>
                      {selectedAsset.specs.protection.text}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{selectedAsset.specs.protection.desc}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
