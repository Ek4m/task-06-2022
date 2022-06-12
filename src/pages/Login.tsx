import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { REST_API } from "../constants/api";

interface LoginCredentials {
  username: string;
  password: string;
}

const Login = () => {
  const [_, setCookie] = useCookies(["access_token", "refresh_token"]); //Handling access and refresh tokens in cookies
  const navigate = useNavigate();
  const onSubmitHandler = async (
    values: LoginCredentials,
    { setSubmitting }: FormikHelpers<LoginCredentials>
  ) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);
      const response = await fetch(REST_API + "/login", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.access_token ?? data.refresh_token) {
        setCookie("access_token", data.access_token, {
          expires: data.expires,
          path: "/",
        });
        setCookie("refresh_token", data.refresh_token, {
          expires: data.expires,
          path: "/",
        });
      }
      navigate("/");
    } catch (e) {
      console.log(e);
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={onSubmitHandler}
    >
      {({ isSubmitting, isValidating }) => (
        <Form>
          <label htmlFor="username">username</label>
          <Field id="username" name="username" placeholder="John" />
          <label htmlFor="password">password</label>
          <Field
            id="password"
            type="password"
            name="password"
            placeholder="Doe"
          />
          <button disabled={isSubmitting} type="submit">
            {isSubmitting && !isValidating ? "Wait..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
