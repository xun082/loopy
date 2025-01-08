import Header from '@/components/business/Header';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f5f5] dark:bg-[#121212]">
      <Header />
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-[1160px] mx-auto px-4">{children}</div>
      </div>
    </div>
  );
}
