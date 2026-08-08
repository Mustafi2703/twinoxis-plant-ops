import { createFileRoute } from "@tanstack/react-router";
import { Panel, PageHeader, StatusBadge } from "@/components/ui-bits";
import { EQUIPMENT } from "@/lib/mock-data";

export const Route = createFileRoute("/predictive/health")({
  head: () => ({ meta: [{ title: "Equipment Health — TwinOxis" }, { name: "description", content: "AI-driven equipment health scoring with predicted failure dates, work orders, MTBF and MTTR." }]}),
  component: Health,
});

function Ring({ value }: { value: number }) {
  const c = value > 80 ? "#10B981" : value > 65 ? "#F59E0B" : "#EF4444";
  const cir = 2*Math.PI*22;
  return (
    <div className="relative h-16 w-16">
      <svg viewBox="0 0 56 56" className="-rotate-90">
        <circle cx="28" cy="28" r="22" stroke="#1E293B" strokeWidth="5" fill="none"/>
        <circle cx="28" cy="28" r="22" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round"
          strokeDasharray={cir} strokeDashoffset={cir - (value/100)*cir} style={{filter:`drop-shadow(0 0 6px ${c})`}}/>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-sm font-display font-bold" style={{color:c}}>{value}</div>
    </div>
  );
}

function Health() {
  return (
    <>
      <PageHeader title="Equipment Health Monitor" subtitle="Predictive scoring across all critical assets"/>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {EQUIPMENT.map(e=>(
          <div key={e.id} className="glass-panel rounded-xl p-4 hover-glow">
            <div className="flex items-center gap-3">
              <Ring value={e.health}/>
              <div className="min-w-0">
                <div className="font-display font-semibold truncate">{e.name}</div>
                <div className="text-[10px] font-mono uppercase text-muted-foreground">{e.id} • {e.dept}</div>
              </div>
            </div>
            <div className="mt-3"><StatusBadge status={e.status}/></div>
            <div className="mt-3 text-[11px] font-mono space-y-1">
              <div className="flex justify-between"><span className="text-muted-foreground">Last service</span><span>{e.last}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Predicted next</span><span className="text-warning">{e.health < 70 ? "2025-07-18" : e.health < 85 ? "2025-09-04" : "2025-12-20"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Open work orders</span><span>{e.health < 70 ? 2 : 0}</span></div>
            </div>
            <button className="mt-3 w-full text-xs rounded-md border border-border hover:border-primary/40 py-1.5">View details</button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Panel title="Failure Risk Heatmap" subtitle="Probability of any critical failure, next 30 days">
          <div className="grid grid-cols-10 gap-1">
            {Array.from({length:30}).map((_,i)=>{
              const v = Math.abs(Math.sin(i*0.7)+Math.cos(i*0.3));
              const op = Math.min(1, v*0.7+0.1);
              const danger = v > 1.3;
              return <div key={i} className="aspect-square rounded" title={`Day ${i+1}: ${(v*40).toFixed(1)}%`}
                style={{ background: `rgba(${danger?239:0},${danger?68:212},${danger?68:255},${op})`, boxShadow: danger?"0 0 8px rgba(239,68,68,0.4)":"" }}/>;
            })}
          </div>
          <div className="flex items-center gap-3 mt-4 text-[10px] font-mono text-muted-foreground">
            <span>LOW</span>
            <div className="flex-1 h-1.5 rounded-full" style={{background:"linear-gradient(90deg, rgba(0,212,255,0.2), rgba(0,212,255,0.8), rgba(245,158,11,0.8), rgba(239,68,68,0.9))"}}/>
            <span>HIGH</span>
          </div>
        </Panel>
        <Panel title="MTBF / MTTR by equipment">
          <table className="w-full text-[12px] font-mono">
            <thead className="text-[10px] uppercase tracking-widest text-muted-foreground"><tr><th className="text-left py-1">Equipment</th><th className="text-right">MTBF (hrs)</th><th className="text-right">MTTR (hrs)</th><th className="text-right">Avail %</th></tr></thead>
            <tbody>
              {EQUIPMENT.map(e=>(
                <tr key={e.id} className="border-b border-border/40">
                  <td className="py-1.5"><span className="text-primary">{e.id}</span></td>
                  <td className="text-right">{Math.round(800 + e.health*4)}</td>
                  <td className="text-right">{(8 - e.health/20).toFixed(1)}</td>
                  <td className="text-right">{(90 + e.health/15).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </>
  );
}
