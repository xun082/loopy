import Header from '@/components/business/header';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex justify-center bg-[#f4f5f5] dark:bg-[#121212]">
        <div className="max-w-[1440px] w-full px-4">{children}</div>
      </div>
    </div>
  );
}
