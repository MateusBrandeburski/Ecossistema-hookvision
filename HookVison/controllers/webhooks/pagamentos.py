
class Pagamento:
    
    def __init__(self, webhook):
        self.__webhook = webhook

    def nome(self):
        nome = self.__webhook["nome"]  
        return nome

    def email(self):
        email = self.__webhook["email"]
        return email
       
    def status(self):
        status = self.__webhook["status"]
        return status
    
    def valor(self):
        valor = self.__webhook["valor"]
        return valor
      
    def forma_de_pagamento(self):
        forma_pagamento = self.__webhook["forma_pagamento"]
        return forma_pagamento
    
    def parcelas(self):
        parcelas = self.__webhook["parcelas"]
        return parcelas
    
    