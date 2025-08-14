import axios from "axios";
const key = "68ahdg8ajhd";

export default async function getData(params) {
  const res = await axios.get("https://www.google.com");
  return res;
}

export { key };

console.log("module caching.....");
