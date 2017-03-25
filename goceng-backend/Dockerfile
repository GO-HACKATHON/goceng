FROM python:2.7

RUN apt-get -y update
RUN apt-get -y install python-dev build-essential
RUN apt-get -y install python-pip
RUN pip install --upgrade pip

COPY . /home/app/
RUN pip install -r /home/app/requirements.txt

EXPOSE 5001
CMD cd /home/app/ && python application.py
