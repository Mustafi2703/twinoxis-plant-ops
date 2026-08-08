import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type RoleId =
  | "operator"
  | "production"
  | "qc"
  | "compliance"
  | "plant_manager"
  | "executive"
  | "maintenance"
  | "ehs";

export interface Role {
  id: RoleId;
  name: string;
  short: string;
  description: string;
  allowed: string[]; // module keys
}

export const ROLES: Role[] = [
  { id: "executive",     short: "CEO/COO",       name: "C-Suite Executive",       description: "High-level KPIs, multi-plant view", allowed: ["overview","analytics"] },
  { id: "plant_manager", short: "Plant Mgr",     name: "Plant Manager",           description: "Full operational visibility",       allowed: ["overview","operations","quality","compliance","predictive","energy","ehs","inventory","analytics","settings"] },
  { id: "operator",      short: "Operator",      name: "Plant Operator",          description: "Floor-level real-time monitoring",  allowed: ["operations"] },
  { id: "production",    short: "Production",    name: "Production Manager",      description: "Production + OEE + QC",             allowed: ["operations","quality","analytics"] },
  { id: "qc",            short: "QC",            name: "Quality Control Officer", description: "Quality testing & release",         allowed: ["quality","compliance"] },
  { id: "compliance",    short: "Compliance",    name: "Compliance & Regulatory", description: "GMP, 21 CFR, audits",               allowed: ["compliance"] },
  { id: "maintenance",   short: "Maintenance",   name: "Maintenance Engineer",    description: "Equipment + work orders",           allowed: ["predictive","operations"] },
  { id: "ehs",           short: "EHS",           name: "EHS Officer",             description: "Safety, environment, emissions",    allowed: ["ehs","energy"] },
];

interface RoleCtx {
  role: Role;
  setRole: (id: RoleId) => void;
  can: (moduleKey: string) => boolean;
}

const Ctx = createContext<RoleCtx | null>(null);

export function RoleProvider({
  children,
  initialRoleId = "plant_manager",
}: {
  children: ReactNode;
  initialRoleId?: RoleId;
}) {
  const [roleId, setRoleId] = useState<RoleId>(initialRoleId);

  useEffect(() => {
    setRoleId(initialRoleId);
  }, [initialRoleId]);

  const role = ROLES.find((r) => r.id === roleId)!;
  const can = (m: string) => role.allowed.includes(m);
  return <Ctx.Provider value={{ role, setRole: setRoleId, can }}>{children}</Ctx.Provider>;
}

export function useRole() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useRole outside provider");
  return c;
}
