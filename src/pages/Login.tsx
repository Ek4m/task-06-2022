import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import * as Yup from "yup";

interface LoginCredentials {
  username: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username required"),
  password: Yup.string().required("Password required"),
});

const Login = () => {
  const [, setCookie] = useCookies(["access_token", "refresh_token"]); //Handling access and refresh tokens in cookies
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState<any>({});

  ////////////////////////////////////
  const onSubmitHandler = async (
    values: LoginCredentials,
    { setSubmitting }: FormikHelpers<LoginCredentials>
  ) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);
      const { data } = await api.login(formData);
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
    } catch (e: any) {
      if (e && e.response && e.response.data) {
        setServerErrors(e.response.data);
      }
      setSubmitting(false);
    }
  };
  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={onSubmitHandler}
    >
      {({ isSubmitting, isValidating, errors }) => (
        <Form>
          {(serverErrors.error ||
            serverErrors.error_description ||
            serverErrors.message) && (
            <div className="alert alert-danger" role="alert">
              {serverErrors.error}
              {serverErrors.error_description}
              {serverErrors.message}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="username">username</label>
            <Field
              className="form-control"
              id="username"
              name="username"
              placeholder="John"
            />
            {errors.username && <code>{errors.username}</code>}
            {serverErrors && serverErrors.errors && serverErrors.username && (
              <code>{serverErrors.username.join(",")}</code>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">password</label>
            <Field
              className="form-control"
              id="password"
              type="password"
              name="password"
              placeholder="Doe"
            />
            {errors.password && <code>{errors.password}</code>}
            {serverErrors && serverErrors.errors && serverErrors.password && (
              <code>{serverErrors.password.join(",")}</code>
            )}
          </div>
          <button
            className="btn btn-primary"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting && !isValidating ? "Wait..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
