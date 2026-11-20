import React, { useState } from 'react';
import { 
  Building, 
  CheckCircle2, 
  Clock, 
  Search
} from 'lucide-react';

export default function AdminPayouts() {
  const [filter, setFilter] = useState('pending'); // 'pending' | 'settled' | 'all'
  const [search, setSearch] = useState('');

  const [payouts, setPayouts] = useState([
    {
      id: 'po-901',
      astroName: 'Acharya Rudranand',
      method: 'Bank Transfer (NEFT)',
      accountHolder: 'Rudranand Shastri',
      accountNumber: '50100428921820',
      bankName: 'HDFC Bank Ltd',
      ifsc: 'HDFC0000240',
      upiId: null,
      amount: 24850,
      requestedAt: '15m ago',
      status: 'Pending',
      referenceNo: null,
    },
    {
      id: 'po-902',
      astroName: 'Mehak Sharma',
      method: 'Instant UPI',
      accountHolder: 'Mehak Sharma',
      accountNumber: null,
      bankName: null,
      ifsc: null,
      upiId: 'mehak.sharma@okaxis',
      amount: 14200,
      requestedAt: '45m ago',
      status: 'Pending',
      referenceNo: null,
    },
    {
      id: 'po-903',
      astroName: 'Pandit Janardhan',
      method: 'Bank Transfer (IMPS)',
      accountHolder: 'Janardhan Pandey',
      accountNumber: '309811245678',
      bankName: 'State Bank of India',
      ifsc: 'SBIN0001420',
      upiId: null,
      amount: 18500,
      requestedAt: 'Yesterday',
      status: 'Settled',
      referenceNo: 'IMPS5901248921',
    },
  ]);

  const handleApprove = (id) => {
    const utr = `NEFT${Math.floor(100000000 + Math.random() * 900000000)}`;
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'Settled', referenceNo: utr } : p));
  };

  const handleReject = (id) => {
    const reason = prompt('Rejection reason:');
    if (!reason) return;
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'Rejected', referenceNo: reason } : p));
  };

  const filteredPayouts = payouts.filter(p => {
    const matchesFilter = filter === 'all' ? true : p.status.toLowerCase() === filter;
    const matchesSearch = p.astroName.toLowerCase().includes(search.toLowerCase()) ||
                          (p.bankName && p.bankName.toLowerCase().includes(search.toLowerCase())) ||
                          (p.upiId && p.upiId.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Search Input */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0 12px' }}>
        <Search size={15} color="#94A3B8" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search payout requests..."
          style={{
            width: '100%',
            padding: '10px 8px',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '13px',
            color: '#0F172A',
          }}
        />
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {[
          { id: 'pending', label: `Pending (${payouts.filter(p => p.status === 'Pending').length})` },
          { id: 'settled', label: 'Settled' },
          { id: 'all', label: `All (${payouts.length})` },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: filter === t.id ? '1px solid #C85A32' : '1px solid #E2E8F0',
              backgroundColor: filter === t.id ? '#FFF7ED' : '#FFFFFF',
              color: filter === t.id ? '#C85A32' : '#64748B',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Payout Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredPayouts.map(p => {
          const isPending = p.status === 'Pending';
          const isSettled = p.status === 'Settled';

          return (
            <div
              key={p.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '12px 14px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{p.astroName}</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{p.method} • {p.requestedAt}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>
                    ₹{p.amount.toLocaleString('en-IN')}
                  </div>
                  <span
                    style={{
                      padding: '1px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '600',
                      backgroundColor: isPending ? '#FEF3C7' : isSettled ? '#F0FDF4' : '#FEF2F2',
                      color: isPending ? '#92400E' : isSettled ? '#15803D' : '#B91C1C',
                    }}
                  >
                    {p.status}
                  </span>
                </div>
              </div>

              {/* Account details box */}
              <div style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', padding: '8px 10px', fontSize: '11px', color: '#475569' }}>
                {p.accountNumber ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
                    <span>A/C: <strong style={{ color: '#0F172A' }}>{p.accountNumber}</strong></span>
                    <span>IFSC: <strong style={{ color: '#0F172A' }}>{p.ifsc}</strong></span>
                    <span>Bank: <strong style={{ color: '#0F172A' }}>{p.bankName}</strong></span>
                  </div>
                ) : (
                  <span>UPI VPA: <strong style={{ color: '#0F172A' }}>{p.upiId}</strong></span>
                )}
                {p.referenceNo && (
                  <div style={{ marginTop: '4px', color: '#15803D', fontSize: '10px' }}>
                    Ref: {p.referenceNo}
                  </div>
                )}
              </div>

              {/* Actions */}
              {isPending && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => handleReject(p.id)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#FFFFFF',
                      color: '#64748B',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Decline
                  </button>

                  <button
                    onClick={() => handleApprove(p.id)}
                    style={{
                      padding: '5px 14px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#16A34A',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Approve
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
