import React from 'react';
import { cn } from '@/lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full mb-4">
        {label && (
          <label className="block text-[#B47BA6] text-lg mb-2 font-medium">
            {label}
          </label>
        )}
        <input
          className={cn(
            "w-full py-2 px-4 rounded-full bg-[#F2B8B5] bg-opacity-30 border border-[#F2B8B5] text-[#B47BA6] placeholder-[#F2B8B5] focus:outline-none focus:ring-2 focus:ring-[#B47BA6] transition-all duration-200",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;