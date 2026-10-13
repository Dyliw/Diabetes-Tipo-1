import './Tutor.css';

export default function TutorContacts({ tutors }) {
  return (
    <article className="tutor-contacts">
      <h3 className="card__title">Tutores autorizados</h3>

      <ul className="tutor-contacts__list">
        {tutors.map((t) => (
          <li key={t.id} className="tutor-contacts__item">
            <div className="tutor-contacts__avatar">
              {t.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <div className="tutor-contacts__info">
              <p className="tutor-contacts__name">
                {t.name}
                {t.isPrimary && <span className="badge-primary">Principal</span>}
              </p>
              <p className="tutor-contacts__rel">{t.relationship}</p>
              <a href={`tel:${t.phone}`} className="tutor-contacts__phone">
                📞 {t.phone}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}