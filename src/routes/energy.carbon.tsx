import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, ProgressBar } from "@/components/page-bits";

export const Route = createFileRoute("/energy/carbon")({
  head: () => ({ meta: [{ title: "Carbon Tracker — TwinOxis" }, { name: "description", content: "Scope 1/2/3 carbon footprint tracking with intensity per unit produced." }]}),
  component: () => (
    <SimplePage title="Carbon Footprint Tracker" subtitle="Scope 1 / 2 / 3 emissions"
      kpis={[
        { label:"Total MTD", value:"218", suffix:"tCO₂e", accent:"primary" },
        { label:"Intensity", value:"0.42", suffix:"tCO₂/t", accent:"success" },
        { label:"vs Target", value:"-9%", accent:"success" },
        { label:"YTD", value:"1,420", suffix:"tCO₂e" },
      ]}
      sections={[
        { title:"Annual Goals", full:true, content:(
          <div className="space-y-4">
            {[["Energy reduction",62,"#00D4FF"],["Water reduction",48,"#10B981"],["Waste reduction",71,"#F59E0B"],["Carbon neutrality",34,"#7B2FBE"]].map(([l,v,c])=>(
              <div key={l as string}>
                <div className="flex justify-between text-xs mb-1"><span>{l}</span><span className="font-mono">{v}% of target</span></div>
                <ProgressBar value={v as number} color={c as string}/>
              </div>
            ))}
          </div>
        )},
      ]}/>
  ),
});
