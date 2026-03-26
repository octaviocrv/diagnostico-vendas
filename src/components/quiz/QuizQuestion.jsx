export default function QuizQuestion({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  onPrevQuestion, 
  canGoBack,
  isLastQuestion,
  onFinishQuiz 
}) {
  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <h3 className="text-lg sm:text-xl md:text-2xl font-medium leading-snug text-white">
        {question.question}
      </h3>

      <div className="space-y-2.5 sm:space-y-3">
        {question.options.map((option) => (
          <div
            key={option.value}
            onClick={() => onAnswerSelect(option.value)}
            className={`group flex items-start sm:items-center p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
              selectedAnswer === option.value
                ? "bg-[#FF2D8D]/10 border-[#FF2D8D] shadow-[0_0_15px_rgba(255,45,141,0.15)]"
                : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            <div
              className={`mr-3 sm:mr-4 w-4 sm:w-5 h-4 sm:h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 sm:mt-0 ${
                selectedAnswer === option.value
                  ? "border-[#FF2D8D] bg-[#FF2D8D]"
                  : "border-white/30 group-hover:border-white/50"
              }`}
            >
              {selectedAnswer === option.value && (
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white" />
              )}
            </div>
            <span className="text-sm sm:text-base text-white/90 font-normal leading-relaxed">
              {option.label}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-2 space-y-3 sm:space-y-4">
        {/* Botão Finalizar Quiz - apenas na última pergunta */}
        {isLastQuestion && selectedAnswer && (
          <button
            type="button"
            onClick={onFinishQuiz}
            className="w-full bg-[#FF2D8D] hover:bg-[#FF2D8D]/90 text-white font-semibold py-3 sm:py-3.5 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(255,45,141,0.3)] text-sm sm:text-base"
          >
            Finalizar Quiz
          </button>
        )}
        
        {/* Botão Voltar */}
        <button
          type="button"
          onClick={onPrevQuestion}
          disabled={!canGoBack}
          className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors disabled:opacity-0 font-medium"
        >
          ← Voltar para pergunta anterior
        </button>
      </div>
    </div>
  );
}