import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { UserCredentials } from "../types";
import * as Yup from "yup";
import { AxiosError } from "axios";

const CreateUserSchema = Yup.object().shape({
  birth_date: Yup.date().required("Birth date required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  name: Yup.string().required("First name required"),
  surname: Yup.string().required("Last name required"),
  username: Yup.number()
    .min(100000000000, "12 digits")
    .max(999999999999, "12 digits")
    .required("Username required"),
  password: Yup.string().required("Password required"),
});

const CreateUser = () => {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState<any>({});

  const onSubmitHandler = async (
    values: UserCredentials,
    { setSubmitting }: FormikHelpers<UserCredentials>
  ) => {
    try {
      const { data } = await api.createUser(values);
      navigate("/");
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.errors) {
        setServerErrors(e.response.data.errors);
      }
      setSubmitting(false);
    }
  };
  return (
    <div className="container">
      <h1>Create User</h1>
      <Formik
        validationSchema={CreateUserSchema}
        initialValues={{
          birth_date: "",
          email: "",
          gender: "male",
          name: "",
          password: "",
          surname: "",
          username: 1,
        }}
        onSubmit={onSubmitHandler}
      >
        {({ isSubmitting, isValidating, errors }) => {
          console.log(errors);
          return (
            <Form>
              <div className="mb-3">
                <label htmlFor="username">username</label>
                <Field
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Ek4m"
                />
                {errors.username && <code>{errors.username}</code>}
                {serverErrors && serverErrors.username && (
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
                  placeholder="password"
                />
                {errors.password && <code>{errors.password}</code>}
                {serverErrors && serverErrors.password && (
                  <code>{serverErrors.password.join(",")}</code>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="name">name</label>
                <Field
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="John"
                />
                {errors.name && <code>{errors.name}</code>}
                {serverErrors && serverErrors.name && (
                  <code>{serverErrors.name.join(",")}</code>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="surname">surname</label>
                <Field
                  className="form-control"
                  id="surname"
                  name="surname"
                  placeholder="John"
                />
                {errors.surname && <code>{errors.surname}</code>}
                {serverErrors && serverErrors.surname && (
                  <code>{serverErrors.surname.join(",")}</code>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="gender">gender</label>
                <Field
                  as="select"
                  className="form-control"
                  id="gender"
                  name="gender"
                  placeholder="Male, female"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                {serverErrors && serverErrors.gender && (
                  <code>{serverErrors.gender.join(",")}</code>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email">email</label>
                <Field
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@test.com"
                />
                {errors.email && <code>{errors.email}</code>}
                {serverErrors && serverErrors.email && (
                  <code>{serverErrors.email.join(",")}</code>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="birth_date">birth date</label>
                <Field
                  type="date"
                  className="form-control"
                  id="birth_date"
                  name="birth_date"
                  placeholder="example@test.com"
                />
                {errors.birth_date && <code>{errors.birth_date}</code>}
                {serverErrors && serverErrors.birth_date && (
                  <code>{serverErrors.birth_date.join(",")}</code>
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
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateUser;
