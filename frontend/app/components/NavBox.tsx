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
        border border-[#0f005c]
        bg-[#300a86]
        p-0
        shadow-[0_0_10px_rgba(0,0,0,0.25)]
        transition-[padding,box-shadow] duration-200 ease-out
        hover:shadow-[0_0_14px_rgba(167,255,4,0.2)]
        hover:z-10
        ${isActive
          ? 'border-b-[#300a86]'
          : 'border-b-[#0f005c] hover:bg-[#a7ff04] hover:border-[#a7ff04]'
        }
      `}
    >
      {children}
    </div>
  );
}
