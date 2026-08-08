import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/quality/release")({
  head: () => ({ meta: [{ title: "Batch Release Workflow — TwinOxis" }, { name: "description", content: "Two-person electronic batch release with QC and QA dual signatures." }]}),
  component: () => (
    <SimplePage title="Batch Release Workflow" subtitle="QA / QC dual e-signature"
      sections={[
        { title: "Awaiting Release", full: true, content: (
          <DataTable columns={["Batch","Product","All Tests","QC Sign","QA Sign","Action"]}
            rows={[
              ["B-2053","Amoxicillin API","Pass (12/12)","✔ A. Khan", "Pending", <button className="text-[10px] px-2 py-1 rounded bg-primary text-primary-foreground">Sign & release</button>],
              ["B-2049","Sulphuric Acid","Pass (8/8)",  "✔ A. Khan", "✔ M. Rao", <span className="text-success text-[10px]">RELEASED</span>],
              ["B-2046","Ciprofloxacin","Pending KF","Hold","-",<button className="text-[10px] px-2 py-1 rounded border border-border">Open</button>],
            ]}/>
        )},
      ]}/>
  ),
});
