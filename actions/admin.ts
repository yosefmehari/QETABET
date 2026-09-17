'use server';

import prisma from '@/lib/prisma';
import { VerificationStatus, ListingStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getAdminStats() {
  const [
    totalListings,
    verifiedListings,
    pendingListings,
    totalInquiries,
    totalPayments,
    totalLandlords,
  ] = await Promise.all([
    prisma.listing.count(),
    prisma.listing.count({ where: { verificationStatus: 'VERIFIED' } }),
    prisma.listing.count({ where: { verificationStatus: 'PENDING' } }),
    prisma.inquiry.count(),
    prisma.payment.count(),
    prisma.user.count({ where: { role: 'LANDLORD' } }),
  ]);

  const paymentsSum = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: 'SUCCESS' },
  });

  return {
    totalListings,
    verifiedListings,
    pendingListings,
    totalInquiries,
    totalPayments,
    totalLandlords,
    totalRevenueETB: paymentsSum._sum.amount?.toNumber() || 0,
  };
}

export async function getAllListingsAdmin() {
  const listings = await prisma.listing.findMany({
    include: {
      neighborhood: { include: { subCity: true } },
      images: { orderBy: { order: 'asc' } },
      user: { select: { id: true, fullName: true, phoneNumber: true, isPhoneVerified: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return listings.map((item) => ({
    ...item,
    monthlyRent: item.monthlyRent.toNumber(),
  }));
}

export async function updateListingVerification(listingId: string, status: VerificationStatus) {
  const updated = await prisma.listing.update({
    where: { id: listingId },
    data: { verificationStatus: status },
  });
  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/listings/${updated.slug}`);
  return { success: true };
}

export async function updateListingStatus(listingId: string, status: ListingStatus) {
  const updated = await prisma.listing.update({
    where: { id: listingId },
    data: { status },
  });
  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/listings/${updated.slug}`);
  return { success: true };
}

export async function addPhotoToListing(listingId: string, url: string, isCover = false) {
  try {
    const cleanUrl = url.trim();
    if (!cleanUrl) {
      return { success: false, error: 'URL cannot be empty' };
    }

    const currentCount = await prisma.listingImage.count({ where: { listingId } });
    
    if (isCover) {
      await prisma.listingImage.updateMany({
        where: { listingId },
        data: { isCover: false },
      });
    }

    const image = await prisma.listingImage.create({
      data: {
        listingId,
        url: cleanUrl,
        isCover: isCover || currentCount === 0,
        order: currentCount,
      },
    });

    const listing = await prisma.listing.findUnique({ where: { id: listingId }, select: { slug: true } });
    if (listing) {
      revalidatePath('/');
      revalidatePath('/admin');
      revalidatePath(`/listings/${listing.slug}`);
    }

    return { success: true, image };
  } catch (error: any) {
    console.error('Failed to add photo to listing:', error);
    return { success: false, error: error?.message || 'Database error occurred' };
  }
}

export async function removePhotoFromListing(imageId: string) {
  const image = await prisma.listingImage.delete({
    where: { id: imageId },
    include: { listing: { select: { slug: true } } },
  });

  revalidatePath('/');
  revalidatePath('/admin');
  if (image.listing) {
    revalidatePath(`/listings/${image.listing.slug}`);
  }

  return { success: true };
}

export async function deleteListingAdmin(listingId: string) {
  await prisma.listing.delete({ where: { id: listingId } });
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function getAllInquiriesAdmin() {
  return prisma.inquiry.findMany({
    include: {
      listing: { select: { id: true, title: true, slug: true } },
      sender: { select: { fullName: true, phoneNumber: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getAllPaymentsAdmin() {
  const payments = await prisma.payment.findMany({
    include: {
      listing: { select: { title: true, slug: true } },
      user: { select: { fullName: true, phoneNumber: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return payments.map((p) => ({
    ...p,
    amount: p.amount.toNumber(),
  }));
}
