import { useState } from 'react';
import './DropArea.css';

export default function DragDropArea({ slotId, onDropFood, children }) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);

    const raw = e.dataTransfer.getData('application/json') || e.dataTransfer.getData('text/plain');
    if (!raw) return;

    try {
      const food = JSON.parse(raw);
      onDropFood(slotId, food);
    } catch (err) {
      console.warn('No se pudo interpretar el alimento soltado:', err);
    }
  };

  return (
    <div
      className={`drag-drop-area ${isOver ? 'drag-drop-area--over' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
      {isOver && <div className="drag-drop-area__hint">Suelta aquí 🍽️</div>}
    </div>
  );
}