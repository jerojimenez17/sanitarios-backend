const readExcelFile = require("../utils/readExcelFile");

module.exports.getProducts = (req, res) => {
  const products = readExcelFile(
    1,
    3,
    [0, 1, -1, 3, 2],
    "./excel-files/trebol.xlsx"
  );
  // set iva price
  res.send(
    products.map((product) =>
      product.iva == "B"
        ? {
            ...product,
            price: product.price * 1.1 * 1.5,
          }
        : {
            ...product,
            price: product.price * 1.21 * 1.5,
          }
    )
  );
};
module.exports.getProduct = (req, res) => {
  const products = readExcelFile(
    1,
    3,
    [0, 1, -1, 3, 2],
    "./excel-files/trebol.xlsx"
  );
  // set iva price
  res.send(
    products
      .map((product) =>
        product.iva == "B"
          ? {
              ...product,
              price: product.price * 1.1 * 1.5,
            }
          : {
              ...product,
              price: product.price * 1.21 * 1.5,
            }
      )
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
