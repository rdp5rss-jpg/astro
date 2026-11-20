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
  Download,
  X,
  AlertCircle
} from 'lucide-react';

export default function AstrologerEarnings({ astrologer }) {
  const [balance, setBalance] = useState(24850);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(null);

  // Bank Form State
  const [payoutMethod, setPayoutMethod] = useState('bank'); // 'bank' | 'upi'
  const [accountNumber, setAccountNumber] = useState('50100428921820');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('50100428921820');
  const [ifsc, setIfsc] = useState('HDFC0000240');
  const [bankName, setBankName] = useState('HDFC Bank Ltd');
  const [accountHolder, setAccountHolder] = useState(astrologer?.name || 'Acharya Rudranand Shastri');
  const [upiId, setUpiId] = useState('rudranand@okhdfcbank');
  const [withdrawAmount, setWithdrawAmount] = useState(24850);

  const [transactions, setTransactions] = useState([
    { id: 'tx-101', seeker: 'Mahi Sharma', type: 'Chat', mins: 15, gross: 525, net: 420, time: 'Today, 04:38 PM', status: 'Credited' },
    { id: 'tx-102', seeker: 'Ankit Tiwari', type: 'Call', mins: 22, gross: 770, net: 616, time: 'Today, 02:15 PM', status: 'Credited' },
    { id: 'tx-103', seeker: 'Priya Nambiar', type: 'Chat', mins: 10, gross: 350, net: 280, time: 'Today, 11:40 AM', status: 'Credited' },
    { id: 'tx-104', seeker: 'Karan Mehra', type: 'Call', mins: 30, gross: 1050, net: 840, time: 'Yesterday', status: 'Credited' },
    { id: 'tx-105', seeker: 'Simran Kaur', type: 'Kundli Dossier', mins: 0, gross: 800, net: 640, time: 'Yesterday', status: 'Credited' },
  ]);

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    if (withdrawAmount <= 0 || withdrawAmount > balance) {
      alert('Please enter a valid withdrawal amount within your available balance.');
      return;
    }
    if (payoutMethod === 'bank' && accountNumber !== confirmAccountNumber) {
      alert('Bank Account numbers do not match! Please check and confirm.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const transferred = Number(withdrawAmount);
      setBalance(prev => Math.max(0, prev - transferred));
      
      const newTx = {
        id: `wth-${Date.now()}`,
        seeker: payoutMethod === 'bank' ? `${bankName} (${accountNumber.slice(-4)})` : upiId,
        type: 'Bank Payout',
        mins: 0,
        gross: transferred,
        net: transferred,
        time: 'Just now',
        status: 'Processing NEFT',
      };
      setTransactions(prev => [newTx, ...prev]);

      setIsProcessing(false);
      setShowWithdrawModal(false);
      setPayoutSuccess({
        amount: transferred,
        destination: payoutMethod === 'bank' ? `${bankName} (A/C ending in ${accountNumber.slice(-4)})` : upiId,
        refNo: `NEFT${Math.floor(100000000 + Math.random() * 900000000)}`
      });
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Payout Success Alert */}
      {payoutSuccess && (
        <div
          style={{
            backgroundColor: '#DCFCE7',
            border: '2px solid #86EFAC',
            borderRadius: '20px',
            padding: '16px 18px',
            color: '#15803D',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            boxShadow: '0 4px 14px rgba(21, 128, 61, 0.1)',
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            <CheckCircle2 size={24} color="#15803D" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#166534' }}>
                ₹{payoutSuccess.amount.toLocaleString('en-IN')} Transfer Initiated!
              </h4>
              <p style={{ fontSize: '12px', color: '#15803D', marginTop: '2px' }}>
                Dispatched to {payoutSuccess.destination} via instant NEFT/IMPS.
              </p>
              <span style={{ fontSize: '11px', color: '#166534', fontWeight: '700', marginTop: '4px', display: 'inline-block' }}>
                Ref No: {payoutSuccess.refNo}
              </span>
            </div>
          </div>

          <button
            onClick={() => setPayoutSuccess(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#15803D' }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Solid Premium Balance Card */}
      <div
        style={{
          borderRadius: '26px',
          padding: '24px',
          background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
          color: '#FFFFFF',
          boxShadow: '0 12px 32px rgba(30, 27, 75, 0.3)',
          border: '1.5px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '0.8px', textTransform: 'uppercase', color: '#FCD34D' }}>
            Astrologer Earnings Vault
          </span>
          <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#6EE7B7', padding: '3px 10px', borderRadius: '999px', border: '1px solid rgba(16, 185, 129, 0.35)' }}>
            ● Verified KYC Active
          </span>
        </div>

        <div style={{ fontSize: '40px', fontWeight: '900', marginTop: '12px', lineHeight: 1, letterSpacing: '-0.5px' }}>
          ₹{balance.toLocaleString('en-IN')}
        </div>

        <p style={{ fontSize: '13px', color: '#CBD5E1', marginTop: '8px' }}>
          Available for instant withdrawal to your registered bank account
        </p>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={() => setShowWithdrawModal(true)}
            disabled={balance <= 0}
            style={{
              flex: 1,
              padding: '14px 20px',
              borderRadius: '16px',
              backgroundColor: '#C85A32',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: '900',
              cursor: balance > 0 ? 'pointer' : 'not-allowed',
              opacity: balance > 0 ? 1 : 0.6,
              boxShadow: '0 6px 18px rgba(217, 119, 6, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'transform 0.15s ease',
            }}
          >
            <ArrowUpRight size={18} />
            <span>Withdraw to Bank</span>
          </button>
        </div>
      </div>

      {/* Linked Bank & Account Strip */}
      <div
        style={{
          borderRadius: '22px',
          padding: '18px 20px',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={18} color="#C85A32" />
            <span>Linked Settlement Account</span>
          </h4>
          <button
            onClick={() => setShowWithdrawModal(true)}
            style={{
              fontSize: '11px',
              fontWeight: '800',
              color: '#C85A32',
              backgroundColor: '#FFF7ED',
              border: '1px solid #FDBA74',
              padding: '4px 10px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Update Details
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
          <div style={{ backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Account Holder</span>
            <strong>{accountHolder}</strong>
          </div>
          <div style={{ backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Account Number</span>
            <strong>•••• •••• {accountNumber.slice(-4)}</strong>
          </div>
          <div style={{ backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Bank Name</span>
            <strong>{bankName}</strong>
          </div>
          <div style={{ backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>IFSC Code</span>
            <strong>{ifsc}</strong>
          </div>
        </div>
      </div>

      {/* Consultation Earnings Ledger */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#1E1B4B' }}>
            Recent Consultation Credits
          </h4>
          <span style={{ fontSize: '11.5px', color: '#15803D', fontWeight: '800', backgroundColor: '#DCFCE7', padding: '3px 8px', borderRadius: '6px' }}>
            80% Astrologer Share
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              style={{
                borderRadius: '18px',
                padding: '14px 16px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '900', color: '#1E1B4B' }}>{tx.seeker}</span>
                  <span style={{ fontSize: '10px', fontWeight: '800', padding: '2px 6px', borderRadius: '6px', backgroundColor: tx.type === 'Bank Payout' ? '#FEF3C7' : '#F1F5F9', color: tx.type === 'Bank Payout' ? '#B45309' : '#475569' }}>
                    {tx.type} {tx.mins ? `(${tx.mins}m)` : ''}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>{tx.time}</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '15px', fontWeight: '900', color: tx.type === 'Bank Payout' ? '#DC2626' : '#15803D' }}>
                  {tx.type === 'Bank Payout' ? `-₹${tx.net}` : `+₹${tx.net}`}
                </div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: tx.type === 'Bank Payout' ? '#D97706' : '#10B981' }}>
                  ● {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WITHDRAWAL & BANK DETAILS MODAL */}
      {showWithdrawModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 120,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowWithdrawModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '28px',
              padding: '26px',
              maxWidth: '440px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
              border: '1.5px solid #E2E8F0',
              maxHeight: '92vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#1E1B4B' }}>
                  Withdraw to Bank Account
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  Verify your bank credentials for direct NEFT/IMPS payout
                </p>
              </div>

              <button
                onClick={() => setShowWithdrawModal(false)}
                style={{
                  padding: '6px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#F1F5F9',
                  cursor: 'pointer',
                  color: '#64748B',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Payout Method Toggle */}
            <div
              style={{
                display: 'flex',
                backgroundColor: '#F1F5F9',
                borderRadius: '14px',
                padding: '4px',
                marginBottom: '16px',
              }}
            >
              <button
                type="button"
                onClick={() => setPayoutMethod('bank')}
                style={{
                  flex: 1,
                  padding: '9px 0',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: payoutMethod === 'bank' ? '#FFFFFF' : 'transparent',
                  color: payoutMethod === 'bank' ? '#C85A32' : '#64748B',
                  fontWeight: '800',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  boxShadow: payoutMethod === 'bank' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                🏦 Direct Bank Transfer
              </button>

              <button
                type="button"
                onClick={() => setPayoutMethod('upi')}
                style={{
                  flex: 1,
                  padding: '9px 0',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: payoutMethod === 'upi' ? '#FFFFFF' : 'transparent',
                  color: payoutMethod === 'upi' ? '#C85A32' : '#64748B',
                  fontWeight: '800',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  boxShadow: payoutMethod === 'upi' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                ⚡ Instant UPI VPA
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Amount Input with "Max" button */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Withdrawal Amount (Available: ₹{balance.toLocaleString('en-IN')})
                </label>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1.5px solid #CBD5E1', padding: '0 12px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#C85A32' }}>₹</span>
                  <input
                    type="number"
                    required
                    min={100}
                    max={balance}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      padding: '11px 8px',
                      fontSize: '16px',
                      fontWeight: '800',
                      width: '100%',
                      color: '#1E1B4B',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setWithdrawAmount(balance)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#C85A32',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: '800',
                      border: 'none',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    All
                  </button>
                </div>
              </div>

              {payoutMethod === 'bank' ? (
                <>
                  {/* Account Holder Name */}
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Account Holder Name (As per Bank Passbook)
                    </label>
                    <input
                      type="text"
                      required
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      placeholder="Acharya Rudranand Shastri"
                      style={{
                        width: '100%',
                        padding: '11px 12px',
                        borderRadius: '12px',
                        border: '1.5px solid #CBD5E1',
                        backgroundColor: '#F8FAFC',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#1E1B4B',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Bank Account Number */}
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      required
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Enter 9-18 digit account number"
                      style={{
                        width: '100%',
                        padding: '11px 12px',
                        borderRadius: '12px',
                        border: '1.5px solid #CBD5E1',
                        backgroundColor: '#F8FAFC',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#1E1B4B',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Confirm Bank Account Number */}
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Confirm Bank Account Number
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmAccountNumber}
                      onChange={(e) => setConfirmAccountNumber(e.target.value)}
                      placeholder="Re-enter account number"
                      style={{
                        width: '100%',
                        padding: '11px 12px',
                        borderRadius: '12px',
                        border: '1.5px solid #CBD5E1',
                        backgroundColor: '#F8FAFC',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#1E1B4B',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* IFSC & Bank Name */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        required
                        value={ifsc}
                        onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                        placeholder="HDFC0000240"
                        style={{
                          width: '100%',
                          padding: '11px 12px',
                          borderRadius: '12px',
                          border: '1.5px solid #CBD5E1',
                          backgroundColor: '#F8FAFC',
                          fontSize: '13px',
                          fontWeight: '800',
                          color: '#1E1B4B',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                        Bank Name
                      </label>
                      <input
                        type="text"
                        required
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="HDFC Bank"
                        style={{
                          width: '100%',
                          padding: '11px 12px',
                          borderRadius: '12px',
                          border: '1.5px solid #CBD5E1',
                          backgroundColor: '#F8FAFC',
                          fontSize: '13px',
                          fontWeight: '700',
                          color: '#1E1B4B',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* Instant UPI Option */
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Registered UPI ID / VPA
                  </label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. rudranand@okhdfcbank"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #CBD5E1',
                      backgroundColor: '#F8FAFC',
                      fontSize: '14px',
                      fontWeight: '800',
                      color: '#1E1B4B',
                      outline: 'none',
                    }}
                  />
                  <span style={{ fontSize: '11px', color: '#64748B', marginTop: '4px', display: 'block' }}>
                    Instant disbursement directly to Google Pay / PhonePe / Paytm UPI.
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                style={{
                  marginTop: '10px',
                  padding: '14px',
                  borderRadius: '16px',
                  backgroundColor: '#C85A32',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: '900',
                  border: 'none',
                  cursor: isProcessing ? 'wait' : 'pointer',
                  boxShadow: '0 6px 18px rgba(217, 119, 6, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {isProcessing ? (
                  <span>Securing & Transferring...</span>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Authorize & Transfer ₹{withdrawAmount.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
