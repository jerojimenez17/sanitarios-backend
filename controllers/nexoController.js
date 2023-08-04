const readExcelFile = require("../utils/readExcelFile");

module.exports.getProducts = (req, res) => {
  const products = readExcelFile(
    1,
    21,
    [1, 3, -1, -1, 10],
    "./excel-files/nexo.xlsx"
  );
  res.send(
    products.map((product) => ({
      ...product,
      price: product.price * 1.21 * 1.5,
    }))
  );
};

module.exports.getProduct = (req, res) => {
  const products = readExcelFile(
    1,
    21,
    [1, 3, -1, -1, 10],
    "./excel-files/nexo.xlsx"
  );
  res.send(
    products
      .map((product) => ({
        ...product,
        price: product.price * 1.21 * 1.5,
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
