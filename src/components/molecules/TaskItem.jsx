import React from "react";
import { motion } from "framer-motion";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskItem = ({ task, category, onToggleComplete, onDelete }) => {
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  const getDueDateColor = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    if (isPast(date) && !isToday(date)) return "text-error-600";
    if (isToday(date)) return "text-warning-600";
    return "text-slate-500";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group bg-white rounded-lg border border-slate-100 p-4 transition-all duration-200 hover:shadow-md hover:border-slate-200",
        task.completed && "opacity-75"
      )}
    >
      <div className="flex items-start gap-3">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-0.5"
        >
<Checkbox
            checked={task.completed_c}
            onChange={() => onToggleComplete(task.Id)}
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 
className={cn(
                "font-medium text-slate-900 transition-all duration-200",
                task.completed_c && "line-through text-slate-500"
              )}
            >
{task.title_c}
            </h3>
            
            <motion.button
              onClick={() => onDelete(task.Id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-error-500 transition-all duration-200 hover:bg-error-50 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ApperIcon name="Trash2" size={14} />
            </motion.button>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Badge variant={category.id} size="sm">
              <ApperIcon name={category.icon} size={10} className="mr-1" />
              {category.name}
            </Badge>
            
{task.dueDate_c && (
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                getDueDateColor(task.dueDate_c)
              )}>
                <ApperIcon name="Calendar" size={12} />
                {formatDueDate(task.dueDate_c)}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;