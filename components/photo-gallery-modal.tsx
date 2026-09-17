'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ url: string; isCover?: boolean }>;
  title: string;
  initialIndex?: number;
}

export function PhotoGalleryModal({
  isOpen,
  onClose,
  images,
  title,
  initialIndex = 0,
}: PhotoGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white">
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <Camera className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold text-white">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
          <span className="text-stone-600">•</span>
          <h3 className="text-xs sm:text-sm font-semibold text-stone-300 line-clamp-1 max-w-md">
            {title}
          </h3>
        </div>

        <button
          onClick={onClose}
          className="rounded-full bg-stone-800/80 p-2 text-stone-300 hover:bg-stone-700 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main active photo display */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 select-none">
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-stone-800/80 text-white hover:bg-emerald-600 transition shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div className="relative h-full w-full max-w-5xl max-h-[75vh]">
          <Image
            src={images[currentIndex].url}
            alt={`${title} - Photo ${currentIndex + 1}`}
            fill
            unoptimized
            sizes="100vw"
            priority
            className="object-contain"
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-stone-800/80 text-white hover:bg-emerald-600 transition shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="px-6 py-3 border-t border-stone-800 bg-black/60 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  idx === currentIndex
                    ? 'border-emerald-500 ring-2 ring-emerald-500/50'
                    : 'border-stone-700 opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
