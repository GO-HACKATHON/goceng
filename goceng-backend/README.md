# flask-backend-boilerplate

Boilerplate for building backend in flask.

## Install dependencies

```sh
virtualenv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run

```sh
python application.py
```

## Run using docker

```sh
docker build . -t myapp
docker run -d myapp
```