from database.database import Pagamentos
from sqlalchemy import func, extract
from datetime import timedelta, datetime
from flask_babel import _

class Graficos:
    
    @staticmethod
    def grafico_status():
        data_inicial = datetime.now() - timedelta(days=30)
        
        acesso_bloqueado = Pagamentos.query.filter_by(status_no_sistema="acesso_bloqueado")\
            .filter(func.to_timestamp(Pagamentos.data, 'DD/MM/YYYY HH24:MI') >= data_inicial).count()
        acesso_liberado = Pagamentos.query.filter_by(status_no_sistema="acesso_liberado")\
            .filter(func.to_timestamp(Pagamentos.data, 'DD/MM/YYYY HH24:MI') >= data_inicial).count()
        acesso_negado = Pagamentos.query.filter_by(status_no_sistema="acesso_negado")\
            .filter(func.to_timestamp(Pagamentos.data, 'DD/MM/YYYY HH24:MI') >= data_inicial).count()
        
        resultado = {
            "acesso_bloqueado": {
                "total": acesso_bloqueado,
                "label": _("acesso_bloqueado")
                },
            "acesso_liberado": { 
                 "total": acesso_liberado,
                    "label": _("acesso_liberado")
                },
            "acesso_negado": {
                 "total": acesso_negado,
                 "label": _("acesso_negado")
                },
        }
        
        return resultado

    @staticmethod
    def grafico_total():
        data_inicial = datetime.now() - timedelta(days=30)
        
        result = Pagamentos.query.with_entities(
        func.date(func.to_timestamp(Pagamentos.data, 'DD/MM/YYYY HH24:MI')).label('data'),
        func.count(Pagamentos.id).label('quantidade_transacoes')
            ).filter(
                func.to_timestamp(Pagamentos.data, 'DD/MM/YYYY HH24:MI') >= data_inicial
            ).group_by(
                func.date(func.to_timestamp(Pagamentos.data, 'DD/MM/YYYY HH24:MI'))
            ).order_by(
                func.date(func.to_timestamp(Pagamentos.data, 'DD/MM/YYYY HH24:MI')).asc() 
            ).all() 
        

        registro = []
        for row in result:
            data_formatada = row.data.strftime('%Y-%m-%d') 
            registro.append({
                "data": data_formatada,
                "total": row.quantidade_transacoes
            })
            
        return {
            "title":_('title_card3'),
            "subtitle": _('sub_card3'),
            "tooltip":_('tooltip_card3'),
            "registros":registro
        }
        

    @staticmethod
    def grafico_lucro_perdas():
        data_inicial = datetime.now() - timedelta(days=30) 
        resultados = Pagamentos.query.with_entities(
            Pagamentos.status,
            func.sum(Pagamentos.valor).label('total_valor')
        ).filter(
            func.to_timestamp(Pagamentos.data, 'DD/MM/YYYY HH24:MI') >= data_inicial
        ).group_by(Pagamentos.status).all()

        resultado = {
            "title": _("title_card2"),
            "label_aprov": _('aprovado'),
            "label_reem": _('reembolsado'),
            "label_recus": _('recusado'),
            "reembolsado": 0,
            "aprovado": 0,
            "recusado": 0
        }

        for status, total_valor in resultados:
            if status == "reembolsado":
                resultado["reembolsado"] = int(total_valor)
            elif status == "aprovado":
                resultado["aprovado"] = int(total_valor)
            elif status == "recusado":
                resultado["recusado"] = int(total_valor)


        return resultado
    



    