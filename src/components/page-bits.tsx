import { Panel, PageHeader, KpiCard } from "@/components/ui-bits";
import type { ReactNode } from "react";

export function SimplePage({
  title, subtitle, kpis, sections,
}: {
  title: string;
  subtitle?: string;
  kpis?: Array<{ label: string; value: ReactNode; suffix?: string; delta?: string; accent?: any }>;
  sections: Array<{ title: string; subtitle?: string; content: ReactNode; full?: boolean }>;
}) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      {kpis && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
        </div>
      )}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {sections.map((s, i) => (
          <Panel key={i} title={s.title} subtitle={s.subtitle} className={s.full ? "xl:col-span-2" : ""}>
            {s.content}
          </Panel>
        ))}
      </div>
    </>
  );
}

export function DataTable({ columns, rows }: { columns: string[]; rows: (string | number | ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
            {columns.map((c) => <th key={c} className="text-left py-2 px-2 font-medium">{c}</th>)}
          </tr>
        </thead>
        <tbody className="font-mono text-[12px]">
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/40 hover:bg-primary/5">
              {r.map((cell, j) => <td key={j} className="py-2 px-2">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProgressBar({ value, color = "#00D4FF" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 bg-border rounded-full overflow-hidden">
      <div className="h-full" style={{ width: Math.min(100, value) + "%", background: color, boxShadow: `0 0 6px ${color}` }} />
    </div>
  );
}
