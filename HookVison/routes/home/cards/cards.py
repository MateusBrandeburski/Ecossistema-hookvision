from flask import Blueprint, session, jsonify
from controllers.dashboard.graficos import Graficos
from controllers.dashboard.counts import Counts


cards = Blueprint('cards', __name__)

"""Antiga rota das informações. É preciso ajustar ela para renderizar as infos."""

# @cards.route('/cards')
# def index():
#     if not session.get('usuario_logado', None):
#         return redirect(url_for('login.index'))
#     return render_template('home/cards/cards.html')

@cards.route('/grafico-status')
def grafico_status():
    if not session.get('usuario_logado', None):
        return "Session expided - 419", 419
    return jsonify(Graficos.grafico_status())

@cards.route('/grafico-total')
def grafico_total():
    if not session.get('usuario_logado', None):
        return "Session expided - 419", 419
    return jsonify(Graficos.grafico_total())

@cards.route('/grafico-lucro-perdas')
def grafico_lucros_perdas():
    if not session.get('usuario_logado', None):
        return "Session expided - 419", 419
    return jsonify(Graficos.grafico_lucro_perdas())

@cards.route('/grafico-total30')
def grafico_total_30():
    if not session.get('usuario_logado', None):
        return "Session expided - 419", 419
    return jsonify(Counts.total_ultimos_30_dias())

    