import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/predictive/work-orders")({
  head: () => ({ meta: [{ title: "Work Orders — TwinOxis" }, { name: "description", content: "Maintenance work order management with priority, status and spare parts linkage." }]}),
  component: () => (
    <SimplePage title="Work Order Management" subtitle="Create • assign • track"
      kpis={[
        { label:"Open", value:14, accent:"primary" },
        { label:"In Progress", value:6, accent:"warning" },
        { label:"Completed (7d)", value:22, accent:"success" },
        { label:"Overdue", value:2, accent:"danger" },
      ]}
      sections={[{ title:"Active Work Orders", full:true, content:(
        <DataTable columns={["WO","Equipment","Task","Priority","Assignee","Due","Status"]} rows={[
          ["WO-1402",<span className="text-primary">M-02</span>,"Replace bearing","CRITICAL","H. Shah","Today",<span className="text-warning text-[10px]">IN-PROGRESS</span>],
          ["WO-1403",<span className="text-primary">BLR-01</span>,"Descaling","HIGH","K. Rao","Tomorrow",<span className="text-primary text-[10px]">OPEN</span>],
          ["WO-1404",<span className="text-primary">P-05</span>,"Seal replacement","MED","H. Shah","27-Jun",<span className="text-primary text-[10px]">OPEN</span>],
          ["WO-1395",<span className="text-primary">C-04</span>,"Motor inspection","LOW","K. Rao","23-Jun",<span className="text-destructive text-[10px]">OVERDUE</span>],
        ]}/>
      )}]}/>
  ),
});
