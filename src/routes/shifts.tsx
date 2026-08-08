import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/shifts")({
  head: () => ({ meta: [{ title: "Shift Management — TwinOxis" }, { name: "description", content: "Shift planning, handover, and live attendance for plant operations." }]}),
  component: () => (
    <SimplePage title="Shift Management" subtitle="Roster, handovers, attendance"
      kpis={[
        { label: "On shift now", value: 28 },
        { label: "Absent", value: 2, accent: "warning" },
        { label: "Overtime hrs", value: 14, accent: "secondary" },
        { label: "Next shift", value: "16:00", accent: "primary" },
      ]}
      sections={[
        { title: "Today's Roster", full: true, content: (
          <DataTable columns={["Shift","Lead","Operators","Status"]}
            rows={[
              ["Morning 06:00–14:00","R. Patel","12","Active"],
              ["Afternoon 14:00–22:00","S. Mehta","11","Scheduled"],
              ["Night 22:00–06:00","V. Iyer","9","Scheduled"],
            ]}/>
        )},
        { title: "Handover Notes", content: (
          <ul className="text-sm space-y-2">
            <li className="border-l-2 border-primary pl-3"><strong>Morning → Afternoon:</strong> Reactor R-102 cooled, await QC clearance B-2051.</li>
            <li className="border-l-2 border-warning pl-3"><strong>Afternoon → Night:</strong> Watch Mixer M-02 vibration; spare bearing ordered.</li>
          </ul>
        )},
        { title: "Absence Log", content: (
          <ul className="font-mono text-[12px] space-y-1">
            <li>D. Verma — sick leave — covered by R. Singh</li>
            <li>K. Joshi — planned leave — covered by overtime</li>
          </ul>
        )},
      ]}/>
  ),
});
