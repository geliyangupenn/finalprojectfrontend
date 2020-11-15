export const isToday = (inputDate) => {
  const copiedDate = new Date(inputDate.getTime());
  const today = new Date();
  return copiedDate.setHours(0,0,0,0) === today.setHours(0,0,0,0);
}

export const getTime = (date) => {
  return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

export const getDate = (date) => {
  return date.toLocaleDateString();
}