const axios = require("axios");
let arr = [];
let memo_arr = [];
let bank_ip = "54.183.16.194";
let payment_account =
  "6e5ea8507e38be7250cde9b8ff1f7c8e39a1460de16b38e6f4d5562ae36b5c1a";
let url =
  "http://" +
  bank_ip +
  "/bank_transactions?account_number=&block__balance_key=&block__sender=" +
  payment_account +
  "&fee=&format=json&id=&limit=100&offset=&recipient=";

async function task(urlz) {
  const { data } = await axios.get(urlz);
  url = data.next;

  arr = arr.concat(data.results);

  if (url != null) {
    task(url);
  } else {
    let i = 0;
    while (i < arr.length) {
      if (arr[i].memo != "") {
        memo_arr = memo_arr.concat(arr[i].memo);
      }

      i = i + 1;
    }
    let n = memo_arr.length;
    findduplicates(memo_arr, n);
  }
}
task(url);

function findduplicates(arr, n) {
  let visited = Array.from({ length: n }, (_, i) => false);
  for (let i = 0; i < n; i++) {
    if (visited[i] == true) continue;
    let count = 1;
    for (let j = i + 1; j < n; j++) {
      if (arr[i] == arr[j]) {
        visited[j] = true;
        count++;
      }
    }
    if (count > 1) {
      console.log(memo_arr[i] + " -> " + count + "\n");
    }
  }
}
