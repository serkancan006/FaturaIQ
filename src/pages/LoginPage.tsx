import { FormikHelpers, useFormik } from "formik";
import AuthService, { SignInType } from "../services/AuthService";
import { SignInValidationSchema } from "../schema/SignInValidationSchema";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import NotifyService from "../services/NotifyService";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (
    values: SignInType,
    actions: FormikHelpers<SignInType>
  ) => {
    const response = await AuthService.signIn(values);
    if (response.status === 200) {
      login(response.data.token);
      NotifyService.messageHot("Giriş Başarılı", { type: "success" });
      navigate("/user/invoices/sent-invoice-list");
    }
    actions.resetForm();
  };

  const formik = useFormik<SignInType>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: onSubmit,
    validationSchema: SignInValidationSchema,
  });

  return (
    <div>
      <h1>LoginPage</h1>
      <form onSubmit={formik.handleSubmit}>
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
        <div className="mb-3">
          <label className="form-label">Şifre</label>
          <input
            type="text"
            className="form-control"
            placeholder="*******"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-danger">{formik.errors.password}</p>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Gönder
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
