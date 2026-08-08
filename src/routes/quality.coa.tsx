import { createFileRoute } from "@tanstack/react-router";
import { Panel, PageHeader } from "@/components/ui-bits";
import { Download, FileSignature } from "lucide-react";

export const Route = createFileRoute("/quality/coa")({
  head: () => ({ meta: [{ title: "CoA Generator — TwinOxis" }, { name: "description", content: "Auto-populated Certificate of Analysis with digital signature workflow." }]}),
  component: Coa,
});

function Coa() {
  return (
    <>
      <PageHeader title="Certificate of Analysis Generator" subtitle="Auto-populated from batch data"
        action={<div className="flex gap-2">
          <button className="text-xs rounded-md border border-border px-3 py-1.5 flex items-center gap-1.5"><FileSignature size={14}/>Request QA signature</button>
          <button className="text-xs rounded-md bg-primary text-primary-foreground px-3 py-1.5 flex items-center gap-1.5 glow-cyan"><Download size={14}/>Download PDF</button>
        </div>}/>
      <Panel className="max-w-3xl mx-auto">
        <div className="border border-border rounded-lg p-6 bg-background/40">
          <div className="text-center border-b border-border pb-4 mb-4">
            <div className="font-display text-xl font-bold text-primary">SHREE PHARMA INDUSTRIES PVT. LTD.</div>
            <div className="text-[11px] text-muted-foreground">Ankleshwar, Gujarat • GMP / ISO 9001 Certified</div>
            <div className="font-display text-2xl mt-3">Certificate of Analysis</div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-[12px] font-mono mb-4">
            <Row k="Product" v="Amoxicillin Trihydrate API"/>
            <Row k="Batch No." v="B-2053" hi/>
            <Row k="Mfg Date" v="2025-06-23"/>
            <Row k="Expiry" v="2028-06-22"/>
            <Row k="Quantity" v="420 kg"/>
            <Row k="Reference" v="USP-NF / IP 2022"/>
          </div>
          <table className="w-full text-[12px] font-mono">
            <thead className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
              <tr><th className="text-left py-2">Test</th><th className="text-left">Specification</th><th className="text-left">Result</th><th className="text-left">Status</th></tr>
            </thead>
            <tbody>
              <Test t="Description" s="White crystalline powder" r="Complies"/>
              <Test t="Identification — IR" s="Matches reference" r="Complies"/>
              <Test t="Assay (HPLC)" s="98.0 – 102.0 %" r="99.2 %"/>
              <Test t="Loss on drying" s="≤ 14.5 %" r="11.8 %"/>
              <Test t="Heavy metals" s="≤ 20 ppm" r="< 5 ppm"/>
              <Test t="Particle size D90" s="80 – 120 µm" r="98 µm"/>
            </tbody>
          </table>
          <div className="grid grid-cols-2 gap-6 mt-6 text-[11px] font-mono">
            <div><div className="text-muted-foreground">Analyst</div><div>A. Khan • 25-Jun-2025 11:30</div></div>
            <div><div className="text-muted-foreground">QA Authorised</div><div className="text-warning">pending signature</div></div>
          </div>
        </div>
      </Panel>
    </>
  );
}
function Row({ k, v, hi }: any) { return <div className="flex"><span className="text-muted-foreground w-24">{k}</span><span className={hi?"text-primary":""}>{v}</span></div>; }
function Test({ t, s, r }: any) { return <tr className="border-b border-border/40"><td className="py-1.5">{t}</td><td className="text-muted-foreground">{s}</td><td>{r}</td><td><span className="text-success text-[10px]">PASS</span></td></tr>; }
