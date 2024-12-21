'use client';

import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import {
  CardLayout,
  Circle,
  DescriptionSection,
  GoalMessage,
  InfoMessage,
  Title,
} from '../common';
import { cn } from '@/lib/utils';
import OKRInput from '../common/OKRInput';
import { BiSolidDownArrow } from 'react-icons/bi';

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

const OKR_INIT = [
  {
    value: '',
    isChecked: false,
    paddingLeft: 0,
  },
  {
    value: '',
    isChecked: false,
    paddingLeft: 0,
  },
];

function OKRSection() {
  const [isShowDescription, setIsShowDescription] = useState<boolean>(true);
  const [isShowPersonalOKR, setIsShowPersonalOKR] = useState<boolean>(true);

  const [personalOKR, setPersonalOKR] = useState<typeof OKR_INIT>(OKR_INIT);

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      if (event.shiftKey) {
        const newPersonalOKR = [...personalOKR];
        newPersonalOKR[index].paddingLeft = 0;
        setPersonalOKR(newPersonalOKR);
      } else {
        const newPersonalOKR = [...personalOKR];
        newPersonalOKR[index].paddingLeft = 20;
        setPersonalOKR(newPersonalOKR);
      }

      event.currentTarget.focus();
    }

    if (event.key === 'Enter') {
      const newPersonalOKR = [
        ...personalOKR,
        { value: '', isChecked: false, paddingLeft: 0 },
      ];
      setPersonalOKR(newPersonalOKR);
    }
  };

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
                  <span className="text-sm whitespace-pre-line break-keep text-[#000]">
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

      <div className="flex flex-row gap-4 mt-4">
        {/* personal section  */}
        <div className="flex-1">
          <Title>Personal</Title>

          <CardLayout>
            <GoalMessage>Personal OKR를 작성해 보세요.</GoalMessage>
          </CardLayout>

          <div className="flex flex-col gap-2">
            <div className="text-sm flex flex-row gap-2 items-center">
              <button
                className="py-1"
                onClick={() => setIsShowPersonalOKR(!isShowPersonalOKR)}
              >
                <BiSolidDownArrow
                  className={cn(
                    'text-black dark:text-[#fff] transition-transform duration-200',
                    !isShowPersonalOKR ? '-rotate-90' : '',
                  )}
                />
              </button>

              <div>Key Results</div>
            </div>

            {/* input  */}
            {personalOKR.map((okr, index) => (
              <div
                key={index}
                className="flex flex-row gap-2 items-center"
                style={{ paddingLeft: `${okr.paddingLeft}px` }}
              >
                <input
                  type="checkbox"
                  checked={okr.isChecked}
                  // onChange={handleCheckboxChange}
                />
                <input
                  className={cn(
                    'flex-1 bg-transparent focus:outline-none',
                    okr.isChecked && 'text-gray-500 line-through',
                  )}
                  value={okr.value}
                  placeholder="할 일"
                  onKeyDown={e => handleKeyDown(index, e)}
                  // onChange={handleChange}
                />
              </div>
            ))}

            {/* add button  */}
            <button
              className="text-sm text-gray-500 p-2 self-start border border-gray-500 rounded-md"
              onClick={() =>
                setPersonalOKR([
                  ...personalOKR,
                  { value: '', isChecked: false, paddingLeft: 0 },
                ])
              }
            >
              ADD OKR
            </button>
          </div>
        </div>

        {/* work section */}
        <div className="flex-1">
          <Title>Work</Title>
        </div>
      </div>
    </div>
  );
}

export default OKRSection;
