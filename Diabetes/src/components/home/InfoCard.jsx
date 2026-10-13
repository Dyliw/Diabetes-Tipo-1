import './InfoCard.css';

export default function InfoCard({ data }) {
  return (
    <article className="card info-card">
      <h3 className="card__title">{data.title}</h3>
      <p className="info-card__text">{data.text}</p>
      <span className="demo-badge demo-badge--inline">Información demostrativa</span>
    </article>
  );
}