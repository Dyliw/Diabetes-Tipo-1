import { useMemo, useState } from 'react';
import data from '../data/food.json';

export function useFoodLibrary() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['Todas', ...data.meta.categories];

  const filtered = useMemo(() => {
    let list = [...data.foods];

    if (category !== 'Todas') {
      list = list.filter((f) => f.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'carbs-asc':
        list.sort((a, b) => a.nutrition.carbsG - b.nutrition.carbsG);
        break;
      case 'carbs-desc':
        list.sort((a, b) => b.nutrition.carbsG - a.nutrition.carbsG);
        break;
      case 'kcal-asc':
        list.sort((a, b) => a.nutrition.energyKcal - b.nutrition.energyKcal);
        break;
      case 'kcal-desc':
        list.sort((a, b) => b.nutrition.energyKcal - a.nutrition.energyKcal);
        break;
      default:
        list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [query, category, sortBy]);

  const getById = (id) => data.foods.find((f) => f.id === id);

  const reset = () => {
    setQuery('');
    setCategory('Todas');
    setSortBy('name');
  };

  return {
    foods: filtered,
    total: data.foods.length,
    categories,
    query,
    setQuery,
    category,
    setCategory,
    sortBy,
    setSortBy,
    getById,
    reset,
    meta: data.meta,
  };
}