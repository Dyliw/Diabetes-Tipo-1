import { useMemo, useState } from 'react';
import foodsData from '../../data/foods.json';
import './FoodPicker.css';

export default function FoodPicker({ activeSlot, mealTypes, onAddFood, onSlotChange }) {
  const [query, setQuery] = useState('');

  const foods = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return foodsData.foods;
    return foodsData.foods.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handleDragStart = (e, food) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ id: food.id, name: food.name, emoji: food.emoji })
    );
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <aside className="food-picker">
      <h3 className="food-picker__title">🍎 Biblioteca rápida</h3>

      <label className="food-picker__slot-label">
        Añadir a:
        <select
          value={activeSlot}
          onChange={(e) => onSlotChange(e.target.value)}
        >
          {mealTypes.map((m) => (
            <option key={m.id} value={m.id}>
              {m.icon} {m.label}
            </option>
          ))}
        </select>
      </label>

      <input
        type="search"
        placeholder="🔍 Buscar alimento..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="food-picker__search"
      />

      <ul className="food-picker__list">
        {foods.map((f) => (
          <li
            key={f.id}
            className="food-picker__item"
            draggable
            onDragStart={(e) => handleDragStart(e, f)}
            title="Arrastra al apartado correspondiente"
          >
            <span className="food-picker__emoji">{f.emoji}</span>
            <span className="food-picker__name">{f.name}</span>
            <button
              type="button"
              className="food-picker__add"
              onClick={() =>
                onAddFood(activeSlot, { id: f.id, name: f.name, emoji: f.emoji })
              }
              title="Añadir al apartado seleccionado"
            >
              +
            </button>
          </li>
        ))}

        {foods.length === 0 && (
          <li className="food-picker__empty">Sin resultados</li>
        )}
      </ul>

      <p className="food-picker__hint">
        💡 Arrastra o presiona <strong>+</strong>
      </p>
    </aside>
  );
}