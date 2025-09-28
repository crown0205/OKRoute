import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
interface CardLayoutProps extends PropsWithChildren {
  className?: string;
}

function CardLayout({ children, className }: CardLayoutProps) {
  return (
    <div
      className={cn(
        `flex flex-col gap-2 mt-4 mb-2 p-4 bg-[#f3f3f3] rounded-md`,
        className,
      )}
    >
      {children}
    </div>
  );
}

export default CardLayout;
