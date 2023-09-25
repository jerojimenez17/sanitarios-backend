const readExcelFile = require("../utils/readExcelFile");

module.exports.getProducts = (req, res) => {
  const products = readExcelFile(
    1,
    4,
    [0, 1, 6, 5, 3],
    "./excel-files/taladro.xlsx"
  );

  res.send(products.map((product) => {
    (product.iva==="A")?
      product.price= product.price*1.21 :
      (product.iva==="C")?
        product.price=product.price*1.105:
        product.price=product.price
        return{ ...product,price:product.price*1.5}

     }))
};
module.exports.getProduct = (req, res) => {
  const products = readExcelFile(
    1,
    4,
    [0, 1, 6, 5, 3],
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
