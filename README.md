# Digital Plant Ops

Build a full-featured TwinOxis Digital Twin SaaS Web Application for Pharmaceutical and Chemical manufacturing factories. This is an industrial-grade, data-driven platform used daily by factory floor operators, plant managers, compliance officers, and C-suite executives. The UI must feel premium, intelligent, and mission-critical — not a generic dashboard. Think Bloomberg Terminal meets modern industrial SaaS.

BRAND & DESIGN SYSTEM

Color Palette:

Primary Background: #0A0E1A (Deep Navy Black)

Secondary Background: #0F1629 (Dark Blue-Grey)

Card/Panel Background: #141B2D

Primary Accent: #00D4FF (Electric Cyan — TwinOxis brand color)

Secondary Accent: #7B2FBE (Deep Purple)

Warning: #F59E0B (Amber)

Danger/Alert: #EF4444 (Red)

Success: #10B981 (Emerald Green)

Text Primary: #F1F5F9

Text Secondary: #94A3B8

Border/Divider: #1E293B

Typography:

Display Font: Syne (headings, KPI numbers)

Body Font: DM Sans (labels, descriptions, tables)

Monospace: JetBrains Mono (sensor values, live data feeds, batch numbers)

Design Principles:

Dark industrial theme throughout

Glassmorphism cards with subtle rgba(0, 212, 255, 0.05) borders

Glowing cyan accents on active states and alerts

Subtle grid background pattern on main canvas

All charts use recharts or similar with custom cyan/purple gradients

Status indicators use pulsing animation dots (green = live, amber = warning, red = critical)

Data tables must look like Bloomberg-style dense data grids

USER ROLES & ACCESS LEVELS

Implement a Role Switcher in the top-right header so we can demo all roles in one app. Each role has a different dashboard layout and feature access:

Role 1: Plant Operator (Floor Level)

Access: Real-time machine monitoring, batch tracking, alerts, task checklist, equipment status

Cannot access: Financial data, compliance reports, user management

Role 2: Production Manager (Mid Level)

Access: All operator features + production scheduling, shift reports, OEE analytics, quality control dashboard, team task assignment

Cannot access: Financial data, full compliance module

Role 3: Quality Control (QC) Officer

Access: Quality testing results, batch release workflow, deviation reports, CAPA (Corrective and Preventive Action) module, CoA (Certificate of Analysis) generation, in-process control monitoring

Cannot access: Financial data, machine raw data

Role 4: Compliance & Regulatory Officer

Access: FDA/GMP/CPCB compliance tracker, audit trail, 21 CFR Part 11 electronic records, batch records, regulatory submission tracker, SOP management

Cannot access: Financial data, machine raw data

Role 5: Plant Manager / Head of Operations

Access: All above + OEE, downtime analysis, energy consumption, predictive maintenance, inventory, shift planning, vendor tracking

Role 6: C-Suite / Executive (CEO / COO)

Access: Executive summary dashboard only — high-level KPIs, plant performance index, revenue impact of downtime, sustainability metrics, multi-plant comparison (if applicable)

Simplest, cleanest view — no raw data

Role 7: Maintenance Engineer

Access: Equipment health monitoring, predictive maintenance alerts, work order management, spare parts inventory, maintenance history logs, MTBF/MTTR analytics

Role 8: EHS (Environment, Health & Safety) Officer

Access: Emission monitoring, chemical hazard tracking, safety incident log, PPE compliance, waste management tracking, ambient air/water quality sensors

APPLICATION STRUCTURE

 GLOBAL LAYOUT

Left Sidebar Navigation (collapsible, icon + label)

Top Header Bar: TwinOxis logo left, Plant name + status (Live/Offline), Role switcher dropdown, notifications bell with count, user avatar + name

Main Content Area: Full-width with responsive grid

Bottom Status Bar: Last data sync timestamp, active sensor count, system health indicator

SIDEBAR NAVIGATION MODULES (ALL ROLES SEE RELEVANT ONES)

OVERVIEW- Executive Dashboard- Plant Health Score
OPERATIONS- Real-Time Factory Floor (Digital Twin Canvas)- Production Tracker- Batch Management- Shift Management
QUALITY- In-Process Quality Control- Batch Release Workflow- Deviation & CAPA Manager- CoA Generator
COMPLIANCE- Regulatory Compliance Tracker- Audit Trail & Electronic Records (21 CFR Part 11)- SOP Library & Management- Batch Record System (eBMR)
PREDICTIVE INTELLIGENCE- Equipment Health Monitor- Predictive Maintenance Alerts- Failure Mode Analysis- Digital Twin Simulation (What-If Mode)
ENERGY & SUSTAINABILITY- Energy Consumption Monitor- Carbon Footprint Tracker- Utility Dashboard (Water, Steam, Power, Gas)- Waste Management
SAFETY & EHS- Safety Incident Log- Chemical Hazard Register- Emission Monitoring (CPCB/PCB)- PPE Compliance Tracker
INVENTORY & SUPPLY CHAIN- Raw Material Inventory- Finished Goods Tracker- Vendor Performance- Procurement Alerts
ANALYTICS & REPORTS- OEE Dashboard (Availability, Performance, Quality)- Downtime Analysis- Custom Report Builder- Scheduled Report Manager
SETTINGS & ADMIN- User Management- Plant Configuration- Sensor & IoT Device Manager- Alert & Threshold Configuration- Integration Hub (ERP, LIMS, SCADA)

DETAILED FEATURE SPECIFICATIONS

 1. EXECUTIVE DASHBOARD (CEO/COO Role)

Plant Health Score: Large circular gauge (0-100), color-coded, with trend arrow

KPI Cards (Top Row): OEE %, Batches Completed Today, Active Alerts, Energy Consumed Today

Production vs Target Chart: Bar chart, daily/weekly/monthly toggle

Downtime Impact: Revenue lost due to unplanned downtime (in INR)

Multi-Plant Map: India map with plant location pins, each showing status color

Sustainability Index: Carbon emissions this month vs target

Top 3 Active Alerts: Compact list with severity badge

 2. REAL-TIME FACTORY FLOOR (Digital Twin Canvas)

Schematic plant floor layout built with SVG/CSS — shows interconnected equipment (reactors, mixers, filling lines, HVAC, utilities)

Each equipment node shows:

Live status badge (Running / Idle / Fault / Maintenance)

Current OEE %

Temperature / Pressure / RPM (relevant sensor values in monospace font)

Click to open Equipment Detail Panel (side drawer)

Live data feeds on the right: scrolling log of sensor events with timestamps

Alert overlay: Flashing red border on equipment with active faults

Zoom and pan on the canvas

Filter by: Department / Equipment Type / Status

 3. BATCH MANAGEMENT MODULE

Active Batches Table: Batch No., Product Name, Status (In-Process/QC Hold/Released/Rejected), Start Time, ETA, % Complete, Operator Assigned

Batch Timeline View: Gantt-style horizontal timeline showing each stage

Batch Detail Page:

Complete batch lineage (raw materials used, lot numbers, quantities)

In-process parameter log (temperature, pH, viscosity per stage)

QC checkpoints (Pass/Fail with timestamp and operator)

Deviation log

Electronic batch record download button

Batch Creation Wizard: Step-by-step form — Product, Formula, Equipment selection, Operator assignment, Target quantity

Status badges: Color-coded (In-Process = Cyan, QC Hold = Amber, Released = Green, Rejected = Red)

 4. OEE DASHBOARD

Three large KPI dials: Availability %, Performance %, Quality % — each animated circular gauge

Overall OEE %: Massive hero number with trend vs last week

OEE Trend Line Chart: Last 30 days

Losses Breakdown (Waterfall Chart): Planned Downtime, Unplanned Downtime, Speed Loss, Quality Loss

Equipment-wise OEE Table: Each machine's A/P/Q breakdown

Shift Comparison: Morning / Afternoon / Night shift OEE side by side

 5. PREDICTIVE MAINTENANCE MODULE

Equipment Health Cards: Grid of all critical equipment — each card shows:

Health Score (0-100%) with color ring

Predicted failure date (if applicable)

Last maintenance date

Open work orders count

View Details button

Failure Risk Heatmap: Calendar heatmap showing which days have high failure probability

Active Predictive Alerts List: Equipment name, anomaly type, severity, recommended action, assign work order button

Work Order Management:

Create / Assign / Track work orders

Priority: Critical / High / Medium / Low

Status: Open / In-Progress / Completed / Overdue

MTBF / MTTR Analytics: Mean Time Between Failures and Mean Time To Repair per equipment

Spare Parts Linked: Click equipment to see required spare parts and current stock level

 6. QUALITY CONTROL MODULE

In-Process Control (IPC) Monitor:

Real-time parameter charts (pH, temperature, viscosity, particle size, moisture content)

Control limits (UCL/LCL) shown as dotted lines on charts

Out-of-spec alerts highlighted in red

QC Testing Queue: List of batches pending lab testing with assigned analyst

Test Results Entry Form: Parameter name, specification, actual result, pass/fail auto-calculated

Deviation & CAPA Manager:

Log new deviation (batch, parameter, description, impact level)

CAPA workflow: Root Cause → Corrective Action → Preventive Action → Effectiveness Review → Close

Status tracker with timeline

CoA (Certificate of Analysis) Generator:

Auto-populate from batch data

Preview and PDF download

Digital signature workflow

 7. COMPLIANCE MODULE (Pharma / Chemical)

Regulatory Compliance Tracker:

Cards for each regulation: GMP, FDA 21 CFR, Schedule M (New), CPCB, PCB, ISO 9001, ISO 14001

Each card: Compliance Score %, Last Audit Date, Next Audit Date, Open Non-Conformances

Audit Trail (21 CFR Part 11):

Immutable log table: Timestamp, User, Action, Module, Old Value, New Value

Filter by date, user, module

Export to CSV/PDF

eBMR (Electronic Batch Manufacturing Record):

Complete digital batch record for each batch

Operator e-signatures at each stage

Locked once batch is released (tamper-proof indicator)

SOP Library:

Upload / Version Control / Approval workflow for SOPs

Linked to equipment and process steps

Acknowledgement tracking (who has read each SOP)

Regulatory Submission Tracker:

Track CDSCO, FDA, ECHA submissions

Status: Draft / Submitted / Under Review / Approved / Rejected

Deadline calendar with reminders

 8. ENERGY & SUSTAINABILITY MODULE

Real-Time Energy Dashboard:

Total plant energy consumption (kWh) — live updating number

Energy breakdown by department (donut chart)

Power factor, load profile chart (24 hours)

Cost of energy today vs yesterday

Utility Monitoring:

Water consumption (KL/day)

Steam generation and consumption

Compressed air leakage detection

Natural gas / fuel usage

Carbon Footprint Tracker:

Scope 1, 2, 3 emissions breakdown

Monthly trend vs reduction target

Emission intensity per unit produced

Sustainability Goals Progress:

Progress bars for annual targets: Energy reduction %, Water reduction %, Waste reduction %, Carbon neutrality

 9. EHS MODULE

Safety Dashboard:

Days Since Last Incident (large counter)

Incident Rate (TRIR) — rolling 12 months

Near-Miss Reports this month

Open Safety Actions

Incident Log:

Report new incident form (type, location, severity, persons involved, immediate action taken)

Investigation workflow

Status: Reported / Under Investigation / Closed

Chemical Hazard Register:

List of all chemicals on-site with SDS (Safety Data Sheet) linked

Hazard classification (GHS symbols)

Storage location and quantity

Expiry tracking for hazardous materials

Emission Monitoring (CPCB):

Stack emission parameters: SO2, NOx, PM, VOC — real-time vs permissible limits

Effluent treatment: COD, BOD, pH, TDS — live charts

CPCB OCEMS (Online Continuous Emission Monitoring) data feed

Color-coded compliance status: Within Limit / Approaching Limit / Exceeded

PPE Compliance Tracker:

Zone-wise PPE requirements

Camera-based compliance percentage (simulated)

 10. INVENTORY & SUPPLY CHAIN MODULE

Raw Material Inventory:

Item name, grade/specification, current stock, reorder level, expiry date

Low stock alerts (amber when near reorder level, red when below)

Lot traceability — link each lot to batches it was used in

Finished Goods Tracker:

Product, batch, quantity, QC status, dispatch status, customer

Vendor Performance Dashboard:

On-time delivery %, quality rejection rate, pending POs

Procurement Alerts:

Auto-generated purchase requests when stock hits reorder level

 11. DIGITAL TWIN SIMULATION (What-If Mode)

Banner: Yellow warning bar — "You are in Simulation Mode. Changes do not affect live operations."

Scenario Builder:

Adjust production parameters (temperature, pressure, speed, batch size)

See predicted impact on: yield, quality, energy consumption, cycle time

Comparison View: Side-by-side — Current vs Simulated outcomes

Save Scenario button: Name and store scenarios for review

 12. CUSTOM REPORT BUILDER

Drag-and-drop module selection

Date range picker

Chart type selector

Preview panel

Schedule report: Daily / Weekly / Monthly, send to email list

Export: PDF, Excel, CSV

MICRO-INTERACTIONS & ANIMATIONS

Sidebar items have a glowing cyan left border on active state

KPI numbers count up on page load (number animation)

All charts animate in on load with a smooth draw effect

Status dots pulse continuously (CSS animation)

Alert bell shakes when new alert arrives

Cards have a subtle glow on hover (box-shadow: 0 0 20px rgba(0, 212, 255, 0.15))

Page transitions: smooth fade-in

Data table rows highlight on hover

NOTIFICATIONS SYSTEM

Bell icon in header with unread count badge

Notification panel (slide-in from right):

Critical Alert (red): Equipment fault — Reactor R-102 temperature exceeded limit

Warning (amber): Batch B-2047 approaching QC hold deadline

Info (cyan): Scheduled maintenance due for Pump P-05 in 3 days

Success (green): Batch B-2045 released successfully

Each notification: timestamp, module link, dismiss button

Mark all as read button

SAMPLE DATA TO POPULATE (Use realistic pharmaceutical/chemical plant data)

Plant: Shree Pharma Industries Pvt. Ltd., Ankleshwar, Gujarat Products: Active Pharmaceutical Ingredients (APIs) and specialty chemicals

Active Batches:

B-2051 | Ciprofloxacin API | In-Process | 67% complete | Reactor R-101

B-2052 | Sodium Hypochlorite | In-Process | 43% complete | Reactor R-203

B-2053 | Amoxicillin API | QC Hold | 100% | Awaiting release

B-2054 | Sulphuric Acid Grade AA | Released | Dispatch pending

Equipment Health (Sample):

Reactor R-101: 87% health | Running

Mixer M-02: 62% health | Warning — bearing vibration anomaly

HVAC Unit H-03: 91% health | Running

Boiler BLR-01: 74% health | Predictive alert — scale buildup

Today's KPIs:

OEE: 78.4%

Energy: 1,842 kWh consumed

Batches Completed: 6

Active Alerts: 3 (1 Critical, 2 Warning)

Plant Health Score: 82/100

TECHNICAL REQUIREMENTS

Framework: React with TypeScript

Styling: Tailwind CSS with custom design tokens

Charts: Recharts (line, bar, donut, gauge, area charts)

Icons: Lucide React

State Management: React Context or Zustand

All data: Mocked/static — no backend required

Responsive: Desktop-first but tablet-friendly

Font imports: Google Fonts — Syne, DM Sans, JetBrains Mono

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/67339b9f-eacf-45b1-b0dd-96773138d06e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
