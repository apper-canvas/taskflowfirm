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
      filtered = filtered.filter(task => task.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query)
      );
    }

    // Sort by completion status and creation order
    return filtered.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; // Completed tasks go to bottom
      }
      return b.order - a.order; // Most recent first
    });
  }, [tasks, activeCategory, searchQuery]);

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
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
            key={task.Id}
            task={task}
            category={getCategoryById(task.category)}
            onToggleComplete={onToggleComplete}
            onDelete={onDeleteTask}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;