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
poetry lock
poetry install

# Зберігаємо шлях до Python з poetry-середовища
# export PYTHON_PATH_REC=$(poetry env info -p)/bin/python
PYTHON_PATH_REC=$(poetry env info -p)/bin/python

# Python-залежності (nlp)
cd ../../nlp/python
poetry lock
poetry install


# --- Записуємо Python-шляхи у .env (у корені проєкту) ---
cd ../../../../
RECOMMENDATION_PY=$(cd src/modules/recommendation/python && poetry env info -p)/bin/python
NLP_PY=$(cd src/modules/nlp/python && poetry env info -p)/bin/python

echo "PYTHON_PATH_REC=$RECOMMENDATION_PY" >> .env
echo "PYTHON_PATH_NLP=$NLP_PY" >> .env