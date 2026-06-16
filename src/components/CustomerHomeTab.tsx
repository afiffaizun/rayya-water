/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Smile, Flame, TrendingUp, Calendar, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { CustomerProfile } from "../types";

interface CustomerHomeTabProps {
  profile: CustomerProfile;
  onSetTab: (tab: any) => void;
}

export const CustomerHomeTab: React.FC<CustomerHomeTabProps> = ({
  profile,
  onSetTab,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="px-5 pt-4 space-y-5"
    >
      {/* Dynamic Greetings Bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50/50 p-4 rounded-2xl border border-blue-100">
        <div>
          <span className="text-[12px] text-slate-500 font-bold block mb-0.5">SELAMAT DATANG</span>
          <h3 className="text-[18px] font-extrabold text-slate-800 flex items-center gap-1.5">
            Halo, {profile.fullName || "Pelanggan Setia"}! <Smile className="w-5 h-5 text-indigo-500" />
          </h3>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#0060ff] flex items-center justify-center text-white font-extrabold text-[15px] border-2 border-white shadow">
          {profile.fullName ? profile.fullName[0].toUpperCase() : "U"}
        </div>
      </div>

      {/* Consumption Indicator Stats Widget */}
      <div className="bg-white rounded-[24px] border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-extrabold text-slate-800">Target Hidrasi Harian Anda</span>
          <span className="text-[11px] font-bold text-slate-400">8 Gelas / Hari</span>
        </div>

        {/* Custom Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full w-[75%] transition-all"></div>
          </div>
          <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500">
            <span>6/8 Gelas Terpenuhi</span>
            <span className="text-brand-blue font-bold">75% Sukses</span>
          </div>
        </div>

        {/* Staggered visual grid details */}
        <div className="grid grid-cols-2 gap-3.5 pt-1">
          <div className="bg-[#f8fafd] p-3 rounded-2xl border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">STREAK HARI INI</span>
            <span className="text-[16px] font-extrabold text-slate-700 flex items-center gap-1">
              <Flame className="w-4.5 h-4.5 text-amber-500 fill-amber-500" /> 12 Hari
            </span>
          </div>
          <div className="bg-[#f8fafd] p-3 rounded-2xl border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">TOTAL AIR</span>
            <span className="text-[16px] font-extrabold text-slate-700 flex items-center gap-1">
              <TrendingUp className="w-4.5 h-4.5 text-emerald-500" /> 24 Liter
            </span>
          </div>
        </div>
      </div>

      {/* Featured Promos */}
      <div className="space-y-3">
        <h4 className="text-[14px] font-extrabold text-slate-800 tracking-tight">Promo Menarik Untukmu</h4>

        {/* Promo card 1 */}
        <div className="bg-gradient-to-br from-[#0c59e4] to-[#128eff] p-4 rounded-2xl text-white relative overflow-hidden shadow-md shadow-blue-500/10">
          <div className="relative z-10 max-w-[200px]">
            <span className="bg-amber-400 text-slate-950 font-bold text-[9px] px-2 py-0.5 rounded-full uppercase block w-max mb-2">
              PROMO SPESIAL
            </span>
            <h5 className="font-extrabold text-[15px] leading-tight mb-1">
              Refill Paket 5 Galon Hemat Rp 10.000!
            </h5>
            <p className="text-[10px] text-blue-100/90 leading-relaxed mb-3">
              Cocok untuk katering, kos, atau keluarga besar. Kupon otomatis berlaku.
            </p>
            <button
              onClick={() => onSetTab("ORDER")}
              className="bg-white text-brand-blue text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Order Sekarang
            </button>
          </div>
          {/* Subtle vector decorations */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full pointer-events-none"></div>
          <div className="absolute -top-6 right-10 w-20 h-20 bg-white/10 rounded-full pointer-events-none"></div>
        </div>
      </div>

      {/* Hydration Hygienic Guidelines */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3">
        <h5 className="text-[12.5px] font-extrabold text-slate-800 flex items-center gap-1.5">
          <ShieldCheck className="w-[18px] h-[18px] text-emerald-500" /> Jaminan Kebersihan & Mutu
        </h5>
        <div className="space-y-2.5 text-[11.5px] leading-relaxed text-slate-500">
          <p className="border-l-2 border-emerald-300 pl-2.5">
            💡 <strong>100% Steril:</strong> Seluruh galon Rayya Water melalui proses bilas pencucian ozon berkekuatan tinggi sebelum diisi ulang.
          </p>
          <p className="border-l-2 border-emerald-300 pl-2.5">
            🔑 <strong>Segel Karet Ganda:</strong> Menjaga air tetap higienis dari guncangan selama perjalanan kurir bermotor.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
