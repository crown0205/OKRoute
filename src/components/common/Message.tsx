import { PropsWithChildren } from 'react';

function InfoMessage({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row gap-2 items-center">
      ⚠️
      <span className="text-sm whitespace-pre-line break-keep text-[#000]">
        {children}
      </span>
    </div>
  );
}

function GoalMessage({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row gap-2 items-center">
      💡
      <span className="text-sm whitespace-pre-line break-keep text-[#000]">
        {children}
      </span>
    </div>
  );
}

export { GoalMessage, InfoMessage };
