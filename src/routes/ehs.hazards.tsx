import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/ehs/hazards")({
  head: () => ({ meta: [{ title: "Chemical Hazard Register — TwinOxis" }, { name: "description", content: "GHS-classified chemical hazard inventory with SDS, storage and expiry." }]}),
  component: () => (
    <SimplePage title="Chemical Hazard Register" subtitle="GHS classification • SDS • storage"
      sections={[{ title:"On-site Chemicals", full:true, content:(
        <DataTable columns={["Chemical","GHS Class","Quantity","Storage","Expiry","SDS"]} rows={[
          ["Sulphuric Acid 98%","Corrosive (H314)","8,800 L","Acid Tank Farm A","2028-06-30",<span className="text-primary text-[10px]">VIEW</span>],
          ["Methanol","Flammable (H225), Toxic (H301)","6,500 L","Solvent yard","2027-09-04",<span className="text-primary text-[10px]">VIEW</span>],
          ["Sodium Hydroxide","Corrosive (H314)","540 kg","Caustic Store","2027-01-08",<span className="text-primary text-[10px]">VIEW</span>],
          ["Acetic Anhydride","Flammable (H226), Corrosive","2,100 L","Reactor feed B","2026-07-19",<span className="text-primary text-[10px]">VIEW</span>],
        ]}/>
      )}]}/>
  ),
});
