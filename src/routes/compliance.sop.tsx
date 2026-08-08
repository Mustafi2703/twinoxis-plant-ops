import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/compliance/sop")({
  head: () => ({ meta: [{ title: "SOP Library — TwinOxis" }, { name: "description", content: "Standard operating procedure library with version control, approval and acknowledgement tracking." }]}),
  component: () => (
    <SimplePage title="SOP Library & Management" subtitle="Versioned, approved, acknowledged"
      sections={[{ title:"Active SOPs", full:true, content: (
        <DataTable columns={["SOP ID","Title","Version","Department","Effective","Acknowledged"]}
          rows={[
            ["SOP-PRD-014","Reactor Charging Procedure","v3.2","Reaction","2025-04-01","42/45"],
            ["SOP-QC-008","HPLC Assay Method — Amoxicillin","v2.1","QC","2025-03-12","12/12"],
            ["SOP-EHS-021","Emergency Spill Response","v4.0","EHS","2025-05-20","78/80"],
            ["SOP-MAINT-005","Pump P-Series PM","v1.4","Maintenance","2024-12-01","14/14"],
          ]}/>
      )}]}/>
  ),
});
