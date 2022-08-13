const { readfile } = require("./readCSV");

console.log("Please enter your file name:");
process.stdin.on("data", (data) => {
  readfile(data.toString());
});
