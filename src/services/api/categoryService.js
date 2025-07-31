import categoriesData from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.categories];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    const category = this.categories.find(cat => cat.id === id);
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  }

  async create(categoryData) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const newCategory = {
      id: categoryData.id || categoryData.name.toLowerCase().replace(/\s+/g, '-'),
      name: categoryData.name,
      color: categoryData.color || "from-slate-500 to-slate-600",
      icon: categoryData.icon || "Tag"
    };
    
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, categoryData) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const index = this.categories.findIndex(cat => cat.id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories[index] = { ...this.categories[index], ...categoryData };
    return { ...this.categories[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = this.categories.findIndex(cat => cat.id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories.splice(index, 1);
    return true;
  }
}

export const categoryService = new CategoryService();