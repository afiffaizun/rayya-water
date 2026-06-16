/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User, Phone, MapPin, Save, Edit3, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { CustomerProfile } from "../types";

interface CustomerProfileTabProps {
  profile: CustomerProfile;
  onUpdateProfile: (newProfile: CustomerProfile) => void;
}

export const CustomerProfileTab: React.FC<CustomerProfileTabProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile.fullName);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);

  const handleSave = () => {
    onUpdateProfile({
      fullName,
      username: profile.username,
      phone,
      address,
    });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="px-5 pt-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[18px] font-extrabold text-slate-800 tracking-tight">Akun Saya</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Edit biodata atau masuki moda pengantaran</p>
        </div>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`text-[11px] font-extrabold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer ${
            isEditing
              ? "bg-[#0b5ce5] text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
          }`}
        >
          {isEditing ? (
            <>
              <Save className="w-3.5 h-3.5" /> Simpan
            </>
          ) : (
            <>
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </>
          )}
        </button>
      </div>

      {/* Profile Avatar Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-[20px] shadow-md">
          {profile.fullName ? profile.fullName[0].toUpperCase() : "U"}
        </div>
        <div>
          <span className="text-[16px] font-extrabold text-slate-800 block">
            {profile.fullName || "User Pelanggan"}
          </span>
          <span className="text-[11px] text-slate-400 font-semibold block mt-0.5 uppercase">
            @{profile.username || "username"}
          </span>
        </div>
      </div>

      {/* Profile Information details */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        {/* Fullname */}
        <div className="space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Nama Lengkap</span>
          {isEditing ? (
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full text-[13px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 h-10 outline-none focus:border-brand-blue"
            />
          ) : (
            <span className="text-[13.5px] font-extrabold text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400 shrink-0" /> {profile.fullName || "Unset"}
            </span>
          )}
        </div>

        {/* Phone number */}
        <div className="space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Nomor Telepon</span>
          {isEditing ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-[13px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 h-10 outline-none focus:border-brand-blue"
            />
          ) : (
            <span className="text-[13.5px] font-extrabold text-slate-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" /> {profile.phone || "Unset"}
            </span>
          )}
        </div>

        {/* Address text */}
        <div className="space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Alamat Delivery Aktif</span>
          {isEditing ? (
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="w-full text-[13px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-brand-blue resize-none"
            />
          ) : (
            <span className="text-[13px] font-semibold text-slate-600 flex items-start gap-2 leading-relaxed">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> {profile.address || "Belum diset"}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
