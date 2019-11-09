import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

function AppForm({ errors, touched, status }) {
  const [person, setPerson] = useState([]);

  useEffect(() => {
    if (status) {
      setPerson([...person, status]);
    }
  }, [status]);

  return (
    <div className="form_container">
      <Form>
        <Field type="text" name="name" placeholder="Add Full Name" />
        {touched.name && errors.name && (
          <p className="errored">WOAH! You need a name!</p>
        )}

        <Field type="text" name="email" placeholder="Add eMail Address" />
        {touched.email && errors.email && (
          <p className="errored">Hold up! You need an email address!</p>
        )}

        <Field type="password" name="password" placeholder="Add Password" />
        {touched.password && errors.password && (
          <p className="errored">Chill! You need a password!</p>
        )}

        <label>
          {touched.terms && errors.checkbox && (
            <p className="errored">Ahh...You have to accept!</p>
          )}
          <Field type="checkbox" name="terms" />

          <span>Please Accept Terms and services</span>
        </label>
        <button type="submit">Join The Club</button>

        {person.map(cv => {
          return (
            <div className="result">
              <p>Name: {cv.name}</p>
              <p>Email: {cv.email}</p>
            </div>
          );
        })}
      </Form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: values => {
    return {
      name: values.name || "",
      email: values.email || "",
      password: values.password || "",
      terms: values.terms || false
    };
  },
  validationSchema: yup.object().shape({
    name: yup.string().required(),
    email: yup
      .string()
      .required()
      .email(),
    password: yup.string().required()
  }),
  handleSubmit: (values, { setStatus }) => {
    axios
      .post("https://reqres.in/api/myform", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => {
        console.log("error:", err);
      });
  }
})(AppForm);
