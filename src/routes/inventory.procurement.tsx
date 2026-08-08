import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/inventory/procurement")({
  head: () => ({ meta: [{ title: "Procurement Alerts — TwinOxis" }, { name: "description", content: "Auto-generated purchase requests and procurement pipeline." }]}),
  component: () => (
    <SimplePage title="Procurement Alerts" subtitle="Auto-PR when stock < reorder"
      sections={[{ title:"Pending Requests", full:true, content:(
        <DataTable columns={["PR No.","Material","Quantity","Vendor","Status","Required By"]} rows={[
          ["PR-0921","Sodium Hydroxide","2,000 kg","GACL","Approval","30-Jun"],
          ["PR-0922","Amoxicillin Intermediate","500 kg","BASF India","Approved","02-Jul"],
          ["PR-0923","HPLC Methanol","2,000 L","Solvay","Quote","05-Jul"],
        ]}/>
      )}]}/>
  ),
});
