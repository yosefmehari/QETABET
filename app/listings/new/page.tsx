'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Building2,
  Camera,
  Plus,
  Trash2,
  Droplets,
  Zap,
  Car,
  Wifi,
  Building,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { getSubCitiesWithNeighborhoods, createListing } from '@/actions/listings';
import { ListingType, FurnishingStatus } from '@prisma/client';

interface SubCityItem {
  id: string;
  name: string;
  code: string;
  locations: Array<{ id: string; name: string }>;
}

const PRESET_ADDIS_PHOTOS = [
  { label: 'Living Room', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267' },
  { label: 'Master Bedroom', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688' },
  { label: 'Modern Kitchen', url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1' },
  { label: 'Bathroom', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a' },
  { label: 'Exterior & Compound', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6' },
  { label: 'Executive Interior', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
];

export default function NewListingPage() {
  const router = useRouter();
  const [subCities, setSubCities] = useState<SubCityItem[]>([]);
  const [loadingSubCities, setLoadingSubCities] = useState(true);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subCityId, setSubCityId] = useState('');
  const [neighborhoodId, setNeighborhoodId] = useState('');
  const [landmark, setLandmark] = useState('');
  const [listingType, setListingType] = useState<ListingType>('ENTIRE_APARTMENT');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [depositMonths, setDepositMonths] = useState(1);
  const [isPriceNegotiable, setIsPriceNegotiable] = useState(false);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [floorLevel, setFloorLevel] = useState<number | ''>(2);
  const [furnishing, setFurnishing] = useState<FurnishingStatus>('UNFURNISHED');

  // Addis specific infrastructure
  const [hasWaterReserve, setHasWaterReserve] = useState(true);
  const [hasGenerator, setHasGenerator] = useState(false);
  const [hasParking, setHasParking] = useState(true);
  const [hasWifi, setHasWifi] = useState(false);
  const [hasElevator, setHasElevator] = useState(false);

  // Photos
  const [imageUrls, setImageUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
  ]);
  const [customPhotoInput, setCustomPhotoInput] = useState('');

  // Landlord details
  const [landlordName, setLandlordName] = useState('');
  const [landlordPhone, setLandlordPhone] = useState('+251 9');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getSubCitiesWithNeighborhoods()
      .then((data) => {
        setSubCities(data);
        if (data.length > 0) {
          setSubCityId(data[0].id);
          if (data[0].locations.length > 0) {
            setNeighborhoodId(data[0].locations[0].id);
          }
        }
      })
      .finally(() => setLoadingSubCities(false));
  }, []);

  const activeSubCity = subCities.find((s) => s.id === subCityId);
  const neighborhoods = activeSubCity?.locations || [];

  const handleSubCityChange = (id: string) => {
    setSubCityId(id);
    const found = subCities.find((s) => s.id === id);
    if (found && found.locations.length > 0) {
      setNeighborhoodId(found.locations[0].id);
    } else {
      setNeighborhoodId('');
    }
  };

  const handleAddCustomPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPhotoInput.trim()) {
      setImageUrls((prev) => [...prev, customPhotoInput.trim()]);
      setCustomPhotoInput('');
    }
  };

  const handleAddPresetPhoto = (url: string) => {
    if (!imageUrls.includes(url)) {
      setImageUrls((prev) => [...prev, url]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setImageUrls((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !monthlyRent || !neighborhoodId || !landlordPhone.trim()) {
      setError('Please fill in all required fields (title, price, neighborhood, phone).');
      return;
    }

    if (imageUrls.length === 0) {
      setError('Please add at least 1 photo for your listing.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const res = await createListing({
        title: title.trim(),
        description: description.trim() || `${title.trim()} located in ${activeSubCity?.name || 'Addis Ababa'}.`,
        listingType,
        monthlyRent: Number(monthlyRent),
        depositMonths: Number(depositMonths),
        isPriceNegotiable,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        floorLevel: floorLevel === '' ? undefined : Number(floorLevel),
        hasWaterReserve,
        hasGenerator,
        hasParking,
        hasWifi,
        hasElevator,
        furnishing,
        neighborhoodId,
        landmark: landmark.trim() || undefined,
        landlordPhone: landlordPhone.trim(),
        landlordName: landlordName.trim() || 'Verified Homeowner',
        imageUrls,
      });

      if (res.success && res.slug) {
        router.push(`/listings/${res.slug}`);
      }
    } catch {
      setError('Failed to create listing. Please check your database connection.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-700 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all Addis rentals</span>
        </Link>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-xl">
          {/* Header */}
          <div className="border-b border-stone-100 pb-6 mb-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                Direct Landlord Onboarding • 0% Delala
              </span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-stone-900">
              List Your Addis Ababa Property
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500">
              Connect directly with verified renters. Add photos, water tank specs, and backup generator details.
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-rose-50 p-4 text-xs font-medium text-rose-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Info */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                1. Property Information
              </h2>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Listing Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern 2BR Apartment in CMC near Light Rail"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Sub-City (ክፍለ ከተማ) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={subCityId}
                    onChange={(e) => handleSubCityChange(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-900 focus:border-emerald-600 focus:outline-none"
                  >
                    {subCities.map((sc) => (
                      <option key={sc.id} value={sc.id}>
                        {sc.name} ({sc.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Neighborhood / Sefer (ሰፈር) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={neighborhoodId}
                    onChange={(e) => setNeighborhoodId(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-900 focus:border-emerald-600 focus:outline-none"
                  >
                    {neighborhoods.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Specific Landmark in Addis
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100m behind Bole Medhanialem Cathedral, near Light Rail"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Property Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your compound, sunlight, kitchen features, security, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Section 2: Pricing & Terms */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                2. Price & Terms (ETB)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Monthly Rent (ETB) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 35000"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Deposit (Months)
                  </label>
                  <select
                    value={depositMonths}
                    onChange={(e) => setDepositMonths(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-900 focus:border-emerald-600 focus:outline-none"
                  >
                    <option value={1}>1 Month Deposit</option>
                    <option value={2}>2 Months Deposit</option>
                    <option value={3}>3 Months Deposit</option>
                    <option value={6}>6 Months Deposit</option>
                  </select>
                </div>

                <div className="flex items-center sm:pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-stone-700">
                    <input
                      type="checkbox"
                      checked={isPriceNegotiable}
                      onChange={(e) => setIsPriceNegotiable(e.target.checked)}
                      className="h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Price is Negotiable</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 3: Room Specifications */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                3. Rooms & Furnishing
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Property Type
                  </label>
                  <select
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value as ListingType)}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-900 focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="ENTIRE_APARTMENT">Apartment</option>
                    <option value="STUDIO">Studio</option>
                    <option value="PRIVATE_ROOM">Private Room</option>
                    <option value="SHARED_ROOM">Shared Room</option>
                    <option value="COMMERCIAL">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Furnishing
                  </label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value as FurnishingStatus)}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-900 focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="UNFURNISHED">Unfurnished</option>
                    <option value="SEMI_FURNISHED">Semi-Furnished</option>
                    <option value="FULLY_FURNISHED">Fully Furnished</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Addis Ababa Vital Infrastructure */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                  4. Addis Living Infrastructure Checklist
                </h2>
                <p className="text-xs text-stone-500">
                  These verified amenities attract 4x more serious tenants in Addis Ababa
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-start gap-3 rounded-xl border border-stone-200 p-3 hover:bg-stone-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasWaterReserve}
                    onChange={(e) => setHasWaterReserve(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                      <Droplets className="h-3.5 w-3.5 text-sky-500" />
                      <span>Dedicated Water Tank (Rotto)</span>
                    </div>
                    <p className="text-[11px] text-stone-500">Continuous supply during city rationing</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-xl border border-stone-200 p-3 hover:bg-stone-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasGenerator}
                    onChange={(e) => setHasGenerator(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                      <Zap className="h-3.5 w-3.5 text-amber-500" />
                      <span>Standby Backup Generator</span>
                    </div>
                    <p className="text-[11px] text-stone-500">Power during electric outages</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-xl border border-stone-200 p-3 hover:bg-stone-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasParking}
                    onChange={(e) => setHasParking(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                      <Car className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Gated Compound Parking</span>
                    </div>
                    <p className="text-[11px] text-stone-500">Dedicated parking spot with security guard</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-xl border border-stone-200 p-3 hover:bg-stone-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasWifi}
                    onChange={(e) => setHasWifi(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                      <Wifi className="h-3.5 w-3.5 text-purple-600" />
                      <span>High-Speed WiFi</span>
                    </div>
                    <p className="text-[11px] text-stone-500">Fiber broadband connected</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Section 5: Photos */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                    5. Property Photos ({imageUrls.length})
                  </h2>
                  <span className="text-xs text-stone-500">The first photo is your cover image</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Click preset high-resolution photos or paste your own image URLs.
                </p>
              </div>

              {/* Photo Thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                    <Image src={url} alt={`Listing photo ${idx + 1}`} fill className="object-cover" />
                    {idx === 0 && (
                      <span className="absolute top-1.5 left-1.5 rounded-md bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow">
                        Cover Photo
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1.5 right-1.5 rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100 transition hover:bg-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick preset buttons */}
              <div>
                <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-2">
                  Add Addis Ababa Sample Photos:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_ADDIS_PHOTOS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleAddPresetPhoto(preset.url)}
                      className="rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                    >
                      + {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom URL Input */}
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste custom image URL (https://...)"
                  value={customPhotoInput}
                  onChange={(e) => setCustomPhotoInput(e.target.value)}
                  className="flex-1 rounded-xl border border-stone-300 px-3.5 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCustomPhoto}
                  className="inline-flex items-center gap-1 rounded-xl bg-stone-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-600 transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add URL</span>
                </button>
              </div>
            </div>

            {/* Section 6: Landlord Contact */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                6. Landlord Direct Contact
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Almaz Bekele"
                    value={landlordName}
                    onChange={(e) => setLandlordName(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Phone Number for Tenant Calls & SMS <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+251 91 123 4567"
                    value={landlordPhone}
                    onChange={(e) => setLandlordPhone(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-4">
              <Link
                href="/"
                className="rounded-xl border border-stone-300 px-5 py-3 text-xs font-bold text-stone-700 hover:bg-stone-100 transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 text-xs font-extrabold text-white shadow-lg hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Publishing Verified Listing...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    <span>Publish Verified Listing (0% Delala)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
