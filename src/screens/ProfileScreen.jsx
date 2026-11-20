import React, { useState } from 'react';
import { 
  User, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Plus, 
  Users, 
  Globe, 
  Compass, 
  HeartHandshake,
  CheckCircle2,
  X
} from 'lucide-react';

export default function ProfileScreen({ 
  onClose, 
  walletBalance = 185, 
  onOpenWallet, 
  onSignOut,
  seekerName = 'Mahi Sharma',
  onSwitchPortal
}) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'family' | 'settings'

  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: 'Mahi Sharma', relation: 'Self', rashi: 'Mithuna (Gemini)', nakshatra: 'Punarvasu', dob: '14 Apr 1994', pob: 'New Delhi' },
    { id: 2, name: 'Rohit Sharma', relation: 'Spouse', rashi: 'Tula (Libra)', nakshatra: 'Swati', dob: '22 Aug 1992', pob: 'Mumbai' },
    { id: 3, name: 'Sunita Sharma', relation: 'Mother', rashi: 'Karka (Cancer)', nakshatra: 'Pushya', dob: '05 Nov 1968', pob: 'Jaipur' },
  ]);

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', relation: 'Family', dob: '', pob: '' });

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name) return;
    setFamilyMembers(prev => [
      ...prev,
      {
        id: Date.now(),
        name: newMember.name,
        relation: newMember.relation,
        rashi: 'Calculated from Kundli',
        nakshatra: 'Calculated',
        dob: newMember.dob || 'Not set',
        pob: newMember.pob || 'India'
      }
    ]);
    setIsAddingMember(false);
    setNewMember({ name: '', relation: 'Family', dob: '', pob: '' });
  };

  return (
    <div style={{ color: '#1E1B4B', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '16px',
        borderBottom: '1px solid #F1F5F9',
        marginBottom: '18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #E06D3F 0%, #C85A32 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: '900',
            fontSize: '15px'
          }}>
            {seekerName.charAt(0)}
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '900', color: '#1E1B4B', lineHeight: 1.2 }}>
              Seeker Profile
            </h2>
            <p style={{ fontSize: '11px', color: '#64748B' }}>
              Vedic Kundli & Astral Account
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            padding: '7px',
            borderRadius: '50%',
            backgroundColor: '#F1F5F9',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Close Profile"
        >
          <X size={16} />
        </button>
      </div>

      {/* Main Profile Summary Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.7) 0%, rgba(255, 237, 213, 0.5) 100%)',
        border: '1.5px solid rgba(245, 158, 11, 0.25)',
        borderRadius: '20px',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: '0 4px 16px rgba(217, 119, 6, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#1E1B4B' }}>
                {seekerName}
              </h3>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                padding: '2px 8px',
                borderRadius: '12px',
                backgroundColor: '#DCFCE7',
                border: '1px solid #86EFAC',
                color: '#15803D',
                fontSize: '10px',
                fontWeight: '800'
              }}>
                <ShieldCheck size={11} /> Verified Kundli
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#475569', marginTop: '3px' }}>
              📱 +91 98765 43210 • <span style={{ color: '#D97706', fontWeight: '700' }}>Mithuna (Gemini)</span>
            </p>
          </div>

          {/* Quick Balance Pill */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1.5px solid #FCD34D',
            borderRadius: '16px',
            padding: '8px 12px',
            textAlign: 'right',
            boxShadow: '0 2px 8px rgba(217, 119, 6, 0.1)'
          }}>
            <span style={{ display: 'block', fontSize: '10px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>
              Balance
            </span>
            <div style={{ fontSize: '16px', fontWeight: '900', color: '#92400E' }}>
              ₹{walletBalance}
            </div>
            <button
              onClick={() => {
                onClose();
                if (onOpenWallet) onOpenWallet();
              }}
              style={{
                marginTop: '4px',
                padding: '3px 8px',
                borderRadius: '8px',
                backgroundColor: '#FEF3C7',
                border: '1px solid #F59E0B',
                color: '#B45309',
                fontSize: '10px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              + Recharge
            </button>
          </div>
        </div>

        {/* Natal Coordinates Strip */}
        <div style={{
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: '1px solid rgba(245, 158, 11, 0.2)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          fontSize: '11px',
          color: '#1E1B4B'
        }}>
          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '10px' }}>Born</span>
            <strong>14 Apr 1994</strong>
          </div>
          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '10px' }}>Nakshatra</span>
            <strong>Punarvasu</strong>
          </div>
          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '10px' }}>Lagna</span>
            <strong>Simha (Leo)</strong>
          </div>
        </div>
      </div>

      {/* Profile Sections Navigation */}
      <div style={{
        display: 'flex',
        borderRadius: '14px',
        backgroundColor: '#F1F5F9',
        padding: '4px',
        marginBottom: '16px',
        gap: '4px'
      }}>
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '800',
            backgroundColor: activeTab === 'profile' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'profile' ? '#1E1B4B' : '#64748B',
            boxShadow: activeTab === 'profile' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
            cursor: 'pointer'
          }}
        >
          My Kundli Info
        </button>
        <button
          onClick={() => setActiveTab('family')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '800',
            backgroundColor: activeTab === 'family' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'family' ? '#1E1B4B' : '#64748B',
            boxShadow: activeTab === 'family' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
            cursor: 'pointer'
          }}
        >
          Family Kundlis ({familyMembers.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '800',
            backgroundColor: activeTab === 'settings' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'settings' ? '#1E1B4B' : '#64748B',
            boxShadow: activeTab === 'settings' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
            cursor: 'pointer'
          }}
        >
          Preferences
        </button>
      </div>

      {/* TAB 1: Profile & Kundli Details */}
      {activeTab === 'profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{
            padding: '14px',
            borderRadius: '16px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                <Calendar size={18} />
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Date & Time of Birth</span>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>14 April 1994, 06:45 AM</h4>
              </div>
            </div>
            <button
              onClick={() => alert('✏️ Edit birth coordinates: Opening sacred Janam Kundli editor...')}
              style={{ fontSize: '11px', fontWeight: '800', color: '#6C4AB6', backgroundColor: '#F3E8FF', padding: '4px 10px', borderRadius: '8px', cursor: 'pointer' }}
            >
              Edit
            </button>
          </div>

          <div style={{
            padding: '14px',
            borderRadius: '16px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '12px', backgroundColor: '#FEF2F2', color: '#DC2626' }}>
                <MapPin size={18} />
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Place of Birth</span>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>New Delhi, India (28.61° N, 77.20° E)</h4>
              </div>
            </div>
            <button
              onClick={() => alert('✏️ Change birthplace: Opening city geolocator...')}
              style={{ fontSize: '11px', fontWeight: '800', color: '#6C4AB6', backgroundColor: '#F3E8FF', padding: '4px 10px', borderRadius: '8px', cursor: 'pointer' }}
            >
              Change
            </button>
          </div>

          <div style={{
            padding: '14px',
            borderRadius: '16px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '12px', backgroundColor: '#F0FDF4', color: '#16A34A' }}>
                <Sparkles size={18} />
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Primary Vedic Remedy</span>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>Emerald (Panna) for Budh • Gayatri Mantra</h4>
              </div>
            </div>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#16A34A', backgroundColor: '#DCFCE7', padding: '3px 8px', borderRadius: '6px' }}>
              Active
            </span>
          </div>

          {/* Quick Shortcuts */}
          <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => {
                onClose();
                if (onOpenWallet) onOpenWallet();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '14px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CreditCard size={16} color="#D97706" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#1E1B4B' }}>Wallet Balance & Top-up Packs</span>
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </button>

            <button
              onClick={() => alert('📜 Consultation History: All past calls & chats are safely encrypted in your cosmic vault.')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '14px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={16} color="#6C4AB6" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#1E1B4B' }}>Past Consultations & Life Reports</span>
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </button>

            {onSwitchPortal && (
              <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  BHAVISHYAA Ecosystem
                </span>

                <button
                  onClick={() => {
                    onClose();
                    onSwitchPortal('astrologer');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    backgroundColor: '#FEF3C7',
                    border: '1px solid #FCD34D',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>🔮</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#78350F' }}>Astrologer Guru Console</div>
                      <div style={{ fontSize: '10.5px', color: '#92400E' }}>Live consultations, queue & earnings</div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="#B45309" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onSwitchPortal('admin');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    backgroundColor: '#EEF2FF',
                    border: '1px solid #C7D2FE',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>⚡</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>Platform Admin Console</div>
                      <div style={{ fontSize: '10.5px', color: '#4338CA' }}>Seekers, Gurus, commissions & offer manager</div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="#4338CA" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Family Kundli Profiles */}
      {activeTab === 'family' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              Select or add family members for instant charts:
            </p>
            <button
              onClick={() => setIsAddingMember(!isAddingMember)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '10px',
                backgroundColor: '#FEF3C7',
                border: '1px solid #F59E0B',
                color: '#B45309',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              <Plus size={13} /> {isAddingMember ? 'Cancel' : 'Add Member'}
            </button>
          </div>

          {isAddingMember && (
            <form onSubmit={handleAddMember} style={{
              padding: '14px',
              borderRadius: '16px',
              backgroundColor: '#FFFBEB',
              border: '1.5px solid #FCD34D',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#92400E' }}>Add Family Kundli</h4>
              <input
                type="text"
                placeholder="Full Name"
                value={newMember.name}
                onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                required
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '12px',
                  backgroundColor: '#FFFFFF'
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Relation (e.g. Child, Spouse)"
                  value={newMember.relation}
                  onChange={e => setNewMember({ ...newMember, relation: e.target.value })}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    backgroundColor: '#FFFFFF'
                  }}
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={newMember.dob}
                  onChange={e => setNewMember({ ...newMember, dob: e.target.value })}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    backgroundColor: '#FFFFFF'
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '9px',
                  borderRadius: '10px',
                  backgroundColor: '#D97706',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: '800',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Save Family Kundli
              </button>
            </form>
          )}

          {familyMembers.map((member) => (
            <div
              key={member.id}
              style={{
                padding: '12px 14px',
                borderRadius: '14px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FCD34D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#B45309',
                  fontWeight: '800',
                  fontSize: '13px'
                }}>
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>{member.name}</h4>
                  <p style={{ fontSize: '11px', color: '#64748B' }}>
                    {member.rashi} • Born: {member.dob}
                  </p>
                </div>
              </div>

              <span style={{
                fontSize: '10px',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '8px',
                backgroundColor: member.relation === 'Self' ? '#DCFCE7' : '#F1F5F9',
                color: member.relation === 'Self' ? '#15803D' : '#64748B'
              }}>
                {member.relation}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Preferences & Settings */}
      {activeTab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{
            padding: '14px',
            borderRadius: '14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>Chart Representation</h4>
              <p style={{ fontSize: '11px', color: '#64748B' }}>Choose traditional Kundli format</p>
            </div>
            <select
              defaultValue="North"
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                fontWeight: '700',
                color: '#1E1B4B'
              }}
            >
              <option value="North">North Indian (Diamond)</option>
              <option value="South">South Indian (Box)</option>
              <option value="East">East Indian (Sun)</option>
            </select>
          </div>

          <div style={{
            padding: '14px',
            borderRadius: '14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>Ayanamsa System</h4>
              <p style={{ fontSize: '11px', color: '#64748B' }}>Vedic planetary precession</p>
            </div>
            <select
              defaultValue="Lahiri"
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                fontWeight: '700',
                color: '#1E1B4B'
              }}
            >
              <option value="Lahiri">Lahiri (Chitrapaksha) - Standard</option>
              <option value="Raman">B.V. Raman</option>
              <option value="KP">Krishnamurti Padhdhati (KP)</option>
            </select>
          </div>

          <div style={{
            padding: '14px',
            borderRadius: '14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>App Language</h4>
              <p style={{ fontSize: '11px', color: '#64748B' }}>Readings and astrologer voice</p>
            </div>
            <select
              defaultValue="English"
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                fontWeight: '700',
                color: '#1E1B4B'
              }}
            >
              <option value="English">English</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Sanskrit">संस्कृतम् (Sanskrit)</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
              <option value="Telugu">తెలుగు (Telugu)</option>
            </select>
          </div>
        </div>
      )}

      {/* Support and Sign Out footer */}
      <div style={{
        marginTop: '18px',
        paddingTop: '14px',
        borderTop: '1px solid #F1F5F9',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <button
          onClick={() => alert('💬 BHAVISHYAA 24x7 Vedic Concierge: Connecting on WhatsApp...')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '11px',
            borderRadius: '14px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            color: '#475569',
            fontSize: '12px',
            fontWeight: '800',
            cursor: 'pointer'
          }}
        >
          <HelpCircle size={15} /> 24x7 Vedic Concierge & WhatsApp Support
        </button>

        <button
          onClick={() => {
            onClose();
            if (onSignOut) onSignOut();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '11px',
            borderRadius: '14px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            fontSize: '12px',
            fontWeight: '800',
            cursor: 'pointer'
          }}
        >
          <LogOut size={15} /> Sign Out of BHAVISHYAA
        </button>
      </div>
    </div>
  );
}
