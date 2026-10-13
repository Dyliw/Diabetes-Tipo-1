import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFoodLibrary } from '../../hooks/useFoodLibrary';
import FoodIllustration from '../../components/meals/ilustration';
import './FoodDetail.css';

function NutriRow({ label, value, unit, highlight }) {
  return (
    <div className={`nutri-row ${highlight ? 'nutri-row--highlight' : ''}`}>
      <span className="nutri-row__label">{label}</span>
      <span className="nutri-row__value">
        {value != null ? `${value} ${unit}` : '—'}
      </span>
    </div>
  );
}

export default function FoodDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById } = useFoodLibrary();
  const food = getById(id);

  if (!food) {
    return (
      <div className="food-detail__notfound">
        <h2>😕 Alimento no encontrado</h2>
        <p>El alimento que buscas no está en la biblioteca.</p>
        <Link to="/alimentos" className="btn-primary">← Volver a la biblioteca</Link>
      </div>
    );
  }

  const { name, category, portion, nutrition, description } = food;

  return (
    <div className="food-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="food-detail__grid">
        <div className="food-detail__hero">
          <FoodIllustration food={food} size="lg" />
          <span className="food-detail__category">{category}</span>
          <h2 className="food-detail__name">{name}</h2>
          <p className="food-detail__portion">
            Porción de referencia: <strong>{portion.size} {portion.unit}</strong>
            {portion.grams && <span className="food-detail__grams"> ({portion.grams} g)</span>}
          </p>
          <p className="food-detail__desc">{description}</p>
        </div>

        <div className="food-detail__nutrition">
          <h3>📊 Información nutricional</h3>
          <p className="food-detail__nutrition-sub">
            Valores por porción de referencia <span className="demo-badge">Demostrativo</span>
          </p>

          <div className="nutri-table">
            <NutriRow label="Energía" value={nutrition.energyKcal} unit="kcal" highlight />
            <NutriRow label="Carbohidratos totales" value={nutrition.carbsG} unit="g" highlight />
            <NutriRow label="Proteínas" value={nutrition.proteinG} unit="g" />
            <NutriRow label="Grasas totales" value={nutrition.fatG} unit="g" />
            <NutriRow label="Fibra alimentaria" value={nutrition.fiberG} unit="g" />
            <NutriRow
              label="Índice glucémico"
              value={nutrition.glycemicIndex}
              unit=""
            />
          </div>

          <p className="food-detail__disclaimer">
            ℹ️ Esta información es de consulta. No prescribe dietas ni recomienda dosis de insulina.
          </p>
        </div>
      </div>
    </div>
  );
}