const arr = [4, 3, 2, 5, 1, 16, 15, 18, -9, -7, -1, "A", "a", "B", "b", "ab"];

for (let i = 0; i < arr.length - 1; i++) {
  let min = arr[i + 1];
  let min_index = i + 1;
  for (let j = i + 1; j < arr.length; j++) {
    if (min > arr[j]) {
      min = arr[j];
      min_index = j;
    }
  }
  //   console.log(min);
  if (min < arr[i]) {
    for (let m = min_index; m > i; m--) {
      arr[m] = arr[m - 1];
    }
    arr[i] = min;
  }
}
console.log(arr);
