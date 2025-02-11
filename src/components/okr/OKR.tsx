import { cn } from '@/lib/utils';
import { useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../common';
import { KeyResultItem } from './KeyResultItem';
import { ObjectiveInput } from './ObjectiveInput';

// types를 별도로 분리
interface KeyResult {
  id: string;
  value: string;
  isChecked: boolean;
  paddingLeft: number;
}

interface IOKR {
  id: string;
  category: 'work' | 'personal';
  objective: string;
  keyResults: KeyResult[];
  isShowOKR: boolean;
}

const OKR_INITIAL_STATE: Omit<IOKR, 'id'> = {
  category: 'work',
  objective: '',
  keyResults: [
    { id: uuidv4(), value: '', isChecked: false, paddingLeft: 0 },
    { id: uuidv4(), value: '', isChecked: false, paddingLeft: 0 },
  ],
  isShowOKR: true,
};

function OKR({
  title,
  category,
}: {
  title: string;
  category: 'work' | 'personal';
}) {
  const [okrs, setOkrs] = useState<IOKR[]>(() => {
    return [
      {
        id: uuidv4(),
        ...OKR_INITIAL_STATE,
        category,
      },
    ];
  });

  console.log({ okrs });

  const handleAddOKR = () => {
    if (okrs.length >= 3) return;

    setOkrs(prev => [
      ...prev,
      {
        id: uuidv4(),
        ...OKR_INITIAL_STATE,
        category,
      },
    ]);
  };

  const updateOKR = (okrIndex: number, updates: Partial<IOKR>) => {
    setOkrs(prev =>
      prev.map((okr, index) =>
        index === okrIndex ? { ...okr, ...updates } : okr,
      ),
    );
  };

  const updateKeyResult = (
    okrIndex: number,
    keyResultIndex: number,
    updates: Partial<KeyResult>,
  ) => {
    setOkrs(prev =>
      prev.map((okr, index) =>
        index === okrIndex
          ? {
              ...okr,
              keyResults: okr.keyResults.map((kr, kri) =>
                kri === keyResultIndex ? { ...kr, ...updates } : kr,
              ),
            }
          : okr,
      ),
    );
  };

  const handleDeleteOKR = (okrIndex: number) => {
    setOkrs(prev => prev.filter((_, index) => index !== okrIndex));
  };

  const addKeyResult = (okrIndex: number, keyResultIndex: number) => {
    setOkrs(prev =>
      prev.map((okr, index) =>
        index === okrIndex
          ? {
              ...okr,
              keyResults: [
                ...okr.keyResults.slice(0, keyResultIndex + 1),
                { id: uuidv4(), value: '', isChecked: false, paddingLeft: 0 },
                ...okr.keyResults.slice(keyResultIndex + 1),
              ],
            }
          : okr,
      ),
    );
  };

  return (
    <div className="flex-1 max-w-3xl w-full max-h-fit mx-auto bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-8 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-6 sm:mb-8">
        <Title className="text-neutral-900 dark:text-white">
          {title}{' '}
          <span className="text-sm text-neutral-500">({okrs.length}/3)</span>
        </Title>
      </div>

      <div className="space-y-8">
        {okrs.map((okr, okrIndex) => (
          <div key={okr.id} className="group">
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <ObjectiveInput
                  objective={okr.objective}
                  onChange={value => updateOKR(okrIndex, { objective: value })}
                  onDelete={() => handleDeleteOKR(okrIndex)}
                  canDelete={okrs.length > 1}
                />
              </div>

              <div className="mt-4">
                <div className="text-sm flex flex-row gap-2 items-center py-2">
                  <button
                    className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
                    onClick={() =>
                      updateOKR(okrIndex, { isShowOKR: !okr.isShowOKR })
                    }
                  >
                    <BiSolidDownArrow
                      className={cn(
                        'text-neutral-600 dark:text-neutral-400 transition-transform duration-200',
                        !okr.isShowOKR ? '-rotate-90' : '',
                      )}
                    />
                  </button>
                  <div className="text-neutral-600 dark:text-neutral-400 font-medium">
                    Key Results
                  </div>
                </div>

                {okr.isShowOKR && (
                  <div className="space-y-3 mt-2">
                    {okr.keyResults.map((keyResult, keyResultIndex) => (
                      <KeyResultItem
                        key={keyResult.id}
                        keyResult={keyResult}
                        okrIndex={okrIndex}
                        keyResultIndex={keyResultIndex}
                        onToggleCheck={() =>
                          updateKeyResult(okrIndex, keyResultIndex, {
                            isChecked: !keyResult.isChecked,
                          })
                        }
                        onChangeValue={value =>
                          updateKeyResult(okrIndex, keyResultIndex, { value })
                        }
                        onEnterPress={() =>
                          addKeyResult(okrIndex, keyResultIndex)
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {okrIndex < okrs.length - 1 && (
              <hr className="border-t border-neutral-200 dark:border-neutral-700" />
            )}
          </div>
        ))}
      </div>

      <button
        className="text-sm px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        onClick={handleAddOKR}
        disabled={okrs.length >= 3}
      >
        ADD OKR
      </button>
    </div>
  );
}

export default OKR;
