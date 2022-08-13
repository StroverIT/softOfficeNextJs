// Validators

import sendEmail from "./sendEmail";

async function handler(req, res) {
  //Connect with database
  if (req.method == "POST") {
    try {
      const errors = [];
      const { title, description, email, fullName } = req.body;
      // If are errors
      if (errors.length > 0) {
        return res.status(403).json(errors);
      }

      const message = `
      <h3>Съобщение от ${fullName}, с и-мейл ${email} - ${title}</h3>
      <p>${description}</p>
      `;
      // Sending email
      await sendEmail(
        process.env.EMAIL_SEND,
        process.env.EMAIL_SEND,
        "Им",
        message
      );
      return res
        .status(201)
        .json({ message: "Успешно изпратихе вашето съобщение" });
    } catch (e) {
      res.json({ error: e.message });
    }
  }
}
export default handler;
