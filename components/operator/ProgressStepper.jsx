'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { number: 1, label: 'Start Session' },
  { number: 2, label: 'Scan Package' },
  { number: 3, label: 'Validate' },
  { number: 4, label: 'QC Check' },
  { number: 5, label: 'Label' },
  { number: 6, label: 'Commit' },
];

export default function ProgressStepper({ currentStep, completedSteps }) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.number);
          const isCurrent = currentStep === step.number;
          const isUpcoming = step.number > currentStep;

          return (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all',
                    isCompleted && 'bg-green-500 text-white',
                    isCurrent && 'bg-blue-500 text-white ring-4 ring-blue-200',
                    isUpcoming && 'bg-gray-200 text-gray-500'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span
                  className={cn(
                    'text-xs mt-2 font-medium',
                    (isCompleted || isCurrent) && 'text-gray-900',
                    isUpcoming && 'text-gray-400'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 transition-all',
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}