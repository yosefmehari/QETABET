'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  Users,
  MessageSquare,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Camera,
  Eye,
  ExternalLink,
  Plus,
  Lock,
  Unlock,
  Droplets,
  Zap,
  Car,
  Key,
} from 'lucide-react';
import {
  updateListingVerification,
  updateListingStatus,
  deleteListingAdmin,
} from '@/actions/admin';
import { formatETB } from '@/lib/utils';
import { AdminPhotoModal } from '@/components/admin-photo-modal';
import { VerificationStatus, ListingStatus } from '@prisma/client';

export interface AdminListing {
  id: string;
  title: string;
  slug: string;
  listingType: string;
  status: ListingStatus;
  verificationStatus: VerificationStatus;
  monthlyRent: number;
  bedrooms: number;
  bathrooms: number;
  hasWaterReserve: boolean;
  hasGenerator: boolean;
  hasParking: boolean;
  landmark: string | null;
  createdAt: Date;
  neighborhood: {
    name: string;
    subCity: {
      name: string;
      code: string;
    };
  };
  images: Array<{
    id: string;
    url: string;
    isCover: boolean;
  }>;
  user: {
    id: string;
    fullName: string | null;
    phoneNumber: string;
    isPhoneVerified: boolean;
  };
}

export interface AdminInquiry {
  id: string;
  message: string;
  phoneNumber: string;
  createdAt: Date;
  listing: { id: string; title: string; slug: string };
  sender: { fullName: string | null; phoneNumber: string };
}

export interface AdminPayment {
  id: string;
  txRef: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  createdAt: Date;
  listing: { title: string; slug: string } | null;
  user: { fullName: string | null; phoneNumber: string };
}

interface AdminDashboardClientProps {
  stats: {
    totalListings: number;
    verifiedListings: number;
    pendingListings: number;
    totalInquiries: number;
    totalPayments: number;
    totalLandlords: number;
    totalRevenueETB: number;
  };
  initialListings: AdminListing[];
  inquiries: AdminInquiry[];
  payments: AdminPayment[];
}

export function AdminDashboardClient({
  stats,
  initialListings,
  inquiries,
  payments,
}: AdminDashboardClientProps) {
  // Simple passcode gate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('qetabet_admin_auth') === 'true';
    }
    return false;
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'listings' | 'inquiries' | 'payments'>('listings');
  const [listings, setListings] = useState<AdminListing[]>(initialListings);
  const [isPending, startTransition] = useTransition();

  // Photo modal state
  const [photoModalListing, setPhotoModalListing] = useState<AdminListing | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('qetabet_admin_auth', 'true');
      }
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('qetabet_admin_auth');
    }
  };

  const handleVerificationChange = (listingId: string, status: VerificationStatus) => {
    startTransition(async () => {
      await updateListingVerification(listingId, status);
      setListings((prev) =>
        prev.map((l) => (l.id === listingId ? { ...l, verificationStatus: status } : l))
      );
    });
  };

  const handleStatusChange = (listingId: string, status: ListingStatus) => {
    startTransition(async () => {
      await updateListingStatus(listingId, status);
      setListings((prev) =>
        prev.map((l) => (l.id === listingId ? { ...l, status } : l))
      );
    });
  };

  const handleDeleteListing = (listingId: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      startTransition(async () => {
        await deleteListingAdmin(listingId);
        setListings((prev) => prev.filter((l) => l.id !== listingId));
      });
    }
  };

  // If not unlocked, display admin passkey screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-stone-200 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mb-4">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-black text-stone-900">QetaBet Admin Portal</h1>
          <p className="text-xs text-stone-500 mt-1 mb-6">
            Enter master passkey to access verified listings, inspections, and photo manager.
          </p>

          {authError && (
            <div className="mb-4 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-700">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="password"
                placeholder="Enter Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full rounded-xl border border-stone-300 pl-10 pr-4 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
            >
              Unlock Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                Staff Control Room
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs font-medium text-stone-500">Database: QETABET</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black text-stone-900">
              Addis Ababa Rental Command Center
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              Inspect properties, manage photos, approve water/generator verifications, and audit payments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/listings/new"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Listing</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition"
            >
              Lock Dashboard
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Total Listings</span>
            <p className="text-2xl font-black text-stone-900 mt-1">{stats.totalListings}</p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Verified</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">{stats.verifiedListings}</p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Pending Review</span>
            <p className="text-2xl font-black text-amber-700 mt-1">{stats.pendingListings}</p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Inquiries</span>
            <p className="text-2xl font-black text-stone-900 mt-1">{stats.totalInquiries}</p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Landlords</span>
            <p className="text-2xl font-black text-stone-900 mt-1">{stats.totalLandlords}</p>
          </div>

          <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-4 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">Escrow Deposits</span>
            <p className="text-lg font-black text-sky-700 mt-1.5">{formatETB(stats.totalRevenueETB)}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 mb-6 gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'listings'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            All Listings ({listings.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'inquiries'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Tenant Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'payments'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Telebirr & Chapa Payments ({payments.length})
          </button>
        </div>

        {/* Tab 1: Listings Management */}
        {activeTab === 'listings' && (
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-600">
                <thead className="bg-stone-50 text-[11px] font-bold uppercase tracking-wider text-stone-500 border-b border-stone-200">
                  <tr>
                    <th className="py-3.5 px-4">Property & Photos</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Rent (ETB)</th>
                    <th className="py-3.5 px-4">Infrastructure</th>
                    <th className="py-3.5 px-4">Landlord</th>
                    <th className="py-3.5 px-4">Verification</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {listings.map((l) => {
                    const coverUrl = l.images[0]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267';
                    return (
                      <tr key={l.id} className="hover:bg-stone-50/70 transition">
                        {/* Title & Photo Thumbnail */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-stone-100 shrink-0 border border-stone-200">
                              <Image src={coverUrl} alt={l.title} fill unoptimized className="object-cover" />
                              <span className="absolute bottom-0 right-0 bg-black/70 px-1 py-0.2 text-[9px] font-bold text-white rounded-tl">
                                {l.images.length} 📷
                              </span>
                            </div>
                            <div className="min-w-0 max-w-xs">
                              <Link
                                href={`/listings/${l.slug}`}
                                target="_blank"
                                className="font-bold text-stone-900 hover:text-emerald-700 transition line-clamp-1"
                              >
                                {l.title}
                              </Link>
                              <span className="text-[10px] text-stone-400">{l.listingType} • {l.bedrooms} Bed</span>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <p className="font-semibold text-stone-800">{l.neighborhood.name}</p>
                          <p className="text-[10px] text-stone-400">{l.neighborhood.subCity.name}</p>
                        </td>

                        {/* Rent */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-bold text-stone-900">{formatETB(l.monthlyRent)}</span>
                          <span className="text-[10px] text-stone-400 block">/ mo</span>
                        </td>

                        {/* Infrastructure */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            {l.hasWaterReserve && (
                              <span title="Water Reserve Rotto" className="rounded p-1 bg-sky-50 text-sky-600">
                                <Droplets className="h-3.5 w-3.5" />
                              </span>
                            )}
                            {l.hasGenerator && (
                              <span title="Generator Backup" className="rounded p-1 bg-amber-50 text-amber-600">
                                <Zap className="h-3.5 w-3.5" />
                              </span>
                            )}
                            {l.hasParking && (
                              <span title="Parking" className="rounded p-1 bg-emerald-50 text-emerald-600">
                                <Car className="h-3.5 w-3.5" />
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Landlord */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <p className="font-semibold text-stone-900">{l.user.fullName || 'Landlord'}</p>
                          <p className="text-[10px] text-stone-500">{l.user.phoneNumber}</p>
                        </td>

                        {/* Verification Status Selector */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={l.verificationStatus}
                            onChange={(e) => handleVerificationChange(l.id, e.target.value as VerificationStatus)}
                            className={`rounded-lg px-2.5 py-1 text-xs font-bold border focus:outline-none ${
                              l.verificationStatus === 'VERIFIED'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : l.verificationStatus === 'PENDING'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-rose-50 text-rose-800 border-rose-300'
                            }`}
                          >
                            <option value="VERIFIED">✓ VERIFIED</option>
                            <option value="PENDING">⏳ PENDING</option>
                            <option value="REJECTED">✕ REJECTED</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Photo Manager Button */}
                            <button
                              type="button"
                              onClick={() => setPhotoModalListing(l)}
                              className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                              title="Add or manage photos"
                            >
                              <Camera className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Photos ({l.images.length})</span>
                            </button>

                            {/* View in new tab */}
                            <Link
                              href={`/listings/${l.slug}`}
                              target="_blank"
                              className="rounded-lg border border-stone-200 p-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition"
                              title="View listing"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDeleteListing(l.id)}
                              className="rounded-lg border border-stone-200 p-1.5 text-stone-400 hover:bg-rose-50 hover:text-rose-600 transition"
                              title="Delete listing"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Tenant Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            {inquiries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-600">
                  <thead className="bg-stone-50 text-[11px] font-bold uppercase tracking-wider text-stone-500 border-b border-stone-200">
                    <tr>
                      <th className="py-3.5 px-4">Sender Phone</th>
                      <th className="py-3.5 px-4">Target Listing</th>
                      <th className="py-3.5 px-4">Message</th>
                      <th className="py-3.5 px-4">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-stone-50/70">
                        <td className="py-3.5 px-4 font-bold text-stone-900">{inq.phoneNumber}</td>
                        <td className="py-3.5 px-4 font-semibold text-emerald-800">
                          <Link href={`/listings/${inq.listing.slug}`} target="_blank">
                            {inq.listing.title}
                          </Link>
                        </td>
                        <td className="py-3.5 px-4 max-w-sm truncate">{inq.message}</td>
                        <td className="py-3.5 px-4 text-stone-400 whitespace-nowrap">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-stone-500">
                No inquiries submitted yet.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Telebirr & Chapa Payments */}
        {activeTab === 'payments' && (
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            {payments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-600">
                  <thead className="bg-stone-50 text-[11px] font-bold uppercase tracking-wider text-stone-500 border-b border-stone-200">
                    <tr>
                      <th className="py-3.5 px-4">Transaction Ref</th>
                      <th className="py-3.5 px-4">Provider</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">Property</th>
                      <th className="py-3.5 px-4">Payer Phone</th>
                      <th className="py-3.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50/70">
                        <td className="py-3.5 px-4 font-mono font-bold text-stone-900">{p.txRef}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`rounded px-2 py-0.5 font-bold ${
                              p.provider === 'TELEBIRR'
                                ? 'bg-sky-100 text-sky-800'
                                : 'bg-lime-100 text-lime-800'
                            }`}
                          >
                            {p.provider}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-700">{formatETB(p.amount)}</td>
                        <td className="py-3.5 px-4 font-semibold text-stone-800">
                          {p.listing ? p.listing.title : 'Direct Deposit'}
                        </td>
                        <td className="py-3.5 px-4">{p.user.phoneNumber}</td>
                        <td className="py-3.5 px-4">
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-stone-500">
                No payment transactions recorded yet.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Admin Photo Modal */}
      {photoModalListing && (
        <AdminPhotoModal
          isOpen={true}
          onClose={() => setPhotoModalListing(null)}
          listingId={photoModalListing.id}
          listingTitle={photoModalListing.title}
          initialImages={photoModalListing.images}
          onPhotosUpdated={() => {
            // Re-fetch or locally updated
          }}
        />
      )}
    </div>
  );
}
