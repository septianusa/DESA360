import type { ReactNode } from "react";
import { CheckCircle2, ChevronRight, X } from "lucide-react";
import type { Metric, StatusTone } from "../types/desa360";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const toneClasses: Record<StatusTone, string> = {
  green: "border-leaf-200 bg-leaf-50 text-leaf-800",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
  yellow: "border-yellow-200 bg-yellow-50 text-yellow-800",
  orange: "border-orange-200 bg-orange-50 text-orange-800",
  red: "border-red-200 bg-red-50 text-red-800",
  gray: "border-stone-200 bg-stone-50 text-stone-700",
  blue: "border-sky-200 bg-sky-50 text-sky-800"
};

export function toneForStatus(status: string): StatusTone {
  if (["Sehat", "Aktif", "Aman", "Selesai", "Terverifikasi", "Disetujui"].includes(status)) {
    return "green";
  }
  if (["Perlu Pendampingan", "Menunggu", "Berlangsung", "Dikaji", "Perlu Dijual Cepat"].includes(status)) {
    return "yellow";
  }
  if (["Berisiko", "Rusak", "Hampir Kedaluwarsa"].includes(status)) {
    return "red";
  }
  if (["Perbaikan Kemasan", "Diproses", "Berjalan", "Ditindaklanjuti"].includes(status)) {
    return "orange";
  }
  return "gray";
}

export function StatusBadge({ children, tone }: { children: ReactNode; tone?: StatusTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold leading-none",
        toneClasses[tone ?? toneForStatus(String(children))]
      )}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        size === "sm" ? "min-h-9 px-3 text-xs" : "min-h-10 px-4 text-sm",
        variant === "primary" &&
          "bg-leaf-700 text-white shadow-sm hover:bg-leaf-800 active:bg-leaf-900",
        variant === "secondary" &&
          "border border-leaf-200 bg-white text-leaf-800 hover:border-leaf-300 hover:bg-leaf-50",
        variant === "ghost" && "text-leaf-800 hover:bg-leaf-50",
        variant === "danger" && "bg-merah-600 text-white hover:bg-merah-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Section({
  title,
  eyebrow,
  actions,
  children,
  className
}: {
  title: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-t border-leaf-100 py-6", className)}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.08em] text-merah-600">{eyebrow}</p> : null}
          <h2 className="mt-1 text-lg font-bold text-leaf-950">{title}</h2>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function MetricCard({ metric, icon }: { metric: Metric; icon?: ReactNode }) {
  return (
    <div className="rounded-lg border border-leaf-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">{metric.label}</p>
          <p className="mt-2 break-words text-2xl font-bold text-leaf-950">{metric.value}</p>
        </div>
        {icon ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-leaf-50 text-leaf-700">
            {icon}
          </div>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-stone-600">
        {metric.trend ? <StatusBadge tone={metric.tone ?? "green"}>{metric.trend}</StatusBadge> : null}
        {metric.helper ? <span>{metric.helper}</span> : null}
      </div>
    </div>
  );
}

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} metric={metric} />
      ))}
    </div>
  );
}

export function Pipeline({ steps, activeIndex }: { steps: string[]; activeIndex: number }) {
  return (
    <div className="overflow-x-auto pb-2 scrollbar-soft">
      <div className="flex min-w-max items-center gap-2">
        {steps.map((step, index) => {
          const complete = index <= activeIndex;
          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex min-h-12 min-w-32 items-center justify-center rounded-md border px-3 text-center text-xs font-bold",
                  complete
                    ? "border-leaf-300 bg-leaf-700 text-white"
                    : "border-stone-200 bg-stone-50 text-stone-500"
                )}
              >
                {step}
              </div>
              {index < steps.length - 1 ? <ChevronRight className="h-4 w-4 text-stone-300" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FlowDiagram({ items }: { items: string[] }) {
  return (
    <div className="grid gap-2 md:grid-cols-7">
      {items.map((item, index) => (
        <div key={item} className="flex items-center gap-2 md:block">
          <div className="flex min-h-20 flex-1 items-center justify-center rounded-md border border-leaf-200 bg-white p-3 text-center text-sm font-bold text-leaf-900 shadow-sm">
            {item}
          </div>
          {index < items.length - 1 ? <ChevronRight className="h-5 w-5 shrink-0 text-leaf-500 md:hidden" /> : null}
        </div>
      ))}
    </div>
  );
}

export function Modal({
  title,
  children,
  onClose
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-leaf-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-soft">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-leaf-100 bg-white p-4">
          <h2 className="text-lg font-bold text-leaf-950">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-stone-500 hover:bg-stone-100"
            aria-label="Tutup modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}

export function Toast({
  message,
  onClose
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-sm items-start gap-3 rounded-lg border border-leaf-200 bg-white p-4 text-sm text-leaf-950 shadow-soft">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-700" />
      <div className="flex-1">{message}</div>
      <button
        type="button"
        onClick={onClose}
        className="flex h-7 w-7 items-center justify-center rounded-md text-stone-500 hover:bg-stone-100"
        aria-label="Tutup notifikasi"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function SimpleTable({
  columns,
  rows,
  className
}: {
  columns: Array<{ key: string; label: string; align?: "left" | "right" | "center" }>;
  rows: Array<Record<string, ReactNode>>;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto rounded-lg border border-leaf-100 scrollbar-soft", className)}>
      <table className="min-w-full divide-y divide-leaf-100 text-sm">
        <thead className="bg-leaf-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "whitespace-nowrap px-3 py-3 text-xs font-bold uppercase tracking-[0.08em] text-leaf-800",
                  column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left"
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-leaf-100 bg-white">
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-leaf-50/60">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "whitespace-nowrap px-3 py-3 text-stone-700",
                    column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left"
                  )}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ScoreRing({
  score,
  label,
  size = "lg"
}: {
  score: number;
  label: string;
  size?: "sm" | "lg";
}) {
  const degree = Math.round((score / 100) * 360);
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-full",
        size === "lg" ? "h-44 w-44" : "h-24 w-24"
      )}
      style={{
        background: `conic-gradient(#2f6b30 ${degree}deg, #e7ece2 ${degree}deg)`
      }}
    >
      <div
        className={cn(
          "grid place-items-center rounded-full bg-white text-center",
          size === "lg" ? "h-36 w-36" : "h-20 w-20"
        )}
      >
        <div>
          <p className={cn("font-black text-leaf-900", size === "lg" ? "text-4xl" : "text-xl")}>{score}</p>
          <p className="px-2 text-xs font-semibold text-stone-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
