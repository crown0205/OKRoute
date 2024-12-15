import { PropsWithChildren } from 'react';

interface InfoMessageProps extends PropsWithChildren {}

function InfoMessage({ children }: InfoMessageProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      ⚠️
      <span className="text-sm whitespace-pre-line break-keep">
        {children}
      </span>
    </div>
  );
}

export default InfoMessage;



