import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/ehs/incidents")({
  head: () => ({ meta: [{ title: "Safety Incidents — TwinOxis" }, { name: "description", content: "Plant safety incident reporting and investigation tracking." }]}),
  component: () => (
    <SimplePage title="Safety Incident Log" subtitle="Reportable incidents and near misses"
      kpis={[
        { label:"Days Since Last Incident", value:142, accent:"success" },
        { label:"TRIR (12-mo)", value:"0.62", accent:"primary" },
        { label:"Near Miss (mo)", value:4, accent:"warning" },
        { label:"Open Actions", value:3, accent:"primary" },
      ]}
      sections={[{ title:"Recent Incidents", full:true, content:(
        <DataTable columns={["ID","Type","Location","Severity","Status","Date"]} rows={[
          ["INC-0182","Near miss — slip","Reactor area","Low","Closed","2025-06-12"],
          ["INC-0181","Minor chemical splash","Lab QC-02","Medium","Investigation","2025-06-04"],
          ["INC-0180","Fire alarm — false","Boiler room","Low","Closed","2025-05-28"],
        ]}/>
      )}]}/>
  ),
});
