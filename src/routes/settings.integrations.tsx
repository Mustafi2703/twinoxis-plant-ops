import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/page-bits";
import { Plug } from "lucide-react";

export const Route = createFileRoute("/settings/integrations")({
  head: () => ({ meta: [{ title: "Integrations — TwinOxis" }, { name: "description", content: "ERP, LIMS, SCADA and external integrations." }]}),
  component: () => (
    <SimplePage title="Integration Hub" subtitle="ERP • LIMS • SCADA • CPCB OCEMS"
      sections={[{ title:"Connected Systems", full:true, content:(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {n:"SAP S/4HANA",t:"ERP",s:"Connected",c:"success"},
            {n:"LabWare LIMS",t:"LIMS",s:"Connected",c:"success"},
            {n:"Siemens PCS 7",t:"SCADA",s:"Connected",c:"success"},
            {n:"CPCB OCEMS",t:"Regulatory",s:"Connected",c:"success"},
            {n:"Salesforce",t:"CRM",s:"Not connected",c:"muted"},
            {n:"Maximo",t:"CMMS",s:"Pending",c:"warning"},
          ].map(i=>(
            <div key={i.n} className="glass-panel rounded-lg p-4 hover-glow">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-md bg-primary/10 grid place-items-center text-primary"><Plug size={16}/></div>
                <div><div className="font-semibold">{i.n}</div><div className="text-[11px] text-muted-foreground">{i.t}</div></div>
              </div>
              <div className={`mt-3 text-[10px] uppercase font-mono tracking-widest ${i.c==="success"?"text-success":i.c==="warning"?"text-warning":"text-muted-foreground"}`}>● {i.s}</div>
              <button className="mt-2 text-xs w-full rounded border border-border py-1">{i.c==="success"?"Configure":"Connect"}</button>
            </div>
          ))}
        </div>
      )}]}/>
  ),
});
