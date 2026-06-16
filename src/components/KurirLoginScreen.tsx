/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User, Lock, Eye, EyeOff, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { CustomerProfile } from "../types";

interface KurirLoginScreenProps {
  onRegisterClick: () => void;
  onLoginSuccess: (kurirId: string) => void;
  registeredProfile: CustomerProfile | null;
}

export const KurirLoginScreen: React.FC<KurirLoginScreenProps> = ({
  onRegisterClick,
  onLoginSuccess,
  registeredProfile,
}) => {
  const [kurirId, setKurirId] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [errors, setErrors] = useState<{ kurirId?: string; pin?: string }>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { kurirId?: string; pin?: string } = {};

    if (!kurirId.trim()) {
      newErrors.kurirId = "Nomor HP atau Username wajib diisi";
    }
    if (!pin) {
      newErrors.pin = "Kata sandi wajib diisi";
    } else if (pin.length < 6) {
      newErrors.pin = "Kata sandi minimal 6 karakter";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!registeredProfile || !registeredProfile.username) {
      newErrors.kurirId = "Belum ada akun terdaftar. Silakan daftar terlebih dahulu.";
      setErrors(newErrors);
      return;
    }

    const inputMatch =
      kurirId.trim() === registeredProfile.username ||
      kurirId.trim() === registeredProfile.phone;
    const pinMatch = pin === registeredProfile.password;

    if (!inputMatch) {
      newErrors.kurirId = "Username atau Nomor HP tidak terdaftar";
    }
    if (!pinMatch) {
      newErrors.pin = "Kata sandi salah";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onLoginSuccess(kurirId.trim());
  };

  const handleFillDemo = () => {
    if (registeredProfile && registeredProfile.username) {
      setKurirId(registeredProfile.username);
      setPin(registeredProfile.password);
    } else {
      setKurirId("syafaat31");
      setPin("123412");
    }
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex-1 flex flex-col justify-between py-4 bg-gradient-to-b from-blue-50/50 to-white relative"
    >
      {/* 1. Header Bar */}
      <div className="flex items-center justify-center px-4 py-3 border-b border-slate-100 bg-white/90 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <span className="text-[15px] font-semibold text-brand-blue">
          Login Pelanggan
        </span>
      </div>

      {/* Wrapper to scrollable content */}
      <div className="flex-1 px-5 pt-8 pb-4 overflow-y-auto">
        {/* 2. Logo and Title */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* Logo container exactly like screenshot: a rounded blue corner item with white droplet */}
          <div className="w-[84px] h-[84px] bg-[#0b5ce5] rounded-[24px] flex items-center justify-center shadow-lg shadow-blue-500/20 mb-5 float-animation">
            <svg 
              className="w-12 h-12 text-white" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 2.69l.71.69c3.08 3.01 5.92 6.54 5.92 10.3a6.63 6.63 0 0 1-13.26 0c0-3.76 2.84-7.29 5.92-10.3l.71-.69z" />
            </svg>
          </div>

          <h1 className="text-[34px] font-extrabold tracking-tight text-[#0a5ce5] mb-1 leading-none font-sans">
            Rayya Water
          </h1>
          <p className="text-[15px] text-slate-500 font-medium">
            Pengantaran Cepat & Higienis
          </p>
        </div>

        {/* 3. Login Box Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xl shadow-slate-100">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Field: Nomor HP / Username */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-600 mb-1.5 font-sans">
                Nomor HP / Username Pelanggan
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-[18px] h-[18px]" />
                </span>
                <input
                  type="text"
                  value={kurirId}
                  onChange={(e) => {
                    setKurirId(e.target.value);
                    if (errors.kurirId) setErrors({ ...errors, kurirId: undefined });
                  }}
                  placeholder="Contoh: 0832398329239 / syafaat31"
                  className={`w-full h-12 pl-10 pr-4 rounded-xl text-[14px] bg-[#f4f7fe] text-slate-800 border ${
                    errors.kurirId ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-blue-400"
                  } outline-none transition-all placeholder:text-slate-400 font-medium`}
                  id="kurir-id-input"
                />
              </div>
              {errors.kurirId && (
                <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.kurirId}</p>
              )}
            </div>

            {/* Field: PIN / Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[13px] font-semibold text-slate-600 font-sans">
                  PIN / Kata Sandi
                </label>
                <button
                  type="button"
                  onClick={() => alert("Simulasi Lupa PIN: PIN default Anda adalah 123412")}
                  className="text-[12px] font-bold text-brand-blue hover:underline"
                >
                  Lupa PIN?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-[18px] h-[18px]" />
                </span>
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (errors.pin) setErrors({ ...errors, pin: undefined });
                  }}
                  placeholder="Masukkan kata sandi"
                  className={`w-full h-12 pl-10 pr-11 rounded-xl text-[14px] bg-[#f4f7fe] text-slate-800 border ${
                    errors.pin ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-blue-400"
                  } outline-none transition-all placeholder:text-slate-400 font-medium`}
                  id="kurir-pin-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.pin && (
                <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.pin}</p>
              )}
            </div>

            {/* Button: Masuk Sekarang */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl mt-2 bg-[#0b5ce5] hover:bg-blue-700 text-white font-bold text-[14px] flex items-center justify-center gap-1 transition-all active:scale-[0.98] shadow-md shadow-blue-600/20"
              id="kurir-login-submit-btn"
            >
              <span>Masuk Sekarang</span>
              <ChevronRight className="w-4 h-4 ml-0.5 mt-[1px]" />
            </button>
          </form>

          {/* Helper quick demo values */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Demo Akun Pelanggan:
            </span>
            <button
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-brand-blue bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
            >
              Gunakan Default
            </button>
          </div>
        </div>
      </div>

      {/* 4. Footer Section */}
      <div className="px-6 text-center py-4 border-t border-slate-50 bg-white">
        <p className="text-[13px] text-slate-500">
          Belum bergabung?{" "}
          <button
            onClick={onRegisterClick}
            className="font-bold text-brand-blue hover:underline cursor-pointer"
          >
            Daftar Jadi Pelanggan
          </button>
        </p>
      </div>
    </motion.div>
  );
};
