import { createFileRoute } from "@tanstack/react-router";
import { Panel, PageHeader } from "@/components/ui-bits";
import { OEE_TREND, EQUIPMENT } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart, Legend } from "recharts";

export const Route = createFileRoute("/analytics/oee")({
  head: () => ({ meta: [{ title: "OEE Dashboard — TwinOxis" }, { name: "description", content: "Overall Equipment Effectiveness: availability, performance, quality with losses waterfall and shift comparison." }]}),
  component: OeeDashboard,
});

const tooltipStyle = { background: "#0F1629", border: "1px solid #1E293B", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 };

function Dial({ label, value, color }: { label: string; value: number; color: string }) {
  const r = 56, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="text-center">
      <div className="relative h-36 w-36 mx-auto">
        <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
          <circle cx="70" cy="70" r={r} stroke="#1E293B" strokeWidth="10" fill="none"/>
          <circle cx="70" cy="70" r={r} stroke={color} strokeWidth="10" fill="none" strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${color})` }}/>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div><div className="font-display text-3xl font-bold" style={{ color }}>{value}<span className="text-base text-muted-foreground">%</span></div></div>
        </div>
      </div>
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-2">{label}</div>
    </div>
  );
}

function OeeDashboard() {
  const losses = [
    { name: "Theoretical", val: 100, color: "#7B2FBE" },
    { name: "Plan Down", val: -8, color: "#94A3B8" },
    { name: "Unplan Down", val: -6, color: "#EF4444" },
    { name: "Speed Loss", val: -5, color: "#F59E0B" },
    { name: "Quality", val: -2.6, color: "#F59E0B" },
    { name: "OEE", val: 78.4, color: "#00D4FF" },
  ];
  return (
    <>
      <PageHeader title="OEE Dashboard" subtitle="Availability × Performance × Quality"/>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-4 mb-4">
        <Panel>
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Overall OEE</div>
            <div className="font-display text-7xl font-bold text-primary leading-none mt-2" style={{ textShadow: "0 0 24px rgba(0,212,255,.35)" }}>78.4<span className="text-3xl text-muted-foreground">%</span></div>
            <div className="text-xs text-success mt-2 font-mono">▲ 3.2% vs last week</div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            <Dial label="Availability" value={88} color="#10B981"/>
            <Dial label="Performance" value={91} color="#00D4FF"/>
            <Dial label="Quality" value={97} color="#7B2FBE"/>
          </div>
        </Panel>
        <Panel title="OEE Trend — 30 days">
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={OEE_TREND}>
              <CartesianGrid stroke="#1E293B" vertical={false}/>
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={10} interval={3} tickLine={false}/>
              <YAxis stroke="#94A3B8" fontSize={10} domain={[60,100]} tickLine={false}/>
              <Tooltip contentStyle={tooltipStyle}/>
              <Legend wrapperStyle={{fontSize:11}}/>
              <Line type="monotone" dataKey="availability" stroke="#10B981" dot={false} strokeWidth={2}/>
              <Line type="monotone" dataKey="performance" stroke="#00D4FF" dot={false} strokeWidth={2}/>
              <Line type="monotone" dataKey="quality" stroke="#7B2FBE" dot={false} strokeWidth={2}/>
              <Line type="monotone" dataKey="oee" stroke="#F59E0B" strokeWidth={2.5} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <Panel title="Losses Breakdown" subtitle="From theoretical maximum to actual OEE">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={losses}>
              <CartesianGrid stroke="#1E293B" vertical={false}/>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={10}/>
              <YAxis stroke="#94A3B8" fontSize={10}/>
              <Tooltip contentStyle={tooltipStyle}/>
              <Bar dataKey="val" radius={[4,4,0,0]} fill="#00D4FF"/>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Shift Comparison" subtitle="OEE by shift today">
          <div className="grid grid-cols-3 gap-3">
            {[{s:"Morning",v:82,c:"#00D4FF"},{s:"Afternoon",v:76,c:"#7B2FBE"},{s:"Night",v:71,c:"#F59E0B"}].map(x=>(
              <div key={x.s} className="glass-panel rounded-lg p-4 text-center">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{x.s}</div>
                <div className="font-display text-4xl font-bold mt-2" style={{color:x.c}}>{x.v}<span className="text-base text-muted-foreground">%</span></div>
                <div className="mt-3 h-1.5 rounded-full bg-border overflow-hidden"><div className="h-full" style={{width:x.v+"%",background:x.c,boxShadow:`0 0 8px ${x.c}`}}/></div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Equipment-wise OEE">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
              <th className="text-left font-medium py-2 px-2">Equipment</th>
              <th className="text-left">Dept</th>
              <th className="text-right">Avail</th>
              <th className="text-right">Perf</th>
              <th className="text-right">Qual</th>
              <th className="text-right">OEE</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody className="font-mono text-[12px]">
            {EQUIPMENT.map(e=>(
              <tr key={e.id} className="border-b border-border/40 hover:bg-primary/5">
                <td className="py-2 px-2"><span className="text-primary">{e.id}</span> <span className="font-sans text-foreground">{e.name}</span></td>
                <td className="text-muted-foreground">{e.dept}</td>
                <td className="text-right">{Math.round(e.oee + 4)}%</td>
                <td className="text-right">{Math.round(e.oee - 2)}%</td>
                <td className="text-right">{Math.round(95 + (e.oee%5))}%</td>
                <td className="text-right text-primary">{e.oee}%</td>
                <td className="w-28">
                  <svg viewBox="0 0 60 16" className="w-full h-4">
                    <polyline fill="none" stroke="#00D4FF" strokeWidth="1.2"
                      points={Array.from({length:10}).map((_,i)=>`${i*6},${8 + Math.sin((e.oee+i)/2)*5}`).join(" ")}/>
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
