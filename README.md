# 🌾 AgriBridge — Direct Farm-to-Market Exchange
### Connecting Smallholder Farmers, Value-Add Middlemen (Aggregators), and Retail Supermarkets

**AgriBridge** is a modern, full-stack agricultural commerce and supply chain management platform designed to eliminate parasitic price exploitation, reduce post-harvest food waste, and build trust between **Farmers**, **Middlemen (Aggregators / Logistics Providers)**, and **Retailers (Supermarket Chains & Restaurants)**.

---

## 🌟 The Core Innovation: Restructuring the Role of the Middleman

In traditional agricultural markets, middlemen often extract up to 60% of produce value through opaque pricing while adding little value. **AgriBridge turns the middleman into a certified, transparent service provider:**

1. **Multi-Farm Pooling & Aggregation**: Supermarkets require 20–50 metric tons of consistent, graded produce weekly, but smallholder farmers only produce 2–10 tons. Verified Aggregators pool multiple smallholder crops together to fulfill enterprise retail orders.
2. **Quality Grading & Cold-Chain Transit**: Middlemen provide pre-cooling, optical sizing, washing, sanitized returnable crates, and refrigerated transit (2°C–12°C).
3. **Transparent Fixed Margin**: Aggregators charge an upfront, transparent 4.5% commission/freight fee instead of speculative hoarding.
4. **Smart Escrow Protection**: Retailers deposit 100% of purchase funds into AgriBridge Escrow upon placing an order. Farmers and logistics providers are guaranteed immediate disbursement upon retail dock arrival and inspection.

---

## 👥 Interactive User Personas (Switchable with 1-Click)

The app comes pre-configured with 3 complete, realistic demo accounts:

| Persona | Name | Role & Company | Capabilities |
| :--- | :--- | :--- | :--- |
| 👨‍🌾 **Farmer** | **Amara Eze** | *Oasis Valley Organic Farms* (Kaduna Belt) | Lists harvests with photos, MOQ, Brix/Moisture specs, views Mandi price advisory, receives bids, and tracks escrow payouts. |
| 🚛 **Middleman** | **Carlos Morales** | *Apex Agri-Logistics & Cold Hub* | Uses the Multi-Farm Aggregation Tool to pool smallholder harvests, manages 14 reefer trucks, monitors cold storage, and provides retail logistics. |
| 🏬 **Retailer** | **Elena Rostova** | *FreshMart Supermarkets* (45 Stores) | Posts bulk Procurement RFQs / Tenders, compares competing Farmer & Aggregator quotes, tracks shipments via IoT telemetry, and approves dock inspection for instant escrow release. |

---

## 🚀 Key Modules & Capabilities

- **🌽 Interactive Multi-Tier Marketplace**:
  - Filter by *Farmer Direct Harvests* or *Middleman Aggregated Bulk Consignments*.
  - Search by crop, variety, distance radius, and certifications (*Organic*, *GlobalGAP*).
  - Built-in escrow calculator and direct negotiation deal room.

- **📋 Buyer RFQs & Procurement Tenders**:
  - Supermarkets post bulk requisitions (e.g. 15 MT weekly Vine Tomatoes or 75 MT Yellow Maize).
  - Farmers submit direct farm-gate quotes; Middlemen submit full-service refrigerated freight quotes.
  - Retailers compare quotes and award contracts with 1-click escrow locking.

- **🚚 6-Stage Supply Chain & Smart Escrow Tracker**:
  - `Order Placed & Escrow Funded` ➔ `Harvest / Aggregation` ➔ `Quality Grading & Pre-chill` ➔ `In Refrigerated Transit (Live GPS & 11.2°C Temperature Sensor)` ➔ `Retailer Dock Arrival` ➔ `Dock Inspection Sign-off & Automated Payout`.
  - Built-in milestone simulator to test the entire lifecycle.

- **📄 Official Digital Documents Generator**:
  - Printable / Exportable **Digital Bill of Lading (e-CMR / ISO-28000 standard)**.
  - Automated Phytosanitary and Quality Inspection Audit Certificates.

- **💬 Tripartite Deal Room & Messaging**:
  - Real-time negotiation channel between Farmer, Middleman, and Retailer with quick contractual term buttons.

- **📈 Daily Mandi Benchmark & Fair Price Index**:
  - Real-time price ticker showing 24h % shifts for Tomatoes, Avocados, Maize, Peppers, Onions, Soybeans, etc.
  - Interactive "Legacy vs. AgriBridge" value-chain distribution breakdown showing how farmers earn 76% instead of 28%.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS v4, Lucide Icons, Modern responsive layout.
- **State & Data Store**: Context API with persistent `localStorage` synchronization and live event simulation.
- **Build Tool**: Vite 6 (Ultra-fast production build and HMR).

---

## 🏃 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser!

### 3. Production Build
```bash
npm run build
npm run preview
```

