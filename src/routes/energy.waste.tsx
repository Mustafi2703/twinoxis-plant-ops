import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/energy/waste")({
  head: () => ({ meta: [{ title: "Waste Management — TwinOxis" }, { name: "description", content: "Hazardous and non-hazardous waste tracking with disposal manifests." }]}),
  component: () => (
    <SimplePage title="Waste Management" subtitle="Hazardous & non-hazardous waste streams"
      sections={[{ title:"Recent Disposal Manifests", full:true, content:(
        <DataTable columns={["Manifest","Waste Stream","Quantity","Disposer","Date","Status"]} rows={[
          ["MAN-0421","Spent solvent — Methanol","2,400 L","Bharuch Enviro","2025-06-22","Disposed"],
          ["MAN-0420","Process sludge","1.2 t","Bharuch Enviro","2025-06-18","Disposed"],
          ["MAN-0419","ETP biosolids","800 kg","GIDC CETP","2025-06-15","Disposed"],
        ]}/>
      )}]}/>
  ),
});
