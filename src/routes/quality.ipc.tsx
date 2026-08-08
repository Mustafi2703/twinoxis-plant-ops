import { createFileRoute } from "@tanstack/react-router";
import { Panel, PageHeader } from "@/components/ui-bits";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";

export const Route = createFileRoute("/quality/ipc")({
  head: () => ({ meta: [{ title: "In-Process Quality Control — TwinOxis" }, { name: "description", content: "Real-time in-process quality parameter charts with control limits for pharma batches." }]}),
  component: IPC,
});

const data = (base: number, amp: number) => Array.from({length:40},(_,i)=>({t:i,v: +(base + Math.sin(i/3)*amp + (Math.random()-0.5)*amp*0.4).toFixed(2)}));

const tooltipStyle = { background: "#0F1629", border: "1px solid #1E293B", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 };

function ParamChart({ title, ucl, lcl, target, unit, color, base, amp }: any) {
  return (
    <Panel title={title} subtitle={`UCL ${ucl} ${unit} • LCL ${lcl} ${unit} • Target ${target}`}>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data(base, amp)}>
          <CartesianGrid stroke="#1E293B" vertical={false}/>
          <XAxis dataKey="t" hide/>
          <YAxis stroke="#94A3B8" fontSize={10} domain={[lcl-amp, ucl+amp]} tickLine={false}/>
          <Tooltip contentStyle={tooltipStyle}/>
          <ReferenceLine y={ucl} stroke="#EF4444" strokeDasharray="4 4" label={{ value: "UCL", fill:"#EF4444", fontSize:10 }}/>
          <ReferenceLine y={lcl} stroke="#EF4444" strokeDasharray="4 4" label={{ value: "LCL", fill:"#EF4444", fontSize:10 }}/>
          <ReferenceLine y={target} stroke="#7B2FBE" strokeDasharray="2 2"/>
          <defs><linearGradient id={`g-${title}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.5}/><stop offset="100%" stopColor={color} stopOpacity={0}/></linearGradient></defs>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#g-${title})`}/>
        </AreaChart>
      </ResponsiveContainer>
    </Panel>
  );
}

function IPC() {
  return (
    <>
      <PageHeader title="In-Process Quality Control" subtitle="Live IPC parameters with UCL / LCL"/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <ParamChart title="Reactor Temperature" unit="°C" ucl={150} lcl={130} target={140} base={142} amp={4} color="#00D4FF"/>
        <ParamChart title="pH"                  unit=""   ucl={7.5} lcl={6.5} target={7.0} base={7.05} amp={0.2} color="#10B981"/>
        <ParamChart title="Viscosity"           unit="cP" ucl={420} lcl={380} target={400} base={401} amp={10}  color="#7B2FBE"/>
        <ParamChart title="Particle Size"       unit="µm" ucl={120} lcl={80}  target={100} base={102} amp={9}   color="#F59E0B"/>
      </div>
      <Panel title="QC Testing Queue">
        <table className="w-full text-sm font-mono text-[12px]">
          <thead className="text-[10px] uppercase tracking-widest text-muted-foreground"><tr><th className="text-left py-2">Batch</th><th className="text-left">Product</th><th className="text-left">Test</th><th className="text-left">Analyst</th><th className="text-left">Due</th><th className="text-left">Status</th></tr></thead>
          <tbody>
            {[
              {b:"B-2053",p:"Amoxicillin API",t:"Assay HPLC",a:"A. Khan",d:"12:30",s:"In Progress"},
              {b:"B-2055",p:"Paracetamol API",t:"Moisture KF",a:"D. Verma",d:"13:15",s:"Queued"},
              {b:"B-2051",p:"Ciprofloxacin",  t:"Related substances",a:"A. Khan",d:"14:45",s:"Queued"},
            ].map(r=>(
              <tr key={r.b} className="border-b border-border/40">
                <td className="py-2 text-primary">{r.b}</td><td className="font-sans">{r.p}</td><td>{r.t}</td><td className="font-sans">{r.a}</td><td>{r.d}</td>
                <td><span className={`text-[10px] px-2 py-0.5 rounded border ${r.s==="In Progress"?"text-primary border-primary/40 bg-primary/10":"text-muted-foreground border-border"}`}>{r.s}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
