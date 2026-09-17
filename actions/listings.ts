'use server';

import prisma from '@/lib/prisma';
import { ListingStatus, VerificationStatus, ListingType, FurnishingStatus } from '@prisma/client';

export interface ListingFilterParams {
  query?: string;
  subCityId?: string;
  neighborhoodId?: string;
  listingType?: ListingType;
  minRent?: number;
  maxRent?: number;
  bedrooms?: number;
  hasWaterReserve?: boolean;
  hasGenerator?: boolean;
  hasParking?: boolean;
  hasWifi?: boolean;
  hasElevator?: boolean;
  page?: number;
  limit?: number;
}

export async function getFilteredListings(params: ListingFilterParams) {
  const {
    query,
    subCityId,
    neighborhoodId,
    listingType,
    minRent,
    maxRent,
    bedrooms,
    hasWaterReserve,
    hasGenerator,
    hasParking,
    hasWifi,
    hasElevator,
    page = 1,
    limit = 12,
  } = params;

  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereClause: any = {
    status: ListingStatus.ACTIVE,
    verificationStatus: VerificationStatus.VERIFIED,
  };

  if (neighborhoodId) whereClause.neighborhoodId = neighborhoodId;
  if (subCityId) whereClause.neighborhood = { subCityId };
  if (listingType) whereClause.listingType = listingType;
  if (bedrooms !== undefined && bedrooms > 0) whereClause.bedrooms = bedrooms;
  if (hasWaterReserve) whereClause.hasWaterReserve = true;
  if (hasGenerator) whereClause.hasGenerator = true;
  if (hasParking) whereClause.hasParking = true;
  if (hasWifi) whereClause.hasWifi = true;
  if (hasElevator) whereClause.hasElevator = true;

  if (query && query.trim() !== '') {
    const q = query.trim();
    whereClause.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { landmark: { contains: q, mode: 'insensitive' } },
      { neighborhood: { name: { contains: q, mode: 'insensitive' } } },
      { neighborhood: { subCity: { name: { contains: q, mode: 'insensitive' } } } },
    ];
  }

  if (minRent !== undefined || maxRent !== undefined) {
    whereClause.monthlyRent = {};
    if (minRent !== undefined) whereClause.monthlyRent.gte = minRent;
    if (maxRent !== undefined) whereClause.monthlyRent.lte = maxRent;
  }

  const [items, total] = await Promise.all([
    prisma.listing.findMany({
      where: whereClause,
      include: {
        neighborhood: { include: { subCity: true } },
        images: { orderBy: { order: 'asc' } },
        user: { select: { fullName: true, phoneNumber: true, isPhoneVerified: true, avatarUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.listing.count({ where: whereClause }),
  ]);

  const serializedItems = items.map((item) => ({
    ...item,
    monthlyRent: item.monthlyRent.toNumber(),
  }));

  return { items: serializedItems, pagination: { total, page, totalPages: Math.ceil(total / limit) } };
}

export async function getSubCitiesWithNeighborhoods() {
  return prisma.subCity.findMany({
    orderBy: { name: 'asc' },
    include: {
      locations: {
        orderBy: { name: 'asc' },
      },
    },
  });
}

export async function getListingBySlug(slug: string) {
  const listing = await prisma.listing.findUnique({
    where: { slug },
    include: {
      neighborhood: {
        include: { subCity: true },
      },
      images: {
        orderBy: { order: 'asc' },
      },
      user: {
        select: {
          id: true,
          fullName: true,
          phoneNumber: true,
          isPhoneVerified: true,
          avatarUrl: true,
          role: true,
          createdAt: true,
        },
      },
    },
  });

  if (listing) {
    // Increment view count asynchronously
    prisma.listing.update({
      where: { id: listing.id },
      data: { viewsCount: { increment: 1 } },
    }).catch(() => {});

    return {
      ...listing,
      monthlyRent: listing.monthlyRent.toNumber(),
    };
  }

  return null;
}

export async function createInquiry(data: {
  listingId: string;
  senderPhone: string;
  message: string;
  senderName?: string;
}) {
  const { listingId, senderPhone, message, senderName } = data;

  // Find or create user for the sender
  const user = await prisma.user.upsert({
    where: { phoneNumber: senderPhone },
    update: senderName ? { fullName: senderName } : {},
    create: {
      phoneNumber: senderPhone,
      fullName: senderName || 'Interested Renter',
    },
  });

  const inquiry = await prisma.inquiry.create({
    data: {
      listingId,
      senderId: user.id,
      phoneNumber: senderPhone,
      message,
    },
  });

  return { success: true, inquiryId: inquiry.id };
}

export async function initiatePaymentMock(data: {
  listingId: string;
  amount: number;
  provider: 'TELEBIRR' | 'CHAPA';
  phoneNumber: string;
}) {
  const { listingId, amount, provider, phoneNumber } = data;

  const user = await prisma.user.upsert({
    where: { phoneNumber },
    update: {},
    create: { phoneNumber },
  });

  const txRef = `QB-${provider.substring(0, 4)}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const payment = await prisma.payment.create({
    data: {
      txRef,
      amount,
      currency: 'ETB',
      provider,
      userId: user.id,
      listingId,
      status: 'SUCCESS', // Mock successful checkout for demo
      rawWebhookLog: {
        channel: provider,
        timestamp: new Date().toISOString(),
        verified: true,
        note: 'Direct booking deposit secured with zero broker markup',
      },
    },
  });

  return {
    success: true,
    txRef: payment.txRef,
    status: payment.status,
    message: `${provider} payment of ${amount} ETB processed successfully!`,
  };
}

export interface CreateListingInput {
  title: string;
  description: string;
  listingType: ListingType;
  monthlyRent: number;
  depositMonths: number;
  isPriceNegotiable: boolean;
  bedrooms: number;
  bathrooms: number;
  floorLevel?: number;
  hasWaterReserve: boolean;
  hasGenerator: boolean;
  hasParking: boolean;
  hasWifi: boolean;
  hasElevator: boolean;
  furnishing: FurnishingStatus;
  neighborhoodId: string;
  landmark?: string;
  landlordPhone: string;
  landlordName: string;
  imageUrls: string[];
}

export async function createListing(input: CreateListingInput) {
  const {
    title,
    description,
    listingType,
    monthlyRent,
    depositMonths,
    isPriceNegotiable,
    bedrooms,
    bathrooms,
    floorLevel,
    hasWaterReserve,
    hasGenerator,
    hasParking,
    hasWifi,
    hasElevator,
    furnishing,
    neighborhoodId,
    landmark,
    landlordPhone,
    landlordName,
    imageUrls,
  } = input;

  // Find or create landlord user
  const user = await prisma.user.upsert({
    where: { phoneNumber: landlordPhone },
    update: { fullName: landlordName, role: 'LANDLORD' },
    create: {
      phoneNumber: landlordPhone,
      fullName: landlordName,
      role: 'LANDLORD',
      isPhoneVerified: true,
    },
  });

  // Generate unique slug
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .substring(0, 80);
  const slug = `${baseSlug}-${Date.now().toString().slice(-5)}`;

  // Default images if none provided
  const finalImages =
    imageUrls.length > 0
      ? imageUrls
      : [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
        ];

  const listing = await prisma.listing.create({
    data: {
      title,
      slug,
      description,
      listingType,
      monthlyRent,
      depositMonths,
      isPriceNegotiable,
      bedrooms,
      bathrooms,
      floorLevel: floorLevel || null,
      hasWaterReserve,
      hasGenerator,
      hasParking,
      hasWifi,
      hasElevator,
      furnishing,
      neighborhoodId,
      landmark: landmark || null,
      userId: user.id,
      status: ListingStatus.ACTIVE,
      verificationStatus: VerificationStatus.VERIFIED,
      images: {
        create: finalImages.map((url, idx) => ({
          url,
          isCover: idx === 0,
          order: idx,
        })),
      },
    },
  });

  return { success: true, slug: listing.slug };
}
