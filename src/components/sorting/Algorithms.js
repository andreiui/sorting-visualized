export const shuffleArray = (array, l, u) => {
  let animations = [];
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
  let animations = [];
  let minIndex;

  for (let i = l; i < u; i++) {
    minIndex = i;
    for (let j = i + 1; j < u; j++) {
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
  let animations = [];

  for (let j = u - 1; j >= 1; j--) {
    for (let i = l; i < j; i++) {
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
  let animations = [];

  for (let i = l; i < u - 1; i++) {
    let j;
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
  let animations = [];
  let mid;

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

  mid = Math.floor((l + u) / 2);

  animations = [
    ...mergeSort(array, l, mid),
    ...mergeSort(array, mid, u),
    ...mergeIntoArray(array, l, u, mid),
  ];

  return animations;
};

function mergeIntoArray(array, l, u, mid) {
  let arr = [...array];
  let k = l;
  let i = l;
  let j = mid;
  let animations = [];

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
  let animations = [];
  let pivot;

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
  let pivot = l;
  let i = l + 1;
  let j = u - 1;

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

export const heapSort = (array, l, u) => {
  let animations = [];

  for (let i = Math.floor((u - l) / 2) - 1; i >= 0; i--) {
    animations = [...animations, ...heapify(array, i, u)];
  }

  for (let i = u - 1; i > l; i--) {
    const a = {};
    a.swap = [l, i];
    array = swap(array, l, i);
    animations.push(a);
    animations = [...animations, ...heapify(array, l, i)];
  }

  return animations;
};

function heapify(array, root, n) {
  let animations = [];
  let largest = root;
  let left = 2 * root + 1;
  let right = 2 * root + 2;

  if (left < n) {
    const a = {};
    a.comp = [left, largest];
    if (array[left] > array[largest]) {
      largest = left;
    }
    animations.push(a);
  }

  if (right < n) {
    const a = {};
    a.comp = [right, largest];
    if (array[right] > array[largest]) {
      largest = right;
    }
    animations.push(a);
  }

  if (largest !== root) {
    const a = {};
    a.swap = [root, largest];
    array = swap(array, root, largest);
    animations.push(a);
    animations = [...animations, ...heapify(array, largest, n)];
  }

  return animations;
}

export const cocktailSort = (array, l, u) => {
  let animations = [];
  let i = l;
  let j = u - 1;

  while (j > i) {
    for (let k = i; k < j; k++) {
      const a = {};
      a.comp = [k, k + 1];
      if (array[k] > array[k + 1]) {
        array = swap(array, k, k + 1);
        a.swap = [k, k + 1];
      }
      animations.push(a);
    }
    for (let k = j - 2; k >= i; k--) {
      const a = {};
      a.comp = [k, k + 1];
      if (array[k] > array[k + 1]) {
        array = swap(array, k, k + 1);
        a.swap = [k, k + 1];
      }
      animations.push(a);
    }
    for (; array[i] + 1 === array[i + 1]; i++);
    for (; array[j] === array[j - 1] + 1; j--);
  }

  return animations;
};

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
}
