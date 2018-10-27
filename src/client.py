from config import config, secrets

class CanvasAPI():
    host = config["host"]

if __name__ == "__main__":
    api = CanvasAPI()
    print(api.host)
