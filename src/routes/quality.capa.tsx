import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/quality/capa")({
  head: () => ({ meta: [{ title: "Deviation & CAPA — TwinOxis" }, { name: "description", content: "Log deviations, run root cause and CAPA workflows with effectiveness review." }]}),
  component: () => (
    <SimplePage title="Deviation & CAPA Manager" subtitle="Track deviations through root cause → corrective → preventive → effectiveness"
      kpis={[
        { label: "Open Deviations", value: 7, accent: "warning" },
        { label: "Open CAPAs", value: 4, accent: "primary" },
        { label: "Overdue", value: 1, accent: "danger" },
        { label: "Closed (30d)", value: 18, accent: "success" },
      ]}
      sections={[
        { title: "Active Deviations", full: true, content: (
          <DataTable columns={["ID","Batch","Description","Impact","Owner","Stage"]} rows={[
            ["DEV-0214","B-2049","Temp excursion 5°C above UCL","Medium","A. Khan","Root Cause"],
            ["DEV-0213","B-2046","KF moisture out of spec","High","D. Verma","Corrective Action"],
            ["DEV-0212","B-2041","Label print misalignment","Low","S. Mehta","Effectiveness Review"],
          ]}/>
        )},
        { title: "CAPA Pipeline", full: true, content: (
          <div className="grid grid-cols-5 gap-2 text-[11px] font-mono text-center">
            {["Root Cause","Corrective","Preventive","Effectiveness","Closed"].map((s,i)=>(
              <div key={s} className="glass-panel rounded-lg p-3">
                <div className="text-muted-foreground uppercase">{s}</div>
                <div className="font-display text-2xl text-primary mt-1">{[3,4,2,2,18][i]}</div>
              </div>
            ))}
          </div>
        )},
      ]}/>
  ),
});
