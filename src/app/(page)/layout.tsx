import Header from '@/components/business/header';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-[#f4f5f5] dark:bg-[#121212]">{children}</div>
    </div>
  );
}
