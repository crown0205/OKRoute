'use client';

import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import {
  CardLayout,
  Circle,
  DescriptionSection,
  InfoMessage,
  Title,
} from '../common';
import OKR from './OKR';

const description = [
  '`Key Results` 는 어떻게 성과를 측정하는 도구 입니다.',
  '숫자로 표시할 수 있으면 좋습니다.',
];

const objective_description = [
  '정의: 달성하고자 하는 명확하고 중요한 영감적인 목표',
  '특징: 질적이고, 시간제한이 있으며, 실행 지향적이어야 함',
  '목적: 목표는 방향성과 동기를 제공하며, 공동의 목표를 향한 노력을 정렬하는 데 도움을 줍니다.',
];

const key_result_description = [
  '정의: 목표 달성을 나타내는 구체적이고 측정 가능한 결과',
  '특징: 양적이며, 달성 가능하고, 시간제한이 있어야 함',
  '목적: 주요 결과는 성공을 측정하고 목표 달성의 진척 상황을 추적하는 수단을 제공합니다.',
];

// 상단에 타입 정의 추가
type ProgressBarProps = {
  title: string;
  percentage: number;
};

const ProgressBar = ({ title, percentage }: ProgressBarProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
        {title}
      </span>
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
        {percentage}%
      </span>
    </div>
    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-4">
      <div
        className="bg-blue-600 h-4 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

function OKRSection() {
  const [isShowDescription, setIsShowDescription] = useState<boolean>(true);

  // 진행률 상태 추가
  const [personalProgress, setPersonalProgress] = useState<number>(65);
  const [workProgress, setWorkProgress] = useState<number>(40);

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto">
      <div className="flex flex-col gap-4">
        {/* 설명 섹션 */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-8 shadow-lg">
          <div className="flex flex-row gap-2 items-center ">
            <Title className="text-neutral-900 dark:text-white">OKR</Title>
            <button
              className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400 p-1"
              onClick={() => setIsShowDescription(!isShowDescription)}
            >
              {isShowDescription ? <FaMinus /> : <FaPlus />}
            </button>
          </div>

          {isShowDescription && (
            <CardLayout className="bg-neutral-50 dark:bg-neutral-900/50">
              <div className="flex flex-col gap-4">
                <InfoMessage>3개 이하의 OKR에 집중 합니다.</InfoMessage>

                <div className="flex flex-col gap-2 pl-4">
                  {description.map(desc => (
                    <div
                      key={desc}
                      className="flex flex-row gap-2 items-center"
                    >
                      <Circle className="dark:bg-neutral-400" />
                      <span className="text-sm whitespace-pre-line break-keep text-neutral-700 dark:text-neutral-200">
                        {desc}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <DescriptionSection
                    title="Objective"
                    description={objective_description}
                  />
                  <DescriptionSection
                    title="Key Results"
                    description={key_result_description}
                  />
                </div>
              </div>
            </CardLayout>
          )}

          {/* OKR 진행률 그래프 */}
          <div className="flex flex-col gap-2">
            <Title className="text-neutral-900 dark:text-white">
              OKR 진행률
            </Title>

            <div className="flex flex-col gap-4">
              <ProgressBar title="Personal OKR" percentage={personalProgress} />
              <ProgressBar title="Work OKR" percentage={workProgress} />
            </div>
          </div>
        </div>

        {/* OKR 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OKR title="Personal OKR" category="personal" />
          <OKR title="Work OKR" category="work" />
        </div>
      </div>
    </div>
  );
}

export default OKRSection;
