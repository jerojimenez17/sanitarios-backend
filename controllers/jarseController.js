const readExcelFile = require("../utils/readExcelFile");

module.exports.getProducts = (req, res) => {
  const products = readExcelFile(
    1,
    4,
    [0, 4, 3, -1,5],
    "./excel-files/jarse.xlsx"
  );
  res.send(
    products.map((product) => ({
      ...product,
      price: parseFloat(product.price)*1.11* 2,


    }))
  );
};

module.exports.getProduct = (req, res) => {
  const products = readExcelFile(
    1,
    2,
    [0, 4, 3, -1, 5],
    "./excel-files/jarse.xlsx"
  );
  res.send(
    products
      .map((product) => ({
        ...product,
        price:
        parseFloat(product.price)*1.11* 2,
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
