'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Trash2, CheckCircle2, AlertCircle, Camera, Star } from 'lucide-react';
import { addPhotoToListing, removePhotoFromListing } from '@/actions/admin';

interface AdminPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
  initialImages: Array<{ id: string; url: string; isCover: boolean }>;
  onPhotosUpdated: () => void;
}

const ADDIS_PRESET_PHOTOS = [
  { label: 'Living Room', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267' },
  { label: 'Master Bedroom', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688' },
  { label: 'Kitchen', url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1' },
  { label: 'Bathroom', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a' },
  { label: 'Exterior Compound', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6' },
  { label: 'Rotto Water Tank', url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296' },
  { label: 'Backup Generator', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758' },
  { label: 'Executive Suite', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
];

export function AdminPhotoModal({
  isOpen,
  onClose,
  listingId,
  listingTitle,
  initialImages,
  onPhotosUpdated,
}: AdminPhotoModalProps) {
  const [images, setImages] = useState(initialImages);
  const [urlInput, setUrlInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  if (!isOpen) return null;

  const handleAddPhoto = async (url: string, isCover = false) => {
    if (!url.trim()) return;
    setIsSubmitting(true);
    setMsg('');

    try {
      const res = await addPhotoToListing(listingId, url.trim(), isCover);
      if (res.success && res.image) {
        setImages((prev) => [
          ...prev,
          { id: res.image.id, url: res.image.url, isCover: res.image.isCover },
        ]);
        setUrlInput('');
        setMsg('Photo added successfully!');
        onPhotosUpdated();
      }
    } catch {
      setMsg('Error adding photo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemovePhoto = async (imageId: string) => {
    setIsSubmitting(true);
    try {
      await removePhotoFromListing(imageId);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
      onPhotosUpdated();
    } catch {
      setMsg('Error removing photo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white p-6 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-800">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Manage Property Photos ({images.length})
              </h3>
              <p className="text-xs text-stone-500 line-clamp-1">{listingTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto py-5 space-y-5">
          {msg && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{msg}</span>
            </div>
          )}

          {/* Existing Photos Grid */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Current Photos
            </label>
            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200"
                  >
                    <Image
                      src={img.url}
                      alt="Property photo"
                      fill
                      className="object-cover"
                    />
                    {img.isCover && (
                      <span className="absolute top-2 left-2 rounded-md bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow">
                        Cover Photo
                      </span>
                    )}

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(img.id)}
                        disabled={isSubmitting}
                        className="rounded-lg bg-rose-600 p-1.5 text-white shadow hover:bg-rose-700 transition"
                        title="Delete photo"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-stone-300 p-6 text-center text-xs text-stone-500">
                No photos attached to this listing yet.
              </div>
            )}
          </div>

          {/* Add custom URL input */}
          <div className="pt-3 border-t border-stone-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Add New Photo via Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 rounded-xl border border-stone-300 px-3.5 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddPhoto(urlInput)}
                disabled={isSubmitting || !urlInput.trim()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-2">
              Quick-Add Addis Verified Sample Photos:
            </label>
            <div className="flex flex-wrap gap-2">
              {ADDIS_PRESET_PHOTOS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleAddPhoto(preset.url)}
                  disabled={isSubmitting}
                  className="rounded-lg bg-stone-100 border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition"
                >
                  + {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-stone-200 pt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
