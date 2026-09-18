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
import { useLanguage } from '@/lib/i18n';

interface SubCityItem {
  id: string;
  name: string;
  code: string;
  locations: Array<{ id: string; name: string }>;
}

const PRESET_ADDIS_PHOTOS = [
  { labelEn: 'Living Room', labelAm: 'ሳሎን', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267' },
  { labelEn: 'Master Bedroom', labelAm: 'ዋና መኝታ ቤት', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688' },
  { labelEn: 'Modern Kitchen', labelAm: 'ዘመናዊ ማብሰያ ቤት', url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1' },
  { labelEn: 'Bathroom', labelAm: 'መታጠቢያ ቤት', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a' },
  { labelEn: 'Exterior & Compound', labelAm: 'የውጭ ግቢ እና ገጽታ', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6' },
  { labelEn: 'Executive Interior', labelAm: 'የውስጥ ማስዋቢያ', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
];

export default function NewListingPage() {
  const router = useRouter();
  const { t, language, translateLocation, translateListingType, translateFurnishing } = useLanguage();
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

  const handleAddCustomPhoto = (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    let raw = customPhotoInput.trim();
    if (!raw) return;

    // Auto prefix https:// if missing
    if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
      raw = 'https://' + raw;
    }

    try {
      new URL(raw);
      setImageUrls((prev) => [...prev, raw]);
      setCustomPhotoInput('');
      setError('');
    } catch {
      setError(
        language === 'am'
          ? 'እባክዎ ትክክለኛ የምስል ማስፈንጠሪያ (URL) ያስገቡ (ለምሳሌ https://images.unsplash.com/...)'
          : 'Please enter a valid image URL (e.g. https://images.unsplash.com/...)'
      );
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
      setError(
        language === 'am'
          ? 'እባክዎ ሁሉንም አስፈላጊ መረጃዎች (ርዕስ፣ ዋጋ፣ ሰፈር፣ ስልክ) ይሙሉ'
          : 'Please fill in all required fields (title, price, neighborhood, phone).'
      );
      return;
    }

    if (imageUrls.length === 0) {
      setError(
        language === 'am'
          ? 'እባክዎ ለቤትዎ ቢያንስ 1 ፎቶ ያስገቡ'
          : 'Please add at least 1 photo for your listing.'
      );
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
      setError(
        language === 'am'
          ? 'ቤቱን ማስመዝገብ አልተቻለም። እባክዎ እንደገና ይሞክሩ።'
          : 'Failed to create listing. Please check your database connection.'
      );
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
          <span>{t.newListing.backToRentals}</span>
        </Link>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-xl">
          {/* Header */}
          <div className="border-b border-stone-100 pb-6 mb-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                {t.newListing.badge} • 0% Delala
              </span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-stone-900">
              {t.newListing.pageTitle}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500">
              {t.newListing.pageSubtitle}
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
                {t.newListing.step1Title}
              </h2>
              <p className="text-xs text-stone-500">{t.newListing.step1Subtitle}</p>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.newListing.listingTitleLabel} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.newListing.listingTitlePlaceholder}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
                <p className="mt-1 text-[11px] text-stone-400">{t.newListing.listingTitleHint}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.newListing.subCityLabel} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={subCityId}
                    onChange={(e) => handleSubCityChange(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-900 focus:border-emerald-600 focus:outline-none"
                  >
                    {subCities.map((sc) => (
                      <option key={sc.id} value={sc.id}>
                        {translateLocation(sc.name)} ({sc.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.newListing.neighborhoodLabel} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={neighborhoodId}
                    onChange={(e) => setNeighborhoodId(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-900 focus:border-emerald-600 focus:outline-none"
                  >
                    {neighborhoods.map((n) => (
                      <option key={n.id} value={n.id}>
                        {translateLocation(n.name)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.newListing.landmarkLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.newListing.landmarkPlaceholder}
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.newListing.descriptionLabel}
                </label>
                <textarea
                  rows={3}
                  placeholder={t.newListing.descriptionPlaceholder}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Section 2: Pricing & Terms */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                {t.newListing.step3Title}
              </h2>
              <p className="text-xs text-stone-500">{t.newListing.step3Subtitle}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.newListing.monthlyRentLabel} <span className="text-rose-500">*</span>
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
                    {t.newListing.depositLabel}
                  </label>
                  <select
                    value={depositMonths}
                    onChange={(e) => setDepositMonths(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-900 focus:border-emerald-600 focus:outline-none"
                  >
                    {[1, 2, 3, 6].map((m) => (
                      <option key={m} value={m}>
                        {m} {language === 'am' ? 'ወር ማስያዣ' : m === 1 ? 'Month Deposit' : 'Months Deposit'}
                      </option>
                    ))}
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
                    <span>{t.newListing.negotiableCheckbox}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 3: Room Specifications */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                {language === 'am' ? '3. ክፍሎች እና እቃዎች' : '3. Rooms & Furnishing'}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.newListing.propertyTypeLabel}
                  </label>
                  <select
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value as ListingType)}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-900 focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="ENTIRE_APARTMENT">{translateListingType('ENTIRE_APARTMENT')}</option>
                    <option value="STUDIO">{translateListingType('STUDIO')}</option>
                    <option value="PRIVATE_ROOM">{translateListingType('PRIVATE_ROOM')}</option>
                    <option value="SHARED_ROOM">{translateListingType('SHARED_ROOM')}</option>
                    <option value="COMMERCIAL">{translateListingType('COMMERCIAL')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.newListing.bedroomsLabel}
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
                    {t.newListing.bathroomsLabel}
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
                    {t.newListing.furnishingLabel}
                  </label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value as FurnishingStatus)}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-900 focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="UNFURNISHED">{translateFurnishing('UNFURNISHED')}</option>
                    <option value="SEMI_FURNISHED">{translateFurnishing('SEMI_FURNISHED')}</option>
                    <option value="FULLY_FURNISHED">{translateFurnishing('FULLY_FURNISHED')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Addis Ababa Vital Infrastructure */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                  {t.newListing.step4Title}
                </h2>
                <p className="text-xs text-stone-500">
                  {t.newListing.step4Subtitle}
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
                      <span>{t.newListing.waterReserveTitle}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">{t.newListing.waterReserveDesc}</p>
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
                      <span>{t.newListing.generatorTitle}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">{t.newListing.generatorDesc}</p>
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
                      <span>{t.newListing.parkingTitle}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">{t.newListing.parkingDesc}</p>
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
                      <span>{t.newListing.wifiTitle}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">{t.newListing.wifiDesc}</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Section 5: Photos */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                    {t.newListing.step5Title} ({imageUrls.length})
                  </h2>
                  <span className="text-xs text-stone-500">
                    {language === 'am' ? 'የመጀመሪያው ፎቶ ዋናው የሽፋን ፎቶ ነው' : 'The first photo is your cover image'}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  {t.newListing.step5Subtitle}
                </p>
              </div>

              {/* Photo Thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                    <Image src={url} alt={`Listing photo ${idx + 1}`} fill unoptimized className="object-cover" />
                    {idx === 0 && (
                      <span className="absolute top-1.5 left-1.5 rounded-md bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow">
                        {language === 'am' ? 'ዋና ፎቶ' : 'Cover Photo'}
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
                  {t.newListing.clickPresetToAdd}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_ADDIS_PHOTOS.map((preset) => (
                    <button
                      key={preset.labelEn}
                      type="button"
                      onClick={() => handleAddPresetPhoto(preset.url)}
                      className="rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                    >
                      + {language === 'am' ? preset.labelAm : preset.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom URL Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t.newListing.customUrlLabel}
                  value={customPhotoInput}
                  onChange={(e) => setCustomPhotoInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddCustomPhoto(e);
                    }
                  }}
                  className="flex-1 rounded-xl border border-stone-300 px-3.5 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCustomPhoto}
                  className="inline-flex items-center gap-1 rounded-xl bg-stone-900 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600 transition active:scale-95 shrink-0"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{t.newListing.addPhotoBtn}</span>
                </button>
              </div>
            </div>

            {/* Section 6: Landlord Contact */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                  {t.newListing.step6Title}
                </h2>
                <p className="text-xs text-stone-500">{t.newListing.step6Subtitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.newListing.landlordNameLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={t.newListing.landlordNamePlaceholder}
                    value={landlordName}
                    onChange={(e) => setLandlordName(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.newListing.landlordPhoneLabel} <span className="text-rose-500">*</span>
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
                {language === 'am' ? 'ተመለስ' : 'Cancel'}
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 text-xs font-extrabold text-white shadow-lg hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t.newListing.publishingBtn}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    <span>{t.newListing.publishBtn}</span>
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
