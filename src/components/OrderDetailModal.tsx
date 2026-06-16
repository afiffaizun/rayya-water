/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  Check,
  Package,
  RefreshCw,
  PlusSquare,
  Calendar,
  CreditCard,
  MapPin,
  Clock,
  Truck,
  ArrowLeft,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { motion } from "motion/react";
import { ActiveOrder, WaterType } from "../types";

interface OrderDetailModalProps {
  order: ActiveOrder;
  address: string;
  onClose: () => void;
  onViewHistory: () => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  address,
  onClose,
  onViewHistory,
}) => {
  const estimatedTime =
    order.status === "Processing"
      ? "30-60 menit"
      : order.status === "In Transit"
      ? "10-20 menit"
      : "Tiba";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-white flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-white shrink-0">
        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-[#0b5ce5] stroke-[2.5]" />
        </button>
        <span className="text-[16px] font-bold text-slate-800 tracking-tight">
          Detail Pesanan
        </span>
        <div className="w-8" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6 space-y-4">
        {/* Success Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Check className="w-8 h-8 text-white stroke-[3]" />
            </div>
            <div className="absolute inset-0 w-16 h-16 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <h3 className="text-[20px] font-extrabold text-slate-800 tracking-tight">
            Pesanan Berhasil!
          </h3>
          <p className="text-[12px] text-slate-400 mt-1 font-medium">
            Pesanan Anda sedang diproses oleh kurir
          </p>
        </div>

        {/* Order ID & Status Card */}
        <div className="bg-[#005eff] rounded-2xl p-4 text-white shadow-md shadow-blue-500/15">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-blue-100/80 font-semibold uppercase tracking-wider">
              ID Pesanan
            </span>
            <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-wide ${
              order.status === "Processing"
                ? "bg-amber-400 text-amber-900"
                : order.status === "In Transit"
                ? "bg-white/25 text-white"
                : "bg-emerald-400 text-emerald-900"
            }`}>
              {order.status === "Processing" && <span className="inline-block w-1.5 h-1.5 bg-amber-600 rounded-full mr-1 animate-pulse"></span>}
              {order.status === "In Transit" && <Truck className="w-3 h-3 inline mr-1" />}
              {order.status}
            </span>
          </div>
          <span className="text-[22px] font-extrabold tracking-tight block">
            {order.id}
          </span>
        </div>

        {/* Detail Item */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
          <h4 className="text-[13px] font-extrabold text-slate-800 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-slate-500" /> Detail Item
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2 text-slate-500">
                {order.waterType === WaterType.REFILL ? (
                  <RefreshCw className="w-4 h-4 text-cyan-500" />
                ) : (
                  <PlusSquare className="w-4 h-4 text-blue-500" />
                )}
                <span className="font-medium">Tipe Air</span>
              </div>
              <span className="font-extrabold text-slate-800">
                {order.waterType === WaterType.REFILL ? "Isi Ulang (Refill)" : "Galon Baru + Air"}
              </span>
            </div>

            <div className="flex items-center justify-between text-[12px]">
              <span className="text-slate-500 font-medium ml-6">Jumlah</span>
              <span className="font-extrabold text-slate-800">{order.qty} Galon</span>
            </div>

            <div className="flex items-center justify-between text-[12px]">
              <span className="text-slate-500 font-medium ml-6">Harga Satuan</span>
              <span className="font-semibold text-slate-600">
                Rp {(order.price / order.qty).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between">
              <span className="text-[13px] font-extrabold text-slate-800">Total</span>
              <span className="text-[16px] font-extrabold text-[#0b5ce5]">
                Rp {order.price.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* Pembayaran & Tanggal */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
          <h4 className="text-[13px] font-extrabold text-slate-800 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-slate-500" /> Pembayaran & Tanggal
          </h4>
          <div className="space-y-2.5 text-[12px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <CreditCard className="w-4 h-4 text-slate-400" />
                <span className="font-medium">Metode Bayar</span>
              </div>
              <span className="font-extrabold text-slate-800">{order.paymentMethod}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="font-medium">Tanggal</span>
              </div>
              <span className="font-semibold text-slate-700">{order.date}</span>
            </div>
          </div>
        </div>

        {/* Alamat Pengantaran */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
          <h4 className="text-[13px] font-extrabold text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-500" /> Alamat Pengantaran
          </h4>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#0b5ce5] mt-0.5 shrink-0" />
            <span className="text-[12px] leading-relaxed text-slate-600 font-medium">
              {address || "Belum ada alamat"}
            </span>
          </div>
        </div>

        {/* Estimasi Pengiriman */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 p-4 flex items-center gap-3">
          <div className="bg-[#005eff] p-2.5 rounded-xl">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
              Estimasi Pengiriman
            </span>
            <span className="text-[16px] font-extrabold text-slate-800 block">
              {estimatedTime}
            </span>
          </div>
        </div>

        {/* Support Link */}
        <div className="text-center pt-1">
          <a
            href="https://wa.me/62832398329239"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-slate-400 font-semibold inline-flex items-center gap-1 hover:text-slate-600"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Butuh bantuan? Hubungi CS
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="px-5 py-4 border-t border-slate-100 bg-white shrink-0 space-y-2">
        <button
          onClick={onViewHistory}
          className="w-full h-11 rounded-xl bg-[#0b5ce5] hover:bg-blue-700 text-white font-bold text-[13px] flex items-center justify-center transition-all active:scale-[0.98] shadow-md shadow-blue-500/10"
        >
          Lihat Riwayat Pesanan
        </button>
        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[13px] flex items-center justify-center transition-colors"
        >
          Kembali ke Order
        </button>
      </div>
    </motion.div>
  );
};
