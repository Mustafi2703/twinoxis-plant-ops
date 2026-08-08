import { createFileRoute } from "@tanstack/react-router";
import { Panel, PageHeader, StatusBadge } from "@/components/ui-bits";
import { BATCHES } from "@/lib/mock-data";
import { useState } from "react";
import { Plus, Download, X } from "lucide-react";

export const Route = createFileRoute("/batches")({
  head: () => ({ meta: [
    { title: "Batch Management — TwinOxis" },
    { name: "description", content: "Track, release and audit pharmaceutical and chemical batches with full electronic batch record lineage." },
  ]}),
  component: Batches,
});

function Batches() {
  const [open, setOpen] = useState<string | null>(null);
  const sel = BATCHES.find((b) => b.id === open);
  return (
    <>
      <PageHeader title="Batch Management" subtitle="Active batches • lineage • eBMR" action={
        <div className="flex gap-2">
          <button className="rounded-md border border-border px-3 py-1.5 text-xs flex items-center gap-1.5"><Download size={14}/>Export</button>
          <button className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs flex items-center gap-1.5 glow-cyan"><Plus size={14}/>New Batch</button>
        </div>
      }/>

      <Panel className="mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="text-left font-medium py-2 px-2">Batch No.</th>
                <th className="text-left font-medium">Product</th>
                <th className="text-left font-medium">Status</th>
                <th className="text-left font-medium">Equipment</th>
                <th className="text-left font-medium">Operator</th>
                <th className="text-left font-medium">Start</th>
                <th className="text-left font-medium">ETA</th>
                <th className="text-left font-medium w-44">Progress</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[12px]">
              {BATCHES.map((b) => (
                <tr key={b.id} onClick={() => setOpen(b.id)} className="border-b border-border/40 hover:bg-primary/5 cursor-pointer">
                  <td className="py-2 px-2 text-primary">{b.id}</td>
                  <td className="font-sans">{b.product}</td>
                  <td><StatusBadge status={b.status}/></td>
                  <td className="text-muted-foreground">{b.equipment}</td>
                  <td className="font-sans">{b.operator}</td>
                  <td>{b.start}</td>
                  <td>{b.eta}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: b.progress + "%", boxShadow: "0 0 8px #00D4FF" }}/>
                      </div>
                      <span className="text-[11px]">{b.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Batch Timeline" subtitle="Gantt view of in-progress batches">
        <div className="space-y-2">
          {BATCHES.filter((b) => b.status === "In-Process").map((b) => (
            <div key={b.id} className="flex items-center gap-3 text-xs">
              <span className="w-24 font-mono text-primary">{b.id}</span>
              <div className="flex-1 h-7 bg-border/30 rounded relative overflow-hidden">
                {["Charging","Reaction","Cooling","Filtration","Drying","Packaging"].map((stage, i) => {
                  const done = (i / 6) * 100 < b.progress;
                  const inProg = (i / 6) * 100 < b.progress && ((i+1) / 6) * 100 > b.progress;
                  return (
                    <div key={stage} style={{ left: `${(i/6)*100}%`, width: `${100/6}%` }}
                      className={`absolute top-0 bottom-0 border-r border-background flex items-center justify-center text-[10px] ${done ? "bg-primary/40 text-primary" : inProg ? "bg-primary/20 text-primary animate-pulse" : "text-muted-foreground"}`}>
                      {stage}
                    </div>
                  );
                })}
              </div>
              <span className="font-mono text-muted-foreground w-12 text-right">{b.progress}%</span>
            </div>
          ))}
        </div>
      </Panel>

      {sel && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(null)}/>
          <div className="fixed right-0 top-0 bottom-0 w-[520px] z-50 bg-surface border-l border-border p-5 overflow-y-auto animate-fade-in-up">
            <div className="flex items-start mb-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{sel.id}</div>
                <h3 className="font-display text-xl font-bold">{sel.product}</h3>
              </div>
              <button onClick={() => setOpen(null)} className="ml-auto text-muted-foreground"><X size={18}/></button>
            </div>
            <StatusBadge status={sel.status}/>
            <div className="mt-4 space-y-3">
              <Panel title="Raw Material Lineage">
                <table className="w-full text-[11px] font-mono">
                  <thead className="text-muted-foreground"><tr><th className="text-left py-1">Material</th><th className="text-left">Lot</th><th className="text-right">Qty</th></tr></thead>
                  <tbody>
                    <tr><td>Intermediate A</td><td className="text-primary">LOT-29A-2025</td><td className="text-right">420 kg</td></tr>
                    <tr><td>Solvent — Methanol</td><td className="text-primary">LOT-MEOH-04</td><td className="text-right">1240 L</td></tr>
                    <tr><td>Catalyst</td><td className="text-primary">LOT-CAT-019</td><td className="text-right">3.4 kg</td></tr>
                  </tbody>
                </table>
              </Panel>
              <Panel title="In-Process Parameters">
                <ul className="text-[11px] font-mono space-y-1">
                  <li>Stage 1 — Charging — Temp 32°C, pH 6.8 — <span className="text-success">PASS</span></li>
                  <li>Stage 2 — Reaction — Temp 142°C, Pressure 4.2 bar — <span className="text-success">PASS</span></li>
                  <li>Stage 3 — Cooling — Temp 68°C — <span className="text-success">PASS</span></li>
                  <li>Stage 4 — Filtration — currently in progress — <span className="text-primary">IN-PROG</span></li>
                </ul>
              </Panel>
              <Panel title="QC Checkpoints">
                <ul className="text-[11px] font-mono space-y-1">
                  <li>11:14 — Stage 2 sample — Assay 99.2% — <span className="text-success">PASS</span> — A. Khan</li>
                  <li>10:02 — Stage 1 verification — pH 6.8 — <span className="text-success">PASS</span> — A. Khan</li>
                </ul>
              </Panel>
              <button className="w-full rounded-md border border-primary/40 text-primary py-2 text-sm hover-glow">Download Electronic Batch Record (PDF)</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
