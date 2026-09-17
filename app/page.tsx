import { getFilteredListings, getSubCitiesWithNeighborhoods } from '@/actions/listings';
import { ListingsExplorer, ListingItem } from '@/components/listings-explorer';
import { AddisMarketInfo } from '@/components/addis-market-info';
import { PostListingSection } from '@/components/post-listing-section';

export const revalidate = 0; // Dynamic rendering for fresh database results

export default async function HomePage() {
  // Fetch initial listings and Addis Ababa sub-cities from database
  const [listingsData, subCities] = await Promise.all([
    getFilteredListings({ limit: 24 }),
    getSubCitiesWithNeighborhoods(),
  ]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Interactive Listings Explorer with sticky search, mobile filter drawer, and responsive grid */}
      <ListingsExplorer
        initialListings={listingsData.items as unknown as ListingItem[]}
        subCities={subCities}
        totalInitial={listingsData.pagination.total}
      />

      {/* Comparison section: Telegram chaos vs Delalas vs QetaBet */}
      <AddisMarketInfo />

      {/* Landlord onboarding direct form */}
      <PostListingSection />
    </div>
  );
}
