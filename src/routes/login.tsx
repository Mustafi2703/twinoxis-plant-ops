import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Factory, ShieldCheck, Activity, ArrowRight, Lock, Mail } from "lucide-react";
import twinoxisLogo from "@/assets/twinoxis-logo.png";
import { DEMO_CREDENTIALS, useAuth } from "@/lib/auth-context";
import { useRole, type RoleId } from "@/lib/role-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — TwinOxis" },
      { name: "description", content: "Secure access to TwinOxis digital twin plant operations." },
    ],
  }),
  component: LoginLanding,
});

function LoginLanding() {
  const { user, ready, login, loginAsDemo } = useAuth();
  const { setRole } = useRole();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@twinoxis.com");
  const [password, setPassword] = useState("twinoxis");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (ready && user) navigate({ to: "/" });
  }, [ready, user, navigate]);

  const enter = async (roleId?: RoleId) => {
    setBusy(true);
    setError("");
    const res = await login({ email, password, roleId });
    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    if (roleId) setRole(roleId);
    navigate({ to: "/" });
  };

  const demo = (roleId: RoleId) => {
    loginAsDemo(roleId);
    setRole(roleId);
    navigate({ to: "/" });
  };

  if (!ready || user) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="text-sm text-muted-foreground font-mono">Initializing secure session…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 20%, rgba(0,212,255,0.14), transparent 55%), radial-gradient(ellipse 50% 40% at 85% 75%, rgba(123,47,190,0.16), transparent 50%)",
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <header className="relative z-10 h-16 flex items-center px-6 md:px-10 border-b border-border/60 bg-background/40 backdrop-blur">
        <div className="flex items-center gap-3">
          <img src={twinoxisLogo} alt="TwinOxis" className="h-9 w-9 object-contain drop-shadow-[0_0_12px_rgba(0,212,255,0.4)]" />
          <div className="leading-tight">
            <div className="font-display font-bold tracking-tight text-lg">TwinOxis</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Digital Twin OS</div>
          </div>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
          <span className="status-dot bg-success text-success" />
          Plant network online
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 py-10 md:py-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <section className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-mono">Plant operations access</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
            Sign in to your
            <span className="block text-primary">digital twin control room</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
            Real-time factory floor telemetry, batch release workflows, predictive maintenance, and GMP-aligned compliance — one industrial OS.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 pt-2">
            <Feature icon={Factory} title="Live twin" text="OPC-UA schematic" />
            <Feature icon={Activity} title="OEE & alerts" text="Plant health KPIs" />
            <Feature icon={ShieldCheck} title="Compliance" text="21 CFR · GMP" />
          </div>
        </section>

        <section className="glass-panel rounded-2xl border border-primary/20 p-6 md:p-8 shadow-[0_0_60px_rgba(0,212,255,0.08)]">
          <div className="flex items-center gap-3 mb-6">
            <img src={twinoxisLogo} alt="" className="h-10 w-10 object-contain" />
            <div>
              <h2 className="font-display text-xl font-semibold">Welcome back</h2>
              <p className="text-xs text-muted-foreground">Authenticate to enter the plant OS</p>
            </div>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void enter();
            }}
          >
            <label className="block space-y-1.5">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Work email</span>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 rounded-lg bg-panel border border-border pl-9 pr-3 text-sm outline-none focus:border-primary/60"
                  placeholder="you@plant.com"
                  autoComplete="username"
                  required
                />
              </div>
            </label>

            <label className="block space-y-1.5">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Password</span>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-lg bg-panel border border-border pl-9 pr-10 text-sm outline-none focus:border-primary/60"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </label>

            {error ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 text-destructive text-sm px-3 py-2">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-cyan inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {busy ? "Signing in…" : "Enter control room"}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-border/70">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Quick demo access</div>
            <div className="grid gap-2">
              {DEMO_CREDENTIALS.map((d) => (
                <button
                  key={d.email}
                  type="button"
                  onClick={() => demo(d.roleId)}
                  className={cn(
                    "flex items-center justify-between rounded-lg border border-border bg-panel/50 px-3 py-2.5 text-left text-sm hover:border-primary/50 hover:bg-primary/5 transition-colors",
                  )}
                >
                  <span>
                    <span className="font-medium">{d.label}</span>
                    <span className="block text-[11px] font-mono text-muted-foreground">{d.email}</span>
                  </span>
                  <ArrowRight size={14} className="text-primary shrink-0" />
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground font-mono">Demo password: twinoxis</p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-6 md:px-10 pb-8 text-[11px] font-mono text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
        <span>© TwinOxis Industrial OS</span>
        <span>OPC-UA · SCADA · MES bridge</span>
        <span className="sm:ml-auto">Shree Pharma · Ankleshwar</span>
      </footer>
    </div>
  );
}

function Feature({ icon: Icon, title, text }: { icon: typeof Factory; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-panel/40 p-3">
      <Icon size={16} className="text-primary mb-2" />
      <div className="text-sm font-medium">{title}</div>
      <div className="text-[11px] text-muted-foreground">{text}</div>
    </div>
  );
}
