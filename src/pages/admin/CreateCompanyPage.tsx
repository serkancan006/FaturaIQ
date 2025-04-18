import { FormikHelpers, useFormik } from "formik";
import CompanyService, {
  CreateCompanyType,
} from "../../services/CompanyService";
import { CreateCompanyValidationSchema } from "../../schema/CreateCompanyValidationSchema";
import NotifyService from "../../services/NotifyService";
import { InputMask } from "@react-input/mask";

const CreateCompanyPage = () => {
  const onSubmit = async (
    values: CreateCompanyType,
    actions: FormikHelpers<CreateCompanyType>
  ) => {
    const response = await CompanyService.createCompany(values);
    console.log(response);
    if (response.status === 200) {
      NotifyService.messageHot("Şirket başarıyla oluşturuldu", {
        type: "success",
      });
    } 
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      address: "",
      email: "",
      name: "",
      phone: "",
      taxNumber: "",
    },
    onSubmit: onSubmit,
    validationSchema: CreateCompanyValidationSchema,
  });

  return (
    <div>
      <h2>CreateCompanyPage</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Firma Adı</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-danger">{formik.errors.name}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Vergi Numarası</label>
          <input
            type="text"
            className="form-control"
            name="taxNumber"
            onChange={formik.handleChange}
            value={formik.values.taxNumber}
          />
          {formik.touched.taxNumber && formik.errors.taxNumber && (
            <p className="text-danger">{formik.errors.taxNumber}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Adres</label>
          <input
            type="text"
            className="form-control"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-danger">{formik.errors.address}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Telefon</label>
          <InputMask
            mask="9999-999-99-99"
            replacement={{ 9: /\d/ }}
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control"
            placeholder="0312-555-85-96"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-danger">{formik.errors.phone}</p>
          )}
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Telefon</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-danger">{formik.errors.phone}</p>
          )}
        </div> */}
        <button className="btn btn-primary" type="submit">
          Gönder
        </button>
      </form>
    </div>
  );
};

export default CreateCompanyPage;
