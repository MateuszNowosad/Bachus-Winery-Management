const convertDatetime = date => {
  let newDate = new Date(Number(date));
  let converted = newDate.toISOString();
  return converted.replace('T', ' ').slice(0, -5);
};

export default convertDatetime;
