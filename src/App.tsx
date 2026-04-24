/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  Shield, 
  Smartphone, 
  MessageSquare, 
  Check, 
  Zap,
  Globe,
  Lock,
  ArrowUpRight,
  ChevronDown,
  Activity,
  Cpu,
  Wifi,
  EyeOff,
  Database,
  Unplug,
  Key,
  TerminalSquare,
  Network,
  Gauge,
  Bot,
  BrainCircuit,
  Sparkles,
  Server
} from 'lucide-react';

// --- Custom Brands SVGs ---
const SvgApple = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M15.5 2c0 1.5-.5 3-1.5 4-1 .8-2.5 1-4 1 0-1.5.5-3 1.5-4 1-.8 2.5-1 4-1zM18.5 19.5c-1 2-3 2.5-4 3-.8.3-2 .3-3 0-1-.5-3-.5-4-2.5-1-2.5-1.5-5-.5-7.5.8-1.5 2-2.5 4-2.5 1 0 2.5 1 3.5 1 1 0 2.5-1 4-1 1 0 2.5.5 3.5 1.5-1 1-1.5 1.5-1.5 3 0 1.5.5 2.5 1.5 3.5 0 .5-.5 1-1 1.5z"/>
  </svg>
);
const SvgWindows = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2.5 11l8.5-1.2v-7.8l-8.5 1.2v7.8zM12.5 9.5l9-1.3v-8.2l-9 1.3v8.2zM2.5 12.5l8.5 1.2v7.8l-8.5-1.2v-7.8zM12.5 14l9 1.3v8.2l-9-1.3v-8.2z" />
  </svg>
);
const SvgAndroid = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.81.25l-1.9 3.28C14.8 8.19 13.44 7.8 12 7.8c-1.44 0-2.8.39-4.07 1.05L6.03 5.4c-.16-.31-.52-.4-.81-.25-.3.16-.42.54-.26.85l1.84 3.18C4.54 10.63 3.06 12.92 2.5 15.5h19c-.56-2.58-2.04-4.87-3.9-6.02zM7 13.25c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
  </svg>
);

const PRELOADER_ICONS = [
  { Icon: SvgApple, x: -180, y: -220, delay: 0.1, color: "text-gray-300" },
  { Icon: SvgWindows, x: 200, y: -190, delay: 0.3, color: "text-blue-400" },
  { Icon: SvgAndroid, x: -220, y: 150, delay: 0.8, color: "text-green-500" },
  { Icon: Bot, x: 230, y: 180, delay: 0.5, color: "text-blue-500" },
  { Icon: BrainCircuit, x: -100, y: -280, delay: 1.2, color: "text-orange-400" },
  { Icon: Sparkles, x: 120, y: 260, delay: 0.6, color: "text-yellow-300" },
  { Icon: Cpu, x: -260, y: -50, delay: 1.5, color: "text-purple-400" },
  { Icon: Wifi, x: 250, y: 60, delay: 0.2, color: "text-sky-400" },
  { Icon: Database, x: -150, y: 240, delay: 1.1, color: "text-red-400" },
  { Icon: Network, x: 160, y: -250, delay: 1.7, color: "text-indigo-400" },
  { Icon: Globe, x: 280, y: -100, delay: 0.4, color: "text-teal-400" },
  { Icon: Lock, x: -280, y: 100, delay: 1.4, color: "text-emerald-400" },
  { Icon: Shield, x: 80, y: -290, delay: 0.9, color: "text-blue-300" },
  { Icon: Smartphone, x: -80, y: 290, delay: 1.6, color: "text-pink-400" },
  { Icon: TerminalSquare, x: 240, y: 200, delay: 1.0, color: "text-green-300" },
  { Icon: Key, x: -250, y: 200, delay: 0.7, color: "text-amber-400" },
  { Icon: Zap, x: 290, y: 150, delay: 1.3, color: "text-yellow-500" },
  { Icon: Server, x: -210, y: -120, delay: 1.8, color: "text-cyan-400" }
];

// --- Data ---
const FACTS = [
  { icon: Zap, title: 'Мгновенно', text: 'Активация через Happ за 0.8 секунды.' },
  { icon: Lock, title: 'Приватно', text: 'VLESS Reality маскирует весь трафик.' },
  { icon: Globe, title: 'Глобально', text: '10 Гбит/с порты во всех локациях.' },
  { icon: Shield, title: 'Без логов', text: 'Полная анонимность сессии.' },
];

const TARIFFS = [
  { period: '7 дней', price: '59 ₽', label: 'Start' },
  { period: '30 дней', price: '149 ₽', label: 'HIT' },
  { period: '90 дней', price: '399 ₽', label: 'Pro' },
  { period: '365 дней', price: '1299 ₽', label: 'Max' },
];

const INSTRUCTIONS = [
  {
    id: 'init',
    title: 'Подключение и запуск',
    icon: TerminalSquare,
    steps: [
      'Перейдите в бота @VihtVPNbot и отправьте команду /start',
      'Бот пришлет сообщение с вашим ID. В меню нажмите «Личный кабинет»',
      'В открывшемся Web App Telegram нажмите «Подключить устройство»',
      'Нажмите кнопку «Открыть в Happ»'
    ]
  },
  {
    id: 'split',
    title: 'Белый список (Сплит-туннелинг)',
    icon: Network,
    steps: [
      'Откройте приложение Happ',
      'В левом верхнем углу нажмите на шестерёнку (Настройки)',
      'Выберите пункт «Прокси для выбранных приложений»',
      'Перейдите в режим ВКЛ и галочкой выберите те приложения, на которые вам нужен VPN'
    ]
  },
  {
    id: 'boost',
    title: 'Оптимизация скорости сети',
    icon: Gauge,
    steps: [
      'Откройте приложение Happ',
      'В левом верхнем углу нажмите на шестерёнку (Настройки)',
      'Включите режим «Использовать Фрагментирование»',
      'Включите тумблер «Включить Шумы»',
      'Включите тумблер «Использовать Mux»'
    ]
  }
];

// --- Sub-components ---

const AiPreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: Spinner appears
    // Stage 1: Google AI drops in
    const t1 = setTimeout(() => setStage(1), 800);
    // Stage 2: Claude AI drops in
    const t2 = setTimeout(() => setStage(2), 1600);
    // Stage 3: Grok AI drops in
    const t3 = setTimeout(() => setStage(3), 2400);
    // Stage 4: Viht VPN text + explosion
    const t4 = setTimeout(() => setStage(4), 3600);
    // Stage 5: Fade out
    const t5 = setTimeout(() => onComplete(), 5000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
        
        {/* Core Spinning Wheel */}
        <motion.div 
          animate={{ rotate: 360, scale: stage === 4 ? 20 : 1, opacity: stage === 4 ? 0 : 1 }}
          transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, scale: { duration: 1, ease: "easeInOut" }, opacity: { duration: 1, ease: "easeOut" } }}
          className="absolute w-32 h-32 border-4 border-dashed border-blue-500/40 rounded-full flex items-center justify-center"
        >
          <div className="absolute w-24 h-24 border border-blue-400/20 rounded-full rotate-45" />
          <div className="absolute w-16 h-16 bg-blue-600/20 rounded-full blur-xl" />
        </motion.div>

        {/* Preloader Icons Galaxy */}
        <AnimatePresence>
          {stage >= 1 && stage < 4 && PRELOADER_ICONS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: item.x, y: item.y, scale: 2, opacity: 0, rotate: -45 }}
              animate={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 180 }}
              transition={{ duration: 1.5, delay: item.delay, ease: "backIn" }}
              className="absolute flex items-center justify-center pointer-events-none"
            >
              <div className={`w-12 h-12 rounded-2xl glass flex items-center justify-center border border-white/20 bg-white/5`}>
                <item.Icon className={`w-6 h-6 ${item.color}`} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* VIHT VPN Text */}
        <AnimatePresence>
          {stage >= 4 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute z-10 flex flex-col items-center gap-4"
            >
              <Shield className="w-20 h-20 text-blue-500" />
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-glow">
                VIHT <span className="text-blue-600">VPN</span>
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

const CodeStream = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
    <div className="flex gap-4 whitespace-nowrap animate-marquee vertical text-[10px] font-mono leading-none">
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          {Array.from({ length: 60 }).map((_, j) => (
            <div key={j} className="hologram-flicker">
              {`0x${Math.random().toString(16).slice(2, 8)} -> ROUTE_OK [TR: 25Gbps]`}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const NetworkSphere = ({ size = "w-72 h-72", opacity = "opacity-100" }) => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    className={`relative ${size} border border-blue-500/20 rounded-full flex items-center justify-center border-dashed ${opacity}`}
  >
    <div className="absolute inset-0 border border-blue-500/10 rounded-full scale-110" />
    <div className="absolute inset-0 border border-blue-500/5 rounded-full scale-150 border-dashed" />
    
    {/* Global Connections */}
    {Array.from({ length: 12 }).map((_, i) => (
      <div 
        key={i}
        className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] glow-pulse"
        style={{
          top: `${50 + 48 * Math.sin((i * Math.PI) / 6)}%`,
          left: `${50 + 48 * Math.cos((i * Math.PI) / 6)}%`,
        }}
      />
    ))}

    <div className="relative">
      <Globe className="w-32 h-32 text-blue-500/50" />
      <div className="absolute inset-0 blur-3xl bg-blue-500/30 -z-10" />
    </div>
  </motion.div>
);

const StatsDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-6 py-12 relative z-20">
    <div className="glass p-8 rounded-[40px] border-blue-500/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl" />
      <div className="space-y-4">
        <Activity className="text-blue-500 w-8 h-8" />
        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30">Network Capacity</h4>
        <div className="text-4xl font-black text-glow tabular-nums">25 GB/S</div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div animate={{ width: ['20%', '85%', '60%'] }} transition={{ duration: 5, repeat: Infinity }} className="h-full bg-blue-500" />
        </div>
        <p className="text-[9px] font-bold text-emerald-400">ULTRA HIGH BANDWIDTH PORT</p>
      </div>
    </div>

    <div className="glass p-8 rounded-[40px] border-emerald-500/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl" />
      <div className="space-y-4">
        <Key className="text-emerald-500 w-8 h-8" />
        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30">License Matrix</h4>
        <div className="text-4xl font-black text-glow">5 DEVICES</div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <Check className="w-2 h-2 text-emerald-500" />
            </div>
          ))}
        </div>
        <p className="text-[9px] font-bold text-white/40">1 KEY -- GLOBAL COVERAGE</p>
      </div>
    </div>

    <div className="glass p-8 rounded-[40px] border-purple-500/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-2xl" />
      <div className="space-y-4">
        <Unplug className="text-purple-500 w-8 h-8" />
        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30">Stability Protocol</h4>
        <div className="text-3xl font-black text-glow">UNBREAKABLE</div>
        <div className="animate-pulse flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full" />
          <span className="text-[9px] text-purple-400 font-bold uppercase tracking-widest">Active Persistence ON</span>
        </div>
        <p className="text-[9px] font-bold text-white/40">ZERO-DROP CONNECTION</p>
      </div>
    </div>
  </div>
);

const SystemConfigPanel = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 relative z-30 pt-20 pb-8">
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">Настройка системы</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-glow">
          Viht <span className="text-blue-500">VPN</span>
        </h1>
        <p className="text-sm md:text-base text-white/40 font-medium max-w-lg mx-auto">
          Всего 3 простых шага для полной анонимности и скорости через клиент Happ.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Compact Segmented Control */}
        <div className="flex justify-center relative z-10 w-full">
          <div className="flex items-center p-1.5 glass rounded-full border border-white/10 overflow-x-auto w-full md:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {INSTRUCTIONS.map((inst, idx) => {
               const isActive = activeTab === idx;
               return (
                 <button 
                   key={idx}
                   onClick={() => setActiveTab(idx)}
                   className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                     isActive 
                       ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                       : 'bg-transparent text-white/50 hover:text-white/90 hover:bg-white/5'
                   }`}
                 >
                   <inst.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/40'}`} />
                   <span className="font-bold text-[10px] md:text-xs uppercase tracking-wider">{inst.title}</span>
                 </button>
               )
            })}
          </div>
        </div>

        {/* Content pane */}
        <div className="glass rounded-[32px] border-white/5 p-6 md:p-10 relative overflow-hidden group min-h-[300px] flex flex-col justify-center border-blue-500/10 shadow-[0_0_50px_-20px_rgba(59,130,246,0.15)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none" />
          <div className="scanline opacity-50" />
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 md:space-y-8 relative z-10"
            >
              {INSTRUCTIONS[activeTab].steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 md:gap-6 group/step items-start">
                  <div className="flex flex-col items-center mt-0.5">
                    <div className="w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center text-sm font-black text-blue-400 bg-blue-500/10 transition-colors shrink-0">
                       {idx + 1}
                    </div>
                  </div>
                  <div className="pt-1 text-sm md:text-lg font-bold text-white/80 tracking-wide leading-relaxed">
                    {step}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const TariffsTable = () => (
  <div className="w-full max-w-4xl mx-auto glass rounded-[32px] border-white/5 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 uppercase text-[10px] tracking-widest text-white/40">
            <th className="p-6 font-black">План</th>
            <th className="p-6 font-black">Срок</th>
            <th className="p-6 font-black text-right">Стоимость</th>
          </tr>
        </thead>
        <tbody className="text-white/80 font-bold text-sm md:text-base">
          {TARIFFS.map((tariff, idx) => (
            <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors group">
              <td className="p-6 whitespace-nowrap">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">{tariff.label}</span>
              </td>
              <td className="p-6 whitespace-nowrap">{tariff.period}</td>
              <td className="p-6 whitespace-nowrap tabular-nums text-xl text-right">{tariff.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  if (!isLoaded) {
    return <AiPreloader onComplete={() => setIsLoaded(true)} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-black text-white min-h-screen selection:bg-blue-600/50 selection:text-white relative overflow-hidden"
    >
      <CodeStream />
      <div className="fixed inset-0 bg-mesh opacity-40 pointer-events-none" />
      <div className="fixed inset-0 grid-bg opacity-10 pointer-events-none" style={{ transform: 'rotateX(60deg) scale(2.5)' }} />

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-[100] p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500 glow-pulse" />
            <span className="text-xl font-black tracking-tighter uppercase italic">Viht.Network</span>
          </div>
          <motion.a 
            href="https://t.me/VihtVPNbot"
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 glass rounded-full text-[10px] font-black uppercase tracking-widest border-blue-500/20 hover:border-blue-500"
          >
            Перейти
          </motion.a>
        </div>
      </nav>

      <main className="relative z-10 pt-10">
        
        {/* HERO: SYSTEM INSTRUCTIONS PANEL */}
        <section className="relative overflow-hidden mb-16">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
          <SystemConfigPanel />
        </section>

        {/* CLEAN TARIFFS SECTION */}
        <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto relative">
          <div className="text-center space-y-4 mb-12">
             <h2 className="text-xs font-black uppercase tracking-[0.6em] text-blue-500">Access Matrix</h2>
             <h3 className="text-4xl font-black tracking-tighter uppercase">Тарифные пакеты</h3>
          </div>

          <TariffsTable />

          {/* Linking Line to Bot */}
          <div className="flex flex-col items-center mt-20 space-y-8">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: 100 }}
              viewport={{ once: true }}
              className="w-px bg-gradient-to-bottom from-blue-500 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
            />
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="https://t.me/VihtVPNbot"
              className="relative group block"
            >
              <div className="absolute inset-0 bg-blue-600 blur-[30px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative px-16 py-6 glass rounded-full border-blue-500/30 flex items-center justify-center gap-3">
                <MessageSquare className="w-6 h-6 text-blue-500" />
                <span className="text-base font-black uppercase tracking-widest italic">Перейти</span>
              </div>
            </motion.a>
          </div>
        </section>

      </main>

      <footer className="py-24 px-8 border-t border-white/5 text-center opacity-40">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-[10px] font-black uppercase tracking-[0.5em]">Viht Network v2.6.4 Stable</div>
          <div className="text-[8px] font-bold uppercase tracking-widest text-white/20">Encryption: AES-256-GCM / Prot: VLESS REALITY / Node: Multi-Region</div>
        </div>
      </footer>
    </motion.div>
  );
}
