import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/energy/utilities")({
  head: () => ({ meta: [{ title: "Utilities Dashboard — TwinOxis" }, { name: "description", content: "Water, steam, compressed air and gas usage across the plant." }]}),
  component: () => (
    <SimplePage title="Utility Dashboard" subtitle="Water • Steam • Compressed Air • Gas"
      sections={[{ title:"Today's Utility Consumption", full:true, content:(
        <DataTable columns={["Utility","Consumed","Target","Variance","Cost"]} rows={[
          ["Water (KL)","184","200","-8%","₹ 9,200"],
          ["Steam (t)","18.2","20.0","-9%","₹ 36,400"],
          ["Compressed air (Nm³)","8,420","8,000","+5%","₹ 4,210"],
          ["Natural gas (m³)","820","900","-9%","₹ 14,760"],
        ]}/>
      )}]}/>
  ),
});
