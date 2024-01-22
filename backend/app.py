from fastapi import FastAPI, Request, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import json
import asyncio
import websockets

app = FastAPI()

# Lista para almacenar los clientes WebSocket conectados
websocket_clients = []

# Configuración de CORS para permitir todos los orígenes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/receive_data")
async def recibir_json(request: Request):
    data = await request.json()
    with open("/app/data/data.json", "w") as file:
        json.dump(data, file)

    # Notificar a todos los clientes WebSocket sobre los nuevos datos
    for client in websocket_clients:
        await client.send_json({"message": "Nuevos datos disponibles"})

    return {"message": "Datos recibidos y guardados"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    websocket_clients.append(websocket)

    try:
        while True:
            # Puedes mantener la conexión WebSocket abierta para enviar actualizaciones en tiempo real
            await asyncio.sleep(3600)  # Esperar 1 hora o ajusta el tiempo según tus necesidades
    except WebSocketDisconnect:
        websocket_clients.remove(websocket)

# Esta función maneja las actualizaciones en tiempo real en el frontend
async def listen_for_updates():
    async with websockets.connect("ws://localhost:8000/ws") as websocket:  # Cambia la URL según tu configuración
        while True:
            message = await websocket.recv()
            # Maneja las actualizaciones en tiempo real en el frontend, por ejemplo, actualiza la interfaz de usuario
            print("Mensaje del servidor:", message)