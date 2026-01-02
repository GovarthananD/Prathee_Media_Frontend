import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../api/axios";
import toast from "react-hot-toast";
import { saveUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email required"),
      password: Yup.string().required("Password required")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await API.post("/login", values);
        saveUser(res.data.user, res.data.token);
        toast.success("Login successful");
        resetForm();
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      }
    }
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5", 
        backgroundImage:
          "url('https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div
        className="card p-5 shadow-lg"
        style={{
          width: "420px",
          backgroundColor: "rgb(240, 239, 248)", 
          borderRadius: "12px"
        }}
      >
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              {...formik.getFieldProps("email")}
            />
            <div className="invalid-feedback">{formik.errors.email}</div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${
                formik.touched.password && formik.errors.password
                  ? "is-invalid"
                  : ""
              }`}
              {...formik.getFieldProps("password")}
            />
            <div className="invalid-feedback">{formik.errors.password}</div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
