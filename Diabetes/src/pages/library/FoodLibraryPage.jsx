import { useFoodLibrary } from '../../hooks/useFoodLibrary';
import FoodCard from '../../components/food/FoodCard';
import FoodFilters from '../../components/food/FoodFilters';
import './FoodLibraryPage.css';

export default function FoodLibraryPage() {
  const {
    foods,
    total,
    categories,
    query,
    setQuery,
    category,
    setCategory,
    sortBy,
    setSortBy,
    reset,
    meta,
  } = useFoodLibrary();

  return (
    <div className="food-library">
      <header className="food-library__header">
        <h2>🥗 Biblioteca de alimentos</h2>
        <p>
          Consulta fichas nutricionales por porción de referencia.{' '}
          <span className="demo-badge">Demostrativo</span>
        </p>
      </header>

      <FoodFilters
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        resultsCount={foods.length}
        total={total}
        onReset={reset}
      />

      {foods.length === 0 ? (
        <div className="food-library__empty">
          <p>🔍 No se encontraron alimentos con esos criterios.</p>
        </div>
      ) : (
        <div className="food-library__grid">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}

      <p className="food-library__note">{meta.note}</p>
    </div>
  );
}