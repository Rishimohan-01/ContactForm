// /*eslint no-undef: "off"*/
import * as express from "express";
import * as axios from "axios";
import * as cors from "cors";

const app = express.json();

const SECRET_KEY = "6LdMO1oqAAAAAPArw5_z53VBfqTXunJwagNvVbJP";

app.post("/verify", async (req, res) => {
  const { captchaToken } = req.body;

  if (!captchaToken) {
    return res
      .status(400)
      .json({ success: false, message: "No token provided" });
  }

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${captchaToken}`;

  try {
    const response = await axios.post(verificationURL);
    const data = response.data;

    if (data.success) {
      return res.json({
        success: true,
        message: "Captcha verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Captcha verification failed",
        "error-codes": data["error-codes"],
      });
    }
  } catch (error) {
    console.error("Error during CAPTCHA verification", error);
    return res
      .status(500)
      .json({ success: false, message: "Error during verification" });
  }
});

app.listen(5174, () => {
  console.log("Server is running on port 5174");
});
