import { createFileRoute } from "@tanstack/react-router";
import { Panel, PageHeader } from "@/components/ui-bits";
import { RAW_INVENTORY } from "@/lib/mock-data";

export const Route = createFileRoute("/inventory/raw")({
  head: () => ({ meta: [{ title: "Raw Material Inventory — TwinOxis" }, { name: "description", content: "Lot-traced raw material inventory with reorder, expiry and batch lineage." }]}),
  component: Raw,
});

function Raw() {
  return (
    <>
      <PageHeader title="Raw Material Inventory" subtitle="Lot-traced • reorder alerts • expiry tracking"/>
      <Panel>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
              <th className="text-left py-2 px-2 font-medium">Material</th><th className="text-left">Grade</th>
              <th className="text-right">Stock</th><th className="text-right">Reorder</th><th className="text-left">Expiry</th><th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody className="font-mono text-[12px]">
            {RAW_INVENTORY.map(r=>{
              const low = r.stock < r.reorder;
              const near = r.stock < r.reorder*1.2;
              const status = low ? "REORDER" : near ? "LOW" : "OK";
              const c = low ? "text-destructive border-destructive/40 bg-destructive/10" : near ? "text-warning border-warning/40 bg-warning/10" : "text-success border-success/30 bg-success/10";
              return (
                <tr key={r.item} className="border-b border-border/40 hover:bg-primary/5">
                  <td className="py-2 px-2 font-sans">{r.item}</td>
                  <td>{r.grade}</td>
                  <td className="text-right">{r.stock.toLocaleString()} {r.unit}</td>
                  <td className="text-right text-muted-foreground">{r.reorder} {r.unit}</td>
                  <td>{r.expiry}</td>
                  <td><span className={`text-[10px] px-2 py-0.5 rounded border ${c}`}>{status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
