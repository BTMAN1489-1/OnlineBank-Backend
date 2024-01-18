# syntax=docker/dockerfile:1
FROM python:3.11-slim
COPY requirements.txt requirements.txt
EXPOSE 8000
RUN pip install -r requirements.txt
COPY . .
RUN python3 online_bank/manage.py migrate && \
 python3 online_bank/manage.py makemigrations && python3 online_bank/manage.py migrate main_app 0001

