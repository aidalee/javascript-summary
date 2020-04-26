const arr = [4, 3, 2, 6, 1, 5, 9, 7, 8, 18, -1, "A", "a", "B", "b"];
for (let i = 0; i < arr.length - 1; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] > arr[j]) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}
console.log(arr);
