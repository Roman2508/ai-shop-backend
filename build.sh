#!/bin/bash

# Встановлення Poetry в дозволену директорію
export POETRY_HOME="/opt/render/project/.poetry"
export PATH="$POETRY_HOME/bin:$PATH"

# Встановлення Poetry
curl -sSL https://install.python-poetry.org | python3 -

# Node.js частина
npm install
npm run build

# Python-залежності (recommendation)
cd src/modules/recommendation/python
poetry install

# Зберігаємо шлях до Python з poetry-середовища
export PYTHON_PATH_REC=$(poetry env info -p)/bin/python

# Python-залежності (nlp)
cd ../../nlp/python
poetry install

export PYTHON_PATH_NLP=$(poetry env info -p)/bin/python

# (Опціонально) записати ці шляхи у файл .env або передати у NestJS
echo "PYTHON_PATH_REC=$PYTHON_PATH_REC" >> /etc/environment
echo "PYTHON_PATH_NLP=$PYTHON_PATH_NLP" >> /etc/environment