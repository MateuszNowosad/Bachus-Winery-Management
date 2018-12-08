const convertDate = date => {
  const convertedDate = new Date(date);
  let dateString = convertedDate.toISOString();
  return dateString.replace('T', ' ').slice(0, -5);
};

export default convertDate;
