import auth from "../services/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const ADD_USER = gql`
  mutation AddUser($user: AddUserInput!) {
    addUser(user: $user) {
      id
      email
      password
      name
      surname
    }
  }
`;

interface Values {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export default function SignUp() {
  const initialValues = { email: "", password: "", name: "", surname: "" };
  const navigate = useNavigate();
  const [addUser] = useMutation(ADD_USER);

  const handleValidate = (values: Values) => {
    const errors = { ...initialValues };

    // Name
    if (!values.name) errors.name = "Required";
    else errors.name = "";

    // Surname
    if (!values.surname) errors.surname = "Required";
    else errors.surname = "";

    // Email
    if (!values.email) errors.email = "Required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
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

    if (errors.email || errors.password || errors.name || errors.surname)
      return errors;
    return {};
  };

  const handleSubmit = async (values: Values) => {
    try {
      const res = await addUser({
        variables: {
          user: {
            email: values.email,
            password: values.password,
            name: values.name,
            surname: values.surname,
          },
        },
      });

      if (!res.data.addUser) {
        console.error("Network Error");
        return;
      }

      // Store the current user in the web browser
      const { email, surname, name } = res.data.addUser;
      auth.setCurrentUser({ email, surname, name });

      // Navigate to the Home Page
      navigate("/home");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="container">
      <h1>Sign up</h1>
      <Formik
        initialValues={initialValues}
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
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
          <div>&nbsp;&nbsp;&nbsp;- Requires at least one uppercase letter.</div>
          <div>&nbsp;&nbsp;&nbsp;- Requires at least one lowercase letter.</div>
          <div>&nbsp;&nbsp;&nbsp;- Requires at least one digit</div>
          <div>&nbsp;&nbsp;&nbsp;- Requires at least one special character</div>
          <Field className="input" type="password" name="password" />
          <ErrorMessage className="error" name="password" component="div" />
          <button className="login_button" type="submit">
            Join now
          </button>
        </Form>
      </Formik>
    </div>
  );
}
