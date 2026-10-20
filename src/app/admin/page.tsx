import { AdminLayout } from '@/components/admin/AdminLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tasmoda Studio Command — Merchant Intelligence & Spatial Merchandising',
  description: 'Manage luxury home decor inventory, lookbook room hotspots, and white-glove order dispatch.',
};

export default function AdminPage() {
  return <AdminLayout />;
}
