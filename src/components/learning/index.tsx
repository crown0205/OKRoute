'use client';

import { useState } from 'react';

// @coderabbitai review
function Learning() {
  const [learningPoints, setLearningPoints] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

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
          <span key={index} className="flex flex-row gap-2 items-center">
            <span className="w-[5px] h-[5px] bg-gray-100 rounded-md" />
            <input
              className="text-sm bg-[transparent] focus:outline-none w-full"
              value={point}
              onChange={e => {
                const newLearningPoints = [...learningPoints];
                newLearningPoints[index] = e.target.value;
                setLearningPoints(newLearningPoints);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setLearningPoints([...learningPoints]);
                }
              }}
            />
          </span>
        ))}
      </div>

      <input
        className="bg-[transparent] focus:outline-none text-sm mt-1"
        placeholder="배울점을 기록해보세요."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setLearningPoints([...learningPoints, input]);
            setInput('');
          }
        }}
      />
    </div>
  );
}

export default Learning;
