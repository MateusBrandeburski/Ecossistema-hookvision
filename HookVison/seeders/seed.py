from app import db
from database.database import Pagamentos, Usuarios
from flask_bcrypt import Bcrypt
from datetime import datetime

def hash_password(password):
    """Hash de senha usando bcrypt."""
    bcrypt = Bcrypt()
    return bcrypt.generate_password_hash(password).decode('utf-8')

def seed():
    data = datetime.now()
    usuario = Usuarios(email="mateus@proton.com", senha=hash_password('Developer12@'), token="trueADM", data="2024-11-30")

    
    """ USAR A API PARA CADASTRAR WEBHOOKS COMO SEEDERS"""
    # # Dados para a tabela Pagamentos
    # pagamento1 = Pagamentos(
    #     nome="João Silva",
    #     email="joao@example.com",
    #     status="Aprovado",
    #     valor=150.75,
    #     forma_pagamento="Cartão de Crédito",
    #     parcelas="3x",
    #     status_no_sistema="Concluído",
    #     data="2024-11-30"
    # )
    # pagamento2 = Pagamentos(
    #     nome="Maria Oliveira",
    #     email="maria@example.com",
    #     status="Pendente",
    #     valor=320.50,
    #     forma_pagamento="Boleto",
    #     parcelas="1x",
    #     status_no_sistema="Aguardando Pagamento",
    #     data="2024-11-30"
    # )
    
    # Adiciona os registros ao banco
    db.session.add_all([usuario])
    db.session.commit()
    print("Seeders executados com sucesso!")
