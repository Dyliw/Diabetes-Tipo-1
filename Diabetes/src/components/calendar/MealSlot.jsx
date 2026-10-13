import DragDropArea from './DragDropArea';
import './MealSlot.css';

export default function MealSlot({ slot, foods, onDropFood, onRemoveFood, onClearSlot }) {
  return (
    <article className="meal-slot">
      <header className="meal-slot__header">
        <h3 className="meal-slot__title">
          <span className="meal-slot__icon">{slot.icon}</span>
          {slot.label}
          <span className="meal-slot__count">{foods.length}</span>
        </h3>
        {foods.length > 0 && (
          <button
            type="button"
            className="meal-slot__clear"
            onClick={() => onClearSlot(slot.id)}
            title="Limpiar este apartado"
          >
            Limpiar
          </button>
        )}
      </header>

      <DragDropArea slotId={slot.id} onDropFood={onDropFood}>
        {foods.length === 0 ? (
          <p className="meal-slot__empty">
            Arrastra un alimento aquí o usa el buscador →
          </p>
        ) : (
          <ul className="meal-slot__list">
            {foods.map((f) => (
              <li key={f.foodId} className="meal-slot__item">
                <span className="meal-slot__emoji">{f.emoji}</span>
                <span className="meal-slot__name">{f.name}</span>
                <button
                  type="button"
                  className="meal-slot__remove"
                  onClick={() => onRemoveFood(slot.id, f.foodId)}
                  title="Quitar"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </DragDropArea>
    </article>
  );
}