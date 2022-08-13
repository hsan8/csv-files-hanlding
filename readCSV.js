const Excel = require("exceljs");
const { writefile1, writefile2 } = require("./writeCSV");
const wb = new Excel.Workbook();
exports.readfile = async (filePath) => {
  filePath = filePath.replace(/^\s+|\s+$/gm, "");
  wb.csv
    .readFile(filePath)
    .then((ws) => {
      if (this.checkFileSize(ws)) {
        this.loopRows(ws, filePath);
      } else {
        console.log("end of processing");
        return false;
      }
    })
    .catch(() => {
      console.log("file not found or invalid format");
    });
};

exports.checkFileSize = (ws) => {
  if (ws.actualRowCount == 1) {
    console.log("your file cannot be empty");
    return false;
  }
  if (ws.actualRowCount > Math.pow(10, 4)) {
    console.log("your file large than 10^4 column");
    return false;
  } else {
    return true;
  }
};

exports.loopRows = (ws, filePath) => {
  let i = ws.actualRowCount;
  let productAVG = [];
  let productPopBra = [];
  let allRows = [];
  for (let i = 1; i <= ws.actualRowCount; i++) {}
  while (i--) {
    const name = ws.getRow(i).getCell(3).toString();
    const qty = ws.getRow(i).getCell(4).toString();
    const brand = ws.getRow(i).getCell(5).toString();
    if (name && parseInt(qty) && brand) allRows.push({ name: name, qty: parseInt(qty), brand: brand });
  }
  this.averageNumber(allRows, productAVG, filePath);
  this.popularBrand(allRows, productPopBra, filePath);
};
/**
 *
 * @param {Array} allRows
 * @param {Array} productAVG
 */
exports.averageNumber = (allRows, productAVG, filePath) => {
  const totalOrder = allRows.length;
  allRows.forEach((element, i) => {
    arrayObjectIndexOf(productAVG, "prodcut", element.name, (find) => {
      if (find == -1) {
        let average = allRows[i].qty / totalOrder;
        productAVG.push({ prodcut: allRows[i].name, average: Number(average.toFixed(3)), total: allRows[i].qty });
      } else {
        let newTotal = productAVG[find].total + allRows[i].qty;
        productAVG[find].total = newTotal;
        let average = productAVG[find].total / totalOrder;
        productAVG[find].average = Number(average.toFixed(3));
      }
    });
  });
  writefile1(productAVG, filePath);
  return;
};
/**
 *
 * @param {Array} allRows
 * @param {Array} productPopBra
 */
exports.popularBrand = (allRows, productPopBra, filePath) => {
  allRows.forEach((element, i) => {
    arrayObjectIndexOf(productPopBra, "prodcut", element.name, (find) => {
      if (find == -1) {
        productPopBra.push({ prodcut: allRows[i].name, brand: [{ brandName: allRows[i].brand, numberOfTimes: 1 }], popBrand: allRows[i].brand });
      } else {
        let brandArray = productPopBra[find].brand;
        arrayObjectIndexOf(brandArray, "brandName", element.brand, (index) => {
          // if brand not exists
          if (index == -1) {
            brandArray.push({ brandName: element.brand, numberOfTimes: 1 });
            brandArray.sort((b1, b2) => {
              return b1.numberOfTimes - b2.numberOfTimes;
            });
            brandArray.reverse();
            productPopBra[find].popBrand = brandArray[0].brandName;
          }
          // if brand exists
          else {
            brandArray[index].numberOfTimes += 1;
            brandArray.sort((b1, b2) => {
              return b1.numberOfTimes - b2.numberOfTimes;
            });
            brandArray.reverse();
            productPopBra[find].popBrand = brandArray[0].brandName;
          }
        });
      }
    });
  });
  writefile2(productPopBra, filePath);
};

function arrayObjectIndexOf(array, property, searchTerm, callback) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i][property] === searchTerm) {
      callback(i);
      return;
    }
  }
  callback(-1);
  return;
}
