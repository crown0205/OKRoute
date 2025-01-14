import { PropsWithChildren } from 'react';

function InfoMessage({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row gap-2 items-start">
      <span className="mt-1">⚠️</span>
      <span className="text-sm whitespace-pre-line break-keep text-[#000] dark:text-white">
        {children}
      </span>
    </div>
  );
}

export default InfoMessage;
