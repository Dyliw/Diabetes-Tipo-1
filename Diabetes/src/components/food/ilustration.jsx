import './ilustration.css';

export default function FoodIllustration({ food, size = 'md' }) {
  const { emoji, name, illustration } = food;

  // Si en el JSON existe `illustration` con una URL, se usa la imagen.
  if (illustration) {
    return (
      <div className={`food-illu food-illu--${size}`}>
        <img src={illustration} alt={name} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`food-illu food-illu--${size}`} role="img" aria-label={name}>
      <span className="food-illu__emoji">{emoji}</span>
    </div>
  );
}