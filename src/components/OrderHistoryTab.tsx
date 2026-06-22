/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Clock, Calendar, CheckCircle2, RefreshCw, PlusSquare, ChevronRight, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { ActiveOrder, WaterType } from "../types";

interface OrderHistoryTabProps {
  orders: ActiveOrder[];
  onViewOrderDetail: (order: ActiveOrder) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: ActiveOrder["status"]) => void;
}

export const OrderHistoryTab: React.FC<OrderHistoryTabProps> = ({
  orders,
  onViewOrderDetail,
}) => {
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
              onClick={() => onViewOrderDetail(order)}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm relative overflow-hidden cursor-pointer hover:border-[#0b5ce5]/30 hover:shadow-md transition-all active:scale-[0.98]"
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

                {/* Status Pill */}
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
                  <span className="text-slate-400 block font-medium">Metode Bayar</span>
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

              {/* Mini Tracking Progress */}
              {order.status !== "Completed" && (
                <div className="mt-3 mb-2">
                  <div className="flex items-center gap-1.5">
                    {["Processing", "In Transit", "Completed"].map((step, i) => {
                      const steps = ["Processing", "In Transit", "Completed"];
                      const currentIdx = steps.indexOf(order.status);
                      const isDone = i <= currentIdx;
                      return (
                        <React.Fragment key={step}>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                            isDone
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-100 text-slate-400 border border-slate-200"
                          }`}>
                            {isDone ? "✓" : i + 1}
                          </div>
                          {i < 2 && (
                            <div className={`flex-1 h-[2px] rounded-full ${
                              i < currentIdx ? "bg-emerald-400" : "bg-slate-200"
                            }`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-1 px-0.5">
                    <span className="text-[8px] text-slate-400 font-medium w-5 text-center">Proses</span>
                    <span className="text-[8px] text-slate-400 font-medium w-5 text-center">Kirim</span>
                    <span className="text-[8px] text-slate-400 font-medium w-5 text-center">Selesai</span>
                  </div>
                </div>
              )}

              {/* Bottom Row */}
              <div className="flex justify-between items-center mt-2 pt-1 text-[11px] font-bold">
                <span className={`flex items-center gap-1 ${
                  order.status === "Completed" ? "text-emerald-500" : "text-[#0b5ce5]"
                }`}>
                  {order.status === "Completed" ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" /> Pesanan Selesai
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3.5 h-3.5 stroke-[2.5]" /> Lacak Pesanan
                    </>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
