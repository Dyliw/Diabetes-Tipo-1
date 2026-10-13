import './ProfileCard.css';

export default function ProfileCard({ profile }) {
  return (
    <article className="profile-card">
      <h3 className="card__title">Datos básicos</h3>

      <dl className="profile-card__list">
        <div><dt>Nombre</dt><dd>{profile.name}</dd></div>
        <div><dt>Edad</dt><dd>{profile.age} años</dd></div>
        <div><dt>Fecha de nacimiento</dt><dd>{profile.birthdate}</dd></div>
        <div><dt>Tipo de sangre</dt><dd>{profile.bloodType}</dd></div>
        <div><dt>Diagnóstico DT1</dt><dd>{profile.diagnosisDate}</dd></div>
        <div><dt>Insulina</dt><dd>{profile.insulinType}</dd></div>
        <div>
          <dt>Pulsera NFC</dt>
          <dd><code>{profile.nfcBraceletId}</code></dd>
        </div>
      </dl>
    </article>
  );
}