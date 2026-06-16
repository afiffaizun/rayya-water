/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  ArrowLeft,
  Truck,
  Trash2,
  Minus,
  Plus,
  RefreshCw,
  PlusSquare,
  ChevronDown,
  Home,
  Clock,
  User,
  Coffee,
  CheckCircle,
  TrendingUp,
  Tag,
  AlertCircle,
  MapPin,
  Menu,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  DashboardTab,
  WaterType,
  PaymentMethod,
  ActiveOrder,
  CustomerProfile
} from "../types";
import { OrderDetailModal } from "./OrderDetailModal";
import { PaymentScreen } from "./PaymentScreen";

interface DashboardScreenProps {
  profile: CustomerProfile;
  activeOrders: ActiveOrder[];
  onPlaceOrder: (order: {
    qty: number;
    waterType: WaterType;
    paymentMethod: PaymentMethod;
    price: number;
  }) => void;
  onModifyStock: (units: number) => void;
  stockUnits: number;
  onBackToWelcome: () => void;
  onLogOut: () => void;
  currentTab: DashboardTab;
  setCurrentTab: (tab: DashboardTab) => void;
  renderExtraTabsContent: () => React.ReactNode;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  profile,
  activeOrders,
  onPlaceOrder,
  onModifyStock,
  stockUnits,
  onBackToWelcome,
  onLogOut,
  currentTab,
  setCurrentTab,
  renderExtraTabsContent,
}) => {
  // Order States
  const [qty, setQty] = useState(1);
  const [waterType, setWaterType] = useState<WaterType>(WaterType.REFILL);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash on Delivery");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<ActiveOrder | null>(null);
  const [pendingPaymentOrder, setPendingPaymentOrder] = useState<ActiveOrder | null>(null);

  const itemPrice = waterType === WaterType.REFILL ? 6000 : 18000;
  const totalPrice = qty * itemPrice;

  const handleIncrement = () => {
    setQty((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const notify = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const onSubmitOrder = () => {
    if (qty > stockUnits) {
      notify(`⚠️ Stok tidak mencukupi! Hanya tersisa ${stockUnits} unit.`);
      return;
    }

    onPlaceOrder({
      qty,
      waterType,
      paymentMethod,
      price: totalPrice,
    });

    const now = new Date();
    const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const orderId = `ORD${String(activeOrders.length + 1).padStart(3, "0")}`;

    const newOrder: ActiveOrder = {
      id: orderId,
      qty,
      waterType,
      paymentMethod,
      status: "Processing",
      date: dateStr,
      price: totalPrice,
    };

    if (paymentMethod === "Cash on Delivery") {
      setSelectedOrder(newOrder);
    } else {
      setPendingPaymentOrder(newOrder);
    }
    setQty(1);
  };

  // Determine latest order status
  const latestOrder = activeOrders[0];

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50/50 absolute inset-0 z-10">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-white sticky top-0 z-30 shadow-sm shrink-0">
        <button
          onClick={onBackToWelcome}
          className="p-1.5 rounded-full text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          id="dashboard-back-btn"
        >
          <ArrowLeft className="w-5 h-5 text-[#0b5ce5] stroke-[2.5]" />
        </button>
        <span className="text-[17px] font-bold text-[#0c59e4] tracking-tight">
          Rayya Water
        </span>
        <button
          onClick={onLogOut}
          className="text-[11px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded hover:bg-red-100 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Main Scrollable Dashboard Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          {currentTab === DashboardTab.ORDER ? (
            <motion.div
              key="order-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="px-5 pt-4 space-y-4"
            >
              {/* 2. Top Banner Status Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Blue Card: Delivery Status */}
                <div className="bg-[#005eff] rounded-2xl p-4 text-white shadow-md shadow-blue-500/15 flex flex-col justify-between h-[124px] relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div className="bg-white/20 p-1.5 rounded-lg">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    {/* Badge "Coming yourway" */}
                    <span className="bg-white/25 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full tracking-wide">
                      Coming yourway
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-blue-100/80 font-medium block leading-none mb-1">
                      Last Order
                    </span>
                    <span className="text-[20px] font-extrabold tracking-tight block leading-tight">
                      {latestOrder ? latestOrder.status : "In Transit"}
                    </span>
                  </div>
                  {/* Subtle water wave overlay */}
                  <div className="absolute -bottom-2 -right-4 w-16 h-16 bg-white/5 rounded-full pointer-events-none"></div>
                </div>

                {/* White Card: Stock Level */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 flex flex-col justify-between h-[124px] shadow-sm">
                  <div className="flex items-start justify-between">
                    {/* Visual Gallon-like design */}
                    <div className="bg-rose-50 text-rose-500 p-2 rounded-lg border border-rose-100">
                      <Trash2 className="w-5 h-5" />
                    </div>
                    <button
                      onClick={() => onModifyStock(5)}
                      className="text-[10px] font-bold text-[#0b5ce5] bg-blue-50 px-1.5 py-0.5 rounded hover:bg-blue-100 transition-colors"
                    >
                      + Isi
                    </button>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block leading-none mb-1">
                      Stok Air Galon
                    </span>
                    <span className="text-[20px] font-extrabold text-slate-800 block leading-tight">
                      {stockUnits} <span className="text-[12px] font-normal text-slate-500">Units</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Main Order Setup Container ("Pesan") */}
              <div className="bg-white rounded-[24px] border border-slate-200/80 p-5 shadow-sm">
                <h4 className="text-[20px] font-extrabold text-slate-800 mb-4 font-sans tracking-tight">
                  Pesan
                </h4>

                {/* Counter Quantity */}
                <div className="space-y-2 mb-4">
                  <span className="text-[12px] font-extrabold text-[#475569]">
                    Jumlah Galon
                  </span>
                  <div className="bg-[#f0f4f9] rounded-2xl h-[56px] flex items-center justify-between px-3">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={qty <= 1}
                      className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-800 font-extrabold hover:bg-slate-50 transition-colors border border-slate-100 shadow-sm disabled:opacity-50"
                      id="order-qty-minus"
                    >
                      <Minus className="w-4 h-4 text-[#0060ff] stroke-[3]" />
                    </button>
                    <span className="text-[20px] font-extrabold text-slate-800" id="order-qty-value">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-800 font-extrabold hover:bg-slate-50 transition-colors border border-slate-100 shadow-sm"
                      id="order-qty-plus"
                    >
                      <Plus className="w-4 h-4 text-[#0060ff] stroke-[3]" />
                    </button>
                  </div>
                </div>

                {/* Choice of Water-Type Grid */}
                <div className="space-y-2 mb-4">
                  <span className="text-[12px] font-extrabold text-[#475569]">
                    Water Type
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Option: Refill */}
                    <button
                      type="button"
                      onClick={() => setWaterType(WaterType.REFILL)}
                      className={`h-[94px] rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all outline-none border cursor-pointer ${
                        waterType === WaterType.REFILL
                          ? "bg-brand-cyan border-transparent text-white shadow-md shadow-cyan-400/25"
                          : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50/50"
                      }`}
                      id="order-type-refill"
                    >
                      <RefreshCw className={`w-6 h-6 stroke-[2.5] ${waterType === WaterType.REFILL ? "text-white animate-spin-slow" : "text-slate-600"}`} />
                      <span className="text-[13px] font-bold">Refill</span>
                    </button>

                    {/* Option: Galon Baru */}
                    <button
                      type="button"
                      onClick={() => setWaterType(WaterType.NEW_GALLON)}
                      className={`h-[94px] rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all outline-none border cursor-pointer ${
                        waterType === WaterType.NEW_GALLON
                          ? "bg-[#0b5ce5] border-transparent text-white shadow-md shadow-blue-500/25"
                          : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50/50"
                      }`}
                      id="order-type-new"
                    >
                      <PlusSquare className={`w-6 h-6 stroke-[2.5] ${waterType === WaterType.NEW_GALLON ? "text-white" : "text-slate-600"}`} />
                      <span className="text-[13px] font-bold">Galon Baru</span>
                    </button>
                  </div>
                </div>

                {/* Dropdown Options: Payment Method */}
                <div className="space-y-2 mb-5">
                  <span className="text-[12px] font-extrabold text-[#475569]">
                    Payment Method
                  </span>
                  <div className="relative">
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="w-full h-12 pl-4 pr-10 rounded-xl bg-slate-50 text-[13px] font-semibold text-slate-700 border border-slate-200 outline-none appearance-none transition-colors focus:border-brand-blue"
                      id="order-payment-select"
                    >
                      <option value="Cash on Delivery">Cash on Delivery</option>
                      <option value="E-Wallet (OVO/Gopay)">E-Wallet (OVO/Gopay)</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    </span>
                  </div>
                </div>

                {/* Live Checkout Summary */}
                <div className="bg-slate-50 rounded-xl p-3 mb-5 border border-slate-100 flex justify-between items-center text-[12px]">
                  <div>
                    <span className="text-slate-400 block font-medium">Subtotal</span>
                    <span className="font-bold text-slate-800 text-[14px]">
                      Rp {totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <span className="bg-blue-50 text-[#0b5ce5] text-[10px] font-bold px-2 py-1 rounded">
                    {waterType === WaterType.REFILL ? "Rp 6K / unit" : "Rp 18K / unit"}
                  </span>
                </div>

                {/* Blue Main Button: Pesan Sekarang */}
                <button
                  type="button"
                  onClick={onSubmitOrder}
                  className="w-full h-12 rounded-xl bg-[#0b5ce5] hover:bg-blue-700 text-white font-bold text-[14px] flex items-center justify-center transition-all active:scale-[0.98] shadow-md shadow-blue-500/10"
                  id="order-submit-btn"
                >
                  Pesan Sekarang
                </button>
              </div>

              {/* Delivery Address Reminder Box */}
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 flex gap-3 text-slate-700">
                <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <span className="text-[12px] font-extrabold text-slate-700 block mb-0.5">
                    Alamat Pengantaran Aktif
                  </span>
                  <span className="text-[11.5px] leading-relaxed text-slate-500 block">
                    {profile.address || "Belum ada alamat, silakan isi di profil."}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            renderExtraTabsContent()
          )}
        </AnimatePresence>
      </div>

      {/* Floating toast notification inside the frame */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-20 left-4 right-4 bg-slate-900/95 backdrop-blur-md text-white text-[12px] py-3 px-4 rounded-xl shadow-xl z-50 flex items-center gap-2 border border-slate-700"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
            <span className="font-medium flex-1">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            address={profile.address}
            onClose={() => setSelectedOrder(null)}
            onViewHistory={() => {
              setSelectedOrder(null);
              setCurrentTab(DashboardTab.HISTORY);
            }}
          />
        )}
      </AnimatePresence>

      {/* Payment Screen */}
      <AnimatePresence>
        {pendingPaymentOrder && (
          <PaymentScreen
            order={pendingPaymentOrder}
            onPaymentConfirmed={() => {
              setSelectedOrder(pendingPaymentOrder);
              setPendingPaymentOrder(null);
            }}
            onCancel={() => setPendingPaymentOrder(null)}
          />
        )}
      </AnimatePresence>

      {/* 4. Bottom Menu Navigation Rail exactly matching layouts */}
      <div className="absolute bottom-0 left-0 right-0 h-[68px] border-t border-slate-100 bg-white/95 backdrop-blur-md flex items-center justify-around px-2 z-40 shrink-0">
        {/* Tab 1: Home */}
        <button
          onClick={() => setCurrentTab(DashboardTab.HOME)}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-lg transition-colors cursor-pointer ${
            currentTab === DashboardTab.HOME ? "text-brand-blue font-bold" : "text-slate-400 hover:text-slate-600"
          }`}
          id="nav-tab-home"
        >
          <Home className="w-[19px] h-[19px]" />
          <span className="text-[10px] mt-1 font-semibold">Home</span>
        </button>

        {/* Tab 2: Order (Cyan Highlight Active Icon) */}
        <button
          onClick={() => setCurrentTab(DashboardTab.ORDER)}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
            currentTab === DashboardTab.ORDER
              ? "bg-[#00cbff] text-white w-[64px] h-[48px] rounded-2xl shadow-md shadow-cyan-400/20"
              : "text-slate-400 hover:text-slate-600 w-14 h-12"
          }`}
          id="nav-tab-order"
        >
          {/* A water glass cup / cylinder container */}
          <div className="relative">
            <svg
              className="w-[19px] h-[19px] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M4 2h16l-2 20H6L4 2zm2.2 2l1.6 16h8.4l1.6-16H6.2z" />
            </svg>
            {/* Tiny droplet indicator on active */}
            {currentTab === DashboardTab.ORDER && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse"></span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-bold">Order</span>
        </button>

        {/* Tab 3: History */}
        <button
          onClick={() => setCurrentTab(DashboardTab.HISTORY)}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-lg transition-colors cursor-pointer ${
            currentTab === DashboardTab.HISTORY ? "text-brand-blue font-bold" : "text-slate-400 hover:text-slate-600"
          }`}
          id="nav-tab-history"
        >
          <Clock className="w-[19px] h-[19px]" />
          <span className="text-[10px] mt-1 font-semibold">History</span>
        </button>

        {/* Tab 4: Profile */}
        <button
          onClick={() => setCurrentTab(DashboardTab.PROFILE)}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-lg transition-colors cursor-pointer ${
            currentTab === DashboardTab.PROFILE ? "text-brand-blue font-bold" : "text-slate-400 hover:text-slate-600"
          }`}
          id="nav-tab-profile"
        >
          <User className="w-[19px] h-[19px]" />
          <span className="text-[10px] mt-1 font-semibold">Profile</span>
        </button>
      </div>
    </div>
  );
};
