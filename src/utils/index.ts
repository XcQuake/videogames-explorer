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
  return metascore < 40 ? '#FF0100' : metascore > 74 ? '#6dc849' : '#FECC32';
};

// Parallax effect functions
export function setOnParallax(evt: React.MouseEvent, rect: HTMLElement) {
  rect.style.transform = `perspective(2000px) rotatey(${
    (evt.nativeEvent.offsetX - rect.offsetWidth / 2) / 8
  }deg) rotatex(${
    ((evt.nativeEvent.offsetY - rect.offsetHeight / 2) / 8) * -1
  }deg) scale(1.05)`;
}

export function setOffParallax(rect: HTMLElement) {
  rect.style.transform = ``;
}

// async image loading
export function loadImageAsync(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      resolve(url);
    };
  });
}
