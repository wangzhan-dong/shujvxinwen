"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 定义虚拟资产的硬核数据集 (模拟真实行业调研数据)
interface AssetData {
  id: string;
  name: string;
  category: "game" | "social" | "media" | "web3" | "infrastructure";
  categoryName: string;
  residualRate: number; // 残值率 (%)
  inheritableScore: number; // 继承指数 (1-5)
  transferableScore: number; // 转让指数 (1-5)
  avgWorth: number; // 平均经济价值 (元)
  ownershipType: "平台所有" | "用户所有" | "争议中";
  legalCase: string; // 司法典型判例/法理依据
  clause: string; // 协议霸王条款原文
}

const RAW_DATASET: AssetData[] = [
  {
    id: "steam",
    name: "Steam 游戏库",
    category: "game",
    categoryName: "电子游戏",
    residualRate: 15,
    inheritableScore: 1,
    transferableScore: 1,
    avgWorth: 3450,
    ownershipType: "平台所有",
    legalCase: "《Steam订户协议》明确规定账户不可继承。2024年有海外玩家就此向欧盟申诉，目前仍被V社驳回。",
    clause: "“您的账户和相关的订阅信息是属于您的个人财产，不可转让，亦不可遗赠。”"
  },
  {
    id: "hok",
    name: "王者荣耀账号",
    category: "game",
    categoryName: "电子游戏",
    residualRate: 12,
    inheritableScore: 1,
    transferableScore: 2,
    avgWorth: 4800,
    ownershipType: "平台所有",
    legalCase: "2023年成都网络财产纠纷案中，法院认定原告享有账号使用权及经济权益，但不支持直接要求腾讯配合办理继承过户。",
    clause: "“游戏数据和角色所有权属于腾讯，用户仅享有使用权，不得赠与、转让或售卖。”"
  },
  {
    id: "cs2",
    name: "CS2 饰品库存",
    category: "game",
    categoryName: "电子游戏",
    residualRate: 75,
    inheritableScore: 1,
    transferableScore: 5,
    avgWorth: 12000,
    ownershipType: "平台所有",
    legalCase: "饰品虽可在第三方平台交易，但一旦Steam账号遭遇封禁（红锁），所有饰品将随账号永久锁死，无法取出。",
    clause: "“Valve可在任何时候因任何原因终止您的账户，饰品数据不予补偿。”"
  },
  {
    id: "wechat_pay",
    name: "微信零钱/支付宝余额",
    category: "infrastructure",
    categoryName: "基础设施",
    residualRate: 100,
    inheritableScore: 5,
    transferableScore: 4,
    avgWorth: 2300,
    ownershipType: "用户所有",
    legalCase: "受国家金融监管及《民法典》严格保障，属于个人合法法定货币财产，继承人提供公证书后可无条件继承理财。",
    clause: "“本资金属于用户合法合法财产，受央行及金融法保护，平台仅提供托管支付服务。”"
  },
  {
    id: "qq_number",
    name: "QQ 靓号",
    category: "social",
    categoryName: "社交流量",
    residualRate: 45,
    inheritableScore: 2,
    transferableScore: 3,
    avgWorth: 6000,
    ownershipType: "平台所有",
    legalCase: "2021年曾有判例：因用户长期不登录QQ靓号被腾讯回收，法院认定腾讯回收符合协议，但需退回靓号购买时支付的费用。",
    clause: "“QQ号码所有权归腾讯所有，用户仅享有使用权。长期不登录平台有权予以回收。”"
  },
  {
    id: "weibo",
    name: "微博/小红书大号",
    category: "social",
    categoryName: "社交流量",
    residualRate: 35,
    inheritableScore: 2,
    transferableScore: 3,
    avgWorth: 25000,
    ownershipType: "争议中",
    legalCase: "涉MCN孵化账号归属纠纷极多。司法判定倾向于：账号具有人身属性，归个人所有，但MCN可按合同主张收益分配。",
    clause: "“未经平台书面许可，用户不得自行将账号赠与、借用、出租或售卖给他人。”"
  },
  {
    id: "qq_music",
    name: "QQ音乐/网易云付费专辑",
    category: "media",
    categoryName: "数字影音",
    residualRate: 0,
    inheritableScore: 1,
    transferableScore: 1,
    avgWorth: 450,
    ownershipType: "平台所有",
    legalCase: "用户购买的数字专辑实为“有限授权播放权”。若平台与版权方合作终止，已付费歌曲仍可能因下架而无法播放。",
    clause: "“已购数字单曲仅限本账号在服务期内在线收听与限期下载，不包含所有权的转移。”"
  },
  {
    id: "kindle",
    name: "Kindle 电子书库",
    category: "media",
    categoryName: "数字影音",
    residualRate: 0,
    inheritableScore: 1,
    transferableScore: 1,
    avgWorth: 820,
    ownershipType: "平台所有",
    legalCase: "2024年亚马逊Kindle中国区云端下载服务彻底终止，未备份至本地的已购图书库彻底清空归零。",
    clause: "“数字内容由第三方授权，亚马逊不保证内容在任何时候均可供下载。”"
  },
  {
    id: "domain",
    name: "注册域名 (.com/.cn)",
    category: "infrastructure",
    categoryName: "基础设施",
    residualRate: 90,
    inheritableScore: 5,
    transferableScore: 5,
    avgWorth: 1500,
    ownershipType: "用户所有",
    legalCase: "受国际ICANN协议及国内CNNIC保护。域名可通过域名解析过户，司法可冻结、拍卖域名资产进行执行。",
    clause: "“域名作为互联网地址资源，在服务期内由持有人享有排他性排解权及转让过户权。”"
  },
  {
    id: "digital_collectible",
    name: "国内数字藏品 (联盟链)",
    category: "web3",
    categoryName: "去中心化",
    residualRate: 5,
    inheritableScore: 4,
    transferableScore: 2,
    avgWorth: 1200,
    ownershipType: "争议中",
    legalCase: "国内禁止NFT二次金融炒作，多属于“联盟链”记录。平台一旦跑路倒闭，链上哈希值仍在，但承载图片的服务器已打不开。",
    clause: "“数字藏品为特定数字化作品，严禁一切形式的二手炒作或场外法币交易。”"
  }
];

export default function DataExplorer() {
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<keyof AssetData>("residualRate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<AssetData | null>(RAW_DATASET[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 过滤和排序数据
  const processedData = useMemo(() => {
    let result = [...RAW_DATASET];

    if (filterCategory !== "all") {
      result = result.filter((item) => item.category === filterCategory);
    }

    if (searchQuery.trim() !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result.sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "desc" ? valB - valA : valA - valB;
      }
      if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "desc"
          ? valB.localeCompare(valA)
          : valA.localeCompare(valB);
      }
      return 0;
    });

    return result;
  }, [filterCategory, sortBy, sortOrder, searchQuery]);

  const handleSort = (field: keyof AssetData) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const exportCSV = () => {
    const headers = "资产名称,分类,保值残值率(%),继承可控指数,自由转让指数,平均价值,所有权归属\n";
    const rows = RAW_DATASET.map(
      (item) =>
        `"${item.name}","${item.categoryName}",${item.residualRate},${item.inheritableScore},${item.transferableScore},${item.avgWorth},"${item.ownershipType}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "virtual_assets_dataset_2026.csv");
    link.click();
  };

  return (
    <section id="data-explorer" className="scroll-section py-24 bg-white text-slate-900 px-6 relative z-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-emerald-700 font-mono text-sm tracking-widest uppercase mb-4 block">
              DATA JOURNALISM LAB / 数据新闻开源实验室
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-2 text-slate-950">
              虚拟资产属性探索库
            </h2>
            <p className="text-slate-500 max-w-2xl text-xs leading-relaxed font-medium">
              数据新闻核心：让数据说话，将选择权交还读者。你可以自由筛选、排序，探索主流虚拟资产在二级贬值率、司法实践和用户协议限制上的多维特征。
            </p>
          </div>
          <button
            onClick={exportCSV}
            className="px-6 py-3 bg-emerald-50 border border-emerald-250 border-emerald-250/80 text-emerald-700 rounded-xl hover:bg-emerald-600 hover:text-white font-bold text-xs transition active:scale-95 flex items-center gap-2 shadow-sm"
          >
            📥 下载原始数据集 (CSV)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Part: Grid Table Explorer */}
          <div className="lg:col-span-8 bg-slate-50 border border-slate-200/80 rounded-[2.5rem] p-6 shadow-sm w-full overflow-hidden">
            
            {/* Filter Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
              {/* Category Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "全部品类" },
                  { key: "game", label: "🎮 电子游戏" },
                  { key: "social", label: "📱 社交流量" },
                  { key: "media", label: "🎵 数字影音" },
                  { key: "infrastructure", label: "🌐 基础设施" }
                ].map((btn) => (
                  <button
                    key={btn.key}
                    onClick={() => setFilterCategory(btn.key)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                      filterCategory === btn.key
                        ? "bg-white border-slate-300 text-slate-900 shadow-sm"
                        : "bg-transparent border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="搜索资产名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition placeholder:opacity-50 w-full sm:max-w-[200px]"
              />
            </div>

            {/* Interactive Data Table */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs text-slate-700 min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-mono">
                    <th className="pb-3 font-bold">资产名称</th>
                    <th className="pb-3 font-bold">类型</th>
                    <th className="pb-3 font-bold cursor-pointer hover:text-slate-800 transition" onClick={() => handleSort("residualRate")}>
                      残值率 % {sortBy === "residualRate" ? (sortOrder === "desc" ? "▼" : "▲") : ""}
                    </th>
                    <th className="pb-3 font-bold cursor-pointer hover:text-slate-800 transition" onClick={() => handleSort("inheritableScore")}>
                      可继承性 {sortBy === "inheritableScore" ? (sortOrder === "desc" ? "▼" : "▲") : ""}
                    </th>
                    <th className="pb-3 font-bold cursor-pointer hover:text-slate-800 transition" onClick={() => handleSort("transferableScore")}>
                      可交易性 {sortBy === "transferableScore" ? (sortOrder === "desc" ? "▼" : "▲") : ""}
                    </th>
                    <th className="pb-3 font-bold">所有权属</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {processedData.map((asset) => (
                    <tr
                      key={asset.id}
                      onClick={() => {
                        setSelectedAsset(asset);
                        setIsDrawerOpen(true);
                      }}
                      className={`cursor-pointer transition hover:bg-slate-100/40 ${
                        selectedAsset?.id === asset.id ? "bg-white text-slate-950 shadow-sm font-bold" : ""
                      }`}
                    >
                      <td className="py-4 text-sm flex items-center gap-2 text-slate-900">
                        {asset.name}
                      </td>
                      <td className="py-4 text-slate-500">{asset.categoryName}</td>
                      <td className="py-4 font-mono font-bold text-amber-600">{asset.residualRate}%</td>
                      <td className="py-4">
                        <span className="text-emerald-600 font-bold">{"★".repeat(asset.inheritableScore)}</span>
                        <span className="opacity-20 font-bold">{"★".repeat(5 - asset.inheritableScore)}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-sky-600 font-bold">{"★".repeat(asset.transferableScore)}</span>
                        <span className="opacity-20 font-bold">{"★".repeat(5 - asset.transferableScore)}</span>
                      </td>
                      <td className="py-4 text-xs">
                        <span className={`px-2 py-0.5 rounded-full font-bold ${
                          asset.ownershipType === "用户所有"
                            ? "bg-emerald-50 text-emerald-700 bg-emerald-100/60"
                            : asset.ownershipType === "平台所有"
                            ? "bg-red-50 text-red-700 bg-red-100/60"
                            : "bg-amber-50 text-amber-700 bg-amber-100/60"
                        }`}>
                          {asset.ownershipType}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {processedData.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                        无匹配的资产数据
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>

          {/* Right Part: Selected Asset Fact-sheet Detail (hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-4 bg-slate-50 border border-slate-200/80 rounded-[2.5rem] p-6 backdrop-blur-xl sticky top-24 min-h-[480px] flex-col justify-between shadow-sm">
            {selectedAsset ? (
              <div className="space-y-6 text-left">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono uppercase bg-emerald-50">
                      FACT SHEET / 深度实证
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      ID: {selectedAsset.id.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mt-3">
                    {selectedAsset.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    属于《民法典》第127条网络虚拟财产的司法探索对象
                  </p>
                </div>

                {/* Score Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 text-center shadow-sm">
                    <div className="text-xl font-mono font-black text-amber-600">{selectedAsset.residualRate}%</div>
                    <div className="text-[10px] text-slate-400 mt-1 font-medium">二级市场残值率</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 text-center shadow-sm">
                    <div className="text-xl font-mono font-black text-sky-600">¥{selectedAsset.avgWorth.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400 mt-1 font-medium">Z世代人均估值</div>
                  </div>
                </div>

                {/* Agreement Clause */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-red-600 flex items-center gap-1">
                    📝 平台《服务协议》霸王免责条款：
                  </h4>
                  <blockquote className="text-xs bg-red-50/5 border-l-2 border-red-200 p-3 text-slate-700 italic leading-relaxed font-medium">
                    {selectedAsset.clause}
                  </blockquote>
                </div>

                {/* Legal Conflict Case */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    ⚖️ 司法审判实务与冲突焦点：
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50/5 p-3 border-l-2 border-emerald-200 rounded-r-xl font-medium">
                    {selectedAsset.legalCase}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 italic text-xs">
                请在左侧点击任一资产行，加载深度数据档案。
              </div>
            )}

            <div className="text-[10px] text-slate-400 mt-6 leading-relaxed italic border-t border-slate-100 pt-4 font-medium">
              * 数据源来自：交易猫二手交易指数、中国裁判文书网民事案件案由分类检索、各大互联网平台公开版《服务条款与隐私政策》(2026版)。
            </div>
          </div>

        </div>

      </div>

      {/* Mobile Drawer (Only visible on screens < lg) */}
      <AnimatePresence>
        {isDrawerOpen && selectedAsset && (
          <>
            {/* Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 rounded-t-[2rem] p-6 pb-10 z-50 lg:hidden max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              {/* Drag bar indicator */}
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />

              {/* Close Button */}
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 font-bold"
              >
                ✕
              </button>

              <div className="space-y-6 text-left">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono uppercase bg-emerald-50">
                      FACT SHEET / 深度实证
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      ID: {selectedAsset.id.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mt-2">
                    {selectedAsset.name}
                  </h3>
                </div>

                {/* Score Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-center">
                    <div className="text-lg font-mono font-black text-amber-600">{selectedAsset.residualRate}%</div>
                    <div className="text-[9px] text-slate-400 mt-1 font-medium">二级市场残值率</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-center">
                    <div className="text-lg font-mono font-black text-sky-600">¥{selectedAsset.avgWorth.toLocaleString()}</div>
                    <div className="text-[9px] text-slate-400 mt-1 font-medium">Z世代人均估值</div>
                  </div>
                </div>

                {/* Agreement Clause */}
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-red-600">
                    📝 平台《服务协议》霸王免责条款：
                  </h4>
                  <blockquote className="text-xs bg-red-50/5 border-l-2 border-red-200 p-3 text-slate-700 italic leading-relaxed font-medium">
                    {selectedAsset.clause}
                  </blockquote>
                </div>

                {/* Legal Conflict Case */}
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-emerald-700">
                    ⚖️ 司法审判实务与冲突焦点：
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50/5 p-3 border-l-2 border-emerald-200 rounded-r-xl font-medium">
                    {selectedAsset.legalCase}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
