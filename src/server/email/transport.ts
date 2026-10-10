import "server-only";
import nodemailer from "nodemailer";

export function emailConfiguration(requireAdmin = true) {
  const {
    SMTP_HOST,
    SMTP_USER,
    SMTP_PASSWORD,
    EMAIL_FROM,
    REGISTRATION_ADMIN_EMAILS,
  } = process.env;

  const port = Number(process.env.SMTP_PORT || 587);
  const recipients = (REGISTRATION_ADMIN_EMAILS || "")
    .split(/[,;]+/)
    .map((value) => value.trim())
    .filter(Boolean);
  
  if (
    !SMTP_HOST ||
    !SMTP_USER ||
    !SMTP_PASSWORD ||
    !EMAIL_FROM ||
    (requireAdmin && !recipients.length) ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535
  )
    throw new Error("EMAIL_NOT_CONFIGURED");
  
    if (
    recipients.some(
      (value) => !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value),
    ) ||
    /[\r\n]/.test(EMAIL_FROM)
  )
    throw new Error("EMAIL_NOT_CONFIGURED");
    
  return {
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    from: EMAIL_FROM,
    recipients,
  };
}

let transporter: ReturnType<typeof nodemailer.createTransport> | undefined;

export async function sendTemplateEmail(template: {
  subject: string;
  text: string;
  html: string;
}, recipient?: string) {
  const config = emailConfiguration(!recipient);
  if (recipient && !/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(recipient)) throw new Error('EMAIL_RECIPIENT_INVALID');
  const recipients = recipient ? [recipient] : config.recipients;
  transporter ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure,
    auth: config.auth,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  // Separate envelopes avoid exposing the list of administrative recipients.
  const result = await transporter.sendMail({
    from: config.from,
    to: recipient || config.from,
    ...(recipient ? {} : {bcc: recipients}),
    subject: template.subject,
    text: template.text,
    html: template.html,
    envelope: { from: config.auth.user, to: recipients },
  });
  
  if (!result.accepted?.length || result.rejected?.length)
    throw new Error("EMAIL_RECIPIENT_REJECTED");
  return result.messageId as string;
}
