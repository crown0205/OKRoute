function ReflectionPage() {
  return (
    <div className="min-h-screen text-white p-8 space-y-12 max-w-5xl mx-auto">
      {/* 2025 Q1 섹션 */}
      <section>
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 border-b border-gray-700 pb-2">
          <span>▼</span>
          2025 Q1을 시작하기에 앞서
        </h1>

        <div className="bg-[#1F2937] backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl">⚠️</span>
            <p className="font-medium text-yellow-50">
              퀘터를 시작하기 전에 생각해볼만한 질문들입니다.
            </p>
          </div>
          <p className="text-gray-400 mb-4 pl-9">
            자유롭게 생각하고 싶은 것들을 기록해 주세요.
          </p>
          <div className="bg-blue-950/30 rounded-lg p-4 pl-9 text-sm">
            <span className="text-blue-400 font-medium">[ 사용법 ]</span>
            <br />
            1분기마다 정리 해주세요. 총 4분기로 나누어서 작성합니다. 체계적 정리
            <br />
            <span className="text-gray-400">( 3월 / 6월 / 9월 / 12월 )</span>
          </div>
        </div>

        <div className="space-y-5">
          <QuestionSection
            icon="😔"
            question="내가 이 목표를 달성하지 못할 이유는 무엇인가요?"
            answer="하고 싶은데 맘처럼 시간을 잘 빼지 못하고, 습을 많이 먹은게 있지 않나 싶다..."
            bgColor="bg-[#3E2A1B]"
            borderColor="border-amber-900/30"
          />
          <QuestionSection
            icon="🚀"
            question="목표를 달성하는데 반드시 필요한 것은 무엇이 있나요?"
            answer="냉정함. 약속 되지 않은 것들은 단호히 거절할수 있어야 하는데, 그게 부족한거 같다."
            bgColor="bg-[#3E2A1B]"
            borderColor="border-amber-900/30"
          />
          <QuestionSection
            icon="🙏"
            question="고마운 사람들을 있나요? / 기억하고 싶은 것들은 있나요?"
            answer="민재, 홍성, 정민 이렇게 고마웠거 같다. 민재와 만난 24년도 후반 많이 투닥거리고 정난적구 힘들었지만, 괜찮았다."
            bgColor="bg-[#1E2A3B]"
            borderColor="border-gray-700/50"
          />
        </div>
      </section>

      {/* 2024 Q4 섹션 */}
      <section>
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 border-b border-gray-700 pb-2">
          <span>▼</span>
          2024 Q4 후기 작성
        </h1>

        <div className="bg-[#1F2937] backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl">⚠️</span>
            <p className="font-medium text-yellow-50">
              진반적으로 본인이 보낸 퀘터에 대한 작성 입니다.
            </p>
          </div>
          <p className="text-gray-400 pl-9">
            어떤 것들이 잘 되었고 어떤 것들이 개선이 여지가 있는지 생각해
            보세요.
          </p>
        </div>

        <div className="space-y-5">
          <QuestionSection
            icon="🎉"
            question="어떤점이 잘 진행 되었나요?"
            answer="맛집 앱 완성. 그것을 통해 앱을 어떻게 만들어 가던 흐름이자, 기본적인 개발 방법을 알게 되었다."
            bgColor="bg-[#1F1B2E]"
            borderColor="border-purple-900/30"
          />
          <QuestionSection
            icon="✅"
            question="성과 리포트 혹은 포트폴리오로 만들 만은 어떤것이 있나요?"
            answer="앱을 만들긴 하였으나, 감의를 바라 만들기만 하였지고 배포를 하지 못하여, 그럼싸한 포폴이라고 생각하지 않는다."
            bgColor="bg-[#1F1B2E]"
            borderColor="border-purple-900/30"
          />
          <QuestionSection
            icon="🏹"
            question="무엇을 더 잘 할 수 있었나요?"
            answer="사람들과 약속되지 않은 만남을 미루고 나중에 잡아도 괜찮을 잘못케 갔으며.. 그부분이 좀 아쉽다."
            bgColor="bg-[#1F2937]"
            borderColor="border-gray-700/50"
          />
          <QuestionSection
            icon="🤝"
            question="어떤 사람들을 새로 만났나요?"
            answer="현대 카드 사람들.. 하지만.. 나의 프로젝트의 진행하는데는 도움은 되지 않는거 같다. 현대카드의 일을 하면서는 도움은 되지만, 굳이 시작으로 가지는 친해질 필요는 없을까라고."
            bgColor="bg-[#1F2937]"
            borderColor="border-gray-700/50"
          />
        </div>
      </section>
    </div>
  );
}

function QuestionSection({
  icon,
  question,
  answer,
  bgColor,
  borderColor,
}: {
  icon?: string;
  question: string;
  answer: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <div
      className={`${bgColor} rounded-xl p-5 border ${borderColor} backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3 mb-3">
        {icon && <span className="text-xl">{icon}</span>}
        <h2 className="font-medium text-yellow-50">{question}</h2>
      </div>
      <p className="text-gray-400 pl-9">{answer}</p>
    </div>
  );
}

export default ReflectionPage;
