import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/analytics/downtime")({
  head: () => ({ meta: [{ title: "Downtime Analysis — TwinOxis" }, { name: "description", content: "Root-cause Pareto of unplanned downtime by category and equipment." }]}),
  component: () => (
    <SimplePage title="Downtime Analysis" subtitle="MTD unplanned downtime breakdown"
      kpis={[
        { label:"Unplanned (MTD)", value:"42", suffix:"hrs", accent:"warning" },
        { label:"MTBF", value:"712", suffix:"hrs", accent:"primary" },
        { label:"MTTR", value:"3.4", suffix:"hrs", accent:"primary" },
        { label:"₹ Impact", value:"14.8L", accent:"danger" },
      ]}
      sections={[{ title:"Top Causes (Pareto)", full:true, content:(
        <div className="space-y-2">
          {[["Equipment failure",16,"#EF4444"],["Material starvation",9,"#F59E0B"],["Utility (power/steam)",7,"#7B2FBE"],["Changeover",6,"#00D4FF"],["Quality hold",4,"#94A3B8"]].map(([c,v,col])=>(
            <div key={c as string} className="flex items-center gap-3">
              <div className="w-44 text-sm">{c}</div>
              <div className="flex-1 h-5 bg-border/40 rounded overflow-hidden">
                <div className="h-full" style={{width: ((v as number)/16)*100+"%", background: col as string, boxShadow:`0 0 6px ${col}`}}/>
              </div>
              <div className="font-mono text-sm w-12 text-right">{v}h</div>
            </div>
          ))}
        </div>
      )}, { title:"Recent Events", full:true, content:(
        <DataTable columns={["Time","Equipment","Cause","Duration","Impact"]} rows={[
          ["25-Jun 08:14","R-102","Temperature interlock","2.4 h","₹ 4.2L"],
          ["24-Jun 11:00","BLR-01","Scale buildup","3.1 h","₹ 5.6L"],
          ["22-Jun 02:30","Feeder 2","Power dip","1.5 h","₹ 2.8L"],
          ["20-Jun 16:45","C-04","Bearing failure","1.4 h","₹ 2.2L"],
        ]}/>
      )}]}/>
  ),
});
