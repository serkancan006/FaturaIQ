import { FieldArray, FormikHelpers, useFormik } from "formik";
import InvoiceService, { CreateInvoiceType } from "../../services/InvoiceService";
import { CreateInvoiceValidationSchema } from "../../schema/CreateInvoiceValidationSchema";
import NotifyService from "../../services/NotifyService";

const InvoiceCreatePage = () => {
  const onSubmit = async (
    values: CreateInvoiceType,
    actions: FormikHelpers<CreateInvoiceType>
  ) => {
    //console.log(values);
    const response = await InvoiceService.createInvoice(values);
    if (response.status === 200) {
      NotifyService.messageHot("Fatura Başarıyla Oluşuruldu", { type: "success" });
    }
    actions.resetForm();
  };

  const formik = useFormik<CreateInvoiceType>({
    initialValues: {
      receiverTaxNumber: "",
      discountRate: null,
      kdvRate: null,
      withholdingRate: null,
      items: [
        {
          name: "",
          description: "",
          quantity: null,
          unitPrice: null,
        },
      ],
      invoiceType: null,
      scenarioType: null,
    },
    onSubmit: onSubmit,
    validationSchema: CreateInvoiceValidationSchema,
  });

  console.log("Formik Errors on Submit:", formik.errors.items); 

  return (
    <div className="mb-5">
      <h2>Fatura Oluşturma Sayfası</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Receiver Tax Number */}
        <div className="mb-3">
          <label className="form-label">Receiver Tax Number</label>
          <input
            type="text"
            className="form-control"
            name="receiverTaxNumber"
            placeholder="Enter receiver tax number"
            onChange={formik.handleChange}
            value={formik.values.receiverTaxNumber}
          />
          {formik.touched.receiverTaxNumber && formik.errors.receiverTaxNumber && (
            <div className="text-danger">{formik.errors.receiverTaxNumber}</div>
          )}
        </div>

        {/* Discount Rate */}
        <div className="mb-3">
          <label className="form-label">Discount Rate</label>
          <input
            type="number"
            step="0.01"  // Ondalık değeri 2 haneli basamağa kadar alacak şekilde ayarlandı
            min="0"      // Minimum değer, 0 veya daha büyük
            max="1"      // Maksimum değer, 1 veya daha küçük
            className="form-control"
            name="discountRate"
            placeholder="Enter discount rate"
            onChange={formik.handleChange}
            value={formik.values.discountRate || ""}
          />
          {formik.touched.discountRate && formik.errors.discountRate && (
            <div className="text-danger">{formik.errors.discountRate}</div>
          )}
        </div>

        {/* KDV Rate */}
        <div className="mb-3">
          <label className="form-label">KDV Rate</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            className="form-control"
            name="kdvRate"
            placeholder="Enter KDV rate"
            onChange={formik.handleChange}
            value={formik.values.kdvRate || ""}
          />
          {formik.touched.kdvRate && formik.errors.kdvRate && (
            <div className="text-danger">{formik.errors.kdvRate}</div>
          )}
        </div>

        {/* Withholding Rate */}
        <div className="mb-3">
          <label className="form-label">Withholding Rate</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            className="form-control"
            name="withholdingRate"
            placeholder="Enter withholding rate"
            onChange={formik.handleChange}
            value={formik.values.withholdingRate || ""}
          />
          {formik.touched.withholdingRate && formik.errors.withholdingRate && (
            <div className="text-danger">{formik.errors.withholdingRate}</div>
          )}
        </div>

        {/* Invoice Type */}
        <div className="mb-3">
          <label className="form-label">Invoice Type</label>
          <select
            className="form-control"
            name="invoiceType"
            onChange={formik.handleChange}
            value={formik.values.invoiceType || ""}
          >
            <option value="">Select invoice type</option>
            <option value="ALIS">ALIS</option>
            <option value="SATIS">SATIS</option>
            <option value="IADE">IADE</option>
          </select>
          {formik.touched.invoiceType && formik.errors.invoiceType && (
            <div className="text-danger">{formik.errors.invoiceType}</div>
          )}
        </div>

        {/* Scenario Type */}
        <div className="mb-3">
          <label className="form-label">Scenario Type</label>
          <select
            className="form-control"
            name="scenarioType"
            onChange={formik.handleChange}
            value={formik.values.scenarioType || ""}
          >
            <option value="">Select scenario type</option>
            <option value="Temel">Temel</option>
            <option value="Ticari">Ticari</option>
          </select>
          {formik.touched.scenarioType && formik.errors.scenarioType && (
            <div className="text-danger">{formik.errors.scenarioType}</div>
          )}
        </div>

        <label className="form-label">Ürünler</label>
        {/* Items List (Dynamically add and remove items) */}
        <div className="mb-3">
          {formik.values.items.map((item, index) => (
            <div key={index} className="mb-3">
              <div className="row">
                {/* Item Name */}
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    name={`items[${index}].name`}
                    placeholder="Item Name"
                    onChange={formik.handleChange}
                    value={item.name || ""}
                  />
                </div>

                {/* Item Description */}
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    name={`items[${index}].description`}
                    placeholder="Item Description"
                    onChange={formik.handleChange}
                    value={item.description || ""}
                  />
                </div>

                {/* Item Quantity */}
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    name={`items[${index}].quantity`}
                    placeholder="Quantity"
                    onChange={formik.handleChange}
                    value={item.quantity || ""}
                  />
                </div>

                {/* Item Unit Price */}
                <div className="col-md-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10000"
                    className="form-control"
                    name={`items[${index}].unitPrice`}
                    placeholder="Unit Price"
                    onChange={formik.handleChange}
                    value={formik.values.items[index].unitPrice || ""}
                  />
                </div>

                {/* Remove Item Button */}
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      const newItems = formik.values.items.filter(
                        (_, i) => i !== index
                      );
                      formik.setFieldValue("items", newItems);
                    }}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Item Button */}
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() =>
              formik.setFieldValue("items", [
                ...formik.values.items,
                { name: "", description: "", quantity: null, unitPrice: null },
              ])
            }
          >
            Ürün Ekle
          </button>
        </div>
        {formik.errors.items && Array.isArray(formik.errors.items) && formik.errors.items.length > 0 ? (
          formik.errors.items.map((itemError, index) => (
            <div key={index} className="text-danger mb-3">
              {itemError && typeof itemError === "object" && (
                <>
                  {itemError.name && <div>{index + 1}. Ürün Adı: {itemError.name}</div>}
                  {itemError.description && <div>{index + 1}. Açıklama: {itemError.description}</div>}
                  {itemError.quantity && <div>{index + 1}. Miktar: {itemError.quantity}</div>}
                  {itemError.unitPrice && <div>{index + 1}. Birim Fiyat: {itemError.unitPrice}</div>}
                  <div>veya {index + 1}. ürünü siliniz</div>
                </>
              )}
            </div>
          ))
        ) : formik.values.items.length === 0 ? (
          <div className="text-danger mb-3">En az 1 ürün ekleyiniz</div>
        ) : null}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Gönder
        </button>
      </form>
    </div>
  );
};

export default InvoiceCreatePage;
