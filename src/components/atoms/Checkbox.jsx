import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  checked = false,
  onChange,
  className,
  disabled,
  ...props 
}, ref) => {
  return (
    <button
      type="button"
      ref={ref}
      onClick={() => onChange && onChange(!checked)}
      className={cn(
        "flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500",
        checked 
          ? "bg-gradient-to-br from-primary-500 to-primary-600 border-primary-500 text-white shadow-sm" 
          : "border-slate-300 bg-white hover:border-primary-400 hover:bg-primary-50",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          size={12} 
          className="text-white drop-shadow-sm" 
        />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;