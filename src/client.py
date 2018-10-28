import requests

from src.config import config, secrets

class CanvasAPI():
    host = config["host"]
    pref = config["prefix"]

    def __init__(self, secrets):
        """Creates and authenticates an instance of a Canvas API.
        Requires a secrets object containing a Bearer token
        """
        self.headers = {
            "Authorization": "Bearer %s" % (secrets["token"] or "")
        }

        return

    # Don't overthink it, just do the data analysis and be on your merry way
    def req(self, path, method="get", body=None):
        url = self.pref + self.host + path
        if method == "get":
            r = requests.get(
                    url,
                    headers=self.headers
                )
        elif method == "post":
            body = body or ""
            r = requests.post(
                    url,
                    headers=self.headers
                )

        return r

if __name__ == "__main__":
    api = CanvasAPI(secrets)
    print(api.host)
