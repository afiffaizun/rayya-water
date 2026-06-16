/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Clock, Calendar, CheckCircle2, RefreshCw, PlusSquare, ArrowUpRight, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { ActiveOrder, WaterType } from "../types";

interface OrderHistoryTabProps {
  orders: ActiveOrder[];
}

export const OrderHistoryTab: React.FC<OrderHistoryTabProps> = ({ orders }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="px-5 pt-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[18px] font-extrabold text-slate-800 tracking-tight">Riwayat Pesanan</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Daftar transaksi dan pengiriman air Anda</p>
        </div>
        <span className="text-[11px] bg-slate-100 font-extrabold text-slate-500 px-2 py-1 rounded">
          {orders.length} Transaksi
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-3 border border-slate-100">
            <Clock className="w-6 h-6" />
          </div>
          <span className="text-[13px] font-extrabold text-slate-700 block">Belum ada pesanan</span>
          <p className="text-[11.5px] text-slate-400 max-w-[200px] leading-relaxed mx-auto mt-1">
            Silakan buka tab "Order" untuk melakukan pemesanan air galon pertama Anda.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm relative overflow-hidden"
            >
              {/* Top Row: Icon + Type & Status */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl border ${
                    order.waterType === WaterType.REFILL
                      ? "bg-cyan-50 border-cyan-100 text-cyan-500"
                      : "bg-blue-50 border-blue-100 text-brand-blue"
                  }`}>
                    {order.waterType === WaterType.REFILL ? (
                      <RefreshCw className="w-4 h-4" />
                    ) : (
                      <PlusSquare className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <span className="text-[13.5px] font-extrabold text-slate-800 block">
                      {order.waterType === WaterType.REFILL ? "Isi Ulang (Refill)" : "Galon Baru + Air"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5 uppercase">
                      ID: {order.id}
                    </span>
                  </div>
                </div>

                {/* Status Pill matching mockup designs */}
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wide shrink-0 ${
                  order.status === "In Transit"
                    ? "bg-[#005eff] text-white"
                    : order.status === "Processing"
                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                    : order.status === "Completed"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-slate-100 text-slate-700"
                }`}>
                  {order.status}
                </span>
              </div>

              {/* Middle Row: Quantity & Combined details */}
              <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-50 text-[11.5px] leading-relaxed text-slate-500">
                <div>
                  <span className="text-slate-400 block font-medium">Jumlah</span>
                  <span className="font-extrabold text-slate-700 block">{order.qty} Galon</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Metode Kertas</span>
                  <span className="font-extrabold text-slate-700 block">{order.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Tanggal</span>
                  <span className="font-semibold text-slate-650 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {order.date}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Total Biaya</span>
                  <span className="font-extrabold text-brand-blue text-[13px]">
                    Rp {order.price.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Bottom Row helpful action context links */}
              <div className="flex justify-between items-center mt-3 pt-1 text-[11px] font-bold">
                <span className="text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" /> Pembayaran Terkonfirmasi
                </span>
                <button
                  onClick={() => alert(`Bantuan untuk Pesanan ${order.id}: Silakan hubungi CS WhatsApp melalui panel control.`)}
                  className="text-slate-400 hover:text-slate-600 flex items-center gap-0.5"
                >
                  Bantuan <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
