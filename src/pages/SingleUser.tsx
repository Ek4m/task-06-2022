import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { UserCredentials } from "../types";

const SingleUser = () => {
  const [user, setUser] = useState<UserCredentials | null>(null);
  const params = useParams<{ userId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.userId) {
      api
        .getSingleUser(params.userId)
        .then(({ data: { data } }) => {
          console.log(data);
          setUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onSubmitHandler = async (
    values: UserCredentials,
    { setSubmitting }: FormikHelpers<UserCredentials>
  ) => {
    try {
      const dataToBeSent = { ...values, user_id: params.userId };
      const { data } = await api.updateSingleUser(params.userId!, dataToBeSent);
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  if (!user)
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  return (
    <Formik initialValues={{ ...user }} onSubmit={onSubmitHandler}>
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
  );
};

export default SingleUser;
