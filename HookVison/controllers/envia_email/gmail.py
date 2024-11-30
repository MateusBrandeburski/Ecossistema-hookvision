import os
import smtplib
from email.message import EmailMessage


"""
    Existe maneira de fazer mais complexo, enviando um HTML para o email. Mas como esse é um exemplo lúdico, achei melhor deixar assim
"""
def envia_email(mensagem, email):
    #consgiurar email, senha
    EMAIL_ADDRESS = 'mateus@trovale.com.br'
    EMAIL_PASSWORD = os.environ['SENHA']

    msg = EmailMessage()
    msg['Subject'] = 'WebHooks'
    msg['From'] = 'mateus@trovale.com.br'
    msg['To'] = email
    msg.set_content(mensagem)


    # Enviar email
    with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)
 
 
