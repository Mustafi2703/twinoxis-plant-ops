import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable, ProgressBar } from "@/components/page-bits";

export const Route = createFileRoute("/health")({
  head: () => ({ meta: [{ title: "Plant Health Score — TwinOxis" }, { name: "description", content: "Composite plant health index across reliability, quality, safety, energy and compliance." }]}),
  component: () => (
    <SimplePage title="Plant Health Score" subtitle="Composite index — last 90 days"
      kpis={[
        { label: "Health", value: 82, suffix: "/100", delta: "▲ 2.1 vs LW" },
        { label: "Reliability", value: 88, suffix: "/100", accent: "success" },
        { label: "Quality", value: 94, suffix: "/100", accent: "success" },
        { label: "Compliance", value: 91, suffix: "/100", accent: "primary" },
      ]}
      sections={[
        { title: "Subscore Breakdown", full: true, content: (
          <div className="space-y-3">
            {[["Reliability",88,"#10B981"],["Quality",94,"#10B981"],["Safety",79,"#F59E0B"],["Energy efficiency",72,"#F59E0B"],["Compliance",91,"#00D4FF"],["Predictive readiness",81,"#7B2FBE"]].map(([l,v,c])=>(
              <div key={l as string}>
                <div className="flex justify-between text-xs mb-1"><span>{l}</span><span className="font-mono">{v}/100</span></div>
                <ProgressBar value={v as number} color={c as string}/>
              </div>
            ))}
          </div>
        )},
      ]}/>
  ),
});
