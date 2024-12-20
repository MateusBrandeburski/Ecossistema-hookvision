from flask import Blueprint, render_template, session, redirect, url_for, request
from middlewares.envia_email import enviar_dados_para_api

home = Blueprint('home', __name__)

@home.route('/home')
def index():
    if not session.get('usuario_logado', None):
        return redirect(url_for('login.index'))
         
    real_ip = request.headers.get('CF-Connecting-IP', 'IP não encontrado')
    host = request.headers.get('Host', 'Host não encontrado')
    user_agent = request.headers.get('User-Agent', 'User-Agent não encontrado') 
    enviar_dados_para_api(real_ip, user_agent, host)
    
    language = session.get('lang', 'en')
    return render_template('home/dashboard/dashboard.html', lang=language)
