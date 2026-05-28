import SidebarLayout from '@/components/layout/SidebarLayout'

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>
}
