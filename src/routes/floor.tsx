import { createFileRoute, Link } from "@tanstack/react-router";
import { Panel, PageHeader, StatusBadge, StatusDot, KpiCard } from "@/components/ui-bits";
import { useLiveTwin, type LiveEquipment } from "@/hooks/use-live-twin";
import { useMemo, useState } from "react";
import {
  Activity,
  Radio,
  Thermometer,
  Gauge,
  Waves,
  X,
  Zap,
  AlertTriangle,
  Sliders,
} from "lucide-react";

export const Route = createFileRoute("/floor")({
  head: () => ({
    meta: [
      { title: "Digital Twin Floor — TwinOxis" },
      {
        name: "description",
        content:
          "Interactive real-time digital twin of a pharmaceutical plant floor with live OPC-UA telemetry, process flows, and predictive health.",
      },
    ],
  }),
  component: FactoryFloor,
});

const POS: Record<string, { l: number; t: number; zone: string }> = {
  "R-101": { l: 8, t: 16, zone: "Reaction" },
  "R-203": { l: 8, t: 46, zone: "Reaction" },
  "M-02": { l: 38, t: 16, zone: "Mixing" },
  "H-03": { l: 68, t: 16, zone: "Utility" },
  "BLR-01": { l: 38, t: 46, zone: "Utility" },
  "F-01": { l: 68, t: 46, zone: "Packaging" },
  "C-04": { l: 38, t: 76, zone: "Separation" },
  "P-05": { l: 68, t: 76, zone: "Utility" },
};

function statusTone(status: string) {
  if (status === "Running") return "success" as const;
  if (status === "Warning" || status === "Predictive Alert") return "warning" as const;
  if (status === "Maintenance") return "primary" as const;
  return "danger" as const;
}

function FactoryFloor() {
  const { equipment, feed, clock, syncAge, kpi } = useLiveTwin(1100);
  const [selected, setSelected] = useState<string | null>("R-101");
  const [dept, setDept] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(
    () =>
      equipment.filter((e) => {
        const pos = POS[e.id];
        if (dept !== "All" && pos?.zone !== dept) return false;
        if (statusFilter !== "All" && e.status !== statusFilter) return false;
        return true;
      }),
    [equipment, dept, statusFilter],
  );

  const eq = equipment.find((e) => e.id === selected) ?? null;

  return (
    <>
      <PageHeader
        title="Live Digital Twin"
        subtitle="Shree Pharma Ankleshwar — process schematic synced to OPC-UA / SCADA bridge"
        action={
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-success/40 bg-success/10 px-2.5 py-1.5 font-mono text-success">
              <span className="status-dot bg-success text-success" />
              LIVE · {clock}
            </span>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="bg-panel border border-border rounded px-2 py-1.5"
            >
              <option>All</option>
              <option>Reaction</option>
              <option>Mixing</option>
              <option>Utility</option>
              <option>Packaging</option>
              <option>Separation</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-panel border border-border rounded px-2 py-1.5"
            >
              <option>All</option>
              <option>Running</option>
              <option>Warning</option>
              <option>Predictive Alert</option>
              <option>Maintenance</option>
            </select>
            <Link
              to="/predictive/simulation"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary/15 border border-primary/40 text-primary px-2.5 py-1.5 hover:bg-primary/25"
            >
              <Sliders size={12} /> What-if twin
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Units Online" value={`${kpi.live}/8`} delta="SCADA bridge healthy" icon={Radio} accent="success" />
        <KpiCard label="Twin Health" value={kpi.avgHealth} suffix="%" delta="Composite asset score" icon={Activity} accent="primary" />
        <KpiCard label="Active Twin Alerts" value={kpi.alerts} delta="Click amber units to inspect" icon={AlertTriangle} accent="warning" />
        <KpiCard label="Line Throughput" value={kpi.throughput} suffix=" u/h" delta={`${kpi.tags} tags · sync ${syncAge}s`} icon={Zap} accent="secondary" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
        <Panel
          title="Plant Process Twin"
          subtitle="Animated material paths · click any asset for live telemetry"
        >
          <div className="relative h-[600px] rounded-md bg-grid border border-border/60 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 25%, rgba(0,212,255,0.12), transparent 40%), radial-gradient(ellipse at 75% 55%, rgba(123,47,190,0.12), transparent 45%)",
              }}
            />

            <ZoneLabel left={6} top={4} label="Reaction Bay" />
            <ZoneLabel left={36} top={4} label="Mixing / Utility" />
            <ZoneLabel left={66} top={4} label="Fill & Utilities" />
            <ZoneLabel left={36} top={68} label="Separation" />

            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line className="animate-flow-dash" x1="20" y1="28" x2="48" y2="28" stroke="#00D4FF" strokeWidth="0.35" opacity="0.75" />
              <line className="animate-flow-dash" x1="48" y1="28" x2="48" y2="56" stroke="#00D4FF" strokeWidth="0.35" opacity="0.65" style={{ animationDelay: "0.3s" }} />
              <line className="animate-flow-dash" x1="20" y1="56" x2="48" y2="56" stroke="#00D4FF" strokeWidth="0.35" opacity="0.65" style={{ animationDelay: "0.6s" }} />
              <line className="animate-flow-dash" x1="48" y1="56" x2="78" y2="56" stroke="#7B2FBE" strokeWidth="0.35" opacity="0.7" style={{ animationDelay: "0.2s" }} />
              <line className="animate-flow-dash" x1="78" y1="28" x2="78" y2="78" stroke="#00D4FF" strokeWidth="0.35" opacity="0.55" style={{ animationDelay: "0.9s" }} />
              <line className="animate-flow-dash" x1="48" y1="56" x2="48" y2="82" stroke="#7B2FBE" strokeWidth="0.35" opacity="0.55" style={{ animationDelay: "1.1s" }} />
              <circle cx="20" cy="28" r="0.9" fill="#00D4FF" className="animate-twin-pulse" />
              <circle cx="48" cy="56" r="0.9" fill="#7B2FBE" className="animate-twin-pulse" />
              <circle cx="78" cy="56" r="0.9" fill="#00D4FF" className="animate-twin-pulse" />
            </svg>

            {filtered.map((e) => {
              const pos = POS[e.id] ?? { l: 50, t: 50, zone: e.dept };
              const tone = statusTone(e.status);
              const active = selected === e.id;
              const borderClass =
                tone === "warning"
                  ? "border-warning/70 shadow-[0_0_22px_rgba(245,158,11,0.35)]"
                  : tone === "danger"
                    ? "border-destructive/70 animate-pulse"
                    : tone === "primary"
                      ? "border-secondary/60"
                      : "border-success/40 hover:border-primary/60";
              return (
                <button
                  key={e.id}
                  onClick={() => setSelected(e.id)}
                  className={`absolute w-[11.5rem] glass-panel rounded-lg p-2.5 text-left border transition-transform duration-200 ${borderClass} ${active ? "ring-1 ring-primary/70 scale-[1.03] z-10" : "z-[1]"}`}
                  style={{ left: `${pos.l}%`, top: `${pos.t}%` }}
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest">
                    <StatusDot color={tone} />
                    <span className="text-muted-foreground">{e.id}</span>
                    <span className="ml-auto text-foreground">{e.oee}% OEE</span>
                  </div>
                  <div className="text-sm font-medium truncate mt-0.5">{e.name}</div>
                  <div className="grid grid-cols-3 gap-1 mt-1.5 text-[10px] font-mono">
                    <div>
                      <div className="text-muted-foreground">T°C</div>
                      <span className="text-primary">{e.temp.toFixed(1)}</span>
                    </div>
                    <div>
                      <div className="text-muted-foreground">P bar</div>
                      <span className="text-primary">{e.pressure.toFixed(2)}</span>
                    </div>
                    <div>
                      <div className="text-muted-foreground">RPM</div>
                      <span className="text-primary">{e.rpm}</span>
                    </div>
                  </div>
                  <MiniSpark values={e.sparkline} warn={tone === "warning"} />
                </button>
              );
            })}

            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 text-[10px] font-mono text-muted-foreground">
              <LegendDot color="bg-success" label="Running" />
              <LegendDot color="bg-warning" label="Warning / Predictive" />
              <LegendDot color="bg-secondary" label="Maintenance" />
              <span className="ml-auto">Material flow · OPC-UA · last sync {syncAge}s</span>
            </div>
          </div>
        </Panel>

        <Panel title="Live Sensor Stream" subtitle="OPC-UA · 1.2k tags · auto-scroll">
          <div className="font-mono text-[11px] h-[600px] overflow-hidden relative">
            <div className="space-y-1">
              {feed.map((s, i) => {
                const color =
                  s.level === "warn" || s.level === "critical"
                    ? "text-warning"
                    : s.level === "ok"
                      ? "text-success"
                      : "text-muted-foreground";
                return (
                  <div
                    key={`${s.t}-${s.src}-${i}`}
                    className="flex gap-2 py-1.5 border-b border-border/40 animate-fade-in-up"
                    style={{ animationDelay: i === 0 ? "0ms" : undefined }}
                  >
                    <span className="text-muted-foreground/70 shrink-0">{s.t}</span>
                    <button
                      type="button"
                      onClick={() => setSelected(s.src)}
                      className="text-primary hover:underline shrink-0"
                    >
                      {s.src}
                    </button>
                    <span className={`flex-1 min-w-0 truncate ${color}`}>{s.msg}</span>
                  </div>
                );
              })}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-panel to-transparent" />
          </div>
        </Panel>
      </div>

      {eq && (
        <AssetDrawer eq={eq} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function ZoneLabel({ left, top, label }: { left: number; top: number; label: string }) {
  return (
    <div
      className="absolute text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 font-mono pointer-events-none"
      style={{ left: `${left}%`, top: `${top}%` }}
    >
      {label}
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function MiniSpark({ values, warn }: { values: number[]; warn?: boolean }) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const pts = values
    .map((v, i) => {
      const x = (i / Math.max(1, values.length - 1)) * 100;
      const y = 18 - ((v - min) / Math.max(1, max - min)) * 16;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 20" className="mt-1.5 h-4 w-full opacity-80">
      <polyline
        fill="none"
        stroke={warn ? "#F59E0B" : "#00D4FF"}
        strokeWidth="1.5"
        points={pts}
      />
    </svg>
  );
}

function AssetDrawer({ eq, onClose }: { eq: LiveEquipment; onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px]" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-[min(100%,460px)] z-50 bg-surface border-l border-border p-5 overflow-y-auto animate-fade-in-up shadow-[-20px_0_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-start mb-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {eq.id} · {eq.dept}
            </div>
            <h3 className="font-display text-xl font-bold">{eq.name}</h3>
          </div>
          <button onClick={onClose} className="ml-auto text-muted-foreground hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <StatusBadge status={eq.status} />
          <span className="text-[11px] font-mono text-muted-foreground">Last service {eq.last}</span>
        </div>

        <div className="mb-4 glass-panel rounded-md p-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            Twin health trajectory (live)
          </div>
          <svg viewBox="0 0 240 64" className="w-full h-16">
            <defs>
              <linearGradient id="twinFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const max = Math.max(...eq.sparkline, 1);
              const min = Math.min(...eq.sparkline, 0);
              const coords = eq.sparkline.map((v, i) => {
                const x = (i / Math.max(1, eq.sparkline.length - 1)) * 240;
                const y = 56 - ((v - min) / Math.max(1, max - min)) * 48;
                return [x, y] as const;
              });
              const line = coords.map(([x, y]) => `${x},${y}`).join(" ");
              const area = `0,64 ${line} 240,64`;
              return (
                <>
                  <polygon points={area} fill="url(#twinFill)" />
                  <polyline fill="none" stroke="#00D4FF" strokeWidth="2" points={line} />
                </>
              );
            })()}
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <Tile icon={Activity} label="Health" value={`${eq.health}%`} />
          <Tile icon={Gauge} label="OEE" value={`${eq.oee}%`} />
          <Tile icon={Waves} label="Vibration" value={`${eq.vibration.toFixed(2)}`} unit="mm/s" />
          <Tile icon={Thermometer} label="Temperature" value={eq.temp.toFixed(1)} unit="°C" />
          <Tile icon={Gauge} label="Pressure" value={eq.pressure.toFixed(2)} unit="bar" />
          <Tile icon={Zap} label="Flow" value={String(eq.flow)} unit="LPM" />
        </div>

        <Panel title="Digital twin events">
          <ul className="space-y-1.5 text-[11px] font-mono">
            <li className="text-muted-foreground">Telemetry mirror active · lag &lt; 1.2s</li>
            <li className={eq.status.includes("Alert") || eq.status === "Warning" ? "text-warning" : "text-muted-foreground"}>
              {eq.status === "Warning"
                ? `Vibration elevated at ${eq.vibration.toFixed(2)} mm/s`
                : eq.status === "Predictive Alert"
                  ? "ML model: bearing wear pattern — schedule WO"
                  : eq.status === "Maintenance"
                    ? "Asset locked out — LOTO procedure open"
                    : "Stable operation within control band"}
            </li>
            <li className="text-muted-foreground">Operator checklist signed · shift A</li>
            <li className="text-primary">
              <Link to="/predictive/simulation" className="hover:underline">
                Open what-if simulation for this asset →
              </Link>
            </li>
          </ul>
        </Panel>
      </div>
    </>
  );
}

function Tile({
  label,
  value,
  unit,
  icon: Icon,
}: {
  label: string;
  value: string;
  unit?: string;
  icon: typeof Activity;
}) {
  return (
    <div className="glass-panel rounded-md p-2.5">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        <Icon size={11} /> {label}
      </div>
      <div className="font-mono text-lg text-primary mt-0.5">
        {value}
        {unit ? <span className="text-[10px] text-muted-foreground ml-1">{unit}</span> : null}
      </div>
    </div>
  );
}
