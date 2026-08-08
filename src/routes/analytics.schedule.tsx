import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/analytics/schedule")({
  head: () => ({ meta: [{ title: "Scheduled Reports — TwinOxis" }, { name: "description", content: "Recurring report schedules and recipients." }]}),
  component: () => (
    <SimplePage title="Scheduled Reports" subtitle="Recurring deliveries"
      sections={[{ title:"Schedules", full:true, content:(
        <DataTable columns={["Report","Frequency","Next Run","Recipients","Format"]} rows={[
          ["Daily OEE Brief","Daily 07:00","Tomorrow 07:00","ops@shreepharma.in (8)","PDF"],
          ["Weekly Quality Pack","Mon 09:00","Mon 09:00","qa@shreepharma.in (4)","PDF + XLSX"],
          ["Monthly Compliance","1st 06:00","01-Jul 06:00","compliance@shreepharma.in (6)","PDF"],
        ]}/>
      )}]}/>
  ),
});
