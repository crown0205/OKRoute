'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import Circle from './Circle';

interface DescriptionSectionProps {
  title: string;
  description: string[];
}

function DescriptionSection({ title, description }: DescriptionSectionProps) {
  const [isShow, setIsShow] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2 w-[50%] p-2 border-[1px] border-[#cacaca] rounded-md">
      <div className="flex flex-row items-center flex-1 gap-2">
        <button className="py-1" onClick={() => setIsShow(!isShow)}>
          <BiSolidDownArrow
            className={cn(
              'text-[#000] transition-transform duration-200',
              isShow ? '-rotate-90' : '',
            )}
          />
        </button>
        <span className="text-sm text-[#000] whitespace-pre-line font-bold">
          {title}
        </span>
      </div>

      {isShow && (
        <div className={cn('flex flex-col gap-2 flex-1 pl-4')}>
          {description.map(desc => (
            <div key={desc} className="flex flex-row items-center">
              <Circle className="dark:bg-[#000] mr-2" />
              <span className="text-sm text-gray-500 whitespace-pre-line break-keep ">
                {desc}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DescriptionSection;
