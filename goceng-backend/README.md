# smart-route-backend

## Install dependencies

```sh
virtualenv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run

```sh
PORT=... \
MONGO_HOST=... \
MONGO_PORT=... \
MONGO_DB=... \
KEY=<gmap_key> \
python application.py
```

## Run using docker

```sh
docker build . -t myapp
docker run -d myapp
```