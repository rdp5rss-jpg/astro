import React, { useState } from 'react';
import { 
  CreditCard, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Coins, 
  ShieldCheck, 
  Building, 
  Send,
  Download
} from 'lucide-react';

export default function AstrologerEarnings({ astrologer }) {
  const [balance, setBalance] = useState(24850);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    accountNumber: '••••••••4892',
    ifsc: 'HDFC0000240',
    bankName: 'HDFC Bank Ltd',
    upiId: 'rudranand@okhdfcbank'
  });

  const transactions = [
    { id: 'tx-101', seeker: 'Mahi Sharma', type: 'Chat', mins: 15, gross: 525, net: 420, time: 'Today, 04:38 PM', status: 'Credited' },
    { id: 'tx-102', seeker: 'Ankit Tiwari', type: 'Call', mins: 22, gross: 770, net: 616, time: 'Today, 02:15 PM', status: 'Credited' },
    { id: 'tx-103', seeker: 'Priya Nambiar', type: 'Chat', mins: 10, gross: 350, net: 280, time: 'Today, 11:40 AM', status: 'Credited' },
    { id: 'tx-104', seeker: 'Karan Mehra', type: 'Call', mins: 30, gross: 1050, net: 840, time: 'Yesterday', status: 'Credited' },
    { id: 'tx-105', seeker: 'Simran Kaur', type: 'Kundli Dossier', mins: 0, gross: 800, net: 640, time: 'Yesterday', status: 'Credited' },
  ];

  const handleWithdraw = () => {
    if (balance <= 0) return;
    setIsWithdrawing(true);
    setTimeout(() => {
      alert(`✅ Payout Request of ₹${balance} initiated successfully to ${bankInfo.bankName} (${bankInfo.accountNumber}). Funds will arrive in 24 hours.`);
      setBalance(0);
      setIsWithdrawing(false);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Balance Card */}
      <div
        className="glass-card"
        style={{
          borderRadius: '24px',
          padding: '20px',
          background: 'linear-gradient(135deg, #4A1D96 0%, #3B1E54 100%)',
          color: '#FFFFFF',
          boxShadow: '0 8px 24px rgba(74, 29, 150, 0.25)',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#FCD34D' }}>
          Astrologer Settlement Vault
        </span>
        <div style={{ fontSize: '36px', fontWeight: '900', marginTop: '8px', lineHeight: 1 }}>
          ₹{balance.toLocaleString('en-IN')}
        </div>
        <p style={{ fontSize: '12px', color: '#E9D5FF', marginTop: '6px' }}>
          Available for instant settlement to registered bank account
        </p>

        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button
            onClick={handleWithdraw}
            disabled={isWithdrawing || balance === 0}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13px',
              fontWeight: '800',
              cursor: balance > 0 ? 'pointer' : 'not-allowed',
              opacity: balance > 0 ? 1 : 0.6,
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <ArrowUpRight size={16} />
            <span>{isWithdrawing ? 'Processing...' : 'Withdraw to Bank'}</span>
          </button>
        </div>
      </div>

      {/* Linked Bank & UPI Details */}
      <div
        className="glass-card"
        style={{
          borderRadius: '20px',
          padding: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1.5px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Building size={16} color="#C85A32" />
            <span>Registered Payout Method</span>
          </h4>
          <span style={{ fontSize: '10px', fontWeight: '800', color: '#15803D', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '6px' }}>
            Verified KYC
          </span>
        </div>

        <div style={{ fontSize: '12px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div><strong>Bank:</strong> {bankInfo.bankName} ({bankInfo.accountNumber})</div>
          <div><strong>IFSC:</strong> {bankInfo.ifsc}</div>
          <div><strong>UPI VPA:</strong> {bankInfo.upiId}</div>
        </div>
      </div>

      {/* Consultation Earnings Ledger */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1E1B4B' }}>
            Recent Consultation Credits
          </h4>
          <span style={{ fontSize: '11px', color: '#64748B' }}>80% Guru Share</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="glass-card"
              style={{
                borderRadius: '16px',
                padding: '12px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>{tx.seeker}</span>
                  <span style={{ fontSize: '9px', fontWeight: '800', padding: '1px 5px', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#475569' }}>
                    {tx.type} ({tx.mins}m)
                  </span>
                </div>
                <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>{tx.time}</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#15803D' }}>+₹{tx.net}</div>
                <div style={{ fontSize: '9px', color: '#94A3B8' }}>Gross: ₹{tx.gross}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
