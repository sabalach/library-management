export const appendSuffix = (num = 1) => {
  let suffix = 'th';

  if (num === 0) suffix = '';
  if (num % 10 === 1 && num % 100 !== 11) suffix = 'st';
  if (num % 10 === 2 && num % 100 !== 12) suffix = 'nd';
  if (num % 10 === 3 && num % 100 !== 13) suffix = 'rd';

  return num + suffix;
};

export default {};
