import client from "@sendgrid/mail";

type Sender = {
  name: string;
  email: string;
};
export default class Mailer {
  from: string;
  to: string;
  subject: string;
  templateId: string;
  dynamicTemplateData: any;
  // html: string; //? pour plus tard ;)

  constructor(
    from: string | undefined,
    recipientEmail: string,
    subject: string,
    templateId: string,
    dynamicTemplateData: any
  ) {
    this.from = from ?? process.env.SENDGRID_SENDER_EMAIL!;
    this.to =
      process.env.NODE_ENV === "development"
        ? process.env.SENDGRID_DEV_RECIPIENT_EMAIL!
        : recipientEmail;
    this.subject = subject;
    this.templateId = templateId;
    this.dynamicTemplateData = dynamicTemplateData;

    client.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async send() {
    try {
      //   console.log("RESPONSE", response);
      const [response] = await client.send({
        from: this.from,
        to: this.to,
        templateId: this.templateId,
        dynamicTemplateData: this.dynamicTemplateData,
      });
      console.log("RESPONSE", response);
    } catch (error) {
      console.log("ERROR", JSON.stringify(error));
    }
  }
}
