import { PrismaClient, ListingType, FurnishingStatus, VerificationStatus, ListingStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Addis Ababa sub-cities and neighborhoods...');

  const subCitiesData = [
    {
      name: 'Bole',
      code: 'BOLE',
      neighborhoods: ['Bole Medhanialem', 'Atlas', 'Rwanda', 'Bole Bulbula', 'Gerji', 'CMC', 'Summit'],
    },
    {
      name: 'Kirkos',
      code: 'KRK',
      neighborhoods: ['Kazanchis', 'Meskel Flower', 'Olympia', 'Mexico', 'Beklobet'],
    },
    {
      name: 'Yeka',
      code: 'YEKA',
      neighborhoods: ['Megenagna', 'Signal', 'Kotebe', 'Ferensay Legasion', 'Yeka Abado'],
    },
    {
      name: 'Nifas Silk-Lafto',
      code: 'NSL',
      neighborhoods: ['Sarbet', 'Jemo 1', 'Jemo 3', 'Lebu', 'Bisrate Gabriel', 'Gotera'],
    },
    {
      name: 'Arada',
      code: 'ARADA',
      neighborhoods: ['Piazza', '4 Kilo', '6 Kilo', 'Arat Kilo Menelik'],
    },
    {
      name: 'Lideta',
      code: 'LIDETA',
      neighborhoods: ['Lideta Condominium', 'Tor Hailoch', 'Abenet'],
    },
  ];

  for (const sc of subCitiesData) {
    const subCity = await prisma.subCity.upsert({
      where: { code: sc.code },
      update: {},
      create: { name: sc.name, code: sc.code },
    });

    for (const nName of sc.neighborhoods) {
      await prisma.neighborhood.upsert({
        where: { name_subCityId: { name: nName, subCityId: subCity.id } },
        update: {},
        create: { name: nName, subCityId: subCity.id },
      });
    }
  }

  console.log('Seeding verified landlords...');

  const demoOwner = await prisma.user.upsert({
    where: { phoneNumber: '+251911000001' },
    update: {},
    create: {
      phoneNumber: '+251911000001',
      fullName: 'Abebe Bikila',
      role: 'LANDLORD',
      isPhoneVerified: true,
      email: 'abebe@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
  });

  const demoOwner2 = await prisma.user.upsert({
    where: { phoneNumber: '+251922334455' },
    update: {},
    create: {
      phoneNumber: '+251922334455',
      fullName: 'Sara Tesfaye',
      role: 'LANDLORD',
      isPhoneVerified: true,
      email: 'sara@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  });

  const demoOwner3 = await prisma.user.upsert({
    where: { phoneNumber: '+251933445566' },
    update: {},
    create: {
      phoneNumber: '+251933445566',
      fullName: 'Dawit Yohannes',
      role: 'LANDLORD',
      isPhoneVerified: true,
      email: 'dawit@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
  });

  console.log('Seeding rich photo-verified listings...');

  const cmc = await prisma.neighborhood.findFirst({ where: { name: 'CMC' } });
  const boleMedh = await prisma.neighborhood.findFirst({ where: { name: 'Bole Medhanialem' } });
  const kazanchis = await prisma.neighborhood.findFirst({ where: { name: 'Kazanchis' } });
  const sarbet = await prisma.neighborhood.findFirst({ where: { name: 'Sarbet' } });
  const bisrate = await prisma.neighborhood.findFirst({ where: { name: 'Bisrate Gabriel' } });
  const atlas = await prisma.neighborhood.findFirst({ where: { name: 'Atlas' } });
  const megenagna = await prisma.neighborhood.findFirst({ where: { name: 'Megenagna' } });

  // 1. CMC Modern 2BR Apartment
  if (cmc) {
    const l1 = await prisma.listing.upsert({
      where: { slug: 'modern-2br-apartment-cmc-water-tank' },
      update: {
        title: 'Modern 2BR Apartment in CMC with Water Tank & Generator',
        monthlyRent: 35000.00,
        hasWaterReserve: true,
        hasGenerator: true,
        hasParking: true,
        hasElevator: true,
        hasWifi: true,
      },
      create: {
        title: 'Modern 2BR Apartment in CMC with Water Tank & Generator',
        slug: 'modern-2br-apartment-cmc-water-tank',
        description: 'Spacious apartment near Light Rail. Includes 2000L water tank, backup generator, and dedicated parking. Quiet residential compound with 24/7 security guard.',
        listingType: ListingType.ENTIRE_APARTMENT,
        status: ListingStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        monthlyRent: 35000.00,
        depositMonths: 2,
        isPriceNegotiable: true,
        bedrooms: 2,
        bathrooms: 2,
        floorLevel: 3,
        hasWaterReserve: true,
        hasGenerator: true,
        hasParking: true,
        hasElevator: true,
        hasWifi: true,
        furnishing: FurnishingStatus.SEMI_FURNISHED,
        neighborhoodId: cmc.id,
        landmark: 'Near CMC Michael Church & Light Rail Station',
        userId: demoOwner.id,
      },
    });

    await prisma.listingImage.deleteMany({ where: { listingId: l1.id } });
    await prisma.listingImage.createMany({
      data: [
        { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', isCover: true, order: 0, listingId: l1.id },
        { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', isCover: false, order: 1, listingId: l1.id },
        { url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1', isCover: false, order: 2, listingId: l1.id },
        { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a', isCover: false, order: 3, listingId: l1.id },
        { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', isCover: false, order: 4, listingId: l1.id },
      ],
    });
  }

  // 2. Bole Medhanialem Executive 3BR
  if (boleMedh) {
    const l2 = await prisma.listing.upsert({
      where: { slug: 'luxury-executive-3br-bole-medhanialem' },
      update: {
        title: 'Executive 3BR Furnished Suite behind Bole Medhanialem',
        monthlyRent: 75000.00,
        hasWaterReserve: true,
        hasGenerator: true,
        hasParking: true,
        hasElevator: true,
        hasWifi: true,
      },
      create: {
        title: 'Executive 3BR Furnished Suite behind Bole Medhanialem',
        slug: 'luxury-executive-3br-bole-medhanialem',
        description: 'High-end fully furnished apartment walking distance from Edna Mall and Bole Medhanialem Cathedral. Features silent backup generator, 5000L reserve tank, fiber optic internet, and CCTV.',
        listingType: ListingType.ENTIRE_APARTMENT,
        status: ListingStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        monthlyRent: 75000.00,
        depositMonths: 3,
        isPriceNegotiable: false,
        bedrooms: 3,
        bathrooms: 3,
        floorLevel: 5,
        hasWaterReserve: true,
        hasGenerator: true,
        hasParking: true,
        hasElevator: true,
        hasWifi: true,
        furnishing: FurnishingStatus.FULLY_FURNISHED,
        neighborhoodId: boleMedh.id,
        landmark: 'Behind Bole Medhanialem Cathedral',
        userId: demoOwner2.id,
      },
    });

    await prisma.listingImage.deleteMany({ where: { listingId: l2.id } });
    await prisma.listingImage.createMany({
      data: [
        { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', isCover: true, order: 0, listingId: l2.id },
        { url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf', isCover: false, order: 1, listingId: l2.id },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c', isCover: false, order: 2, listingId: l2.id },
        { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d', isCover: false, order: 3, listingId: l2.id },
        { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', isCover: false, order: 4, listingId: l2.id },
      ],
    });
  }

  // 3. Kazanchis Cozy Studio near UN-ECA
  if (kazanchis) {
    const l3 = await prisma.listing.upsert({
      where: { slug: 'cozy-studio-kazanchis-near-un-eca' },
      update: {
        title: 'Cozy Studio Apartment in Kazanchis near UN-ECA',
        monthlyRent: 28000.00,
        hasWaterReserve: true,
        hasGenerator: true,
      },
      create: {
        title: 'Cozy Studio Apartment in Kazanchis near UN-ECA',
        slug: 'cozy-studio-kazanchis-near-un-eca',
        description: 'Ideal for expats, diplomats, or remote professionals. Fully serviced studio with continuous water supply, backup generator, and fast WiFi. Walking distance to Intercontinental and Radisson Blu.',
        listingType: ListingType.STUDIO,
        status: ListingStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        monthlyRent: 28000.00,
        depositMonths: 1,
        isPriceNegotiable: true,
        bedrooms: 1,
        bathrooms: 1,
        floorLevel: 2,
        hasWaterReserve: true,
        hasGenerator: true,
        hasParking: false,
        hasElevator: false,
        hasWifi: true,
        furnishing: FurnishingStatus.FULLY_FURNISHED,
        neighborhoodId: kazanchis.id,
        landmark: '200m from UN-ECA Main Gate',
        userId: demoOwner.id,
      },
    });

    await prisma.listingImage.deleteMany({ where: { listingId: l3.id } });
    await prisma.listingImage.createMany({
      data: [
        { url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9', isCover: true, order: 0, listingId: l3.id },
        { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', isCover: false, order: 1, listingId: l3.id },
        { url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae', isCover: false, order: 2, listingId: l3.id },
        { url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1', isCover: false, order: 3, listingId: l3.id },
      ],
    });
  }

  // 4. Sarbet Bright 2BR Home
  if (sarbet) {
    const l4 = await prisma.listing.upsert({
      where: { slug: 'spacious-2br-sarbet-canadian-embassy' },
      update: {
        title: 'Bright 2BR Unfurnished Home in Sarbet',
        monthlyRent: 42000.00,
      },
      create: {
        title: 'Bright 2BR Unfurnished Home in Sarbet',
        slug: 'spacious-2br-sarbet-canadian-embassy',
        description: 'Bright and airy 2-bedroom home in diplomatic Sarbet corridor. Large kitchen, balcony with mountain views, dedicated parking space, and shared 3000L water tank.',
        listingType: ListingType.ENTIRE_APARTMENT,
        status: ListingStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        monthlyRent: 42000.00,
        depositMonths: 2,
        isPriceNegotiable: true,
        bedrooms: 2,
        bathrooms: 2,
        floorLevel: 4,
        hasWaterReserve: true,
        hasGenerator: false,
        hasParking: true,
        hasElevator: true,
        hasWifi: false,
        furnishing: FurnishingStatus.UNFURNISHED,
        neighborhoodId: sarbet.id,
        landmark: 'Near Canadian Embassy & Old Airport',
        userId: demoOwner2.id,
      },
    });

    await prisma.listingImage.deleteMany({ where: { listingId: l4.id } });
    await prisma.listingImage.createMany({
      data: [
        { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f', isCover: true, order: 0, listingId: l4.id },
        { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858', isCover: false, order: 1, listingId: l4.id },
        { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf', isCover: false, order: 2, listingId: l4.id },
        { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd', isCover: false, order: 3, listingId: l4.id },
      ],
    });
  }

  // 5. Bisrate Gabriel Room
  if (bisrate) {
    const l5 = await prisma.listing.upsert({
      where: { slug: 'budget-private-room-bisrate-gabriel' },
      update: {
        title: 'Private Room in Shared Modern Villa - Bisrate Gabriel',
        monthlyRent: 14000.00,
      },
      create: {
        title: 'Private Room in Shared Modern Villa - Bisrate Gabriel',
        slug: 'budget-private-room-bisrate-gabriel',
        description: 'Looking for a tidy young professional or roommate. Clean private bedroom with ensuite bathroom. Shared access to modern kitchen, living room, water reserve, and garden.',
        listingType: ListingType.PRIVATE_ROOM,
        status: ListingStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        monthlyRent: 14000.00,
        depositMonths: 1,
        isPriceNegotiable: false,
        bedrooms: 1,
        bathrooms: 1,
        floorLevel: 1,
        hasWaterReserve: true,
        hasGenerator: true,
        hasParking: true,
        hasElevator: false,
        hasWifi: true,
        furnishing: FurnishingStatus.SEMI_FURNISHED,
        neighborhoodId: bisrate.id,
        landmark: 'Near Bisrate Gabriel International School',
        userId: demoOwner.id,
      },
    });

    await prisma.listingImage.deleteMany({ where: { listingId: l5.id } });
    await prisma.listingImage.createMany({
      data: [
        { url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c', isCover: true, order: 0, listingId: l5.id },
        { url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2', isCover: false, order: 1, listingId: l5.id },
        { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f', isCover: false, order: 2, listingId: l5.id },
        { url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b', isCover: false, order: 3, listingId: l5.id },
      ],
    });
  }

  // 6. Atlas Bole Penthouse
  if (atlas) {
    const l6 = await prisma.listing.upsert({
      where: { slug: 'atlas-penthouse-panoramic-generator' },
      update: {},
      create: {
        title: 'Luxury 3BR Penthouse in Atlas with 24/7 Power & Water',
        slug: 'atlas-penthouse-panoramic-generator',
        description: 'Top floor modern penthouse overlooking Bole road. High ceilings, Italian kitchen appliances, automatic heavy-duty backup generator, dual 3000L water reserves, and 2 underground parking slots.',
        listingType: ListingType.ENTIRE_APARTMENT,
        status: ListingStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        monthlyRent: 85000.00,
        depositMonths: 2,
        isPriceNegotiable: true,
        bedrooms: 3,
        bathrooms: 3,
        floorLevel: 8,
        hasWaterReserve: true,
        hasGenerator: true,
        hasParking: true,
        hasElevator: true,
        hasWifi: true,
        furnishing: FurnishingStatus.FULLY_FURNISHED,
        neighborhoodId: atlas.id,
        landmark: 'Behind Atlas Hotel, Bole',
        userId: demoOwner3.id,
      },
    });

    await prisma.listingImage.deleteMany({ where: { listingId: l6.id } });
    await prisma.listingImage.createMany({
      data: [
        { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd', isCover: true, order: 0, listingId: l6.id },
        { url: 'https://images.unsplash.com/photo-1502005229762-ee1b2b93e000', isCover: false, order: 1, listingId: l6.id },
        { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', isCover: false, order: 2, listingId: l6.id },
        { url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68', isCover: false, order: 3, listingId: l6.id },
      ],
    });
  }

  // 7. Megenagna 1BR near Light Rail
  if (megenagna) {
    const l7 = await prisma.listing.upsert({
      where: { slug: 'charming-1br-megenagna-light-rail' },
      update: {},
      create: {
        title: 'Charming 1BR Apartment 300m from Megenagna Light Rail',
        slug: 'charming-1br-megenagna-light-rail',
        description: 'Perfect for daily commuters. Located right by Megenagna roundabout and Light Rail transit. Includes 1500L reserve water tank, compound security, and fiber WiFi.',
        listingType: ListingType.ENTIRE_APARTMENT,
        status: ListingStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        monthlyRent: 22000.00,
        depositMonths: 1,
        isPriceNegotiable: true,
        bedrooms: 1,
        bathrooms: 1,
        floorLevel: 2,
        hasWaterReserve: true,
        hasGenerator: false,
        hasParking: true,
        hasElevator: false,
        hasWifi: true,
        furnishing: FurnishingStatus.SEMI_FURNISHED,
        neighborhoodId: megenagna.id,
        landmark: '300m from Megenagna Light Rail Station',
        userId: demoOwner3.id,
      },
    });

    await prisma.listingImage.deleteMany({ where: { listingId: l7.id } });
    await prisma.listingImage.createMany({
      data: [
        { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', isCover: true, order: 0, listingId: l7.id },
        { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', isCover: false, order: 1, listingId: l7.id },
        { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', isCover: false, order: 2, listingId: l7.id },
      ],
    });
  }

  console.log('Rich seed with 7 verified properties and 30+ photos completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
