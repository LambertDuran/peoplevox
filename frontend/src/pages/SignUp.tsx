import { Formik, Form, Field, ErrorMessage } from "formik";

export default function SignUp() {
  const initialValues = { email: "", password: "", name: "", surname: "" };
  return (
    <div className="container">
      <h1>Sign up</h1>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = initialValues;

          // Name
          if (!values.name) errors.name = "Required";
          else errors.name = "";

          // Surname
          if (!values.surname) errors.surname = "Required";
          else errors.surname = "";

          // Email
          if (!values.email) errors.email = "Required";
          else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          )
            errors.email = "Invalid email address";
          else errors.email = "";

          // Password
          if (!values.password) errors.password = "Required";
          else if (
            !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              values.password
            )
          )
            errors.password = "Invalid Format";
          else errors.password = "";

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
            <div>Name</div>
            <Field className="input" name="name" />
            <ErrorMessage className="error" name="name" component="div" />
            <div>Surname</div>
            <Field className="input" name="surname" />
            <ErrorMessage className="error" name="surname" component="div" />
            <div>Email address</div>
            <Field className="input" type="email" name="email" />
            <ErrorMessage className="error" name="email" component="div" />
            <div>Password :</div>
            <div>&nbsp;&nbsp;&nbsp;- At least 8 characters.</div>
            <div>
              &nbsp;&nbsp;&nbsp;- Requires at least one uppercase letter.
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;- Requires at least one lowercase letter.
            </div>
            <div>&nbsp;&nbsp;&nbsp;- Requires at least one digit</div>
            <div>
              &nbsp;&nbsp;&nbsp;- Requires at least one special character
            </div>
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
