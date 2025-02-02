import { cn } from '@/lib/utils';
import { useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../common';
import { KeyResultItem } from './KeyResultItem';
import { ObjectiveInput } from './ObjectiveInput';

// types를 별도로 분리
interface KeyResult {
  value: string;
  isChecked: boolean;
  paddingLeft: number;
}

interface IOKR {
  id: string;
  objective: string;
  keyResults: KeyResult[];
  isShowOKR: boolean;
}

const OKR_INITIAL_STATE: Omit<IOKR, 'id'> = {
  objective: '',
  keyResults: [
    { value: '', isChecked: false, paddingLeft: 0 },
    { value: '', isChecked: false, paddingLeft: 0 },
  ],
  isShowOKR: true,
};

function OKR({ title }: { title: string }) {
  const [okrs, setOkrs] = useState<IOKR[]>([
    {
      id: uuidv4(),
      ...OKR_INITIAL_STATE,
    },
  ]);

  const handleAddOKR = () => {
    if (okrs.length >= 3) return;

    setOkrs(prev => [
      ...prev,
      {
        id: uuidv4(),
        ...OKR_INITIAL_STATE,
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

  return (
    <div className="flex-1 max-w-3xl w-full min-h-auto mx-auto bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-8 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
        <Title className="text-neutral-900 dark:text-white">
          {title}{' '}
          <span className="text-sm text-neutral-500">({okrs.length}/3)</span>
        </Title>
      </div>

      {okrs.map((okr, okrIndex) => (
        <div key={okr.id}>
          <div className="mb-4 sm:mb-6">
            <ObjectiveInput
              objective={okr.objective}
              onChange={value => updateOKR(okrIndex, { objective: value })}
            />

            <div className="flex flex-col gap-2">
              <div className="text-sm flex flex-row gap-2 items-center p-2">
                <button
                  className="p-1"
                  onClick={() =>
                    updateOKR(okrIndex, { isShowOKR: !okr.isShowOKR })
                  }
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

              {okr.isShowOKR && (
                <div className="space-y-2">
                  {okr.keyResults.map((keyResult, keyResultIndex) => (
                    <KeyResultItem
                      key={keyResultIndex}
                      keyResult={keyResult}
                      onToggleCheck={() =>
                        updateKeyResult(okrIndex, keyResultIndex, {
                          isChecked: !keyResult.isChecked,
                        })
                      }
                      onChangeValue={value =>
                        updateKeyResult(okrIndex, keyResultIndex, { value })
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {okrIndex < okrs.length - 1 && (
            <hr className="border-t border-neutral-200 dark:border-neutral-700 my-4 sm:my-6" />
          )}
        </div>
      ))}

      <button
        className="text-sm px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleAddOKR}
        disabled={okrs.length >= 3}
      >
        ADD OKR
      </button>
    </div>
  );
}

export default OKR;
