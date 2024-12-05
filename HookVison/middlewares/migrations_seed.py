import subprocess

def run_flask_commands():
    try:
        subprocess.run(["flask", "db", "init"], check=True)
        subprocess.run(["flask", "db", "migrate", "-m", "Initial migration."], check=True)
        subprocess.run(["flask", "db", "upgrade"], check=True)
        subprocess.run(["flask", "seed-db"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Erro ao executar comandos: {e}")