export const isMonday = (date: Date) => {
  const monday = 1;
  return date.getDay() === monday;
};
