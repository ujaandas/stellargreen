interface MainContentBlockProps {
  children: React.ReactNode;
}

export default function MainContentBlock({ children }: MainContentBlockProps) {
  return (
    <div className="relative shadow-xl border-t-[16px] border-b-[16px] border-transparent h-full w-full">
      <div className="absolute inset-0 rounded-lg overflow-hidden h-full w-full">
        {children}
      </div>
    </div>
  );
}
