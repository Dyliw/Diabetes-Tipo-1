import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CalendarView from '../../components/calendar/CalendarView';
import MealSlot from '../../components/meals/MealSlot';
import FoodPicker from '../../components/meals/FoodPicker';
import { useMeals } from '../../hooks/useMeals';
import { formatDate, todayISO } from '../../utils/dateUtils';
import './DailyMeal.css';

export default function DailyMealsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get('fecha') || todayISO();

  const [selectedDate, setSelectedDate] = useState(dateParam);
  const [monthCursor, setMonthCursor] = useState(new Date(dateParam));
  const [activeSlot, setActiveSlot] = useState('breakfast');

  const { mealTypes, getDay, addFoodToSlot, removeFoodFromSlot, clearSlot, markedDays } = useMeals();

  // Sincroniza el query param cuando cambia la fecha seleccionada
  useEffect(() => {
    setSearchParams({ fecha: selectedDate }, { replace: true });
  }, [selectedDate, setSearchParams]);

  // Sincroniza fecha si cambia desde la URL
  useEffect(() => {
    if (dateParam !== selectedDate) {
      setSelectedDate(dateParam);
      setMonthCursor(new Date(dateParam));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateParam]);

  const day = useMemo(() => getDay(selectedDate), [getDay, selectedDate]);

  const totalFoods = Object.values(day).reduce((sum, slot) => sum + slot.length, 0);

  return (
    <div className="daily-meals">
      <header className="daily-meals__header">
        <h2>🍽️ Registro de comidas</h2>
        <p>
          Organiza lo consumido en el día. <span className="demo-badge">Demostrativo</span>
        </p>
      </header>

      <div className="daily-meals__layout">
        {/* Columna izquierda: calendario + resumen */}
        <aside className="daily-meals__sidebar">
          <CalendarView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            markedDates={markedDays}
            monthCursor={monthCursor}
            onMonthChange={setMonthCursor}
          />

          <div className="daily-meals__summary">
            <p className="daily-meals__date">{formatDate(selectedDate)}</p>
            <p className="daily-meals__count">
              {totalFoods} alimento{totalFoods !== 1 ? 's' : ''} registrado{totalFoods !== 1 ? 's' : ''}
            </p>
          </div>
        </aside>

        {/* Columna central: 4 slots */}
        <section className="daily-meals__slots">
          {mealTypes.map((slot) => (
            <MealSlot
              key={slot.id}
              slot={slot}
              foods={day[slot.id] ?? []}
              onDropFood={(slotId, food) => addFoodToSlot(selectedDate, slotId, food)}
              onRemoveFood={(slotId, foodId) => removeFoodFromSlot(selectedDate, slotId, foodId)}
              onClearSlot={(slotId) => {
                if (window.confirm('¿Limpiar este apartado?')) {
                  clearSlot(selectedDate, slotId);
                }
              }}
            />
          ))}
        </section>

        {/* Columna derecha: biblioteca rápida */}
        <FoodPicker
          activeSlot={activeSlot}
          mealTypes={mealTypes}
          onSlotChange={setActiveSlot}
          onAddFood={(slotId, food) => addFoodToSlot(selectedDate, slotId, food)}
        />
      </div>
    </div>
  );
}