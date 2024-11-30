from flask import Flask, session
from flask_babel import Babel, _
from classes.database.database import db
from datetime import timedelta
import os

app = Flask(__name__, template_folder='views')

# secret_key
app.secret_key = "M4T3usBrnd3"
app.permanent_session_lifetime = timedelta(minutes=1440)

# Configuração do Flask-Babel
app.config['BABEL_DEFAULT_LOCALE'] = 'en'  
app.config['BABEL_SUPPORTED_LOCALES'] = ['pt_BR', 'en']  

babel = Babel(app)

def get_locale():
    return session.get('lang', 'en')


def create_app():
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://root:nununflask12@db:5432/webhook"
    db.init_app(app)
    
    babel.init_app(app, locale_selector=get_locale)
    """
        Não é esteticamente lindo, mas aparentemente é mais performático. Pois só vai entrar nas classes blueprints na criação do app
    """
    from routes.webhook.pagamentos import pagamentos
    app.register_blueprint(pagamentos)
    from routes.cadastro.cadastro import cadastro
    app.register_blueprint(cadastro)
    from routes.login.login import login
    app.register_blueprint(login)
    from routes.langs.langs import langs
    app.register_blueprint(langs)
    from routes.home.tabela.tabela import table
    app.register_blueprint(table)
    from routes.home.home import home
    app.register_blueprint(home)
    from routes.home.cards.cards import cards
    app.register_blueprint(cards)

    return app

app = create_app()
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
