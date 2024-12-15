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

function OKRSection() {
  const [isShowDescription, setIsShowDescription] = useState<boolean>(true);
  const [okr, setOKR] = useState<string[]>([]);

  return (
    <div>
      <div className="flex flex-row gap-2 items-center">
        <Title>OKR</Title>
        <button
          className="text-sm text-gray-500 p-1"
          onClick={() => setIsShowDescription(!isShowDescription)}
        >
          {isShowDescription ? <FaMinus /> : <FaPlus />}
        </button>
      </div>

      {isShowDescription && (
        <CardLayout>
          <div className="flex flex-col gap-2">
            <InfoMessage>3개 이하의 OKR에 집중 합니다.</InfoMessage>

            <div className="flex flex-col gap-2 pl-4">
              {description.map(desc => (
                <div key={desc} className="flex flex-row gap-2 items-center">
                  <Circle className="dark:bg-[#000]" />
                  <span className="text-sm whitespace-pre-line break-keep">
                    {desc}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-row gap-4 items-start">
              <DescriptionSection
                title={`Objective`}
                description={objective_description}
              />

              <DescriptionSection
                title={`Key Results`}
                description={key_result_description}
              />
            </div>
          </div>
        </CardLayout>
      )}
    </div>
  );
}

export default OKRSection;
