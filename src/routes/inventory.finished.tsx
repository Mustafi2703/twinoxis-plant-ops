import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/inventory/finished")({
  head: () => ({ meta: [{ title: "Finished Goods — TwinOxis" }, { name: "description", content: "Finished goods inventory by batch with QC and dispatch status." }]}),
  component: () => (
    <SimplePage title="Finished Goods Tracker" subtitle="Batch • QC status • dispatch"
      sections={[{ title:"Stock", full:true, content:(
        <DataTable columns={["Batch","Product","Quantity","QC","Customer","Dispatch"]} rows={[
          ["B-2049","Sulphuric Acid AA","12,000 L","Released","Aarti Industries","Scheduled 26-Jun"],
          ["B-2045","Ciprofloxacin API","380 kg","Released","Cipla","Dispatched"],
          ["B-2041","Paracetamol API","450 kg","Released","Sun Pharma","Dispatched"],
        ]}/>
      )}]}/>
  ),
});
