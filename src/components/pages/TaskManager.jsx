import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import TaskInput from "@/components/molecules/TaskInput";
import SearchBar from "@/components/molecules/SearchBar";
import CategoryTabs from "@/components/molecules/CategoryTabs";
import TaskList from "@/components/organisms/TaskList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prevTasks => [newTask, ...prevTasks]);
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task. Please try again.");
      console.error("Error adding task:", err);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;

      const updatedTask = await taskService.update(taskId, {
        ...task,
        completed: !task.completed
      });

      setTasks(prevTasks =>
        prevTasks.map(t => t.Id === taskId ? updatedTask : t)
      );

      toast.success(
        updatedTask.completed ? "Task completed!" : "Task marked as incomplete"
      );
    } catch (err) {
      toast.error("Failed to update task. Please try again.");
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task. Please try again.");
      console.error("Error deleting task:", err);
    }
  };

  // Calculate task counts for each category
  const taskCounts = useMemo(() => {
    const counts = { all: tasks.filter(t => !t.completed).length };
    
    categories.forEach(category => {
      counts[category.id] = tasks.filter(t => 
        t.category === category.id && !t.completed
      ).length;
    });
    
    return counts;
  }, [tasks, categories]);

  if (loading) {
    return <Loading text="Loading your tasks..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <motion.header 
        className="bg-white border-b border-slate-200 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
                <ApperIcon name="CheckSquare" size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-sm text-slate-600">Stay organized, stay productive</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-slate-600">
                {taskCounts.all} active tasks
              </div>
              <div className="text-xs text-slate-500">
                {tasks.filter(t => t.completed).length} completed
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <TaskInput 
          onAddTask={handleAddTask}
          categories={categories}
        />

        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search tasks by title..."
            />
          </div>
        </div>

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          taskCounts={taskCounts}
        />

        <TaskList
          tasks={tasks}
          categories={categories}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
        />
      </main>
    </div>
  );
};

export default TaskManager;