import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  USERS,
  COMMODITY_TICKER,
  INITIAL_LISTINGS,
  AGGREGATED_LOTS,
  BUYER_RFQS,
  INITIAL_ORDERS,
  INITIAL_CONVERSATIONS,
  MARKET_INSIGHTS
} from '../data/initialData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Load stored state or defaults
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('agribridge_users');
    return saved ? JSON.parse(saved) : USERS;
  });

  const [currentUserId, setCurrentUserId] = useState(() => {
    return localStorage.getItem('agribridge_current_user') || 'user-middleman-1';
  });

  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('agribridge_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [aggregatedLots, setAggregatedLots] = useState(() => {
    const saved = localStorage.getItem('agribridge_aggregated_lots');
    return saved ? JSON.parse(saved) : AGGREGATED_LOTS;
  });

  const [rfqs, setRfqs] = useState(() => {
    const saved = localStorage.getItem('agribridge_rfqs');
    return saved ? JSON.parse(saved) : BUYER_RFQS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('agribridge_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('agribridge_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [ticker, setTicker] = useState(COMMODITY_TICKER);
  const [activeTab, setActiveTab] = useState('marketplace'); // 'marketplace' | 'rfqs' | 'orders' | 'dashboard' | 'insights' | 'messages'
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Order #ORD-8821 temperature logged at optimal 11.2°C.', time: '10m ago', unread: true },
    { id: 2, text: 'New proposal received from Carlos Morales on your Vine Tomato RFQ.', time: '1h ago', unread: true },
    { id: 3, text: 'Market benchmark for Hass Avocados moved up +1.5% today.', time: '3h ago', unread: false }
  ]);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('agribridge_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('agribridge_current_user', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('agribridge_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('agribridge_aggregated_lots', JSON.stringify(aggregatedLots));
  }, [aggregatedLots]);

  useEffect(() => {
    localStorage.setItem('agribridge_rfqs', JSON.stringify(rfqs));
  }, [rfqs]);

  useEffect(() => {
    localStorage.setItem('agribridge_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('agribridge_conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Current active user object
  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const addNotification = (text) => {
    setNotifications(prev => [
      { id: Date.now(), text, time: 'Just now', unread: true },
      ...prev
    ]);
  };

  // Farmer actions
  const addListing = (newListingData) => {
    const newListing = {
      id: `prod-${Date.now().toString().slice(-4)}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerCompany: currentUser.company,
      farmerAvatar: currentUser.avatar,
      bidsCount: 0,
      status: 'ACTIVE',
      distanceKm: Math.floor(Math.random() * 80) + 15,
      ...newListingData
    };
    setListings(prev => [newListing, ...prev]);
    showToast(`Listing for "${newListing.title}" created successfully!`);
    addNotification(`Your produce listing "${newListing.crop}" is now live on the exchange.`);
    return newListing;
  };

  // Middleman aggregation action
  const createAggregatedLot = (lotData) => {
    const newLot = {
      id: `agg-${Date.now().toString().slice(-4)}`,
      aggregatorId: currentUser.id,
      aggregatorName: currentUser.name,
      aggregatorCompany: currentUser.company,
      aggregatorAvatar: currentUser.avatar,
      status: 'READY_FOR_RETAILER',
      ...lotData
    };
    setAggregatedLots(prev => [newLot, ...prev]);
    showToast(`Aggregated Bulk Lot "${newLot.title}" created and ready for retail buyers!`);
    addNotification(`Aggregated lot created: ${newLot.totalTons} MT ready for retail bidding.`);
    return newLot;
  };

  // Retailer RFQ action
  const postRFQ = (rfqData) => {
    const newRfq = {
      id: `rfq-${Date.now().toString().slice(-4)}`,
      retailerId: currentUser.id,
      retailerName: currentUser.name,
      retailerCompany: currentUser.company,
      retailerAvatar: currentUser.avatar,
      proposalsCount: 0,
      bids: [],
      status: 'OPEN',
      ...rfqData
    };
    setRfqs(prev => [newRfq, ...prev]);
    showToast(`Procurement RFQ for "${newRfq.crop}" published to exchange!`);
    addNotification(`Your RFQ for ${newRfq.quantityNeeded} ${newRfq.unit} ${newRfq.crop} is now open.`);
    return newRfq;
  };

  // Bid / Proposal on RFQ
  const submitRFQBid = (rfqId, bidData) => {
    const newBid = {
      bidderId: currentUser.id,
      bidderName: `${currentUser.name} (${currentUser.company})`,
      bidderRole: currentUser.role,
      status: 'UNDER_REVIEW',
      submittedAt: new Date().toISOString(),
      ...bidData
    };

    setRfqs(prev => prev.map(r => {
      if (r.id === rfqId) {
        return {
          ...r,
          proposalsCount: r.proposalsCount + 1,
          bids: [newBid, ...r.bids]
        };
      }
      return r;
    }));

    showToast(`Your quote of $${bidData.offeredPrice}/${bidData.unit || 'unit'} submitted to ${rfqId}!`);
    addNotification(`New quote submitted for RFQ ${rfqId}.`);
  };

  // Accept a Bid on an RFQ and spawn a funded Escrow Order
  const acceptRFQBid = (rfqId, bid) => {
    const rfq = rfqs.find(r => r.id === rfqId);
    if (!rfq) return;

    // Check who is the seller
    const seller = users.find(u => u.id === bid.bidderId) || {
      id: bid.bidderId,
      name: bid.bidderName,
      company: bid.bidderName,
      role: bid.bidderRole
    };

    const isSellerMiddleman = bid.bidderRole === 'middleman';
    const totalAmount = bid.offeredPrice * bid.offeredQuantity;

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      rfqRef: rfq.id,
      productName: `${rfq.crop} (${bid.offeredQuantity.toLocaleString()} ${rfq.unit})`,
      buyer: {
        id: currentUser.id,
        name: currentUser.name,
        company: currentUser.company,
        role: currentUser.role
      },
      intermediary: isSellerMiddleman ? {
        id: seller.id,
        name: seller.name,
        company: seller.company,
        role: 'middleman'
      } : null,
      farmer: isSellerMiddleman ? {
        id: 'user-farmer-1',
        name: 'Amara Eze',
        company: 'Oasis Valley Organic Farms',
        role: 'farmer'
      } : {
        id: seller.id,
        name: seller.name,
        company: seller.company,
        role: 'farmer'
      },
      quantity: bid.offeredQuantity,
      unit: rfq.unit,
      unitPrice: bid.offeredPrice,
      farmerSubtotal: isSellerMiddleman ? (bid.offeredPrice * 0.92 * bid.offeredQuantity) : totalAmount,
      middlemanMargin: isSellerMiddleman ? (bid.offeredPrice * 0.08 * bid.offeredQuantity) : 0,
      totalAmount: totalAmount,
      escrowStatus: 'FUNDED_AND_HELD',
      escrowProvider: 'AgriBridge Smart Escrow (Protected)',
      status: 'ORDER_PLACED',
      currentMilestoneIndex: 0,
      milestones: [
        { step: 'Order Placed & Escrow Funded', date: 'Just now', completed: true, note: `$${totalAmount.toLocaleString()} funded into AgriBridge Escrow` },
        { step: 'Harvest / Farm Aggregation', date: 'Scheduled next', completed: false, note: 'Collection and load preparation' },
        { step: 'Quality Grading & Pre-cooling', date: 'Pending', completed: false, note: 'Moisture, brix and surface inspection' },
        { step: 'In Transit / Logistics Dispatch', date: 'Pending', completed: false, note: 'GPS & cold chain monitoring active during transit' },
        { step: 'Retailer Dock Delivery & Inspection', date: 'Pending', completed: false, note: 'Dock barcode scan and quality sign-off' },
        { step: 'Escrow Release & Automated Payout', date: 'Pending', completed: false, note: 'Direct release to grower and logistics provider' }
      ],
      telemetry: {
        truckId: 'Apex Reefer #07',
        driverName: 'Kofi Mensah',
        driverPhone: '+234 812 400 9981',
        currentLocation: 'Preparing for dock departure',
        currentTempCelsius: 11.0,
        targetTempRange: '10.0°C - 12.5°C',
        tempStatus: 'OPTIMAL_GREEN',
        fuelLevel: '95%',
        etaMinutes: 120
      },
      inspectionData: {
        inspectorName: 'AgriBridge Digital Automated QA',
        certNumber: `QA-2026-${Date.now().toString().slice(-4)}`,
        defectsFoundPct: 0.8,
        moistureLossPct: 0.1,
        passedGrading: true
      }
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update RFQ status
    setRfqs(prev => prev.map(r => r.id === rfqId ? { ...r, status: 'CONTRACT_AWARDED' } : r));

    showToast(`Order ${newOrder.id} created and $${totalAmount.toLocaleString()} locked into Escrow!`);
    addNotification(`Contract awarded for RFQ ${rfqId}. Order ${newOrder.id} generated.`);
    setSelectedOrder(newOrder);
    setActiveTab('orders');
  };

  // Direct purchase from Produce listing
  const purchaseListingDirect = (listing, quantity, isMiddlemanPurchase = false) => {
    const qty = quantity || listing.minOrderQuantity;
    const totalAmount = listing.pricePerUnit * qty;

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      rfqRef: null,
      productName: `${listing.crop} - ${listing.variety} (${qty.toLocaleString()} ${listing.unit})`,
      buyer: {
        id: currentUser.id,
        name: currentUser.name,
        company: currentUser.company,
        role: currentUser.role
      },
      intermediary: isMiddlemanPurchase ? null : null,
      farmer: {
        id: listing.farmerId,
        name: listing.farmerName,
        company: listing.farmerCompany,
        role: 'farmer'
      },
      quantity: qty,
      unit: listing.unit,
      unitPrice: listing.pricePerUnit,
      farmerSubtotal: totalAmount,
      middlemanMargin: 0,
      totalAmount: totalAmount,
      escrowStatus: 'FUNDED_AND_HELD',
      escrowProvider: 'AgriBridge Smart Escrow (Protected)',
      status: 'ORDER_PLACED',
      currentMilestoneIndex: 0,
      milestones: [
        { step: 'Order Placed & Escrow Funded', date: 'Just now', completed: true, note: `$${totalAmount.toLocaleString()} locked in AgriBridge Escrow` },
        { step: 'Farm-Gate Harvest & Packing', date: 'Within 24h', completed: false, note: `${listing.location} dispatch loading dock` },
        { step: 'Quality Grading & Sorting', date: 'Pending', completed: false, note: `Grade target: ${listing.grade}` },
        { step: 'Logistics Dispatch', date: 'Pending', completed: false, note: 'Fleet routing underway' },
        { step: 'Delivery Dock Inspection', date: 'Pending', completed: false, note: 'Buyer verification upon arrival' },
        { step: 'Escrow Release to Farmer', date: 'Pending', completed: false, note: 'Instant bank transfer upon dock acceptance' }
      ],
      telemetry: {
        truckId: 'Haulage Express #12',
        driverName: 'Suleiman Danladi',
        driverPhone: '+234 809 111 4455',
        currentLocation: 'Assigned to route',
        currentTempCelsius: 11.8,
        targetTempRange: '10°C - 13°C',
        tempStatus: 'OPTIMAL_GREEN',
        fuelLevel: '88%',
        etaMinutes: 180
      },
      inspectionData: {
        inspectorName: 'AgriBridge Field QA Agent',
        certNumber: `QA-DIR-${Date.now().toString().slice(-4)}`,
        defectsFoundPct: 0.5,
        moistureLossPct: 0.0,
        passedGrading: true
      }
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update listing available quantity
    setListings(prev => prev.map(l => {
      if (l.id === listing.id) {
        const remaining = Math.max(0, l.availableQuantity - qty);
        return {
          ...l,
          availableQuantity: remaining,
          status: remaining === 0 ? 'SOLD_OUT' : 'ACTIVE'
        };
      }
      return l;
    }));

    showToast(`Order ${newOrder.id} successfully placed! $${totalAmount.toLocaleString()} held in secure Escrow.`);
    addNotification(`Direct purchase confirmed: Order ${newOrder.id} for ${qty} ${listing.unit} ${listing.crop}.`);
    setSelectedOrder(newOrder);
    setActiveTab('orders');
  };

  // Advance Order Milestone (e.g., Driver moves to transit, Retailer approves inspection & releases escrow)
  const advanceOrderMilestone = (orderId) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const nextIndex = Math.min(order.milestones.length - 1, order.currentMilestoneIndex + 1);
      const updatedMilestones = order.milestones.map((m, idx) => {
        if (idx <= nextIndex) {
          return { ...m, completed: true, date: idx === nextIndex ? 'Just now' : m.date };
        }
        return m;
      });

      let newStatus = order.status;
      let newEscrowStatus = order.escrowStatus;

      if (nextIndex === 1) newStatus = 'HARVEST_AGGREGATED';
      else if (nextIndex === 2) newStatus = 'QUALITY_CHECKED';
      else if (nextIndex === 3) newStatus = 'IN_TRANSIT';
      else if (nextIndex === 4) newStatus = 'DELIVERED';
      else if (nextIndex === 5) {
        newStatus = 'COMPLETED_PAID';
        newEscrowStatus = 'RELEASED_TO_FARMER';
      }

      const updated = {
        ...order,
        currentMilestoneIndex: nextIndex,
        milestones: updatedMilestones,
        status: newStatus,
        escrowStatus: newEscrowStatus
      };

      if (nextIndex === 5) {
        showToast(`Escrow released! $${order.totalAmount.toLocaleString()} successfully paid out.`);
        addNotification(`Order ${order.id} verified! Escrow payout completed to farmer & partners.`);
      } else {
        showToast(`Order ${order.id} milestone updated: ${updatedMilestones[nextIndex].step}`);
        addNotification(`Order ${order.id} progressed to: ${updatedMilestones[nextIndex].step}`);
      }

      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updated);
      }

      return updated;
    }));
  };

  // Messaging actions
  const sendMessage = (conversationId, text) => {
    if (!text.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: `${currentUser.name} (${currentUser.role})`,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));
  };

  const startOrOpenChat = (participantIds, title = 'Direct Trade Negotiation', orderRef = null) => {
    // Check if chat exists
    const allIds = Array.from(new Set([currentUser.id, ...participantIds]));
    const existing = conversations.find(c => 
      c.participants.length === allIds.length &&
      allIds.every(id => c.participants.includes(id))
    );

    if (existing) {
      setActiveChatId(existing.id);
      setActiveTab('messages');
      return existing.id;
    }

    const newConv = {
      id: `conv-${Date.now().toString().slice(-4)}`,
      title: title,
      participants: allIds,
      orderRef: orderRef,
      unreadCount: 0,
      messages: [
        {
          id: `m-init-${Date.now()}`,
          senderId: currentUser.id,
          senderName: `${currentUser.name} (${currentUser.role})`,
          text: `Negotiation channel opened regarding ${title}.`,
          timestamp: new Date().toISOString(),
          type: 'text'
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveChatId(newConv.id);
    setActiveTab('messages');
    return newConv.id;
  };

  // Switch role and preselect user
  const switchUser = (userId) => {
    setCurrentUserId(userId);
    const u = users.find(x => x.id === userId);
    showToast(`Switched persona to ${u.name} (${u.role.toUpperCase()})`);
  };

  return (
    <AppContext.Provider
      value={{
        users,
        currentUser,
        currentUserId,
        switchUser,
        listings,
        addListing,
        aggregatedLots,
        createAggregatedLot,
        rfqs,
        postRFQ,
        submitRFQBid,
        acceptRFQBid,
        orders,
        selectedOrder,
        setSelectedOrder,
        purchaseListingDirect,
        advanceOrderMilestone,
        conversations,
        activeChatId,
        setActiveChatId,
        sendMessage,
        startOrOpenChat,
        ticker,
        activeTab,
        setActiveTab,
        selectedListing,
        setSelectedListing,
        notifications,
        toastMessage,
        showToast,
        marketInsights: MARKET_INSIGHTS
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

