export type Language = 'en' | 'am';

export interface Translations {
  nav: {
    brandSubtitle: string;
    zeroDelala: string;
    waterPower: string;
    telebirrChapa: string;
    listProperty: string;
    adminDashboard: string;
    allRentals: string;
    selectLanguage: string;
  };
  hero: {
    antiBrokerBadge: string;
    headingMain: string;
    headingAccent: string;
    headingSub: string;
    waterFilterBtn: string;
    genFilterBtn: string;
    vettedBadge: string;
    metric1Label: string;
    metric1Value: string;
    metric1Sub: string;
    metric2Label: string;
    metric2Value: string;
    metric2Sub: string;
    metric3Label: string;
    metric3Value: string;
    metric3Sub: string;
    metric4Label: string;
    metric4Value: string;
    metric4Sub: string;
  };
  explorer: {
    searchPlaceholder: string;
    filterButton: string;
    allAddis: string;
    waterTankBadge: string;
    generatorBadge: string;
    parkingBadge: string;
    showingResults: string;
    sortNewest: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    activeFiltersCount: string;
    clearFilters: string;
    noListingsFound: string;
    noListingsDesc: string;
    resetFiltersBtn: string;
    verifiedProperties: string;
  };
  drawer: {
    filterTitle: string;
    clearAll: string;
    subCitySection: string;
    allSubCities: string;
    neighborhoodSection: string;
    allNeighborhoods: string;
    propertyTypeSection: string;
    allPropertyTypes: string;
    priceRangeSection: string;
    minRentPlaceholder: string;
    maxRentPlaceholder: string;
    bedroomsSection: string;
    anyBedrooms: string;
    vitalAmenitiesSection: string;
    waterReserveLabel: string;
    waterReserveSub: string;
    generatorLabel: string;
    generatorSub: string;
    parkingLabel: string;
    parkingSub: string;
    wifiLabel: string;
    wifiSub: string;
    elevatorLabel: string;
    elevatorSub: string;
    applyFiltersBtn: string;
    viewMatches: string;
  };
  card: {
    perMonth: string;
    depositOneMonth: string;
    depositMonths: string;
    negotiable: string;
    fixedPrice: string;
    bed: string;
    beds: string;
    bath: string;
    baths: string;
    floor: string;
    groundFloor: string;
    viewDetails: string;
    callDirect: string;
    waterGuaranteed: string;
    generatorReady: string;
    parkingIncluded: string;
    verifiedDirectBadge: string;
  };
  details: {
    backToListings: string;
    viewsCount: string;
    verifiedHomeownerBadge: string;
    vitalAuditTitle: string;
    vitalAuditSubtitle: string;
    waterTankAuditTitle: string;
    waterTankAuditHas: string;
    waterTankAuditNo: string;
    generatorAuditTitle: string;
    generatorAuditHas: string;
    generatorAuditNo: string;
    parkingAuditTitle: string;
    parkingAuditHas: string;
    parkingAuditNo: string;
    wifiAuditTitle: string;
    wifiAvailable: string;
    wifiNotIncluded: string;
    elevatorAuditTitle: string;
    elevatorFunctional: string;
    elevatorStairsOnly: string;
    aboutPropertyTitle: string;
    landlordCardTitle: string;
    landlordVerifiedBadge: string;
    phoneVerifiedBadge: string;
    perMonth: string;
    depositMonth: string;
    depositMonths: string;
    priceNegotiable: string;
    priceFixed: string;
    brokerSavingsTitle: string;
    brokerSavingsDesc: string;
    callLandlordBtn: string;
    sendMessageBtn: string;
    reserveDepositBtn: string;
    trustPoint1: string;
    trustPoint2: string;
  };
  inquiry: {
    directContactBadge: string;
    contactTitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    sendBtn: string;
    sendingBtn: string;
    directCallBtn: string;
    successTitle: string;
    successDesc: string;
    callNowBtn: string;
    closeBtn: string;
    errorPhone: string;
    errorSend: string;
    defaultMessageTemplate: string;
  };
  payment: {
    title: string;
    subtitle: string;
    holdingReservation: string;
    deductedNotice: string;
    selectGatewayLabel: string;
    telebirrSub: string;
    chapaSub: string;
    phoneLabel: string;
    encryptionBadge: string;
    payBtn: string;
    authorizingBtn: string;
    successBadge: string;
    successTitle: string;
    txRefLabel: string;
    methodLabel: string;
    amountPaidLabel: string;
    statusLabel: string;
    holdingNotice: string;
    doneBtn: string;
    errorPhone: string;
    errorFailed: string;
  };
  market: {
    badge: string;
    title: string;
    subtitle: string;
    telegramTitle: string;
    telegramBullet1: string;
    telegramBullet2: string;
    telegramBullet3: string;
    telegramSecurityLabel: string;
    telegramSecurityValue: string;
    delalaTitle: string;
    delalaBullet1: string;
    delalaBullet2: string;
    delalaBullet3: string;
    delalaCostLabel: string;
    delalaCostValue: string;
    qetabetTitle: string;
    qetabetSubtitle: string;
    qetabetBadge: string;
    qetabetBullet1: string;
    qetabetBullet2: string;
    qetabetBullet3: string;
    qetabetCostLabel: string;
    qetabetCostValue: string;
  };
  landlordSection: {
    badge: string;
    title: string;
    subtitle: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    formTitle: string;
    formSubtitle: string;
    phoneLabel: string;
    submitBtn: string;
    fullListingLink: string;
    termsNotice: string;
    receivedTitle: string;
    receivedDesc: string;
  };
  newListing: {
    backToRentals: string;
    pageTitle: string;
    pageSubtitle: string;
    badge: string;
    step1Title: string;
    step1Subtitle: string;
    listingTitleLabel: string;
    listingTitlePlaceholder: string;
    listingTitleHint: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    step2Title: string;
    step2Subtitle: string;
    subCityLabel: string;
    neighborhoodLabel: string;
    landmarkLabel: string;
    landmarkPlaceholder: string;
    step3Title: string;
    step3Subtitle: string;
    propertyTypeLabel: string;
    monthlyRentLabel: string;
    depositLabel: string;
    negotiableCheckbox: string;
    bedroomsLabel: string;
    bathroomsLabel: string;
    floorLevelLabel: string;
    furnishingLabel: string;
    step4Title: string;
    step4Subtitle: string;
    waterReserveTitle: string;
    waterReserveDesc: string;
    generatorTitle: string;
    generatorDesc: string;
    parkingTitle: string;
    parkingDesc: string;
    wifiTitle: string;
    wifiDesc: string;
    elevatorTitle: string;
    elevatorDesc: string;
    step5Title: string;
    step5Subtitle: string;
    clickPresetToAdd: string;
    customUrlLabel: string;
    addPhotoBtn: string;
    step6Title: string;
    step6Subtitle: string;
    landlordNameLabel: string;
    landlordNamePlaceholder: string;
    landlordPhoneLabel: string;
    publishBtn: string;
    publishingBtn: string;
    freeAuditingNotice: string;
  };
  footer: {
    tagline: string;
    livingParameters: string;
    majorSubCitiesTitle: string;
    paymentSupportTitle: string;
    telebirrEscrow: string;
    chapaBanking: string;
    verificationNotice: string;
    addressNotice: string;
    copyright: string;
  };
  propertyTypes: Record<string, string>;
  furnishingTypes: Record<string, string>;
  locations: Record<string, string>;
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      brandSubtitle: 'Addis Ababa Verified Direct Rentals • 0% Broker Fee',
      zeroDelala: 'Zero Delala Fee (0% ደላላ)',
      waterPower: 'Water & Power Tested',
      telebirrChapa: 'Telebirr & Chapa Escrow',
      listProperty: 'List Property',
      adminDashboard: 'Admin Portal',
      allRentals: 'All Rentals',
      selectLanguage: 'Language',
    },
    hero: {
      antiBrokerBadge: 'No Telegram Scams • Zero 1-Month Broker Fees (ደላላ የለም)',
      headingMain: 'Verified Addis Homes.',
      headingAccent: 'Direct from Homeowners.',
      headingSub:
        'Eliminate ghost listings and fake brokers. Every property on QetaBet is physically inspected for dedicated water reserve tanks (Rotto), backup power, and fair monthly rent in ETB.',
      waterFilterBtn: 'Rotto Water Tank Guaranteed',
      genFilterBtn: 'Generator Standby Power',
      vettedBadge: 'Landlord Title Deed & ID Vetted',
      metric1Label: 'Broker Commission',
      metric1Value: '0 ETB',
      metric1Sub: '100% Direct Landlords',
      metric2Label: 'Water Assurance',
      metric2Value: 'Rotto Tanks',
      metric2Sub: 'Audited for city rationing',
      metric3Label: 'Payment Escrow',
      metric3Value: 'Telebirr & Chapa',
      metric3Sub: 'Secure holding deposit',
      metric4Label: 'Active Municipal Zones',
      metric4Value: '6 Sub-Cities',
      metric4Sub: 'Bole, Kirkos, Yeka, etc.',
    },
    explorer: {
      searchPlaceholder: 'Search CMC, Bole, Kazanchis, light rail, 2BR...',
      filterButton: 'Filters',
      allAddis: 'All Addis',
      waterTankBadge: 'Water Tank (ሮቶ)',
      generatorBadge: 'Generator',
      parkingBadge: 'Parking',
      showingResults: 'Verified Homes in Addis Ababa',
      sortNewest: 'Newest First',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      activeFiltersCount: 'filters active',
      clearFilters: 'Clear all',
      noListingsFound: 'No listings match your search criteria',
      noListingsDesc:
        'Try adjusting your price range, sub-city filters, or clearing specific amenities.',
      resetFiltersBtn: 'Reset all filters',
      verifiedProperties: 'verified properties',
    },
    drawer: {
      filterTitle: 'Filter Rentals',
      clearAll: 'Reset All',
      subCitySection: 'Sub-City (ክፍለ ከተማ)',
      allSubCities: 'All Sub-Cities',
      neighborhoodSection: 'Neighborhood (ሰፈር)',
      allNeighborhoods: 'All Neighborhoods',
      propertyTypeSection: 'Property Type (የቤት ዓይነት)',
      allPropertyTypes: 'All Types',
      priceRangeSection: 'Monthly Budget (ETB)',
      minRentPlaceholder: 'Min ETB (e.g. 15,000)',
      maxRentPlaceholder: 'Max ETB (e.g. 60,000)',
      bedroomsSection: 'Bedrooms',
      anyBedrooms: 'Any',
      vitalAmenitiesSection: 'Addis Vital Infrastructure',
      waterReserveLabel: 'Water Reserve Tank (Rotto)',
      waterReserveSub: 'Audited for Addis water schedule rationing',
      generatorLabel: 'Standby Generator',
      generatorSub: 'Power during Ethiopian Electric load shedding',
      parkingLabel: 'Gated Compound Parking',
      parkingSub: 'Secure on-site parking bay',
      wifiLabel: 'High-Speed Internet / WiFi',
      wifiSub: 'Fiber or dedicated broadband connection',
      elevatorLabel: 'Working Elevator (Lift)',
      elevatorSub: 'Functional building lift',
      applyFiltersBtn: 'Apply Filters',
      viewMatches: 'View Matches',
    },
    card: {
      perMonth: '/ month',
      depositOneMonth: '1 mo. deposit',
      depositMonths: 'mo. deposit',
      negotiable: 'Negotiable',
      fixedPrice: 'Fixed',
      bed: 'Bed',
      beds: 'Beds',
      bath: 'Bath',
      baths: 'Baths',
      floor: 'Floor',
      groundFloor: 'Ground',
      viewDetails: 'View Property',
      callDirect: 'Call Owner',
      waterGuaranteed: 'Rotto Tank',
      generatorReady: 'Generator',
      parkingIncluded: 'Parking',
      verifiedDirectBadge: 'Verified Direct',
    },
    details: {
      backToListings: 'Back to all Addis rentals',
      viewsCount: 'views',
      verifiedHomeownerBadge: 'Verified Direct Landlord',
      vitalAuditTitle: 'Addis Ababa Living Infrastructure Audit',
      vitalAuditSubtitle: 'Verified by QetaBet inspectors during physical home visit',
      waterTankAuditTitle: 'Water Reserve Tank',
      waterTankAuditHas:
        'Dedicated Rotto water tank installed with automated booster pump. Resilient against city water rationing.',
      waterTankAuditNo: 'No reserve tank reported. Standard city municipal tap only.',
      generatorAuditTitle: 'Standby Generator',
      generatorAuditHas:
        'Building standby diesel generator for immediate power during Ethiopian Electric Power load shedding.',
      generatorAuditNo: 'No backup generator in compound.',
      parkingAuditTitle: 'Dedicated Compound Parking',
      parkingAuditHas:
        'Designated secure parking bay inside gated compound with 24/7 security watchman.',
      parkingAuditNo: 'Street parking only.',
      wifiAuditTitle: 'WiFi / Fiber Internet',
      wifiAvailable: 'Available',
      wifiNotIncluded: 'Not Included',
      elevatorAuditTitle: 'Building Elevator',
      elevatorFunctional: 'Functional',
      elevatorStairsOnly: 'Stairs Only',
      aboutPropertyTitle: 'About this Property',
      landlordCardTitle: 'Verified Homeowner • Zero Delala Intermediary',
      landlordVerifiedBadge: 'Direct Homeowner Verified',
      phoneVerifiedBadge: 'Direct Phone Verified',
      perMonth: 'per month',
      depositMonth: 'month',
      depositMonths: 'months',
      priceNegotiable: 'Negotiable with Owner',
      priceFixed: 'Fixed Price',
      brokerSavingsTitle: 'You Save',
      brokerSavingsDesc:
        'By renting directly on QetaBet, you bypass the standard 1-month broker fee paid to street delalas.',
      callLandlordBtn: 'Call Homeowner',
      sendMessageBtn: 'Send Direct Message / Schedule Visit',
      reserveDepositBtn: 'Reserve via Telebirr or Chapa',
      trustPoint1: 'Identity and ownership papers physically inspected',
      trustPoint2: 'No hidden delala fees or unexpected charges',
    },
    inquiry: {
      directContactBadge: 'Direct Landlord Contact (0% Broker Cut)',
      contactTitle: 'Contact',
      fullNameLabel: 'Your Full Name',
      fullNamePlaceholder: 'e.g. Almaz Bekele',
      phoneLabel: 'Your Phone Number',
      phonePlaceholder: '+251 91 234 5678',
      messageLabel: 'Message to Landlord',
      sendBtn: 'Send Direct Message',
      sendingBtn: 'Sending...',
      directCallBtn: 'Direct Call',
      successTitle: 'Inquiry Sent Successfully!',
      successDesc:
        'Your inquiry has been directly forwarded to the verified landlord. They will reach out to you via call or SMS.',
      callNowBtn: 'Call Now',
      closeBtn: 'Close',
      errorPhone: 'Please enter a valid Ethiopian phone number (e.g. +251 91...)',
      errorSend: 'Failed to send inquiry. Please call the landlord directly.',
      defaultMessageTemplate:
        'Hello, I saw your listing on QetaBet and I am interested in scheduling a viewing.',
    },
    payment: {
      title: 'Secure Direct Deposit',
      subtitle: 'Hold property with zero broker fees. Funds protected in escrow.',
      holdingReservation: 'Holding Reservation',
      deductedNotice: 'Deducted from 1st month rent',
      selectGatewayLabel: 'Select Ethiopian Payment Gateway',
      telebirrSub: 'Ethio Telecom Mobile Money',
      chapaSub: 'CBE / Dashen / Awash / Cards',
      phoneLabel: 'Phone Number for Checkout',
      encryptionBadge: 'Encrypted 256-bit payment. Instant landlord reservation alert.',
      payBtn: 'Pay',
      authorizingBtn: 'Authorizing',
      successBadge: 'Deposit Secured • 0% Broker Fee',
      successTitle: 'Holding Deposit Confirmed!',
      txRefLabel: 'Transaction Ref:',
      methodLabel: 'Payment Method:',
      amountPaidLabel: 'Amount Paid:',
      statusLabel: 'Status:',
      holdingNotice:
        'This property is now reserved for your scheduled viewing. The landlord has been notified via SMS.',
      doneBtn: 'Done',
      errorPhone: 'Please enter your mobile phone number for Telebirr/Chapa OTP.',
      errorFailed: 'Payment simulation encountered an issue. Please try again.',
    },
    market: {
      badge: 'Why QetaBet?',
      title: "Fixing Addis Ababa's Rental Chaos",
      subtitle:
        'Comparing unverified Telegram channels and street brokers with QetaBet’s verified platform.',
      telegramTitle: 'Unstructured Telegram Channels',
      telegramBullet1: 'Unstructured photo spam with zero street addresses or ownership proof',
      telegramBullet2: 'Stolen images from foreign websites posing as Addis listings',
      telegramBullet3: 'Anonymous scammers demanding advance Telebirr payments before viewings',
      telegramSecurityLabel: 'Security Level',
      telegramSecurityValue: 'High Risk • 0% Trust',
      delalaTitle: 'Street Brokers (ደላላ)',
      delalaBullet1: 'Forces you to pay a full 1-month rent commission out-of-pocket',
      delalaBullet2: 'Artificially marks up landlord prices to inflate their commission cut',
      delalaBullet3: 'Conceals water rationing schedules and electricity blackout risks',
      delalaCostLabel: 'Financial Toll',
      delalaCostValue: '30K - 85K+ ETB Fee',
      qetabetTitle: 'QetaBet Direct (ቀጣቤት)',
      qetabetSubtitle: 'Homeowner Verified Network',
      qetabetBadge: 'Verified Addis Standard',
      qetabetBullet1: 'Zero Delala Commission: You deal directly with the titleholder',
      qetabetBullet2: 'Rotto Water Tank Tested: Reserve tank volume and pump checked',
      qetabetBullet3: 'Generator Verified: Standby power during city load-shedding',
      qetabetCostLabel: 'Your Cost',
      qetabetCostValue: '0% Broker Fee • Telebirr / Chapa Ready',
    },
    landlordSection: {
      badge: 'For Addis Landlords & Homeowners',
      title: 'Rent Your Property Directly. Keep 100% of the Rent.',
      subtitle:
        'Tired of unreliable brokers demanding kickbacks or misrepresenting your apartment? List on QetaBet, get verified by our Addis inspection team, and connect with serious, pre-screened tenants directly.',
      bullet1: 'Zero broker commission (0% Delala)',
      bullet2: 'Direct Telebirr / Chapa escrow payments',
      bullet3: 'Water tank & power backup badge verification',
      formTitle: 'List Your Property in 2 Minutes',
      formSubtitle: 'Enter your phone number to start direct landlord onboarding.',
      phoneLabel: 'Phone Number (Ethiopia)',
      submitBtn: 'Get Free Landlord Verification',
      fullListingLink: 'Or post your full listing online now with photos →',
      termsNotice:
        'By submitting, you agree to direct tenant communication with zero broker fees.',
      receivedTitle: 'Request Received!',
      receivedDesc:
        'Our Addis Ababa onboarding specialist will call within 2 hours to schedule your free photographic & tank verification visit.',
    },
    newListing: {
      backToRentals: 'Back to all listings',
      pageTitle: 'Post a Verified Addis Property',
      pageSubtitle:
        'Connect directly with genuine tenants. Zero broker fee. Every listing receives a physical verification badge.',
      badge: 'Direct Landlord Submission',
      step1Title: '1. Basic Information',
      step1Subtitle: 'Provide an informative title and overview of your property.',
      listingTitleLabel: 'Listing Title',
      listingTitlePlaceholder: 'e.g. Modern 2BR Apartment in CMC with Water Tank & Generator',
      listingTitleHint: 'Tip: Include neighborhood name and key amenities for better visibility',
      descriptionLabel: 'Description',
      descriptionPlaceholder:
        'Describe the compound, neighborhood, water reliability, security, sunlight, and nearest landmarks...',
      step2Title: '2. Addis Ababa Location',
      step2Subtitle: 'Precise municipal zone and neighborhood.',
      subCityLabel: 'Sub-City (ክፍለ ከተማ)',
      neighborhoodLabel: 'Neighborhood (ሰፈር)',
      landmarkLabel: 'Specific Landmark / Reference',
      landmarkPlaceholder: 'e.g. Near CMC Michael Church or behind Edna Mall',
      step3Title: '3. Pricing & Specs',
      step3Subtitle: 'Transparent Ethiopian Birr monthly rent and room specifications.',
      propertyTypeLabel: 'Property Type',
      monthlyRentLabel: 'Monthly Rent (ETB)',
      depositLabel: 'Advance Deposit Required',
      negotiableCheckbox: 'Price is open to fair negotiation with serious tenants',
      bedroomsLabel: 'Bedrooms',
      bathroomsLabel: 'Bathrooms',
      floorLevelLabel: 'Floor Level',
      furnishingLabel: 'Furnishing Condition',
      step4Title: '4. Addis Living Parameters (Vital Auditing)',
      step4Subtitle: 'Crucial infrastructure required by tenants in Addis Ababa.',
      waterReserveTitle: 'Dedicated Water Reserve Tank (Rotto)',
      waterReserveDesc: 'Installed water tank with booster pump for city rationing resilience',
      generatorTitle: 'Standby Generator Backup',
      generatorDesc: 'Automatic or manual generator during Ethiopian Electric load shedding',
      parkingTitle: 'Dedicated Compound Parking',
      parkingDesc: 'Secure parking space inside gated compound with guard',
      wifiTitle: 'Broadband / Fiber Internet',
      wifiDesc: 'Pre-installed Ethio Telecom fiber or high-speed wireless',
      elevatorTitle: 'Functional Elevator (Lift)',
      elevatorDesc: 'Working building lift with backup power',
      step5Title: '5. High-Resolution Photographs',
      step5Subtitle: 'Authentic photos help your listing get verified and leased 3x faster.',
      clickPresetToAdd: 'Quick Add High-Quality Addis Property Photos:',
      customUrlLabel: 'Or Add Image by Direct URL',
      addPhotoBtn: 'Add Photo',
      step6Title: '6. Landlord Contact & Verification',
      step6Subtitle: 'Direct contact details for tenant inquiries. Zero delala calls.',
      landlordNameLabel: 'Your Full Name / Company',
      landlordNamePlaceholder: 'e.g. Dr. Dawit Yohannes',
      landlordPhoneLabel: 'Direct Ethiopian Phone Number',
      publishBtn: 'Publish Direct Listing (Free)',
      publishingBtn: 'Publishing Property...',
      freeAuditingNotice:
        'By publishing, your listing will be scheduled for immediate physical inspection by our Addis team.',
    },
    footer: {
      tagline:
        'QetaBet is Addis Ababa’s direct-to-landlord rental network. We eliminate extortionate broker (delala) commissions, protect tenants from fake Telegram listings, and verify crucial infrastructure like water reserve tanks and backup generators.',
      livingParameters: 'Built for Addis Ababa Living Parameters',
      majorSubCitiesTitle: 'Major Sub-Cities',
      paymentSupportTitle: 'Payment & Escrow Support',
      telebirrEscrow: 'Telebirr Integrated Escrow',
      chapaBanking: 'Chapa (Cards & Local Banks)',
      verificationNotice: 'Landlord ID & Title Verification',
      addressNotice: 'Addis Ababa, Ethiopia • support@qetabet.et',
      copyright: 'QetaBet Ethiopia. All rights reserved. Zero Broker Fees Guaranteed.',
    },
    propertyTypes: {
      ENTIRE_APARTMENT: 'Entire Apartment',
      STUDIO: 'Studio Apartment',
      PRIVATE_ROOM: 'Private Room',
      SHARED_ROOM: 'Shared Room',
      COMMERCIAL: 'Commercial Space',
    },
    furnishingTypes: {
      FULLY_FURNISHED: 'Fully Furnished',
      SEMI_FURNISHED: 'Semi-Furnished',
      UNFURNISHED: 'Unfurnished',
    },
    locations: {
      Bole: 'Bole',
      Kirkos: 'Kirkos',
      Yeka: 'Yeka',
      'Nifas Silk-Lafto': 'Nifas Silk-Lafto',
      Arada: 'Arada',
      Lideta: 'Lideta',
      'Bole Medhanialem': 'Bole Medhanialem',
      Atlas: 'Atlas',
      Rwanda: 'Rwanda',
      'Bole Bulbula': 'Bole Bulbula',
      Gerji: 'Gerji',
      CMC: 'CMC',
      Summit: 'Summit',
      Kazanchis: 'Kazanchis',
      'Meskel Flower': 'Meskel Flower',
      Olympia: 'Olympia',
      Mexico: 'Mexico',
      Beklobet: 'Beklobet',
      Megenagna: 'Megenagna',
      Signal: 'Signal',
      Kotebe: 'Kotebe',
      'Ferensay Legasion': 'Ferensay Legasion',
      'Yeka Abado': 'Yeka Abado',
      Sarbet: 'Sarbet',
      'Jemo 1': 'Jemo 1',
      'Jemo 3': 'Jemo 3',
      Lebu: 'Lebu',
      'Bisrate Gabriel': 'Bisrate Gabriel',
      Gotera: 'Gotera',
      Piazza: 'Piazza',
      '4 Kilo': '4 Kilo',
      '6 Kilo': '6 Kilo',
      'Arat Kilo Menelik': 'Arat Kilo Menelik',
      'Lideta Condominium': 'Lideta Condominium',
      'Tor Hailoch': 'Tor Hailoch',
      Abenet: 'Abenet',
    },
  },
  am: {
    nav: {
      brandSubtitle: 'የተረጋገጡ የአዲስ አበባ የቤት ኪራዮች • 0% የደላላ ክፍያ',
      zeroDelala: 'ያለ ደላላ ኮሚሽን (0% ደላላ)',
      waterPower: 'ውሃና መብራት የተረጋገጠ',
      telebirrChapa: 'በቴሌብር እና ቻፓ አስተማማኝ ክፍያ',
      listProperty: 'ቤት ያስመዝግቡ',
      adminDashboard: 'አድሚን ፖርታል',
      allRentals: 'ሁሉም ቤቶች',
      selectLanguage: 'ቋንቋ',
    },
    hero: {
      antiBrokerBadge: 'የቴሌግራም ማጭበርበር የለም • 0% የደላላ ክፍያ (ደላላ የለም)',
      headingMain: 'የተረጋገጡ የአዲስ አበባ ቤቶች።',
      headingAccent: 'ቀጥታ ከቤት ባለቤቶች።',
      headingSub:
        'የሀሰት ማስታወቂያዎችን እና ደላሎችን ያስወግዱ። በቃጣቤት ላይ የሚገኙ ሁሉም ቤቶች የሮቶ ውሃ ታንከር፣ ተጠባባቂ ጀነሬተር እና ተመጣጣኝ ወርሃዊ የኪራይ ዋጋ በአካል ተፈትሸው የተረጋገጡ ናቸው።',
      waterFilterBtn: 'ሮቶ የውሃ ታንከር የተረጋገጠ',
      genFilterBtn: 'ተጠባባቂ ጀነሬተር ያለው',
      vettedBadge: 'የባለቤትነት ማረጋገጫና መታወቂያ የተረጋገጠ',
      metric1Label: 'የደላላ ኮሚሽን',
      metric1Value: '0 ብር',
      metric1Sub: '100% ቀጥታ ከባለቤቶች',
      metric2Label: 'የውሃ ዋስትና',
      metric2Value: 'ሮቶ ታንከሮች',
      metric2Sub: 'የውሃ እጥረትን ለመቋቋም የተፈተሸ',
      metric3Label: 'አስተማማኝ ክፍያ',
      metric3Value: 'ቴሌብር እና ቻፓ',
      metric3Sub: 'ደህንነቱ የተጠበቀ ማስያዣ',
      metric4Label: 'የተካተቱ ክፍለ ከተሞች',
      metric4Value: '6 ክፍለ ከተሞች',
      metric4Sub: 'ቦሌ፣ ቂርቆስ፣ የካ እና ሌሎችም',
    },
    explorer: {
      searchPlaceholder: 'ቦሌ፣ ሲኤምሲ፣ ካዛንቺስ፣ ባቡር ጣቢያ፣ 2 መኝታ ፈልግ...',
      filterButton: 'ማጣሪያዎች',
      allAddis: 'መላው አዲስ አበባ',
      waterTankBadge: 'የውሃ ታንከር (ሮቶ)',
      generatorBadge: 'ጀነሬተር',
      parkingBadge: 'መኪና ማቆሚያ',
      showingResults: 'የተረጋገጡ ቤቶች በአዲስ አበባ',
      sortNewest: 'አዲስ የተጨመሩ',
      sortPriceAsc: 'ዋጋ፡ ከዝቅተኛ ወደ ከፍተኛ',
      sortPriceDesc: 'ዋጋ፡ ከከፍተኛ ወደ ዝቅተኛ',
      activeFiltersCount: 'ማጣሪያዎች ተመርጠዋል',
      clearFilters: 'ሁሉንም አፅዳ',
      noListingsFound: 'ከፍለጋዎ ጋር የሚዛመድ ቤት አልተገኘም',
      noListingsDesc:
        'እባክዎ የዋጋ ክልልዎን፣ የተመረጠውን ክፍለ ከተማ ወይም የተለዩ መገልገያዎችን በማስተካከል ደግመው ይሞክሩ።',
      resetFiltersBtn: 'ማጣሪያዎችን ዳግም አስጀምር',
      verifiedProperties: 'የተረጋገጡ ቤቶች',
    },
    drawer: {
      filterTitle: 'ቤቶችን ማጣሪያ',
      clearAll: 'ሁሉንም አፅዳ',
      subCitySection: 'ክፍለ ከተማ',
      allSubCities: 'ሁሉም ክፍለ ከተሞች',
      neighborhoodSection: 'ሰፈር / አካባቢ',
      allNeighborhoods: 'ሁሉም ሰፈሮች',
      propertyTypeSection: 'የቤት ዓይነት',
      allPropertyTypes: 'ሁሉም ዓይነቶች',
      priceRangeSection: 'ወርሃዊ በጀት (በብር)',
      minRentPlaceholder: 'ዝቅተኛ ብር (ምሳሌ፡ 15,000)',
      maxRentPlaceholder: 'ከፍተኛ ብር (ምሳሌ፡ 60,000)',
      bedroomsSection: 'የመኝታ ክፍሎች ብዛት',
      anyBedrooms: 'ማንኛውም',
      vitalAmenitiesSection: 'ዋና ዋና የአዲስ አበባ መገልገያዎች',
      waterReserveLabel: 'የውሃ መያዣ ታንከር (ሮቶ)',
      waterReserveSub: 'የአዲስ አበባን የውሃ ፈረቃ ለመቋቋም የተረጋገጠ',
      generatorLabel: 'ተጠባባቂ ጀነሬተር',
      generatorSub: 'የኤሌክትሪክ ኃይል ሲቋረጥ አውቶማቲክ መብራት',
      parkingLabel: 'የግቢ መኪና ማቆሚያ',
      parkingSub: 'ጥበቃ ባለው ግቢ ውስጥ ደህንነቱ የተጠበቀ',
      wifiLabel: 'ፈጣን ዋይፋይ / ኢንተርኔት',
      wifiSub: 'የኢትዮ ቴሌኮም ፋይበር ወይም ፈጣን ኔትወርክ',
      elevatorLabel: 'አሳንሰር (ሊፍት)',
      elevatorSub: 'በአስተማማኝ ሁኔታ የሚሰራ ሊፍት',
      applyFiltersBtn: 'ማጣሪያዎችን ተግብር',
      viewMatches: 'ውጤቶችን አሳይ',
    },
    card: {
      perMonth: '/ በወር',
      depositOneMonth: 'የ1 ወር ቅድመ ዋስትና',
      depositMonths: 'ወር ቅድመ ዋስትና',
      negotiable: 'ይደራደራል',
      fixedPrice: 'ቋሚ ዋጋ',
      bed: 'መኝታ',
      beds: 'መኝታ',
      bath: 'መታጠቢያ',
      baths: 'መታጠቢያ',
      floor: 'ፎቅ',
      groundFloor: 'ምድር ቤት',
      viewDetails: 'ዝርዝሩን እይ',
      callDirect: 'ለባለቤቱ ደውል',
      waterGuaranteed: 'ሮቶ ታንከር',
      generatorReady: 'ጀነሬተር',
      parkingIncluded: 'ፓርኪንግ',
      verifiedDirectBadge: 'ቀጥታ የተረጋገጠ',
    },
    details: {
      backToListings: 'ወደ ሁሉም ቤቶች ተመለስ',
      viewsCount: 'እይታዎች',
      verifiedHomeownerBadge: 'የተረጋገጠ የቤት ባለቤት',
      vitalAuditTitle: 'የአዲስ አበባ መሰረታዊ የመኖሪያ ፍተሻ',
      vitalAuditSubtitle: 'በቀጣቤት ባለሙያዎች በአካል ተጎብኝቶ የተረጋገጠ',
      waterTankAuditTitle: 'የውሃ ማጠራቀሚያ ታንከር',
      waterTankAuditHas:
        'ተጨማሪ የሮቶ ውሃ ታንከር ከፓምፕ ጋር የተገጠመለት። የከተማዋን የውሃ ፈረቃ ያለምንም እንከን ይቋቋማል።',
      waterTankAuditNo: 'ተጨማሪ የውሃ ታንከር የለውም። መደበኛ የመንግስት መስመር ብቻ።',
      generatorAuditTitle: 'ተጠባባቂ የኤሌክትሪክ ጀነሬተር',
      generatorAuditHas:
        'የኤሌክትሪክ መብራት ሲቋረጥ አውቶማቲክ የሚሰራ ጠንካራ የህንጻ ጀነሬተር ተገጥሞለታል።',
      generatorAuditNo: 'ተጠባባቂ ጀነሬተር የለውም።',
      parkingAuditTitle: 'የግቢ መኪና ማቆሚያ',
      parkingAuditHas:
        'በአስተማማኝ አጥር እና 24/7 የጥበቃ ሰራተኛ ባለው ግቢ ውስጥ የተመደበ የመኪና ማቆሚያ።',
      parkingAuditNo: 'የመንገድ ዳር ማቆሚያ ብቻ።',
      wifiAuditTitle: 'ዋይፋይ / ፋይበር ኢንተርኔት',
      wifiAvailable: 'አለው',
      wifiNotIncluded: 'የለውም',
      elevatorAuditTitle: 'የህንጻው ሊፍት (አሳንሰር)',
      elevatorFunctional: 'በጥሩ ሁኔታ ይሰራል',
      elevatorStairsOnly: 'ደረጃ ብቻ',
      aboutPropertyTitle: 'ስለ ቤቱ ዝርዝር መረጃ',
      landlordCardTitle: 'የተረጋገጠ የቤት ባለቤት • ምንም ደላላ የለም',
      landlordVerifiedBadge: 'ትክክለኛ የቤት ባለቤት',
      phoneVerifiedBadge: 'ስልክ ቁጥር የተረጋገጠ',
      perMonth: 'በወር',
      depositMonth: 'ወር',
      depositMonths: 'ወራት',
      priceNegotiable: 'ከባለቤቱ ጋር የሚደራደር',
      priceFixed: 'ቋሚ ዋጋ',
      brokerSavingsTitle: 'የሚድኑት ገንዘብ',
      brokerSavingsDesc:
        'በቀጣቤት በቀጥታ በመከራየት ለደላላ የሚከፈለውን የሙሉ አንድ ወር ክፍያ ይቆጥባሉ።',
      callLandlordBtn: 'ለቤት ባለቤቱ ይደውሉ',
      sendMessageBtn: 'ቀጥታ መልእክት ይላኩ / ለመጎብኘት ይያዙ',
      reserveDepositBtn: 'በቴሌብር ወይም በቻፓ ያስይዙ',
      trustPoint1: 'የባለቤትነት ህጋዊ ሰነዶች እና መታወቂያ በአካል የተፈተሹ',
      trustPoint2: 'ምንም አይነት የተደበቀ የደላላ ክፍያ ወይም ኮሚሽን የለም',
    },
    inquiry: {
      directContactBadge: 'ቀጥታ ከቤት ባለቤቱ ጋር (0% ደላላ)',
      contactTitle: 'የቤት ባለቤቱን ያነጋግሩ',
      fullNameLabel: 'ሙሉ ስምዎ',
      fullNamePlaceholder: 'ምሳሌ፡ አልማዝ በቀለ',
      phoneLabel: 'ስልክ ቁጥርዎ',
      phonePlaceholder: '+251 91 234 5678',
      messageLabel: 'ለቤት ባለቤቱ የሚላክ መልእክት',
      sendBtn: 'ቀጥታ መልእክት ላክ',
      sendingBtn: 'በመላክ ላይ...',
      directCallBtn: 'ቀጥታ ደውል',
      successTitle: 'መልእክትዎ በተሳካ ሁኔታ ተልኳል!',
      successDesc:
        'ጥያቄዎ በቀጥታ ለተረጋገጠው የቤት ባለቤት ደርሷል። በስልክ ጥሪ ወይም በአጭር የጽሁፍ መልእክት ያነጋግሩዎታል።',
      callNowBtn: 'አሁን ይደውሉ',
      closeBtn: 'ዝጋ',
      errorPhone: 'እባክዎ ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ (ምሳሌ፡ +251 91...)',
      errorSend: 'መልእክቱን መላክ አልተቻለም። እባክዎ በቀጥታ ይደውሉ።',
      defaultMessageTemplate:
        'ሰላም፣ በቃጣቤት ላይ ያስመዘገቡትን ቤት ተመልክቼ ቤቱን በአካል ለመጎብኘት ፈልጌ ነበር።',
    },
    payment: {
      title: 'ደህንነቱ የተጠበቀ ቀጥታ ማስያዣ',
      subtitle: 'ያለ ደላላ ኮሚሽን ቤቱን ያስይዙ። ገንዘብዎ በአስተማማኝ ሁኔታ ይጠበቃል።',
      holdingReservation: 'ቤቱን የማስያዣ ቅድመ ክፍያ',
      deductedNotice: 'ከመጀመሪያው ወር ኪራይ ላይ የሚቀነስ',
      selectGatewayLabel: 'የክፍያ አማራጭ ይምረጡ',
      telebirrSub: 'የኢትዮ ቴሌኮም ሞባይል ገንዘብ',
      chapaSub: 'ንግድ ባንክ / ዳሽን / አዋሽ / ካርዶች',
      phoneLabel: 'ክፍያው የሚፈጸምበት ስልክ ቁጥር',
      encryptionBadge: 'በ256-ቢት ምስጠራ የተጠበቀ። ለቤት ባለቤቱ ወዲያውኑ መልእክት ይደርሳል።',
      payBtn: 'ይክፈሉ',
      authorizingBtn: 'በማረጋገጥ ላይ...',
      successBadge: 'ማስያዣው ተረጋግጧል • 0% ደላላ',
      successTitle: 'የማስያዣ ክፍያዎ ተሳክቷል!',
      txRefLabel: 'የግብይት መለያ (Ref):',
      methodLabel: 'የክፍያ ዘዴ:',
      amountPaidLabel: 'የተከፈለው መጠን:',
      statusLabel: 'ሁኔታ:',
      holdingNotice:
        'ይህ ቤት ለእርስዎ ጉብኝት ተይዟል። ለቤት ባለቤቱ በአጭር የጽሁፍ መልእክት ማሳወቂያ ተልኳል።',
      doneBtn: 'ተጠናቋል',
      errorPhone: 'እባክዎ ለቴሌብር/ቻፓ ማረጋገጫ ኮድ የሚሆን ስልክ ቁጥር ያስገቡ።',
      errorFailed: 'ክፍያውን ማከናወን አልተቻለም። እባክዎ ደግመው ይሞክሩ።',
    },
    market: {
      badge: 'ለምን ቀጣቤት?',
      title: 'የአዲስ አበባን የኪራይ ውጣ ውረድ እንፈታለን',
      subtitle: 'ያልተረጋገጡ የቴሌግራም ቻናሎችን፣ የጎዳና ላይ ደላሎችን እና የቀጣቤት አስተማማኝ አሰራርን ያወዳድሩ።',
      telegramTitle: 'ያልተረጋገጡ የቴሌግራም ቻናሎች',
      telegramBullet1: 'ትክክለኛ አድራሻ እና የባለቤትነት ማረጋገጫ የሌላቸው የተዝረከረኩ ፎቶዎች',
      telegramBullet2: 'ከውጭ ሀገር ድረ-ገጾች የተሰረቁ ምስሎችን እንደ አዲስ አበባ ቤት አድርጎ ማቅረብ',
      telegramBullet3: 'ቤቱን ሳያሳዩ በቅድሚያ በቴሌብር ገንዘብ የሚጠይቁ ማንነታቸው ያልታወቁ አጭበርባሪዎች',
      telegramSecurityLabel: 'የደህንነት ደረጃ',
      telegramSecurityValue: 'ከፍተኛ አደጋ • 0% እምነት',
      delalaTitle: 'የጎዳና ላይ ደላሎች',
      delalaBullet1: 'ሙሉ የአንድ ወር የኪራይ ዋጋ ኮሚሽን ከኪስዎ እንዲከፍሉ ያስገድዳሉ',
      delalaBullet2: 'ኮሚሽናቸውን ለማሳደግ የቤት ባለቤቱ ከጠየቀው በላይ ዋጋ ይጨምራሉ',
      delalaBullet3: 'የውሃ መጥፋት ፈረቃን እና የመብራት መቆራረጥ እውነታን ይደብቃሉ',
      delalaCostLabel: 'የገንዘብ ኪሳራ',
      delalaCostValue: 'ከ30 ሺህ - 85 ሺህ+ ብር ክፍያ',
      qetabetTitle: 'ቀጣቤት ቀጥታ (QetaBet)',
      qetabetSubtitle: 'የተረጋገጡ የቤት ባለቤቶች መረብ',
      qetabetBadge: 'የተረጋገጠው የአዲስ አበባ መመዘኛ',
      qetabetBullet1: '0% የደላላ ክፍያ፡ በቀጥታ ከህጋዊው የቤት ባለቤት ጋር ይገናኛሉ',
      qetabetBullet2: 'ሮቶ ታንከር የተፈተሸ፡ የውሃ ማጠራቀሚያው መጠን እና ፓምፑ በአካል የተረጋገጠ',
      qetabetBullet3: 'ጀነሬተር የተረጋገጠ፡ የኤሌክትሪክ ኃይል ሲቋረጥ አስተማማኝ መብራት',
      qetabetCostLabel: 'የእርስዎ ወጪ',
      qetabetCostValue: '0% የደላላ ኮሚሽን • በቴሌብር / ቻፓ ዝግጁ',
    },
    landlordSection: {
      badge: 'ለአዲስ አበባ የቤት ባለቤቶች',
      title: 'ቤትዎን በቀጥታ ያከራዩ። ሙሉ ኪራይዎን ለራስዎ ያስቀሩ።',
      subtitle:
        'ተጨማሪ ገንዘብ ከሚጠይቁ ወይም የቤትዎን ገጽታ ከሚያበላሹ ደላሎች ተገላግለዋል? ቤትዎን በቀጣቤት ላይ ያስመዝግቡ፣ በባለሙያዎቻችን በነጻ ያስመርምሩ እና እውነተኛ ተከራዮችን በቀጥታ ያግኙ።',
      bullet1: 'ምንም የደላላ ኮሚሽን የለም (0% ደላላ)',
      bullet2: 'ቀጥታ በቴሌብር እና ቻፓ ክፍያዎን ይቀበሉ',
      bullet3: 'የውሃ ታንከር እና የጀነሬተር ማረጋገጫ ባጅ',
      formTitle: 'ቤትዎን በ2 ደቂቃ ውስጥ ያስመዝግቡ',
      formSubtitle: 'የቤት ባለቤትነት ምዝገባን ለመጀመር ስልክ ቁጥርዎን ያስገቡ።',
      phoneLabel: 'ስልክ ቁጥር (ኢትዮጵያ)',
      submitBtn: 'ነጻ የቤት ፍተሻ እና ማረጋገጫ ያግኙ',
      fullListingLink: 'ወይም ሙሉ የቤት መረጃዎችን እና ፎቶዎችን አሁን ይሙሉ →',
      termsNotice: 'ይህንን ሲልኩ ያለ ደላላ ጣልቃ ገብነት ከተከራይ ጋር በቀጥታ ለመገናኘት ይስማማሉ።',
      receivedTitle: 'ጥያቄዎ ደርሶናል!',
      receivedDesc:
        'የአዲስ አበባ ባለሙያችን የነጻ ፎቶ እና የውሃ ታንከር ፍተሻ ቀጠሮ ለመያዝ በ2 ሰዓት ውስጥ ይደውልልዎታል።',
    },
    newListing: {
      backToRentals: 'ወደ ሁሉም ቤቶች ተመለስ',
      pageTitle: 'የተረጋገጠ የአዲስ አበባ ቤት ያስመዝግቡ',
      pageSubtitle:
        'ያለ ደላላ ኮሚሽን ከእውነተኛ ተከራዮች ጋር በቀጥታ ይገናኙ። እያንዳንዱ የተመዘገበ ቤት የአካል ፍተሻ ባጅ ያገኛል።',
      badge: 'ቀጥታ የቤት ባለቤት ምዝገባ',
      step1Title: '1. አጠቃላይ መረጃ',
      step1Subtitle: 'ለቤትዎ ገላጭ ርዕስ እና አጭር መግለጫ ይስጡ።',
      listingTitleLabel: 'የቤቱ ስያሜ / ርዕስ',
      listingTitlePlaceholder: 'ምሳሌ፡ ዘመናዊ ባለ 2 መኝታ አፓርትመንት በሲኤምሲ ከሮቶ ታንከርና ጀነሬተር ጋር',
      listingTitleHint: 'ጠቃሚ ምክር፡ ተከራዮች በቀላሉ እንዲያገኙት ሰፈሩን እና ዋና ዋና መገልገያዎችን በርዕሱ ላይ ያካትቱ',
      descriptionLabel: 'የቤቱ ዝርዝር መግለጫ',
      descriptionPlaceholder:
        'ስለ ግቢው፣ ስለ ሰፈሩ፣ ስለ ውሃው አስተማማኝነት፣ ስለ ጥበቃው እና ስለሚቀርቡት ታዋቂ ቦታዎች ያብራሩ...',
      step2Title: '2. የአዲስ አበባ አድራሻ',
      step2Subtitle: 'ትክክለኛውን ክፍለ ከተማ እና ሰፈር ይምረጡ።',
      subCityLabel: 'ክፍለ ከተማ',
      neighborhoodLabel: 'ሰፈር / አካባቢ',
      landmarkLabel: 'ታዋቂ መለያ ቦታ / ምልክት',
      landmarkPlaceholder: 'ምሳሌ፡ ሲኤምሲ ሚካኤል ቤተክርስቲያን አጠገብ ወይም ከኤድና ሞል ጀርባ',
      step3Title: '3. የኪራይ ዋጋ እና ዝርዝር መረጃ',
      step3Subtitle: 'ግልጽ የሆነ ወርሃዊ የብር ክፍያ እና የክፍሎች ብዛት።',
      propertyTypeLabel: 'የቤት ዓይነት',
      monthlyRentLabel: 'ወርሃዊ ኪራይ (በብር)',
      depositLabel: 'የቅድመ ማስያዣ ክፍያ',
      negotiableCheckbox: 'ዋጋው ከእውነተኛ ተከራይ ጋር በውይይት ይደራደራል',
      bedroomsLabel: 'የመኝታ ክፍሎች',
      bathroomsLabel: 'የመታጠቢያ ቤቶች',
      floorLevelLabel: 'የፎቅ ደረጃ',
      furnishingLabel: 'የእቃ ሁኔታ',
      step4Title: '4. የአዲስ አበባ ወሳኝ መገልገያዎች (መሰረታዊ ፍተሻ)',
      step4Subtitle: 'በአዲስ አበባ ተከራዮች በጣም የሚፈልጓቸው ወሳኝ መገልገያዎች።',
      waterReserveTitle: 'የውሃ ማጠራቀሚያ ታንከር (ሮቶ)',
      waterReserveDesc: 'የውሃ እጥረትን ለመቋቋም የተገጠመ የሮቶ ታንከር ከፓምፕ ጋር',
      generatorTitle: 'ተጠባባቂ ጀነሬተር',
      generatorDesc: 'መብራት ሲጠፋ አውቶማቲክ የሚሰራ የመብራት ማመንጫ',
      parkingTitle: 'የግቢ መኪና ማቆሚያ',
      parkingDesc: 'ጥበቃ ባለው አስተማማኝ ግቢ ውስጥ የተመደበ ማቆሚያ',
      wifiTitle: 'ፈጣን ፋይበር / ዋይፋይ ኢንተርኔት',
      wifiDesc: 'የተገጠመ የኢትዮ ቴሌኮም ፈጣን ኢንተርኔት',
      elevatorTitle: 'የህንጻ አሳንሰር (ሊፍት)',
      elevatorDesc: 'በአስተማማኝ ሁኔታ የሚሰራ እና የመብራት አማራጭ ያለው ሊፍት',
      step5Title: '5. ጥራት ያላቸው ፎቶዎች',
      step5Subtitle: 'ጥራት ያላቸው ፎቶዎች ቤትዎ በፍጥነት እንዲረጋገጥ እና 3 እጥፍ ፈጥኖ እንዲከራይ ይረዳሉ።',
      clickPresetToAdd: 'የተዘጋጁ ጥራት ያላቸው የአዲስ አበባ ፎቶዎችን ይምረጡ:',
      customUrlLabel: 'ወይም የቀጥታ ፎቶ ማስፈንጠሪያ (URL) ያስገቡ',
      addPhotoBtn: 'ፎቶ ጨምር',
      step6Title: '6. የባለቤቱ አድራሻ እና ማረጋገጫ',
      step6Subtitle: 'ከተከራዮች ጋር በቀጥታ የሚገናኙበት ስልክ። ምንም ደላላ አይደውልልዎትም።',
      landlordNameLabel: 'ሙሉ ስምዎ',
      landlordNamePlaceholder: 'ምሳሌ፡ ዶ/ር ዳዊት ዮሐንስ',
      landlordPhoneLabel: 'የኢትዮጵያ ስልክ ቁጥርዎ',
      publishBtn: 'ቤቱን በነጻ ያስመዝግቡ',
      publishingBtn: 'በማስመዝገብ ላይ...',
      freeAuditingNotice: 'ይህንን ቅጽ ሲልኩ ቤትዎ በአዲስ አበባ ቡድናችን በአካል እንዲጎበኝ እና እንዲረጋገጥ ይመደባል።',
    },
    footer: {
      tagline:
        'ቀጣቤት የአዲስ አበባ የቀጥታ የቤት ኪራይ መረብ ነው። አላስፈላጊ የደላላ ክፍያዎችን እናስወግዳለን፣ ተከራዮችን ከሀሰተኛ የቴሌግራም ማስታወቂያዎች እንጠብቃለን፣ እንዲሁም እንደ ሮቶ የውሃ ታንከር እና ጀነሬተር ያሉ ወሳኝ መገልገያዎችን በአካል አረጋግጠን እናቀርባለን።',
      livingParameters: 'ለአዲስ አበባ የኑሮ ሁኔታ በሚመጥን መልኩ የተገነባ',
      majorSubCitiesTitle: 'ዋና ዋና ክፍለ ከተሞች',
      paymentSupportTitle: 'ክፍያ እና ድጋፍ',
      telebirrEscrow: 'በቴሌብር አስተማማኝ ክፍያ',
      chapaBanking: 'ቻፓ (ባንኮች እና ካርዶች)',
      verificationNotice: 'የባለቤትነትና መታወቂያ ማረጋገጫ',
      addressNotice: 'አዲስ አበባ፣ ኢትዮጵያ • support@qetabet.et',
      copyright: 'ቀጣቤት ኢትዮጵያ። መብቱ በህግ የተጠበቀ ነው። 0% የደላላ ክፍያ ዋስትና።',
    },
    propertyTypes: {
      ENTIRE_APARTMENT: 'ሙሉ አፓርትመንት',
      STUDIO: 'ስቱዲዮ አፓርትመንት',
      PRIVATE_ROOM: 'የግል መኝታ ክፍል',
      SHARED_ROOM: 'የጋራ ክፍል',
      COMMERCIAL: 'የንግድ ቦታ',
    },
    furnishingTypes: {
      FULLY_FURNISHED: 'ሙሉ እቃ የተሟላለት',
      SEMI_FURNISHED: 'ከፊል እቃ ያለው',
      UNFURNISHED: 'እቃ የሌለው',
    },
    locations: {
      Bole: 'ቦሌ',
      Kirkos: 'ቂርቆስ',
      Yeka: 'የካ',
      'Nifas Silk-Lafto': 'ንፋስ ስልክ ላፍቶ',
      Arada: 'አራዳ',
      Lideta: 'ልደታ',
      'Bole Medhanialem': 'ቦሌ መድኃኔዓለም',
      Atlas: 'አትላስ',
      Rwanda: 'ሩዋንዳ',
      'Bole Bulbula': 'ቦሌ ቡልቡላ',
      Gerji: 'ገርጂ',
      CMC: 'ሲኤምሲ',
      Summit: 'ሰሚት',
      Kazanchis: 'ካዛንቺስ',
      'Meskel Flower': 'መስቀል ፍላወር',
      Olympia: 'ኦሊምፒያ',
      Mexico: 'ሜክሲኮ',
      Beklobet: 'በቀሎ ቤት',
      Megenagna: 'መገናኛ',
      Signal: 'ሲግናል',
      Kotebe: 'ኮተቤ',
      'Ferensay Legasion': 'ፈረንሳይ ለጋሲዮን',
      'Yeka Abado': 'የካ አባዶ',
      Sarbet: 'ሳርቤት',
      'Jemo 1': 'ጀሞ 1',
      'Jemo 3': 'ጀሞ 3',
      Lebu: 'ለቡ',
      'Bisrate Gabriel': 'ብስራተ ገብርኤል',
      Gotera: 'ጎተራ',
      Piazza: 'ፒያሳ',
      '4 Kilo': '4 ኪሎ',
      '6 Kilo': '6 ኪሎ',
      'Arat Kilo Menelik': '4 ኪሎ ምኒልክ',
      'Lideta Condominium': 'ልደታ ኮንዶሚኒየም',
      'Tor Hailoch': 'ጦር ኃይሎች',
      Abenet: 'አበነት',
    },
  },
};
