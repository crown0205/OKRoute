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
    <div className="flex-1 max-w-3xl w-full h-full mx-auto bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-8 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
        <Title className="text-neutral-900 dark:text-white">
          {title}{' '}
          <span className="text-sm text-neutral-500">({okrs.length}/3)</span>
        </Title>
      </div>

      {okrs.map((okr, okrIndex) => (
        <div key={okrIndex} className="mb-4 sm:mb-6">
          {/*NOTE: objective */}
          <CardLayout className="bg-neutral-50 dark:bg-neutral-900/50">
            <div className="flex flex-row gap-2 items-center">
              <span>💡</span>
              <input
                className="flex-1 text-sm whitespace-pre-line break-keep text-neutral-800 dark:text-white bg-transparent focus:outline-none"
                value={okr.objective}
                placeholder="목표를 입력하세요"
              />
            </div>
          </CardLayout>

          {/*NOTE: key results */}
          <div className="flex flex-col gap-2">
            <div className="text-sm flex flex-row gap-2 items-center p-2">
              <button
                className="p-1"
                onClick={() => {
                  setOkrs(prev =>
                    prev.map((o, i) =>
                      i === okrIndex ? { ...o, isShowOKR: !o.isShowOKR } : o,
                    ),
                  );
                }}
              >
                <BiSolidDownArrow
                  className={cn(
                    'text-neutral-800 dark:text-white transition-transform duration-200',
                    !okr.isShowOKR ? '-rotate-90' : '',
                  )}
                />
              </button>
              <div className="text-neutral-800 dark:text-white">
                Key Results
              </div>
            </div>

            {/*NOTE: input */}
            {okr.isShowOKR && (
              <div className="space-y-2">
                {okr.keyResults.map((keyResult, keyResultIndex) => (
                  <div
                    key={keyResultIndex}
                    className="flex flex-row gap-2 items-center p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-950/50 transition-all"
                    style={{ paddingLeft: `${keyResult.paddingLeft + 8}px` }}
                  >
                    <button
                      onClick={() => {
                        setOkrs(prev =>
                          prev.map((o, i) =>
                            i === okrIndex
                              ? {
                                  ...o,
                                  keyResults: o.keyResults.map((kr, kri) =>
                                    kri === keyResultIndex
                                      ? { ...kr, isChecked: !kr.isChecked }
                                      : kr,
                                  ),
                                }
                              : o,
                          ),
                        );
                      }}
                      className="relative w-5 h-5 flex-shrink-0"
                    >
                      <div
                        className={`
                          absolute inset-0 rounded-full border-[1.5px] transition-all duration-200
                          ${
                            keyResult.isChecked
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-neutral-300 dark:border-neutral-600 hover:border-blue-500 dark:hover:border-blue-400'
                          }
                        `}
                      >
                        {keyResult.isChecked && (
                          <svg
                            className="w-full h-full text-white p-[3px]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                    <input
                      className={cn(
                        'flex-1 text-sm bg-transparent focus:outline-none text-neutral-700 dark:text-neutral-200 placeholder-neutral-400',
                        keyResult.isChecked && 'text-neutral-500 line-through',
                      )}
                      value={keyResult.value}
                      placeholder="핵심 결과를 입력하세요"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        className="text-sm px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
        onClick={handleAddOKR}
      >
        ADD OKR
      </button>
    </div>
  );
}

export default OKR;
