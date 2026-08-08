import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, ProgressBar } from "@/components/page-bits";

export const Route = createFileRoute("/ehs/ppe")({
  head: () => ({ meta: [{ title: "PPE Compliance — TwinOxis" }, { name: "description", content: "Zone-wise PPE compliance via camera analytics." }]}),
  component: () => (
    <SimplePage title="PPE Compliance Tracker" subtitle="Camera-vision compliance by zone"
      kpis={[
        { label:"Plant Average", value:"96", suffix:"%", accent:"success" },
        { label:"Violations Today", value:3, accent:"warning" },
        { label:"Cameras Online", value:"24/24", accent:"primary" },
        { label:"Zones Monitored", value:8 },
      ]}
      sections={[
        { title:"Zone-wise Compliance", full:true, content:(
          <div className="space-y-3">
            {[["Reactor floor",98,"#10B981"],["Packaging line",94,"#10B981"],["QC laboratory",100,"#10B981"],["Solvent yard",87,"#F59E0B"],["Maintenance bay",92,"#00D4FF"]].map(([z,v,c])=>(
              <div key={z as string}>
                <div className="flex justify-between text-xs mb-1"><span>{z}</span><span className="font-mono">{v}%</span></div>
                <ProgressBar value={v as number} color={c as string}/>
              </div>
            ))}
          </div>
        )},
      ]}/>
  ),
});
