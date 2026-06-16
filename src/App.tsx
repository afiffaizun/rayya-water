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
import { KurirLoginScreen } from "./components/KurirLoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { SuccessScreen } from "./components/SuccessScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { CustomerHomeTab } from "./components/CustomerHomeTab";
import { OrderHistoryTab } from "./components/OrderHistoryTab";
import { CustomerProfileTab } from "./components/CustomerProfileTab";
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
    <div className="h-screen w-full bg-slate-50 flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === ScreenType.KURIR_LOGIN && (
          <KurirLoginScreen
            key="kurir-login"
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
    </div>
  );
}
