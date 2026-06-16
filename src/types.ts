/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ScreenType {
  KURIR_LOGIN = "KURIR_LOGIN",
  REGISTER = "REGISTER",
  SUCCESS = "SUCCESS",
  DASHBOARD = "DASHBOARD"
}

export enum DashboardTab {
  HOME = "HOME",
  ORDER = "ORDER",
  HISTORY = "HISTORY",
  PROFILE = "PROFILE"
}

export enum WaterType {
  REFILL = "REFILL",
  NEW_GALLON = "NEW_GALLON"
}

export type PaymentMethod = "Cash on Delivery" | "E-Wallet (OVO/Gopay)" | "Bank Transfer";

export interface ActiveOrder {
  id: string;
  qty: number;
  waterType: WaterType;
  paymentMethod: PaymentMethod;
  status: "In Transit" | "Processing" | "Completed" | "Pending";
  date: string;
  price: number;
}

export interface CustomerProfile {
  fullName: string;
  username: string;
  phone: string;
  address: string;
  password: string;
}

export interface KurirProfile {
  kurirId: string;
  pin: string;
}
