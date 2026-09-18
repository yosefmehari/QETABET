'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  SlidersHorizontal,
  Droplets,
  Zap,
  Car,
  Wifi,
  Building,
  RotateCcw,
  Check,
} from 'lucide-react';
import { ListingType } from '@prisma/client';
import { useLanguage } from '@/lib/i18n';

export interface FilterState {
  query: string;
  subCityId: string;
  neighborhoodId: string;
  listingType: string;
  minRent: string;
  maxRent: string;
  bedrooms: string;
  hasWaterReserve: boolean;
  hasGenerator: boolean;
  hasParking: boolean;
  hasWifi: boolean;
  hasElevator: boolean;
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

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  subCities: SubCityWithNeighborhoods[];
  totalResults: number;
}

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  subCities,
  totalResults,
}: FilterDrawerProps) {
  const { t, translateLocation, translateListingType, language } = useLanguage();
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const activeSubCity = subCities.find((sc) => sc.id === localFilters.subCityId);
  const neighborhoods = activeSubCity?.locations || [];

  const handleSubCityChange = (subCityId: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      subCityId,
      neighborhoodId: '', // Reset neighborhood when subcity changes
    }));
  };

  const handleReset = () => {
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
    setLocalFilters(resetState);
    onFilterChange(resetState);
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const activeFilterCount = [
    localFilters.subCityId,
    localFilters.neighborhoodId,
    localFilters.listingType,
    localFilters.minRent,
    localFilters.maxRent,
    localFilters.bedrooms,
    localFilters.hasWaterReserve,
    localFilters.hasGenerator,
    localFilters.hasParking,
    localFilters.hasWifi,
    localFilters.hasElevator,
  ].filter(Boolean).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-emerald-100 p-2 text-emerald-800">
                <SlidersHorizontal className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-900">{t.drawer.filterTitle}</h2>
                <p className="text-xs text-stone-500">
                  {t.hero.headingSub ? t.nav.brandSubtitle : ''}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
            {/* Addis Ababa Sub-City Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                {t.drawer.subCitySection}
              </label>
              <select
                value={localFilters.subCityId}
                onChange={(e) => handleSubCityChange(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="">{t.drawer.allSubCities}</option>
                {subCities.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {translateLocation(sc.name)} ({sc.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Neighborhood (Dynamic based on selected SubCity) */}
            {localFilters.subCityId && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  {t.drawer.neighborhoodSection}
                </label>
                <select
                  value={localFilters.neighborhoodId}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({ ...prev, neighborhoodId: e.target.value }))
                  }
                  className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="">
                    {t.drawer.allNeighborhoods} ({translateLocation(activeSubCity?.name)})
                  </option>
                  {neighborhoods.map((n) => (
                    <option key={n.id} value={n.id}>
                      {translateLocation(n.name)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Rent Range (ETB / month) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  {t.drawer.priceRangeSection}
                </label>
                {(localFilters.minRent || localFilters.maxRent) && (
                  <span className="text-xs font-semibold text-emerald-700">
                    {localFilters.minRent || '0'} - {localFilters.maxRent || 'Max'} {language === 'am' ? 'ብር' : 'ETB'}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    placeholder={t.drawer.minRentPlaceholder}
                    value={localFilters.minRent}
                    onChange={(e) =>
                      setLocalFilters((prev) => ({ ...prev, minRent: e.target.value }))
                    }
                    className="w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-stone-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder={t.drawer.maxRentPlaceholder}
                    value={localFilters.maxRent}
                    onChange={(e) =>
                      setLocalFilters((prev) => ({ ...prev, maxRent: e.target.value }))
                    }
                    className="w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-stone-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>
              {/* Quick price pills */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  { label: '< 20K', min: '', max: '20000' },
                  { label: '20K - 40K', min: '20000', max: '40000' },
                  { label: '40K - 70K', min: '40000', max: '70000' },
                  { label: '70K+', min: '70000', max: '' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        minRent: preset.min,
                        maxRent: preset.max,
                      }))
                    }
                    className="rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Listing Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                {t.drawer.propertyTypeSection}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: t.drawer.allPropertyTypes, value: '' },
                  { label: t.propertyTypes.ENTIRE_APARTMENT, value: 'ENTIRE_APARTMENT' },
                  { label: t.propertyTypes.STUDIO, value: 'STUDIO' },
                  { label: t.propertyTypes.PRIVATE_ROOM, value: 'PRIVATE_ROOM' },
                  { label: t.propertyTypes.SHARED_ROOM, value: 'SHARED_ROOM' },
                  { label: t.propertyTypes.COMMERCIAL, value: 'COMMERCIAL' },
                ].map((item) => {
                  const isSelected = localFilters.listingType === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() =>
                        setLocalFilters((prev) => ({ ...prev, listingType: item.value }))
                      }
                      className={`flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-medium transition ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bedrooms count */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                {t.drawer.bedroomsSection}
              </label>
              <div className="flex gap-2">
                {['', '1', '2', '3', '4'].map((bed) => {
                  const isSelected = localFilters.bedrooms === bed;
                  return (
                    <button
                      key={bed}
                      type="button"
                      onClick={() =>
                        setLocalFilters((prev) => ({ ...prev, bedrooms: bed }))
                      }
                      className={`flex-1 rounded-xl border py-2 text-xs font-semibold transition ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {bed === '' ? t.drawer.anyBedrooms : `${bed}+`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Addis Ababa Vital Amenities */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
              <div className="mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  {t.drawer.vitalAmenitiesSection}
                </span>
                <p className="text-[11px] text-emerald-800/80">
                  {t.details.vitalAuditSubtitle}
                </p>
              </div>

              <div className="space-y-3">
                {/* Water Tank */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={localFilters.hasWaterReserve}
                    onChange={(e) =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        hasWaterReserve: e.target.checked,
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-stone-900">
                      <Droplets className="h-3.5 w-3.5 text-sky-500" />
                      <span>{t.drawer.waterReserveLabel}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      {t.drawer.waterReserveSub}
                    </p>
                  </div>
                </label>

                {/* Generator */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={localFilters.hasGenerator}
                    onChange={(e) =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        hasGenerator: e.target.checked,
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-stone-900">
                      <Zap className="h-3.5 w-3.5 text-amber-500" />
                      <span>{t.drawer.generatorLabel}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      {t.drawer.generatorSub}
                    </p>
                  </div>
                </label>

                {/* Parking */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={localFilters.hasParking}
                    onChange={(e) =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        hasParking: e.target.checked,
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-stone-900">
                      <Car className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{t.drawer.parkingLabel}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      {t.drawer.parkingSub}
                    </p>
                  </div>
                </label>

                {/* WiFi */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={localFilters.hasWifi}
                    onChange={(e) =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        hasWifi: e.target.checked,
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-stone-900">
                      <Wifi className="h-3.5 w-3.5 text-purple-600" />
                      <span>{t.drawer.wifiLabel}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      {t.drawer.wifiSub}
                    </p>
                  </div>
                </label>

                {/* Elevator */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={localFilters.hasElevator}
                    onChange={(e) =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        hasElevator: e.target.checked,
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-stone-900">
                      <Building className="h-3.5 w-3.5 text-stone-600" />
                      <span>{t.drawer.elevatorLabel}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      {t.drawer.elevatorSub}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="border-t border-stone-200 bg-stone-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-700 shadow-sm hover:bg-stone-100 transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{t.drawer.clearAll}</span>
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
              >
                {t.drawer.applyFiltersBtn} {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
