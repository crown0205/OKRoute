'use client';

import { useRef, useState } from 'react';

// @coderabbitai review
function Learning() {
  const itemsRef = useRef<HTMLInputElement[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [learningPoints, setLearningPoints] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const setFocus = (target: HTMLElement | null) => {
    requestAnimationFrame(() => {
      target?.focus();
    });
  };

  return (
    <div className="flex flex-col max-w-screen-md">
      <h2 className="text-xl font-bold">Learning points</h2>
      <span className="flex flex-col gap-2 mt-4 mb-2 p-4 bg-gray-100 rounded-md">
        <div className="flex flex-row gap-2">
          ⚠️
          <span className="text-sm text-gray-500 whitespace-pre-line break-all">
            {`이곳에 이번 쿼터에서 배운 점들을 생각 날때마다 기록합니다.
              짧은 문장이여도 좋고, 문단이여도 좋습니다.
              기록함으로써 배운 것들을 훨씬 강화 시킵니다.`}
          </span>
        </div>
      </span>

      {/* 배울점을 기록할 수 있는 공간 */}
      <div className="flex flex-col gap-1 mt-1">
        {learningPoints.map((point, index) => (
          <div key={index} className="flex flex-row gap-2 items-center">
            <span className="w-[5px] h-[5px] rounded-md bg-[#000] dark:bg-[#fff]" />
            <input
              ref={el => {
                if (el) {
                  itemsRef.current[index] = el;
                }
              }}
              className="text-sm bg-[transparent] focus:outline-none w-full"
              value={point}
              onChange={e => {
                const newLearningPoints = [...learningPoints];
                newLearningPoints[index] = e.target.value;
                setLearningPoints(newLearningPoints);
              }}
              onKeyDown={e => {
                // 다음 칸으로 이동
                if (e.key === 'Enter') {
                  const nextIndex = index + 1;
                  if (nextIndex < learningPoints.length) {
                    itemsRef.current[nextIndex]?.focus();
                  } else {
                    inputRef.current?.focus();
                  }
                }

                if (e.key === 'ArrowUp') {
                  const prevIndex = index - 1;
                  if (prevIndex >= 0) {
                    itemsRef.current[prevIndex]?.focus();
                  }
                }

                if (e.key === 'ArrowDown') {
                  const nextIndex = index + 1;
                  if (nextIndex < learningPoints.length) {
                    itemsRef.current[nextIndex]?.focus();
                  }

                  if (nextIndex === learningPoints.length) {
                    inputRef.current?.focus();
                  }
                }

                if (e.key === 'Backspace') {
                  const prevIndex = index - 1;

                  if (point.length === 0) {
                    if (learningPoints.length === 1) {
                      setFocus(inputRef.current);
                    } else {
                      setFocus(itemsRef.current[prevIndex]);
                    }

                    const newLearningPoints = [...learningPoints];
                    newLearningPoints.splice(index, 1);
                    setLearningPoints(newLearningPoints);
                  }
                }
              }}
              onBlur={() => {
                setLearningPoints([...learningPoints]);
              }}
            />
          </div>
        ))}
      </div>

      <input
        ref={inputRef}
        className="bg-[transparent] focus:outline-none text-sm mt-1"
        placeholder="배울점을 기록해보세요."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setLearningPoints([...learningPoints, input]);
            setInput('');
          }

          if (e.key === 'ArrowUp') {
            const prevIndex = learningPoints.length - 1;
            if (prevIndex >= 0) {
              itemsRef.current[prevIndex]?.focus();
            }
          }

          if (e.key === 'Backspace') {
            const prevIndex = learningPoints.length - 1;
            if (prevIndex >= 0) {
              itemsRef.current[prevIndex]?.focus();
            }
          }
        }}
      />
    </div>
  );
}

export default Learning;
