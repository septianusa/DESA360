import type { LucideIcon } from "lucide-react";

export type RoleId =
  | "farmer"
  | "manager"
  | "buyer"
  | "member"
  | "regional"
  | "government";

export type AppView =
  | "landing"
  | "dashboard"
  | "marketplace"
  | "independence"
  | "village"
  | "academy"
  | "demo";

export type StatusTone =
  | "green"
  | "yellow"
  | "red"
  | "gray"
  | "blue"
  | "emerald"
  | "orange";

export type RoleOption = {
  id: RoleId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  defaultView: AppView;
  nav: AppView[];
};

export type Metric = {
  label: string;
  value: string;
  helper?: string;
  trend?: string;
  tone?: StatusTone;
};

export type ProductCategory =
  | "Sayur"
  | "Buah"
  | "Beras"
  | "Ikan"
  | "Produk Olahan"
  | "UMKM"
  | "Sembako"
  | "Sarana Produksi";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  originVillage: string;
  cooperative: string;
  grade: "A" | "B" | "C";
  price: number;
  stock: number;
  unit: string;
  harvestDate: string;
  freshness: string;
  supplierId: string;
  supplierName: string;
  memberProduct: boolean;
  image: string;
  storage: "Rak gerai" | "Gudang" | "Cold storage";
  trace: {
    farmer: string;
    harvest: string;
    grading: string;
    warehouse: string;
    delivery: string;
    consumer: string;
  };
};

export type Supplier = {
  id: string;
  name: string;
  type: "Petani" | "Nelayan" | "UMKM" | "Kelompok Tani";
  commodity: string;
  village: string;
  activeSince: string;
  monthlyVolume: string;
  verificationStatus: "Terverifikasi" | "Menunggu" | "Perbaikan Kemasan";
  phone: string;
};

export type IntakeItem = {
  id: string;
  supplier: string;
  product: string;
  quantity: string;
  requestedPrice: number;
  location: string;
  harvestDate: string;
  coldStorage: boolean;
  status: "Menunggu" | "Perlu Dicek" | "Dijadwalkan";
};

export type InventoryItem = {
  id: string;
  product: string;
  supplier: string;
  batch: string;
  grade: "A" | "B" | "C";
  incoming: number;
  remaining: number;
  unit: string;
  receivedDate: string;
  expiryDate: string;
  location: string;
  buyPrice: number;
  sellPrice: number;
  risk: "Aman" | "Perlu Dijual Cepat" | "Hampir Kedaluwarsa" | "Rusak";
};

export type Transaction = {
  id: string;
  date: string;
  buyer: string;
  product: string;
  volume: string;
  grossValue: number;
  supplierPaid: number;
  margin: number;
  status: "Selesai" | "Diproses" | "Menunggu Pembayaran";
  channel: "Gerai" | "Marketplace" | "Grosir";
};

export type LogisticsSchedule = {
  id: string;
  type: "Penjemputan" | "Pengiriman";
  date: string;
  route: string;
  vehicle: string;
  capacity: string;
  driver: string;
  status: "Terjadwal" | "Berjalan" | "Selesai";
};

export type Proposal = {
  id: string;
  title: string;
  proposer: string;
  support: number;
  comments: number;
  status: "Baru" | "Dikaji" | "Disetujui" | "Ditindaklanjuti";
};

export type VotingAgenda = {
  id: string;
  title: string;
  dueDate: string;
  yes: number;
  no: number;
  abstain: number;
  status: "Berlangsung" | "Selesai";
};

export type CooperativeComparison = {
  id: string;
  name: string;
  district: string;
  status: "Sehat" | "Perlu Pendampingan" | "Berisiko" | "Belum Aktif";
  revenue: number;
  margin: number;
  localShare: number;
  turnover: number;
  shrinkage: number;
  activeMembers: number;
  cashRunway: number;
  dscr: number;
  readiness: number;
};

export type IndependenceComponent = {
  label: string;
  score: number;
  recommendation: string;
};

export type AcademyMission = {
  id: string;
  title: string;
  points: number;
  badge: string;
  status: "Selesai" | "Aktif" | "Terkunci";
};
