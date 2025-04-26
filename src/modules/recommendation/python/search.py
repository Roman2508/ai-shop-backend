import sys
import json
import numpy
import faiss

# Получаем путь к JSON-файлу из аргументов командной строки
json_file_path = sys.argv[1]

# Читаем JSON из файла
with open(json_file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)


# Получаем данные из JSON
user_viewed_vectors = numpy.array(data['queryVector'], dtype='float32')  # Эмбеддинги просмотренных товаров
all_product_vectors = numpy.array(data['allVectors'], dtype='float32')  # Все эмбеддинги товаров

# Создаем FAISS-индекс для всех товаров
dimension = all_product_vectors.shape[1]  # Размерность эмбеддингов
index = faiss.IndexFlatL2(dimension)  # Используем евклидово расстояние
index.add(all_product_vectors)  # Добавляем все эмбеддинги товаров

# Нормализуем эмбеддинги просмотренных товаров (если нужно)
user_viewed_vectors = user_viewed_vectors.reshape(user_viewed_vectors.shape[0], -1)

# Поиск похожих товаров для каждого просмотренного товара
all_similar_products = []

for query_vector in user_viewed_vectors:
    query_vector = numpy.array(query_vector, dtype='float32').reshape(1, -1)
    distances, indices = index.search(query_vector, 5)  # Ищем 5 ближайших товаров для каждого товара

    print(indices)

    # Добавляем найденные товары в общий список
    for i in range(len(indices[0])):
        all_similar_products.append((int(indices[0][i]), float(distances[0][i])))  # 👈 Приводим к int и float


# Сортируем товары по расстоянию (от наиболее похожих к менее похожим)
all_similar_products.sort(key=lambda x: x[1])

# Извлекаем ID товаров и расстояния
similar_product_ids = [product[0] for product in all_similar_products]
similar_distances = [product[1] for product in all_similar_products]

# Отправляем результат обратно в Node.js
result = {
    'ids': similar_product_ids,
    'distances': similar_distances
}

print(json.dumps(result))  # Результат будет возвращен как JSON