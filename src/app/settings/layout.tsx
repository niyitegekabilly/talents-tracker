import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | VJN Talent Track',
  description: 'Manage your application settings and preferences',
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 