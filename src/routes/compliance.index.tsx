import { createFileRoute } from "@tanstack/react-router";
import { Panel, PageHeader } from "@/components/ui-bits";
import { COMPLIANCE } from "@/lib/mock-data";

export const Route = createFileRoute("/compliance/")({
  head: () => ({ meta: [{ title: "Compliance Tracker — TwinOxis" }, { name: "description", content: "GMP, FDA 21 CFR Part 11, CPCB and ISO compliance scoring with audit calendar and non-conformances." }]}),
  component: Comp,
});

function Comp() {
  return (
    <>
      <PageHeader title="Regulatory Compliance Tracker" subtitle="Score, audits, open non-conformances"/>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {COMPLIANCE.map(c=>{
          const color = c.score>95?"#10B981":c.score>=90?"#00D4FF":"#F59E0B";
          return (
            <div key={c.reg} className="glass-panel hover-glow rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16">
                  <svg viewBox="0 0 56 56" className="-rotate-90">
                    <circle cx="28" cy="28" r="22" stroke="#1E293B" strokeWidth="5" fill="none"/>
                    <circle cx="28" cy="28" r="22" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round"
                      strokeDasharray={2*Math.PI*22} strokeDashoffset={(2*Math.PI*22)*(1-c.score/100)}
                      style={{filter:`drop-shadow(0 0 6px ${color})`}}/>
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-sm font-display font-bold" style={{color}}>{c.score}</div>
                </div>
                <div className="min-w-0">
                  <div className="font-display font-semibold">{c.reg}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">Score / 100</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div><div className="text-muted-foreground">Last audit</div>{c.lastAudit}</div>
                <div><div className="text-muted-foreground">Next audit</div><span className="text-primary">{c.nextAudit}</span></div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Open non-conformances</span>
                <span className={`font-mono text-base ${c.open>3?"text-destructive":c.open>1?"text-warning":"text-success"}`}>{c.open}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
