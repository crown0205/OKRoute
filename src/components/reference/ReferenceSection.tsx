'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import Title from '../common/Title';

interface ReferenceItem {
  id: string;
  title: string;
  category: 'personal' | 'work';
}

function ReferenceSection() {
  const router = useRouter();
  const [isPersonalOpen, setIsPersonalOpen] = useState(true);
  const [isWorkOpen, setIsWorkOpen] = useState(true);
  const [references] = useState<ReferenceItem[]>([
    { id: '1', title: '제지방 빼기', category: 'personal' },
    {
      id: '2',
      title: '면접 내용 정리',
      category: 'personal',
    },
    {
      id: '3',
      title: '자기 자신을 되돌아보기',
      category: 'personal',
    },
    {
      id: '4',
      title: 'CS50 CS50x 2024 - Lecture 0 - Scratch',
      category: 'work',
    },
  ]);

  const handleItemClick = (id: string) => {
    router.push(`/reference/${id}`);
  };

  return (
    <div>
      <Title className="mb-4">참고자료</Title>

      <div className="flex flex-row gap-4">
        {/* Personal Section */}
        <div className="w-1/2">
          <div
            className="flex items-center gap-2 cursor-pointer mb-2"
            onClick={() => setIsPersonalOpen(!isPersonalOpen)}
          >
            {isPersonalOpen ? (
              <FaChevronDown className="text-gray-600" />
            ) : (
              <FaChevronRight className="text-gray-600" />
            )}
            <h2 className="text-xl font-semibold">Personal</h2>
          </div>

          {isPersonalOpen && (
            <div className="flex flex-col gap-4 ml-4">
              {references
                .filter(item => item.category === 'personal')
                .map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="flex items-center gap-2 rounded-lg cursor-pointer bg-transparent"
                  >
                    ✨
                    <input
                      value={item.title}
                      className="flex items-center rounded-lg cursor-pointer bg-transparent w-full focus:outline-none"
                      onChange={e => {
                        console.log(e.target.value);
                      }}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Work Section */}
        <div className="mb-6 w-1/2">
          <div
            className="flex items-center gap-2 mb-3 cursor-pointer"
            onClick={() => setIsWorkOpen(!isWorkOpen)}
          >
            {isWorkOpen ? (
              <FaChevronDown className="text-gray-600" />
            ) : (
              <FaChevronRight className="text-gray-600" />
            )}
            <h2 className="text-xl font-semibold">Work</h2>
          </div>

          {isWorkOpen && (
            <div className="ml-6 space-y-2">
              {references
                .filter(item => item.category === 'work')
                .map(item => (
                  <input
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    value={item.title}
                    className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReferenceSection;
