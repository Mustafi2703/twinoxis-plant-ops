import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, DataTable } from "@/components/page-bits";

export const Route = createFileRoute("/settings/users")({
  head: () => ({ meta: [{ title: "User Management — TwinOxis" }, { name: "description", content: "Manage users, roles, and access policies." }]}),
  component: () => (
    <SimplePage title="User Management" subtitle="Users, roles, access policies"
      sections={[{ title:"Users", full:true, content:(
        <DataTable columns={["Name","Email","Role","Last Login","Status"]} rows={[
          ["Rajiv Patel","r.patel@shreepharma.in","Plant Manager","2 min ago","Active"],
          ["Aisha Khan","a.khan@shreepharma.in","QC Officer","8 min ago","Active"],
          ["Sandeep Mehta","s.mehta@shreepharma.in","Production Mgr","1 hr ago","Active"],
          ["Vinay Iyer","v.iyer@shreepharma.in","Plant Operator","Online","Active"],
          ["Meena Rao","m.rao@shreepharma.in","Compliance","Yesterday","Active"],
        ]}/>
      )}]}/>
  ),
});
