'use client';

import React, { useState, useTransition, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Droplets,
  Zap,
  Car,
  X,
  RotateCcw,
  Building2,
  Sparkles,
  Check,
} from 'lucide-react';
import { ListingCard } from '@/components/listing-card';
import { FilterDrawer, FilterState } from '@/components/filter-drawer';
import { getFilteredListings } from '@/actions/listings';
import { HeroBanner } from '@/components/hero-banner';
import { ListingType, FurnishingStatus } from '@prisma/client';

export interface ListingItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  listingType: ListingType;
  monthlyRent: number;
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
  neighborhood: {
    id: string;
    name: string;
    subCity: {
      id: string;
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
}

interface SubCityWithNeighborhoods {
  id: string;
  name: string;
  code: string;
  locations: Array<{
    id: string;
    name: string;
  }>;
}

interface ListingsExplorerProps {
  initialListings: ListingItem[];
  subCities: SubCityWithNeighborhoods[];
  totalInitial: number;
}

export function ListingsExplorer({
  initialListings,
  subCities,
  totalInitial,
}: ListingsExplorerProps) {
  const [listings, setListings] = useState<ListingItem[]>(initialListings);
  const [totalCount, setTotalCount] = useState<number>(totalInitial);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState<FilterState>({
    query: '',
    subCityId: '',
    neighborhoodId: '',
    listingType: '',
    minRent: '',
    maxRent: '',
    bedrooms: '',
    hasWaterReserve: false,
    hasGenerator: false,
    hasParking: false,
    hasWifi: false,
    hasElevator: false,
  });

  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');

  // Trigger query via server action
  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    startTransition(async () => {
      const res = await getFilteredListings({
        query: newFilters.query,
        subCityId: newFilters.subCityId || undefined,
        neighborhoodId: newFilters.neighborhoodId || undefined,
        listingType: (newFilters.listingType as ListingType) || undefined,
        minRent: newFilters.minRent ? Number(newFilters.minRent) : undefined,
        maxRent: newFilters.maxRent ? Number(newFilters.maxRent) : undefined,
        bedrooms: newFilters.bedrooms ? Number(newFilters.bedrooms) : undefined,
        hasWaterReserve: newFilters.hasWaterReserve || undefined,
        hasGenerator: newFilters.hasGenerator || undefined,
        hasParking: newFilters.hasParking || undefined,
        hasWifi: newFilters.hasWifi || undefined,
        hasElevator: newFilters.hasElevator || undefined,
      });

      setListings(res.items as unknown as ListingItem[]);
      setTotalCount(res.pagination.total);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(filters);
  };

  const handleSubCitySelect = (subCityId: string) => {
    const updated = {
      ...filters,
      subCityId: filters.subCityId === subCityId ? '' : subCityId,
      neighborhoodId: '',
    };
    applyFilters(updated);
  };

  const handleToggleAmenity = (key: 'hasWaterReserve' | 'hasGenerator' | 'hasParking') => {
    const updated = {
      ...filters,
      [key]: !filters[key],
    };
    applyFilters(updated);
  };

  const handleResetFilters = () => {
    const resetState: FilterState = {
      query: '',
      subCityId: '',
      neighborhoodId: '',
      listingType: '',
      minRent: '',
      maxRent: '',
      bedrooms: '',
      hasWaterReserve: false,
      hasGenerator: false,
      hasParking: false,
      hasWifi: false,
      hasElevator: false,
    };
    applyFilters(resetState);
  };

  // Sort locally
  const sortedListings = useMemo(() => {
    const copy = [...listings];
    if (sortBy === 'price_asc') {
      copy.sort((a, b) => Number(a.monthlyRent) - Number(b.monthlyRent));
    } else if (sortBy === 'price_desc') {
      copy.sort((a, b) => Number(b.monthlyRent) - Number(a.monthlyRent));
    }
    return copy;
  }, [listings, sortBy]);

  const activeFilterCount = [
    filters.subCityId,
    filters.neighborhoodId,
    filters.listingType,
    filters.minRent,
    filters.maxRent,
    filters.bedrooms,
    filters.hasWaterReserve,
    filters.hasGenerator,
    filters.hasParking,
    filters.hasWifi,
    filters.hasElevator,
  ].filter(Boolean).length;

  const activeSubCity = subCities.find((s) => s.id === filters.subCityId);
  const activeNeighborhood = activeSubCity?.locations.find((n) => n.id === filters.neighborhoodId);

  return (
    <div className="relative">
      {/* Addis Ababa Problem Solver Hero Banner */}
      <HeroBanner
        onQuickFilter={(key, value) => {
          const updated = { ...filters, [key]: value };
          applyFilters(updated);
        }}
        activeWaterFilter={filters.hasWaterReserve}
        activeGeneratorFilter={filters.hasGenerator}
      />

      {/* Sticky Mobile Search & Quick Filter Bar */}
      <div className="sticky top-[67px] z-30 border-b border-stone-200/80 bg-white/90 px-4 py-3 backdrop-blur-xl shadow-xs sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Main search row */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-700" />
              <input
                type="text"
                placeholder="Search CMC, Bole, Kazanchis, light rail, 2BR..."
                value={filters.query}
                onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
                className="w-full rounded-2xl border border-stone-200 bg-stone-50/80 pl-11 pr-10 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 shadow-inner transition-all"
              />
              {filters.query && (
                <button
                  type="button"
                  onClick={() => {
                    const updated = { ...filters, query: '' };
                    applyFilters(updated);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Filter Drawer Trigger Button */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className={`relative inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-bold transition-all shadow-xs ${
                activeFilterCount > 0
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-600/20'
                  : 'border-stone-300/80 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-400'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-extrabold text-white shadow-xs">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </form>

          {/* Quick Sub-City & Infrastructure Filter Pills */}
          <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
            {/* All */}
            <button
              type="button"
              onClick={() => handleSubCitySelect('')}
              className={`rounded-full px-3 py-1 font-semibold whitespace-nowrap transition ${
                !filters.subCityId
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Addis
            </button>

            {/* Sub-Cities */}
            {subCities.map((sc) => {
              const isSelected = filters.subCityId === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleSubCitySelect(sc.id)}
                  className={`rounded-full px-3 py-1 font-semibold whitespace-nowrap transition ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {sc.name}
                </button>
              );
            })}

            <div className="h-4 w-px bg-stone-300 mx-1 shrink-0" />

            {/* Quick Addis Infrastructure Badges */}
            <button
              type="button"
              onClick={() => handleToggleAmenity('hasWaterReserve')}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold whitespace-nowrap transition ${
                filters.hasWaterReserve
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-sky-50 text-sky-800 border border-sky-200/60 hover:bg-sky-100'
              }`}
            >
              <Droplets className="h-3 w-3" />
              <span>Water Tank</span>
            </button>

            <button
              type="button"
              onClick={() => handleToggleAmenity('hasGenerator')}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold whitespace-nowrap transition ${
                filters.hasGenerator
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-900 border border-amber-200/60 hover:bg-amber-100'
              }`}
            >
              <Zap className="h-3 w-3" />
              <span>Generator</span>
            </button>

            <button
              type="button"
              onClick={() => handleToggleAmenity('hasParking')}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold whitespace-nowrap transition ${
                filters.hasParking
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60 hover:bg-emerald-100'
              }`}
            >
              <Car className="h-3 w-3" />
              <span>Parking</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Results Bar (Counts, active filters, sort) */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-stone-900">
                Verified Addis Homes
              </h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                {totalCount} {totalCount === 1 ? 'Listing' : 'Listings'}
              </span>
              {isPending && (
                <span className="text-xs text-stone-400 italic">Updating...</span>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Direct homeowner contact with zero broker commissions
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-stone-300 bg-white px-2.5 py-1.5 font-medium text-stone-800 shadow-sm focus:border-emerald-600 focus:outline-none"
            >
              <option value="newest">Newest Listed</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-stone-500">Active Filters:</span>

            {activeSubCity && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-800">
                Sub-City: {activeSubCity.name}
                <button
                  type="button"
                  onClick={() => handleSubCitySelect('')}
                  className="hover:text-rose-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {activeNeighborhood && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-800">
                Neighborhood: {activeNeighborhood.name}
                <button
                  type="button"
                  onClick={() => applyFilters({ ...filters, neighborhoodId: '' })}
                  className="hover:text-rose-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {(filters.minRent || filters.maxRent) && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-800">
                Rent: {filters.minRent || '0'} - {filters.maxRent || 'Max'} ETB
                <button
                  type="button"
                  onClick={() => applyFilters({ ...filters, minRent: '', maxRent: '' })}
                  className="hover:text-rose-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {filters.bedrooms && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-800">
                {filters.bedrooms}+ Bedrooms
                <button
                  type="button"
                  onClick={() => applyFilters({ ...filters, bedrooms: '' })}
                  className="hover:text-rose-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {filters.hasWaterReserve && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-900">
                <Droplets className="h-3 w-3 text-sky-600" />
                Water Tank
                <button
                  type="button"
                  onClick={() => handleToggleAmenity('hasWaterReserve')}
                  className="hover:text-rose-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {filters.hasGenerator && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">
                <Zap className="h-3 w-3 text-amber-600" />
                Generator
                <button
                  type="button"
                  onClick={() => handleToggleAmenity('hasGenerator')}
                  className="hover:text-rose-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {filters.hasParking && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-900">
                <Car className="h-3 w-3 text-emerald-600" />
                Parking
                <button
                  type="button"
                  onClick={() => handleToggleAmenity('hasParking')}
                  className="hover:text-rose-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 ml-2"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        {sortedListings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="my-12 rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 text-stone-400">
              <Building2 className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-stone-900">
              No Verified Listings Found
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-xs text-stone-500">
              We couldn't find any listings matching your current criteria. Try loosening your rent range or clearing the infrastructure filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filters={filters}
        onFilterChange={applyFilters}
        subCities={subCities}
        totalResults={totalCount}
      />
    </div>
  );
}
