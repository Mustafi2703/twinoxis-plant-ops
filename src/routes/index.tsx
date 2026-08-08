import { createFileRoute, Link } from "@tanstack/react-router";
import { Panel, KpiCard, PageHeader, StatusBadge } from "@/components/ui-bits";
import { KPIS, PROD_VS_TARGET, ALERTS, OEE_TREND } from "@/lib/mock-data";
import { Activity, Zap, AlertTriangle, CheckCircle2, TrendingUp, IndianRupee, Leaf, Factory, Sliders } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart, Legend } from "recharts";
import twinoxisLogo from "@/assets/twinoxis-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Executive Dashboard — TwinOxis" },
      { name: "description", content: "C-suite plant health, OEE, production vs target, downtime impact, and sustainability metrics for pharmaceutical and chemical manufacturing." },
    ],
  }),
  component: ExecutiveDashboard,
});

const tooltipStyle = { background: "#0F1629", border: "1px solid #1E293B", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 };

function HealthGauge({ value }: { value: number }) {
  const r = 70, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  const color = value > 80 ? "#10B981" : value > 60 ? "#F59E0B" : "#EF4444";
  return (
    <div className="relative h-48 w-48 mx-auto">
      <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
        <circle cx="80" cy="80" r={r} stroke="#1E293B" strokeWidth="12" fill="none" />
        <circle cx="80" cy="80" r={r} stroke={color} strokeWidth="12" fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}99)`, transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-display text-5xl font-bold" style={{ color }}>{value}</div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Plant Health</div>
          <div className="text-[10px] text-success font-mono mt-1 flex items-center justify-center gap-1"><TrendingUp size={10}/> +2.1 vs LW</div>
        </div>
      </div>
    </div>
  );
}

function ExecutiveDashboard() {
  return (
    <>
      <PageHeader title="Executive Control Room" subtitle="Real-time plant performance, financial impact, and sustainability across operations" />

      <div className="mb-6 rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <img src={twinoxisLogo} alt="TwinOxis" className="h-12 w-12 shrink-0 object-contain drop-shadow-[0_0_12px_rgba(0,212,255,0.4)]" />
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-mono mb-1">TwinOxis · Digital Twin</div>
          <div className="font-display text-lg font-semibold">Explore the live plant twin, then run a what-if scenario</div>
          <p className="text-sm text-muted-foreground mt-0.5">Factory Floor shows OPC-UA telemetry on a process schematic. Twin Simulation predicts yield, quality, energy, and cycle time before you touch the line.</p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <Link to="/floor" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium glow-cyan">
            <Factory size={14} /> Open Live Twin
          </Link>
          <Link to="/predictive/simulation" className="inline-flex items-center gap-2 rounded-md border border-border bg-panel px-3 py-2 text-sm hover:border-primary/50">
            <Sliders size={14} /> What-if Simulation
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KpiCard label="OEE Today" value={KPIS.oee} suffix="%" delta="▲ 3.2% vs yesterday" icon={Activity} accent="primary" />
        <KpiCard label="Batches Completed" value={KPIS.batchesCompleted} delta="Target 8 • 75% complete" icon={CheckCircle2} accent="success" />
        <KpiCard label="Active Alerts" value={KPIS.activeAlerts} delta="1 critical • 2 warning" icon={AlertTriangle} accent="warning" />
        <KpiCard label="Energy Consumed" value={KPIS.energyKwh.toLocaleString()} suffix="kWh" delta="₹ 18,420 today" icon={Zap} accent="secondary" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <Panel title="Plant Health Score" subtitle="Composite of OEE, quality, safety, compliance">
          <HealthGauge value={KPIS.plantHealth} />
          <div className="mt-2 grid grid-cols-4 text-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            <div><div className="text-success font-display text-base">A</div>Reaction</div>
            <div><div className="text-success font-display text-base">A</div>Utility</div>
            <div><div className="text-warning font-display text-base">B</div>Mixing</div>
            <div><div className="text-success font-display text-base">A</div>Packaging</div>
          </div>
        </Panel>

        <Panel title="Production vs Target" subtitle="This week (units × 1000)" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={PROD_VS_TARGET}>
              <CartesianGrid stroke="#1E293B" vertical={false}/>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(0,212,255,0.05)" }} />
              <Legend wrapperStyle={{ fontSize: 11 }}/>
              <Bar dataKey="target" fill="#7B2FBE" radius={[4,4,0,0]} maxBarSize={28} />
              <Bar dataKey="actual" fill="url(#cyanGrad)" radius={[4,4,0,0]} maxBarSize={28} />
              <defs>
                <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <Panel title="Downtime Revenue Impact" subtitle="Estimated loss this month">
          <div className="font-display text-4xl font-bold text-destructive flex items-center gap-1"><IndianRupee size={26}/>14.8L</div>
          <div className="text-[11px] text-muted-foreground mt-1 font-mono">unplanned • 8.4 hrs • across 4 events</div>
          <div className="mt-4 space-y-2 text-sm">
            <DowntimeRow label="Reactor R-102 fault" hours={2.4} loss="₹ 4.2L" />
            <DowntimeRow label="Boiler scale buildup" hours={3.1} loss="₹ 5.6L" />
            <DowntimeRow label="Power dip — feeder 2" hours={1.5} loss="₹ 2.8L" />
            <DowntimeRow label="Centrifuge bearing"  hours={1.4} loss="₹ 2.2L" />
          </div>
        </Panel>

        <Panel title="OEE Trend (30 days)" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={OEE_TREND}>
              <defs>
                <linearGradient id="oeeArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1E293B" vertical={false}/>
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} interval={3}/>
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} domain={[60, 100]}/>
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="oee" stroke="#00D4FF" strokeWidth={2} fill="url(#oeeArea)" />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel title="Multi-Plant Network" subtitle="India operations">
          <PlantMap />
        </Panel>
        <Panel title="Sustainability Index" subtitle="Carbon footprint vs target">
          <div className="flex items-center gap-3 mb-3">
            <Leaf className="text-success" size={28}/>
            <div>
              <div className="font-display text-3xl font-bold">218<span className="text-muted-foreground text-base ml-1">tCO₂e</span></div>
              <div className="text-[11px] text-muted-foreground">Target 240 • 9% under budget</div>
            </div>
          </div>
          <SusBar label="Scope 1 — direct" value={62} max={80}/>
          <SusBar label="Scope 2 — electricity" value={118} max={130}/>
          <SusBar label="Scope 3 — supply chain" value={38} max={30} over />
        </Panel>
        <Panel title="Top Active Alerts">
          <ul className="space-y-2">
            {ALERTS.slice(0,4).map((a) => (
              <li key={a.id} className="flex items-center gap-3 p-2 rounded border border-border/60 hover:border-primary/40">
                <StatusBadge status={a.severity === "critical" ? "Fault" : a.severity === "warning" ? "Warning" : a.severity === "success" ? "Released" : "Running"}/>
                <div className="text-sm flex-1 min-w-0 truncate">{a.title}</div>
                <span className="text-[10px] font-mono text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function DowntimeRow({ label, hours, loss }: { label: string; hours: number; loss: string }) {
  return (
    <div className="flex items-center text-[12px]">
      <span className="flex-1 truncate">{label}</span>
      <span className="text-muted-foreground font-mono mr-3">{hours}h</span>
      <span className="font-mono text-destructive">{loss}</span>
    </div>
  );
}
function SusBar({ label, value, max, over }: { label: string; value: number; max: number; over?: boolean }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="mb-2">
      <div className="flex justify-between text-[11px] mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-mono ${over ? "text-destructive" : "text-foreground"}`}>{value}/{max}</span>
      </div>
      <div className="h-1.5 rounded-full bg-border overflow-hidden">
        <div className={`h-full ${over ? "bg-destructive" : "bg-primary"}`} style={{ width: pct + "%", boxShadow: "0 0 8px currentColor" }}/>
      </div>
    </div>
  );
}

function PlantMap() {
  // Stylised abstract India outline w/ plant pins
  const plants = [
    { x: 25, y: 60, name: "Ankleshwar", status: "live" },
    { x: 35, y: 45, name: "Vadodara", status: "live" },
    { x: 55, y: 30, name: "Dehradun", status: "warning" },
    { x: 70, y: 75, name: "Hyderabad", status: "live" },
    { x: 80, y: 90, name: "Chennai", status: "live" },
  ];
  return (
    <div className="relative h-56 rounded-md bg-grid border border-border/60 overflow-hidden">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-30">
        <path d="M30,12 Q50,8 70,14 L80,40 Q90,60 78,82 Q60,98 45,95 Q28,90 20,70 Q12,45 22,28 Z"
              fill="none" stroke="#00D4FF" strokeWidth="0.4"/>
      </svg>
      {plants.map((p) => (
        <div key={p.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <span className={`status-dot ${p.status === "live" ? "text-success bg-success" : "text-warning bg-warning"}`}/>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-foreground whitespace-nowrap">{p.name}</div>
        </div>
      ))}
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-muted-foreground">5 plants • 4 live • 1 warn</div>
    </div>
  );
}
