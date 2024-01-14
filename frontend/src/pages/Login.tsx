import { Formik } from "formik";
import logo from "../images/logo.png";
import "./Login.css";

interface IError {
  email: string;
  password: string;
}

function Login() {
  return (
    <div className="container">
      <img src={logo} alt="peopleVox" />
      <p>Not registered yet ? Sign up</p>
      {/* <p>Sign up</p> */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: IError = {
            email: "",
            password: "",
          };
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div>Email address</div>
              <input
                className="input"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <div className="error">
                {errors.email && touched.email && errors.email}
              </div>
              <div>Password</div>
              <input
                className="input"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <div className="error">
                {errors.password && touched.password && errors.password}
              </div>
            </div>
            <div>
              <button
                className="login_button"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
