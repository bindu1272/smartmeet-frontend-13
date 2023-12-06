import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import { WeekDays } from '../constants/keys';

export const getAddress = (addressObj) => {
  const add1 = get(addressObj, 'address_1') ? get(addressObj, 'address_1.selectedAddress') : '';
  const add2 = get(addressObj, 'address_2')
    ? `, ${get(addressObj, 'address_2.selectedAddress_2')}`
    : '';
  const postalCode = get(addressObj, 'pin_code')
    ? `, ${get(addressObj, 'pin_code')}`
    : '';
  const state = get(addressObj, 'state') ? `, ${get(addressObj, 'state')}` : '';
  const suburb = get(addressObj, 'suburb')
    ? `, ${get(addressObj, 'suburb')}`
    : '';
  return `${add1} ${add2}${suburb}${state}${postalCode}`;
};

export const getDoctorAddress = (addressObj) => {
  const add1 = get(addressObj, 'address_1') ? get(addressObj, 'address_1') : '';
  const add2 = get(addressObj, 'address_2')
    ? `, ${get(addressObj, 'address_2')}`
    : '';
  const postalCode = get(addressObj, 'pin_code')
    ? `, ${get(addressObj, 'pin_code')}`
    : '';
  const state = get(addressObj, 'state') ? `, ${get(addressObj, 'state')}` : '';
  const suburb = get(addressObj, 'suburb')
    ? `, ${get(addressObj, 'suburb')}`
    : '';
  return `${add1} ${add2}${suburb}${state}${postalCode}`;
};
export const getAvailabilityTime = (availability) => {
  availability = sortBy(availability, ['day']);
  availability = map(availability, (av) => {
    return {
      day: get(av, 'day'),
      dayName: WeekDays[get(av, 'day')] || null,
      from_time: moment(get(av, 'from_time'), 'HH:mm:ss').format('HH:mm'),
      to_time: moment(get(av, 'to_time'), 'HH:mm:ss').format('HH:mm'),
    };
  });

  availability = groupBy(availability, 'day');

  return availability;
};

export const generateSlots = (slots = [], date = null) => {
  const available_slots = filter(slots, (slot) => {
    return get(slot, 'booked') === false;
  });

  const isFutureDate = moment(date).isAfter(moment());

  console.log("isFutureDate", isFutureDate)

  const morningSlots = filter(slots, (slot) => {
    let slotStartTime = moment(get(slot, 'slot_start'), 'HH:mm');

    return ( (!get(slot, 'booked')
      && slotStartTime.isBefore(moment('12:00', 'HH:mm'))
      && (moment().isBefore(slotStartTime) || isFutureDate))
    );
  });

  const afternoonSlots = filter(slots, (slot) => {
    
    let slotStartTime = moment(get(slot, 'slot_start'), 'HH:mm');

    return (
      moment(get(slot, 'slot_start'), 'HH:mm').isBefore(
        moment('16:00', 'HH:mm')
      ) &&
      moment(get(slot, 'slot_start'), 'HH:mm').isSameOrAfter(
        moment('12:00', 'HH:mm')
      ) &&
      !get(slot, 'booked') && (moment().isBefore(slotStartTime) || isFutureDate)
    );
  });

  const eveningSlots = filter(slots, (slot) => {
    let slotStartTime = moment(get(slot, 'slot_start'), 'HH:mm');
    console.log(slotStartTime);
    return (
      !get(slot, 'booked') &&
      slotStartTime.isBefore(moment('23:59', 'HH:mm')) &&
      slotStartTime.isSameOrAfter(moment('16:00', 'HH:mm'))  &&
      (moment().isBefore(slotStartTime) || isFutureDate)
    );
  });

  console.log("morningSlots", morningSlots);
  console.log("afternoonSlots", afternoonSlots);
  console.log("eveningSlots", eveningSlots);

  return {
    // day: day,
    available_slots: available_slots.length,
    slots: [
      { slotName: 'Morning Slot', time: morningSlots },
      { slotName: 'Afternoon Slot', time: afternoonSlots },
      { slotName: 'Evening Slot', time: eveningSlots },
    ],
  };
};

export const sliceDate = (date) => {
  const slice = date.split(',');
  return slice[0] + ',' + slice[1];
};

export const getUrl = (apipath, params) => {
  let paramString = '';
  let firstparam = true;
  if (params) {
    paramString += '?';
    map(params, (value, key) => {
      if (firstparam) {
        paramString += `${key}=${value}`;
        firstparam = false;
      } else {
        paramString += `&${key}=${value}`;
      }
    });
  }
  return `${apipath}${paramString}`;
};