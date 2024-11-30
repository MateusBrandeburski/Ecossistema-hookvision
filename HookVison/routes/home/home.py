from flask import Blueprint, render_template, session, redirect, url_for
from controllers.dashboard.tabela import Tabela

home = Blueprint('home', __name__)

@home.route('/home')
def index():
    if not session.get('usuario_logado', None):
        return redirect(url_for('login.index'))
    language = session.get('lang', 'en')
    return render_template('home/dashboard/dashboard.html', lang=language)
