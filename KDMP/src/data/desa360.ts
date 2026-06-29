import {
  Banknote,
  Boxes,
  Building2,
  ChartNoAxesCombined,
  CircleGauge,
  GraduationCap,
  HandCoins,
  Landmark,
  LayoutDashboard,
  MapPinned,
  PackageSearch,
  ShoppingBasket,
  Sprout,
  Store,
  Truck,
  UsersRound,
  Vote
} from "lucide-react";
import type {
  AcademyMission,
  AppView,
  CooperativeComparison,
  IndependenceComponent,
  IntakeItem,
  InventoryItem,
  LogisticsSchedule,
  Metric,
  Product,
  Proposal,
  RoleOption,
  Supplier,
  Transaction,
  VotingAgenda
} from "../types/desa360";

export const heroImage = "/assets/desa360-hero.png";

export const viewLabels: Record<AppView, string> = {
  landing: "Ringkasan",
  dashboard: "Dashboard",
  marketplace: "Marketplace",
  independence: "Kemandirian",
  village: "Potensi Desa",
  academy: "Akademi",
  demo: "Alur Demo"
};

export const viewIcons: Record<AppView, typeof LayoutDashboard> = {
  landing: Building2,
  dashboard: LayoutDashboard,
  marketplace: Store,
  independence: CircleGauge,
  village: MapPinned,
  academy: GraduationCap,
  demo: Truck
};

export const roleOptions: RoleOption[] = [
  {
    id: "farmer",
    label: "Petani / Nelayan / UMKM",
    shortLabel: "Pemasok",
    description: "Daftar produksi, cek harga, status produk, dan pembayaran.",
    icon: Sprout,
    defaultView: "dashboard",
    nav: ["dashboard", "demo", "marketplace", "village", "academy"]
  },
  {
    id: "manager",
    label: "Pengelola Koperasi",
    shortLabel: "Pengelola",
    description: "Kelola intake, grading, stok, logistik, retail, dan pembukuan.",
    icon: Boxes,
    defaultView: "dashboard",
    nav: ["dashboard", "demo", "marketplace", "independence", "village"]
  },
  {
    id: "buyer",
    label: "Konsumen / Pembeli",
    shortLabel: "Pembeli",
    description: "Belanja produk lokal, lihat asal produk, dan checkout.",
    icon: ShoppingBasket,
    defaultView: "marketplace",
    nav: ["marketplace", "demo", "village", "academy"]
  },
  {
    id: "member",
    label: "Anggota Koperasi",
    shortLabel: "Anggota",
    description: "Pantau laporan, ikut voting, dan ajukan usulan.",
    icon: UsersRound,
    defaultView: "dashboard",
    nav: ["dashboard", "demo", "independence", "academy"]
  },
  {
    id: "regional",
    label: "Manajer Wilayah / Agrinas",
    shortLabel: "Wilayah",
    description: "Bandingkan koperasi, pantau risiko, dan rekomendasikan intervensi.",
    icon: ChartNoAxesCombined,
    defaultView: "dashboard",
    nav: ["dashboard", "independence", "village", "demo"]
  },
  {
    id: "government",
    label: "Pemerintah / High-Level Management",
    shortLabel: "Pemerintah",
    description: "Pantau dampak nasional, risiko program, dan keberlanjutan.",
    icon: Landmark,
    defaultView: "dashboard",
    nav: ["dashboard", "independence", "demo", "academy"]
  }
];

export const cooperativeProfile = {
  name: "Koperasi Desa Merah Putih Sukamaju",
  village: "Desa Sukamaju",
  location: "Kabupaten Bandung",
  characteristics: "Desa berbasis pertanian dan UMKM pangan.",
  members: 1248,
  activeSuppliers: 186,
  monthlyRevenue: 486000000,
  localProductShare: 42,
  grossMargin: 14.8,
  damagedStock: 3.2,
  cash: 315000000,
  monthlyInstallment: 25000000,
  payroll: 48000000,
  operatingSubsidy: 35000000,
  independenceScore: 67,
  status: "Menuju Mandiri"
};

export const platformPillars = [
  {
    title: "Peningkatan Volume Usaha Koperasi",
    text: "Koperasi menggabungkan retail, pembelian produk lokal, logistik, dan marketplace agar omzet tidak hanya bertumpu pada sembako."
  },
  {
    title: "Keterlibatan Masyarakat dalam Berkoperasi",
    text: "Anggota dapat memasok produk, membeli kebutuhan produksi, mengawasi laporan, ikut voting, dan menerima manfaat ekonomi."
  },
  {
    title: "Pemanfaatan Potensi Ekonomi Desa",
    text: "Setiap desa memiliki komoditas, jadwal panen, pemasok, dan model usaha lokal yang berbeda dalam standar nasional yang sama."
  },
  {
    title: "Literasi Gen-Z dan Gen-Alpha",
    text: "Akademi Koperasi mengubah koperasi dari konsep formal menjadi pengalaman belajar, simulasi, misi, dan relawan digital desa."
  }
];

export const businessFlow = [
  "Produksi Desa",
  "Aggregation Hub",
  "Quality Control",
  "Warehouse",
  "Retail dan Marketplace",
  "Konsumen",
  "Pendapatan ke Anggota"
];

export const demoSteps = [
  "Petani mendaftarkan 500 kg cabai.",
  "Pengelola memverifikasi produk.",
  "Produk mendapatkan Grade B.",
  "Pengelola menjadwalkan penjemputan.",
  "Kendaraan koperasi menjemput produk.",
  "Produk masuk ke cold storage.",
  "Stok marketplace bertambah.",
  "Restoran lokal memesan 100 kg.",
  "Pengiriman dijadwalkan.",
  "Transaksi selesai.",
  "Petani menerima pembayaran.",
  "Pembukuan koperasi diperbarui.",
  "Anggota melihat transaksi.",
  "Manajemen melihat dampak omzet, produk lokal, dan skor kemandirian."
];

export const farmerPipeline = [
  "Terdaftar",
  "Diverifikasi",
  "Dijadwalkan",
  "Dijemput",
  "Diterima",
  "Grading",
  "Tersimpan",
  "Terjual",
  "Dibayar"
];

export const priceTrend = [
  { day: "Sen", koperasi: 28000, pasar: 26000, tengkulak: 22500 },
  { day: "Sel", koperasi: 28500, pasar: 26400, tengkulak: 22800 },
  { day: "Rab", koperasi: 29200, pasar: 27000, tengkulak: 23100 },
  { day: "Kam", koperasi: 30000, pasar: 27600, tengkulak: 23600 },
  { day: "Jum", koperasi: 31000, pasar: 28400, tengkulak: 24000 },
  { day: "Sab", koperasi: 31800, pasar: 29100, tengkulak: 24600 },
  { day: "Min", koperasi: 32000, pasar: 29500, tengkulak: 24800 }
];

export const productionNeeds = [
  { name: "Pupuk organik granul", category: "Pupuk", price: 78000, stock: 120 },
  { name: "Bibit cabai tahan hujan", category: "Bibit", price: 42000, stock: 85 },
  { name: "Pakan ikan protein 30%", category: "Pakan", price: 365000, stock: 36 },
  { name: "Sprayer manual 16L", category: "Alat pertanian", price: 185000, stock: 18 },
  { name: "Jaring panen nila", category: "Alat perikanan", price: 145000, stock: 22 },
  { name: "Kemasan pouch UMKM", category: "Kemasan", price: 650, stock: 2400 }
];

export const suppliers: Supplier[] = [
  {
    id: "SUP-001",
    name: "Siti Nurhayati",
    type: "Petani",
    commodity: "Cabai merah, tomat",
    village: "Sukamaju",
    activeSince: "2024",
    monthlyVolume: "1,8 ton",
    verificationStatus: "Terverifikasi",
    phone: "0812-1180-4401"
  },
  {
    id: "SUP-002",
    name: "Kelompok Tani Cibodas",
    type: "Kelompok Tani",
    commodity: "Beras medium",
    village: "Cibodas",
    activeSince: "2023",
    monthlyVolume: "7 ton",
    verificationStatus: "Terverifikasi",
    phone: "0813-8821-7734"
  },
  {
    id: "SUP-003",
    name: "Rudi Hartono",
    type: "Petani",
    commodity: "Telur ayam",
    village: "Sukaresmi",
    activeSince: "2025",
    monthlyVolume: "4.200 butir",
    verificationStatus: "Menunggu",
    phone: "0821-3208-1120"
  },
  {
    id: "SUP-004",
    name: "Mina Lestari",
    type: "Nelayan",
    commodity: "Ikan nila, lele",
    village: "Cipaku",
    activeSince: "2024",
    monthlyVolume: "920 kg",
    verificationStatus: "Terverifikasi",
    phone: "0857-9031-1122"
  },
  {
    id: "SUP-005",
    name: "Dapur Singkong Rasa",
    type: "UMKM",
    commodity: "Keripik singkong",
    village: "Sukamaju",
    activeSince: "2024",
    monthlyVolume: "1.200 pak",
    verificationStatus: "Perbaikan Kemasan",
    phone: "0812-9983-2107"
  },
  {
    id: "SUP-006",
    name: "Kopi Bukit Rahayu",
    type: "UMKM",
    commodity: "Kopi lokal",
    village: "Rahayu",
    activeSince: "2022",
    monthlyVolume: "360 kg",
    verificationStatus: "Terverifikasi",
    phone: "0818-2019-1200"
  },
  {
    id: "SUP-007",
    name: "Ani Marliani",
    type: "Petani",
    commodity: "Pisang, pepaya",
    village: "Sukamaju",
    activeSince: "2025",
    monthlyVolume: "1,1 ton",
    verificationStatus: "Menunggu",
    phone: "0822-7720-8910"
  },
  {
    id: "SUP-008",
    name: "Berkah Tahu Tempe",
    type: "UMKM",
    commodity: "Tahu, tempe, olahan kedelai",
    village: "Cipacing",
    activeSince: "2023",
    monthlyVolume: "2.600 pak",
    verificationStatus: "Terverifikasi",
    phone: "0813-6244-0091"
  },
  {
    id: "SUP-009",
    name: "Pak Maman",
    type: "Petani",
    commodity: "Kangkung, bayam",
    village: "Bojong",
    activeSince: "2024",
    monthlyVolume: "760 kg",
    verificationStatus: "Terverifikasi",
    phone: "0858-6220-3312"
  },
  {
    id: "SUP-010",
    name: "UMKM Sambal Neng Diah",
    type: "UMKM",
    commodity: "Sambal botol",
    village: "Sukamaju",
    activeSince: "2025",
    monthlyVolume: "840 botol",
    verificationStatus: "Menunggu",
    phone: "0896-4472-1800"
  }
];

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

export const products: Product[] = [
  {
    id: "PRD-001",
    name: "Cabai Merah Sukamaju",
    category: "Sayur",
    originVillage: "Desa Sukamaju",
    cooperative: cooperativeProfile.name,
    grade: "B",
    price: 32000,
    stock: 640,
    unit: "kg",
    harvestDate: "2026-06-28",
    freshness: "5 hari",
    supplierId: "SUP-001",
    supplierName: "Siti Nurhayati",
    memberProduct: true,
    image: photo("photo-1583119022894-919a68a3d0e3"),
    storage: "Cold storage",
    trace: {
      farmer: "Siti Nurhayati",
      harvest: "28 Juni 2026",
      grading: "Grade B oleh QC KDMP",
      warehouse: "Cold Storage C1",
      delivery: "Armada Pickup 01",
      consumer: "Restoran Sambel Hejo"
    }
  },
  {
    id: "PRD-002",
    name: "Tomat Segar",
    category: "Sayur",
    originVillage: "Desa Sukamaju",
    cooperative: cooperativeProfile.name,
    grade: "A",
    price: 14000,
    stock: 380,
    unit: "kg",
    harvestDate: "2026-06-27",
    freshness: "4 hari",
    supplierId: "SUP-001",
    supplierName: "Siti Nurhayati",
    memberProduct: true,
    image: photo("photo-1592841200221-a6898f307baa"),
    storage: "Cold storage",
    trace: {
      farmer: "Siti Nurhayati",
      harvest: "27 Juni 2026",
      grading: "Grade A oleh QC KDMP",
      warehouse: "Cold Storage C2",
      delivery: "Kurir Koperasi",
      consumer: "Pembeli marketplace"
    }
  },
  {
    id: "PRD-003",
    name: "Beras Medium Cibodas",
    category: "Beras",
    originVillage: "Cibodas",
    cooperative: cooperativeProfile.name,
    grade: "A",
    price: 14200,
    stock: 2200,
    unit: "kg",
    harvestDate: "2026-06-18",
    freshness: "6 bulan",
    supplierId: "SUP-002",
    supplierName: "Kelompok Tani Cibodas",
    memberProduct: true,
    image: photo("photo-1536304993881-ff6e9eefa2a6"),
    storage: "Gudang",
    trace: {
      farmer: "Kelompok Tani Cibodas",
      harvest: "18 Juni 2026",
      grading: "Kadar air 13,8%",
      warehouse: "Gudang Kering A",
      delivery: "Gerai KDMP",
      consumer: "Anggota koperasi"
    }
  },
  {
    id: "PRD-004",
    name: "Telur Ayam Rakyat",
    category: "Sembako",
    originVillage: "Sukaresmi",
    cooperative: cooperativeProfile.name,
    grade: "A",
    price: 29500,
    stock: 410,
    unit: "kg",
    harvestDate: "2026-06-29",
    freshness: "12 hari",
    supplierId: "SUP-003",
    supplierName: "Rudi Hartono",
    memberProduct: true,
    image: photo("photo-1582722872445-44dc5f7e3c8f"),
    storage: "Rak gerai",
    trace: {
      farmer: "Rudi Hartono",
      harvest: "29 Juni 2026",
      grading: "Ukuran seragam",
      warehouse: "Rak Sembako 02",
      delivery: "Pengambilan di koperasi",
      consumer: "Rumah makan lokal"
    }
  },
  {
    id: "PRD-005",
    name: "Ikan Nila Segar",
    category: "Ikan",
    originVillage: "Cipaku",
    cooperative: cooperativeProfile.name,
    grade: "B",
    price: 36000,
    stock: 185,
    unit: "kg",
    harvestDate: "2026-06-29",
    freshness: "2 hari",
    supplierId: "SUP-004",
    supplierName: "Mina Lestari",
    memberProduct: true,
    image: photo("photo-1544943910-4c1dc44aab44"),
    storage: "Cold storage",
    trace: {
      farmer: "Mina Lestari",
      harvest: "29 Juni 2026",
      grading: "Insang cerah, suhu terkendali",
      warehouse: "Cold Storage F1",
      delivery: "Motor box pendingin",
      consumer: "Katering sekolah"
    }
  },
  {
    id: "PRD-006",
    name: "Keripik Singkong Pedas",
    category: "UMKM",
    originVillage: "Desa Sukamaju",
    cooperative: cooperativeProfile.name,
    grade: "B",
    price: 13500,
    stock: 780,
    unit: "pak",
    harvestDate: "2026-06-25",
    freshness: "4 bulan",
    supplierId: "SUP-005",
    supplierName: "Dapur Singkong Rasa",
    memberProduct: true,
    image: photo("photo-1601050690597-df0568f70950"),
    storage: "Gudang",
    trace: {
      farmer: "Dapur Singkong Rasa",
      harvest: "Batch produksi 25 Juni 2026",
      grading: "Kemasan perlu label gizi",
      warehouse: "Gudang UMKM B",
      delivery: "Gerai dan marketplace",
      consumer: "Pembeli retail"
    }
  },
  {
    id: "PRD-007",
    name: "Kopi Arabika Lokal",
    category: "Produk Olahan",
    originVillage: "Rahayu",
    cooperative: cooperativeProfile.name,
    grade: "A",
    price: 68000,
    stock: 95,
    unit: "250 g",
    harvestDate: "2026-05-30",
    freshness: "8 bulan",
    supplierId: "SUP-006",
    supplierName: "Kopi Bukit Rahayu",
    memberProduct: true,
    image: photo("photo-1447933601403-0c6688de566e"),
    storage: "Rak gerai",
    trace: {
      farmer: "Kopi Bukit Rahayu",
      harvest: "30 Mei 2026",
      grading: "Roast medium",
      warehouse: "Rak Produk Lokal 03",
      delivery: "Marketplace",
      consumer: "Komunitas kopi Bandung"
    }
  },
  {
    id: "PRD-008",
    name: "Pisang Raja",
    category: "Buah",
    originVillage: "Desa Sukamaju",
    cooperative: cooperativeProfile.name,
    grade: "B",
    price: 18500,
    stock: 260,
    unit: "kg",
    harvestDate: "2026-06-26",
    freshness: "4 hari",
    supplierId: "SUP-007",
    supplierName: "Ani Marliani",
    memberProduct: true,
    image: photo("photo-1571771894821-ce9b6c11b08e"),
    storage: "Rak gerai",
    trace: {
      farmer: "Ani Marliani",
      harvest: "26 Juni 2026",
      grading: "Matang 70%",
      warehouse: "Gerai Buah",
      delivery: "Pickup harian",
      consumer: "Kios jus lokal"
    }
  },
  {
    id: "PRD-009",
    name: "Tempe Segar",
    category: "Produk Olahan",
    originVillage: "Cipacing",
    cooperative: cooperativeProfile.name,
    grade: "A",
    price: 8500,
    stock: 210,
    unit: "papan",
    harvestDate: "2026-06-29",
    freshness: "2 hari",
    supplierId: "SUP-008",
    supplierName: "Berkah Tahu Tempe",
    memberProduct: true,
    image: photo("photo-1615485291262-4c13570435d2"),
    storage: "Cold storage",
    trace: {
      farmer: "Berkah Tahu Tempe",
      harvest: "29 Juni 2026",
      grading: "Kemasan bersih",
      warehouse: "Cold Storage C3",
      delivery: "Gerai KDMP",
      consumer: "Anggota koperasi"
    }
  },
  {
    id: "PRD-010",
    name: "Bayam Hidroponik",
    category: "Sayur",
    originVillage: "Bojong",
    cooperative: cooperativeProfile.name,
    grade: "A",
    price: 12000,
    stock: 160,
    unit: "ikat",
    harvestDate: "2026-06-29",
    freshness: "3 hari",
    supplierId: "SUP-009",
    supplierName: "Pak Maman",
    memberProduct: true,
    image: photo("photo-1576045057995-568f588f82fb"),
    storage: "Cold storage",
    trace: {
      farmer: "Pak Maman",
      harvest: "29 Juni 2026",
      grading: "Daun utuh",
      warehouse: "Cold Storage Sayur",
      delivery: "Kurir pagi",
      consumer: "Warung sayur"
    }
  },
  {
    id: "PRD-011",
    name: "Sambal Botol Lokal",
    category: "UMKM",
    originVillage: "Desa Sukamaju",
    cooperative: cooperativeProfile.name,
    grade: "B",
    price: 22000,
    stock: 330,
    unit: "botol",
    harvestDate: "2026-06-20",
    freshness: "6 bulan",
    supplierId: "SUP-010",
    supplierName: "UMKM Sambal Neng Diah",
    memberProduct: true,
    image: photo("photo-1604909052743-94e838986d24"),
    storage: "Rak gerai",
    trace: {
      farmer: "UMKM Sambal Neng Diah",
      harvest: "Batch 20 Juni 2026",
      grading: "Label perlu nomor PIRT",
      warehouse: "Rak Produk Lokal",
      delivery: "Marketplace",
      consumer: "Pembeli paket oleh-oleh"
    }
  },
  {
    id: "PRD-012",
    name: "Kangkung Segar",
    category: "Sayur",
    originVillage: "Bojong",
    cooperative: cooperativeProfile.name,
    grade: "B",
    price: 6500,
    stock: 140,
    unit: "ikat",
    harvestDate: "2026-06-29",
    freshness: "2 hari",
    supplierId: "SUP-009",
    supplierName: "Pak Maman",
    memberProduct: true,
    image: photo("photo-1518977676601-b53f82aba655"),
    storage: "Cold storage",
    trace: {
      farmer: "Pak Maman",
      harvest: "29 Juni 2026",
      grading: "Grade B",
      warehouse: "Cold Storage Sayur",
      delivery: "Gerai",
      consumer: "Pembeli harian"
    }
  },
  {
    id: "PRD-013",
    name: "Pepaya California",
    category: "Buah",
    originVillage: "Desa Sukamaju",
    cooperative: cooperativeProfile.name,
    grade: "A",
    price: 9500,
    stock: 280,
    unit: "kg",
    harvestDate: "2026-06-26",
    freshness: "5 hari",
    supplierId: "SUP-007",
    supplierName: "Ani Marliani",
    memberProduct: true,
    image: photo("photo-1517282009859-f000ec3b26fe"),
    storage: "Rak gerai",
    trace: {
      farmer: "Ani Marliani",
      harvest: "26 Juni 2026",
      grading: "Grade A",
      warehouse: "Gerai Buah",
      delivery: "Kurir lokal",
      consumer: "Toko buah"
    }
  },
  {
    id: "PRD-014",
    name: "Lele Segar",
    category: "Ikan",
    originVillage: "Cipaku",
    cooperative: cooperativeProfile.name,
    grade: "B",
    price: 27000,
    stock: 150,
    unit: "kg",
    harvestDate: "2026-06-28",
    freshness: "2 hari",
    supplierId: "SUP-004",
    supplierName: "Mina Lestari",
    memberProduct: true,
    image: photo("photo-1534766555764-ce878a5e3a2b"),
    storage: "Cold storage",
    trace: {
      farmer: "Mina Lestari",
      harvest: "28 Juni 2026",
      grading: "Segar, ukuran campur",
      warehouse: "Cold Storage F2",
      delivery: "Pickup dingin",
      consumer: "Pecel lele mitra"
    }
  },
  {
    id: "PRD-015",
    name: "Minyak Goreng Kemasan",
    category: "Sembako",
    originVillage: "Distributor Regional",
    cooperative: cooperativeProfile.name,
    grade: "A",
    price: 17500,
    stock: 1180,
    unit: "liter",
    harvestDate: "2026-06-12",
    freshness: "12 bulan",
    supplierId: "DST-001",
    supplierName: "Distributor Sembako Jabar",
    memberProduct: false,
    image: photo("photo-1474979266404-7eaacbcd87c5"),
    storage: "Gudang",
    trace: {
      farmer: "Distributor Sembako Jabar",
      harvest: "Batch 12 Juni 2026",
      grading: "QC kemasan",
      warehouse: "Gudang Sembako",
      delivery: "Gerai",
      consumer: "Anggota koperasi"
    }
  },
  {
    id: "PRD-016",
    name: "Gula Pasir",
    category: "Sembako",
    originVillage: "Distributor Regional",
    cooperative: cooperativeProfile.name,
    grade: "A",
    price: 16500,
    stock: 980,
    unit: "kg",
    harvestDate: "2026-06-10",
    freshness: "18 bulan",
    supplierId: "DST-002",
    supplierName: "Mitra Sembako Priangan",
    memberProduct: false,
    image: photo("photo-1581441363689-1f3c3c414635"),
    storage: "Gudang",
    trace: {
      farmer: "Mitra Sembako Priangan",
      harvest: "Batch 10 Juni 2026",
      grading: "QC kemasan",
      warehouse: "Gudang Sembako",
      delivery: "Gerai",
      consumer: "Pembeli retail"
    }
  },
  {
    id: "PRD-017",
    name: "Pupuk NPK Subsidi Terdata",
    category: "Sarana Produksi",
    originVillage: "Gudang Kabupaten",
    cooperative: cooperativeProfile.name,
    grade: "A",
    price: 125000,
    stock: 420,
    unit: "sak",
    harvestDate: "2026-06-05",
    freshness: "24 bulan",
    supplierId: "SAP-001",
    supplierName: "Sarana Agro Priangan",
    memberProduct: false,
    image: photo("photo-1416879595882-3373a0480b5b"),
    storage: "Gudang",
    trace: {
      farmer: "Sarana Agro Priangan",
      harvest: "Distribusi 5 Juni 2026",
      grading: "Stok legal dan terdata",
      warehouse: "Gudang Sarana Produksi",
      delivery: "Diambil anggota",
      consumer: "Petani anggota"
    }
  },
  {
    id: "PRD-018",
    name: "Bibit Cabai Tahan Hujan",
    category: "Sarana Produksi",
    originVillage: "Sukamaju",
    cooperative: cooperativeProfile.name,
    grade: "A",
    price: 42000,
    stock: 85,
    unit: "tray",
    harvestDate: "2026-06-23",
    freshness: "10 hari",
    supplierId: "SAP-002",
    supplierName: "Pembibitan Taruna Tani",
    memberProduct: true,
    image: photo("photo-1464226184884-fa280b87c399"),
    storage: "Rak gerai",
    trace: {
      farmer: "Pembibitan Taruna Tani",
      harvest: "Bibit siap tanam 23 Juni 2026",
      grading: "Tinggi seragam",
      warehouse: "Area Bibit",
      delivery: "Diambil petani",
      consumer: "Petani cabai"
    }
  },
  {
    id: "PRD-019",
    name: "Telur Asin UMKM",
    category: "UMKM",
    originVillage: "Sukaresmi",
    cooperative: cooperativeProfile.name,
    grade: "B",
    price: 5500,
    stock: 240,
    unit: "butir",
    harvestDate: "2026-06-22",
    freshness: "14 hari",
    supplierId: "SUP-003",
    supplierName: "Rudi Hartono",
    memberProduct: true,
    image: photo("photo-1602030638412-bb8dcc0bc8b0"),
    storage: "Rak gerai",
    trace: {
      farmer: "Rudi Hartono",
      harvest: "Produksi 22 Juni 2026",
      grading: "Rasa stabil",
      warehouse: "Rak UMKM",
      delivery: "Gerai",
      consumer: "Paket sarapan"
    }
  },
  {
    id: "PRD-020",
    name: "Paket Sembako Desa",
    category: "Sembako",
    originVillage: "Sukamaju",
    cooperative: cooperativeProfile.name,
    grade: "A",
    price: 98500,
    stock: 160,
    unit: "paket",
    harvestDate: "2026-06-24",
    freshness: "3 bulan",
    supplierId: "KDM-001",
    supplierName: cooperativeProfile.name,
    memberProduct: false,
    image: photo("photo-1608686207856-001b95cf60ca"),
    storage: "Gudang",
    trace: {
      farmer: cooperativeProfile.name,
      harvest: "Bundling 24 Juni 2026",
      grading: "Paket standar keluarga",
      warehouse: "Gudang Sembako",
      delivery: "Gerai dan marketplace",
      consumer: "Rumah tangga anggota"
    }
  }
];

export const intakeItems: IntakeItem[] = [
  {
    id: "INT-001",
    supplier: "Siti Nurhayati",
    product: "Cabai merah",
    quantity: "500 kg",
    requestedPrice: 30000,
    location: "Kp. Cibiru Hilir",
    harvestDate: "2026-06-29",
    coldStorage: true,
    status: "Menunggu"
  },
  {
    id: "INT-002",
    supplier: "UMKM Sambal Neng Diah",
    product: "Sambal botol",
    quantity: "240 botol",
    requestedPrice: 17500,
    location: "Jl. Desa Sukamaju",
    harvestDate: "2026-06-25",
    coldStorage: false,
    status: "Perlu Dicek"
  },
  {
    id: "INT-003",
    supplier: "Rudi Hartono",
    product: "Telur ayam",
    quantity: "900 butir",
    requestedPrice: 26000,
    location: "Sukaresmi",
    harvestDate: "2026-06-29",
    coldStorage: false,
    status: "Dijadwalkan"
  }
];

export const inventoryItems: InventoryItem[] = [
  {
    id: "INV-001",
    product: "Cabai Merah Sukamaju",
    supplier: "Siti Nurhayati",
    batch: "CB-2906-B",
    grade: "B",
    incoming: 500,
    remaining: 400,
    unit: "kg",
    receivedDate: "2026-06-29",
    expiryDate: "2026-07-05",
    location: "Cold Storage C1",
    buyPrice: 30000,
    sellPrice: 32000,
    risk: "Aman"
  },
  {
    id: "INV-002",
    product: "Tomat Segar",
    supplier: "Siti Nurhayati",
    batch: "TM-2706-A",
    grade: "A",
    incoming: 420,
    remaining: 210,
    unit: "kg",
    receivedDate: "2026-06-27",
    expiryDate: "2026-07-01",
    location: "Cold Storage C2",
    buyPrice: 12000,
    sellPrice: 14000,
    risk: "Perlu Dijual Cepat"
  },
  {
    id: "INV-003",
    product: "Ikan Nila Segar",
    supplier: "Mina Lestari",
    batch: "IN-2906-B",
    grade: "B",
    incoming: 210,
    remaining: 185,
    unit: "kg",
    receivedDate: "2026-06-29",
    expiryDate: "2026-07-01",
    location: "Cold Storage F1",
    buyPrice: 31000,
    sellPrice: 36000,
    risk: "Perlu Dijual Cepat"
  },
  {
    id: "INV-004",
    product: "Bayam Hidroponik",
    supplier: "Pak Maman",
    batch: "BY-2906-A",
    grade: "A",
    incoming: 190,
    remaining: 48,
    unit: "ikat",
    receivedDate: "2026-06-29",
    expiryDate: "2026-06-30",
    location: "Cold Storage Sayur",
    buyPrice: 9000,
    sellPrice: 12000,
    risk: "Hampir Kedaluwarsa"
  },
  {
    id: "INV-005",
    product: "Keripik Singkong Pedas",
    supplier: "Dapur Singkong Rasa",
    batch: "KS-2506-B",
    grade: "B",
    incoming: 900,
    remaining: 780,
    unit: "pak",
    receivedDate: "2026-06-25",
    expiryDate: "2026-10-25",
    location: "Gudang UMKM B",
    buyPrice: 10500,
    sellPrice: 13500,
    risk: "Aman"
  },
  {
    id: "INV-006",
    product: "Pisang Raja",
    supplier: "Ani Marliani",
    batch: "PS-2606-B",
    grade: "B",
    incoming: 320,
    remaining: 46,
    unit: "kg",
    receivedDate: "2026-06-26",
    expiryDate: "2026-06-30",
    location: "Gerai Buah",
    buyPrice: 15000,
    sellPrice: 18500,
    risk: "Hampir Kedaluwarsa"
  }
];

export const transactions: Transaction[] = [
  {
    id: "TRX-001",
    date: "2026-06-29",
    buyer: "Restoran Sambel Hejo",
    product: "Cabai Merah Sukamaju",
    volume: "100 kg",
    grossValue: 3200000,
    supplierPaid: 3000000,
    margin: 200000,
    status: "Selesai",
    channel: "Grosir"
  },
  {
    id: "TRX-002",
    date: "2026-06-29",
    buyer: "Warung Bu Imas",
    product: "Beras Medium Cibodas",
    volume: "120 kg",
    grossValue: 1704000,
    supplierPaid: 1548000,
    margin: 156000,
    status: "Selesai",
    channel: "Gerai"
  },
  {
    id: "TRX-003",
    date: "2026-06-28",
    buyer: "Katering Sekolah Sehat",
    product: "Ikan Nila Segar",
    volume: "60 kg",
    grossValue: 2160000,
    supplierPaid: 1860000,
    margin: 300000,
    status: "Diproses",
    channel: "Marketplace"
  },
  {
    id: "TRX-004",
    date: "2026-06-28",
    buyer: "Anggota 0821",
    product: "Telur Ayam Rakyat",
    volume: "25 kg",
    grossValue: 737500,
    supplierPaid: 650000,
    margin: 87500,
    status: "Selesai",
    channel: "Gerai"
  },
  {
    id: "TRX-005",
    date: "2026-06-27",
    buyer: "Kafe Rahayu",
    product: "Kopi Arabika Lokal",
    volume: "32 pak",
    grossValue: 2176000,
    supplierPaid: 1760000,
    margin: 416000,
    status: "Selesai",
    channel: "Marketplace"
  },
  {
    id: "TRX-006",
    date: "2026-06-27",
    buyer: "Toko Oleh-oleh Cileunyi",
    product: "Keripik Singkong Pedas",
    volume: "180 pak",
    grossValue: 2430000,
    supplierPaid: 1890000,
    margin: 540000,
    status: "Selesai",
    channel: "Grosir"
  },
  {
    id: "TRX-007",
    date: "2026-06-26",
    buyer: "Paket Belanja Keluarga",
    product: "Paket Sembako Desa",
    volume: "42 paket",
    grossValue: 4137000,
    supplierPaid: 3654000,
    margin: 483000,
    status: "Selesai",
    channel: "Marketplace"
  },
  {
    id: "TRX-008",
    date: "2026-06-26",
    buyer: "Kelompok Tani Harapan",
    product: "Pupuk NPK Subsidi Terdata",
    volume: "36 sak",
    grossValue: 4500000,
    supplierPaid: 4248000,
    margin: 252000,
    status: "Menunggu Pembayaran",
    channel: "Gerai"
  },
  {
    id: "TRX-009",
    date: "2026-06-25",
    buyer: "Komunitas Pemuda Desa",
    product: "Sambal Botol Lokal",
    volume: "60 botol",
    grossValue: 1320000,
    supplierPaid: 1050000,
    margin: 270000,
    status: "Selesai",
    channel: "Marketplace"
  },
  {
    id: "TRX-010",
    date: "2026-06-24",
    buyer: "Pasar Mitra Cibiru",
    product: "Tomat Segar",
    volume: "180 kg",
    grossValue: 2520000,
    supplierPaid: 2160000,
    margin: 360000,
    status: "Selesai",
    channel: "Grosir"
  }
];

export const logisticsSchedules: LogisticsSchedule[] = [
  {
    id: "LOG-001",
    type: "Penjemputan",
    date: "2026-06-29 08:00",
    route: "Sukamaju - Cibiru Hilir - Gudang KDMP",
    vehicle: "Pickup 01",
    capacity: "1 ton",
    driver: "Asep",
    status: "Berjalan"
  },
  {
    id: "LOG-002",
    type: "Pengiriman",
    date: "2026-06-29 13:30",
    route: "KDMP - Restoran Sambel Hejo",
    vehicle: "Pickup 02",
    capacity: "800 kg",
    driver: "Yana",
    status: "Terjadwal"
  },
  {
    id: "LOG-003",
    type: "Penjemputan",
    date: "2026-06-29 09:45",
    route: "Cipaku - KDMP",
    vehicle: "Motor Box Dingin",
    capacity: "180 kg",
    driver: "Dedi",
    status: "Selesai"
  },
  {
    id: "LOG-004",
    type: "Pengiriman",
    date: "2026-06-29 15:00",
    route: "KDMP - Katering Sekolah Sehat",
    vehicle: "Van 01",
    capacity: "600 kg",
    driver: "Rina",
    status: "Terjadwal"
  },
  {
    id: "LOG-005",
    type: "Penjemputan",
    date: "2026-06-30 07:30",
    route: "Bojong - KDMP",
    vehicle: "Pickup 01",
    capacity: "1 ton",
    driver: "Asep",
    status: "Terjadwal"
  },
  {
    id: "LOG-006",
    type: "Pengiriman",
    date: "2026-06-30 10:00",
    route: "KDMP - Pasar Mitra Cibiru",
    vehicle: "Pickup 02",
    capacity: "800 kg",
    driver: "Yana",
    status: "Terjadwal"
  },
  {
    id: "LOG-007",
    type: "Penjemputan",
    date: "2026-06-30 13:00",
    route: "Cibodas - KDMP",
    vehicle: "Truk 01",
    capacity: "3 ton",
    driver: "Herman",
    status: "Terjadwal"
  },
  {
    id: "LOG-008",
    type: "Pengiriman",
    date: "2026-06-30 16:00",
    route: "KDMP - Toko Oleh-oleh Cileunyi",
    vehicle: "Van 01",
    capacity: "600 kg",
    driver: "Rina",
    status: "Terjadwal"
  }
];

export const proposals: Proposal[] = [
  {
    id: "USL-001",
    title: "Tambah cold storage kecil untuk cabai dan ikan",
    proposer: "Siti Nurhayati",
    support: 186,
    comments: 34,
    status: "Dikaji"
  },
  {
    id: "USL-002",
    title: "Bundling produk UMKM untuk hampers desa",
    proposer: "Dapur Singkong Rasa",
    support: 142,
    comments: 21,
    status: "Disetujui"
  },
  {
    id: "USL-003",
    title: "Pelatihan pencatatan biaya produksi petani",
    proposer: "Ketua RT 03",
    support: 98,
    comments: 17,
    status: "Ditindaklanjuti"
  },
  {
    id: "USL-004",
    title: "Jadwal jemput panen pagi untuk sayuran daun",
    proposer: "Pak Maman",
    support: 74,
    comments: 9,
    status: "Baru"
  },
  {
    id: "USL-005",
    title: "Program relawan digital desa untuk marketplace",
    proposer: "Karang Taruna",
    support: 211,
    comments: 46,
    status: "Dikaji"
  }
];

export const votingAgendas: VotingAgenda[] = [
  {
    id: "VOT-001",
    title: "Penentuan komoditas prioritas Juli: cabai, beras, ikan",
    dueDate: "2026-07-05",
    yes: 684,
    no: 92,
    abstain: 47,
    status: "Berlangsung"
  },
  {
    id: "VOT-002",
    title: "Penggunaan surplus untuk tambahan cold storage 2 ton",
    dueDate: "2026-07-12",
    yes: 531,
    no: 208,
    abstain: 36,
    status: "Berlangsung"
  },
  {
    id: "VOT-003",
    title: "Pemilihan pengurus unit marketplace desa",
    dueDate: "2026-06-25",
    yes: 742,
    no: 61,
    abstain: 22,
    status: "Selesai"
  }
];

export const cooperativeComparisons: CooperativeComparison[] = [
  {
    id: "KOP-001",
    name: "KDMP Sukamaju",
    district: "Kab. Bandung",
    status: "Sehat",
    revenue: 486000000,
    margin: 14.8,
    localShare: 42,
    turnover: 4.2,
    shrinkage: 3.2,
    activeMembers: 1248,
    cashRunway: 5.1,
    dscr: 1.7,
    readiness: 67
  },
  {
    id: "KOP-002",
    name: "KDMP Cibodas",
    district: "Kab. Bandung",
    status: "Perlu Pendampingan",
    revenue: 312000000,
    margin: 10.5,
    localShare: 28,
    turnover: 2.8,
    shrinkage: 6.7,
    activeMembers: 816,
    cashRunway: 2.9,
    dscr: 1.1,
    readiness: 54
  },
  {
    id: "KOP-003",
    name: "KDMP Rahayu",
    district: "Kab. Bandung",
    status: "Sehat",
    revenue: 572000000,
    margin: 16.1,
    localShare: 51,
    turnover: 4.9,
    shrinkage: 2.4,
    activeMembers: 1510,
    cashRunway: 6.3,
    dscr: 2.0,
    readiness: 78
  },
  {
    id: "KOP-004",
    name: "KDMP Cipaku",
    district: "Kab. Sumedang",
    status: "Berisiko",
    revenue: 188000000,
    margin: 6.8,
    localShare: 19,
    turnover: 1.8,
    shrinkage: 12.5,
    activeMembers: 503,
    cashRunway: 1.2,
    dscr: 0.7,
    readiness: 38
  },
  {
    id: "KOP-005",
    name: "KDMP Bojong",
    district: "Kab. Bandung",
    status: "Perlu Pendampingan",
    revenue: 267000000,
    margin: 9.6,
    localShare: 35,
    turnover: 2.5,
    shrinkage: 7.1,
    activeMembers: 672,
    cashRunway: 2.4,
    dscr: 1.0,
    readiness: 49
  },
  {
    id: "KOP-006",
    name: "KDMP Tarumajaya",
    district: "Kab. Garut",
    status: "Belum Aktif",
    revenue: 0,
    margin: 0,
    localShare: 0,
    turnover: 0,
    shrinkage: 0,
    activeMembers: 142,
    cashRunway: 0,
    dscr: 0,
    readiness: 21
  }
];

export const independenceComponents: IndependenceComponent[] = [
  {
    label: "Kesehatan arus kas",
    score: 72,
    recommendation: "Pertahankan kas minimum tiga bulan biaya tetap."
  },
  {
    label: "Kemampuan membayar cicilan",
    score: 68,
    recommendation: "Naikkan transaksi grosir lokal agar DSCR di atas 1,8."
  },
  {
    label: "Kemampuan membayar gaji",
    score: 75,
    recommendation: "Kurangi jam lembur pada hari stok lambat."
  },
  {
    label: "Proporsi produk lokal",
    score: 58,
    recommendation: "Tambah kontrak pasokan cabai, beras, telur, dan ikan."
  },
  {
    label: "Pertumbuhan anggota aktif",
    score: 64,
    recommendation: "Buat insentif belanja anggota dan kelas pemasok baru."
  },
  {
    label: "Transparansi laporan",
    score: 82,
    recommendation: "Publikasikan ringkasan arus kas mingguan."
  },
  {
    label: "Kesiapan pengurus lokal",
    score: 61,
    recommendation: "Latih pengurus lokal dalam retail mix dan pembukuan."
  },
  {
    label: "Efisiensi stok",
    score: 70,
    recommendation: "Pasang batas reorder point untuk sembako dan produk cepat rusak."
  },
  {
    label: "Tingkat kerusakan barang",
    score: 74,
    recommendation: "Prioritaskan diskon cepat untuk batch berumur pendek."
  },
  {
    label: "Ketergantungan subsidi",
    score: 46,
    recommendation: "Simulasikan biaya setelah subsidi berhenti dan cari margin pengganti."
  }
];

export const academyMissions: AcademyMission[] = [
  {
    id: "AKD-001",
    title: "Kenali bedanya koperasi dan toko retail",
    points: 120,
    badge: "Warga Koperasi",
    status: "Selesai"
  },
  {
    id: "AKD-002",
    title: "Simulasi stok cabai agar tidak rusak",
    points: 180,
    badge: "Penjaga Stok",
    status: "Aktif"
  },
  {
    id: "AKD-003",
    title: "Promosikan 3 produk anggota di marketplace",
    points: 220,
    badge: "Duta Produk Lokal",
    status: "Aktif"
  },
  {
    id: "AKD-004",
    title: "Hitung pembagian hasil sederhana",
    points: 160,
    badge: "Bendahara Muda",
    status: "Terkunci"
  }
];

export const harvestCalendar = [
  { month: "Jan", cabai: 42, tomat: 32, beras: 12, telur: 68, kopi: 18 },
  { month: "Feb", cabai: 51, tomat: 35, beras: 18, telur: 70, kopi: 20 },
  { month: "Mar", cabai: 62, tomat: 44, beras: 88, telur: 69, kopi: 22 },
  { month: "Apr", cabai: 58, tomat: 48, beras: 72, telur: 72, kopi: 31 },
  { month: "Mei", cabai: 46, tomat: 52, beras: 36, telur: 73, kopi: 64 },
  { month: "Jun", cabai: 74, tomat: 61, beras: 28, telur: 75, kopi: 70 },
  { month: "Jul", cabai: 82, tomat: 66, beras: 30, telur: 76, kopi: 58 },
  { month: "Agu", cabai: 69, tomat: 59, beras: 82, telur: 74, kopi: 42 },
  { month: "Sep", cabai: 56, tomat: 51, beras: 92, telur: 73, kopi: 30 },
  { month: "Okt", cabai: 48, tomat: 44, beras: 55, telur: 71, kopi: 24 },
  { month: "Nov", cabai: 53, tomat: 39, beras: 22, telur: 70, kopi: 21 },
  { month: "Des", cabai: 60, tomat: 42, beras: 18, telur: 69, kopi: 19 }
];

export const regionKpis: Metric[] = [
  { label: "Koperasi aktif", value: "5 dari 6", helper: "83% operasional", tone: "green" },
  { label: "Omzet wilayah", value: "Rp1,83 M", helper: "bulan berjalan", tone: "green" },
  { label: "Produk lokal", value: "34%", helper: "target 45%", tone: "yellow" },
  { label: "Koperasi merugi", value: "1", helper: "perlu audit stok", tone: "red" },
  { label: "Bergantung subsidi", value: "3", helper: "runway kurang 3 bulan", tone: "yellow" },
  { label: "Stok rusak tinggi", value: "2", helper: "shrinkage di atas 7%", tone: "orange" },
  { label: "Cicilan berisiko", value: "2", helper: "DSCR kurang 1,1", tone: "red" },
  { label: "Siap alih operasi", value: "2", helper: "readiness di atas 70", tone: "green" }
];

export const governmentKpis: Metric[] = [
  { label: "Koperasi terdaftar", value: "80.214", helper: "baseline nasional", tone: "green" },
  { label: "Koperasi aktif", value: "58.420", helper: "72,8% aktif", tone: "green" },
  { label: "Gerai beroperasi", value: "41.870", helper: "tahap 1 dan 2", tone: "green" },
  { label: "Omzet nasional", value: "Rp8,7 T", helper: "YTD", tone: "green" },
  { label: "Produk lokal diserap", value: "Rp3,1 T", helper: "35,6% omzet", tone: "green" },
  { label: "Produsen terlibat", value: "2,4 jt", helper: "petani, nelayan, UMKM", tone: "green" },
  { label: "Transaksi anggota", value: "46,8 jt", helper: "retail dan marketplace", tone: "green" },
  { label: "Nilai subsidi", value: "Rp1,2 T", helper: "operasional berjalan", tone: "yellow" },
  { label: "Kewajiban pembiayaan", value: "Rp4,6 T", helper: "cicilan agregat", tone: "yellow" },
  { label: "Mandiri", value: "11.240", helper: "skor di atas 80", tone: "green" },
  { label: "Berisiko", value: "9.820", helper: "skor di bawah 40", tone: "red" }
];

export const impactIndicators = [
  { label: "Peningkatan harga jual petani", value: "+14,2%" },
  { label: "Pengurangan ketergantungan tengkulak", value: "-28%" },
  { label: "Pertumbuhan pendapatan anggota", value: "+11,7%" },
  { label: "Belanja kembali ke ekonomi desa", value: "42%" },
  { label: "Lapangan kerja lokal", value: "184.000" },
  { label: "Partisipasi anggota", value: "63%" }
];

export const programRisks = [
  "Ketergantungan dana desa",
  "Stok tidak produktif",
  "Beban gaji setelah dua tahun",
  "Risiko kredit macet",
  "Lemahnya partisipasi anggota",
  "Rendahnya penyerapan produk lokal",
  "Koperasi tidak siap mengambil alih operasional"
];

export const managerKpis: Metric[] = [
  { label: "Omzet hari ini", value: "Rp31,8 jt", helper: "128 transaksi", trend: "+9%", tone: "green" },
  { label: "Penjualan bulan berjalan", value: "Rp486 jt", helper: "target Rp520 jt", trend: "93%", tone: "green" },
  { label: "Pembelian produk lokal", value: "Rp204 jt", helper: "186 pemasok aktif", tone: "green" },
  { label: "Persentase produk lokal", value: "42%", helper: "naik 6 poin", tone: "green" },
  { label: "Margin kotor", value: "14,8%", helper: "target 15%", tone: "yellow" },
  { label: "Stok berisiko rusak", value: "Rp15,6 jt", helper: "6 batch", tone: "orange" },
  { label: "Stok hampir habis", value: "18 SKU", helper: "reorder hari ini", tone: "yellow" },
  { label: "Utilisasi gudang", value: "71%", helper: "aman", tone: "green" },
  { label: "Utilisasi cold storage", value: "83%", helper: "mendekati batas", tone: "yellow" },
  { label: "Armada aktif", value: "4 dari 5", helper: "1 servis ringan", tone: "green" },
  { label: "Kas tersedia", value: "Rp315 jt", helper: "runway 5,1 bulan", tone: "green" },
  { label: "Kewajiban cicilan", value: "Rp25 jt", helper: "jatuh tempo 5 Juli", tone: "yellow" },
  { label: "Subsidi operasional", value: "Rp35 jt", helper: "bulan berjalan", tone: "yellow" },
  { label: "Anggota aktif", value: "1.248", helper: "63% bertransaksi", tone: "green" }
];

export const farmerMetrics: Metric[] = [
  { label: "Status anggota", value: "Aktif", helper: "No. anggota AG-0821", tone: "green" },
  { label: "Komoditas", value: "Cabai, tomat", helper: "2 komoditas utama", tone: "green" },
  { label: "Panen berikutnya", value: "29 Jun 2026", helper: "estimasi 500 kg cabai", tone: "yellow" },
  { label: "Transaksi bulan ini", value: "Rp18,4 jt", helper: "7 batch terjual", trend: "+18%", tone: "green" },
  { label: "Belum diterima", value: "Rp3,0 jt", helper: "menunggu settlement", tone: "orange" },
  { label: "Kebutuhan produksi", value: "6 item", helper: "tersedia di koperasi", tone: "green" }
];

export const memberFinance = [
  { label: "Pendapatan retail", value: 184000000 },
  { label: "Marketplace", value: 96000000 },
  { label: "Pembelian produk anggota", value: 204000000 },
  { label: "Biaya operasional", value: 82000000 },
  { label: "Pembayaran cicilan", value: 25000000 },
  { label: "Dana cadangan", value: 38000000 }
];

export const retailMix = [
  { name: "Produk lokal", value: 42 },
  { name: "Produk pabrikan", value: 23 },
  { name: "Kebutuhan pokok", value: 19 },
  { name: "Sarana produksi", value: 10 },
  { name: "Produk UMKM", value: 6 }
];

export const recommendations = [
  { icon: PackageSearch, text: "Tambah stok beras dan telur karena reorder point terlampaui." },
  { icon: HandCoins, text: "Berikan diskon 8% untuk bayam dan pisang yang hampir kedaluwarsa." },
  { icon: Boxes, text: "Pindahkan 180 kg tomat ke cold storage C2 setelah jam operasional." },
  { icon: Store, text: "Promosikan cabai lokal sebagai paket grosir restoran." },
  { icon: Banknote, text: "Bundling keripik singkong, kopi, dan sambal sebagai paket UMKM." },
  { icon: Truck, text: "Gabungkan rute pengiriman marketplace dengan pickup Bojong besok pagi." }
];
