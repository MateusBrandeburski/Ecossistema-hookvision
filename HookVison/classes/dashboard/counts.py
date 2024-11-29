from classes.database.database import Pagamentos
from sqlalchemy import func, extract
from datetime import timedelta, datetime

class Counts:
    
    @staticmethod
    def total_ultimos_30_dias():
        data_inicial = datetime.now() - timedelta(days=30)
        total_registros = Pagamentos.query.filter(func.to_timestamp(Pagamentos.data, 'DD/MM/YYYY HH24:MI') >= data_inicial).count()
        return {"total": total_registros}
        
        
    @staticmethod
    def total_base():
        return Pagamentos.query.count()
    