import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Name required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Email required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password required"),
      mobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Enter valid Indian mobile number")
        .required("Mobile number required")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await api.post("/register", values);
        toast.success("Registration successful. Please login.");
        resetForm();
        navigate("/login");
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed");
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
          "url('https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg')", // optional subtle image
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
        <h3 className="text-center mb-4">Register</h3>

        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
              {...formik.getFieldProps("name")}
            />
            <div className="invalid-feedback">{formik.errors.name}</div>
          </div>

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

          {/* Mobile */}
          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="tel"
              className={`form-control ${
                formik.touched.mobile && formik.errors.mobile ? "is-invalid" : ""
              }`}
              {...formik.getFieldProps("mobile")}
              placeholder="9876543210"
            />
            <div className="invalid-feedback">{formik.errors.mobile}</div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${
                formik.touched.password && formik.errors.password ? "is-invalid" : ""
              }`}
              {...formik.getFieldProps("password")}
            />
            <div className="invalid-feedback">{formik.errors.password}</div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
