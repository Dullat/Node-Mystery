import getData, { key as user_key } from "./getData.mjs";
import fs from "fs"; // file name should be .mjs and run using .mjs not .js

const data = getData();
data.then((data) => {
  console.log(data);
  console.log(user_key);
});
