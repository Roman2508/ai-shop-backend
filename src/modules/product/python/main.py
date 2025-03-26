import os
import sys
import json
import torch
from transformers import AutoTokenizer, AutoModel

MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', 'model_llama3.2', 'bge-small-en-v1.5'))
# DIM = 3072
DIM = 4096

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModel.from_pretrained(MODEL_PATH)


def get_embedding(text):
    inputs = tokenizer(text, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).squeeze().tolist()


def resize_embedding(embedding, target_size=DIM):
    if len(embedding) < target_size:
        return embedding + [0.0] * (target_size - len(embedding))
    return embedding[:target_size]


def main():
    text = sys.argv[1]
    embedding = get_embedding(text)
    embedding = resize_embedding(embedding)
    print(json.dumps(embedding))

if __name__ == '__main__':
    main()