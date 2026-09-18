import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getListingBySlug } from '@/actions/listings';
import { ListingViewClient, ListingDetailData } from './listing-view-client';

interface ListingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    return {
      title: 'Listing Not Found | QetaBet ቀጣቤት',
    };
  }

  return {
    title: `${listing.title} | QetaBet ቀጣቤት`,
    description: `${listing.neighborhood.name}, ${listing.neighborhood.subCity.name} - ${listing.monthlyRent} ETB/month. Direct verified rental without delala commission. የተረጋገጠ የቤት ኪራይ ያለ ደላላ።`,
  };
}

export default async function ListingDetailPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  return <ListingViewClient listing={listing as unknown as ListingDetailData} />;
}
