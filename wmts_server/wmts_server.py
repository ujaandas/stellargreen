from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse
from pathlib import Path
import logging

app = FastAPI()
root_dir = Path(__file__).parent

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files for tiles
app.mount(
    "/tiles",
    StaticFiles(directory=str(root_dir / "tiles/agbd_Img__2023_tiles")),
    name="tiles",
)


# Serve the WMTS configuration
@app.get("/wmts")
async def get_wmts():
    return FileResponse(str(root_dir / "wmts.xml"))


# Serve transparent image for missing tiles
@app.get("/tilesxyz/{z}/{x}/{y}.png")
async def get_tile(z: int, x: int, y: int):
    tile_path = root_dir / f"tiles/agbd_Img__2023_tiles/{z}/{x}/{y}.png"
    if not tile_path.exists():
        print(f"Tile not found!!!!: {tile_path}")
        return FileResponse(str(root_dir / "transparent.png"))
    print(f"Tile found!!!!: {tile_path}")
    return FileResponse(str(tile_path))


# Log requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logging.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logging.info(f"Response: {response.status_code}")
    return response


# Start the server
if __name__ == "__main__":
    import uvicorn

    logging.basicConfig(level=logging.INFO)
    uvicorn.run(app, host="0.0.0.0", port=8000)
