from flask import Flask, session
from flask_babel import Babel
from flask_migrate import Migrate
from database.database import db
from datetime import timedelta
from routes.webhook.pagamentos import pagamentos
from routes.cadastro.cadastro import cadastro
from routes.login.login import login
from routes.langs.langs import langs
from routes.home.tabela.tabela import table
from routes.home.cards.cards import cards
from middlewares.migrations_seed import run_flask_commands
from routes.home.home import home
import click
from flask.cli import with_appcontext
import os

app = Flask(__name__, template_folder='views')

app.secret_key = "M4T3usBrnd3"
app.permanent_session_lifetime = timedelta(minutes=1440)

app.config['BABEL_DEFAULT_LOCALE'] = 'en'  
app.config['BABEL_SUPPORTED_LOCALES'] = ['pt_BR', 'en']  
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://root:nununflask12@db:5432/webhook"


app.register_blueprint(pagamentos)
app.register_blueprint(cadastro)
app.register_blueprint(login)
app.register_blueprint(langs)
app.register_blueprint(table)
app.register_blueprint(home)
app.register_blueprint(cards)

def create_app():
    db.init_app(app)
    migrate = Migrate(app, db)

    @click.command("seed-db")
    @with_appcontext
    def seed_db_command():
        """Popula o banco de dados com dados iniciais."""
        from seeders.seed import seed 
        seed()
        
    app.cli.add_command(seed_db_command)
    

    babel = Babel(app)
    def get_locale():
        return session.get('lang', 'en')
    
    babel.init_app(app, locale_selector=get_locale)

    return app

app = create_app()

if __name__ == '__main__':
    run_flask_commands()
    app.run(host='0.0.0.0', port=5000, debug=True)

