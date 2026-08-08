import { createFileRoute } from "@tanstack/react-router";
import { Panel, PageHeader } from "@/components/ui-bits";
import { Download } from "lucide-react";

export const Route = createFileRoute("/analytics/reports")({
  head: () => ({ meta: [{ title: "Report Builder — TwinOxis" }, { name: "description", content: "Drag-and-drop custom report builder with PDF / Excel export and email scheduling." }]}),
  component: Builder,
});

function Builder() {
  return (
    <>
      <PageHeader title="Custom Report Builder" subtitle="Drag modules • pick range • export or schedule"/>
      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr_280px] gap-4">
        <Panel title="Modules">
          <ul className="space-y-2 text-sm">
            {["OEE Summary","Batch Yield","Energy by Dept","Emissions","Deviation Log","Inventory Levels","Audit Trail Slice","Downtime Pareto"].map(m=>(
              <li key={m} className="px-3 py-2 rounded border border-border hover:border-primary/50 cursor-grab">{m}</li>
            ))}
          </ul>
        </Panel>
        <Panel title="Report Canvas" subtitle="Drop modules here">
          <div className="min-h-[400px] rounded-md border border-dashed border-border bg-grid p-4 grid grid-cols-2 gap-3">
            <div className="glass-panel rounded p-3"><div className="text-[10px] uppercase text-muted-foreground">OEE Summary</div><div className="font-display text-3xl text-primary">78.4%</div></div>
            <div className="glass-panel rounded p-3"><div className="text-[10px] uppercase text-muted-foreground">Energy by Dept</div><div className="font-display text-3xl text-primary">1,842 kWh</div></div>
            <div className="glass-panel rounded p-3 col-span-2 h-32 grid place-items-center text-muted-foreground text-sm">Drop a chart module here…</div>
          </div>
        </Panel>
        <Panel title="Output">
          <div className="text-xs text-muted-foreground mb-2">Date range</div>
          <div className="flex gap-2 mb-3"><input type="date" className="bg-panel border border-border rounded px-2 py-1.5 text-xs flex-1"/><input type="date" className="bg-panel border border-border rounded px-2 py-1.5 text-xs flex-1"/></div>
          <div className="text-xs text-muted-foreground mb-1">Format</div>
          <select className="w-full bg-panel border border-border rounded px-2 py-1.5 text-xs mb-3"><option>PDF</option><option>Excel</option><option>CSV</option></select>
          <button className="w-full rounded-md bg-primary text-primary-foreground py-2 text-sm flex items-center justify-center gap-2 glow-cyan"><Download size={14}/>Generate</button>
          <button className="w-full rounded-md border border-border py-2 text-sm mt-2">Schedule…</button>
        </Panel>
      </div>
    </>
  );
}
