import { createFileRoute } from "@tanstack/react-router";
import { Panel, PageHeader } from "@/components/ui-bits";
import { SCENARIOS } from "@/lib/mock-data";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/predictive/simulation")({
  head: () => ({ meta: [{ title: "Twin Simulation (What-If) — TwinOxis" }, { name: "description", content: "Run digital twin scenarios to predict yield, quality, energy and cycle time impact before changing live operations." }]}),
  component: Sim,
});

function Sim() {
  const [temp, setTemp] = useState(142);
  const [pressure, setPressure] = useState(4.2);
  const [size, setSize] = useState(100);
  const [saved, setSaved] = useState(false);
  const yieldDelta = ((temp-142)*0.4 + (size-100)*0.18).toFixed(1);
  const qualityDelta = ((temp-142)*-0.2 + (pressure-4.2)*-0.3).toFixed(2);
  const energyDelta = ((temp-142)*0.6 + (size-100)*0.14).toFixed(1);
  const cycleDelta = ((size-100)*0.08 + (temp-142)*-0.3).toFixed(1);
  const confidence = Math.max(72, Math.min(96, 91 - Math.abs(temp - 142) * 0.4 - Math.abs(size - 100) * 0.08)).toFixed(0);

  return (
    <>
      <div className="mb-4 flex items-center gap-2 rounded-md border border-warning/40 bg-warning/10 text-warning px-3 py-2 text-sm">
        <AlertTriangle size={16}/> Simulation Mode — mirrored twin only. Changes never write back to SCADA / MES.
      </div>
      <PageHeader title="Digital Twin Simulation" subtitle="What-if on Reactor R-101 digital twin · physics + ML surrogate"/>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <Panel title="Scenario Inputs" subtitle="Drag to explore operating envelope">
          <Slider label="Reaction Temperature" value={temp} min={120} max={170} step={1} unit="°C" onChange={setTemp}/>
          <Slider label="Pressure"             value={pressure} min={1} max={8} step={0.1} unit="bar" onChange={setPressure}/>
          <Slider label="Batch Size %"         value={size} min={50} max={150} step={1} unit="%" onChange={setSize}/>
          <div className="mt-3 text-[11px] font-mono text-muted-foreground">Model confidence {confidence}% · trained on 18 months batch history</div>
          <button
            type="button"
            onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 1800); }}
            className="mt-4 w-full rounded-md bg-primary text-primary-foreground py-2 text-sm glow-cyan"
          >
            {saved ? "Scenario saved to twin library ✓" : "Save scenario to twin library"}
          </button>
        </Panel>
        <Panel title="Predicted vs Current" subtitle="Delta vs live setpoints">
          <div className="grid grid-cols-2 gap-3">
            <Out label="Yield"   delta={yieldDelta}   unit="%"/>
            <Out label="Quality" delta={qualityDelta} unit="%" lowerBetter={false} reverse/>
            <Out label="Energy"  delta={energyDelta}  unit="%" reverse/>
            <Out label="Cycle"   delta={cycleDelta}   unit="%" reverse/>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Tip: raise temperature for faster cycle, watch quality drop past ~155°C — classic twin trade-off demo.</p>
        </Panel>
      </div>
      <Panel title="Saved Scenarios">
        <table className="w-full text-[12px] font-mono">
          <thead className="text-[10px] uppercase tracking-widest text-muted-foreground"><tr><th className="text-left py-2">Name</th><th className="text-right">Yield</th><th className="text-right">Quality</th><th className="text-right">Energy</th><th className="text-right">Cycle</th></tr></thead>
          <tbody>
            {SCENARIOS.map(s=>(
              <tr key={s.id} className="border-b border-border/40">
                <td className="py-2 font-sans">{s.name}</td>
                <td className="text-right text-success">{s.yield}</td>
                <td className="text-right text-warning">{s.quality}</td>
                <td className="text-right text-destructive">{s.energy}</td>
                <td className="text-right text-primary">{s.cycle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}

function Slider({ label, value, min, max, step, unit, onChange }: any) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{label}</span><span className="font-mono text-primary">{value} {unit}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e)=>onChange(Number(e.target.value))} className="w-full accent-primary"/>
    </div>
  );
}
function Out({ label, delta, unit, reverse }: any) {
  const n = parseFloat(delta);
  const good = reverse ? n < 0 : n > 0;
  const c = n === 0 ? "#94A3B8" : good ? "#10B981" : "#EF4444";
  return (
    <div className="glass-panel rounded-md p-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label} Δ</div>
      <div className="font-display text-2xl font-bold mt-1" style={{color:c}}>{n > 0 ? "+" : ""}{delta}{unit}</div>
    </div>
  );
}
