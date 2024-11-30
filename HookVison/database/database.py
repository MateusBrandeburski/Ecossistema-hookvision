from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Pagamentos(db.Model):
    
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(150))
    email = db.Column(db.String(150))
    status = db.Column(db.String(50))
    valor = db.Column(db.Float(precision=2))
    forma_pagamento = db.Column(db.String(50))
    parcelas = db.Column(db.String(50))
    status_no_sistema = db.Column(db.String(50), nullable=False)
    data = db.Column(db.String(20))
    

    def __init__(self, nome, email, status, valor, forma_pagamento, parcelas, status_no_sistema, data):
        self.nome = nome
        self.email = email
        self.status = status
        self.valor = valor
        self.forma_pagamento = forma_pagamento
        self.parcelas = parcelas
        self.status_no_sistema = status_no_sistema
        self.data = data

        
class Usuarios(db.Model):
    
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(150), unique=True)
    senha = db.Column(db.String(256), nullable=False)
    token = db.Column(db.String(20), nullable=False)
    data = db.Column(db.String(20))

    def __init__(self, email, senha, token, data):
        self.email = email
        self.senha = senha
        self.token = token
        self.data = data


