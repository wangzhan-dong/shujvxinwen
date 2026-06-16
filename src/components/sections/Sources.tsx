"use client";

export default function Sources() {
  return (
    <>
      <section id="sources" className="scroll-section py-20 px-6 bg-slate-50 border-t border-slate-200 z-10 relative">
        <div className="max-w-5xl mx-auto content-box">
          <div className="flex items-center space-x-4 mb-10">
            <div className="w-2 h-10 bg-emerald-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-900">严谨的数据与报告背书</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
              <h4 className="font-bold text-sky-600 mb-3 text-lg">📊 宏观市场与代际持仓数据</h4>
              <ul className="space-y-3 text-sm text-slate-650 list-disc list-inside">
                <li><strong className="text-slate-900">PwC & Deloitte：</strong> 《2024年虚拟资产趋势白皮书》—— Z世代配置超50%的群体占比22.4%。</li>
                <li><strong className="text-slate-900">中国信通院：</strong> 2026年市场增长估测及规模。</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
              <h4 className="font-bold text-purple-600 mb-3 text-lg">⚖️ 司法监管与风险防范</h4>
              <ul className="space-y-3 text-sm text-slate-650 list-disc list-inside">
                <li><strong className="text-slate-900">美国 CFPB 报告：</strong> 2024年对于游戏闭环经济的警告。</li>
                <li><strong className="text-slate-900">最高法《民事案由规定》：</strong> 网络虚拟财产诉讼升级案由公告及其司法解释。</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
              <h4 className="font-bold text-amber-600 mb-3 text-lg">💰 垂直交易与用户属性</h4>
              <ul className="space-y-3 text-sm text-slate-650 list-disc list-inside">
                <li><strong className="text-slate-900">闲鱼 / 交易猫：</strong> 1.6亿 ACG 受众用户盘，218元月均单次花费数据。</li>
                <li><strong className="text-slate-900">Newzoo：</strong> 2026 年游戏群体预计达 37 亿，以及 Alpha一代零花钱 53% 线上流通定调。</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
              <h4 className="font-bold text-emerald-600 mb-3 text-lg">📝 结论定调</h4>
              <ul className="space-y-3 text-sm text-slate-700 list-none">
                <li className="italic leading-relaxed">“只有当受实质强力庇护的大型法规降临，年轻人将情感与心血注资入这面屏幕的行为，才能称得上具有持久价值的真实资产组合。”</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-16 text-center text-slate-400 text-sm z-10 relative">
        <p className="tracking-widest uppercase mb-4 text-slate-500 font-bold">全景视界 2026 融合新闻实验室</p>
        <p className="mt-4 text-xs opacity-80">成都大学25级文学与新闻传播学院广播电视学一班 融合新闻一组</p>
      </footer>
    </>
  );
}
