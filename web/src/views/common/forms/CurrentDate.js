function currentDate() {
  const date = new Date();
  return date.toISOString().slice(0, 16);
}

export default currentDate;
