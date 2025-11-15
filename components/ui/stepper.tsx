interface StepperProps {
  length: number;
  currentStep?: number;
  title?: string;
}

export default function Stepper({
  length,
  currentStep = 1,
  title,
}: Readonly<StepperProps>) {
  return (
    <span className="flex items-center gap-2 text-sm p-0">
      {title && <p className="m-0 text-neutral-500">{title}</p>}
      <div className="flex items-center gap-1">
        {Array.from({ length }, (_, idx) => "child" + idx).map((key, idx) => (
          <div
            key={key}
            className={`w-2 h-2 rounded-full ${
              currentStep > idx ? "bg-brand-600" : "bg-neutral-300"
            }`}
          ></div>
        ))}
      </div>
    </span>
  );
}
