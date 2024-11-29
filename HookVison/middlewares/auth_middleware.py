from flask import request, session, redirect, url_for

def auth_middleware(app):
    @app.before_request
    def check_user_authentication():
        if request.endpoint in ['cadastro.register', 'login.index']:
            print('chegou aqui1')
            return 
        
        if 'usuario_logado' not in session or session['usuario_logado'] is None:
            print('chegou aqui2')
            return redirect(url_for('login.index'))
        print('chegou aqui3')
        return redirect(url_for('home.index'))
