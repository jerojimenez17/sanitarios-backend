const express = require("express");
const bodyParser = require("body-parser");
const readExcelFile = require("./utils/readExcelFile");
var cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// body parser to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API ROUTES

// app.post("/postFile",(req,res)=>{
//     const data=req.body;
// });

// ["code", "description", "brand", "iva", "price"]

app.get("/api/productos/taladro", (req, res) => {
  const products = readExcelFile(
    4,
    [0, 1, -1, 6, 7],
    "./excel-files/taladro.xlsx"
  );

  res.send(products.map((product) => ({ ...product, price: product.price })));
});
app.get("/api/productos/taladro/:id/:desc", (req, res) => {
  const products = readExcelFile(
    4,
    [0, 1, -1, 6, 7],
    "./excel-files/taladro.xlsx"
  );

  res.send(
    products.filter((product) => {
      return (
        product.cod == req.params.id &&
        product.description
          .toString()
          .toLocaleLowerCase()
          .replace(/\s/g, "-") == req.params.desc.toLocaleLowerCase()
      );
    })
  );
});

app.get("/api/productos/trebol", (req, res) => {
  const products = readExcelFile(
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
});

app.get("/api/productos/trebol/:id/:desc", (req, res) => {
  const products = readExcelFile(
    3,
    [0, 1, -1, 3, 2],
    "./excel-files/trebol.xlsx"
  );
  // set iva price
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
    .filter((product) =>
      products.filter((product) => {
        return (
          product.cod == req.params.id &&
          product.description
            .toString()
            .toLocaleLowerCase()
            .replace(/\s/g, "-") == req.params.desc.toLocaleLowerCase()
        );
      })
    );
  res.send(products);
});

app.get("/api/productos/cerrajeria", (req, res) => {
  const products = readExcelFile(
    6,
    [3, 1, 0, -1, 2],
    "./excel-files/cerrajeria.xlsx"
  );
  res.send(
    products.map((product) => ({
      ...product,
      price: product.price * 1.11 * 1.5,
    }))
  );
});
app.get("/api/productos/cerrajeria/:id/:desc", (req, res) => {
  const products = readExcelFile(
    6,
    [3, 1, 0, -1, 2],
    "./excel-files/cerrajeria.xlsx"
  );
  res.send(
    products
      .map((product) => ({
        ...product,
        price: product.price * 1.11 * 1.5,
      }))
      .filter((product) => {
        return (
          product.cod == req.params.id &&
          product.description
            .toString()
            .toLocaleLowerCase()
            .replace(/\s/g, "-") == req.params.desc.toLocaleLowerCase()
        );
      })
  );
});
app.get("/api/productos/paulo", (req, res) => {
  const products = readExcelFile(
    1,
    [0, 1, -1, -1, 2],
    "./excel-files/paulo.xlsx"
  );
  res.send(
    products.map((product) => ({
      ...product,
      price: product.price * 1.11 * 1.5,
    }))
  );
});
app.get("/api/productos/paulo/:id/:desc", (req, res) => {
  const products = readExcelFile(
    1,
    [0, 1, -1, -1, 2],
    "./excel-files/paulo.xlsx"
  );
  res.send(
    products
      .map((product) => ({
        ...product,
        price: product.price * 1.11 * 1.5,
      }))
      .filter((product) => {
        return (
          product.cod == req.params.id &&
          product.description
            .toString()
            .toLocaleLowerCase()
            .replace(/\s/g, "-") == req.params.desc.toLocaleLowerCase()
        );
      })
  );
});
app.get("/api/productos/nexo", (req, res) => {
  const products = readExcelFile(
    23,
    [0, 2, -1, -1, 9],
    "./excel-files/nexo.xlsx"
  );
  res.send(
    products.map((product) => ({
      ...product,
      price: product.price * 1.21 * 1.5,
    }))
  );
});
app.get("/api/productos/nexo/:id/:desc", (req, res) => {
  const products = readExcelFile(
    23,
    [0, 2, -1, -1, 9],
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
          product.cod == req.params.id &&
          product.description
            .toString()
            .toLocaleLowerCase()
            .replace(/\s/g, "-") == req.params.desc.toLocaleLowerCase()
        );
      })
  );
});
app.get("/api/productos/fg", (req, res) => {
  const products = readExcelFile(5, [0, 1, 2, -1, 3], "./excel-files/fg.xlsx");
  res.send(
    products.map((product) => ({
      ...product,
      price:
        (parseFloat(product.price) - parseFloat(product.price) * 0.2) * 1.5,
    }))
  );
});
app.get("/api/productos/fg/:id/:desc", (req, res) => {
  const products = readExcelFile(5, [0, 1, 2, -1, 3], "./excel-files/fg.xlsx");
  res.send(
    products
      .map((product) => ({
        ...product,
        price:
          (parseFloat(product.price) - parseFloat(product.price) * 0.2) * 1.5,
      }))
      .filter((product) => {
        return (
          product.cod.toString().toLocaleLowerCase().replace(/\//g, "-") ==
            req.params.id &&
          product.description
            .toString()
            .toLocaleLowerCase()
            .replace(/\s/g, "-") == req.params.desc.toLocaleLowerCase()
        );
      })
  );
});
app.get("/", (req, res) => {
  res.send("success");
});

app.get("/api/productos/bethular", (req, res) => {
  const products = readExcelFile(
    6,
    [1, 2, -1, -1, 3],
    "./excel-files/bethular.xlsx"
  );
  res.send(
    products.map((product) => ({
      ...product,
      price: product.price * 1.21 * 1.5,
    }))
  );
});
app.get("/api/productos/bethular/:id/:desc", (req, res) => {
  const products = readExcelFile(
    6,
    [1, 2, -1, -1, 3],
    "./excel-files/bethular.xlsx"
  );
  res.send(
    products
      .map((product) => ({
        ...product,
        price: product.price * 1.21 * 1.5,
      }))
      .filter((product) => {
        return (
          product.cod == req.params.id &&
          product.description
            .toString()
            .toLocaleLowerCase()
            .replace(/\s/g, "-") == req.params.desc.toLocaleLowerCase()
        );
      })
  );
});
app.get("/api/productos/jm", (req, res) => {
  const products = readExcelFile(2, [0, 1, 2, -1, 4], "./excel-files/jm.xlsx");
  res.send(
    products.map((product) => ({ ...product, price: product.price * 1.5 }))
  );
});
app.get("/api/productos/jm/:id/:desc", (req, res) => {
  const products = readExcelFile(2, [0, 1, 2, -1, 4], "./excel-files/jm.xlsx");
  res.send(
    products
      .map((product) => ({ ...product, price: product.price * 1.5 }))
      .filter((product) => {
        return (
          product.cod == req.params.id &&
          product.description
            .toString()
            .toLocaleLowerCase()
            .replace(/\s/g, "-") == req.params.desc.toLocaleLowerCase()
        );
      })
  );
});
app.get("/api/productos/paulo", (req, res) => {
  const products = readExcelFile(
    1,
    [0, 1, -1, -1, 2],
    "./excel-files/paulo.xlsx"
  );
  res.send(
    products.map((product) => ({ ...product, price: product.price * 1.5 }))
  );
});
app.get("/api/productos/paulo/:id/:desc", (req, res) => {
  const products = readExcelFile(
    1,
    [0, 1, -1, -1, 2],
    "./excel-files/paulo.xlsx"
  );
  res.send(
    products
      .map((product) => ({ ...product, price: product.price * 1.5 }))
      .filter((product) => {
        return (
          product.cod == req.params.id &&
          product.description
            .toString()
            .toLocaleLowerCase()
            .replace(/\s/g, "-") == req.params.desc.toLocaleLowerCase()
        );
      })
  );
});
app.get("/api/productos/foxs", (req, res) => {
  const products = readExcelFile(
    2,
    [0, 1, -1, -1, 2],
    "./excel-files/foxs.xlsx"
  );
  res.send(
    products.map((product) => ({
      ...product,
      price:
        (parseFloat(product.price) - parseFloat(product.price) * 0.2) * 1.5,
    }))
  );
});

app.get("/api/productos/foxs/:id/:desc", (req, res) => {
  const products = readExcelFile(
    2,
    [0, 1, -1, -1, 2],
    "./excel-files/foxs.xlsx"
  );
  res.send(
    products
      .map((product) => ({
        ...product,
        price:
          (parseFloat(product.price) - parseFloat(product.price) * 0.2) * 1.5,
      }))
      .filter((product) => {
        return (
          product.cod == req.params.id &&
          product.description
            .toString()
            .toLocaleLowerCase()
            .replace(/\s/g, "-") == req.params.desc.toLocaleLowerCase()
        );
      })
  );
});
app.get("/api/productos/ciardi", (req, res) => {
  const products = readExcelFile(
    12,
    [3, 4, 5, 6, 7],
    "./excel-files/ciardi.xlsx"
  );
  res.send(
    products.map((product) =>
      product.iva == "10.5"
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
});
app.get("/api/productos/ciardi/:id/:desc", (req, res) => {
  const products = readExcelFile(
    12,
    [3, 4, 5, 6, 7],
    "./excel-files/ciardi.xlsx"
  );
  res.send(
    products
      .map((product) =>
        product.iva == "10.5"
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
          product.cod.toString().toLocaleLowerCase() == req.params.id &&
          product.description
            .toString()
            .toLocaleLowerCase()
            .replace(/\s/g, "-") == req.params.desc.toLocaleLowerCase()
        );
      })
  );
});
// start server
const Port = process.env.PORT || 3002;
app.listen(Port, () => {
  console.log(`Listening in port ${process.env.PORT}`);
});
