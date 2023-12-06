import map from 'lodash/map';
export const putTimeHelper = (availability) => {
  const modified_availability = [];

  map(availability, (singleTime, i) => {
    map(singleTime.days, (day, i) => {
      modified_availability.push({
        day: day,
        from_time: singleTime.from_time,
        to_time: singleTime.to_time,
      });
    });
  });

  return modified_availability;
};
