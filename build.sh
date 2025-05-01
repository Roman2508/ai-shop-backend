#!/bin/bash
curl -sSL https://install.python-poetry.org | python3 -
export PATH="$HOME/.local/bin:$PATH"

npm install
npm run build

cd src/modules/recommendation/python
$HOME/.local/bin/poetry install

cd ../../nlp/python
$HOME/.local/bin/poetry install
