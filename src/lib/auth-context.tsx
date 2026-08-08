import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { RoleId } from "@/lib/role-context";

const STORAGE_KEY = "twinoxis.session";

export type SessionUser = {
  name: string;
  email: string;
  initials: string;
  roleId: RoleId;
  plant: string;
};

type AuthCtx = {
  user: SessionUser | null;
  ready: boolean;
  login: (input: { email: string; password: string; roleId?: RoleId }) => Promise<{ ok: true } | { ok: false; error: string }>;
  loginAsDemo: (roleId?: RoleId) => void;
  logout: () => void;
};

const DEMO_USERS: Record<string, Omit<SessionUser, "email"> & { password: string }> = {
  "admin@twinoxis.com": {
    name: "Rajiv Patel",
    initials: "RP",
    roleId: "plant_manager",
    plant: "Shree Pharma · Ankleshwar",
    password: "twinoxis",
  },
  "ceo@twinoxis.com": {
    name: "Ananya Shah",
    initials: "AS",
    roleId: "executive",
    plant: "Shree Pharma · Network",
    password: "twinoxis",
  },
  "operator@twinoxis.com": {
    name: "Mehul Desai",
    initials: "MD",
    roleId: "operator",
    plant: "Shree Pharma · Floor A",
    password: "twinoxis",
  },
};

const Ctx = createContext<AuthCtx | null>(null);

function readSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readSession());
    setReady(true);
  }, []);

  const persist = (next: SessionUser | null) => {
    setUser(next);
    if (typeof window === "undefined") return;
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login: AuthCtx["login"] = async ({ email, password, roleId }) => {
    const key = email.trim().toLowerCase();
    const match = DEMO_USERS[key];
    if (!match || match.password !== password) {
      // Accept any email with password twinoxis for demo flexibility
      if (password !== "twinoxis" || !email.includes("@")) {
        return { ok: false, error: "Invalid credentials. Use demo access or password twinoxis." };
      }
      const name = email.split("@")[0]!.replace(/[._]/g, " ");
      const pretty = name.replace(/\b\w/g, (c) => c.toUpperCase());
      persist({
        name: pretty,
        email: key,
        initials: pretty.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase() || "TX",
        roleId: roleId ?? "plant_manager",
        plant: "Shree Pharma · Ankleshwar",
      });
      return { ok: true };
    }
    persist({
      name: match.name,
      email: key,
      initials: match.initials,
      roleId: roleId ?? match.roleId,
      plant: match.plant,
    });
    return { ok: true };
  };

  const loginAsDemo = (roleId: RoleId = "plant_manager") => {
    persist({
      name: "Rajiv Patel",
      email: "admin@twinoxis.com",
      initials: "RP",
      roleId,
      plant: "Shree Pharma · Ankleshwar",
    });
  };

  const logout = () => persist(null);

  return (
    <Ctx.Provider value={{ user, ready, login, loginAsDemo, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth outside provider");
  return c;
}

export const DEMO_CREDENTIALS = [
  { email: "admin@twinoxis.com", label: "Plant Manager", roleId: "plant_manager" as RoleId },
  { email: "ceo@twinoxis.com", label: "Executive", roleId: "executive" as RoleId },
  { email: "operator@twinoxis.com", label: "Floor Operator", roleId: "operator" as RoleId },
];
