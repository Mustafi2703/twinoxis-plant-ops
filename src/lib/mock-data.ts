export const PLANT = {
  name: "Shree Pharma Industries Pvt. Ltd.",
  location: "Ankleshwar, Gujarat",
  status: "LIVE",
  sensors: 1248,
  lastSync: "2s ago",
};

export const KPIS = {
  oee: 78.4,
  energyKwh: 1842,
  batchesCompleted: 6,
  activeAlerts: 3,
  plantHealth: 82,
};

export const BATCHES = [
  { id: "B-2051", product: "Ciprofloxacin API",        status: "In-Process", progress: 67, eta: "14:32",  start: "06:00", operator: "R. Patel",  equipment: "Reactor R-101" },
  { id: "B-2052", product: "Sodium Hypochlorite",      status: "In-Process", progress: 43, eta: "16:10",  start: "08:15", operator: "S. Mehta",  equipment: "Reactor R-203" },
  { id: "B-2053", product: "Amoxicillin API",          status: "QC Hold",    progress: 100,eta: "—",      start: "Yest.", operator: "A. Khan",   equipment: "Lab QC-02"     },
  { id: "B-2054", product: "Sulphuric Acid Grade AA",  status: "Released",   progress: 100,eta: "Dispatch",start:"Yest.", operator: "V. Iyer",   equipment: "Tank T-09"     },
  { id: "B-2055", product: "Paracetamol API",          status: "In-Process", progress: 22, eta: "19:40",  start: "10:30", operator: "M. Joshi",  equipment: "Reactor R-104" },
  { id: "B-2056", product: "Acetic Anhydride",         status: "Rejected",   progress: 100,eta: "—",      start: "Yest.", operator: "P. Singh",  equipment: "Reactor R-301" },
];

export const EQUIPMENT = [
  { id: "R-101", name: "Reactor R-101",  health: 87, status: "Running",     temp: 142.3, pressure: 4.2, rpm: 320, dept: "Reaction", oee: 91, last: "2025-05-12" },
  { id: "R-203", name: "Reactor R-203",  health: 79, status: "Running",     temp: 88.1,  pressure: 2.1, rpm: 180, dept: "Reaction", oee: 84, last: "2025-04-30" },
  { id: "M-02",  name: "Mixer M-02",     health: 62, status: "Warning",     temp: 64.0,  pressure: 1.2, rpm: 420, dept: "Mixing",   oee: 71, last: "2025-03-21" },
  { id: "H-03",  name: "HVAC Unit H-03", health: 91, status: "Running",     temp: 22.0,  pressure: 0.8, rpm: 1450,dept: "Utility",  oee: 96, last: "2025-05-20" },
  { id: "BLR-01",name: "Boiler BLR-01",  health: 74, status: "Predictive Alert", temp: 184.0, pressure: 9.4, rpm: 0, dept: "Utility", oee: 80, last: "2025-04-10" },
  { id: "F-01",  name: "Filling Line F-01", health: 88, status: "Running", temp: 24.0, pressure: 1.0, rpm: 60, dept: "Packaging", oee: 89, last: "2025-05-18" },
  { id: "C-04",  name: "Centrifuge C-04",health: 55, status: "Maintenance",temp: 0,     pressure: 0,   rpm: 0,  dept: "Separation", oee: 0,  last: "2025-06-22" },
  { id: "P-05",  name: "Pump P-05",      health: 81, status: "Running",     temp: 38.0,  pressure: 3.4, rpm: 2900,dept: "Utility",  oee: 93, last: "2025-05-01" },
];

export const ALERTS = [
  { id: 1, severity: "critical", title: "Reactor R-102 temperature exceeded limit",       module: "operations", time: "2 min ago" },
  { id: 2, severity: "warning",  title: "Batch B-2047 approaching QC hold deadline",      module: "quality",    time: "18 min ago" },
  { id: 3, severity: "info",     title: "Scheduled maintenance due for Pump P-05 in 3 days", module: "predictive", time: "1 hr ago" },
  { id: 4, severity: "success",  title: "Batch B-2045 released successfully",             module: "quality",    time: "2 hr ago" },
  { id: 5, severity: "warning",  title: "Mixer M-02 bearing vibration anomaly detected",  module: "predictive", time: "3 hr ago" },
];

export const OEE_TREND = Array.from({ length: 30 }, (_, i) => ({
  day: `D-${30 - i}`,
  oee: Math.round(70 + Math.sin(i / 3) * 6 + (i / 30) * 8),
  availability: Math.round(80 + Math.sin(i / 4) * 5),
  performance: Math.round(82 + Math.cos(i / 3) * 6),
  quality: Math.round(94 + Math.sin(i / 5) * 3),
}));

export const PROD_VS_TARGET = [
  { name: "Mon", actual: 142, target: 150 },
  { name: "Tue", actual: 168, target: 150 },
  { name: "Wed", actual: 155, target: 150 },
  { name: "Thu", actual: 138, target: 150 },
  { name: "Fri", actual: 172, target: 150 },
  { name: "Sat", actual: 160, target: 150 },
  { name: "Sun", actual: 124, target: 130 },
];

export const ENERGY_BY_DEPT = [
  { name: "Reaction",  value: 720 },
  { name: "Utility",   value: 540 },
  { name: "Packaging", value: 220 },
  { name: "HVAC",      value: 232 },
  { name: "Lighting",  value: 130 },
];

export const SENSOR_FEED = [
  { t: "11:42:08", src: "R-101", msg: "Temp 142.3°C (within band)",     level: "info" },
  { t: "11:42:05", src: "M-02",  msg: "Vibration 6.2 mm/s — WARNING",    level: "warn" },
  { t: "11:42:01", src: "F-01",  msg: "Fill cycle 60 bpm OK",            level: "info" },
  { t: "11:41:58", src: "BLR-01",msg: "Stack PM 32 mg/Nm³",              level: "info" },
  { t: "11:41:54", src: "R-203", msg: "pH 7.18 within spec",             level: "ok" },
  { t: "11:41:50", src: "H-03",  msg: "Cleanroom DP 12 Pa nominal",      level: "info" },
  { t: "11:41:46", src: "P-05",  msg: "Flow 220 LPM nominal",            level: "ok" },
  { t: "11:41:42", src: "R-101", msg: "Stirrer 320 RPM stable",          level: "info" },
];

export const COMPLIANCE = [
  { reg: "GMP",            score: 96, lastAudit: "2025-04-12", nextAudit: "2025-10-12", open: 2 },
  { reg: "FDA 21 CFR Pt 11", score: 98, lastAudit: "2025-03-02", nextAudit: "2026-03-02", open: 1 },
  { reg: "Schedule M (New)", score: 92, lastAudit: "2025-05-22", nextAudit: "2025-11-22", open: 4 },
  { reg: "CPCB Emission",  score: 89, lastAudit: "2025-06-01", nextAudit: "2025-09-01", open: 3 },
  { reg: "ISO 9001",       score: 94, lastAudit: "2025-02-18", nextAudit: "2026-02-18", open: 2 },
  { reg: "ISO 14001",      score: 91, lastAudit: "2025-02-18", nextAudit: "2026-02-18", open: 3 },
];

export const AUDIT_TRAIL = [
  { t: "2025-06-25 11:42:01", user: "R. Patel",  action: "UPDATE", module: "Batch B-2051", old: "Stage 3",      neu: "Stage 4" },
  { t: "2025-06-25 11:30:18", user: "A. Khan",   action: "SIGN",   module: "QC Form B-2053", old: "Pending",    neu: "Signed" },
  { t: "2025-06-25 10:55:42", user: "V. Iyer",   action: "RELEASE",module: "Batch B-2054", old: "QC Hold",      neu: "Released" },
  { t: "2025-06-25 09:14:09", user: "S. Mehta",  action: "CREATE", module: "Batch B-2055", old: "—",            neu: "Created" },
  { t: "2025-06-25 08:02:30", user: "admin",     action: "UPDATE", module: "Threshold R-102", old: "180°C",     neu: "175°C" },
];

export const RAW_INVENTORY = [
  { item: "Ciprofloxacin Intermediate", grade: "USP",  stock: 1240, reorder: 800, expiry: "2026-03-12", unit: "kg" },
  { item: "Sodium Hydroxide",           grade: "Tech", stock: 540,  reorder: 600, expiry: "2027-01-08", unit: "kg" },
  { item: "Sulphuric Acid 98%",         grade: "AR",   stock: 8800, reorder: 3000,expiry: "2028-06-30", unit: "L"  },
  { item: "Amoxicillin Trihydrate",     grade: "USP",  stock: 320,  reorder: 400, expiry: "2025-12-22", unit: "kg" },
  { item: "Acetic Anhydride",           grade: "AR",   stock: 2100, reorder: 1500,expiry: "2026-07-19", unit: "L"  },
  { item: "Methanol",                   grade: "HPLC", stock: 6500, reorder: 2000,expiry: "2027-09-04", unit: "L"  },
];

export const EMISSIONS = [
  { param: "SO₂",  value: 28,  limit: 50,  unit: "mg/Nm³" },
  { param: "NOₓ",  value: 71,  limit: 100, unit: "mg/Nm³" },
  { param: "PM",   value: 32,  limit: 30,  unit: "mg/Nm³" },
  { param: "VOC",  value: 48,  limit: 75,  unit: "mg/Nm³" },
  { param: "COD",  value: 180, limit: 250, unit: "mg/L"   },
  { param: "BOD",  value: 22,  limit: 30,  unit: "mg/L"   },
];

export const SCENARIOS = [
  { id: 1, name: "Increase R-101 temp +5°C", yield: "+2.1%", quality: "-0.4%", energy: "+3.2%", cycle: "-6%" },
  { id: 2, name: "Batch size 1.2× on R-203",  yield: "+18%",  quality: "-1.1%", energy: "+14%",  cycle: "+8%" },
];
