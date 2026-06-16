/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Copy,
  CheckCircle2,
  Wallet,
  Building2,
  QrCode,
} from "lucide-react";
import { motion } from "motion/react";
import { ActiveOrder } from "../types";

interface PaymentScreenProps {
  order: ActiveOrder;
  onPaymentConfirmed: () => void;
  onCancel: () => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  order,
  onPaymentConfirmed,
  onCancel,
}) => {
  const [timeLeft, setTimeLeft] = useState(600);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const isEWallet = order.paymentMethod.includes("E-Wallet");

  const bankDetails = {
    name: "Bank BCA",
    number: "8820 1234 5678",
    accountName: "PT Rayya Water Nusantara",
    amount: order.price,
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          onClick={onCancel}
          className="p-1.5 rounded-full text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-[#0b5ce5] stroke-[2.5]" />
        </button>
        <span className="text-[16px] font-bold text-slate-800 tracking-tight">
          Pembayaran
        </span>
        <div className="w-8" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6 space-y-4">
        {/* Timer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
          <div className="bg-amber-400 p-2.5 rounded-xl">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[11px] text-amber-600 font-bold block uppercase tracking-wider">
              Selesaikan Pembayaran Dalam
            </span>
            <span className="text-[22px] font-extrabold text-amber-700 font-mono block">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
          <h4 className="text-[13px] font-extrabold text-slate-800 flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-slate-500" /> Ringkasan Pesanan
          </h4>
          <div className="space-y-2 text-[12px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">ID Pesanan</span>
              <span className="font-extrabold text-slate-800">{order.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Metode Bayar</span>
              <span className="font-extrabold text-slate-800">{order.paymentMethod}</span>
            </div>
            <div className="border-t border-slate-100 pt-2 flex items-center justify-between">
              <span className="text-[13px] font-extrabold text-slate-800">Total Pembayaran</span>
              <span className="text-[18px] font-extrabold text-[#0b5ce5]">
                Rp {order.price.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        {isEWallet ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <h4 className="text-[13px] font-extrabold text-slate-800 flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-slate-500" /> Scan QR Code
            </h4>
            <div className="flex flex-col items-center">
              {/* QR Code Placeholder */}
              <div className="w-48 h-48 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2">
                <QrCode className="w-20 h-20 text-slate-300" />
                <span className="text-[11px] text-slate-400 font-medium">QR Code Pembayaran</span>
              </div>
              <p className="text-[12px] text-slate-500 font-medium text-center mt-3 leading-relaxed">
                Buka aplikasi <span className="font-bold text-slate-700">{order.paymentMethod.replace("E-Wallet ", "")}</span> lalu scan QR di atas
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <h4 className="text-[13px] font-extrabold text-slate-800 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-500" /> Transfer Bank
            </h4>
            <div className="space-y-3">
              <div className="bg-slate-50 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Bank</span>
                  <span className="text-[12px] font-extrabold text-slate-800">{bankDetails.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Nomor Rekening</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-extrabold text-slate-800 font-mono tracking-wider">
                      {bankDetails.number}
                    </span>
                    <button
                      onClick={() => copyToClipboard(bankDetails.number.replace(/\s/g, ""))}
                      className="p-1 rounded-md hover:bg-slate-200 transition-colors"
                    >
                      {copied ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Atas Nama</span>
                  <span className="text-[12px] font-bold text-slate-600">{bankDetails.accountName}</span>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-700">Jumlah Transfer</span>
                <span className="text-[15px] font-extrabold text-[#0b5ce5]">
                  Rp {bankDetails.amount.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Support */}
        <div className="text-center pt-1">
          <span className="text-[11px] text-slate-400 font-medium">
            Pembayaran tidak berhasil?{" "}
            <button className="text-[#0b5ce5] font-bold hover:underline">Hubungi CS</button>
          </span>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="px-5 py-4 border-t border-slate-100 bg-white shrink-0 space-y-2">
        <button
          onClick={onPaymentConfirmed}
          disabled={timeLeft <= 0}
          className="w-full h-11 rounded-xl bg-[#0b5ce5] hover:bg-blue-700 text-white font-bold text-[13px] flex items-center justify-center transition-all active:scale-[0.98] shadow-md shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle2 className="w-4 h-4 mr-1.5" />
          Saya Sudah Bayar
        </button>
        <button
          onClick={onCancel}
          className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[13px] flex items-center justify-center transition-colors"
        >
          Batal
        </button>
      </div>
    </motion.div>
  );
};
