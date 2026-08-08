import { createFileRoute } from "@tanstack/react-router";
import { Panel, PageHeader } from "@/components/ui-bits";
import { EMISSIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/ehs/emissions")({
  head: () => ({ meta: [{ title: "Emission Monitoring (CPCB) — TwinOxis" }, { name: "description", content: "OCEMS-style real-time stack and effluent emission monitoring vs CPCB permissible limits." }]}),
  component: Em,
});

function Em() {
  return (
    <>
      <PageHeader title="Emission Monitoring" subtitle="Live OCEMS feed — CPCB / Gujarat PCB"/>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
        {EMISSIONS.map(e=>{
          const pct = (e.value/e.limit)*100;
          const status = pct >= 100 ? "EXCEEDED" : pct > 80 ? "APPROACHING" : "WITHIN LIMIT";
          const c = pct >= 100 ? "#EF4444" : pct > 80 ? "#F59E0B" : "#10B981";
          return (
            <div key={e.param} className="glass-panel hover-glow rounded-xl p-4">
              <div className="flex items-center">
                <div className="font-display text-lg font-semibold">{e.param}</div>
                <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded border" style={{borderColor:c+"66", color:c, background:c+"15"}}>{status}</span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold" style={{color:c}}>{e.value}</span>
                <span className="text-muted-foreground text-sm">/ {e.limit} {e.unit}</span>
              </div>
              <div className="mt-3 h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full" style={{width: Math.min(100,pct)+"%", background:c, boxShadow:`0 0 8px ${c}`}}/>
              </div>
              <div className="text-[10px] font-mono text-muted-foreground mt-2">24-hr avg • sensor calibrated 2025-06-12</div>
            </div>
          );
        })}
      </div>
      <Panel title="Stack Emission Trend (last 12 hours)">
        <div className="h-40 grid grid-cols-12 gap-1 items-end">
          {Array.from({length:12*6}).map((_,i)=>{
            const h = 30+Math.abs(Math.sin(i/4))*55;
            return <div key={i} className="rounded-t" style={{height:h+"%", background: h>70?"#F59E0B":"#00D4FF", boxShadow: h>70?"0 0 6px #F59E0B":""}}/>;
          })}
        </div>
      </Panel>
    </>
  );
}
