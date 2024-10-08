/* eslint-disable no-unused-vars */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import "./ContactForm.css";
import * as Yup from "yup";
// import { db } from "./firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";

const ContactForm = () => {
  const SITE_KEY = "6LdMO1oqAAAAAAbszVOebgwNO4XTm8PfW0GDFgkA"; //6LdMO1oqAAAAAAbszVOebgwNO4XTm8PfW0GDFgkA

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    message: Yup.string().required("Required"),
    captcha: Yup.string().required("Please confirm you are not a robot"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Form Values:", values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <Formik
        initialValues={{ name: "", email: "", message: "", captcha: false }}
        validationSchema={validationSchema}
        validate={(values) => {
          const errors = {};
          if (!values.captcha)
            errors.captcha = "Please confirm you are not a robot";
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" placeholder="Your Name" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" placeholder="Your Email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <Field
                as="textarea"
                name="message"
                placeholder="Your Message"
                rows="4"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-field captcha-field">
              <ReCAPTCHA
                sitekey={SITE_KEY} // Replace with your reCAPTCHA site key
                onChange={(value) => setFieldValue("captcha", !!value)}
              />
              <ErrorMessage
                name="captcha"
                component="div"
                className="error-message"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
