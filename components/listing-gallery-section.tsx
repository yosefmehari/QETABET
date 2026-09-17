'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Grid } from 'lucide-react';
import { PhotoGalleryModal } from './photo-gallery-modal';

interface ListingGallerySectionProps {
  title: string;
  images: Array<{ url: string; isCover?: boolean }>;
}

export function ListingGallerySection({ title, images }: ListingGallerySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images.length > 0
    ? images
    : [{ url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', isCover: true }];

  const openGalleryAt = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative mb-8 overflow-hidden rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 h-[340px] sm:h-[420px] md:h-[480px]">
          {/* Main Hero Photo (Takes 2.5 cols on desktop) */}
          <div
            onClick={() => openGalleryAt(0)}
            className="relative cursor-pointer md:col-span-2 md:row-span-2 overflow-hidden bg-stone-100 group"
          >
            <Image
              src={displayImages[0].url}
              alt={title}
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Sub photos (grid of 4 smaller photos on desktop) */}
          {displayImages.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              onClick={() => openGalleryAt(idx + 1)}
              className="hidden md:block relative cursor-pointer overflow-hidden bg-stone-100 group"
            >
              <Image
                src={img.url}
                alt={`${title} - Photo ${idx + 2}`}
                fill
                unoptimized
                sizes="25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

              {/* Show "+X more" overlay on the 4th sub-photo if more exist */}
              {idx === 3 && displayImages.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white font-bold text-sm backdrop-blur-xs">
                  +{displayImages.length - 5} More Photos
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Floating "View All Photos" Button */}
        <button
          type="button"
          onClick={() => openGalleryAt(0)}
          className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-xl bg-white/95 px-3.5 py-2 text-xs font-bold text-stone-900 shadow-lg backdrop-blur-md hover:bg-white hover:text-emerald-700 transition"
        >
          <Camera className="h-4 w-4 text-emerald-600" />
          <span>Show all {displayImages.length} photos</span>
        </button>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <PhotoGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={displayImages}
        title={title}
        initialIndex={selectedIndex}
      />
    </>
  );
}
