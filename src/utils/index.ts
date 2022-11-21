import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function checkKey(val: boolean, key: string) {
  return val && key;
}

export const formatMonths = (firstMonth: string, secondMonth: string) => {
  return {
    first: firstMonth && format(new Date(firstMonth), 'LLL', { locale: ru }),
    second: secondMonth && format(new Date(secondMonth), 'LLL', { locale: ru }),
  };
};

export function cutTegs(str: string) {
  var regex = /<\/?[^>]+(>|$)/gi;
  return str.replace(regex, '');
}

export const getMetacriticColor = (metascore: number): string => {
  return metascore < 40 ? 'red' : metascore > 74 ? 'green' : 'yellow';
};
