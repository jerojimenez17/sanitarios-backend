const readExcelFile = require("../utils/readExcelFile");

module.exports.getProducts = (req, res) => {
  const products = readExcelFile(
    16,
    1,
    [0, 1, -1, -1, 2],
    "./excel-files/martin.xlsx"
  );
  res.send(
    products.map((product) => ({
      ...product,
      price:
      (product.description.includes("Ø"))? ((parseFloat(product.price) - parseFloat(product.price) *0.2) *1.21 *1.5)
      :((parseFloat(product.price) - parseFloat(product.price) *0.08) *1.21 *1.5)
    }))
  );
};

module.exports.getProduct = (req, res) => {
  const products = readExcelFile(
    16,
    1,
    [0, 1, -1, -1, 2],
    "./excel-files/martin.xlsx"
  );
  res.send(
    products
      .map((product) => ({
        ...product,
        price:
          parseFloat(product.price) * 1.21 * 1.5,
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
