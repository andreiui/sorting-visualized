export const shuffleArray = (array, l, u) => {
  var animations = [];
  let j;
  for (let i = u - 1; i > l; i--) {
    j = Math.floor(Math.random() * (i + 1));
    const a = {};
    a.comp = [i, j];
    a.swap = [i, j];
    array = swap(array, i, j);
    animations.push(a);
  }
  return animations;
};

export const selectionSort = (array, l, u) => {
  var animations = [];
  for (var i = l; i < u; i++) {
    for (var j = i + 1; j < u; j++) {
      const a = {};
      a.comp = [i, j];
      if (array[j] < array[i]) {
        array = swap(array, i, j);
        a.swap = [i, j];
      }
      animations.push(a);
    }
  }
  return animations;
};

export const mergeSort = (array, l, u) => {
  var animations = [];
  if (l + 1 === u) {
    return animations;
  }
  if (l + 1 === u - 1) {
    const a = {};
    a.comp = [l, u - 1];
    if (array[u - 1] < array[l]) {
      array = swap(array, l, u - 1);
      a.swap = [l, u - 1];
    }
    animations.push(a);
    return animations;
  }

  const mid = Math.floor((l + u) / 2);
  animations = [
    ...mergeSort(array, l, mid),
    ...mergeSort(array, mid, u),
    ...mergeIntoArray(array, l, u, mid),
  ];
  return animations;
};

function mergeIntoArray(array, l, u, mid) {
  let arr = [...array];
  var k = l;
  var i = l;
  var j = mid;
  var animations = [];

  while (i < mid && j < u) {
    const a = {};
    if (arr[i] <= arr[j]) {
      a.comp = [k, i];
      a.swap = [k, i];
      a.arr = [...arr];
      array[k++] = arr[i++];
    } else {
      a.comp = [k, j];
      a.swap = [k, j];
      a.arr = [...arr];
      array[k++] = arr[j++];
    }
    animations.push(a);
  }

  for (; i < mid; i++) {
    const a = {};
    a.swap = [k, i];
    a.arr = [...arr];
    array[k++] = arr[i];
    animations.push(a);
  }
  for (; j < u; j++) {
    const a = {};
    a.swap = [k, j];
    a.arr = [...arr];
    array[k++] = arr[j];
    animations.push(a);
  }

  return animations;
}

export function swap(array, i, j) {
  var temp;
  temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
}
