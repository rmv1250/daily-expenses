import * as dayjs from "dayjs";

const minLength = (value: string, length: number) => {
  return value.trim().length >= length
}

const maxLength = (value: string, length: number) => {
  return value.trim().length <= length;
}

const intervalLength = (value: string, _minLength: number, _maxLength: number) => {
  return minLength(value, _minLength) && maxLength(value, _maxLength);
}

const isNumeric = (value: string | number) => {
  if (!value) {
    return false;
  }

  const floatValue = parseFloat(value.toString());
  return !isNaN(floatValue) && isFinite(floatValue);
}

const minValue = (value: string | number, _minValue: number) => {
  if (!isNumeric(value)) {
    return false;
  }

  const floatValue = parseFloat(value.toString());
  return floatValue >= _minValue;
}

const maxValue = (value: string | number, _maxValue: number) => {
  if (!isNumeric(value)) {
    return false;
  }

  const floatValue = parseFloat(value.toString());
  return floatValue <= _maxValue;
}

const intervalValue = (value: string | number, _minValue: number, _maxValue: number) => {
  return minValue(value, _minValue) && maxValue(value, _maxValue);
}

const minDate = (value: string, referenceDate: string | number | Date | dayjs.Dayjs) => {
  const valueDate = dayjs(value, 'D/MM/YYYY');
  const targetDate = dayjs(referenceDate, 'D/MM/YYYY');

  return valueDate.isSame(targetDate, 'day') || valueDate.isAfter(targetDate, 'day');
}

const maxDate = (value: string, referenceDate: string | number | Date | dayjs.Dayjs) => {
  const valueDate = dayjs(value, 'D/MM/YYYY');
  const targetDate = dayjs(referenceDate);

  return valueDate.isSame(targetDate, 'day') || valueDate.isBefore(targetDate, 'day');
}

const isUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}


export {
  minLength,
  maxLength,
  intervalLength,
  minValue,
  maxValue,
  intervalValue,
  isNumeric,
  minDate,
  maxDate,
  isUrl
}
