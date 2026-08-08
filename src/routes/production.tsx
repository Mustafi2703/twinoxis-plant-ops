import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";
import { BATCHES } from "@/lib/mock-data";

export const Route = createFileRoute("/production")({
  head: () => ({ meta: [{ title: "Production Tracker — TwinOxis" }, { name: "description", content: "Live production tracking against plan, by line and product." }]}),
  component: () => (
    <SimplePage title="Production Tracker" subtitle="Today's plan vs actual"
      kpis={[
        { label: "Planned", value: "1,050", suffix: "kg" },
        { label: "Produced", value: "892", suffix: "kg", accent: "primary" },
        { label: "Variance", value: "-15%", accent: "warning" },
        { label: "Forecast EOD", value: "1,020", suffix: "kg", accent: "success" },
      ]}
      sections={[
        { title: "Today's Lines", full: true, content: (
          <DataTable columns={["Batch","Product","Equipment","Operator","Progress","ETA"]}
            rows={BATCHES.map(b=>[<span className="text-primary">{b.id}</span>, <span className="font-sans">{b.product}</span>, b.equipment, <span className="font-sans">{b.operator}</span>, b.progress+"%", b.eta])}/>
        )},
      ]}/>
  ),
});
