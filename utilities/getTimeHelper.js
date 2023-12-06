import map from 'lodash/map';

export const getTimeHelper = (availability) => {
  const modify_availability = [];
  var flag = 0;
  map(availability, (a, i) => {
    map(modify_availability, (ma, i) => {
      if (ma.from_time === a.from_time && ma.to_time === a.to_time) {
        flag = 1;
        ma.days.push(a.day);
      }
    });
    if (flag === 0) {
      modify_availability.push({
        days: [a.day],
        from_time: a.from_time,
        to_time: a.to_time,
      });
    } else {
      flag = 0;
    }
  });

  return modify_availability;
};
