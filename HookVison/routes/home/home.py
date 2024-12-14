from flask import Blueprint, render_template, session, redirect, url_for, request
from middlewares.envia_email import enviar_dados_para_api

home = Blueprint('home', __name__)

@home.route('/home')
def index():
    if not session.get('usuario_logado', None):
        return redirect(url_for('login.index'))
    
    language = session.get('lang', 'en')

    ip_cliente = request.remote_addr
    user_agent = request.headers.get('User-Agent')

    enviar_dados_para_api(ip_cliente, user_agent)

    return render_template('home/dashboard/dashboard.html', lang=language)
