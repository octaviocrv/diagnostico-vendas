export default function QuizQuestion({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  onPrevQuestion, 
  canGoBack 
}) {
  return (
    <div className="space-y-8 px-8 py-8">
      <h3 className="text-xl md:text-2xl font-medium leading-snug text-white">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option) => (
          <div
            key={option.value}
            onClick={() => onAnswerSelect(option.value)}
            className={`group flex items-center p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
              selectedAnswer === option.value
                ? "bg-[#FF2D8D]/10 border-[#FF2D8D] shadow-[0_0_15px_rgba(255,45,141,0.15)]"
                : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            <div
              className={`mr-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                selectedAnswer === option.value
                  ? "border-[#FF2D8D] bg-[#FF2D8D]"
                  : "border-white/30 group-hover:border-white/50"
              }`}
            >
              {selectedAnswer === option.value && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span className="text-white/90 font-normal leading-relaxed">
              {option.label}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onPrevQuestion}
          disabled={!canGoBack}
          className="text-sm text-white/40 hover:text-white transition-colors disabled:opacity-0 font-medium"
        >
          ← Voltar para pergunta anterior
        </button>
      </div>
    </div>
  );
}