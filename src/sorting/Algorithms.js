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
  var minIndex;
  for (var i = l; i < u; i++) {
    minIndex = i;
    for (var j = i + 1; j < u; j++) {
      const a = {};
      a.comp = [j, minIndex];
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
      animations.push(a);
    }
    const a = {};
    array = swap(array, i, minIndex);
    a.swap = [i, minIndex];
    animations.push(a);
  }
  return animations;
};

export const bubbleSort = (array, l, u) => {
  var animations = [];
  for (var j = u - 1; j >= 1; j--) {
    for (var i = l; i < j; i++) {
      const a = {};
      a.comp = [i, i + 1];
      if (array[i] > array[i + 1]) {
        array = swap(array, i, i + 1);
        a.swap = [i, i + 1];
      }
      animations.push(a);
    }
  }
  return animations;
};

export const insertionSort = (array, l, u) => {
  var animations = [];
  var j;
  for (var i = l; i < u - 1; i++) {
    for (j = i + 1; j > 0 && array[j - 1] > array[j]; j--) {
      const a = {};
      a.comp = [j - 1, j];
      array = swap(array, j - 1, j);
      a.swap = [j - 1, j];
      animations.push(a);
    }
    if (j !== 0) {
      const a = {};
      a.comp = [j - 1, j];
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

export const quickSort = (array, l, u) => {
  var animations = [];
  var pivot;

  if (l === u || l + 1 === u) {
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

  pivot = quickSortPartition(array, l, u, animations);

  animations = [
    ...animations,
    ...quickSort(array, l, pivot),
    ...quickSort(array, pivot + 1, u),
  ];

  return animations;
};

function quickSortPartition(array, l, u, animations) {
  var pivot = l;
  var i = l + 1;
  var j = u - 1;

  while (pivot < j) {
    const a = {};
    a.comp = [pivot, i];
    if (array[i] < array[pivot]) {
      a.swap = [pivot, i];
      array = swap(array, i, pivot);
      i++;
      pivot++;
    } else {
      a.swap = [i, j];
      array = swap(array, i, j);
      j--;
    }
    animations.push(a);
  }

  return pivot;
}

export const heapSort = (array, l, u) => {};

function swap(array, i, j) {
  var temp;
  temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
}
