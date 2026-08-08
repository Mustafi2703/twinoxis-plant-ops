import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable, ProgressBar } from "@/components/page-bits";

export const Route = createFileRoute("/inventory/vendors")({
  head: () => ({ meta: [{ title: "Vendor Performance — TwinOxis" }, { name: "description", content: "Vendor scorecards: on-time delivery, quality rejection, pending POs." }]}),
  component: () => (
    <SimplePage title="Vendor Performance" subtitle="On-time delivery • quality • pending POs"
      sections={[{ title:"Top Vendors", full:true, content:(
        <DataTable columns={["Vendor","OTD %","Reject %","Pending POs","Score"]} rows={[
          ["BASF India",<><ProgressBar value={96} color="#10B981"/></>,"0.4%","2","A"],
          ["GACL",<><ProgressBar value={91} color="#10B981"/></>,"0.8%","3","A"],
          ["Solvay",<><ProgressBar value={84} color="#F59E0B"/></>,"1.6%","1","B"],
          ["Local Solvents Ltd",<><ProgressBar value={68} color="#EF4444"/></>,"3.2%","5","C"],
        ]}/>
      )}]}/>
  ),
});
