/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import {
  ScreenType,
  DashboardTab,
  WaterType,
  PaymentMethod,
  ActiveOrder,
  CustomerProfile
} from "./types";
import { MobileFrame } from "./components/MobileFrame";
import { KurirLoginScreen } from "./components/KurirLoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { SuccessScreen } from "./components/SuccessScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { CustomerHomeTab } from "./components/CustomerHomeTab";
import { OrderHistoryTab } from "./components/OrderHistoryTab";
import { CustomerProfileTab } from "./components/CustomerProfileTab";
import {
  Droplet,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // 1. Initial State Definitions
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(ScreenType.KURIR_LOGIN);
  const [currentTab, setCurrentTab] = useState<DashboardTab>(DashboardTab.ORDER);
  const [loggedAsKurirId, setLoggedAsKurirId] = useState<string | null>(null);

  // Default customer values matches Indonesian mockups
  const [profile, setProfile] = useState<CustomerProfile>({
    fullName: "Syafaat Afif",
    username: "syafaat31",
    phone: "0832398329239",
    address: "Perumahan Indah Asri Blok C-12, Tarogong Kidul",
    password: "",
  });

  // Stock starts with 10 units as shown in standard mockup Card 2
  const [stockUnits, setStockUnits] = useState<number>(10);

  // Prepopulate with a realistic active order matching Card 1 "In Transit"
  const [orders, setOrders] = useState<ActiveOrder[]>([
    {
      id: "ORD-94215",
      qty: 1,
      waterType: WaterType.REFILL,
      paymentMethod: "Cash on Delivery",
      status: "In Transit",
      date: "16 Juni 2026",
      price: 6000,
    },
    {
      id: "ORD-87123",
      qty: 2,
      waterType: WaterType.NEW_GALLON,
      paymentMethod: "Cash on Delivery",
      status: "Completed",
      date: "12 Juni 2026",
      price: 36000,
    },
  ]);

  // Notifications state
  const [appNotification, setAppNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setAppNotification(msg);
    setTimeout(() => {
      setAppNotification(null);
    }, 4000);
  };

  // 2. State & Event Actions
  const handleKurirLoginSuccess = (kurirId: string) => {
    setLoggedAsKurirId(kurirId);
    triggerNotification(`🔑 Login Sukses! ID Driver: ${kurirId}`);
    // Transition straight to the main panel dashboard, set to order view
    setCurrentScreen(ScreenType.DASHBOARD);
    setCurrentTab(DashboardTab.ORDER);
  };

  const handleRegisterSuccess = (newProfile: CustomerProfile) => {
    setProfile(newProfile);
    triggerNotification("👤 Pendaftaran berhasil diproses!");
    setCurrentScreen(ScreenType.SUCCESS);
  };

  const handlePlaceOrder = (newOrder: {
    qty: number;
    waterType: WaterType;
    paymentMethod: PaymentMethod;
    price: number;
  }) => {
    // Generate simple ID
    const randomId = "ORD-" + Math.floor(10000 + Math.random() * 90000);
    const newEntry: ActiveOrder = {
      id: randomId,
      qty: newOrder.qty,
      waterType: newOrder.waterType,
      paymentMethod: newOrder.paymentMethod,
      status: "Processing",
      date: "Hari Ini",
      price: newOrder.price,
    };

    // Prepend order
    setOrders([newEntry, ...orders]);
    // Deduct stock
    setStockUnits((prev) => Math.max(0, prev - newOrder.qty));
    triggerNotification(`💧 Pesanan ${randomId} terbuat!`);
  };

  const handleModifyStock = (amount: number) => {
    setStockUnits((prev) => Math.max(0, prev + amount));
  };

  const handleContactCS = () => {
    alert("Hubungi Customer Service: +62 832-3983-29239 (Garut Rayya Water Support)");
  };

  // Render content of optional helper tabs inside bottom navbar
  const renderExtraTabsContent = () => {
    switch (currentTab) {
      case DashboardTab.HOME:
        return (
          <CustomerHomeTab
            profile={profile}
            onSetTab={(tab) => setCurrentTab(tab)}
          />
        );
      case DashboardTab.HISTORY:
        return <OrderHistoryTab orders={orders} />;
      case DashboardTab.PROFILE:
        return (
          <CustomerProfileTab
            profile={profile}
            onUpdateProfile={(prof) => {
              setProfile(prof);
              triggerNotification("📝 Profil Anda diperbarui!");
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(11,92,229,0.18),rgba(255,255,255,0))] flex flex-col items-center justify-between py-6 px-4 selection:bg-brand-blue/30 overflow-hidden">
      
      {/* Top Title Banner */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brand-blue rounded-xl flex items-center justify-center text-white">
            <Droplet className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h1 className="text-white font-extrabold text-[15px] leading-tight">Rayya Water</h1>
            <p className="text-slate-400 text-[11px] font-semibold">Sistem Pengantaran Galon Indonesia</p>
          </div>
        </div>
        
        {/* Help Tip */}
        <div className="hidden md:flex items-center gap-2 bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-700/50">
          <Info className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-300 text-[11px] font-semibold">Aplikasi Rayya Water</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl flex-1 flex items-center justify-center my-auto pt-2">
        
        {/* Phone Mockup */}
        <div className="flex items-center justify-center w-full">
          <MobileFrame>
            <AnimatePresence mode="wait">
              {currentScreen === ScreenType.KURIR_LOGIN && (
                <KurirLoginScreen
                  key="kurir-login"
                  onBack={() => setCurrentScreen(ScreenType.REGISTER)}
                  onRegisterClick={() => setCurrentScreen(ScreenType.REGISTER)}
                  onLoginSuccess={handleKurirLoginSuccess}
                  registeredProfile={profile}
                />
              )}

              {currentScreen === ScreenType.REGISTER && (
                <RegisterScreen
                  key="register"
                  onBack={() => setCurrentScreen(ScreenType.KURIR_LOGIN)}
                  onSuccess={handleRegisterSuccess}
                  onLoginClick={() => setCurrentScreen(ScreenType.KURIR_LOGIN)}
                />
              )}

              {currentScreen === ScreenType.SUCCESS && (
                <SuccessScreen
                  key="success"
                  onProceed={() => {
                    setCurrentScreen(ScreenType.KURIR_LOGIN);
                    triggerNotification("🔑 Silakan login dengan akun yang baru dibuat.");
                  }}
                  onLetssGo={() => {
                    setCurrentScreen(ScreenType.KURIR_LOGIN);
                    triggerNotification("🔑 Silakan login dengan akun yang baru dibuat.");
                  }}
                  onContactCS={handleContactCS}
                />
              )}

              {currentScreen === ScreenType.DASHBOARD && (
                <DashboardScreen
                  key="dashboard"
                  profile={profile}
                  activeOrders={orders}
                  onPlaceOrder={handlePlaceOrder}
                  onModifyStock={handleModifyStock}
                  stockUnits={stockUnits}
                  onBackToWelcome={() => setCurrentScreen(ScreenType.SUCCESS)}
                  onLogOut={() => {
                    setLoggedAsKurirId(null);
                    setCurrentScreen(ScreenType.KURIR_LOGIN);
                    triggerNotification("🚪 Berhasil Logout.");
                  }}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                  renderExtraTabsContent={renderExtraTabsContent}
                />
              )}
            </AnimatePresence>
          </MobileFrame>
        </div>

      </div>

      {/* Floating System-Wide Push Notification Bubble */}
      <AnimatePresence>
        {appNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-slate-850/95 backdrop-blur-md px-6 py-3.5 rounded-full shadow-2xl border border-slate-700/80 text-white flex items-center gap-2.5 z-50 text-[12.5px] font-bold"
          >
            <span className="w-2.5 h-2.5 bg-brand-cyan rounded-full animate-pulse shrink-0"></span>
            <span>{appNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Humble Footer Branding Row */}
      <div className="w-full text-center mt-3 flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-4 text-slate-500 text-[11px] font-semibold">
        <span>© 2026 Rayya Water Delivery. All rights reserved.</span>
        <span className="hidden md:inline text-slate-700">•</span>
        <span>Aplikasi Mitra Kurir & Pemesanan Mandiri</span>
        <span className="hidden md:inline text-slate-700">•</span>
        <button
          onClick={() => alert("Rayya Water App v1.3.2. Menyediakan layanan air mineral segar pegunungan super higienis langsung ke pintu rumah Anda di Garut.")}
          className="hover:text-slate-400 underline cursor-pointer"
        >
          Tentang Layanan
        </button>
      </div>

    </div>
  );
}
