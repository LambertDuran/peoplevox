import auth from "../services/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import logo from "../images/logo.png";
import "./Login.css";

interface Values {
  email: string;
  password: string;
}

const AUTH_QUERY = gql`
  query AuthQuery($email: String!, $password: String!) {
    auth(email: $email, password: $password) {
      email
      name
      surname
    }
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { refetch } = useQuery(AUTH_QUERY, {
    variables: { email: "", password: "" },
    skip: true,
  });

  const handleSubmit = async (values: Values) => {
    // Check the connextion datas
    try {
      const res = await refetch({
        email: values.email,
        password: values.password,
      });

      if (!res.data.auth) setError("Invalid email or password");
      else {
        auth.setCurrentUser({
          email: values.email,
          surname: res.data.auth.surname,
          name: res.data.auth.name,
        });
        navigate("/home");
      }
    } catch (error) {
      setError("Authentication error");
    }
  };

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
          if (errors.email || errors.password) return errors;
          return {};
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleSubmit(values);
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
            {error && <div className="error">{error}</div>}
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
