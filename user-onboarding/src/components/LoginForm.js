import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
const LoginForm = ({ values, errors, touched, isSubmitting, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <Form>
      {touched.name && errors.name && <p>{errors.name}</p>}
      <Field type="text" name="name" placeholder="Name" value={values.name} />

      {touched.username && errors.username && <p>{errors.username}</p>}
      <Field
        type="text"
        name="username"
        placeholder="Username"
        value={values.username}
      />

      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field
        type="password"
        name="password"
        placeholder="Password"
        value={values.password}
      />

      {touched.age && errors.age && <p>{errors.age}</p>}
      <Field
        type='number'
        name='age'
        placeholder='Age'
        value={values.age}
        />

      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field
        type="email"
        name="email"
        placeholder="Email"
        value={values.email}
      />

      {touched.terms && errors.terms && <p>{errors.terms}</p>}
      <Field type="checkbox" name="terms"checked={values.terms} />

      {touched.hours && errors.hours && <p>{errors.hours}</p>}
      <Field component="select" name="hours" value={values.hours}>
        <option>Choose your hours</option>
        <option value="12">12</option>
        <option value="8">8</option>
        <option value="4">4</option>
        <option value="2">2</option>
      </Field>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      {users.map((user, index) => (
        <ul key={index}>
          <li>Name: {user.name}</li>
          <li>Username: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Hours: {user.hours}</li>
          <li>Age: {user.age}</li>
        </ul>
      ))}
    </Form>
  );
};
const FormikLoginForm = withFormik({
  mapPropsToValues({ age, name, username, password, email, terms, hours }) {
    return {
      name: name || '',
      username: username || '',
      password: password || "",
      email: email || "",
      terms: terms || false,
      hours: hours || '',
      age: age || '',
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter your name."),
    username: Yup.string().required("Please enter a username"),
    password: Yup.string()
      .min(6)
      .required("Please enter a password of 6 charaters or more"),
    email: Yup.string()
      .email()
      .required("Please enter a valid email."),
    terms: Yup.boolean().oneOf([true], 'Please check the box'),
    hours: Yup.string()
      .oneOf(["12", "8", "4", "2"])
      .required("Choose your hours"),
    age: Yup.number().min(2).required('Please enter your number.')

  }),

  handleSubmit(values, { resetForm, setSubmitting, setStatus, setErrors }) {
    if(values.email ===`waffle@syrup.com`){
      setErrors({email:'That email is already taken.'});
    }else{
    axios
      .post("https://reqres.in/api/users", values)
      .then(response => {
        console.log(response);
        setStatus(response.data);
        resetForm();
        setSubmitting(false);
      })

      .catch(error => {
        console.log(error);
        setSubmitting(false);
      });
  }
}
})(LoginForm);

export default FormikLoginForm;
