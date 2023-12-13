from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Configuración de CORS para permitir todos los orígenes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes reemplazar "*" con los orígenes que deseas permitir
    allow_credentials=True,
    allow_methods=["*"],  # Puedes limitar los métodos HTTP permitidos (e.g., ["GET", "POST"])
    allow_headers=["*"],  # Puedes limitar los encabezados permitidos
)

@app.post("/receive_data")
async def recibir_json(request: Request):
    # Obtener el cuerpo de la solicitud como JSON
    data = await request.json()
    # Aquí puedes procesar y guardar los datos JSON
    with open("/app/data/data.json", "w") as file:
        json.dump(data, file)
    return {"message": "Datos recibidos y guardados"}