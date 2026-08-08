import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/predictive/alerts")({
  head: () => ({ meta: [{ title: "Predictive Alerts — TwinOxis" }, { name: "description", content: "AI-detected anomalies and predicted equipment failures with recommended actions." }]}),
  component: () => (
    <SimplePage title="Predictive Maintenance Alerts" subtitle="AI anomaly detection across critical equipment"
      sections={[{ title:"Active Alerts", full:true, content:(
        <DataTable columns={["Equipment","Anomaly","Severity","Predicted Failure","Recommended Action","WO"]} rows={[
          [<span className="text-primary">M-02</span>,"Bearing vibration > 6 mm/s","HIGH","2025-07-04 (±3d)","Replace front bearing", <button className="text-[10px] px-2 py-1 rounded bg-primary text-primary-foreground">Create WO</button>],
          [<span className="text-primary">BLR-01</span>,"Scale buildup detected","MED","2025-07-18 (±5d)","Schedule descaling", <button className="text-[10px] px-2 py-1 rounded bg-primary text-primary-foreground">Create WO</button>],
          [<span className="text-primary">C-04</span>,"Motor current asymmetry","LOW","2025-08-12 (±10d)","Inspect rotor balance", <button className="text-[10px] px-2 py-1 rounded border border-border">View</button>],
          [<span className="text-primary">P-05</span>,"Seal leak rate trend","MED","2025-07-22 (±4d)","Replace mechanical seal", <button className="text-[10px] px-2 py-1 rounded bg-primary text-primary-foreground">Create WO</button>],
        ]}/>
      )}]}/>
  ),
});
