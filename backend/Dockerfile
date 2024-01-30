# Usar la imagen base de Python 3.9
FROM python:3.9

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el código de la aplicación FastAPI al contenedor
COPY . .

# Instalar las dependencias especificadas en requirements.txt
RUN pip install -r requirements.txt

# Exponer el puerto 8000 para que la aplicación FastAPI esté disponible desde fuera del contenedor
EXPOSE 8900

# Comando para ejecutar el script de inicio
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8900"]
