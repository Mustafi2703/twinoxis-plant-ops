import { createFileRoute } from "@tanstack/react-router";
import { Panel, PageHeader } from "@/components/ui-bits";
import { ENERGY_BY_DEPT } from "@/lib/mock-data";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/energy/")({
  head: () => ({ meta: [{ title: "Energy Monitor — TwinOxis" }, { name: "description", content: "Real-time plant energy consumption, load profile, cost and carbon impact." }]}),
  component: Energy,
});

const COLORS = ["#00D4FF","#7B2FBE","#10B981","#F59E0B","#94A3B8"];
const tooltipStyle = { background: "#0F1629", border: "1px solid #1E293B", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 };
const load = Array.from({length:24},(_,h)=>({h:`${h}:00`, kw: Math.round(400 + Math.sin(h/3)*120 + Math.cos(h/2)*60 + 200)}));

function Energy() {
  return (
    <>
      <PageHeader title="Energy & Utilities" subtitle="Live consumption, load profile, cost"/>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Stat label="Live demand" value="612" suffix="kW"/>
        <Stat label="Today total" value="1,842" suffix="kWh"/>
        <Stat label="Cost today" value="₹ 18,420" suffix=""/>
        <Stat label="vs Yesterday" value="-4.2" suffix="%" color="success"/>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4 mb-4">
        <Panel title="Load Profile — 24 hr">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={load}>
              <defs><linearGradient id="el" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00D4FF" stopOpacity={0.6}/><stop offset="100%" stopColor="#00D4FF" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid stroke="#1E293B" vertical={false}/>
              <XAxis dataKey="h" stroke="#94A3B8" fontSize={10} tickLine={false}/>
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false}/>
              <Tooltip contentStyle={tooltipStyle}/>
              <Area type="monotone" dataKey="kw" stroke="#00D4FF" strokeWidth={2} fill="url(#el)"/>
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="By Department">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={ENERGY_BY_DEPT} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} stroke="none">
                {ENERGY_BY_DEPT.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle}/>
            </PieChart>
          </ResponsiveContainer>
          <ul className="text-[11px] font-mono space-y-1 mt-2">
            {ENERGY_BY_DEPT.map((d,i)=>(<li key={d.name} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{background:COLORS[i]}}/>{d.name}<span className="ml-auto">{d.value} kWh</span></li>))}
          </ul>
        </Panel>
      </div>
      <Panel title="Utility Monitor">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <UStat label="Water" value="184" unit="KL/day" pct={62}/>
          <UStat label="Steam" value="3.2" unit="t/h" pct={71}/>
          <UStat label="Compressed Air" value="0.4" unit="% leak" pct={20} good/>
          <UStat label="Natural Gas" value="820" unit="m³/day" pct={55}/>
        </div>
      </Panel>
    </>
  );
}
function Stat({ label, value, suffix, color = "primary" }: any) {
  const map: any = { primary: "text-primary", success: "text-success", warning: "text-warning" };
  return <div className="glass-panel rounded-xl p-4"><div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div><div className={`font-display text-3xl font-bold mt-1 ${map[color]}`}>{value}<span className="text-muted-foreground text-sm ml-1">{suffix}</span></div></div>;
}
function UStat({ label, value, unit, pct, good }: any) {
  const c = good ? "#10B981" : pct > 80 ? "#EF4444" : pct > 60 ? "#F59E0B" : "#00D4FF";
  return (
    <div className="glass-panel rounded-lg p-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-display text-2xl font-bold mt-1" style={{color:c}}>{value}<span className="text-muted-foreground text-xs ml-1">{unit}</span></div>
      <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden"><div className="h-full" style={{width:pct+"%", background:c, boxShadow:`0 0 6px ${c}`}}/></div>
    </div>
  );
}
