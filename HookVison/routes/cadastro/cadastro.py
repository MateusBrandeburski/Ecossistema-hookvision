from flask import Blueprint, render_template, request, flash, url_for, redirect, session
from validate_email import validate_email
from flask_bcrypt import Bcrypt
from classes.database.database import db, Usuarios
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timedelta
import os


bcrypt = Bcrypt()
cadastro = Blueprint('cadastro', __name__, template_folder='templates')

# rota que renderiza a página de cadastro
@cadastro.route('/cadastro')
def register():
    return render_template('cadastro/cadastro.html')

# rota que processa o cadastro.
@cadastro.route('/processa-cadastro', methods=['POST'])
def processa_cadastro():
      
    if request.method == 'POST':    
                                
        try:
            # captura os dados do input
            email = request.form['email']
            senha = request.form['senha']
            confirma_senha = request.form['confirma_senha']
            token = request.form['token']
            # data e hora tratas para fuso horário da deploy na Railway
            data = (datetime.now() - timedelta(hours=3)).strftime('%d/%m/%Y %H:%M')

                
            # verifica se o email é valido. É uma verificação superficial (verifica se tem @ no email). Se for válido, passa. 
            is_valid = validate_email(email)
            if is_valid:             
                pass
            
                # verifica a confirmção de senha, se forem iguais, converte ela em hash
                if confirma_senha == senha: 
                    hashed_password = bcrypt.generate_password_hash(senha).decode('utf-8')
            
                    # verifica o token de adm para criação da conta
                    if token == 'trueADM':
                        
                        # agora monta a query e commita no DB          
                        novo_usuario = Usuarios(email, hashed_password, token, data)  
                        db.session.add(novo_usuario)
                        db.session.commit()
                        
                        return redirect(url_for('login.index'))
                                                     
                    else:
                        flash('Token inválido')
                        return redirect(url_for('cadastro.register'))
                
                else:
                    flash('As senhas precisam ser iguais.')
                    return redirect(url_for('cadastro.register'))
                
            else:
                flash('Email inválido.')
                return redirect(url_for('cadastro.register'))



        # esse erro acontece quando já existem um usuário o email cadastrado no DB
        except IntegrityError:
            flash('Usuário ou Email já cadastrados.')
            return redirect(url_for('cadastro.register'))
        
        # esse erro acontece quando nenhum campo é preenchido
        except ValueError:
            flash('Todos os campos precissam ser preenchidos.')
            return redirect(url_for('cadastro.register'))
    
    return "Method Not Allowed", 405