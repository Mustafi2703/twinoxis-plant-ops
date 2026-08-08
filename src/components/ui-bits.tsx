import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({ className, children, title, subtitle, action }: { className?: string; children: ReactNode; title?: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className={cn("glass-panel rounded-xl hover-glow p-4", className)}>
      {(title || action) && (
        <div className="flex items-start mb-3">
          <div>
            {title && <div className="font-display font-semibold tracking-tight">{title}</div>}
            {subtitle && <div className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</div>}
          </div>
          {action && <div className="ml-auto">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

export function StatusDot({ color = "success" }: { color?: "success" | "warning" | "danger" | "primary" }) {
  const map = { success: "text-success bg-success", warning: "text-warning bg-warning", danger: "text-destructive bg-destructive", primary: "text-primary bg-primary" };
  return <span className={cn("status-dot", map[color])} />;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "In-Process": "bg-primary/15 text-primary border-primary/30",
    "QC Hold": "bg-warning/15 text-warning border-warning/30",
    "Released": "bg-success/15 text-success border-success/30",
    "Rejected": "bg-destructive/15 text-destructive border-destructive/30",
    "Running": "bg-success/15 text-success border-success/30",
    "Idle": "bg-muted text-muted-foreground border-border",
    "Warning": "bg-warning/15 text-warning border-warning/30",
    "Maintenance": "bg-secondary/20 text-secondary border-secondary/30",
    "Predictive Alert": "bg-warning/15 text-warning border-warning/30",
    "Fault": "bg-destructive/15 text-destructive border-destructive/30",
  };
  return <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border font-mono", map[status] ?? "bg-muted text-muted-foreground border-border")}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />{status}
  </span>;
}

export function KpiCard({ label, value, suffix, delta, icon: Icon, accent = "primary" }: { label: string; value: ReactNode; suffix?: string; delta?: string; icon?: any; accent?: "primary" | "warning" | "success" | "danger" | "secondary" }) {
  const colorMap = { primary: "text-primary", warning: "text-warning", success: "text-success", danger: "text-destructive", secondary: "text-secondary" };
  return (
    <div className="glass-panel hover-glow rounded-xl p-4">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
        {Icon && <Icon size={14} className={colorMap[accent]} />}
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className={cn("font-display text-3xl font-bold tabular-nums", colorMap[accent])}>{value}</span>
        {suffix && <span className="text-muted-foreground text-sm">{suffix}</span>}
      </div>
      {delta && <div className="mt-1 text-[11px] font-mono text-muted-foreground">{delta}</div>}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex items-end">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action && <div className="ml-auto">{action}</div>}
    </div>
  );
}

export function RoleGate({ module, children }: { module: string; children: ReactNode }) {
  // Simple visibility note; actual gating done in layout sidebar
  return <>{children}</>;
}
