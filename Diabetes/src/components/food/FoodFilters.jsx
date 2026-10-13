import './FoodFilters.css';

export default function FoodFilters({
  query,
  setQuery,
  category,
  setCategory,
  sortBy,
  setSortBy,
  categories,
  resultsCount,
  total,
  onReset,
}) {
  return (
    <div className="food-filters">
      <div className="food-filters__row">
        <input
          type="search"
          placeholder="🔍 Buscar alimento, categoría o descripción..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="food-filters__search"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="food-filters__select"
        >
          <option value="name">Ordenar: A–Z</option>
          <option value="carbs-asc">Carbohidratos ↑</option>
          <option value="carbs-desc">Carbohidratos ↓</option>
          <option value="kcal-asc">Calorías ↑</option>
          <option value="kcal-desc">Calorías ↓</option>
        </select>
      </div>

      <div className="food-filters__chips">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`chip ${category === cat ? 'chip--active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="food-filters__meta">
        <span>
          Mostrando <strong>{resultsCount}</strong> de <strong>{total}</strong> alimentos
        </span>
        <button type="button" className="link-btn" onClick={onReset}>
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}