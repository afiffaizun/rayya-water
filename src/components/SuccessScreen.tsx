/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Check, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

interface SuccessScreenProps {
  onProceed: () => void;
  onLetssGo: () => void;
  onContactCS: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  onProceed,
  onLetssGo,
  onContactCS,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 flex flex-col justify-between py-10 px-6 bg-white shrink-0 h-full"
    >
      {/* 1. Header Branded Logo */}
      <div className="flex items-center justify-center pt-2 mb-2">
        <svg
          className="w-8 h-8 text-[#0b5ce5] mr-2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2.69l.71.69c3.08 3.01 5.92 6.54 5.92 10.3a6.63 6.63 0 0 1-13.26 0c0-3.76 2.84-7.29 5.92-10.3l.71-.69z" />
        </svg>
        <span className="text-[24px] font-extrabold text-[#0c5de5] tracking-tight">
          Rayya Water
        </span>
      </div>

      {/* 2. Concentric Shadow Circle & Success Icon */}
      <div className="flex flex-col items-center my-6">
        <div className="relative flex items-center justify-center">
          {/* Outer Ring 2 */}
          <div className="absolute w-[180px] h-[180px] bg-blue-50/30 rounded-full animate-ping opacity-75"></div>
          {/* Outer Ring 1 */}
          <div className="w-[140px] h-[140px] bg-[#f0f6ff] rounded-full flex items-center justify-center border border-blue-50">
            {/* Inner Solid Circle */}
            <div className="w-[100px] h-[100px] bg-[#0060ff] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Check className="w-12 h-12 text-white stroke-[3.5]" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[25px] font-extrabold text-slate-800 tracking-tight mt-8 mb-3 text-center">
          Pendaftaran Berhasil!
        </h3>

        {/* Paragraph Description */}
        <p className="text-[14px] text-slate-500 text-center leading-[1.65] max-w-[280px] font-medium">
          Selamat bergabung di Rayya Water. Akun Anda telah aktif. Silakan
          login untuk mulai memesan air galon dengan mudah.
        </p>
      </div>

      {/* 3. Operational Buttons and Support Link */}
      <div className="space-y-3.5 mt-2">
        {/* Button 1: Mulai Pesan Sekarang */}
        <button
          onClick={onProceed}
          className="w-full h-12 rounded-xl bg-[#0b5ce5] hover:bg-blue-700 text-white font-bold text-[14px] flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] shadow-md shadow-blue-500/20"
          id="success-proceed-btn"
        >
          <span>Login Sekarang</span>
          <ArrowRight className="w-4 h-4 mt-[1.5px]" />
        </button>

        {/* Button 2: Letss Goooo */}
        <button
          onClick={onLetssGo}
          className="w-full h-12 rounded-xl bg-[#d2f3ff] hover:bg-[#b0ebff] text-[#0060ff] font-bold text-[14px] flex items-center justify-center transition-all active:scale-[0.98]"
          id="success-letss-go-btn"
        >
          Kembali ke Login
        </button>

        {/* CS Support link */}
        <div className="text-center pt-4">
          <p className="text-[12px] text-slate-400 font-medium">
            Butuh bantuan?{" "}
            <button
              onClick={onContactCS}
              className="text-brand-blue font-bold hover:underline cursor-pointer"
            >
              Hubungi CS
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
