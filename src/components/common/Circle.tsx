import { twMerge } from 'tailwind-merge';

interface CircleProps {
  className?: string;
}

function Circle({ className }: CircleProps) {
  return (
    <span
      className={twMerge(
        'min-w-[5px] min-h-[5px] rounded-md bg-[#000] dark:bg-[#fff]',
        className,
      )}
    />
  );
}

export default Circle;
