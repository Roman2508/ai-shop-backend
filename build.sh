#!/bin/bash

# Встановлення Poetry в дозволену директорію
export POETRY_HOME="/opt/render/project/.poetry"
export PATH="$POETRY_HOME/bin:$PATH"

# Встановлення Poetry
curl -sSL https://install.python-poetry.org | python3 -

# Node.js частина
npm install
npm run build

# Python-залежності
cd src/modules/recommendation/python
poetry install

cd ../../nlp/python
poetry install
