import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text",
  placeholder,
  className,
  disabled,
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2.5 text-sm bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "border-slate-200 focus:border-primary-500 focus:ring-primary-500/20 hover:border-slate-300",
    error: "border-error-300 focus:border-error-500 focus:ring-error-500/20 bg-error-50/30"
  };
  
  return (
    <input
      type={type}
      ref={ref}
      placeholder={placeholder}
      className={cn(
        baseStyles,
        error ? variants.error : variants.default,
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;