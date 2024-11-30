from flask import Blueprint, session, render_template, redirect, url_for, request, flash
from flask_bcrypt import Bcrypt
from database.database import Usuarios
from flask_babel import _

bcrypt = Bcrypt()
login = Blueprint('login', __name__)

@login.route('/')
def index():
    if not session.get('usuario_logado', None):
        language = session.get('lang', 'en')
        return render_template('login/form_login.html', lang=language)
    return redirect(url_for('home.index'))

    
# Processa o login
@login.route('/autenticar', methods=['POST'])
def autenticar():
    if request.method == 'POST':    
        email = request.form['email']
        senha = request.form['senha']
        usuario = Usuarios.query.filter_by(email=email).first()
        if usuario is not None and bcrypt.check_password_hash(usuario.senha, senha):   
            session['usuario_logado'] = usuario.email
            return redirect(url_for('home.index'))
        flash('Username ou password inválidos')
        return redirect(url_for('login.index'))
    return "Method Not Allowed", 405


@login.route('/logout')
def logout():
    session['usuario_logado'] = None
    return redirect(url_for('login.index'))