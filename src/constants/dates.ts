export const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const dateObj = new Date();
export const month = dateObj.getUTCMonth() + 1; //months from 1-12
export const day = dateObj.getUTCDate();
export const year = dateObj.getUTCFullYear();

export const newDate = year + "/" + month + "/" + day;
