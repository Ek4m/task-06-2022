import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { UserCredentials } from "../types";
const CreateUser = () => {
  const navigate = useNavigate();

  const onSubmitHandler = async (
    values: UserCredentials,
    { setSubmitting }: FormikHelpers<UserCredentials>
  ) => {
    try {
      const { data } = await api.createUser(values);
      navigate("/");
    } catch (e) {
      console.log(e);
      setSubmitting(false);
    }
  };
  return (
    <div className="container">
      <h1>Create User</h1>
      <Formik
        initialValues={{
          birth_date: "",
          email: "",
          gender: "male",
          name: "",
          password: "",
          surname: "",
          username: 0,
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
            </div>

            <div className="mb-3">
              <label htmlFor="name">name</label>
              <Field
                className="form-control"
                id="name"
                name="name"
                placeholder="John"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="surname">surname</label>
              <Field
                className="form-control"
                id="surname"
                name="surname"
                placeholder="John"
              />
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
    </div>
  );
};

export default CreateUser;
