from flask import Blueprint, session, jsonify, request
from classes.dashboard.tabela import Tabela


table = Blueprint('table', __name__)


@table.route('/table')
def table_autocomplite():
    if not session.get('usuario_logado', None):
        return "Session expided - 419", 419
    
    search = request.args.get('search')
    limit = int(request.args.get('limit', 10))
    offset = int(request.args.get('offset', 0))
    return jsonify(Tabela.search_auto_complite(search_term=search, limit=limit, offset=offset))