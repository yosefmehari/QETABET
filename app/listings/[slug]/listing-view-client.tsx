'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  ShieldCheck,
  Droplets,
  Zap,
  Car,
  Bed,
  Bath,
  ArrowLeft,
  Layers,
  Sparkles,
  Wifi,
  Building,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { ListingDetailsClient } from './listing-details-client';
import { ListingGallerySection } from '@/components/listing-gallery-section';
import { ListingType, FurnishingStatus } from '@prisma/client';

export interface ListingDetailData {
  id: string;
  title: string;
  slug: string;
  description: string;
  listingType: ListingType;
  monthlyRent: number | string | { toString(): string };
  depositMonths: number;
  isPriceNegotiable: boolean;
  bedrooms: number;
  bathrooms: number;
  floorLevel: number | null;
  hasWaterReserve: boolean;
  hasGenerator: boolean;
  hasParking: boolean;
  hasWifi: boolean;
  hasElevator: boolean;
  furnishing: FurnishingStatus;
  landmark: string | null;
  viewsCount: number;
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
    order: number;
  }>;
  user: {
    fullName: string | null;
    phoneNumber: string;
    isPhoneVerified: boolean;
  };
}

interface ListingViewClientProps {
  listing: ListingDetailData;
}

export function ListingViewClient({ listing }: ListingViewClientProps) {
  const { t, formatMoney, translateLocation, translateFurnishing } = useLanguage();

  return (
    <div className="min-h-screen bg-stone-50 pb-16">
      {/* Top Breadcrumb */}
      <div className="border-b border-stone-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t.details.backToListings}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {listing.viewsCount} {t.details.viewsCount}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t.details.verifiedHomeownerBadge}
            </span>
            <span className="rounded-full bg-stone-200 px-2.5 py-0.5 text-xs font-semibold text-stone-800">
              {translateLocation(listing.neighborhood.name)}, {translateLocation(listing.neighborhood.subCity.name)}
            </span>
          </div>

          <h1 className="text-2xl font-black text-stone-900 sm:text-3xl lg:text-4xl">
            {listing.title}
          </h1>

          {listing.landmark && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs sm:text-sm text-stone-600">
              <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{listing.landmark}</span>
            </p>
          )}
        </div>

        {/* Interactive Gallery with Lightbox Modal */}
        <ListingGallerySection title={listing.title} images={listing.images} />

        {/* Main Content & Side Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Details & Amenities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 rounded-2xl bg-white p-4 border border-stone-200 shadow-sm text-center">
              <div>
                <span className="text-xs text-stone-500">{t.drawer.bedroomsSection}</span>
                <p className="text-base font-bold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                  <Bed className="h-4 w-4 text-emerald-600" />
                  {listing.bedrooms}
                </p>
              </div>
              <div>
                <span className="text-xs text-stone-500">{t.newListing.bathroomsLabel}</span>
                <p className="text-base font-bold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                  <Bath className="h-4 w-4 text-emerald-600" />
                  {listing.bathrooms}
                </p>
              </div>
              <div>
                <span className="text-xs text-stone-500">{t.newListing.floorLevelLabel}</span>
                <p className="text-base font-bold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                  <Layers className="h-4 w-4 text-emerald-600" />
                  {listing.floorLevel !== null ? (listing.floorLevel === 0 ? t.card.groundFloor : `${t.card.floor} ${listing.floorLevel}`) : t.card.groundFloor}
                </p>
              </div>
              <div className="col-span-3 sm:col-span-1">
                <span className="text-xs text-stone-500">{t.newListing.furnishingLabel}</span>
                <p className="text-base font-bold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  {translateFurnishing(listing.furnishing)}
                </p>
              </div>
            </div>

            {/* Addis Ababa Vital Infrastructure Audit */}
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-stone-900 mb-1 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                {t.details.vitalAuditTitle}
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                {t.details.vitalAuditSubtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Water Tank */}
                <div
                  className={`rounded-xl border p-4 ${
                    listing.hasWaterReserve
                      ? 'border-sky-200 bg-sky-50/50'
                      : 'border-stone-200 bg-stone-50 text-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-stone-900">
                    <Droplets className={`h-5 w-5 ${listing.hasWaterReserve ? 'text-sky-600' : 'text-stone-400'}`} />
                    <span>{t.details.waterTankAuditTitle}</span>
                  </div>
                  <p className="mt-1 text-xs text-stone-600">
                    {listing.hasWaterReserve
                      ? t.details.waterTankAuditHas
                      : t.details.waterTankAuditNo}
                  </p>
                </div>

                {/* Generator */}
                <div
                  className={`rounded-xl border p-4 ${
                    listing.hasGenerator
                      ? 'border-amber-200 bg-amber-50/50'
                      : 'border-stone-200 bg-stone-50 text-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-stone-900">
                    <Zap className={`h-5 w-5 ${listing.hasGenerator ? 'text-amber-500 fill-amber-500' : 'text-stone-400'}`} />
                    <span>{t.details.generatorAuditTitle}</span>
                  </div>
                  <p className="mt-1 text-xs text-stone-600">
                    {listing.hasGenerator
                      ? t.details.generatorAuditHas
                      : t.details.generatorAuditNo}
                  </p>
                </div>

                {/* Compound Parking */}
                <div
                  className={`rounded-xl border p-4 ${
                    listing.hasParking
                      ? 'border-emerald-200 bg-emerald-50/50'
                      : 'border-stone-200 bg-stone-50 text-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-stone-900">
                    <Car className={`h-5 w-5 ${listing.hasParking ? 'text-emerald-600' : 'text-stone-400'}`} />
                    <span>{t.details.parkingAuditTitle}</span>
                  </div>
                  <p className="mt-1 text-xs text-stone-600">
                    {listing.hasParking
                      ? t.details.parkingAuditHas
                      : t.details.parkingAuditNo}
                  </p>
                </div>

                {/* Internet & Elevator */}
                <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-semibold text-stone-800">
                      <Wifi className="h-4 w-4 text-purple-600" />
                      {t.details.wifiAuditTitle}
                    </span>
                    <span className={listing.hasWifi ? 'text-emerald-700 font-bold' : 'text-stone-400'}>
                      {listing.hasWifi ? t.details.wifiAvailable : t.details.wifiNotIncluded}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-stone-200">
                    <span className="flex items-center gap-1.5 font-semibold text-stone-800">
                      <Building className="h-4 w-4 text-stone-600" />
                      {t.details.elevatorAuditTitle}
                    </span>
                    <span className={listing.hasElevator ? 'text-emerald-700 font-bold' : 'text-stone-400'}>
                      {listing.hasElevator ? t.details.elevatorFunctional : t.details.elevatorStairsOnly}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-stone-900 mb-3">
                {t.details.aboutPropertyTitle}
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Verified Landlord Card */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-800 font-bold text-lg flex items-center justify-center">
                  {listing.user.fullName ? listing.user.fullName.charAt(0) : 'L'}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-stone-900">
                      {listing.user.fullName || 'Landlord'}
                    </h4>
                    {listing.user.isPhoneVerified && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs text-stone-500">
                    {t.details.landlordCardTitle}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
                  {t.details.phoneVerifiedBadge}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Action Card (Client Component) */}
          <div className="lg:col-span-1">
            <ListingDetailsClient
              listingId={listing.id}
              listingTitle={listing.title}
              monthlyRent={Number(listing.monthlyRent)}
              depositMonths={listing.depositMonths}
              isPriceNegotiable={listing.isPriceNegotiable}
              landlordName={listing.user.fullName}
              landlordPhone={listing.user.phoneNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
