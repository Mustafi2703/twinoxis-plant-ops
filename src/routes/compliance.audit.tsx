import { createFileRoute } from "@tanstack/react-router";
import { Panel, PageHeader } from "@/components/ui-bits";
import { AUDIT_TRAIL } from "@/lib/mock-data";
import { Lock, Download } from "lucide-react";

export const Route = createFileRoute("/compliance/audit")({
  head: () => ({ meta: [{ title: "Audit Trail (21 CFR Part 11) — TwinOxis" }, { name: "description", content: "Immutable electronic records, audit trail with old/new values for FDA 21 CFR Part 11 compliance." }]}),
  component: Audit,
});

function Audit() {
  return (
    <>
      <PageHeader title="Audit Trail" subtitle="21 CFR Part 11 electronic records — tamper-evident log"
        action={<button className="text-xs rounded-md border border-border px-3 py-1.5 flex items-center gap-1.5"><Download size={14}/>Export CSV</button>}/>
      <Panel>
        <div className="flex items-center gap-2 text-[11px] font-mono text-success mb-3">
          <Lock size={12}/> SHA-256 chained • last seal verified 11:42:01
        </div>
        <table className="w-full text-[12px] font-mono">
          <thead className="text-[10px] uppercase tracking-widest text-muted-foreground"><tr>
            <th className="text-left py-2">Timestamp</th><th className="text-left">User</th><th className="text-left">Action</th><th className="text-left">Module</th><th className="text-left">Old</th><th className="text-left">New</th>
          </tr></thead>
          <tbody>
            {AUDIT_TRAIL.map((r,i)=>(
              <tr key={i} className="border-b border-border/40 hover:bg-primary/5">
                <td className="py-2 text-muted-foreground">{r.t}</td>
                <td className="font-sans">{r.user}</td>
                <td><span className="px-2 py-0.5 rounded border border-primary/30 text-primary text-[10px]">{r.action}</span></td>
                <td>{r.module}</td>
                <td className="text-muted-foreground">{r.old}</td>
                <td className="text-primary">{r.neu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
