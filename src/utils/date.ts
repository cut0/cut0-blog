export const formatDate = (timeString: string) => {
  const date = new Date(timeString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
