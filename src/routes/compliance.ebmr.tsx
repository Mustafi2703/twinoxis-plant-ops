import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/page-bits";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/compliance/ebmr")({
  head: () => ({ meta: [{ title: "eBMR — TwinOxis" }, { name: "description", content: "Electronic Batch Manufacturing Records — tamper-evident, signed digital batch records." }]}),
  component: () => (
    <SimplePage title="Electronic Batch Manufacturing Records" subtitle="Tamper-evident digital batch records"
      sections={[
        { title:"Recent eBMR", full:true, content:(
          <div className="space-y-2">
            {["B-2054","B-2049","B-2047","B-2045","B-2043"].map((b,i)=>(
              <div key={b} className="flex items-center gap-3 p-3 rounded-lg border border-border/60 hover:border-primary/40">
                <Lock size={14} className="text-success"/>
                <div className="font-mono text-primary">{b}</div>
                <div className="flex-1 text-sm">Locked — released {["25-Jun","24-Jun","22-Jun","20-Jun","18-Jun"][i]} 2025 • SHA-256 verified</div>
                <button className="text-xs rounded border border-border px-3 py-1">Open</button>
                <button className="text-xs rounded border border-primary/40 text-primary px-3 py-1">PDF</button>
              </div>
            ))}
          </div>
        )},
      ]}/>
  ),
});
