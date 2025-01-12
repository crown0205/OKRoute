'use client';

import { useRef, useState } from 'react';
import { CardLayout, Circle, InfoMessage, Title } from '../common';

// @coderabbitai review
function LearningSection() {
  const itemsRef = useRef<HTMLInputElement[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isShowDescription, setIsShowDescription] = useState<boolean>(true);
  const [learningPoints, setLearningPoints] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const setFocus = (target: HTMLElement | null) => {
    requestAnimationFrame(() => {
      target?.focus();
    });
  };

  return (
    <div className="flex-1 max-w-3xl w-full h-full mx-auto bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-8 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">
            Learning points
          </h1>
          <button
            onClick={() => setIsShowDescription(!isShowDescription)}
            className="flex items-center justify-center w-6 h-6 text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-400"
          >
            {isShowDescription ? '−' : '+'}
          </button>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-500">
          {learningPoints.length} points recorded
        </p>
      </div>

      {isShowDescription && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
          <InfoMessage>
            {`이곳에 이번 쿼터에서 배운 점들을 생각 날때마다 기록합니다.
              짧은 문장이여도 좋고, 문단이여도 좋습니다.
              기록함으로써 배운 것들을 훨씬 강화 시킵니다.`}
          </InfoMessage>
        </div>
      )}

      <div className="flex flex-col gap-2 w-full">
        {learningPoints.map((point, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg"
          >
            <div className="flex flex-row gap-2 items-center flex-1 w-full">
              <Circle />
              <input
                ref={el => {
                  if (el) {
                    itemsRef.current[index] = el;
                  }
                }}
                className="text-xs sm:text-sm bg-[transparent] focus:outline-none w-full text-neutral-800 dark:text-white"
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
            <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-500 ml-6 sm:ml-0">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      <input
        ref={inputRef}
        className="w-full p-2 sm:p-3 mt-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg text-xs sm:text-sm focus:outline-none text-neutral-800 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-500"
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

export default LearningSection;
