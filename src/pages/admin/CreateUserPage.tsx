import { FormikHelpers, useFormik } from "formik";
import UserService, { CreateUserType } from "../../services/UserService";
import { CreateUserValidationSchema } from "../../schema/CreateUserValidationSchema";
import NotifyService from "../../services/NotifyService";
import CompanyService, { CompanyListType } from "../../services/CompanyService";
import { useEffect, useState } from "react";

const CreateUserPage = () => {
  const [companies, setCompanies] = useState<CompanyListType[]>([]);
  const fetchData = async () => {
    const response = await CompanyService.getAllCompanies();
    setCompanies(response.data);
  };

  const onSubmit = async (
    values: CreateUserType,
    actions: FormikHelpers<CreateUserType>
  ) => {
    const response = await UserService.createUser(values);
    if (response.status === 200) {
      NotifyService.messageHot("Kullanıcı başarıyla oluşturuldu", {
        type: "success",
      });
    }
    actions.resetForm();
  };

  const formik = useFormik<CreateUserType>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
      companyId: null,
    },
    onSubmit: onSubmit,
    validationSchema: CreateUserValidationSchema,
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h3>CreateUserPage</h3>
      <form onSubmit={formik.handleSubmit}>
        {/* Kullanıcı Adı */}
        <div className="mb-3">
          <label className="form-label">Kullanıcı Adı</label>
          <input
            type="text"
            className="form-control"
            placeholder="example"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-danger">{formik.errors.username}</p>
          )}
        </div>

        {/* Şifre */}
        <div className="mb-3">
          <label className="form-label">Şifre</label>
          <input
            type="password"
            className="form-control"
            placeholder="Şifreniz"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-danger">{formik.errors.password}</p>
          )}
        </div>

        {/* Ad */}
        <div className="mb-3">
          <label className="form-label">Ad</label>
          <input
            type="text"
            className="form-control"
            placeholder="Adınızı girin"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-danger">{formik.errors.firstName}</p>
          )}
        </div>

        {/* Soyad */}
        <div className="mb-3">
          <label className="form-label">Soyad</label>
          <input
            type="text"
            className="form-control"
            placeholder="Soyadınızı girin"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-danger">{formik.errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email adresinizi girin"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger">{formik.errors.email}</p>
          )}
        </div>

        {/* Firma  */}
        <div className="mb-3">
          <label className="form-label">Firma</label>
          <select
            name="companyId"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.companyId}
          >
            <option value="">Firma Seçin</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>

          {formik.touched.companyId && formik.errors.companyId && (
            <p className="text-danger">{formik.errors.companyId}</p>
          )}
        </div>

        {/* Firma ID */}
        {/* <div className="mb-3">
          <label className="form-label">Firma ID</label>
          <input
            type="number"
            className="form-control"
            placeholder="Firma ID girin"
            name="companyId"
            onChange={formik.handleChange}
            value={formik.values.companyId}
            //value={formik.values.companyId ?? 15 ? "15" : undefined} // hata vermemesi için
          />
          {formik.touched.companyId && formik.errors.companyId && (
            <p className="text-danger">{formik.errors.companyId}</p>
          )}
        </div> */}

        {/* Submit Butonu */}
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting}
          >
            Gönder
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;
