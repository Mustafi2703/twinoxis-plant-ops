import { useEffect, useMemo, useState } from "react";
import { EQUIPMENT, SENSOR_FEED } from "@/lib/mock-data";

export type LiveEquipment = (typeof EQUIPMENT)[number] & {
  vibration: number;
  flow: number;
  sparkline: number[];
};

export type LiveSensor = {
  t: string;
  src: string;
  msg: string;
  level: "info" | "warn" | "ok" | "critical";
};

function jitter(n: number, amp: number, digits = 1) {
  const v = n + (Math.random() - 0.5) * amp;
  const f = 10 ** digits;
  return Math.round(v * f) / f;
}

function nowStamp() {
  const d = new Date();
  return d.toTimeString().slice(0, 8);
}

function seedEquipment(): LiveEquipment[] {
  return EQUIPMENT.map((e) => ({
    ...e,
    vibration: e.status === "Warning" || e.status === "Predictive Alert" ? 6.2 : 1.4,
    flow: e.status === "Maintenance" ? 0 : 180 + Math.round(Math.random() * 80),
    sparkline: Array.from({ length: 24 }, () =>
      e.status === "Maintenance" ? 0 : e.health + (Math.random() - 0.5) * 8,
    ),
  }));
}

export function useLiveTwin(tickMs = 1200) {
  const [equipment, setEquipment] = useState(seedEquipment);
  const [feed, setFeed] = useState<LiveSensor[]>(() =>
    SENSOR_FEED.map((s) => ({ ...s, level: s.level as LiveSensor["level"] })),
  );
  const [clock, setClock] = useState(nowStamp);
  const [syncAge, setSyncAge] = useState(0);
  const [throughput, setThroughput] = useState(412);

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(nowStamp());
      setSyncAge(0);
      setThroughput((t) => Math.max(280, Math.min(520, jitter(t, 18, 0))));

      setEquipment((prev) =>
        prev.map((e) => {
          if (e.status === "Maintenance") {
            return {
              ...e,
              temp: 0,
              pressure: 0,
              rpm: 0,
              vibration: 0,
              flow: 0,
              sparkline: [...e.sparkline.slice(1), 0],
            };
          }
          const temp = jitter(e.temp, e.status.includes("Alert") || e.status === "Warning" ? 2.4 : 0.8);
          const pressure = jitter(e.pressure, 0.12, 2);
          const rpm = Math.max(0, Math.round(jitter(e.rpm, e.rpm > 0 ? 12 : 0, 0)));
          const vibration = jitter(
            e.vibration,
            e.status === "Warning" || e.status === "Predictive Alert" ? 0.45 : 0.15,
            2,
          );
          const flow = Math.max(0, jitter(e.flow, 12, 0));
          const health = Math.min(
            99,
            Math.max(40, jitter(e.health, e.status === "Warning" ? 1.2 : 0.4, 0)),
          );
          return {
            ...e,
            temp,
            pressure,
            rpm,
            vibration,
            flow,
            health,
            sparkline: [...e.sparkline.slice(1), health],
          };
        }),
      );

      setFeed((prev) => {
        const srcs = EQUIPMENT.map((e) => e.id);
        const src = srcs[Math.floor(Math.random() * srcs.length)]!;
        const eq = EQUIPMENT.find((e) => e.id === src)!;
        const roll = Math.random();
        let msg: string;
        let level: LiveSensor["level"] = "info";
        if (eq.status === "Warning" && roll > 0.45) {
          msg = `Vibration ${jitter(6.1, 0.6, 1)} mm/s — WARNING`;
          level = "warn";
        } else if (eq.status === "Predictive Alert" && roll > 0.5) {
          msg = `Bearing RUL ${Math.round(jitter(18, 4, 0))} days — predictive`;
          level = "warn";
        } else if (eq.status === "Maintenance") {
          msg = "Offline for planned maintenance";
          level = "info";
        } else if (roll > 0.92) {
          msg = `Temp ${jitter(eq.temp, 1.2)}°C near upper band`;
          level = "warn";
        } else if (roll > 0.7) {
          msg = `Flow ${Math.round(jitter(210, 30, 0))} LPM nominal`;
          level = "ok";
        } else {
          msg = `Temp ${jitter(eq.temp, 0.8)}°C (within band)`;
          level = "info";
        }
        return [{ t: nowStamp(), src, msg, level }, ...prev].slice(0, 48);
      });
    }, tickMs);

    const ageId = window.setInterval(() => setSyncAge((s) => s + 1), 1000);
    return () => {
      window.clearInterval(id);
      window.clearInterval(ageId);
    };
  }, [tickMs]);

  const kpi = useMemo(() => {
    const live = equipment.filter((e) => e.status !== "Maintenance").length;
    const alerts = equipment.filter(
      (e) => e.status === "Warning" || e.status === "Predictive Alert",
    ).length;
    const avgHealth = Math.round(
      equipment.reduce((a, e) => a + e.health, 0) / Math.max(1, equipment.length),
    );
    return { live, alerts, avgHealth, tags: 1248, throughput };
  }, [equipment, throughput]);

  return { equipment, feed, clock, syncAge, kpi };
}
