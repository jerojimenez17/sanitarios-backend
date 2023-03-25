const readExcelFile = require("../utils/readExcelFile");

module.exports.getProducts = (req, res) => {
  const products = readExcelFile(
    7,
    1,
    [0, 1, 2, -1, 3],
    "./excel-files/Luccini.xlsx"
  );
  res.send(
    products.map((product) => ({
      ...product,
      price:
        (parseFloat(product.price) * 1.21 -
          parseFloat(product.price) * 1.21 * 0.08) *
        1.5,
    }))
  );
};

module.exports.getProduct = (req, res) => {
  const products = readExcelFile(
    7,
    1,
    [0, 1, 2, -1, 3],
    "./excel-files/Luccini.xlsx"
  );
  res.send(
    products
      .map((product) => ({
        ...product,
        price:
          parseFloat(product.price) * 1.21 -
          parseFloat(product.price) * 0.08 * 1.5,
      }))
      .filter((product) => {
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
