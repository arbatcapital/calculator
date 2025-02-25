const StepItem = ({ title, progress }: { title: string; progress: number }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-2 w-full">
      <p className="uppercase text-sm font-medium">{title}</p>
      <div className="min-h-[5px] rounded-3xl bg-[#eff0f1] w-full overflow-hidden">
        <div
          className="h-[5px] bg-blue-500 rounded-3xl"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

const Steps = ({
  progress1,
  progress2,
  progress3,
}: {
  progress1: number;
  progress2: number;
  progress3: number;
}) => {
  return (
    <div className="flex gap-4 md:gap-8 items-center max-w-[540px]">
      <StepItem title={"step 1"} progress={progress1} />
      <StepItem title={"step 2"} progress={progress2} />
      <StepItem title={"step 3"} progress={progress3} />
    </div>
  );
};
export default Steps;
