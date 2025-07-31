import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "@/components/molecules/TaskItem";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks, 
  categories, 
  activeCategory, 
  searchQuery, 
  onToggleComplete, 
  onDeleteTask 
}) => {
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by category
if (activeCategory !== "all") {
      const selectedCategory = categories.find(cat => cat.Name === activeCategory);
      if (selectedCategory) {
        filtered = filtered.filter(task => task.category_c?.Id === selectedCategory.Id);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
filtered = filtered.filter(task => 
        task.title_c?.toLowerCase().includes(query)
      );
    }

    // Sort by completion status and creation order
return filtered.sort((a, b) => {
      if (a.completed_c !== b.completed_c) {
        return a.completed_c ? 1 : -1; // Completed tasks go to bottom
      }
      return (b.order_c || 0) - (a.order_c || 0); // Most recent first
    });
  }, [tasks, activeCategory, searchQuery]);

const getCategoryById = (categoryLookup) => {
    if (!categoryLookup?.Id) return categories[0];
    return categories.find(cat => cat.Id === categoryLookup.Id) || categories[0];
  };

  if (filteredTasks.length === 0) {
    const isSearching = searchQuery.trim().length > 0;
    const isFiltered = activeCategory !== "all";
    
    return (
      <Empty
        title={isSearching ? "No tasks found" : isFiltered ? "No tasks in this category" : "No tasks yet"}
        description={
          isSearching 
            ? "Try adjusting your search terms"
            : isFiltered 
            ? "Tasks in this category will appear here"
            : "Add your first task to get started"
        }
        actionText={!isSearching && !isFiltered ? "Add your first task" : undefined}
        onAction={() => {
          // Focus on the task input
          const taskInput = document.querySelector('input[placeholder*="What needs"]');
          if (taskInput) {
            taskInput.focus();
          }
        }}
      />
    );
  }

  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <TaskItem
task={task}
            category={getCategoryById(task.category_c)}
            onToggleComplete={onToggleComplete}
            onToggleComplete={onToggleComplete}
            onDelete={onDeleteTask}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;