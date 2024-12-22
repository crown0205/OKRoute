import { cn } from '@/lib/utils';
import { useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import { CardLayout, Title } from '../common';

interface IOKR {
  id: string;
  objective: string;
  keyResults: { value: string; isChecked: boolean; paddingLeft: number }[];
  isShowOKR: boolean;
}

const OKR_INITIAL_STATE = {
  objective: '',
  keyResults: [
    { value: '', isChecked: false, paddingLeft: 0 },
    { value: '', isChecked: false, paddingLeft: 0 },
  ],
  isShowOKR: true,
};

//  특정 OKR 영역
function OKR({ title }: { title: string }) {
  const [okrs, setOkrs] = useState<IOKR[]>([
    {
      id: uuidv4(),
      ...OKR_INITIAL_STATE,
    },
  ]);

  const handleAddOKR = () => {
    setOkrs(prev => [
      ...prev,
      {
        id: uuidv4(),
        ...OKR_INITIAL_STATE,
      },
    ]);
  };

  return (
    <div className="flex-1">
      <Title>
        {title} <span className="text-sm text-gray-500">({okrs.length}/3)</span>
      </Title>

      {okrs.map((okr, okrIndex) => (
        <div key={okrIndex} className="mb-4">
          {/*NOTE: objective */}
          <CardLayout>
            <div className="flex flex-row gap-2 items-center">
              💡 Objective :
              <input
                className="text-sm whitespace-pre-line break-keep text-[#000] bg-transparent focus:outline-none"
                value={okr.objective}
                onClick={() => console.log({ okr })}
              />
            </div>
          </CardLayout>

          {/*NOTE: key results */}
          <div className="flex flex-col gap-2">
            <div className="text-sm flex flex-row gap-2 items-center">
              <button
                className="py-1"
                onClick={() => {
                  setOkrs(prev =>
                    prev.map((okr, i) =>
                      i === okrIndex
                        ? { ...okr, isShowOKR: !okr.isShowOKR }
                        : okr,
                    ),
                  );
                }}
              >
                <BiSolidDownArrow
                  className={cn(
                    'text-black dark:text-[#fff] transition-transform duration-200',
                    !okr.isShowOKR ? '-rotate-90' : '',
                  )}
                />
              </button>

              <div>Key Results</div>
            </div>

            {/*NOTE: input  */}
            {okr.isShowOKR &&
              okr.keyResults.map((keyResult, keyResultIndex) => (
                <div
                  key={keyResultIndex}
                  className="flex flex-row gap-2 items-center"
                  style={{ paddingLeft: `${keyResult.paddingLeft}px` }}
                >
                  <input type="checkbox" checked={keyResult.isChecked} />
                  <input
                    className={cn(
                      'flex-1 bg-transparent focus:outline-none',
                      keyResult.isChecked && 'text-gray-500 line-through',
                    )}
                    value={keyResult.value}
                    placeholder="할 일"
                  />
                </div>
              ))}
          </div>
        </div>
      ))}

      <button
        className="text-sm text-gray-500 p-2 self-start border border-gray-500 rounded-md"
        onClick={handleAddOKR}
      >
        ADD OKR
      </button>
    </div>
  );
}

export default OKR;
