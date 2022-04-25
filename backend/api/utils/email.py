import smtplib

from config import settings


def send_email(reciever: str, code: str):
    gmail_user = "mezgoodle@gmail.com"
    gmail_password = settings.gmail_password

    sent_from = gmail_user
    to = reciever
    subject = "Відновлення паролю на ЗнайдиМене"
    body = f"Ваш код: {code}"

    email_text = """\
    From: %s
    To: %s
    Subject: %s

    %s
    """ % (
        sent_from,
        to,
        subject,
        body,
    )

    try:
        smtp_server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        smtp_server.ehlo()
        smtp_server.login(gmail_user, gmail_password)
        smtp_server.sendmail(sent_from, to, email_text.encode("utf-8"))
        smtp_server.close()
        print("Email sent successfully!")
    except Exception as ex:
        print("Something went wrong….", ex)
