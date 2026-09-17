'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  ShieldCheck,
  Droplets,
  Zap,
  Car,
  Bed,
  Bath,
  ArrowUpRight,
  Phone,
  Layers,
  Sparkles,
  Wifi,
  ChevronLeft,
  ChevronRight,
  Camera,
} from 'lucide-react';
import { formatETB } from '@/lib/utils';
import { ListingType, FurnishingStatus } from '@prisma/client';

export interface ListingCardProps {
  listing: {
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
    hasWifi?: boolean;
    hasElevator?: boolean;
    furnishing: FurnishingStatus;
    landmark: string | null;
    neighborhood: {
      name: string;
      subCity: {
        name: string;
        code: string;
      };
    };
    images: Array<{
      url: string;
      isCover: boolean;
    }>;
    user: {
      fullName: string | null;
      phoneNumber: string;
      isPhoneVerified: boolean;
      avatarUrl?: string | null;
    };
  };
}

export function ListingCard({ listing }: ListingCardProps) {
  const images = listing.images && listing.images.length > 0
    ? listing.images
    : [{ url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', isCover: true }];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImageUrl = images[activeImageIndex]?.url || images[0]?.url;

  const formatListingType = (type: ListingType) => {
    switch (type) {
      case 'ENTIRE_APARTMENT':
        return 'Entire Apartment';
      case 'STUDIO':
        return 'Studio';
      case 'PRIVATE_ROOM':
        return 'Private Room';
      case 'SHARED_ROOM':
        return 'Shared Room';
      case 'COMMERCIAL':
        return 'Commercial';
      default:
        return 'Apartment';
    }
  };

  const formatFurnishing = (furn: FurnishingStatus) => {
    switch (furn) {
      case 'FULLY_FURNISHED':
        return 'Furnished';
      case 'SEMI_FURNISHED':
        return 'Semi-Furnished';
      case 'UNFURNISHED':
        return 'Unfurnished';
      default:
        return null;
    }
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-950/5">
      {/* Image Carousel Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <Link href={`/listings/${listing.slug}`} className="block h-full w-full">
          <Image
            src={currentImageUrl}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

        {/* Carousel Prev/Next Controls (visible on hover / touch) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80 focus:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80 focus:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Photo Counter Badge */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
              <Camera className="h-3 w-3" />
              <span>
                {activeImageIndex + 1}/{images.length}
              </span>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-12 left-0 right-0 z-10 flex justify-center gap-1">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveImageIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {/* Verified Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/95 px-2.5 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Verified Landlord</span>
          </span>

          {/* Type Badge */}
          <span className="inline-flex items-center rounded-full bg-stone-900/80 px-2.5 py-1 text-xs font-medium text-stone-100 shadow-sm backdrop-blur-sm">
            {formatListingType(listing.listingType)}
          </span>
        </div>

        {/* Price Tag Overlay on Bottom of Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10 pointer-events-none">
          <div className="rounded-xl bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-md">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold tracking-tight text-stone-900">
                {formatETB(listing.monthlyRent)}
              </span>
              <span className="text-xs font-medium text-stone-500">/ mo</span>
            </div>
          </div>

          {listing.isPriceNegotiable && (
            <span className="rounded-lg bg-amber-500/95 px-2 py-1 text-[11px] font-semibold text-white shadow">
              Negotiable
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Neighborhood & Sub-City */}
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
          <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">
            {listing.neighborhood.name}, {listing.neighborhood.subCity.name}
          </span>
        </div>

        {/* Title */}
        <Link href={`/listings/${listing.slug}`} className="focus:outline-none">
          <h3 className="line-clamp-2 text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
            {listing.title}
          </h3>
        </Link>

        {/* Landmark description snippet */}
        {listing.landmark && (
          <p className="mt-1 line-clamp-1 text-xs text-stone-500">
            📍 {listing.landmark}
          </p>
        )}

        {/* Essential Addis Specs (Beds, Baths, Floor, Furnishing) */}
        <div className="mt-3 flex flex-wrap items-center gap-3 border-y border-stone-100 py-2.5 text-xs font-medium text-stone-600">
          <span className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5 text-stone-400" />
            {listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}
          </span>
          <span className="text-stone-300">•</span>
          <span className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5 text-stone-400" />
            {listing.bathrooms} {listing.bathrooms === 1 ? 'Bath' : 'Baths'}
          </span>
          {listing.floorLevel !== null && (
            <>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1">
                <Layers className="h-3.5 w-3.5 text-stone-400" />
                Floor {listing.floorLevel}
              </span>
            </>
          )}
          {formatFurnishing(listing.furnishing) && (
            <>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1 text-stone-700">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                {formatFurnishing(listing.furnishing)}
              </span>
            </>
          )}
        </div>

        {/* Addis Critical Amenity Badges (Water Tank, Generator, Parking) */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {listing.hasWaterReserve && (
            <span
              title="Continuous water supply via dedicated reserve tank"
              className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-1 text-[11px] font-medium text-sky-700 border border-sky-200/80"
            >
              <Droplets className="h-3 w-3 text-sky-500" />
              <span>Water Tank</span>
            </span>
          )}

          {listing.hasGenerator && (
            <span
              title="Backup generator during Addis power interruptions"
              className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-800 border border-amber-200/80"
            >
              <Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
              <span>Generator</span>
            </span>
          )}

          {listing.hasParking && (
            <span
              title="Secure compound parking spot"
              className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-800 border border-emerald-200/80"
            >
              <Car className="h-3 w-3 text-emerald-600" />
              <span>Parking</span>
            </span>
          )}

          {listing.hasWifi && (
            <span
              title="Fiber or high-speed broadband internet"
              className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-1 text-[11px] font-medium text-purple-700 border border-purple-200/80"
            >
              <Wifi className="h-3 w-3 text-purple-500" />
              <span>WiFi</span>
            </span>
          )}
        </div>

        {/* Direct Contact Footer / Zero Delala Fee */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-stone-100">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">
              {listing.user.fullName ? listing.user.fullName.charAt(0) : 'L'}
            </div>
            <div className="truncate text-xs">
              <p className="font-semibold text-stone-800 truncate">
                {listing.user.fullName || 'Landlord'}
              </p>
              <p className="text-[10px] text-emerald-600 font-medium">
                Direct Owner • 0% Broker Fee
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={`tel:${listing.user.phoneNumber}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
              title={`Call landlord: ${listing.user.phoneNumber}`}
            >
              <Phone className="h-3.5 w-3.5" />
            </a>
            <Link
              href={`/listings/${listing.slug}`}
              className="inline-flex h-8 items-center gap-1 rounded-lg bg-stone-900 px-2.5 text-xs font-medium text-white shadow transition hover:bg-emerald-600"
            >
              <span>View</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
