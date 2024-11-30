from flask import Blueprint, request
from controllers.webhooks.pagamentos import Pagamento
from database.database import db, Pagamentos
from controllers.envia_email.gmail import envia_email
from datetime import datetime, timedelta
import json

pagamentos = Blueprint('pagamentos', __name__, template_folder='templates')

# é feito de tal dorma que eu cadastro essa rota no Weebhook
# rota que recebe os webrooks dos pagamentos.
@pagamentos.route('/webhook-pagamentos', methods=['POST'])
def webhook():

    if request.method == 'POST':
        """ A classe 'Pagamento' é quem recebe o webhook, e a classe 'Pagamentos' é a tabela no DB.
        Na primeira linha, ele recebe o webhook em bytes, converte em string, depois em json. A classe das tabelas, rebem a classe do 'Pagamento' que é a classe do webhook + a sua respectiva função que trás o dado tratado.
        """     
        webhook = json.loads(request.data.decode('utf-8'))
        
        if Pagamento(webhook).status() == "aprovado":
            
            pagamentos = Pagamentos(Pagamento(webhook).nome(), Pagamento(webhook).email(), Pagamento(webhook).status(), Pagamento(webhook).valor(), Pagamento(webhook).forma_de_pagamento(), Pagamento(webhook).parcelas(), "acesso_liberado", data=(datetime.now() - timedelta(hours=3)).strftime('%d/%m/%Y %H:%M'))
            
            db.session.add(pagamentos)
            db.session.commit()        
            
            """ Aqui poderia ser passada uma função para enviar um email para a pessoa avisado, ou para o adm, caso não seja automatizado. Coloquei um 'Try' para não exibir o erro do email fake.
            """
            try:
                envia_email("Seu acessso foi aprovado", Pagamento(webhook).email())
                print('Enviar mensagem de boas vindas para o email: fulano@email.com')
            except:
                print('Enviar mensagem de boas vindas para o email: fulano@email.com')
                
        
        elif Pagamento(webhook).status() == "recusado":
            pagamentos = Pagamentos(Pagamento(webhook).nome(), Pagamento(webhook).email(), Pagamento(webhook).status(), Pagamento(webhook).valor() , Pagamento(webhook).forma_de_pagamento(), Pagamento(webhook).parcelas(), "acesso_negado", data=(datetime.now() - timedelta(hours=3)).strftime('%d/%m/%Y %H:%M'))

            db.session.add(pagamentos)
            db.session.commit()       
            
            print('Enviar mensagem avisando que foi recusado para o email: fulano@email.com')
            
        elif Pagamento(webhook).status() == "reembolsado":
            pagamentos = Pagamentos(Pagamento(webhook).nome(), Pagamento(webhook).email(), Pagamento(webhook).status(), Pagamento(webhook).valor(), Pagamento(webhook).forma_de_pagamento(), Pagamento(webhook).parcelas(), "acesso_bloqueado", data=(datetime.now() - timedelta(hours=3)).strftime('%d/%m/%Y %H:%M'))

            db.session.add(pagamentos)
            db.session.commit()       

            print('Enviar mensagem avisando que foi reembolsado e o acesso foi retirado para o email: fulano@email.com')
    
        return "STATUS OK", 200
    
    return "Method Not Allowed", 405


