import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { memo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { useFetch } from "../hooks/useFetch";
import { UserPostCredentials } from "../types";

const SingleUser = () => {
  const params = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState<any>({});

  const {
    data: user,
    loading,
    error,
  } = useFetch(api.getSingleUser.bind(this, params.userId!));

  const onSubmitHandler = async (
    values: UserPostCredentials,
    { setSubmitting }: FormikHelpers<UserPostCredentials>
  ) => {
    try {
      const dataToBeSent = { ...values, user_id: params.userId };
      await api.updateSingleUser(params.userId!, dataToBeSent);
      navigate("/");
    } catch (e: any) {
      setServerErrors(e.response.data);
      setSubmitting(e);
    }
  };
  return (
    <div className="container">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.response.data.message ||
            error.message ||
            "Something went wrong"}
        </div>
      )}
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {user && (
        <Formik
          initialValues={{
            name: user.data.name,
            surname: user.data.surname,
            email: user.data.email,
            birth_date: user.data.birth_date,
            gender: user.data.gender,
            password: user.data.password,
            username: user.data.number,
          }}
          onSubmit={onSubmitHandler}
        >
          {({ isSubmitting, isValidating }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="username">username</label>
                <Field
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Ek4m"
                />
                {serverErrors &&
                  serverErrors.errors &&
                  serverErrors.errors.username && (
                    <code>{serverErrors.errors.username.join(",")}</code>
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
                {serverErrors &&
                  serverErrors.errors &&
                  serverErrors.errors.password && (
                    <code>{serverErrors.errors.password.join(",")}</code>
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
                {serverErrors &&
                  serverErrors.errors &&
                  serverErrors.errors.name && (
                    <code>{serverErrors.errors.name.join(",")}</code>
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
                {serverErrors &&
                  serverErrors.errors &&
                  serverErrors.errors.surname && (
                    <code>{serverErrors.errors.surname.join(",")}</code>
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
                {serverErrors &&
                  serverErrors.errors &&
                  serverErrors.errors.gender && (
                    <code>{serverErrors.errors.gender.join(",")}</code>
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
                {serverErrors &&
                  serverErrors.errors &&
                  serverErrors.errors.email && (
                    <code>{serverErrors.errors.email.join(",")}</code>
                  )}
              </div>
              <div className="mb-3">
                <label htmlFor="birth_date">birth date</label>
                <Field
                  type="date"
                  className="form-control"
                  id="birth_date"
                  name="birth_date"
                />
                {serverErrors &&
                  serverErrors.errors &&
                  serverErrors.errors.birth_date && (
                    <code>{serverErrors.errors.birth_date.join(",")}</code>
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
      )}
    </div>
  );
};

export default memo(SingleUser);
