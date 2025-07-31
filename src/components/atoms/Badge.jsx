import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children,
  variant = "default",
  size = "md",
  className,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-all duration-200";
  
  const variants = {
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    work: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm",
    personal: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm",
    urgent: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm",
    meeting: "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm"
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm"
  };
  
  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;