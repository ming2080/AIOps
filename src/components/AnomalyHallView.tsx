import React, { useState } from 'react';
import {
  Bell,
  Activity,
  Server,
  Cpu,
  Boxes,
  XCircle,
} from 'lucide-react';
import {
  ALERT_TREND_DAYS,
  DYNAMIC_ALERT_TREND_DAYS,
  LATEST_ALERTS,
  DYNAMIC_LATEST_ALERTS,
  ALERT_LEVELS,
  filterAlertsByLevel,
  countAlertsByLevel,
  sumTrendAlerts,
} from '../data/anomalyHall';
import type { AlertLevel } from '../types/aiops';

export const AnomalyHallView: React.FC = () => {
  const [levelFilter, setLevelFilter] = useState<AlertLevel | '全部'>('全部');
  const [dynamicLevelFilter, setDynamicLevelFilter] = useState<AlertLevel | '全部'>('全部');
  const levelCounts = countAlertsByLevel(LATEST_ALERTS);
  const dynamicLevelCounts = countAlertsByLevel(DYNAMIC_LATEST_ALERTS);
  const filteredAlerts = filterAlertsByLevel(LATEST_ALERTS, levelFilter);
  const filteredDynamicAlerts = filterAlertsByLevel(DYNAMIC_LATEST_ALERTS, dynamicLevelFilter);





  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Page Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <span>异常发现统计大厅</span>
        </h2>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>数据推演中 (2026-10-16)</span>
        </div>
      </div>

      {/* ===================== SECTION 1: 异常检测 ===================== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
          <h3 className="text-sm font-bold text-cyan-400">异常检测</h3>
        </div>

        {/* 5 Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-rose-400">
              <Bell className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">昨日告警数</div>
              <div className="text-2xl font-bold font-mono text-rose-400 mt-1">203</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-800/60 text-sky-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">监控指标数</div>
              <div className="text-2xl font-bold font-mono text-sky-400 mt-1">35</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-800/60 text-sky-400">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">纳管设备数</div>
              <div className="text-2xl font-bold font-mono text-sky-400 mt-1">352</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-800/60 text-sky-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">模型数</div>
              <div className="text-2xl font-bold font-mono text-sky-400 mt-1">326</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-800/60 text-sky-400">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">模型调用总数</div>
              <div className="text-2xl font-bold font-mono text-sky-400 mt-1">2365</div>
            </div>
          </div>
        </div>

        {/* 告警统计 Section */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4 backdrop-blur-md shadow-xl">
          <div className="text-xs font-bold text-slate-300">告警统计</div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-2 text-center lg:text-left space-y-2 border-r border-slate-800/80 pr-4">
              <div className="text-xs text-slate-400 font-medium">告警总数</div>
              <div className="text-3xl font-extrabold font-mono text-rose-500 tracking-tight">35568</div>
            </div>

            <div className="lg:col-span-10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                <span className="text-sky-400 font-bold">近30日每日告警统计 <span className="text-slate-500 font-normal">· 16日合计 {sumTrendAlerts(ALERT_TREND_DAYS)} 条</span></span>
                <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> 重大告警</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 高级告警</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> 中级告警</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> 一般告警</span>
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 h-44 flex items-end justify-between gap-1.5 relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,80 Q10,30 20,60 T40,20 T60,50 T80,30 T100,70 L100,100 L0,100 Z" fill="url(#roseGrad)" />
                  <path d="M0,90 Q10,50 20,70 T40,40 T60,65 T80,45 T100,80" fill="none" stroke="#f43f5e" strokeWidth="2" />
                  <defs>
                    <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {ALERT_TREND_DAYS.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group z-10">
                    <div className="relative w-full flex flex-col justify-end items-center h-28">
                      <div
                        style={{ height: `${item.alert * 11}%` }}
                        className="w-2 sm:w-3.5 bg-gradient-to-t from-rose-600/80 via-amber-500/80 to-sky-400/90 rounded-t-lg transition-all group-hover:brightness-125"
                      />
                      <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-slate-200 px-2 py-1 rounded text-[10px] whitespace-nowrap shadow-xl z-20">
                        重大告警: {item.major} | 高级告警: {item.high}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 模型统计 Section */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5 backdrop-blur-md shadow-xl">
          <div className="text-xs font-bold text-slate-300">模型统计</div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50" />
                <span className="text-xs text-slate-300 font-medium">监控中模型</span>
              </div>
              <div className="text-2xl font-bold font-mono text-sky-400">335</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-md shadow-rose-500/50" />
                <span className="text-xs text-slate-300 font-medium">已停用模型</span>
              </div>
              <div className="text-2xl font-bold font-mono text-sky-400">24</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-slate-500 shadow-md shadow-slate-500/50" />
                <span className="text-xs text-slate-300 font-medium">待启用模型</span>
              </div>
              <div className="text-2xl font-bold font-mono text-sky-400">68</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span className="text-xs text-slate-300 font-medium">失败模型</span>
              </div>
              <div className="text-2xl font-bold font-mono text-sky-400">12</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">模型监控时长Top3</h4>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-sky-500" />
                  <span className="w-2 h-2 rounded bg-slate-800" />
                  <span className="w-2 h-2 rounded bg-slate-800" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs border-y border-slate-800/80 py-2 font-mono">
                <div>
                  <span className="text-slate-400">监控时长 </span>
                  <span className="text-sky-400 font-bold text-sm">87 天</span>
                </div>
                <div>
                  <span className="text-slate-400">启用时间 </span>
                  <span className="text-sky-400 font-bold">2026.08.19</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 font-medium border-b border-slate-800/60">
                    <tr>
                      <th className="py-2">模型指标</th>
                      <th className="py-2">设备资源ID</th>
                      <th className="py-2">设备类型</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 font-mono text-[11px]">
                    <tr>
                      <td className="py-2 text-sky-300">cpu_rate_percent</td>
                      <td className="py-2 text-slate-400">RES-SDN-001</td>
                      <td className="py-2 text-slate-200">SDN</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sky-300">memory_usage_ratio</td>
                      <td className="py-2 text-slate-400">RES-SRV-008</td>
                      <td className="py-2 text-slate-200">Server</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sky-300">traffic_latency_ms</td>
                      <td className="py-2 text-slate-400">RES-GW-012</td>
                      <td className="py-2 text-slate-200">Gateway</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">模型近7天告警数Top3</h4>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-sky-500" />
                  <span className="w-2 h-2 rounded bg-slate-800" />
                  <span className="w-2 h-2 rounded bg-slate-800" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs border-y border-slate-800/80 py-2 font-mono">
                <div>
                  <span className="text-slate-400">告警数 </span>
                  <span className="text-sky-400 font-bold text-sm">898</span>
                </div>
                <div>
                  <span className="text-slate-400">告警率 </span>
                  <span className="text-sky-400 font-bold text-sm">6 %</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 font-medium border-b border-slate-800/60">
                    <tr>
                      <th className="py-2">模型指标</th>
                      <th className="py-2">设备资源ID</th>
                      <th className="py-2">设备类型</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 font-mono text-[11px]">
                    <tr>
                      <td className="py-2 text-sky-300">cpu_rate_percent</td>
                      <td className="py-2 text-slate-400">RES-SDN-001</td>
                      <td className="py-2 text-slate-200">SDN</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sky-300">interface_drop_packets</td>
                      <td className="py-2 text-slate-400">RES-SW-004</td>
                      <td className="py-2 text-slate-200">Switch</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sky-300">disk_io_wait</td>
                      <td className="py-2 text-slate-400">RES-STOR-002</td>
                      <td className="py-2 text-slate-200">Storage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white">最新告警Top10</h4>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {(['全部', ...ALERT_LEVELS] as const).map((level) => {
                    const count = level === '全部' ? DYNAMIC_LATEST_ALERTS.length : dynamicLevelCounts[level];
                    const active = dynamicLevelFilter === level;
                    return (
                      <button
                        key={level}
                        onClick={() => setDynamicLevelFilter(level)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                          active
                            ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {level} {count}
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {(['全部', ...ALERT_LEVELS] as const).map((level) => {
                    const count = level === '全部' ? LATEST_ALERTS.length : levelCounts[level];
                    const active = levelFilter === level;
                    return (
                      <button
                        key={level}
                        onClick={() => setLevelFilter(level)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                          active
                            ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {level} {count}
                      </button>
                    );
                  })}
                </div>

                <div className="overflow-x-auto max-h-52 overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-900 text-slate-400 font-medium border-b border-slate-800 sticky top-0">
                      <tr>
                        <th className="py-2 px-2 shrink-0">序号</th>
                        <th className="py-2 px-2 shrink-0">检测时间</th>
                        <th className="py-2 px-2 shrink-0">告警时间</th>
                        <th className="py-2 px-2 shrink-0">告警级别</th>
                        <th className="py-2 px-2">告警正文</th>
                        <th className="py-2 px-2">实际值</th>
                        <th className="py-2 px-2">预测值</th>
                        <th className="py-2 px-2">上限</th>
                        <th className="py-2 px-2">下限</th>
                        <th className="py-2 px-2">设备资源ID</th>
                        <th className="py-2 px-2">设备类型</th>
                        <th className="py-2 px-2">设备IP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {filteredAlerts.map((row) => (
                        <tr key={row.seq} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-2 px-2 text-slate-400">{row.seq}</td>
                          <td className="py-2 px-2 text-slate-300 whitespace-nowrap">{row.checkTime}</td>
                          <td className="py-2 px-2 text-slate-400 whitespace-nowrap">{row.alarmTime}</td>
                          <td className="py-2 px-2 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.level === '重大告警'
                                  ? 'bg-rose-950 border border-rose-800 text-rose-400'
                                  : row.level === '高级告警'
                                  ? 'bg-amber-950 border border-amber-800 text-amber-400'
                                  : row.level === '中级告警'
                                  ? 'bg-yellow-950 border border-yellow-800 text-yellow-300'
                                  : 'bg-sky-950 border border-sky-800 text-sky-300'
                              }`}
                            >
                              {row.level}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-slate-300 font-sans whitespace-nowrap">{row.text}</td>
                          <td className="py-2 px-2 text-sky-300 font-bold">{row.actualValue}</td>
                          <td className="py-2 px-2 text-slate-400">{row.predictedValue}</td>
                          <td className="py-2 px-2 text-rose-400">{row.upperLimit}</td>
                          <td className="py-2 px-2 text-slate-400">{row.lowerLimit}</td>
                          <td className="py-2 px-2 text-slate-300">{row.resId}</td>
                          <td className="py-2 px-2 text-slate-400 font-sans">{row.resType}</td>
                          <td className="py-2 px-2 text-sky-400">{row.resIp}</td>
                        </tr>
                      ))}
                      {filteredAlerts.length === 0 && (
                        <tr>
                          <td colSpan={12} className="py-4 px-2 text-center text-slate-500 font-sans">该告警级别暂无记录</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== SECTION 2: 动态阈值 ===================== */}
      <div className="space-y-6 pt-4 border-t border-slate-800/80">
        <div className="flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
          <h3 className="text-sm font-bold text-cyan-400">动态阈值</h3>
        </div>

        {/* 5 Dynamic Threshold KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-rose-400">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">昨日告警数</div>
              <div className="text-2xl font-bold font-mono text-rose-400 mt-1">263</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-800/60 text-sky-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">监控指标数</div>
              <div className="text-2xl font-bold font-mono text-sky-400 mt-1">35</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-800/60 text-sky-400">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">纳管设备数</div>
              <div className="text-2xl font-bold font-mono text-sky-400 mt-1">225</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-800/60 text-sky-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">模型数</div>
              <div className="text-2xl font-bold font-mono text-sky-400 mt-1">136</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-800/60 text-sky-400">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">模型调用总数</div>
              <div className="text-2xl font-bold font-mono text-sky-400 mt-1">2651</div>
            </div>
          </div>
        </div>

        {/* ===================== NEWLY ADDED: 动态阈值 告警统计 Section ===================== */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4 backdrop-blur-md shadow-xl">
          <div className="text-xs font-bold text-slate-300">告警统计</div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-2 text-center lg:text-left space-y-2 border-r border-slate-800/80 pr-4">
              <div className="text-xs text-slate-400 font-medium">告警总数</div>
              <div className="text-3xl font-extrabold font-mono text-rose-500 tracking-tight">28950</div>
            </div>

            <div className="lg:col-span-10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                <span className="text-sky-400 font-bold">近30日每日动态阈值告警统计 <span className="text-slate-500 font-normal">· 16日合计 {sumTrendAlerts(DYNAMIC_ALERT_TREND_DAYS)} 条</span></span>
                <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> 重大告警</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 高级告警</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> 中级告警</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> 一般告警</span>
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 h-44 flex items-end justify-between gap-1.5 relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,85 Q10,40 20,70 T40,30 T60,60 T80,35 T100,75 L100,100 L0,100 Z" fill="url(#skyGrad)" />
                  <path d="M0,85 Q10,40 20,70 T40,30 T60,60 T80,35 T100,75" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {DYNAMIC_ALERT_TREND_DAYS.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group z-10">
                    <div className="relative w-full flex flex-col justify-end items-center h-28">
                      <div
                        style={{ height: `${item.alert * 12}%` }}
                        className="w-2 sm:w-3.5 bg-gradient-to-t from-sky-600/80 via-amber-500/80 to-rose-400/90 rounded-t-lg transition-all group-hover:brightness-125"
                      />
                      <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-slate-200 px-2 py-1 rounded text-[10px] whitespace-nowrap shadow-xl z-20">
                        重大告警: {item.major} | 高级告警: {item.high}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===================== NEWLY ADDED: 动态阈值 模型统计 Section ===================== */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5 backdrop-blur-md shadow-xl">
          <div className="text-xs font-bold text-slate-300">模型统计</div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50" />
                <span className="text-xs text-slate-300 font-medium">监控中模型</span>
              </div>
              <div className="text-2xl font-bold font-mono text-sky-400">136</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-md shadow-rose-500/50" />
                <span className="text-xs text-slate-300 font-medium">已停用模型</span>
              </div>
              <div className="text-2xl font-bold font-mono text-sky-400">18</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-slate-500 shadow-md shadow-slate-500/50" />
                <span className="text-xs text-slate-300 font-medium">待启用模型</span>
              </div>
              <div className="text-2xl font-bold font-mono text-sky-400">42</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span className="text-xs text-slate-300 font-medium">失败模型</span>
              </div>
              <div className="text-2xl font-bold font-mono text-sky-400">6</div>
            </div>
          </div>

          {/* ===================== NEWLY ADDED: 动态阈值 Bottom 3 Cards ===================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Card 1: 模型监控时长Top3 */}
            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">模型监控时长Top3</h4>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-sky-500" />
                  <span className="w-2 h-2 rounded bg-slate-800" />
                  <span className="w-2 h-2 rounded bg-slate-800" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs border-y border-slate-800/80 py-2 font-mono">
                <div>
                  <span className="text-slate-400">监控时长 </span>
                  <span className="text-sky-400 font-bold text-sm">65 天</span>
                </div>
                <div>
                  <span className="text-slate-400">启用时间 </span>
                  <span className="text-sky-400 font-bold">2026.09.01</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 font-medium border-b border-slate-800/60">
                    <tr>
                      <th className="py-2">模型指标</th>
                      <th className="py-2">设备资源ID</th>
                      <th className="py-2">设备类型</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 font-mono text-[11px]">
                    <tr>
                      <td className="py-2 text-sky-300">cpu_usage_dynamic_threshold</td>
                      <td className="py-2 text-slate-400">RES-SDN-002</td>
                      <td className="py-2 text-slate-200">SDN</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sky-300">mem_dynamic_baseline</td>
                      <td className="py-2 text-slate-400">RES-SRV-005</td>
                      <td className="py-2 text-slate-200">Server</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sky-300">bandwidth_dynamic_wave</td>
                      <td className="py-2 text-slate-400">RES-GW-003</td>
                      <td className="py-2 text-slate-200">Gateway</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card 2: 模型近7天告警数Top3 */}
            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">模型近7天告警数Top3</h4>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-sky-500" />
                  <span className="w-2 h-2 rounded bg-slate-800" />
                  <span className="w-2 h-2 rounded bg-slate-800" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs border-y border-slate-800/80 py-2 font-mono">
                <div>
                  <span className="text-slate-400">告警数 </span>
                  <span className="text-sky-400 font-bold text-sm">520</span>
                </div>
                <div>
                  <span className="text-slate-400">告警率 </span>
                  <span className="text-sky-400 font-bold text-sm">4 %</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 font-medium border-b border-slate-800/60">
                    <tr>
                      <th className="py-2">模型指标</th>
                      <th className="py-2">设备资源ID</th>
                      <th className="py-2">设备类型</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 font-mono text-[11px]">
                    <tr>
                      <td className="py-2 text-sky-300">cpu_usage_dynamic_threshold</td>
                      <td className="py-2 text-slate-400">RES-SDN-002</td>
                      <td className="py-2 text-slate-200">SDN</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sky-300">interface_drop_packets</td>
                      <td className="py-2 text-slate-400">RES-SW-008</td>
                      <td className="py-2 text-slate-200">Switch</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sky-300">disk_iops_dynamic</td>
                      <td className="py-2 text-slate-400">RES-STOR-005</td>
                      <td className="py-2 text-slate-200">Storage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card 3: 最新告警Top10 */}
            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white">最新告警Top10</h4>

                <div className="overflow-x-auto max-h-52 overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-900 text-slate-400 font-medium border-b border-slate-800 sticky top-0">
                      <tr>
                        <th className="py-2 px-2 shrink-0">序号</th>
                        <th className="py-2 px-2 shrink-0">检测时间</th>
                        <th className="py-2 px-2 shrink-0">告警时间</th>
                        <th className="py-2 px-2 shrink-0">告警级别</th>
                        <th className="py-2 px-2">告警正文</th>
                        <th className="py-2 px-2">实际值</th>
                        <th className="py-2 px-2">预测值</th>
                        <th className="py-2 px-2">上限</th>
                        <th className="py-2 px-2">下限</th>
                        <th className="py-2 px-2">设备资源ID</th>
                        <th className="py-2 px-2">设备类型</th>
                        <th className="py-2 px-2">设备IP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {filteredDynamicAlerts.map((row) => (
                        <tr key={row.seq} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-2 px-2 text-slate-400">{row.seq}</td>
                          <td className="py-2 px-2 text-slate-300 whitespace-nowrap">{row.checkTime}</td>
                          <td className="py-2 px-2 text-slate-400 whitespace-nowrap">{row.alarmTime}</td>
                          <td className="py-2 px-2 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.level === '重大告警'
                                  ? 'bg-rose-950 border border-rose-800 text-rose-400'
                                  : row.level === '高级告警'
                                  ? 'bg-amber-950 border border-amber-800 text-amber-400'
                                  : row.level === '中级告警'
                                  ? 'bg-yellow-950 border border-yellow-800 text-yellow-300'
                                  : 'bg-sky-950 border border-sky-800 text-sky-300'
                              }`}
                            >
                              {row.level}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-slate-300 font-sans whitespace-nowrap">{row.text}</td>
                          <td className="py-2 px-2 text-sky-300 font-bold">{row.actualValue}</td>
                          <td className="py-2 px-2 text-slate-400">{row.predictedValue}</td>
                          <td className="py-2 px-2 text-rose-400">{row.upperLimit}</td>
                          <td className="py-2 px-2 text-slate-400">{row.lowerLimit}</td>
                          <td className="py-2 px-2 text-slate-300">{row.resId}</td>
                          <td className="py-2 px-2 text-slate-400 font-sans">{row.resType}</td>
                          <td className="py-2 px-2 text-sky-400">{row.resIp}</td>
                        </tr>
                      ))}
                      {filteredDynamicAlerts.length === 0 && (
                        <tr>
                          <td colSpan={12} className="py-4 px-2 text-center text-slate-500 font-sans">该告警级别暂无记录</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
