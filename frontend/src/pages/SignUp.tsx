import { Formik, Form, Field, ErrorMessage } from "formik";

export default function SignUp() {
  return (
    <div className="container">
      <h1>Sign up</h1>
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
            <div>Email address</div>
            <Field className="input" type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
            <div>Password</div>
            <Field className="input" type="password" name="password" />
            <ErrorMessage className="error" name="password" component="div" />
            <button
              className="login_button"
              type="submit"
              disabled={isSubmitting}
            >
              Join now
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
