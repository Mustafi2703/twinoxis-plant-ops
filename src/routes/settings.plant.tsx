import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/page-bits";

export const Route = createFileRoute("/settings/plant")({
  head: () => ({ meta: [{ title: "Plant Configuration — TwinOxis" }, { name: "description", content: "Plant master configuration." }]}),
  component: () => (
    <SimplePage title="Plant Configuration" subtitle="Master setup"
      sections={[{ title:"Identity", content:(
        <div className="space-y-3 text-sm">
          <Field label="Plant Name" value="Shree Pharma Industries Pvt. Ltd."/>
          <Field label="Address" value="Plot 24-A, GIDC Ankleshwar, Gujarat, India"/>
          <Field label="License" value="GMP-2023-AKL-0421"/>
          <Field label="Timezone" value="IST (UTC+5:30)"/>
        </div>
      )}, { title:"Capacity", content:(
        <div className="space-y-3 text-sm">
          <Field label="Reactors" value="6 units / 12,000 L total"/>
          <Field label="Filling lines" value="3"/>
          <Field label="Boiler capacity" value="6 t/h steam"/>
          <Field label="Effluent treatment" value="180 KL/day"/>
        </div>
      )}]}/>
  ),
});
function Field({label,value}:any){return <div className="flex"><span className="w-40 text-muted-foreground">{label}</span><span className="font-mono">{value}</span></div>;}
