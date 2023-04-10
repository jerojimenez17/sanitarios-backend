const Afip = require("@afipsdk/afip.js");

const afip = new Afip({ CUIT: process.env.CUIT });
module.exports.generateVoucher = async (req, res) => {
  const { items, billingData } = req.body;

  /**
   * Numero del punto de venta
   **/
  const punto_de_venta = process.env.PUNTOVENTA;

  /**
   * Tipo de factura
   **/
  const tipo_de_factura = billingData.type; // 11 = Factura C

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
  const tipo_de_documento = billingData.client.docType;

  /**
   * Numero de documento del comprador (0 para consumidor final)
   **/
  const numero_de_documento = billingData.client.docNumber;

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
  const importe_total = items.reduce(
    (acc, item) => acc + item.price * item.amount
  );

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

    IVA:
      billingData.client.coditionIVA === "Excento"
        ? [
            {
              Id: 3,
              baseImp: importe_total,
              importe: 0,
            },
          ]
        : [],
  };

  /**
   * Creamos la Factura
   **/
  const resp = await afip.ElectronicBilling.createVoucher(data);

  /**
   * Mostramos por pantalla los datos de la nueva Factura
   **/
  console.log({
    cae: resp.CAE, //CAE asignado a la Factura
    vencimiento: resp.CAEFchVto, //Fecha de vencimiento del CAE
  });
};
