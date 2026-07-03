'use client';

interface NavBoxProps {
  children: React.ReactNode;
  isActive?: boolean;
}

export default function NavBox({ children, isActive }: NavBoxProps) {
  return (
    <div
      className={`
        group relative z-1
        rounded-t-2xl overflow-hidden
        border border-deepest
        bg-background
        p-0
        shadow-panel
        transition-[padding,box-shadow] duration-200 ease-out
        hover:shadow-glow
        hover:z-10
        ${isActive
          ? 'border-b-background'
          : 'border-b-deepest hover:bg-accent hover:border-accent'
        }
      `}
    >
      {children}
    </div>
  );
}
