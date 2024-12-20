import httpx

def enviar_dados_para_api(ip, user_agent, host=""):
    with httpx.Client() as client:
        client.post(f'http://192.168.0.10:9001/api/enviar-email?ip={ip}&user_agent={user_agent}&url={host}&anti-flood=true')

