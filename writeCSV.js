const Excel = require("exceljs");

exports.writefile1 = async (array1, filePath) => {
  const fileName = "0_" + filePath;
  const wb = new Excel.Workbook();
  const ws = wb.addWorksheet("0_" + filePath);
  array1.forEach((element, i) => {
    const r = ws.getRow(i + 1);
    r.values = [element.prodcut, element.average];
  });

  wb.csv
    .writeFile(fileName)
    .then(() => {
      console.log("==========================================");
      console.log("Generating CSV file 1 successfully created");
      console.log("file name: ", fileName);
      console.log("==========================================");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.writefile2 = async (arra2, filePath) => {
  const fileName = "1_" + filePath;
  const wb = new Excel.Workbook();
  const ws = wb.addWorksheet("1_" + filePath);
  arra2.forEach((element, i) => {
    const r = ws.getRow(i + 1);
    r.values = [element.prodcut, element.popBrand];
  });

  wb.csv
    .writeFile(fileName)
    .then(() => {
      console.log("==========================================");
      console.log("Generating CSV file 2 successfully created");
      console.log("file name: ", fileName);
      console.log("==========================================");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
