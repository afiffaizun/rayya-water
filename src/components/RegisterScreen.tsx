/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowLeft, User, Phone, MapPin, Sparkles, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { CustomerProfile } from "../types";

interface RegisterScreenProps {
  onBack: () => void;
  onSuccess: (profile: CustomerProfile) => void;
  onLoginClick: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onBack,
  onSuccess,
  onLoginClick,
}) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    username?: string;
    phone?: string;
    password?: string;
    address?: string;
    terms?: string;
  }>({});

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi";
    }
    if (!username.trim()) {
      newErrors.username = "Username wajib diisi";
    }
    if (!phone.trim()) {
      newErrors.phone = "Nomor telepon wajib diisi";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "Nomor telepon hanya boleh berisi angka";
    }
    if (!password) {
      newErrors.password = "Kata sandi wajib diisi";
    } else if (password.length < 6) {
      newErrors.password = "Kata sandi minimal berisi 6 digit atau karakter";
    }
    if (!address.trim()) {
      newErrors.address = "Alamat pengantaran wajib diisi";
    }
    if (!termsAccepted) {
      newErrors.terms = "Anda harus menyetujui Ketentuan Layanan";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSuccess({
      fullName,
      username,
      phone,
      address,
      password,
    });
  };

  const handleFillDemo = () => {
    setFullName("Syafaat Afif");
    setUsername("syafaat31");
    setPhone("0832398329239");
    setPassword("123412");
    setAddress("Perumahan Indah Asri Blok C-12, Tarogong Kidul");
    setTermsAccepted(true);
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col pt-3 pb-4 bg-slate-50/50"
    >
      {/* 1. Header Bar */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-slate-100 bg-white sticky top-0 z-10 shadow-sm">
        <button
          onClick={onBack}
          className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          id="register-back-btn"
        >
          <ArrowLeft className="w-5 h-5 text-brand-blue stroke-[2.5]" />
        </button>
        <div className="flex-1 text-center pr-9">
          <span className="text-[17px] font-bold text-brand-blue">
            Rayya Water
          </span>
        </div>
      </div>

      <div className="flex-1 px-5 pt-6 pb-4 overflow-y-auto">
        {/* 2. Titles */}
        <div className="text-center mb-6">
          <h2 className="text-[28px] font-extrabold text-[#111111] leading-tight tracking-tight">
            Buat Akun
          </h2>
          <p className="text-[13px] text-slate-500 font-medium mt-1">
            Air Galon Anda Siap Diantar...
          </p>
        </div>

        {/* 3. Outer Card Box */}
        <div className="bg-white rounded-[20px] border border-slate-200/80 p-5 shadow-lg shadow-slate-100 mb-4">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1 font-sans">
                Nama Lengkap
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-[18px] h-[18px]" />
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  placeholder="Masukan Nama"
                  className={`w-full h-11 pl-10 pr-4 rounded-xl text-[13px] bg-[#f8fafd] text-slate-800 border ${
                    errors.fullName ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-blue-400"
                  } outline-none transition-all placeholder:text-slate-400 font-medium`}
                  id="reg-fullname-input"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.fullName}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1 font-sans">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-[18px] h-[18px]" />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors({ ...errors, username: undefined });
                  }}
                  placeholder="Username"
                  className={`w-full h-11 pl-10 pr-4 rounded-xl text-[13px] bg-[#f8fafd] text-slate-800 border ${
                    errors.username ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-blue-400"
                  } outline-none transition-all placeholder:text-slate-400 font-medium`}
                  id="reg-username-input"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.username}</p>
              )}
            </div>

            {/* Number Telepon */}
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1 font-sans">
                Number Telepon
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Phone className="w-[17px] h-[17px]" />
                </span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  placeholder="0832398329239"
                  className={`w-full h-11 pl-10 pr-4 rounded-xl text-[13px] bg-[#f8fafd] text-slate-800 border ${
                    errors.phone ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-blue-400"
                  } outline-none transition-all placeholder:text-slate-400 font-medium`}
                  id="reg-phone-input"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.phone}</p>
              )}
            </div>

            {/* Kata Sandi Pelanggan */}
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1 font-sans">
                Kata Sandi / PIN Pelanggan
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-[18px] h-[18px]" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  placeholder="Masukkan minimal 6 karakter"
                  className={`w-full h-11 pl-10 pr-11 rounded-xl text-[13px] bg-[#f8fafd] text-slate-800 border ${
                    errors.password ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-blue-400"
                  } outline-none transition-all placeholder:text-slate-400 font-medium`}
                  id="reg-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            {/* Alamat Anda */}
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1 font-sans">
                Alamat Anda
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400">
                  <MapPin className="w-[18px] h-[18px]" />
                </span>
                <textarea
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors({ ...errors, address: undefined });
                  }}
                  rows={2}
                  placeholder="Masukan Alamat Jalan, Kecamatan"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] bg-[#f8fafd] text-slate-800 border ${
                    errors.address ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-blue-400"
                  } outline-none transition-all placeholder:text-slate-400 font-medium resize-none leading-relaxed`}
                  id="reg-address-input"
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.address}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (errors.terms) setErrors({ ...errors, terms: undefined });
                  }}
                  className="w-4 h-4 mt-0.5 rounded accent-brand-blue border-slate-300 focus:ring-0 text-brand-blue cursor-pointer"
                  id="terms-checkbox"
                />
                <span className="text-[11px] leading-[1.4] select-none text-slate-600 font-medium">
                  I agree to the{" "}
                  <span className="text-brand-blue font-bold hover:underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-brand-blue font-bold hover:underline">
                    Privacy Policy
                  </span>{" "}
                  of AquaFlow.
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-[10px] mt-1 ml-6">{errors.terms}</p>
              )}
            </div>

            {/* Action Button: Daftar */}
            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#0060ff] hover:bg-blue-700 text-white font-bold text-[14px] flex items-center justify-center transition-all active:scale-[0.98] shadow-md shadow-blue-500/10"
              id="register-submit-btn"
            >
              Daftar
            </button>
          </form>

          {/* Separator Line */}
          <div className="my-4 border-b border-slate-200"></div>

          {/* Bottom Card Footer */}
          <div className="text-center pb-1">
            <p className="text-[13px] font-medium text-slate-500">
              Sudah Punya Akun?{" "}
              <button
                onClick={onLoginClick}
                className="font-bold text-brand-blue hover:underline cursor-pointer"
              >
                Masuk
              </button>
            </p>
          </div>
        </div>

        {/* Demo trigger helper */}
        <div className="flex justify-between items-center bg-blue-50/50 p-3 rounded-xl border border-blue-100">
          <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Malas mengetik isi data?
          </span>
          <button
            onClick={handleFillDemo}
            className="text-[11px] font-bold text-brand-blue hover:bg-blue-100 bg-white px-2.5 py-1 rounded-md border border-blue-200 transition-colors"
          >
            Isi Otomatis
          </button>
        </div>
      </div>
    </motion.div>
  );
};
