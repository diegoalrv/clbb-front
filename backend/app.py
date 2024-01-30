from fastapi import FastAPI, Request, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

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

# Función para enviar datos a todos los clientes WebSocket
async def send_data_to_clients(data):
    print(data)
    for client in websocket_clients:
        await client.send_json(data)

@app.post("/receive_data")
async def recibir_json(request: Request):
    data = await request.json()
    with open("/app/data/data.json", "w") as file:
        json.dump(data, file)

    # Leer los datos desde el archivo /app/data/data.json
    with open("/app/data/data.json", "r") as file:
        saved_data = json.load(file)
        
    # # Enviar los datos a todos los clientes WebSocket
    # await send_data_to_clients(saved_data)

    return {"message": "Datos recibidos y guardados"}

# @app.get("/get_initial_data")
# async def serve_initial_data():
#     # Leer los datos desde el archivo /app/data/data.json
#     with open("/app/data/data.json", "r") as file:
#         saved_data = json.load(file)
#     return JSONResponse(content=saved_data)

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     websocket_clients.append(websocket)
#     try:
#         while True:
#             # Puedes mantener la conexión WebSocket abierta para enviar actualizaciones en tiempo real
#             await asyncio.sleep(3600)  # Esperar 1 hora o ajusta el tiempo según tus necesidades
#     except WebSocketDisconnect:
#         websocket_clients.remove(websocket)

# # Esta función maneja las actualizaciones en tiempo real en el frontend
# async def listen_for_updates():
#     async with websockets.connect("ws://localhost:8000/ws") as websocket:  # Cambia la URL según tu configuración
#         while True:
#             message = await websocket.recv()
#             # Maneja las actualizaciones en tiempo real en el frontend, por ejemplo, actualiza la interfaz de usuario
#             print("Mensaje del servidor:", message)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8900)