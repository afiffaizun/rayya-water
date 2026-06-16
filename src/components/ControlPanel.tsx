/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  Sparkles,
  Smartphone,
  CheckCircle,
  Truck,
  RotateCw,
  PlusCircle,
  Trash2,
  Lock,
  UserCheck,
  Send,
  Sliders,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { ScreenType, DashboardTab, WaterType } from "../types";

interface ControlPanelProps {
  currentScreen: ScreenType;
  onSetScreen: (screen: ScreenType) => void;
  currentTab: DashboardTab;
  onSetTab: (tab: DashboardTab) => void;
  onInjectOrder: (waterType: WaterType) => void;
  onClearHistory: () => void;
  onModifyStock: (amount: number) => void;
  stockUnits: number;
  latestOrderStatus: string;
  onUpdateLatestOrderStatus: (status: any) => void;
  profileName: string;
  onTriggerNotification: (msg: string) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  currentScreen,
  onSetScreen,
  currentTab,
  onSetTab,
  onInjectOrder,
  onClearHistory,
  onModifyStock,
  stockUnits,
  latestOrderStatus,
  onUpdateLatestOrderStatus,
  profileName,
  onTriggerNotification,
}) => {
  return (
    <div className="bg-slate-900 border-l border-slate-800 text-slate-100 p-6 flex flex-col justify-between overflow-y-auto h-full max-w-[360px] w-full shrink-0 select-none">
      <div className="space-y-6">
        {/* Header Title */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600/20 p-1.5 rounded-lg border border-blue-500/20">
            <Sliders className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-[15px] font-extrabold tracking-tight text-white uppercase">App Inspector</h2>
            <p className="text-[11px] text-slate-400 font-semibold">Tuning & Simulasi Real-Time</p>
          </div>
        </div>

        {/* SECTION 1: Screen Teleporter */}
        <div className="space-y-2.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Teleportasi Desain</span>
          <div className="grid grid-cols-2 gap-2">
            {/* Screen 1 Button */}
            <button
              onClick={() => onSetScreen(ScreenType.KURIR_LOGIN)}
              className={`text-left p-2.5 rounded-xl border transition-all text-[11px] font-bold ${
                currentScreen === ScreenType.KURIR_LOGIN
                  ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                  : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                <Lock className="w-3.5 h-3.5" /> Screen 1
              </div>
              Login Pelanggan
            </button>

            {/* Screen 2 Button */}
            <button
              onClick={() => onSetScreen(ScreenType.REGISTER)}
              className={`text-left p-2.5 rounded-xl border transition-all text-[11px] font-bold ${
                currentScreen === ScreenType.REGISTER
                  ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                  : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                <UserCheck className="w-3.5 h-3.5" /> Screen 2
              </div>
              Buat Akun
            </button>

            {/* Screen 3 Button */}
            <button
              onClick={() => onSetScreen(ScreenType.SUCCESS)}
              className={`text-left p-2.5 rounded-xl border transition-all text-[11px] font-bold ${
                currentScreen === ScreenType.SUCCESS
                  ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                  : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                <CheckCircle className="w-3.5 h-3.5" /> Screen 3
              </div>
              Sukses Reg
            </button>

            {/* Screen 4 Button */}
            <button
              onClick={() => {
                onSetScreen(ScreenType.DASHBOARD);
                onSetTab(DashboardTab.ORDER);
              }}
              className={`text-left p-2.5 rounded-xl border transition-all text-[11px] font-bold ${
                currentScreen === ScreenType.DASHBOARD && currentTab === DashboardTab.ORDER
                  ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                  : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                <Smartphone className="w-3.5 h-3.5" /> Screen 4
              </div>
              Formulir Pesan
            </button>
          </div>
        </div>

        {/* SECTION 2: Tab Inspector */}
        {currentScreen === ScreenType.DASHBOARD && (
          <div className="space-y-2.5 pt-1 border-t border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Navigator Tab Dashboard</span>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(DashboardTab).map((tab) => (
                <button
                  key={tab}
                  onClick={() => onSetTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-center font-extrabold text-[10px] border transition-colors ${
                    currentTab === tab
                      ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300"
                      : "bg-slate-800/50 border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: Live order controls */}
        <div className="space-y-3 pt-1 border-t border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Status Delivery (Card 1)</span>
          <div className="grid grid-cols-3 gap-1.5">
            {["In Transit", "Processing", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => {
                  onUpdateLatestOrderStatus(status);
                  onTriggerNotification(`🚀 Pengiriman diubah ke status: ${status}`);
                }}
                className={`py-1.5 px-1 rounded text-center text-[10px] font-extrabold transition-all border ${
                  latestOrderStatus === status
                    ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-300"
                    : "bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {status === "In Transit" && <Truck className="w-3 h-3 mx-auto mb-1 text-blue-400" />}
                {status === "Processing" && <RotateCw className="w-3 h-3 mx-auto mb-1 text-amber-400 animate-spin-slow" />}
                {status === "Completed" && <CheckCircle className="w-3 h-3 mx-auto mb-1 text-emerald-400" />}
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 4: Inventory & Mock Transactions */}
        <div className="space-y-3 pt-1 border-t border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Gudang & Simulasi Transaksi</span>
          
          {/* Stock tuning */}
          <div className="bg-slate-850 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-semibold">Stok Air: <strong className="text-white text-[12px] ml-1">{stockUnits}</strong></span>
            <div className="flex gap-1.5">
              <button
                onClick={() => onModifyStock(-5)}
                disabled={stockUnits <= 0}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold px-2.5 py-1 rounded border border-slate-700 disabled:opacity-30"
              >
                -5
              </button>
              <button
                onClick={() => onModifyStock(5)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold px-2.5 py-1 rounded border border-slate-700"
              >
                +5
              </button>
            </div>
          </div>

          {/* Quick injection triggers */}
          <div className="space-y-1.5">
            <button
              onClick={() => {
                onInjectOrder(WaterType.REFILL);
                onTriggerNotification("📥 Sukses menginjeksi Transaksi Refill Baru ke History!");
              }}
              className="w-full text-left py-2 px-3 bg-slate-850 hover:bg-slate-800 rounded-xl text-[11px] text-slate-300 flex items-center justify-between transition-colors border border-slate-800"
            >
              <span className="flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-cyan-400" /> Injeksi Order Refill
              </span>
              <span className="text-slate-500 font-mono">Rp 6K</span>
            </button>

            <button
              onClick={() => {
                onInjectOrder(WaterType.NEW_GALLON);
                onTriggerNotification("📥 Sukses menginjeksi Transaksi Galon Baru ke History!");
              }}
              className="w-full text-left py-2 px-3 bg-slate-850 hover:bg-slate-800 rounded-xl text-[11px] text-slate-300 flex items-center justify-between transition-colors border border-slate-800"
            >
              <span className="flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-blue-400" /> Injeksi Galon Baru
              </span>
              <span className="text-slate-500 font-mono">Rp 18K</span>
            </button>

            <button
              onClick={onClearHistory}
              className="w-full text-left py-2 px-3 bg-rose-950/15 hover:bg-rose-950/30 text-rose-300 rounded-xl text-[11px] flex items-center gap-1.5 transition-colors border border-rose-900/30"
            >
              <Trash2 className="w-4 h-4 text-rose-400" /> Bersihkan Riwayat Order
            </button>
          </div>
        </div>
      </div>

      {/* Support details & help hotlines */}
      <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-2 mt-4">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Customer Support / CS</span>
        <div className="bg-slate-850 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1">
          <span className="font-bold flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" /> Support Hotline
          </span>
          <p className="text-slate-400 leading-relaxed text-[10.5px]">
            Layanan pengantaran galon Rayya Water siap melayani daerah Kota & Kabupaten Garut.
          </p>
          <a
            href="https://wa.me/62832398329239"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue hover:underline font-bold flex items-center gap-0.5 mt-1 text-slate-300"
          >
            Hubungi via WA <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <p className="text-[10px] text-slate-600 text-center uppercase font-mono mt-1">
          Developed in Real-time • React 19
        </p>
      </div>
    </div>
  );
};
