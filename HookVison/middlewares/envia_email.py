import httpx
import sqlite3
from datetime import datetime, timedelta

def enviar_dados_para_api(ip, user_agent):
    with sqlite3.connect('ips.db') as conn:
        cursor = conn.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS ips_enviados (ip TEXT PRIMARY KEY, hora_envio DATETIME)")
    
        cursor.execute('SELECT hora_envio FROM ips_enviados WHERE ip = ?', (ip,))
        resultado = cursor.fetchone()
        
        if resultado:
            hora_envio = datetime.strptime(resultado[0], '%Y-%m-%d %H:%M:%S')
            if datetime.now() - hora_envio < timedelta(hours=3):
                print(f"IP {ip} já enviou um e-mail nas últimas 3 horas. Não será enviado novamente.")
                return  # Não envia e-mail

        cursor.execute('INSERT OR REPLACE INTO ips_enviados (ip, hora_envio) VALUES (?, ?)', 
                       (ip, datetime.now().strftime('%Y-%m-%d %H:%M:%S')))

        with httpx.Client() as client:
            url = "hookvision.mateusbrandeburski.com"
            response = client.post(f'http://localhost:8000/api/enviar-email?ip={ip}&user_agent={user_agent}&url={url}')
            print(f"Status da resposta: {response.status_code}")
            print(f"Resposta da API: {response.text}")
