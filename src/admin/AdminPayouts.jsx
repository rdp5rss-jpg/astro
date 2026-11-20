import React, { useState } from 'react';
import { 
  Building, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  ArrowUpRight, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';

export default function AdminPayouts() {
  const [filter, setFilter] = useState('pending'); // 'pending' | 'settled' | 'all'
  const [search, setSearch] = useState('');

  const [payouts, setPayouts] = useState([
    {
      id: 'po-901',
      astroName: 'Acharya Rudranand Shastri',
      astroAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
      method: 'Bank Transfer (NEFT)',
      accountHolder: 'Rudranand Shastri',
      accountNumber: '50100428921820',
      bankName: 'HDFC Bank Ltd',
      ifsc: 'HDFC0000240',
      upiId: null,
      amount: 24850,
      requestedAt: '15 mins ago',
      status: 'Pending',
      referenceNo: null,
    },
    {
      id: 'po-902',
      astroName: 'Mehak Sharma',
      astroAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
      method: 'Instant UPI VPA',
      accountHolder: 'Mehak Sharma',
      accountNumber: null,
      bankName: null,
      ifsc: null,
      upiId: 'mehak.sharma@okaxis',
      amount: 14200,
      requestedAt: '45 mins ago',
      status: 'Pending',
      referenceNo: null,
    },
    {
      id: 'po-903',
      astroName: 'Pandit Janardhan',
      astroAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
      method: 'Bank Transfer (IMPS)',
      accountHolder: 'Janardhan Pandey',
      accountNumber: '309811245678',
      bankName: 'State Bank of India',
      ifsc: 'SBIN0001420',
      upiId: null,
      amount: 18500,
      requestedAt: 'Yesterday, 04:30 PM',
      status: 'Settled',
      referenceNo: 'IMPS5901248921',
    },
    {
      id: 'po-904',
      astroName: 'Dr. Preeti Ganguly',
      astroAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300',
      method: 'Instant UPI VPA',
      accountHolder: 'Preeti Ganguly',
      accountNumber: null,
      bankName: null,
      ifsc: null,
      upiId: 'drpreeti@icici',
      amount: 9800,
      requestedAt: '18 Nov 2026',
      status: 'Settled',
      referenceNo: 'UPI9012384912',
    },
  ]);

  const handleApprove = (id) => {
    const utr = `NEFT${Math.floor(100000000 + Math.random() * 900000000)}`;
    setPayouts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: 'Settled',
          referenceNo: utr,
        };
      }
      return p;
    }));
    alert(`🎉 Payout Approved!\nFunds dispatched successfully.\nUTR / Reference No: ${utr}`);
  };

  const handleReject = (id) => {
    const reason = prompt('Please specify rejection reason to refund funds back to Guru wallet:');
    if (!reason) return;
    setPayouts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: 'Rejected',
          referenceNo: `REJECTED: ${reason}`,
        };
      }
      return p;
    }));
    alert('❌ Payout rejected and funds refunded back to astrologer balance.');
  };

  const filteredPayouts = payouts.filter(p => {
    const matchesFilter = filter === 'all' ? true : p.status.toLowerCase() === filter;
    const matchesSearch = p.astroName.toLowerCase().includes(search.toLowerCase()) ||
                          (p.bankName && p.bankName.toLowerCase().includes(search.toLowerCase())) ||
                          (p.upiId && p.upiId.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const pendingTotal = payouts
    .filter(p => p.status === 'Pending')
    .reduce((acc, p) => acc + p.amount, 0);

  const settledTotal = payouts
    .filter(p => p.status === 'Settled')
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Payout Metric Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div
          style={{
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#D97706', textTransform: 'uppercase' }}>
              Pending Approvals
            </span>
            <Clock size={16} color="#D97706" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#B45309', marginTop: '6px' }}>
            ₹{pendingTotal.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '11px', color: '#64748B' }}>
            {payouts.filter(p => p.status === 'Pending').length} payout requests waiting
          </span>
        </div>

        <div
          style={{
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#166534', textTransform: 'uppercase' }}>
              Settled This Month
            </span>
            <CheckCircle2 size={16} color="#166534" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#15803D', marginTop: '6px' }}>
            ₹{settledTotal.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '11px', color: '#64748B' }}>
            100% On-time bank transfers
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '16px', padding: '0 14px' }}>
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by astrologer name, bank or UPI..."
            style={{
              width: '100%',
              padding: '12px 10px',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1E1B4B',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'pending', label: `Pending Requests (${payouts.filter(p => p.status === 'Pending').length})` },
            { id: 'settled', label: 'Settled Payouts' },
            { id: 'all', label: `All Records (${payouts.length})` },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '12px',
                border: filter === t.id ? '1.5px solid #C85A32' : '1.5px solid #E2E8F0',
                backgroundColor: filter === t.id ? '#FFF7ED' : '#FFFFFF',
                color: filter === t.id ? '#C85A32' : '#64748B',
                fontSize: '12px',
                fontWeight: '800',
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Payout Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredPayouts.map(p => {
          const isPending = p.status === 'Pending';
          const isSettled = p.status === 'Settled';

          return (
            <div
              key={p.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '16px',
                border: isPending ? '2px solid #FCD34D' : '1.5px solid #E2E8F0',
                boxShadow: isPending ? '0 4px 18px rgba(245, 158, 11, 0.12)' : '0 2px 8px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={p.astroAvatar}
                    alt={p.astroName}
                    style={{ width: '42px', height: '42px', borderRadius: '14px', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#1E1B4B' }}>{p.astroName}</h4>
                    <p style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
                      Requested: {p.requestedAt}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: '#1E1B4B' }}>
                    ₹{p.amount.toLocaleString('en-IN')}
                  </div>
                  <span
                    style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '10px',
                      fontWeight: '800',
                      backgroundColor: isPending ? '#FEF3C7' : isSettled ? '#DCFCE7' : '#FEE2E2',
                      color: isPending ? '#92400E' : isSettled ? '#15803D' : '#B91C1C',
                    }}
                  >
                    {p.status}
                  </span>
                </div>
              </div>

              {/* Account / UPI Credentials Box */}
              <div style={{ backgroundColor: '#F8FAFC', borderRadius: '14px', padding: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#475569' }}>
                    {p.method}
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: '#15803D' }}>
                    ● KYC Verified
                  </span>
                </div>

                {p.accountNumber ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
                    <div>
                      <span style={{ color: '#94A3B8' }}>A/C Holder:</span>
                      <p style={{ fontWeight: '800', color: '#1E1B4B' }}>{p.accountHolder}</p>
                    </div>
                    <div>
                      <span style={{ color: '#94A3B8' }}>Bank Name:</span>
                      <p style={{ fontWeight: '800', color: '#1E1B4B' }}>{p.bankName}</p>
                    </div>
                    <div>
                      <span style={{ color: '#94A3B8' }}>Account No:</span>
                      <p style={{ fontWeight: '800', color: '#1E1B4B', fontFamily: 'monospace' }}>{p.accountNumber}</p>
                    </div>
                    <div>
                      <span style={{ color: '#94A3B8' }}>IFSC Code:</span>
                      <p style={{ fontWeight: '800', color: '#1E1B4B', fontFamily: 'monospace' }}>{p.ifsc}</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '12px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '11px' }}>VPA Address: </span>
                    <span style={{ fontWeight: '900', color: '#1E1B4B', fontFamily: 'monospace' }}>{p.upiId}</span>
                  </div>
                )}

                {p.referenceNo && (
                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #E2E8F0', fontSize: '11px', color: '#15803D', fontWeight: '800' }}>
                    UTR Ref: {p.referenceNo}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {isPending && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={() => handleReject(p.id)}
                    style={{
                      padding: '10px',
                      borderRadius: '12px',
                      border: '1.5px solid #FCA5A5',
                      backgroundColor: '#FFFFFF',
                      color: '#B91C1C',
                      fontSize: '12px',
                      fontWeight: '800',
                      cursor: 'pointer',
                    }}
                  >
                    Decline Request
                  </button>

                  <button
                    onClick={() => handleApprove(p.id)}
                    style={{
                      padding: '10px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
                    }}
                  >
                    Approve & Disburse
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
