import {
  getAdminStats,
  getAllListingsAdmin,
  getAllInquiriesAdmin,
  getAllPaymentsAdmin,
} from '@/actions/admin';
import {
  AdminDashboardClient,
  AdminListing,
  AdminInquiry,
  AdminPayment,
} from './admin-dashboard-client';

export const revalidate = 0; // Dynamic fresh admin data

export default async function AdminPage() {
  const [stats, listings, inquiries, payments] = await Promise.all([
    getAdminStats(),
    getAllListingsAdmin(),
    getAllInquiriesAdmin(),
    getAllPaymentsAdmin(),
  ]);

  return (
    <AdminDashboardClient
      stats={stats}
      initialListings={listings as unknown as AdminListing[]}
      inquiries={inquiries as unknown as AdminInquiry[]}
      payments={payments as unknown as AdminPayment[]}
    />
  );
}
