'use client';

import React, { useState, useRef, KeyboardEvent } from 'react';
import { BiTrash } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface WeeklyTodos {
  [key: number]: {
    [key: number]: Todo[];
  };
}

interface MonthlyNotes {
  [key: number]: string;
}

function PlannerPage() {
  // 월별 메모 상태 관리
  const [monthlyNotes, setMonthlyNotes] = useState<MonthlyNotes>({
    1: '',
    2: '',
    3: '',
  });

  // 주차별 할 일 상태 관리 - 각 주차마다 빈 todo 하나씩 초기화
  const [weeklyTodos, setWeeklyTodos] = useState<WeeklyTodos>({
    1: {
      1: [{ id: uuidv4(), text: '', completed: false }],
      2: [{ id: uuidv4(), text: '', completed: false }],
      3: [{ id: uuidv4(), text: '', completed: false }],
      4: [{ id: uuidv4(), text: '', completed: false }],
    },
    2: {
      1: [{ id: uuidv4(), text: '', completed: false }],
      2: [{ id: uuidv4(), text: '', completed: false }],
      3: [{ id: uuidv4(), text: '', completed: false }],
      4: [{ id: uuidv4(), text: '', completed: false }],
    },
    3: {
      1: [{ id: uuidv4(), text: '', completed: false }],
      2: [{ id: uuidv4(), text: '', completed: false }],
      3: [{ id: uuidv4(), text: '', completed: false }],
      4: [{ id: uuidv4(), text: '', completed: false }],
    },
  });

  const todoRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  // 뷰 타입 상태 추가
  const [viewType, setViewType] = useState<'month' | 'week'>('month');

  // 월별 접힘/펼침 상태 관리
  const [collapsedMonths, setCollapsedMonths] = useState<{
    [key: number]: boolean;
  }>({
    1: false,
    2: false,
    3: false,
  });

  // 월 접힘/펼침 토글 함수
  const toggleMonth = (month: number) => {
    setCollapsedMonths(prev => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  // 새로운 할 일 추가 함수
  const addTodo = (month: number, week: number) => {
    const newId = uuidv4();
    setWeeklyTodos(prev => ({
      ...prev,
      [month]: {
        ...prev[month],
        [week]: [
          ...prev[month][week],
          { id: newId, text: '', completed: false },
        ],
      },
    }));
    // 새로운 todo가 추가되면 자동으로 포커스
    setTimeout(() => {
      todoRefs.current[newId]?.focus();
    }, 0);
  };

  // 할 일 삭제 함수
  const deleteTodo = (month: number, week: number, id: string) => {
    setWeeklyTodos(prev => ({
      ...prev,
      [month]: {
        ...prev[month],
        [week]: prev[month][week].filter(todo => todo.id !== id),
      },
    }));
  };

  // 키보드 이벤트 처리
  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    month: number,
    week: number,
    todo: Todo,
    index: number,
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation(); // 이벤트 전파 중지
      addTodo(month, week);
      return; // 함수 실행 종료
    }

    if (e.key === 'Backspace' && todo.text === '') {
      e.preventDefault();
      if (weeklyTodos[month][week].length > 1) {
        deleteTodo(month, week, todo.id);
        const prevTodo = weeklyTodos[month][week][index - 1];
        if (prevTodo) {
          setTimeout(() => {
            todoRefs.current[prevTodo.id]?.focus();
          }, 0);
        }
      }
    }
  };

  // 할 일 내용 업데이트 함수
  const handleUpdateTodo = (
    month: number,
    week: number,
    id: string,
    text: string,
  ) => {
    setWeeklyTodos(prev => ({
      ...prev,
      [month]: {
        ...prev[month],
        [week]: prev[month][week].map(todo =>
          todo.id === id ? { ...todo, text } : todo,
        ),
      },
    }));
  };

  // Progress Circle 컴포넌트 추가
  const ProgressCircle = ({
    completed,
    total,
  }: {
    completed: number;
    total: number;
  }) => {
    const percentage = total === 0 ? 0 : (completed / total) * 100;
    const radius = 15.91549430918954;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${circumference} ${circumference}`;
    const roundedPercentage = Math.round(percentage);

    return (
      <div className="w-8 h-8 relative group">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 36 36"
          role="progressbar"
          aria-valuenow={roundedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* 배경 서클 */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-neutral-200 dark:text-neutral-700"
          />
          {/* 프로그레스 서클 */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            className="text-blue-500"
            stroke="currentColor"
            style={{
              strokeDashoffset: circumference * (1 - percentage / 100),
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
        {/* 중앙 텍스트를 SVG 밖으로 이동하고 absolute 포지셔닝 사용 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[14px] sm:text-[10px] font-medium text-neutral-700 dark:text-neutral-200">
            {roundedPercentage}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 w-full h-full mx-auto bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-8 shadow-lg">
      <div className="flex items-center mb-6 gap-4">
        {['month', 'week'].map(item => (
          <button
            key={item}
            onClick={() => setViewType(item as 'month' | 'week')}
            className={`text-sm border rounded-md px-2 py-1 mb-1 transition-colors
              ${
                viewType === item
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-neutral-800 dark:border-neutral-500 text-neutral-800 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900/50'
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800 dark:text-white mb-1">
            1분기 Planner
          </h1>
          <p className="text-sm text-neutral-500">분기별 계획 수립</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* 분기 플래너 섹션 */}
        <section>
          <h2 className="text-lg font-medium text-neutral-800 dark:text-white mb-3">
            분기 플래너
          </h2>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
            <div className="flex items-center gap-2">
              <span>⚠️</span>
              <p className="text-sm text-neutral-700 dark:text-neutral-200">
                이곳에는 전반적으로 한 주마다 해야 할 것들을 큰 그림 차원에서
                정리 합니다.
                <br />
                세부적인 태스크 레벨 까지는 내려가지 않아도 좋습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 월별 섹션 */}
        {[1, 2, 3].map(month => (
          <section key={month} className="flex flex-col gap-4">
            <h3
              onClick={() => toggleMonth(month)}
              className="text-lg font-medium text-neutral-800 dark:text-white cursor-pointer flex items-center gap-2"
            >
              <span
                className="transform transition-transform duration-200"
                style={{
                  transform: collapsedMonths[month]
                    ? 'rotate(-90deg)'
                    : 'rotate(0deg)',
                }}
              >
                ▼
              </span>
              {month}월
            </h3>

            {/* 월별 컨텐츠 - collapsedMonths 상태에 따라 표시/숨김 */}
            <div
              className={`space-y-4 transition-all duration-200 ${
                collapsedMonths[month] ? 'hidden' : 'block'
              }`}
            >
              {/* 월별 메모 입력 영역 */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span>💡</span>
                  <input
                    type="text"
                    value={monthlyNotes[month]}
                    onChange={e =>
                      setMonthlyNotes(prev => ({
                        ...prev,
                        [month]: e.target.value,
                      }))
                    }
                    placeholder="이번 달 주요 계획을 입력하세요"
                    className="flex-1 bg-transparent text-sm text-neutral-700 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* 주차별 할 일 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(week => (
                  <div
                    key={week}
                    className="flex flex-col gap-2 bg-neutral-50 dark:bg-neutral-900/50 p-3 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-neutral-700 dark:text-neutral-200">
                          {week}주차
                        </h4>
                        <ProgressCircle
                          completed={
                            weeklyTodos[month][week].filter(
                              todo => todo.completed && todo.text,
                            ).length
                          }
                          total={
                            weeklyTodos[month][week].filter(todo => todo.text)
                              .length
                          }
                        />
                      </div>
                      <button
                        onClick={() => addTodo(month, week)}
                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-col gap-1">
                      {weeklyTodos[month][week].map((todo, index) => (
                        <div
                          key={todo.id}
                          className="group flex items-center gap-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md transition-colors relative"
                        >
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => {
                              setWeeklyTodos(prev => ({
                                ...prev,
                                [month]: {
                                  ...prev[month],
                                  [week]: prev[month][week].map(t =>
                                    t.id === todo.id
                                      ? { ...t, completed: !t.completed }
                                      : t,
                                  ),
                                },
                              }));
                            }}
                            className="rounded border-neutral-300 dark:border-neutral-600 text-blue-500 focus:ring-blue-500"
                          />
                          <textarea
                            ref={(el: HTMLTextAreaElement | null) => {
                              todoRefs.current[todo.id] = el;
                            }}
                            value={todo.text}
                            onChange={e =>
                              handleUpdateTodo(
                                month,
                                week,
                                todo.id,
                                e.target.value,
                              )
                            }
                            onKeyDown={e =>
                              handleKeyDown(e, month, week, todo, index)
                            }
                            placeholder="할 일을 입력하세요"
                            className={`flex-1 bg-transparent text-sm focus:outline-none resize-none w-full ${
                              todo.completed
                                ? 'line-through text-neutral-400'
                                : 'text-neutral-700 dark:text-neutral-200'
                            }`}
                            rows={1}
                            style={{ overflow: 'hidden' }}
                            onInput={e => {
                              const target = e.target as HTMLTextAreaElement;
                              target.style.height = 'auto';
                              target.style.height = `${target.scrollHeight}px`;
                            }}
                          />
                          {weeklyTodos[month][week].length > 1 && (
                            <button
                              onClick={() => deleteTodo(month, week, todo.id)}
                              className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-500 transition-opacity absolute right-2"
                            >
                              <BiTrash />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default PlannerPage;
