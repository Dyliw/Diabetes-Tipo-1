import { Link } from 'react-router-dom';
import FoodIllustration from './ilustration';
import './FoodCard.css';

export default function FoodCard({ food }) {
  const { id, name, category, portion, nutrition } = food;

  return (
    <Link to={`/alimentos/${id}`} className="food-card">
      <FoodIllustration food={food} size="md" />

      <div className="food-card__body">
        <span className="food-card__category">{category}</span>
        <h3 className="food-card__name">{name}</h3>
        <p className="food-card__portion">
          {portion.size} {portion.unit}
        </p>

        <ul className="food-card__macros">
          <li>
            <span className="macro__value">{nutrition.energyKcal}</span>
            <span className="macro__label">kcal</span>
          </li>
          <li>
            <span className="macro__value">{nutrition.carbsG}</span>
            <span className="macro__label">g carbos</span>
          </li>
          <li>
            <span className="macro__value">{nutrition.proteinG}</span>
            <span className="macro__label">g prot.</span>
          </li>
        </ul>
      </div>
    </Link>
  );
}