const Afip = require("@afipsdk/afip.js");

const afip = new Afip({ CUIT: process.env.CUIT, production: true });
module.exports.generateVoucher = async (req, res) => {
  const { cartState } = req.body;

  /**
   * Numero del punto de venta
   **/
  const punto_de_venta = process.env.PUNTOVENTA;

  /**
   * Tipo de factura
   **/
  const tipo_de_factura = 11; // 11 = Factura C

  /**
   * Número de la ultima Factura C
   **/
  const last_voucher = await afip.ElectronicBilling.getLastVoucher(
    punto_de_venta,
    tipo_de_factura
  );

  /**
   * Concepto de la factura
   *
   * Opciones:
   *
   * 1 = Productos
   * 2 = Servicios
   * 3 = Productos y Servicios
   **/
  const concepto = 1;

  /**
   * Tipo de documento del comprador
   *
   * Opciones:
   *
   * 80 = CUIT
   * 86 = CUIL
   * 96 = DNI
   * 99 = Consumidor Final
   **/
  const tipo_de_documento =
    (cartState.typeDocument === "CUIT" || cartState.typeDocument === "DNI") &&
    Number(cartState.documentNumber) > 0
      ? cartState.typeDocument === "DNI"
        ? 96
        : 80
      : 99;
  // cartState.IVACondition == "Consumidor Final" ? 99 : 80;

  /**
   * Numero de documento del comprador (0 para consumidor final)
   **/
  const numero_de_documento =
    cartState.IVACondition == "Consumidor Final" &&
    Number(cartState.documentNumber) === 0
      ? 0
      : cartState.documentNumber;

  /**
   * Numero de factura
   **/
  const numero_de_factura = last_voucher + 1;

  /**
   * Fecha de la factura en formato aaaa-mm-dd (hasta 10 dias antes y 10 dias despues)
   **/
  const fecha = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  /**
   * Importe de la Factura
   **/
  const importe_total = cartState.products
    .reduce((acc, item) => acc + item.price * item.amount, 0)
    .toFixed(2);

  /**
   * Los siguientes campos solo son obligatorios para los conceptos 2 y 3
   **/

  const fecha_servicio_desde = null,
    fecha_servicio_hasta = null,
    fecha_vencimiento_pago = null;

  if (concepto === 2 || concepto === 3) {
    /**
     * Fecha de inicio de servicio en formato aaaammdd
     **/
    const fecha_servicio_desde = 20191213;

    /**
     * Fecha de fin de servicio en formato aaaammdd
     **/
    const fecha_servicio_hasta = 20191213;

    /**
     * Fecha de vencimiento del pago en formato aaaammdd
     **/
    const fecha_vencimiento_pago = 20191213;
  }

  const data = {
    CantReg: 1, // Cantidad de facturas a registrar
    PtoVta: punto_de_venta,
    CbteTipo: tipo_de_factura,
    Concepto: concepto,
    DocTipo: tipo_de_documento,
    DocNro: numero_de_documento,
    CbteDesde: numero_de_factura,
    CbteHasta: numero_de_factura,
    CbteFch: parseInt(fecha.replace(/-/g, "")),
    FchServDesde: fecha_servicio_desde,
    FchServHasta: fecha_servicio_hasta,
    FchVtoPago: fecha_vencimiento_pago,
    ImpTotal: importe_total,
    ImpTotConc: 0, // Importe neto no gravado
    ImpNeto: importe_total,
    ImpOpEx: 0,
    ImpIVA: 0,
    ImpTrib: 0, //Importe total de tributos
    MonId: "PES", //Tipo de moneda usada en la factura ('PES' = pesos argentinos)
    MonCotiz: 1, // Cotización de la moneda usada (1 para pesos argentinos)
  };

  /**
   * Creamos la Factura
   **/
  try {
    const resp = await afip.ElectronicBilling.createVoucher(data);

    const qrData = {
      ver: 1,
      fecha: parseInt(fecha.replace(/-/g, "")),
      cuit: process.env.CUIT,
      ptoVta: process.env.PtVta,
      tipoCmp: type,
      nroCmp: lastVoucher + 1,
      importe: 12100,
      moneda: "PES",
      ctz: 1,
      tipoDocRec: tipo_de_documento,
      nroDocRec: numero_de_documento,
      tipoCodAut: "E",
      codAut: resp["CAE"],
    };
    /**
     * Mostramos por pantalla los datos de la nueva Factura
     **/
    console.log({
      cae: resp.CAE, //CAE asignado a la Factura
      vencimiento: resp.CAEFchVto, //Fecha de vencimiento del CAE
      tipo_de_documento: tipo_de_documento,
      numero_de_documento: cartState.documentNumber,
    });
    res.send({
      afip: resp,
      ptoVenta: process.env.PUNTOVENTA,
      nroCbte: last_voucher + 1,
      qrData: `https://www.afip.gob.ar/fe/qr/?p=${JSON.stringify(qrData)}`,
    });
  } catch (error) {
    console.error(error);
  }
};
module.exports.getCustomer = async (req, res) => {
  const cuit = req.params.cuit;

  /**
   * Obtenemos los datos del contribuyente
   **/
  const datos = await afip.RegisterScopeFive.getTaxpayerDetails(cuit);

  if (!datos) {
    console.log("El contribuyente no existe en el padrón alcance 4.");
  } else {
    /**
     * Mostramos por pantalla los datos del contribuyente
     **/
    console.log(datos);
    res.send(datos);
  }
};
