import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpenCheck,
  Box,
  CalendarClock,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  Coins,
  Factory,
  Filter,
  Gauge,
  HandCoins,
  Handshake,
  Home,
  Landmark,
  MapPin,
  PackageCheck,
  Plus,
  RefreshCw,
  Route,
  Search,
  Send,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Star,
  Store,
  Thermometer,
  TrendingUp,
  Truck,
  Users,
  Vote,
  WalletCards,
  Warehouse
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  academyMissions,
  businessFlow,
  cooperativeComparisons,
  cooperativeProfile,
  demoSteps,
  farmerMetrics,
  farmerPipeline,
  governmentKpis,
  harvestCalendar,
  heroImage,
  impactIndicators,
  independenceComponents,
  intakeItems,
  inventoryItems,
  logisticsSchedules,
  managerKpis,
  memberFinance,
  platformPillars,
  priceTrend,
  products,
  productionNeeds,
  programRisks,
  proposals,
  recommendations,
  regionKpis,
  retailMix,
  roleOptions,
  suppliers,
  transactions,
  viewIcons,
  viewLabels,
  votingAgendas
} from "./data/desa360";
import {
  Button,
  FlowDiagram,
  MetricGrid,
  Modal,
  Pipeline,
  ScoreRing,
  Section,
  SimpleTable,
  StatusBadge,
  Toast,
  cn
} from "./components/ui";
import type { AppView, Product, ProductCategory, RoleId } from "./types/desa360";
import { clamp, percent, rupiah } from "./utils/format";

const chartColors = ["#2f6b30", "#cf2f2f", "#eab308", "#0ea5e9", "#f97316", "#64748b"];
const roleById = Object.fromEntries(roleOptions.map((role) => [role.id, role])) as Record<RoleId, (typeof roleOptions)[number]>;

type SupportInputs = {
  revenue: number;
  margin: number;
  payroll: number;
  logistics: number;
  storage: number;
  installment: number;
  subsidy: number;
};

function pipelineIndexForDemo(step: number) {
  const completedStep = step - 1;
  const map = [0, 1, 5, 2, 3, 4, 6, 7, 7, 7, 8, 8, 8, 8];
  return step <= 0 ? -1 : map[completedStep] ?? 8;
}

function App() {
  const [role, setRole] = useState<RoleId>("government");
  const [view, setView] = useState<AppView>("landing");
  const [demoStep, setDemoStep] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [traceProduct, setTraceProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "Semua">("Semua");
  const [supportInputs, setSupportInputs] = useState({
    revenue: cooperativeProfile.monthlyRevenue,
    margin: cooperativeProfile.grossMargin,
    payroll: cooperativeProfile.payroll,
    logistics: 31000000,
    storage: 18500000,
    installment: cooperativeProfile.monthlyInstallment,
    subsidy: cooperativeProfile.operatingSubsidy
  });

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const activeRole = roleById[role];
  const navViews = Array.from(new Set(["landing", ...activeRole.nav])) as AppView[];
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "Semua" || product.category === category;
      const haystack = `${product.name} ${product.category} ${product.originVillage} ${product.supplierName}`.toLowerCase();
      return matchesCategory && haystack.includes(query.toLowerCase());
    });
  }, [category, query]);

  const cartTotal = cart.reduce((total, id) => {
    const product = products.find((item) => item.id === id);
    return total + (product?.price ?? 0);
  }, 0);

  function switchRole(nextRole: RoleId) {
    setRole(nextRole);
    setView(roleById[nextRole].defaultView);
    setToast(`Tampilan berganti ke ${roleById[nextRole].label}.`);
  }

  function advanceDemo() {
    setDemoStep((current) => {
      const next = Math.min(current + 1, demoSteps.length);
      setToast(next === demoSteps.length ? "Skenario lengkap selesai sampai pembukuan dan laporan." : demoSteps[next - 1]);
      return next;
    });
  }

  function setDemoTo(step: number, message: string) {
    setDemoStep((current) => Math.max(current, step));
    setToast(message);
  }

  function addToCart(product: Product) {
    setCart((current) => [...current, product.id]);
    setToast(`${product.name} ditambahkan ke keranjang.`);
  }

  const marginValue = supportInputs.revenue * (supportInputs.margin / 100);
  const monthlyCost =
    supportInputs.payroll + supportInputs.logistics + supportInputs.storage + supportInputs.installment;
  const surplusAfterSupportEnds = marginValue - monthlyCost;
  const surplusWithSupport = surplusAfterSupportEnds + supportInputs.subsidy;
  const runway =
    surplusAfterSupportEnds >= 0
      ? 12
      : clamp(cooperativeProfile.cash / Math.abs(surplusAfterSupportEnds), 0, 12);

  return (
    <div className="min-h-screen">
      <Header
        activeRole={activeRole}
        activeView={view}
        navViews={navViews}
        onRoleChange={switchRole}
        onViewChange={setView}
        cartCount={cart.length}
        onCartClick={() => setCheckoutOpen(true)}
      />
      <main>
        {view === "landing" ? (
          <LandingPage setRole={switchRole} setView={setView} />
        ) : (
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {view === "dashboard" ? (
              <RoleDashboard
                role={role}
                demoStep={demoStep}
                setDemoTo={setDemoTo}
                supportInputs={supportInputs}
                setSupportInputs={setSupportInputs}
                supportOutputs={{ surplusAfterSupportEnds, surplusWithSupport, runway }}
              />
            ) : null}
            {view === "marketplace" ? (
              <Marketplace
                query={query}
                setQuery={setQuery}
                category={category}
                setCategory={setCategory}
                products={filteredProducts}
                addToCart={addToCart}
                openTrace={setTraceProduct}
                openCheckout={() => setCheckoutOpen(true)}
                cartCount={cart.length}
              />
            ) : null}
            {view === "independence" ? <IndependenceDashboard demoStep={demoStep} /> : null}
            {view === "village" ? <VillagePotential /> : null}
            {view === "academy" ? <Academy /> : null}
            {view === "demo" ? (
              <DemoScenario
                demoStep={demoStep}
                advanceDemo={advanceDemo}
                resetDemo={() => {
                  setDemoStep(0);
                  setToast("Skenario demo direset.");
                }}
              />
            ) : null}
          </div>
        )}
      </main>

      {traceProduct ? <TraceabilityModal product={traceProduct} onClose={() => setTraceProduct(null)} /> : null}
      {checkoutOpen ? (
        <CheckoutModal
          cart={cart}
          cartTotal={cartTotal}
          onClose={() => setCheckoutOpen(false)}
          onCheckout={() => {
            setCheckoutOpen(false);
            setDemoTo(10, "Checkout demo selesai. Transaksi masuk pembukuan dan pembayaran pemasok disiapkan.");
          }}
        />
      ) : null}
      {toast ? <Toast message={toast} onClose={() => setToast(null)} /> : null}
    </div>
  );
}

function Header({
  activeRole,
  activeView,
  navViews,
  onRoleChange,
  onViewChange,
  cartCount,
  onCartClick
}: {
  activeRole: (typeof roleOptions)[number];
  activeView: AppView;
  navViews: AppView[];
  onRoleChange: (role: RoleId) => void;
  onViewChange: (view: AppView) => void;
  cartCount: number;
  onCartClick: () => void;
}) {
  const RoleIcon = activeRole.icon;
  return (
    <header className="sticky top-0 z-40 border-b border-leaf-100 bg-rice/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <button
            type="button"
            onClick={() => onViewChange("landing")}
            className="flex items-center gap-3 text-left"
            aria-label="Kembali ke ringkasan DESA360"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-leaf-800 text-white shadow-sm">
              <Sprout className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-black leading-tight text-leaf-950">DESA360</p>
              <p className="text-xs font-semibold text-stone-600">Sistem Operasi Koperasi Desa Terintegrasi</p>
            </div>
          </button>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="flex min-w-0 items-center gap-2 rounded-md border border-leaf-200 bg-white px-3 py-2">
              <RoleIcon className="h-4 w-4 shrink-0 text-leaf-700" />
              <span className="sr-only">Pilih role</span>
              <select
                value={activeRole.id}
                onChange={(event) => onRoleChange(event.target.value as RoleId)}
                className="min-w-0 bg-transparent text-sm font-bold text-leaf-900 outline-none"
              >
                {roleOptions.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.label}
                  </option>
                ))}
              </select>
            </label>
            <Button
              type="button"
              variant="secondary"
              onClick={onCartClick}
              className="relative"
              aria-label="Buka keranjang marketplace"
            >
              <ShoppingCart className="h-4 w-4" />
              Keranjang
              {cartCount ? (
                <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-merah-600 px-1 text-xs text-white">
                  {cartCount}
                </span>
              ) : null}
            </Button>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-1 scrollbar-soft" aria-label="Navigasi utama">
          {navViews.map((navView) => {
            const Icon = viewIcons[navView];
            return (
              <button
                key={navView}
                type="button"
                onClick={() => onViewChange(navView)}
                className={cn(
                  "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-bold transition",
                  activeView === navView
                    ? "bg-leaf-800 text-white shadow-sm"
                    : "border border-leaf-100 bg-white text-leaf-800 hover:bg-leaf-50"
                )}
              >
                <Icon className="h-4 w-4" />
                {viewLabels[navView]}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function LandingPage({
  setRole,
  setView
}: {
  setRole: (role: RoleId) => void;
  setView: (view: AppView) => void;
}) {
  return (
    <div>
      <section className="relative min-h-[560px] overflow-hidden bg-leaf-900 text-white">
        <img src={heroImage} alt="Ilustrasi ekosistem koperasi desa terintegrasi" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-leaf-950/96 via-leaf-900/78 to-leaf-950/18" />
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
              Standardized Platform, Localized Business
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              DESA360 - Sistem Operasi Koperasi Desa Terintegrasi
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/88">
              Prototype demonstrasi untuk menunjukkan KDMP sebagai pusat layanan ekonomi desa: produksi,
              grading, gudang, retail, marketplace, logistik, pembukuan, dan transparansi anggota dalam satu alur.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                type="button"
                onClick={() => {
                  setRole("farmer");
                  setView("demo");
                }}
                className="!bg-white !text-leaf-950 hover:!bg-leaf-50"
              >
                <Sparkles className="h-4 w-4" />
                Lihat Demo
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setRole("manager")}
                className="!border-white/50 !bg-leaf-950/35 !text-white hover:!bg-leaf-950/50"
              >
                <Warehouse className="h-4 w-4" />
                Masuk sebagai Pengelola
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setRole("buyer");
                  setView("marketplace");
                }}
                className="!border-white/50 !bg-leaf-950/35 !text-white hover:!bg-leaf-950/50"
              >
                <Store className="h-4 w-4" />
                Jelajahi Produk Desa
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Section title="Masalah Utama KDMP" eyebrow="Mengapa bukan sekadar gerai retail">
          <div className="grid gap-3 md:grid-cols-5">
            {[
              "Koperasi berisiko hanya menjadi gerai retail biasa.",
              "Produk lokal sulit masuk karena kualitas dan pasokan tidak konsisten.",
              "Pengelolaan stok dan logistik belum terintegrasi.",
              "Anggota belum dapat memantau tata kelola.",
              "Risiko ketergantungan terhadap subsidi dan dana desa."
            ].map((problem) => (
              <div key={problem} className="rounded-lg border border-merah-100 bg-white p-4 shadow-sm">
                <AlertTriangle className="mb-3 h-5 w-5 text-merah-600" />
                <p className="text-sm font-semibold leading-6 text-stone-700">{problem}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Empat Pilar DESA360" eyebrow="Solusi operasional">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {platformPillars.map((pillar, index) => (
              <div key={pillar.title} className="rounded-lg border border-leaf-100 bg-white p-5 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-leaf-700 text-white">
                  {index + 1}
                </div>
                <h3 className="text-base font-bold text-leaf-950">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{pillar.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Alur Ekonomi Desa" eyebrow="Produk, uang, dan manfaat anggota">
          <FlowDiagram items={businessFlow} />
        </Section>

        <Section title="Profil Dummy Demonstrasi" eyebrow="Desa Sukamaju">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Nama koperasi", value: cooperativeProfile.name, icon: Landmark },
              { label: "Lokasi", value: cooperativeProfile.location, icon: MapPin },
              { label: "Jumlah anggota", value: `${cooperativeProfile.members.toLocaleString("id-ID")} anggota`, icon: Users },
              { label: "Status", value: cooperativeProfile.status, icon: Gauge }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
                  <Icon className="mb-3 h-5 w-5 text-leaf-700" />
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-stone-500">{item.label}</p>
                  <p className="mt-2 text-lg font-bold text-leaf-950">{item.value}</p>
                </div>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
}

function RoleDashboard({
  role,
  demoStep,
  setDemoTo,
  supportInputs,
  setSupportInputs,
  supportOutputs
}: {
  role: RoleId;
  demoStep: number;
  setDemoTo: (step: number, message: string) => void;
  supportInputs: SupportInputs;
  setSupportInputs: React.Dispatch<React.SetStateAction<SupportInputs>>;
  supportOutputs: {
    surplusAfterSupportEnds: number;
    surplusWithSupport: number;
    runway: number;
  };
}) {
  if (role === "farmer") return <FarmerDashboard demoStep={demoStep} setDemoTo={setDemoTo} />;
  if (role === "manager") return <ManagerDashboard demoStep={demoStep} setDemoTo={setDemoTo} />;
  if (role === "buyer") return <BuyerDashboardIntro />;
  if (role === "member") return <MemberDashboard demoStep={demoStep} />;
  if (role === "regional") return <RegionalDashboard />;
  return (
    <GovernmentDashboard
      supportInputs={supportInputs}
      setSupportInputs={setSupportInputs}
      supportOutputs={supportOutputs}
    />
  );
}

function FarmerDashboard({
  demoStep,
  setDemoTo
}: {
  demoStep: number;
  setDemoTo: (step: number, message: string) => void;
}) {
  return (
    <div className="space-y-6">
      <DashboardHero
        eyebrow="Dashboard pemasok"
        title="Siti Nurhayati"
        description="Petani anggota aktif dengan komoditas cabai merah dan tomat. Semua status produk, harga, kebutuhan produksi, dan pembayaran terlihat dari satu tempat."
        icon={<Sprout className="h-6 w-6" />}
      />
      <MetricGrid metrics={farmerMetrics} />
      <Section
        title="Daftarkan Hasil Produksi"
        eyebrow="Intake pemasok"
        actions={
          <Button
            type="button"
            onClick={() => setDemoTo(1, "500 kg cabai didaftarkan dan masuk antrean verifikasi pengelola.")}
          >
            <Plus className="h-4 w-4" />
            Simpan Produksi
          </Button>
        }
      >
        <form
          className="grid gap-3 rounded-lg border border-leaf-100 bg-white p-4 shadow-sm md:grid-cols-3"
          onSubmit={(event) => {
            event.preventDefault();
            setDemoTo(1, "500 kg cabai didaftarkan dan masuk antrean verifikasi pengelola.");
          }}
        >
          {[
            ["Jenis komoditas", "Cabai merah"],
            ["Jumlah", "500"],
            ["Satuan", "kg"],
            ["Tanggal panen", "2026-06-29"],
            ["Grade awal", "B"],
            ["Foto produk", "cabai-panen.jpg"],
            ["Lokasi penjemputan", "Kp. Cibiru Hilir"],
            ["Harga yang diharapkan", "30000"],
            ["Kebutuhan cold storage", "Ya"],
            ["Masa simpan", "5 hari"],
            ["Catatan", "Panen pagi, siap dijemput sebelum 10.00"]
          ].map(([label, value]) => (
            <label key={label} className={cn(label === "Catatan" ? "md:col-span-3" : "", "text-sm font-semibold text-leaf-900")}>
              {label}
              <input
                defaultValue={value}
                className="mt-2 min-h-10 w-full rounded-md border border-leaf-100 bg-leaf-50/40 px-3 text-sm text-stone-700 outline-none focus:border-leaf-400"
              />
            </label>
          ))}
        </form>
      </Section>

      <Section title="Status Produk" eyebrow="Pipeline dari daftar sampai dibayar">
        <Pipeline steps={farmerPipeline} activeIndex={pipelineIndexForDemo(demoStep)} />
      </Section>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Section title="Informasi Harga" eyebrow="Harga koperasi vs pasar">
          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className="h-80 rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dcefd9" />
                  <XAxis dataKey="day" />
                  <YAxis tickFormatter={(value) => `${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value) => rupiah(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="koperasi" name="Harga koperasi" stroke="#2f6b30" strokeWidth={3} />
                  <Line type="monotone" dataKey="pasar" name="Pasar lokal" stroke="#0ea5e9" strokeWidth={2} />
                  <Line type="monotone" dataKey="tengkulak" name="Tengkulak" stroke="#cf2f2f" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {[
                { label: "Harga koperasi", value: rupiah(32000), tone: "green" as const },
                { label: "Harga pasar lokal", value: rupiah(29500), tone: "blue" as const },
                { label: "Harga tengkulak", value: rupiah(24800), tone: "red" as const },
                { label: "Selisih vs tengkulak", value: "+Rp7.200/kg", tone: "yellow" as const }
              ].map(({ label, value, tone }) => (
                <div key={label} className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-stone-500">{label}</p>
                  <p className="mt-2 text-xl font-black text-leaf-950">{value}</p>
                  <StatusBadge tone={tone}>7 hari</StatusBadge>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Kebutuhan Produksi" eyebrow="Katalog koperasi">
          <div className="space-y-3">
            {productionNeeds.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-3 rounded-lg border border-leaf-100 bg-white p-3 shadow-sm">
                <div>
                  <p className="font-bold text-leaf-950">{item.name}</p>
                  <p className="text-sm text-stone-500">{item.category} - stok {item.stock}</p>
                </div>
                <p className="text-sm font-black text-leaf-900">{rupiah(item.price)}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section title="Riwayat Pembayaran" eyebrow="Settlement pemasok">
        <SimpleTable
          columns={[
            { key: "product", label: "Produk" },
            { key: "volume", label: "Volume" },
            { key: "grade", label: "Grade" },
            { key: "price", label: "Harga/satuan", align: "right" },
            { key: "deduction", label: "Potongan", align: "right" },
            { key: "net", label: "Nilai bersih", align: "right" },
            { key: "status", label: "Status" }
          ]}
          rows={[
            {
              product: "Cabai Merah Sukamaju",
              volume: "100 kg",
              grade: "B",
              price: rupiah(30000),
              deduction: rupiah(0),
              net: rupiah(3000000),
              status: <StatusBadge tone={demoStep >= 11 ? "green" : "yellow"}>{demoStep >= 11 ? "Dibayar" : "Menunggu"}</StatusBadge>
            },
            {
              product: "Tomat Segar",
              volume: "180 kg",
              grade: "A",
              price: rupiah(12000),
              deduction: rupiah(0),
              net: rupiah(2160000),
              status: <StatusBadge>Selesai</StatusBadge>
            },
            {
              product: "Pisang Raja",
              volume: "85 kg",
              grade: "B",
              price: rupiah(15000),
              deduction: rupiah(85000),
              net: rupiah(1190000),
              status: <StatusBadge>Selesai</StatusBadge>
            }
          ]}
        />
      </Section>
    </div>
  );
}

function ManagerDashboard({
  demoStep,
  setDemoTo
}: {
  demoStep: number;
  setDemoTo: (step: number, message: string) => void;
}) {
  return (
    <div className="space-y-6">
      <DashboardHero
        eyebrow="Dashboard pengelola"
        title="Operasi harian KDMP Sukamaju"
        description="Pengelola memantau supplier intake, grading, gudang, cold storage, logistik, product mix, dan pembukuan."
        icon={<Warehouse className="h-6 w-6" />}
      />
      <MetricGrid metrics={managerKpis} />

      <Section title="Supplier Intake" eyebrow="Produk menunggu verifikasi">
        <SimpleTable
          columns={[
            { key: "supplier", label: "Pemasok" },
            { key: "product", label: "Produk" },
            { key: "quantity", label: "Jumlah" },
            { key: "price", label: "Harga harapan", align: "right" },
            { key: "cold", label: "Cold storage" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Aksi" }
          ]}
          rows={intakeItems.map((item, index) => ({
            supplier: item.supplier,
            product: item.product,
            quantity: item.quantity,
            price: rupiah(item.requestedPrice),
            cold: item.coldStorage ? "Ya" : "Tidak",
            status: <StatusBadge>{index === 0 && demoStep >= 2 ? "Terverifikasi" : item.status}</StatusBadge>,
            actions: (
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => setDemoTo(2, `${item.product} diverifikasi oleh pengelola.`)}
                >
                  <Check className="h-3.5 w-3.5" />
                  Verifikasi
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setDemoTo(4, `Penjemputan ${item.product} dijadwalkan.`)}
                >
                  <Truck className="h-3.5 w-3.5" />
                  Jadwal
                </Button>
              </div>
            )
          }))}
        />
      </Section>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Section title="Quality Grading" eyebrow="Parameter mutu">
          <div className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              {["Ukuran", "Berat", "Warna", "Kondisi fisik", "Kesegaran", "Kebersihan", "Kemasan", "Umur simpan"].map((label, index) => (
                <label key={label} className="text-sm font-semibold text-leaf-900">
                  {label}
                  <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue={index === 6 ? 3 : 4}
                    className="mt-2 w-full accent-leaf-700"
                  />
                </label>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {["Grade A", "Grade B", "Grade C", "Ditolak", "Diolah lebih lanjut"].map((grade) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => setDemoTo(3, `Hasil grading ditetapkan: ${grade}.`)}
                  className={cn(
                    "rounded-md border px-3 py-2 text-sm font-bold",
                    grade === "Grade B" ? "border-leaf-300 bg-leaf-700 text-white" : "border-leaf-100 bg-leaf-50 text-leaf-800"
                  )}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Inventory Management" eyebrow="Batch, risiko, harga beli dan jual">
          <SimpleTable
            columns={[
              { key: "product", label: "Produk" },
              { key: "batch", label: "Batch" },
              { key: "grade", label: "Grade" },
              { key: "remaining", label: "Sisa" },
              { key: "expiry", label: "Kedaluwarsa" },
              { key: "location", label: "Lokasi" },
              { key: "prices", label: "Beli/Jual" },
              { key: "risk", label: "Risiko" }
            ]}
            rows={inventoryItems.map((item) => ({
              product: item.product,
              batch: item.batch,
              grade: item.grade,
              remaining: `${item.remaining} ${item.unit}`,
              expiry: item.expiryDate,
              location: item.location,
              prices: `${rupiah(item.buyPrice)} / ${rupiah(item.sellPrice)}`,
              risk: <StatusBadge>{item.risk}</StatusBadge>
            }))}
          />
        </Section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="Warehouse dan Cold Storage" eyebrow="Kapasitas dan biaya simpan">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Gudang kering", value: "71%", helper: "146 batch", icon: Warehouse },
              { label: "Cold storage", value: demoStep >= 6 ? "86%" : "83%", helper: "Suhu 4,1 C", icon: Thermometer },
              { label: "Umur simpan terpendek", value: "Bayam", helper: "kurang dari 24 jam", icon: AlertTriangle },
              { label: "Biaya penyimpanan", value: "Rp18,5 jt", helper: "bulan berjalan", icon: Coins }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
                  <Icon className="mb-3 h-5 w-5 text-leaf-700" />
                  <p className="text-sm font-semibold text-stone-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-black text-leaf-950">{item.value}</p>
                  <p className="text-sm text-stone-600">{item.helper}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Logistics Scheduler" eyebrow="Kalender, kendaraan, rute">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative min-h-64 rounded-lg border border-leaf-100 bg-leaf-50 map-grid p-4 shadow-sm">
              {[
                ["Sukamaju", "left-[20%] top-[25%]", "bg-leaf-700"],
                ["Cipaku", "left-[66%] top-[38%]", "bg-sky-600"],
                ["Bojong", "left-[42%] top-[70%]", "bg-yellow-500"],
                ["KDMP", "left-[48%] top-[45%]", "bg-merah-600"]
              ].map(([label, position, color]) => (
                <div key={label} className={cn("absolute", position)}>
                  <div className={cn("h-4 w-4 rounded-full ring-4 ring-white", color)} />
                  <p className="mt-1 rounded bg-white px-2 py-1 text-xs font-bold text-leaf-900 shadow-sm">{label}</p>
                </div>
              ))}
              <div className="absolute inset-x-10 top-1/2 h-1 rotate-[-12deg] rounded-full bg-leaf-300" />
            </div>
            <SimpleTable
              columns={[
                { key: "date", label: "Waktu" },
                { key: "type", label: "Jenis" },
                { key: "vehicle", label: "Kendaraan" },
                { key: "route", label: "Rute" },
                { key: "status", label: "Status" }
              ]}
              rows={logisticsSchedules.slice(0, 5).map((schedule, index) => ({
                date: schedule.date,
                type: schedule.type,
                vehicle: `${schedule.vehicle} (${schedule.capacity})`,
                route: schedule.route,
                status: <StatusBadge>{index === 0 && demoStep >= 5 ? "Selesai" : schedule.status}</StatusBadge>
              }))}
            />
          </div>
        </Section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Section title="Retail dan Product Mix" eyebrow="Komposisi dan rekomendasi">
          <div className="h-72 rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={retailMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} label>
                  {retailMix.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Rekomendasi Operasional" eyebrow="Aksi hari ini">
          <div className="grid gap-3 sm:grid-cols-2">
            {recommendations.map((recommendation) => {
              const Icon = recommendation.icon;
              return (
                <div key={recommendation.text} className="flex gap-3 rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-leaf-50 text-leaf-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold leading-6 text-stone-700">{recommendation.text}</p>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      <Section title="Pembukuan" eyebrow="Kas, piutang, utang, biaya, laba rugi">
        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <SimpleTable
            columns={[
              { key: "label", label: "Akun" },
              { key: "value", label: "Nilai", align: "right" },
              { key: "note", label: "Catatan" }
            ]}
            rows={[
              { label: "Kas masuk", value: rupiah(31800000), note: "Penjualan hari ini" },
              { label: "Kas keluar", value: rupiah(18400000), note: "Pembelian pemasok dan logistik" },
              { label: "Piutang", value: rupiah(22400000), note: "3 transaksi grosir" },
              { label: "Utang pemasok", value: rupiah(demoStep >= 11 ? 0 : 3000000), note: "Cabai demo 100 kg" },
              { label: "Cicilan", value: rupiah(25000000), note: "Jatuh tempo 5 Juli" },
              { label: "Biaya gaji", value: rupiah(48000000), note: "18 staf dan kurir" },
              { label: "Biaya logistik", value: rupiah(31000000), note: "Bulan berjalan" },
              { label: "Biaya penyimpanan", value: rupiah(18500000), note: "Gudang dan cold storage" },
              { label: "Laba-rugi sementara", value: rupiah(29800000 + (demoStep >= 10 ? 200000 : 0)), note: "Setelah margin cabai demo" },
              { label: "Arus kas", value: rupiah(315000000), note: "Runway 5,1 bulan" }
            ]}
          />
          <div className="h-80 rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { label: "Masuk", value: 31800000 },
                  { label: "Keluar", value: 18400000 },
                  { label: "Piutang", value: 22400000 },
                  { label: "Margin", value: 29800000 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#dcefd9" />
                <XAxis dataKey="label" />
                <YAxis tickFormatter={(value) => `${Number(value) / 1000000} jt`} />
                <Tooltip formatter={(value) => rupiah(Number(value))} />
                <Bar dataKey="value" fill="#2f6b30" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>
    </div>
  );
}

function BuyerDashboardIntro() {
  return (
    <div className="space-y-6">
      <DashboardHero
        eyebrow="Dashboard pembeli"
        title="Marketplace lokal dengan traceability"
        description="Pembeli dapat mencari produk desa, melihat grade, stok, tanggal panen, pemasok, dan asal batch sebelum checkout."
        icon={<ShoppingCart className="h-6 w-6" />}
      />
      <Marketplace
        query=""
        setQuery={() => undefined}
        category="Semua"
        setCategory={() => undefined}
        products={products.slice(0, 8)}
        addToCart={() => undefined}
        openTrace={() => undefined}
        openCheckout={() => undefined}
        cartCount={0}
        compact
      />
    </div>
  );
}

function MemberDashboard({ demoStep }: { demoStep: number }) {
  return (
    <div className="space-y-6">
      <DashboardHero
        eyebrow="Dashboard anggota"
        title="Transparansi koperasi untuk 1.248 anggota"
        description="Anggota melihat pendapatan, biaya, kewajiban, penggunaan dana, agenda rapat, voting digital, dan usulan yang sedang ditindaklanjuti."
        icon={<Users className="h-6 w-6" />}
      />
      <MetricGrid
        metrics={[
          { label: "Jumlah anggota", value: "1.248", helper: "786 aktif bertransaksi", tone: "green" },
          { label: "Transaksi anggota", value: "46.280", helper: "bulan berjalan", tone: "green" },
          { label: "Keuntungan koperasi", value: "Rp29,8 jt", helper: demoStep >= 10 ? "termasuk margin cabai demo" : "sebelum transaksi demo", tone: "green" },
          { label: "Pembagian hasil", value: "Rp38 jt", helper: "dana cadangan dan SHU", tone: "green" },
          { label: "Kewajiban koperasi", value: "Rp25 jt", helper: "cicilan bulanan", tone: "yellow" },
          { label: "Agenda rapat", value: "3", helper: "2 agenda terbuka", tone: "yellow" }
        ]}
      />
      <Section title="Transparansi Keuangan" eyebrow="Sumber pendapatan dan penggunaan dana">
        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="h-80 rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={memberFinance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dcefd9" />
                <XAxis dataKey="label" hide />
                <YAxis tickFormatter={(value) => `${Number(value) / 1000000} jt`} />
                <Tooltip formatter={(value) => rupiah(Number(value))} />
                <Bar dataKey="value" fill="#2f6b30" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <SimpleTable
            columns={[
              { key: "label", label: "Komponen" },
              { key: "value", label: "Nilai", align: "right" },
              { key: "note", label: "Keterbukaan" }
            ]}
            rows={memberFinance.map((item) => ({
              label: item.label,
              value: rupiah(item.value),
              note: item.label.includes("Pembelian") ? "Manfaat langsung ke pemasok anggota" : "Dipublikasi mingguan"
            }))}
          />
        </div>
      </Section>

      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="Voting Digital" eyebrow="Agenda anggota">
          <div className="space-y-3">
            {votingAgendas.map((agenda) => {
              const total = agenda.yes + agenda.no + agenda.abstain;
              return (
                <div key={agenda.id} className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-leaf-950">{agenda.title}</p>
                      <p className="text-sm text-stone-500">Batas suara {agenda.dueDate}</p>
                    </div>
                    <StatusBadge>{agenda.status}</StatusBadge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="rounded-md bg-leaf-50 p-3 font-bold text-leaf-800">Setuju {percent((agenda.yes / total) * 100, 0)}</div>
                    <div className="rounded-md bg-merah-50 p-3 font-bold text-merah-700">Tidak {percent((agenda.no / total) * 100, 0)}</div>
                    <div className="rounded-md bg-stone-100 p-3 font-bold text-stone-700">Abstain {percent((agenda.abstain / total) * 100, 0)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
        <Section title="Forum Usulan" eyebrow="Dukungan, komentar, tindak lanjut">
          <div className="space-y-3">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-leaf-950">{proposal.title}</p>
                    <p className="text-sm text-stone-500">oleh {proposal.proposer}</p>
                  </div>
                  <StatusBadge>{proposal.status}</StatusBadge>
                </div>
                <div className="mt-3 flex gap-3 text-sm text-stone-600">
                  <span>{proposal.support} dukungan</span>
                  <span>{proposal.comments} komentar</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function RegionalDashboard() {
  return (
    <div className="space-y-6">
      <DashboardHero
        eyebrow="Dashboard wilayah"
        title="Manajer Wilayah / Agrinas"
        description="Melihat status koperasi lintas wilayah, risiko operasional, subsidi, stok rusak, cicilan, dan kesiapan pengalihan operasional."
        icon={<MapPin className="h-6 w-6" />}
      />
      <MetricGrid metrics={regionKpis} />
      <Section title="Peta Status Koperasi" eyebrow="Hijau sehat, kuning pendampingan, merah berisiko, abu-abu belum aktif">
        <div className="relative min-h-[360px] rounded-lg border border-leaf-100 bg-leaf-50 p-5 map-grid shadow-sm">
          {cooperativeComparisons.map((coop, index) => {
            const positions = [
              "left-[52%] top-[44%]",
              "left-[36%] top-[28%]",
              "left-[66%] top-[25%]",
              "left-[72%] top-[62%]",
              "left-[28%] top-[68%]",
              "left-[46%] top-[78%]"
            ];
            const color =
              coop.status === "Sehat"
                ? "bg-leaf-700"
                : coop.status === "Perlu Pendampingan"
                  ? "bg-yellow-500"
                  : coop.status === "Berisiko"
                    ? "bg-merah-600"
                    : "bg-stone-400";
            return (
              <div key={coop.id} className={cn("absolute", positions[index])}>
                <div className={cn("h-5 w-5 rounded-full ring-4 ring-white", color)} />
                <p className="mt-2 max-w-36 rounded bg-white px-2 py-1 text-xs font-bold text-leaf-900 shadow-sm">
                  {coop.name}
                </p>
              </div>
            );
          })}
        </div>
      </Section>
      <Section title="Perbandingan Koperasi" eyebrow="Omzet, margin, produk lokal, turnover, shrinkage, anggota, runway, DSCR">
        <SimpleTable
          columns={[
            { key: "name", label: "Koperasi" },
            { key: "status", label: "Status" },
            { key: "revenue", label: "Omzet", align: "right" },
            { key: "margin", label: "Margin", align: "right" },
            { key: "local", label: "Produk lokal", align: "right" },
            { key: "turnover", label: "Turnover", align: "right" },
            { key: "shrinkage", label: "Shrinkage", align: "right" },
            { key: "members", label: "Anggota", align: "right" },
            { key: "runway", label: "Runway", align: "right" },
            { key: "dscr", label: "DSCR", align: "right" },
            { key: "readiness", label: "Mandiri", align: "right" }
          ]}
          rows={cooperativeComparisons.map((coop) => ({
            name: coop.name,
            status: <StatusBadge>{coop.status}</StatusBadge>,
            revenue: rupiah(coop.revenue),
            margin: percent(coop.margin),
            local: percent(coop.localShare, 0),
            turnover: `${coop.turnover}x`,
            shrinkage: percent(coop.shrinkage),
            members: coop.activeMembers.toLocaleString("id-ID"),
            runway: `${coop.cashRunway} bln`,
            dscr: coop.dscr.toFixed(1),
            readiness: coop.readiness
          }))}
        />
      </Section>
      <Section title="Intervention Recommendation" eyebrow="Rekomendasi pendampingan wilayah">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Pendampingan retail",
            "Audit stok",
            "Pelatihan pembukuan",
            "Restrukturisasi komoditas",
            "Optimasi logistik",
            "Pelatihan anggota",
            "Audit tata kelola"
          ].map((item, index) => (
            <div key={item} className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-leaf-50 text-leaf-700">
                {index + 1}
              </div>
              <p className="font-bold text-leaf-950">{item}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Prioritas untuk koperasi dengan skor readiness di bawah {index < 3 ? 60 : 70}.
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function GovernmentDashboard({
  supportInputs,
  setSupportInputs,
  supportOutputs
}: {
  supportInputs: SupportInputs;
  setSupportInputs: React.Dispatch<React.SetStateAction<SupportInputs>>;
  supportOutputs: {
    surplusAfterSupportEnds: number;
    surplusWithSupport: number;
    runway: number;
  };
}) {
  return (
    <div className="space-y-6">
      <DashboardHero
        eyebrow="Executive dashboard"
        title="Pemerintah / High-Level Management"
        description="Ringkasan dampak nasional, risiko program, kewajiban pembiayaan, subsidi, koperasi mandiri, dan koperasi berisiko."
        icon={<Landmark className="h-6 w-6" />}
      />
      <MetricGrid metrics={governmentKpis} />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Section title="Indikator Dampak" eyebrow="Ekonomi anggota dan desa">
          <div className="grid gap-3 sm:grid-cols-2">
            {impactIndicators.map((indicator) => (
              <div key={indicator.label} className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-stone-500">{indicator.label}</p>
                <p className="mt-2 text-3xl font-black text-leaf-900">{indicator.value}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Risiko Program" eyebrow="Yang perlu dimonitor sebelum subsidi selesai">
          <div className="grid gap-3 sm:grid-cols-2">
            {programRisks.map((risk) => (
              <div key={risk} className="flex gap-3 rounded-lg border border-merah-100 bg-white p-4 shadow-sm">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-merah-600" />
                <p className="text-sm font-bold leading-6 text-stone-700">{risk}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section title="What Happens After Government Support Ends?" eyebrow="Simulasi keberlanjutan">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-3 rounded-lg border border-leaf-100 bg-white p-4 shadow-sm sm:grid-cols-2">
            {[
              ["Omzet bulanan", "revenue"],
              ["Margin (%)", "margin"],
              ["Biaya gaji", "payroll"],
              ["Biaya logistik", "logistics"],
              ["Biaya penyimpanan", "storage"],
              ["Cicilan bulanan", "installment"],
              ["Subsidi pemerintah", "subsidy"]
            ].map(([label, key]) => (
              <label key={key} className="text-sm font-semibold text-leaf-900">
                {label}
                <input
                  type="number"
                  value={supportInputs[key as keyof typeof supportInputs]}
                  onChange={(event) =>
                    setSupportInputs((current) => ({
                      ...current,
                      [key]: Number(event.target.value)
                    }))
                  }
                  className="mt-2 min-h-10 w-full rounded-md border border-leaf-100 bg-leaf-50/50 px-3 text-sm outline-none focus:border-leaf-400"
                />
              </label>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-leaf-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-stone-500">Surplus dengan subsidi</p>
              <p className="mt-3 text-3xl font-black text-leaf-900">{rupiah(supportOutputs.surplusWithSupport)}</p>
            </div>
            <div className="rounded-lg border border-leaf-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-stone-500">Surplus/defisit tanpa subsidi</p>
              <p className={cn("mt-3 text-3xl font-black", supportOutputs.surplusAfterSupportEnds >= 0 ? "text-leaf-900" : "text-merah-700")}>
                {rupiah(supportOutputs.surplusAfterSupportEnds)}
              </p>
            </div>
            <div className="rounded-lg border border-leaf-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-stone-500">Cash runway</p>
              <p className="mt-3 text-3xl font-black text-leaf-900">{supportOutputs.runway.toFixed(1)} bulan</p>
            </div>
            <div className="rounded-lg border border-leaf-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-stone-500">Status keberlanjutan</p>
              <p className="mt-3 text-3xl font-black text-leaf-900">
                {supportOutputs.surplusAfterSupportEnds >= 0 ? "Aman" : supportOutputs.runway >= 3 ? "Waspada" : "Berisiko"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <StatusBadge tone={supportOutputs.surplusAfterSupportEnds >= supportInputs.payroll ? "green" : "yellow"}>
                  Gaji {supportOutputs.surplusAfterSupportEnds >= supportInputs.payroll ? "mampu" : "perlu omzet"}
                </StatusBadge>
                <StatusBadge tone={supportOutputs.surplusAfterSupportEnds >= supportInputs.installment ? "green" : "red"}>
                  Cicilan {supportOutputs.surplusAfterSupportEnds >= supportInputs.installment ? "mampu" : "berisiko"}
                </StatusBadge>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Marketplace({
  query,
  setQuery,
  category,
  setCategory,
  products: productList,
  addToCart,
  openTrace,
  openCheckout,
  cartCount,
  compact = false
}: {
  query: string;
  setQuery: (query: string) => void;
  category: ProductCategory | "Semua";
  setCategory: (category: ProductCategory | "Semua") => void;
  products: Product[];
  addToCart: (product: Product) => void;
  openTrace: (product: Product) => void;
  openCheckout: () => void;
  cartCount: number;
  compact?: boolean;
}) {
  const categories: Array<ProductCategory | "Semua"> = [
    "Semua",
    "Sayur",
    "Buah",
    "Beras",
    "Ikan",
    "Produk Olahan",
    "UMKM",
    "Sembako",
    "Sarana Produksi"
  ];
  return (
    <div className="space-y-6">
      {!compact ? (
        <DashboardHero
          eyebrow="Marketplace konsumen"
          title="Belanja produk lokal yang bisa dilacak"
          description="Pembeli melihat produk anggota koperasi, asal desa, grade, stok, tanggal panen, kesegaran, pemasok, dan opsi kirim atau ambil di koperasi."
          icon={<Store className="h-6 w-6" />}
        />
      ) : null}
      <div className="flex flex-col gap-3 rounded-lg border border-leaf-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari produk, pemasok, desa, atau kategori"
            className="min-h-11 w-full rounded-md border border-leaf-100 bg-leaf-50/50 pl-10 pr-3 text-sm outline-none focus:border-leaf-400"
          />
        </label>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-soft">
          <Filter className="h-4 w-4 shrink-0 text-leaf-700" />
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "min-h-10 shrink-0 rounded-md border px-3 text-sm font-bold",
                category === item ? "border-leaf-700 bg-leaf-700 text-white" : "border-leaf-100 bg-white text-leaf-800"
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <Button type="button" onClick={openCheckout} disabled={!cartCount && !compact}>
          <ShoppingCart className="h-4 w-4" />
          Checkout {cartCount ? `(${cartCount})` : ""}
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} openTrace={openTrace} compact={compact} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  addToCart,
  openTrace,
  compact
}: {
  product: Product;
  addToCart: (product: Product) => void;
  openTrace: (product: Product) => void;
  compact?: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  return (
    <article className="overflow-hidden rounded-lg border border-leaf-100 bg-white shadow-sm">
      <div className="relative h-44 bg-leaf-100">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center bg-leaf-700 text-4xl font-black text-white">
            {product.name.charAt(0)}
          </div>
        )}
        {product.memberProduct ? (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-black text-leaf-800 shadow-sm">
            Produk Anggota Koperasi
          </span>
        ) : null}
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-stone-500">{product.category}</p>
            <h3 className="mt-1 text-base font-black text-leaf-950">{product.name}</h3>
          </div>
          <StatusBadge tone={product.grade === "A" ? "green" : product.grade === "B" ? "yellow" : "orange"}>
            Grade {product.grade}
          </StatusBadge>
        </div>
        <p className="text-sm leading-6 text-stone-600">
          {product.originVillage} - {product.supplierName}
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md bg-leaf-50 p-2">
            <p className="font-bold text-leaf-900">{rupiah(product.price)}</p>
            <p className="text-stone-500">per {product.unit}</p>
          </div>
          <div className="rounded-md bg-leaf-50 p-2">
            <p className="font-bold text-leaf-900">{product.stock.toLocaleString("id-ID")}</p>
            <p className="text-stone-500">stok tersedia</p>
          </div>
          <div className="rounded-md bg-stone-50 p-2">
            <p className="font-bold text-leaf-900">{product.harvestDate}</p>
            <p className="text-stone-500">tanggal panen</p>
          </div>
          <div className="rounded-md bg-stone-50 p-2">
            <p className="font-bold text-leaf-900">{product.freshness}</p>
            <p className="text-stone-500">estimasi segar</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="button" size="sm" onClick={() => addToCart(product)} disabled={compact}>
            <ShoppingCart className="h-3.5 w-3.5" />
            Keranjang
          </Button>
          <Button type="button" size="sm" variant="secondary" onClick={() => openTrace(product)} disabled={compact}>
            <Route className="h-3.5 w-3.5" />
            Trace
          </Button>
        </div>
      </div>
    </article>
  );
}

function IndependenceDashboard({ demoStep }: { demoStep: number }) {
  const score = cooperativeProfile.independenceScore + (demoStep >= 14 ? 2 : 0);
  const lowest = [...independenceComponents].sort((a, b) => a.score - b.score).slice(0, 3);
  const category =
    score < 40
      ? "Belum Siap"
      : score < 60
        ? "Perlu Pendampingan Intensif"
        : score < 80
          ? "Menuju Mandiri"
          : "Siap Mandiri";
  return (
    <div className="space-y-6">
      <DashboardHero
        eyebrow="Dashboard kemandirian"
        title="Cooperative Independence Score"
        description="Skor 0-100 untuk melihat kesiapan koperasi berjalan tanpa ketergantungan subsidi dan pendampingan intensif."
        icon={<Gauge className="h-6 w-6" />}
      />
      <Section title="Skor Kemandirian" eyebrow="Kategori 60-79: Menuju Mandiri">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="flex flex-col items-center justify-center rounded-lg border border-leaf-100 bg-white p-6 text-center shadow-sm">
            <ScoreRing score={score} label="dari 100" />
            <p className="mt-4 text-2xl font-black text-leaf-950">{category}</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Demo cabai meningkatkan omzet lokal dan memperbaiki skor bila transaksi selesai penuh.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {independenceComponents.map((component) => (
              <div key={component.label} className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-leaf-950">{component.label}</p>
                  <span className="font-black text-leaf-800">{component.score}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-stone-100">
                  <div className="h-2 rounded-full bg-leaf-700" style={{ width: `${component.score}%` }} />
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-600">{component.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section title="Rekomendasi Otomatis" eyebrow="Berdasarkan skor terendah">
        <div className="grid gap-3 md:grid-cols-3">
          {lowest.map((item) => (
            <div key={item.label} className="rounded-lg border border-yellow-200 bg-white p-4 shadow-sm">
              <StatusBadge tone="yellow">Prioritas {item.score}</StatusBadge>
              <h3 className="mt-3 font-black text-leaf-950">{item.label}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.recommendation}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function VillagePotential() {
  return (
    <div className="space-y-6">
      <DashboardHero
        eyebrow="Potensi ekonomi desa"
        title="Desa Sukamaju"
        description="Desa berbasis pertanian dan UMKM pangan dengan cabai, tomat, beras, telur, keripik singkong, dan kopi lokal sebagai komoditas unggulan."
        icon={<Home className="h-6 w-6" />}
      />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Section title="Kalender Panen" eyebrow="Indeks produksi bulanan">
          <div className="h-96 rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={harvestCalendar}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dcefd9" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="cabai" stackId="1" stroke="#cf2f2f" fill="#cf2f2f" name="Cabai" />
                <Area type="monotone" dataKey="tomat" stackId="1" stroke="#f97316" fill="#f97316" name="Tomat" />
                <Area type="monotone" dataKey="beras" stackId="1" stroke="#eab308" fill="#eab308" name="Beras" />
                <Area type="monotone" dataKey="telur" stackId="1" stroke="#2f6b30" fill="#2f6b30" name="Telur" />
                <Area type="monotone" dataKey="kopi" stackId="1" stroke="#7c2d12" fill="#7c2d12" name="Kopi" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>
        <Section title="Rekomendasi Model Usaha" eyebrow="Localized business">
          <div className="space-y-3">
            {[
              ["Kapasitas produksi", "Cabai 2,4 ton/bulan, beras 7 ton/bulan, telur 4.200 butir/bulan."],
              ["Jumlah produsen", "186 pemasok aktif, termasuk 42 UMKM pangan."],
              ["Potensi permintaan", "Restoran lokal, pasar mitra, sekolah, gerai KDMP, dan marketplace desa."],
              ["Risiko produk", "Cabai, tomat, ikan, dan sayuran daun cepat rusak bila cold chain lemah."],
              ["Kebutuhan penyimpanan", "Cold storage kecil, rak buah berventilasi, gudang kering untuk beras dan UMKM."],
              ["Pasar potensial", "Bandung Timur, Cileunyi, katering sekolah, toko oleh-oleh, komunitas kopi."]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-leaf-900">{label}</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">{value}</p>
              </div>
            ))}
            <div className="rounded-lg border border-leaf-200 bg-leaf-50 p-5">
              <p className="font-bold leading-7 text-leaf-950">
                Desa Sukamaju sebaiknya mengembangkan model koperasi berbasis aggregation hub hasil pertanian,
                cold storage skala kecil, penjualan sarana produksi, serta pemasaran produk olahan UMKM.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Academy() {
  return (
    <div className="space-y-6">
      <DashboardHero
        eyebrow="Akademi Koperasi"
        title="Literasi Gen-Z dan Gen-Alpha"
        description="Kelas singkat, simulasi stok, kuis, misi mingguan, leaderboard, dan program relawan digital desa."
        icon={<BookOpenCheck className="h-6 w-6" />}
      />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Section title="Modul Belajar" eyebrow="Apa yang dipelajari">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Apa itu koperasi",
              "Bagaimana koperasi menghasilkan keuntungan",
              "Perbedaan koperasi dan retail",
              "Pentingnya produk lokal",
              "Simulasi pengelolaan stok",
              "Simulasi pembagian hasil"
            ].map((module) => (
              <div key={module} className="flex gap-3 rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
                <BookOpenCheck className="h-5 w-5 shrink-0 text-leaf-700" />
                <p className="font-bold text-leaf-950">{module}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Gamifikasi" eyebrow="Poin, badge, misi, kuis, leaderboard">
          <div className="grid gap-3 md:grid-cols-2">
            {academyMissions.map((mission) => (
              <div key={mission.id} className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-leaf-950">{mission.title}</p>
                    <p className="text-sm text-stone-500">Badge: {mission.badge}</p>
                  </div>
                  <StatusBadge>{mission.status}</StatusBadge>
                </div>
                <p className="mt-4 text-2xl font-black text-leaf-800">{mission.points} poin</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
      <Section title="Leaderboard Relawan Digital Desa" eyebrow="Tantangan promosi produk lokal">
        <SimpleTable
          columns={[
            { key: "rank", label: "Peringkat" },
            { key: "name", label: "Nama" },
            { key: "mission", label: "Misi unggulan" },
            { key: "points", label: "Poin", align: "right" }
          ]}
          rows={[
            { rank: "1", name: "Nadia", mission: "Promosi 12 produk anggota", points: "1.820" },
            { rank: "2", name: "Rizky", mission: "Foto katalog UMKM", points: "1.640" },
            { rank: "3", name: "Alya", mission: "Kuis pembagian hasil", points: "1.510" },
            { rank: "4", name: "Fajar", mission: "Simulasi stok cabai", points: "1.360" }
          ]}
        />
      </Section>
    </div>
  );
}

function DemoScenario({
  demoStep,
  advanceDemo,
  resetDemo
}: {
  demoStep: number;
  advanceDemo: () => void;
  resetDemo: () => void;
}) {
  const activePipeline = pipelineIndexForDemo(demoStep);
  const marketplaceStock = 640 + (demoStep >= 7 ? 500 : 0) - (demoStep >= 8 ? 100 : 0);
  return (
    <div className="space-y-6">
      <DashboardHero
        eyebrow="Alur demo utama"
        title="Dari 500 kg cabai sampai laporan transparan"
        description="Skenario ini menghubungkan pemasok, pengelola, gudang, marketplace, pembeli, pembayaran, pembukuan, anggota, dan manajemen."
        icon={<Route className="h-6 w-6" />}
      />
      <div className="rounded-lg border border-leaf-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-merah-600">Progress skenario</p>
            <h2 className="mt-1 text-2xl font-black text-leaf-950">
              {demoStep} dari {demoSteps.length} langkah selesai
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={advanceDemo} disabled={demoStep >= demoSteps.length}>
              <ArrowRight className="h-4 w-4" />
              Jalankan Langkah Berikutnya
            </Button>
            <Button type="button" variant="secondary" onClick={resetDemo}>
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <Pipeline steps={farmerPipeline} activeIndex={activePipeline} />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Section title="Timeline Operasional" eyebrow="14 langkah demo">
          <div className="space-y-3">
            {demoSteps.map((step, index) => (
              <div key={step} className="flex gap-3">
                <div
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-black",
                    index < demoStep ? "bg-leaf-700 text-white" : "bg-stone-100 text-stone-500"
                  )}
                >
                  {index < demoStep ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <div className="flex-1 rounded-lg border border-leaf-100 bg-white p-3 shadow-sm">
                  <p className={cn("font-semibold", index < demoStep ? "text-leaf-950" : "text-stone-500")}>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Dampak Langsung" eyebrow="Produk, uang, dan laporan berubah bersama">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Status cabai", value: activePipeline >= 8 ? "Dibayar" : farmerPipeline[Math.max(activePipeline, 0)] ?? "Belum terdaftar", icon: PackageCheck },
              { label: "Stok marketplace", value: `${marketplaceStock.toLocaleString("id-ID")} kg`, icon: Store },
              { label: "Pesanan restoran", value: demoStep >= 8 ? "100 kg" : "Belum ada", icon: ShoppingCart },
              { label: "Pembayaran petani", value: demoStep >= 11 ? rupiah(3000000) : "Menunggu", icon: WalletCards },
              { label: "Margin koperasi", value: demoStep >= 10 ? rupiah(200000) : rupiah(0), icon: CircleDollarSign },
              { label: "Skor kemandirian", value: demoStep >= 14 ? "69/100" : "67/100", icon: Gauge }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
                  <Icon className="mb-3 h-5 w-5 text-leaf-700" />
                  <p className="text-sm font-bold text-stone-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-black text-leaf-950">{item.value}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-lg border border-leaf-200 bg-leaf-50 p-4">
            <p className="text-sm font-bold leading-6 text-leaf-950">
              Setelah transaksi selesai, anggota dapat melihat bahwa produk anggota dibeli koperasi, dijual ke pembeli,
              pemasok dibayar, margin masuk pembukuan, dan manajemen melihat dampaknya pada omzet lokal serta
              kemandirian.
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}

function TraceabilityModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const traceItems = [
    ["Petani", product.trace.farmer, Sprout],
    ["Tanggal Panen", product.trace.harvest, CalendarClock],
    ["Grading", product.trace.grading, ClipboardCheck],
    ["Gudang", product.trace.warehouse, Warehouse],
    ["Pengiriman", product.trace.delivery, Truck],
    ["Konsumen", product.trace.consumer, Store]
  ] as const;
  return (
    <Modal title={`Traceability - ${product.name}`} onClose={onClose}>
      <div className="grid gap-3 md:grid-cols-6">
        {traceItems.map(([label, value, Icon], index) => (
          <div key={label} className="relative rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
            <Icon className="mb-3 h-5 w-5 text-leaf-700" />
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-stone-500">{label}</p>
            <p className="mt-2 text-sm font-bold leading-6 text-leaf-950">{value}</p>
            {index < traceItems.length - 1 ? (
              <ChevronRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-leaf-400 md:block" />
            ) : null}
          </div>
        ))}
      </div>
    </Modal>
  );
}

function CheckoutModal({
  cart,
  cartTotal,
  onClose,
  onCheckout
}: {
  cart: string[];
  cartTotal: number;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const selectedProducts = cart.map((id) => products.find((product) => product.id === id)).filter(Boolean) as Product[];
  return (
    <Modal title="Checkout Marketplace Desa" onClose={onClose}>
      <div className="space-y-4">
        {selectedProducts.length ? (
          selectedProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className="flex items-center justify-between gap-3 rounded-lg border border-leaf-100 bg-white p-3">
              <div>
                <p className="font-bold text-leaf-950">{product.name}</p>
                <p className="text-sm text-stone-500">{product.supplierName} - {product.grade}</p>
              </div>
              <p className="font-black text-leaf-900">{rupiah(product.price)}</p>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-leaf-100 bg-leaf-50 p-4 text-sm font-semibold text-leaf-900">
            Keranjang demo kosong. Checkout tetap dapat dijalankan sebagai simulasi pesanan grosir 100 kg cabai oleh restoran lokal.
          </div>
        )}
        <div className="grid gap-3 md:grid-cols-3">
          {["Kirim ke alamat", "Ambil di koperasi", "Pemesanan jumlah besar"].map((method) => (
            <label key={method} className="flex items-center gap-2 rounded-md border border-leaf-100 bg-white p-3 text-sm font-bold text-leaf-900">
              <input type="radio" name="delivery" defaultChecked={method === "Kirim ke alamat"} className="accent-leaf-700" />
              {method}
            </label>
          ))}
        </div>
        <div className="rounded-lg border border-leaf-200 bg-leaf-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-stone-600">Total estimasi</p>
            <p className="text-2xl font-black text-leaf-950">{rupiah(cartTotal || 3200000)}</p>
          </div>
          <p className="mt-2 text-sm text-stone-600">Metode pembayaran demo: transfer koperasi, QRIS gerai, atau invoice grosir.</p>
        </div>
        <Button type="button" onClick={onCheckout} className="w-full">
          <Send className="h-4 w-4" />
          Selesaikan Pesanan Demo
        </Button>
      </div>
    </Modal>
  );
}

function DashboardHero({
  eyebrow,
  title,
  description,
  icon
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-leaf-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-merah-600">{eyebrow}</p>
          <h1 className="mt-2 text-3xl font-black leading-tight text-leaf-950">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-stone-600 sm:text-base">{description}</p>
        </div>
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-leaf-800 text-white shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default App;
