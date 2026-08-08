import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Factory, FlaskConical, ShieldCheck, Activity,
  Zap, AlertOctagon, Boxes, BarChart3, Settings as SettingsIcon,
  Bell, ChevronLeft, ChevronRight, Circle, GitBranch, Users,
  ClipboardList, Award, FileSignature, FileText, BookOpen, FileBox,
  HeartPulse, Wrench, AlertTriangle, Sliders, Leaf, Droplets, Recycle,
  Flame, ShieldAlert, HardHat, Package, Truck, ShoppingCart, Gauge,
  TimerReset, FileBarChart, CalendarClock, Cpu, Plug, ChevronDown, LogOut,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import twinoxisLogo from "@/assets/twinoxis-logo.png";
import { ROLES, useRole } from "@/lib/role-context";
import { useAuth } from "@/lib/auth-context";
import { PLANT, ALERTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: any; module: string };
type NavGroup = { title: string; items: NavItem[] };

const NAV: NavGroup[] = [
  { title: "Overview", items: [
    { to: "/", label: "Executive Dashboard", icon: LayoutDashboard, module: "overview" },
    { to: "/health", label: "Plant Health Score", icon: HeartPulse, module: "overview" },
  ]},
  { title: "Operations", items: [
    { to: "/floor", label: "Factory Floor (Twin)", icon: Factory, module: "operations" },
    { to: "/production", label: "Production Tracker", icon: Activity, module: "operations" },
    { to: "/batches", label: "Batch Management", icon: GitBranch, module: "operations" },
    { to: "/shifts", label: "Shift Management", icon: Users, module: "operations" },
  ]},
  { title: "Quality", items: [
    { to: "/quality/ipc", label: "In-Process QC", icon: FlaskConical, module: "quality" },
    { to: "/quality/release", label: "Batch Release", icon: Award, module: "quality" },
    { to: "/quality/capa", label: "Deviation & CAPA", icon: ClipboardList, module: "quality" },
    { to: "/quality/coa", label: "CoA Generator", icon: FileSignature, module: "quality" },
  ]},
  { title: "Compliance", items: [
    { to: "/compliance", label: "Regulatory Tracker", icon: ShieldCheck, module: "compliance" },
    { to: "/compliance/audit", label: "Audit Trail (21 CFR)", icon: FileText, module: "compliance" },
    { to: "/compliance/sop", label: "SOP Library", icon: BookOpen, module: "compliance" },
    { to: "/compliance/ebmr", label: "eBMR", icon: FileBox, module: "compliance" },
  ]},
  { title: "Predictive Intelligence", items: [
    { to: "/predictive/health", label: "Equipment Health", icon: HeartPulse, module: "predictive" },
    { to: "/predictive/alerts", label: "Predictive Alerts", icon: AlertTriangle, module: "predictive" },
    { to: "/predictive/work-orders", label: "Work Orders", icon: Wrench, module: "predictive" },
    { to: "/predictive/simulation", label: "Twin Simulation", icon: Sliders, module: "predictive" },
  ]},
  { title: "Energy & Sustainability", items: [
    { to: "/energy", label: "Energy Monitor", icon: Zap, module: "energy" },
    { to: "/energy/carbon", label: "Carbon Tracker", icon: Leaf, module: "energy" },
    { to: "/energy/utilities", label: "Utilities", icon: Droplets, module: "energy" },
    { to: "/energy/waste", label: "Waste", icon: Recycle, module: "energy" },
  ]},
  { title: "Safety & EHS", items: [
    { to: "/ehs/incidents", label: "Safety Incidents", icon: ShieldAlert, module: "ehs" },
    { to: "/ehs/hazards", label: "Chemical Hazards", icon: Flame, module: "ehs" },
    { to: "/ehs/emissions", label: "Emission Monitoring", icon: AlertOctagon, module: "ehs" },
    { to: "/ehs/ppe", label: "PPE Compliance", icon: HardHat, module: "ehs" },
  ]},
  { title: "Inventory & Supply", items: [
    { to: "/inventory/raw", label: "Raw Materials", icon: Boxes, module: "inventory" },
    { to: "/inventory/finished", label: "Finished Goods", icon: Package, module: "inventory" },
    { to: "/inventory/vendors", label: "Vendors", icon: Truck, module: "inventory" },
    { to: "/inventory/procurement", label: "Procurement", icon: ShoppingCart, module: "inventory" },
  ]},
  { title: "Analytics & Reports", items: [
    { to: "/analytics/oee", label: "OEE Dashboard", icon: Gauge, module: "analytics" },
    { to: "/analytics/downtime", label: "Downtime", icon: TimerReset, module: "analytics" },
    { to: "/analytics/reports", label: "Report Builder", icon: FileBarChart, module: "analytics" },
    { to: "/analytics/schedule", label: "Scheduled Reports", icon: CalendarClock, module: "analytics" },
  ]},
  { title: "Settings & Admin", items: [
    { to: "/settings/users", label: "User Management", icon: Users, module: "settings" },
    { to: "/settings/plant", label: "Plant Config", icon: Factory, module: "settings" },
    { to: "/settings/sensors", label: "Sensors & IoT", icon: Cpu, module: "settings" },
    { to: "/settings/integrations", label: "Integrations", icon: Plug, module: "settings" },
  ]},
];

export function AppLayout({ children }: { children?: ReactNode }) {
  const { role, can } = useRole();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });

  const onLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className={cn("border-r border-border/80 bg-sidebar/90 backdrop-blur-md flex flex-col transition-all duration-200 sticky top-0 h-screen", collapsed ? "w-[4.25rem]" : "w-60")}>
        <div className="h-14 flex items-center gap-2.5 px-3 border-b border-border/80">
          <img
            src={twinoxisLogo}
            alt="TwinOxis"
            className="h-8 w-8 shrink-0 object-contain drop-shadow-[0_0_10px_rgba(0,212,255,0.45)]"
          />
          {!collapsed && (
            <div className="leading-tight min-w-0 flex-1">
              <div className="font-display font-bold tracking-tight">TwinOxis</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Digital Twin OS</div>
            </div>
          )}
          <button onClick={() => setCollapsed((v) => !v)} className="text-muted-foreground hover:text-foreground shrink-0 p-1 rounded hover:bg-foreground/5" aria-label="Toggle sidebar">
            {collapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-3.5 scrollbar-thin">
          {NAV.map((g) => {
            const items = g.items.filter((i) => can(i.module));
            if (!items.length) return null;
            return (
              <div key={g.title}>
                {!collapsed && <div className="px-2 mb-1 text-[10px] uppercase tracking-widest text-muted-foreground/60">{g.title}</div>}
                <ul className="space-y-0.5">
                  {items.map((i) => {
                    const active = path === i.to || (i.to !== "/" && path.startsWith(i.to));
                    const Icon = i.icon;
                    return (
                      <li key={i.to}>
                        <Link to={i.to} className={cn(
                          "group flex items-center gap-3 rounded-md px-2.5 py-1.5 text-sm relative transition-colors",
                          active ? "bg-primary/10 text-primary" : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                        )}>
                          {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-primary" />}
                          <Icon size={15} className="shrink-0" />
                          {!collapsed && <span className="truncate">{i.label}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
        <div className="border-t border-border/80 p-3 text-[10px] text-muted-foreground">
          {!collapsed ? (
            <div className="flex items-center gap-1.5">
              <span className="status-dot bg-success text-success" />
              SCADA bridge online
            </div>
          ) : (
            <Circle size={10} className="text-success mx-auto" />
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b border-border/80 flex items-center px-4 gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img src={twinoxisLogo} alt="" className="h-6 w-6 object-contain md:hidden" />
            <span className="status-dot text-success bg-success shrink-0" />
            <div className="leading-tight min-w-0">
              <div className="text-sm font-medium truncate">{PLANT.name}</div>
              <div className="text-[11px] text-muted-foreground font-mono truncate">{PLANT.location} · LIVE</div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
            <RoleSwitcher/>
            <button
              onClick={() => setNotifOpen(true)}
              className="relative h-9 w-9 rounded-lg border border-border/80 hover:border-primary/40 grid place-items-center transition-colors"
              aria-label="Notifications"
            >
              <Bell size={15}/>
              <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-destructive text-[10px] font-mono text-white grid place-items-center">
                {ALERTS.filter((a) => a.severity !== "success").length}
              </span>
            </button>

            <div className="relative pl-2 sm:pl-3 border-l border-border/80">
              <button
                onClick={() => setUserMenu((v) => !v)}
                className="flex items-center gap-2 h-9 rounded-lg px-1.5 hover:bg-foreground/5 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-secondary to-primary grid place-items-center text-[11px] font-display font-bold">
                  {user?.initials ?? "TX"}
                </div>
                <div className="leading-tight hidden md:block text-left">
                  <div className="text-sm font-medium">{user?.name ?? "Operator"}</div>
                  <div className="text-[10px] text-muted-foreground">{role.short}</div>
                </div>
                <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
              </button>
              {userMenu && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setUserMenu(false)} />
                  <div className="absolute right-0 mt-1.5 w-56 glass-panel rounded-xl p-1.5 z-40 animate-fade-in-up border border-border/80">
                    <div className="px-3 py-2 border-b border-border/60 mb-1">
                      <div className="text-sm font-medium truncate">{user?.name}</div>
                      <div className="text-[11px] text-muted-foreground font-mono truncate">{user?.email}</div>
                    </div>
                    <button
                      onClick={() => { setUserMenu(false); onLogout(); }}
                      className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut size={15} />
                      Log out
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={onLogout}
              className="hidden lg:inline-flex h-9 items-center gap-1.5 rounded-lg border border-border/80 px-3 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <LogOut size={14} />
              Log out
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 md:p-6 min-w-0">
          {children ?? <Outlet />}
        </main>

        <footer className="h-9 border-t border-border/80 bg-surface/30 px-4 flex items-center text-[11px] font-mono text-muted-foreground gap-4">
          <span className="flex items-center gap-1.5"><span className="status-dot text-success bg-success"/>SYNC {PLANT.lastSync}</span>
          <span className="hidden sm:inline">SENSORS {PLANT.sensors}</span>
          <span className="hidden md:inline">OPC-UA OK</span>
          <span className="ml-auto flex items-center gap-2">
            <img src={twinoxisLogo} alt="" className="h-3.5 w-3.5 object-contain opacity-70" />
            TwinOxis
          </span>
        </footer>
      </div>

      {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
    </div>
  );
}

function RoleSwitcher() {
  const { role, setRole } = useRole();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 h-9 px-3 rounded-md border border-border hover:border-primary/50 text-sm">
        <span className="text-muted-foreground text-[11px] uppercase tracking-wider">Role</span>
        <span className="font-medium">{role.short}</span>
        <ChevronDown size={14}/>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-72 glass-panel rounded-lg p-1 z-40 animate-fade-in-up">
            {ROLES.map((r) => (
              <button key={r.id} onClick={() => { setRole(r.id); setOpen(false); }} className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm flex flex-col gap-0.5 hover:bg-primary/10",
                r.id === role.id && "bg-primary/10"
              )}>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{r.name}</span>
                  {r.id === role.id && <span className="ml-auto text-[10px] text-primary font-mono">ACTIVE</span>}
                </div>
                <span className="text-[11px] text-muted-foreground">{r.description}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function NotificationPanel({ onClose }: { onClose: () => void }) {
  const sevColor: Record<string,string> = {
    critical: "text-destructive border-destructive/40",
    warning: "text-warning border-warning/40",
    info: "text-primary border-primary/40",
    success: "text-success border-success/40",
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}/>
      <div className="fixed right-0 top-0 bottom-0 w-96 bg-surface border-l border-border z-50 flex flex-col animate-fade-in-up">
        <div className="h-14 flex items-center px-4 border-b border-border">
          <div className="font-display font-semibold">Notifications</div>
          <button onClick={onClose} className="ml-auto text-xs text-muted-foreground hover:text-foreground">Mark all read</button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {ALERTS.map((a) => (
            <div key={a.id} className={cn("rounded-md border p-3 bg-panel/60", sevColor[a.severity])}>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono">
                <span>{a.severity}</span>
                <span className="ml-auto text-muted-foreground">{a.time}</span>
              </div>
              <div className="text-sm mt-1 text-foreground">{a.title}</div>
              <div className="text-[11px] text-muted-foreground mt-1">module: {a.module}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
