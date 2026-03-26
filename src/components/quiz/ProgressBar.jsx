export default function ProgressBar({ step, totalSteps }) {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="space-y-3 sm:space-y-4 border-b border-white/5 px-4 sm:px-6 md:px-8 pb-5 sm:pb-6 pt-6 sm:pt-8">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-xs sm:text-sm tracking-wider text-[#F5C6D6] uppercase font-bold">
          Etapa {step} de {totalSteps}
        </h2>
        <span className="text-xs sm:text-sm font-medium text-white/60">
          {progressPercentage.toFixed(0)}%
        </span>
      </div>

      <div className="w-full bg-white/5 rounded-full h-1 sm:h-1.5 overflow-hidden">
        <div
          className="bg-[#FF2D8D] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}