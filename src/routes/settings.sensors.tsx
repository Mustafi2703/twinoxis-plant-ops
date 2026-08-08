import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/settings/sensors")({
  head: () => ({ meta: [{ title: "Sensors & IoT — TwinOxis" }, { name: "description", content: "IoT device manager and threshold configuration." }]}),
  component: () => (
    <SimplePage title="Sensors & IoT Device Manager" subtitle="Edge gateways • 1,248 tags"
      kpis={[
        { label:"Total Sensors", value:"1,248", accent:"primary" },
        { label:"Online", value:"1,242", accent:"success" },
        { label:"Faulty", value:6, accent:"warning" },
        { label:"Gateways", value:8 },
      ]}
      sections={[{ title:"Edge Gateways", full:true, content:(
        <DataTable columns={["Gateway","Protocol","Tags","Status","Last Seen"]} rows={[
          ["GW-RX-01","OPC-UA","420","Online","2s"],
          ["GW-RX-02","OPC-UA","380","Online","1s"],
          ["GW-UT-01","Modbus TCP","220","Online","4s"],
          ["GW-EHS-01","MQTT","168","Online","2s"],
          ["GW-PKG-01","OPC-UA","60","Degraded","48s"],
        ]}/>
      )}]}/>
  ),
});
