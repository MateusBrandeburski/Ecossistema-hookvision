# Usar uma imagem base do Python
FROM python:3.11-slim

# Configurar o diretório de trabalho
WORKDIR /app

# Copiar os arquivos necessários para o contêiner
COPY . /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar as dependências do Python
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN pybabel compile -d translations

# Expor a porta 5000 para o Flask
EXPOSE 5000

# Comando padrão para iniciar o Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
