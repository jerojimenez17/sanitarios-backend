const xslx = require("xlsx");

module.exports = function readExcelFile(initRows, columns, filePath) {
  try {
    let obj = [];
    const workbook = xslx.readFile("" + filePath);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const products = [];
    let product = {};
    let i = 0;
    var range = xslx.utils.decode_range(sheet["!ref"]);
    // iterate over rows
    for (let rowNum = initRows; rowNum <= range.e.r; rowNum++) {
      // get cell[r,c] value where r = row, c = column
      const codeCell =
        sheet[xslx.utils.encode_cell({ r: rowNum, c: columns[0] })];
      const descriptionCell =
        sheet[xslx.utils.encode_cell({ r: rowNum, c: columns[1] })];
      const brandCell =
        sheet[
          xslx.utils.encode_cell({
            r: rowNum,
            c: columns[2] != -1 ? columns[2] : columns[0],
          })
        ];
      const ivaCell =
        sheet[
          xslx.utils.encode_cell({
            r: rowNum,
            c: columns[3] != -1 ? columns[3] : columns[0],
          })
        ];
      const priceCell =
        sheet[xslx.utils.encode_cell({ r: rowNum, c: columns[4] })];
      // create new product
      if (codeCell) {
        product = {
          id: filePath.split("/")[2].split(".")[0] + "-" + i++,
          cod: codeCell?.v,
          description: descriptionCell?.v,
          brand: columns[2] != -1 ? brandCell?.v : "",
          iva: columns[3] != -1 ? ivaCell?.v : "",
          price: priceCell?.v,
          amount: 0,
        };
        // add product to list
        products.push(product);
      }
    }
    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};
