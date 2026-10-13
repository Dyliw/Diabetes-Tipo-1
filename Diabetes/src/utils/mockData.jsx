export const demoUser = {
  name: 'Mar Martínez',
  age: 9,
  insulinType: 'Lispro (rápida)',
  tutor: 'Mariana Martínez',
};

export const demoDailySummary = {
  lastInsulin: {
    time: '07:45',
    dose: '4 UI',
    type: 'Lispro',
    status: 'Registrada por tutor',
  },
  mealsRegistered: 2,
  mealsTotal: 4,
  nextMeal: 'Comida (14:00)',
  glucose: '112 mg/dL',
};

export const demoInsulinHistory = [
  { id: 1, date: '2025-01-15', time: '07:45', dose: '4 UI', type: 'Lispro' },
  { id: 2, date: '2025-01-15', time: '13:30', dose: '3 UI', type: 'Lispro' },
  { id: 3, date: '2025-01-14', time: '20:00', dose: '5 UI', type: 'Glargina' },
];

export const demoMarkedDays = [3, 5, 8, 10, 12, 14, 15];

export const demoInfoCard = {
  title: '¿Qué es la diabetes tipo 1?',
  text: 'La diabetes tipo 1 es una condición en la que el cuerpo no produce insulina. Requiere administración diaria de insulina, monitoreo de la glucosa y una alimentación equilibrada. El acompañamiento de tutores y del equipo de salud es clave.',
};