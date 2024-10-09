import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import "./ContactForm.css";
import * as Yup from "yup";
import axios from "axios";

const ContactForm = () => {
  const initialValues = { name: "", email: "", message: "", captcha: false };

  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);

  const onChange = (token) => {
    setCaptchaToken(token);
  };

  const SITE_KEY = "6LdMO1oqAAAAAAbszVOebgwNO4XTm8PfW0GDFgkA"; //6LdMO1oqAAAAAAbszVOebgwNO4XTm8PfW0GDFgkA

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    message: Yup.string().required("Required"),
    captcha: Yup.string().required("Please confirm you are not a robot"),
  });

  const handleSubmit = async (e, values, { setSubmitting, resetForm }) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please complete the reCAPTCHA!");
      return;
    }
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    try {
      const response = await axios.post(
        "https://4e921e09-2d17-4881-ba6b-cc0a77001f0a.mock.pstmn.io",
        { captchaToken },
        values
      );
      if (response.data.success) {
        // ReCAPTCHA verification successful, handle the response
        alert("Form Submitted successfully!");
        console.log("Form Submitted successfully!", response.data);
        resetForm();
      } else {
        // ReCAPTCHA verification failed, handle the error
        alert("ReCAPTCHA verification failed. Please try again.");
        console.error("ReCAPTCHA verification failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error submitting form data:", error.message);
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <Formik
        initialValues={initialValues}
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
                sitekey={SITE_KEY}
                useRef={captchaRef}
                onChange={
                  (onChange,
                  (value) => {
                    setFieldValue("captcha", !!value);
                  })
                }
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
