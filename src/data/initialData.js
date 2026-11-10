export const USERS = [
  {
    id: 'user-farmer-1',
    name: 'Amara Eze',
    company: 'Oasis Valley Organic Farms',
    role: 'farmer',
    email: 'amara@oasisorganic.farm',
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&auto=format&fit=crop&q=80',
    location: 'Kaduna Agricultural Belt',
    coordinates: { lat: 10.52, lng: 7.44 },
    rating: 4.9,
    reviewsCount: 48,
    verified: true,
    certifications: ['Certified Organic', 'GAP Certified', 'Zero Chemical Residue'],
    bankDetails: 'Access Agro Escrow •••• 9012',
    memberSince: 'March 2023',
    farmSize: '85 Hectares',
    activeCrops: ['Vine Tomatoes', 'Bell Peppers', 'Cassava Tuber', 'Ginger'],
    bio: 'Pioneer organic grower specializing in hydroponic vine tomatoes and pest-resilient organic bell peppers. Direct farm-gate pickup available with on-site loading dock.'
  },
  {
    id: 'user-farmer-2',
    name: 'David Kiprono',
    company: 'Highland Highlands Cooperative',
    role: 'farmer',
    email: 'david@highlandgrowers.org',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'Eldoret Highlands Plateau',
    coordinates: { lat: 0.51, lng: 35.26 },
    rating: 4.8,
    reviewsCount: 62,
    verified: true,
    certifications: ['Fair Trade Certified', 'GlobalGAP Certified'],
    bankDetails: 'Kenya Commercial Bank •••• 4419',
    memberSince: 'January 2022',
    farmSize: '120 Hectares (Co-op Collective)',
    activeCrops: ['Hass Avocados', 'French Beans', 'Snow Peas'],
    bio: 'Cooperative representative connecting 35 smallholder avocado and legume orchardists. High elevation produce with rich dry-matter content and extended shelf life.'
  },
  {
    id: 'user-farmer-3',
    name: 'Mateo Silva',
    company: 'San Pedro Grain Agro-Industries',
    role: 'farmer',
    email: 'mateo@sanpedrograin.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    location: 'Pampas Regional Grain Hub',
    coordinates: { lat: -34.60, lng: -58.38 },
    rating: 4.95,
    reviewsCount: 94,
    verified: true,
    certifications: ['Non-GMO Verified', 'Moisture Tested <13%'],
    bankDetails: 'Banco Agro •••• 7721',
    memberSince: 'August 2021',
    farmSize: '450 Hectares',
    activeCrops: ['Yellow Maize (Corn)', 'Soybeans', 'Grain Sorghum'],
    bio: 'Commercial grain producer with mechanized harvesting, grain dryer towers, and aflatoxin certified laboratory testing on-site.'
  },
  {
    id: 'user-middleman-1',
    name: 'Carlos Morales',
    company: 'Apex Agri-Logistics & Aggregation Hub',
    role: 'middleman',
    email: 'carlos@apexlogistics.farm',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    location: 'Central Regional Distribution Terminal',
    coordinates: { lat: 9.08, lng: 7.39 },
    rating: 4.92,
    reviewsCount: 115,
    verified: true,
    certifications: ['Cold Chain ISO 22000', 'Licensed Grain Aggregator', 'Bonded Escrow Operator'],
    bankDetails: 'First Merchant Escrow •••• 3381',
    memberSince: 'June 2021',
    fleetSize: '14 Refrigerated Freight Vans, 8 High-Capacity Flatbeds',
    storageCapacity: '6,500 Metric Tons Cold Storage (2°C to 12°C)',
    commissionRate: '4.5% standard margin (Transparent)',
    bio: 'Bridging smallholder farmers with major supermarket retailers. We aggregate scattered farmer lots, conduct quality grading & washing, maintain cold chain transit, and guarantee payment within 24 hours.'
  },
  {
    id: 'user-middleman-2',
    name: 'Fatima Al-Mansoor',
    company: 'Nile Valley Grain & Produce Brokers',
    role: 'middleman',
    email: 'fatima@nilebrokers.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    location: 'North Inter-state Transit Corridor',
    coordinates: { lat: 11.99, lng: 8.52 },
    rating: 4.78,
    reviewsCount: 76,
    verified: true,
    certifications: ['Certified Grain Inspector', 'Licensed Commodity Aggregator'],
    bankDetails: 'Standard Chartered •••• 6201',
    memberSince: 'November 2022',
    fleetSize: '10 Bulk Haulage Trailers',
    storageCapacity: '12,000 MT Dry Silos',
    commissionRate: '3.8% brokerage',
    bio: 'Specialist in bulk grain procurement, bagging, moisture stabilization, and rail-link freight delivery for retail food processors.'
  },
  {
    id: 'user-retailer-1',
    name: 'Elena Rostova',
    company: 'FreshMart Supermarkets Group (45 Stores)',
    role: 'retailer',
    email: 'elena.rostova@freshmart.retail',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    location: 'Metro Central Centralized DC #4',
    coordinates: { lat: 9.05, lng: 7.49 },
    rating: 4.97,
    reviewsCount: 230,
    verified: true,
    certifications: ['HACCP Certified Retailer', 'National Food Safety Board Member'],
    bankDetails: 'Corporate Chase Escrow •••• 5590',
    memberSince: 'April 2020',
    procurementVolume: '180 Metric Tons / Month',
    storeCount: 45,
    bio: 'Head of Fresh Produce Procurement for FreshMart. We require Grade A certified crops, consistent weekly logistics schedules, and verified traceability back to farm.'
  },
  {
    id: 'user-retailer-2',
    name: 'Liam Chen',
    company: 'Bistro Collective (Farm-to-Table Hospitality)',
    role: 'retailer',
    email: 'liam@bistrocollective.org',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    location: 'Downtown Culinary District',
    coordinates: { lat: 9.07, lng: 7.48 },
    rating: 4.88,
    reviewsCount: 42,
    verified: true,
    certifications: ['Farm-to-Fork Verified', 'Zero Waste Partner'],
    bankDetails: 'Metro Commercial •••• 1120',
    memberSince: 'October 2023',
    procurementVolume: '15 Metric Tons / Month',
    storeCount: 12,
    bio: 'Executive Chef & Sourcing Director for 12 farm-to-table urban restaurants. We pay premium prices for organic, pesticide-free, vine-ripened produce.'
  }
];

export const COMMODITY_TICKER = [
  { id: 'com-1', name: 'Vine Tomatoes', unit: 'kg', benchmarkPrice: 1.45, change24h: 3.2, high7d: 1.52, low7d: 1.38, demandStatus: 'High Demand', category: 'Vegetables' },
  { id: 'com-2', name: 'Hass Avocados', unit: 'kg', benchmarkPrice: 2.80, change24h: 1.5, high7d: 2.95, low7d: 2.70, demandStatus: 'Steady Demand', category: 'Fruits' },
  { id: 'com-3', name: 'Yellow Maize (Dry)', unit: 'ton', benchmarkPrice: 285.00, change24h: -0.8, high7d: 295.00, low7d: 280.00, demandStatus: 'Moderate', category: 'Grains' },
  { id: 'com-4', name: 'Red Bell Peppers', unit: 'kg', benchmarkPrice: 2.10, change24h: 4.1, high7d: 2.15, low7d: 1.95, demandStatus: 'Peak Demand', category: 'Vegetables' },
  { id: 'com-5', name: 'Red Creole Onions', unit: 'kg', benchmarkPrice: 0.95, change24h: 2.0, high7d: 1.02, low7d: 0.88, demandStatus: 'Steady Demand', category: 'Vegetables' },
  { id: 'com-6', name: 'Soybeans Grade 1', unit: 'ton', benchmarkPrice: 540.00, change24h: 1.2, high7d: 555.00, low7d: 530.00, demandStatus: 'High Demand', category: 'Grains' },
  { id: 'com-7', name: 'Snow Peas (Export)', unit: 'kg', benchmarkPrice: 3.40, change24h: 5.6, high7d: 3.50, low7d: 3.10, demandStatus: 'Peak Demand', category: 'Legumes' },
  { id: 'com-8', name: 'Dutch Irish Potatoes', unit: 'kg', benchmarkPrice: 0.72, change24h: -1.4, high7d: 0.78, low7d: 0.70, demandStatus: 'Surplus Supply', category: 'Tubers' }
];

export const INITIAL_LISTINGS = [
  {
    id: 'prod-101',
    title: 'Grade A Vine-Ripened Greenhouse Tomatoes',
    farmerId: 'user-farmer-1',
    farmerName: 'Amara Eze',
    farmerCompany: 'Oasis Valley Organic Farms',
    farmerAvatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&auto=format&fit=crop&q=80',
    category: 'Vegetables',
    crop: 'Vine Tomatoes',
    variety: 'Roma Supreme Greenhouse',
    grade: 'Grade A (Export / Retail Standard)',
    certifiedOrganic: true,
    totalQuantity: 14000,
    availableQuantity: 11500,
    unit: 'kg',
    pricePerUnit: 1.35,
    minOrderQuantity: 500,
    location: 'Kaduna Agricultural Belt',
    distanceKm: 42,
    harvestDate: '2026-11-09',
    shelfLifeDays: 14,
    storageCondition: 'Cooled packing shed, 12°C',
    deliveryOptions: ['Farm-Gate Pickup', 'Aggregator Fleet Collection', 'Direct Dispatch (MOQ > 5,000 kg)'],
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Hydroponically cultivated Vine Tomatoes with deep uniform color, firm skins, and exceptional brix index (sweetness). Harvested at color breaker stage 4 to give retailers maximum shelf-life.',
    moistureOrSugar: 'Brix Index: 5.8°',
    packaging: 'Washed, sorted, packed in 10 kg ventilated stackable plastic crates',
    bidsCount: 3,
    status: 'ACTIVE',
    middlemanEligible: true,
    inspectionCertUrl: '#cert-tomatoes'
  },
  {
    id: 'prod-102',
    title: 'Hass Avocados (High-Dry Matter, Ready for Export/Retail)',
    farmerId: 'user-farmer-2',
    farmerName: 'David Kiprono',
    farmerCompany: 'Highland Highlands Cooperative',
    farmerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Fruits',
    crop: 'Hass Avocados',
    variety: 'Hass Premium Grafted',
    grade: 'Grade A (GlobalGAP Certified)',
    certifiedOrganic: false,
    totalQuantity: 28000,
    availableQuantity: 24000,
    unit: 'kg',
    pricePerUnit: 2.55,
    minOrderQuantity: 1000,
    location: 'Eldoret Highlands Plateau',
    distanceKm: 120,
    harvestDate: '2026-11-12',
    shelfLifeDays: 24,
    storageCondition: 'Hydro-cooled, 5.5°C refrigerated transit ready',
    deliveryOptions: ['Cold-Chain Middleman Pickup', 'Farm-Gate Containerized Load'],
    images: [
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Direct from 35 smallholder members in high-altitude volcanic soils. Dry matter content exceeds 24%, guaranteeing creamy texture and resistance to bruising during retail transit.',
    moistureOrSugar: 'Dry Matter: 25.2%',
    packaging: 'Standard 4 kg cartons (Count 16/18/20) or 10 kg bulk plastic lugs',
    bidsCount: 4,
    status: 'ACTIVE',
    middlemanEligible: true,
    inspectionCertUrl: '#cert-avocados'
  },
  {
    id: 'prod-103',
    title: 'Mechanized Clean Yellow Maize (Moisture < 12.8%)',
    farmerId: 'user-farmer-3',
    farmerName: 'Mateo Silva',
    farmerCompany: 'San Pedro Grain Agro-Industries',
    farmerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    category: 'Grains',
    crop: 'Yellow Maize (Corn)',
    variety: 'DKC 9089 High-Starch',
    grade: 'Grade 1 (Aflatoxin < 4 ppb)',
    certifiedOrganic: false,
    totalQuantity: 95000,
    availableQuantity: 80000,
    unit: 'kg',
    pricePerUnit: 0.27, // $270/ton
    minOrderQuantity: 5000,
    location: 'Pampas Regional Grain Hub',
    distanceKm: 95,
    harvestDate: '2026-11-04',
    shelfLifeDays: 180,
    storageCondition: 'Aerated Silos, Ambient dry < 60% RH',
    deliveryOptions: ['Rail Hopper Dispatch', 'Bulk Tipper Truck Loading', 'Bags (50 kg polypropylene)'],
    images: [
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600336153113-d66c79de3e91?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Cleaned, de-stoned, and dried under monitored airflow. Perfect for commercial breakfast cereal production, flour milling, or animal nutrition processors. Official lab certificate available.',
    moistureOrSugar: 'Moisture: 12.4% | Aflatoxin: 1.8 ppb',
    packaging: '50 kg bags or bulk bottom-discharge trailer load',
    bidsCount: 5,
    status: 'ACTIVE',
    middlemanEligible: true,
    inspectionCertUrl: '#cert-maize'
  },
  {
    id: 'prod-104',
    title: 'Crisp Green Bell Peppers (Capsicum)',
    farmerId: 'user-farmer-1',
    farmerName: 'Amara Eze',
    farmerCompany: 'Oasis Valley Organic Farms',
    farmerAvatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&auto=format&fit=crop&q=80',
    category: 'Vegetables',
    crop: 'Bell Peppers',
    variety: 'California Wonder Hybrid',
    grade: 'Grade A (Thick walled, 80mm+ diameter)',
    certifiedOrganic: true,
    totalQuantity: 8000,
    availableQuantity: 6200,
    unit: 'kg',
    pricePerUnit: 1.95,
    minOrderQuantity: 300,
    location: 'Kaduna Agricultural Belt',
    distanceKm: 42,
    harvestDate: '2026-11-08',
    shelfLifeDays: 18,
    storageCondition: 'Refrigerated packing bay (9°C)',
    deliveryOptions: ['Farm-Gate Pickup', 'Aggregator Freight'],
    images: [
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Crisp, vibrant green bell peppers grown with biological pest controls in net-houses. High vitamin C, uniform square shape, zero chemical pesticide residues.',
    moistureOrSugar: 'Wall thickness: 6.5mm',
    packaging: '5 kg ventilated corrugated cartons',
    bidsCount: 2,
    status: 'ACTIVE',
    middlemanEligible: true,
    inspectionCertUrl: '#cert-peppers'
  },
  {
    id: 'prod-105',
    title: 'Premium Hand-Picked Snow Peas & Mangetout',
    farmerId: 'user-farmer-2',
    farmerName: 'David Kiprono',
    farmerCompany: 'Highland Highlands Cooperative',
    farmerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Legumes',
    crop: 'Snow Peas',
    variety: 'Oregon Sugar Pod II',
    grade: 'Export Grade (Stringless, flat, tender)',
    certifiedOrganic: false,
    totalQuantity: 5000,
    availableQuantity: 3800,
    unit: 'kg',
    pricePerUnit: 3.20,
    minOrderQuantity: 200,
    location: 'Eldoret Highlands Plateau',
    distanceKm: 120,
    harvestDate: '2026-11-10',
    shelfLifeDays: 10,
    storageCondition: 'Continuous Cold Chain 3°C to 5°C',
    deliveryOptions: ['Air Freight Ready Consignment', 'Refrigerated Van Transit'],
    images: [
      'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Crisp tender snow peas harvested in early morning mist to retain maximum crunch and sugar content. Preferred by high-end gastronomy and luxury retail supermarket chains.',
    moistureOrSugar: 'Length: 7-9 cm uniform',
    packaging: 'Polylined 2.5 kg punnet cartons',
    bidsCount: 1,
    status: 'ACTIVE',
    middlemanEligible: true,
    inspectionCertUrl: '#cert-snowpeas'
  }
];

export const AGGREGATED_LOTS = [
  {
    id: 'agg-201',
    title: 'Apex Consolidated Grade A Tomato Consignment (3 Farms)',
    aggregatorId: 'user-middleman-1',
    aggregatorName: 'Carlos Morales',
    aggregatorCompany: 'Apex Agri-Logistics & Aggregation Hub',
    aggregatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    totalTons: 28,
    totalKg: 28000,
    unit: 'kg',
    pricePerUnit: 1.50,
    farmerSources: [
      { name: 'Amara Eze (Oasis Valley)', contributionKg: 12000, grade: 'Grade A', paid: true },
      { name: 'Kano Smallholder Co-op #3', contributionKg: 9000, grade: 'Grade A', paid: true },
      { name: 'Zaria Ridge Growers', contributionKg: 7000, grade: 'Grade A', paid: true }
    ],
    qualityInspection: {
      inspector: 'Dr. Samuel Kalu (Certified Quality Auditor)',
      score: '96/100',
      status: 'VERIFIED & PASSED',
      defects: '< 1.5% surface blemish',
      coldChainTemp: '11.8°C maintained'
    },
    servicesIncluded: [
      'Multi-Farm Crop Aggregation',
      'Optical Sizing & Mechanical Washing',
      'Sanitized Returnable Plastic Crates (RPC)',
      'Door-to-Door Refrigerated Freight',
      'Buyer Escrow Guarantee'
    ],
    location: 'Central Regional Distribution Terminal',
    availableForDispatch: 'Immediate (Loaded in 2 Reefers)',
    targetRetailers: 'Supermarket Chains, Metro Grocery DCs',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80',
    status: 'READY_FOR_RETAILER'
  },
  {
    id: 'agg-202',
    title: 'Apex Certified Hass Avocado Export Container (Pooled 45 MT)',
    aggregatorId: 'user-middleman-1',
    aggregatorName: 'Carlos Morales',
    aggregatorCompany: 'Apex Agri-Logistics & Aggregation Hub',
    aggregatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    totalTons: 45,
    totalKg: 45000,
    unit: 'kg',
    pricePerUnit: 2.82,
    farmerSources: [
      { name: 'David Kiprono (Highland Co-op)', contributionKg: 24000, grade: 'Export Grade', paid: true },
      { name: 'Cherangany Growers Association', contributionKg: 21000, grade: 'Export Grade', paid: true }
    ],
    qualityInspection: {
      inspector: 'GlobalGAP Field Agent Sarah Miller',
      score: '98/100',
      status: 'EXPORT COMPLIANT',
      defects: '< 0.8%',
      coldChainTemp: '5.2°C Controlled Atmosphere'
    },
    servicesIncluded: [
      'Smallholder Aggregation across 48 farms',
      'Palletized 4 kg display cartons with barcode tracking',
      'Pre-cooling & CA Containerization',
      'Customs & Phytosanitary Clearances'
    ],
    location: 'Apex Terminal Cold Bay 4',
    availableForDispatch: 'Nov 14, 2026',
    targetRetailers: 'International & Regional Supermarkets',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=80',
    status: 'READY_FOR_RETAILER'
  }
];

export const BUYER_RFQS = [
  {
    id: 'rfq-301',
    title: 'Standing Weekly Procurement: 15 MT Grade A Vine Tomatoes',
    retailerId: 'user-retailer-1',
    retailerName: 'Elena Rostova',
    retailerCompany: 'FreshMart Supermarkets Group',
    retailerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Vegetables',
    crop: 'Vine Tomatoes',
    gradeRequirement: 'Grade A (Uniform diameter 60-70mm, breaker stage 3-4)',
    quantityNeeded: 15000,
    unit: 'kg',
    frequency: 'Weekly for 12 weeks',
    targetBudgetPerUnit: 1.40,
    totalBudget: 21000,
    deliveryDestination: 'FreshMart Central DC #4, Metro Expressway',
    deadlineDate: '2026-11-16',
    paymentTerms: '100% Escrow on AgriBridge, Release 24h after Quality Check at DC dock',
    proposalsCount: 3,
    status: 'OPEN',
    logisticsRequired: 'Refrigerated transit mandatory (10°C to 13°C)',
    bids: [
      {
        bidderId: 'user-middleman-1',
        bidderName: 'Carlos Morales (Apex Logistics)',
        bidderRole: 'middleman',
        offeredPrice: 1.42,
        offeredQuantity: 15000,
        timeline: 'Guaranteed Monday 06:00 AM delivery weekly',
        includesFreight: true,
        notes: 'We consolidate directly from Amara Eze + 2 partner farms, handle full grading, washing, and temperature-logged freight.',
        status: 'UNDER_REVIEW',
        submittedAt: '2026-11-10T09:30:00Z'
      },
      {
        bidderId: 'user-farmer-1',
        bidderName: 'Amara Eze (Oasis Organic)',
        bidderRole: 'farmer',
        offeredPrice: 1.34,
        offeredQuantity: 12000,
        timeline: 'Direct farm-gate loading available every Sunday',
        includesFreight: false,
        notes: 'Direct farm sale. FreshMart or their logistics partner handles pickup from our Kaduna packing shed.',
        status: 'UNDER_REVIEW',
        submittedAt: '2026-11-09T14:15:00Z'
      }
    ]
  },
  {
    id: 'rfq-302',
    title: 'Bulk Dry Yellow Maize Tender (75 Metric Tons)',
    retailerId: 'user-retailer-1',
    retailerName: 'Elena Rostova',
    retailerCompany: 'FreshMart Supermarkets Group',
    retailerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Grains',
    crop: 'Yellow Maize (Corn)',
    gradeRequirement: 'Moisture < 13.0%, Aflatoxin < 4 ppb, Cleaned & De-stoned',
    quantityNeeded: 75000,
    unit: 'kg',
    frequency: 'One-time Bulk Shipment',
    targetBudgetPerUnit: 0.28,
    totalBudget: 21000,
    deliveryDestination: 'FreshMart Dry Food Packaging Facility, Sector 9',
    deadlineDate: '2026-11-18',
    paymentTerms: 'Escrow backed by Verified Weight Bridge and Lab Certificate',
    proposalsCount: 2,
    status: 'OPEN',
    logisticsRequired: 'Tarpaulin covered bulk tipper or 50kg bag palletized freight',
    bids: [
      {
        bidderId: 'user-farmer-3',
        bidderName: 'Mateo Silva (San Pedro Grain)',
        bidderRole: 'farmer',
        offeredPrice: 0.27,
        offeredQuantity: 75000,
        timeline: 'Dispatch ready within 48 hours of escrow funding',
        includesFreight: false,
        notes: 'Includes full official aflatoxin & moisture test certificate from our automated grain drying silo.',
        status: 'SHORTLISTED',
        submittedAt: '2026-11-10T11:00:00Z'
      }
    ]
  },
  {
    id: 'rfq-303',
    title: 'Organic Restaurant Supply: 2,000 kg Avocados + 500 kg Snow Peas',
    retailerId: 'user-retailer-2',
    retailerName: 'Liam Chen',
    retailerCompany: 'Bistro Collective (Farm-to-Table Hospitality)',
    retailerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    category: 'Mixed Specialty',
    crop: 'Avocados & Snow Peas',
    gradeRequirement: 'Organic Certified, ripeness ready for commercial kitchens',
    quantityNeeded: 2500,
    unit: 'kg',
    frequency: 'Bi-weekly',
    targetBudgetPerUnit: 2.90,
    totalBudget: 7250,
    deliveryDestination: 'Bistro Commissary Kitchen, Central Warehouse',
    deadlineDate: '2026-11-15',
    paymentTerms: 'Same-day release upon chef quality confirmation',
    proposalsCount: 1,
    status: 'OPEN',
    logisticsRequired: 'Temperature controlled split delivery',
    bids: []
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-8821',
    rfqRef: 'rfq-301',
    productName: 'Apex Consolidated Grade A Vine Tomatoes (15,000 kg)',
    buyer: {
      id: 'user-retailer-1',
      name: 'Elena Rostova',
      company: 'FreshMart Supermarkets',
      role: 'retailer'
    },
    intermediary: {
      id: 'user-middleman-1',
      name: 'Carlos Morales',
      company: 'Apex Agri-Logistics Hub',
      role: 'middleman'
    },
    farmer: {
      id: 'user-farmer-1',
      name: 'Amara Eze',
      company: 'Oasis Valley Organic Farms',
      role: 'farmer'
    },
    quantity: 15000,
    unit: 'kg',
    unitPrice: 1.42,
    farmerSubtotal: 19800, // $1.32/kg paid to farmer
    middlemanMargin: 1500,  // $0.10/kg middleman fee (covers cold trucking, grading, crates)
    totalAmount: 21300,
    escrowStatus: 'FUNDED_AND_HELD', // Escrow secured
    escrowProvider: 'AgriBridge Smart Escrow (Protected)',
    status: 'IN_TRANSIT', // Milestones: ORDER_PLACED -> QUALITY_CHECKED -> DISPATCHED -> IN_TRANSIT -> DELIVERED -> INSPECTED_RELEASED
    currentMilestoneIndex: 3,
    milestones: [
      { step: 'Order Placed & Escrow Funded', date: 'Nov 09, 08:30 AM', completed: true, note: '$21,300 locked in AgriBridge Escrow' },
      { step: 'Farm-Gate Harvest & Aggregation', date: 'Nov 09, 02:15 PM', completed: true, note: 'Collected 12,000 kg from Amara + 3,000 kg from Kano partner' },
      { step: 'Grading, Washing & Cold Pre-chill', date: 'Nov 10, 09:00 AM', completed: true, note: 'Quality score 96/100, Crates sanitized, pre-cooled to 11.5°C' },
      { step: 'Refrigerated Transit En Route', date: 'Nov 10, 04:30 PM', completed: true, note: 'Truck #AB-Reefer-04 en route. Current GPS: Corridor Km 84. Temp: 11.2°C' },
      { step: 'Retailer DC Delivery & Dock Inspection', date: 'Estimated: Nov 11, 07:00 AM', completed: false, note: 'Dock bay 12 reserved at FreshMart Central DC' },
      { step: 'Escrow Release & Instant Payout', date: 'Pending Dock Sign-off', completed: false, note: 'Automated release to Farmer ($19,800) and Middleman ($1,500)' }
    ],
    telemetry: {
      truckId: 'Apex Reefer #04 (Scania R450)',
      driverName: 'Ibrahim Bello',
      driverPhone: '+234 803 555 0192',
      currentLocation: 'Expressway Waypoint Mile 84 (38 km to DC)',
      currentTempCelsius: 11.2,
      targetTempRange: '10.0°C - 12.5°C',
      tempStatus: 'OPTIMAL_GREEN',
      fuelLevel: '78%',
      etaMinutes: 48
    },
    inspectionData: {
      inspectorName: 'Dr. Samuel Kalu (AgriBridge Verified QA)',
      certNumber: 'QA-2026-TOM-8821',
      defectsFoundPct: 1.2,
      moistureLossPct: 0.1,
      passedGrading: true
    }
  },
  {
    id: 'ORD-8804',
    rfqRef: 'rfq-302',
    productName: 'Clean Yellow Maize Commercial Batch (40,000 kg)',
    buyer: {
      id: 'user-middleman-1',
      name: 'Carlos Morales',
      company: 'Apex Agri-Logistics',
      role: 'middleman'
    },
    intermediary: null,
    farmer: {
      id: 'user-farmer-3',
      name: 'Mateo Silva',
      company: 'San Pedro Grain Agro',
      role: 'farmer'
    },
    quantity: 40000,
    unit: 'kg',
    unitPrice: 0.265,
    farmerSubtotal: 10600,
    middlemanMargin: 0,
    totalAmount: 10600,
    escrowStatus: 'FUNDED_AND_HELD',
    escrowProvider: 'AgriBridge Smart Escrow',
    status: 'QUALITY_CHECKED',
    currentMilestoneIndex: 2,
    milestones: [
      { step: 'Procurement Contract Agreed', date: 'Nov 08, 11:00 AM', completed: true, note: 'Middleman Carlos contracted directly with Farmer Mateo' },
      { step: 'Escrow Funded', date: 'Nov 08, 01:20 PM', completed: true, note: '$10,600 held in Escrow' },
      { step: 'Silo Inspection & Moisture Check', date: 'Nov 10, 10:45 AM', completed: true, note: 'Moisture tested 12.3%, Aflatoxin 1.7 ppb. Grade 1 certified' },
      { step: 'Bulk Hopper Loading', date: 'Nov 11, 09:00 AM', completed: false, note: 'Apex Bulk tippers scheduled for farm silo dock loading' },
      { step: 'Transport to Regional Silo Terminal', date: 'Nov 11, 03:00 PM', completed: false, note: 'Arrival at Apex Silos for long-term grain buffer' },
      { step: 'Payment Release to Farmer', date: 'Pending Loading Sign-off', completed: false, note: '$10,600 straight to Mateo Silva bank account' }
    ],
    telemetry: null,
    inspectionData: {
      inspectorName: 'Regional Grain Board Inspector',
      certNumber: 'GRAIN-MZE-2026-90',
      defectsFoundPct: 0.4,
      moistureLossPct: 0.0,
      passedGrading: true
    }
  },
  {
    id: 'ORD-8760',
    rfqRef: 'rfq-303',
    productName: 'Direct Farm-to-Table Avocados & Snow Peas (2,500 kg)',
    buyer: {
      id: 'user-retailer-2',
      name: 'Liam Chen',
      company: 'Bistro Collective',
      role: 'retailer'
    },
    intermediary: null,
    farmer: {
      id: 'user-farmer-2',
      name: 'David Kiprono',
      company: 'Highland Highlands Cooperative',
      role: 'farmer'
    },
    quantity: 2500,
    unit: 'kg',
    unitPrice: 2.85,
    farmerSubtotal: 7125,
    middlemanMargin: 0,
    totalAmount: 7125,
    escrowStatus: 'RELEASED_TO_FARMER',
    escrowProvider: 'AgriBridge Smart Escrow',
    status: 'COMPLETED_PAID',
    currentMilestoneIndex: 5,
    milestones: [
      { step: 'Order Placed', date: 'Nov 02', completed: true, note: 'Direct order from Bistro Collective' },
      { step: 'Escrow Locked', date: 'Nov 02', completed: true, note: '$7,125 locked' },
      { step: 'Morning Picked & Packed', date: 'Nov 03', completed: true, note: 'Packed at Highland Co-op' },
      { step: 'Express Van Transit', date: 'Nov 04', completed: true, note: 'Chilled transit maintained 4°C' },
      { step: 'Delivered to Bistro Commissary', date: 'Nov 04', completed: true, note: 'Accepted and verified by Executive Chef' },
      { step: 'Escrow Released to Farmer', date: 'Nov 04', completed: true, note: '$7,125 transferred to David Kiprono. 5-star review given.' }
    ],
    telemetry: null,
    inspectionData: {
      inspectorName: 'Chef Liam Chen (Direct Acceptance)',
      certNumber: 'BISTRO-INSP-44',
      defectsFoundPct: 0.2,
      moistureLossPct: 0.0,
      passedGrading: true
    }
  }
];

export const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    title: 'Tomato Consignment ORD-8821 Discussion',
    participants: ['user-retailer-1', 'user-middleman-1', 'user-farmer-1'],
    orderRef: 'ORD-8821',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'user-farmer-1',
        senderName: 'Amara Eze (Farmer)',
        text: 'Hello Carlos and Elena! We finished picking the vine tomatoes at 6am this morning. The Brix sweetness is clocking at 5.8°, skin is firm and flawless.',
        timestamp: '2026-11-10T08:15:00Z',
        type: 'text'
      },
      {
        id: 'm2',
        senderId: 'user-middleman-1',
        senderName: 'Carlos Morales (Middleman/Aggregator)',
        text: 'Thanks Amara! Our refrigerated truck arrived at your gate at 8am. We loaded 12,000 kg from your cold shed, plus 3,000 kg from our nearby verified outgrower. Pre-cooling is locked at 11.2°C.',
        timestamp: '2026-11-10T09:40:00Z',
        type: 'text'
      },
      {
        id: 'm3',
        senderId: 'user-retailer-1',
        senderName: 'Elena Rostova (Retailer - FreshMart)',
        text: 'Excellent work both of you. Our distribution dock team at DC #4 is alerted for arrival tomorrow morning at 07:00 AM. As soon as the dock optical scanner verifies the temperature log and grade, our system will auto-approve the escrow release!',
        timestamp: '2026-11-10T10:20:00Z',
        type: 'text'
      },
      {
        id: 'm4',
        senderId: 'user-middleman-1',
        senderName: 'Carlos Morales (Middleman/Aggregator)',
        text: 'Live GPS telemetry and digital temperature chart have been shared to the order tracker. We are currently 38 km away on Highway Mile 84.',
        timestamp: '2026-11-10T11:05:00Z',
        type: 'text'
      }
    ]
  },
  {
    id: 'conv-2',
    title: 'RFQ-302 Bulk Maize Tender Inquiry',
    participants: ['user-retailer-1', 'user-farmer-3'],
    orderRef: null,
    unreadCount: 0,
    messages: [
      {
        id: 'm21',
        senderId: 'user-retailer-1',
        senderName: 'Elena Rostova (Retailer)',
        text: 'Hi Mateo, we saw your proposal for our 75 MT Yellow Maize tender at $0.27/kg. Can you confirm if your moisture level stays consistently below 13% for the full volume?',
        timestamp: '2026-11-10T12:00:00Z',
        type: 'text'
      },
      {
        id: 'm22',
        senderId: 'user-farmer-3',
        senderName: 'Mateo Silva (Farmer)',
        text: 'Hi Elena! Yes, 100% guaranteed. Our computerized dryer silos test every 5-ton batch. Average moisture is 12.4%, and aflatoxin is under 2 ppb. I can upload the official lab certificate right here on AgriBridge.',
        timestamp: '2026-11-10T12:15:00Z',
        type: 'text'
      }
    ]
  }
];

export const MARKET_INSIGHTS = {
  regionalDemandHighlights: [
    { crop: 'Vine Tomatoes', trend: 'SURGING', reason: 'High retail urban demand ahead of festival season; supply shortfall in northern zones.', recommendation: 'Farmers can lock in contracts at +8% above 30-day average.' },
    { crop: 'Hass Avocados', trend: 'STRONG EXPORT', reason: 'European sea freight capacity opened up; exporters paying top dollar for Grade A >24% dry matter.', recommendation: 'Middlemen actively aggregating smallholder acreage.' },
    { crop: 'Yellow Maize', trend: 'BALANCED', reason: 'Commercial harvest in full swing across central grain plains; prices stable with heavy mill buying.', recommendation: 'Ensure dry storage to avoid discount penalties.' },
    { crop: 'Snow Peas & Legumes', trend: 'PEAK PREMIUM', reason: 'High-end hospitality and organic restaurant sector expansion in metro areas.', recommendation: 'Direct farm-to-table contracts yielding highest margins.' }
  ],
  priceHistoryWeekly: [
    { week: 'W1 Oct', tomatoes: 1.25, avocados: 2.60, maize: 270, peppers: 1.85 },
    { week: 'W2 Oct', tomatoes: 1.30, avocados: 2.65, maize: 272, peppers: 1.90 },
    { week: 'W3 Oct', tomatoes: 1.32, avocados: 2.70, maize: 278, peppers: 1.95 },
    { week: 'W4 Oct', tomatoes: 1.38, avocados: 2.75, maize: 282, peppers: 2.00 },
    { week: 'W1 Nov', tomatoes: 1.42, avocados: 2.78, maize: 284, peppers: 2.05 },
    { week: 'W2 Nov (Now)', tomatoes: 1.45, avocados: 2.80, maize: 285, peppers: 2.10 }
  ]
};

