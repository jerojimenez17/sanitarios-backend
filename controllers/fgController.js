const readExcelFile = require("../utils/readExcelFile");

module.exports.getProducts = (req, res) => {
  const products = readExcelFile(
    1,
    5,
    [0, 1, 2, -1, 3],
    "./excel-files/fg.xlsx"
  );
  res.send(
    products.map((product) => ({
      ...product,
      price:
        (parseFloat(product.price) - parseFloat(product.price) * 0.2) * 2,
    }))
  );
};

module.exports.getProduct = (req, res) => {
  const products = readExcelFile(
    1,
    5,
    [0, 1, 2, -1, 3],
    "./excel-files/fg.xlsx"
  );
  res.send(
    products
      .map((product) => ({
        ...product,
        price:
          (parseFloat(product.price) - parseFloat(product.price) * 0.2) * 2,
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
