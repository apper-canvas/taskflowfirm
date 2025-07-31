import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskInput = ({ onAddTask, categories }) => {
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("work");
  const [dueDate, setDueDate] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
onAddTask({
        title: title.trim(),
        category: selectedCategory,
        dueDate: dueDate || null
      });
      setTitle("");
      setDueDate("");
      setShowOptions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === "Escape") {
      setShowOptions(false);
    }
  };

  const getQuickDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="What needs to be done today?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowOptions(true)}
              className="text-base py-3 px-4 font-medium placeholder:text-slate-400"
            />
          </div>
          <Button
            type="submit"
            disabled={!title.trim()}
            className="px-6"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Task
          </Button>
        </div>

        <motion.div
          initial={false}
          animate={{ 
            height: showOptions ? "auto" : 0,
            opacity: showOptions ? 1 : 0
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-3 pt-2">
            {/* Category Selection */}
            <div className="flex gap-2">
              <span className="text-sm text-slate-600 font-medium py-2">Category:</span>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
onClick={() => setSelectedCategory(category.Name)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
selectedCategory === category.Name
                      ? `bg-gradient-to-r ${category.color_c} text-white border-transparent shadow-sm`
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
<ApperIcon name={category.icon_c} size={12} className="mr-1" />
                  {category.Name}
                </button>
              ))}
            </div>

            {/* Due Date Options */}
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-600 font-medium">Due:</span>
              <button
                type="button"
                onClick={() => setDueDate(getQuickDate(0))}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                  dueDate === getQuickDate(0)
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-transparent shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setDueDate(getQuickDate(1))}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                  dueDate === getQuickDate(1)
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-transparent shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                Tomorrow
              </button>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-3 py-1.5 rounded-full text-xs border border-slate-200 hover:border-slate-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              {dueDate && (
                <button
                  type="button"
                  onClick={() => setDueDate("")}
                  className="px-2 py-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <ApperIcon name="X" size={12} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default TaskInput;