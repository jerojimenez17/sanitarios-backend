const readExcelFile = require("../utils/readExcelFile");

module.exports.getProducts = (req, res) => {
  const products = readExcelFile(
    1,
    4,
    [0, 1, -1, 6, 7],
    "./excel-files/taladro.xlsx"
  );

  res.send(products.map((product) => ({ ...product, price: product.price })));
};
module.exports.getProduct = (req, res) => {
  const products = readExcelFile(
    1,
    4,
    [0, 1, -1, 6, 7],
    "./excel-files/taladro.xlsx"
  );

  res.send(
    products.filter((product) => {
      return (
        product.cod
          .toString()
          .toLocaleLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "") == req.params.id &&
        product.description
          .toString()
          .toLocaleLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "") == req.params.desc.toLocaleLowerCase()
      );
    })
  );
};
