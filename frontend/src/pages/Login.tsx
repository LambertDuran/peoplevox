import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./Login.css";

export default function Login() {
  return (
    <div className="container">
      <img src={logo} alt="peopleVox" />
      <p>
        Not registered yet ?
        <Link to={"signup"} className="signup">
          {" "}
          Sign up
        </Link>
      </p>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = { email: "", password: "" };
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
        {({ isSubmitting }) => (
          <Form>
            <div>
              <div>Email address</div>
              <Field className="input" type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
              <div>Password</div>
              <Field className="input" type="password" name="password" />
              <ErrorMessage className="error" name="password" component="div" />
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
          </Form>
        )}
      </Formik>
    </div>
  );
}
