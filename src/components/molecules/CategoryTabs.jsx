import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CategoryTabs = ({ categories, activeCategory, onCategoryChange, taskCounts }) => {
  const allCategory = {
    id: "all",
    name: "All Tasks",
    icon: "List",
    color: "from-slate-500 to-slate-600"
  };

  const tabs = [allCategory, ...categories];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((category) => {
const count = taskCounts[category.Name] || 0;
        const isActive = activeCategory === category.Name;
        
        return (
          <motion.button
key={category.Name}
            onClick={() => onCategoryChange(category.Name)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200",
              isActive
? `bg-gradient-to-r ${category.color_c} text-white shadow-md transform scale-[1.02]`
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
            )}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
<ApperIcon name={category.icon_c} size={16} />
            <span>{category.Name}</span>
            {count > 0 && (
              <span 
                className={cn(
                  "ml-1 px-2 py-0.5 rounded-full text-xs font-semibold",
                  isActive 
                    ? "bg-white/20 text-white" 
                    : "bg-slate-100 text-slate-600"
                )}
              >
                {count}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;