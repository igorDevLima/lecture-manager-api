const beginDateIsEarlierEndDates = (begin_date_time, end_date_time) => {
  if (begin_date_time < end_date_time) return true;

  return false;
};

module.exports = {
  beginDateIsEarlierEndDates,
};
