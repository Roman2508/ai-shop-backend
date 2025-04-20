import os 
import sys
import json
import spacy

MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', 'models', 'trained_model_new'))

# MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', 'model'))
# MODEL_PATH = 'C:\\PAPKA\\projects\\ai-shop\\MAIN\\backend\\model'

KEY_MAP = {
    "TITLE": "title",
    "BRAND": "brand",
    "PRICE": "price",
    "PRICE_GT": "price_gt",
    "PRICE_LT": "price_lt",
    "RAM": "ram",
    "BUILD_IN_MEMORY": "built_in_memory",
    "BUILD_IN_MEMORY_GT": "built_in_memory_gt",
    "BUILD_IN_MEMORY_LT": "built_in_memory_lt",
    "COLOR": "color",
    "FRONT_CAMERA": "front_camera",
    "MAIN_CAMERA": "main_camera",
    "MAIN_CAMERA_GT": "main_camera_gt",
    "DIAGONAL": "screen_diagonal",
    "DIAGONAL_GT": "screen_diagonal_gt",
    "DIAGONAL_LT": "screen_diagonal_lt",
    "SIM_COUNT": "sim_count",
    "SIM_FORMAT": "sim_format",
    "OS": "os",
    "PROCESSOR_NAME": "processor_name",
    "PROCESSOR_CORES": "processor_cores",
    "PROCESSOR_CORES_GT": "processor_cores_gt",
    "PROCESSOR_CORES_LT": "processor_cores_lt",
    "BATTERY": "battery",
    "BATTERY_GT": "battery_gt",
    "BATTERY_LT": "battery_lt",
    "MATERIALS": "materials",
    "DELIVERY_SET": "delivery_set",
}

PHONE_BRANDS_NAMES = {
    'iphone': 'iphone/apple/айфон/епл',
    'samsung': 'samsung/самсунг',
    'xiaomi': 'xiaomi/сяомі/ксяомі',
    'oneplus': 'oneplus/one plus/ванплас/ван плас',
    'google pixel': 'google pixel/гугл піксель/піксель/гугл',
    'motorola': 'motorola/моторола/мото',
    'nokia': 'nokia/нокіа',
    'poco': 'poco/поко',
    'oppo': 'oppo/оппо',
    'realme': 'realme/реалмі',
    'huawei': 'huawei/хуавей',
    'honor': 'honor/хонор/онор',
    'meizu': 'meizu/мейзу',
    'sony': 'sony/соні',
    'vivo': 'vivo/віво',
    'nubia': 'nubia',
    'tecno': 'tecno spark',
    'zte': 'zte/zte blade',
    'infinix': 'infinix',
    'blackview': 'blackview',
    'sigma': 'sigma',
    'hmd': 'hmd',
    'gigaset': 'gigaset',
    'oukitel': 'oukitel',
    'ulefone': 'ulefone',
    'asus': 'asus/асус',
    'doogee': 'doogee',
    'myphone': 'myphone',
    'evelatus': 'evelatus',
    'agm': 'agm',
    'doro': 'doro',
    'nomi': 'nomi',
    'ergo': 'ergo',
    'beafon': 'beafon',
    'emporia': 'emporia',
    'swisstone': 'swisstone',
    'el': 'el',
    'cmf': 'cmf',
    'nothing': 'nothing phone',
    'crosscall': 'crosscall',
    'jablocom': 'jablocom',
}

OS_NAMES= {
    'ios': 'iphone/apple/айфон/епл/ios/айос',
    'android': 'андроїд/андроід/android',
}


nlp = spacy.load(MODEL_PATH)


def rename_keys(original_dict, key_map):
    nested_keys = ["price", "built_in_memory", "screen_diagonal", "sim_count"]
    keys_has = ["sim_format"]
    keys_contains = ["brand", "title", "color", "os", "processor_name", "processor_cores", "materials", "delivery_set"]
    keys_equals = ["ram", "front_camera", "main_camera", "battery"]
    keys_gt = ["price_gt", "built_in_memory_gt", "main_camera_gt", "screen_diagonal_gt", "processor_cores_gt"]
    keys_lt = ["price_lt", "built_in_memory_lt", "screen_diagonal_lt", "processor_cores_lt"]

    new_dict = {}

    for old_key, value in original_dict.items():
        new_key = key_map.get(old_key, old_key)

        if new_key in nested_keys:
            new_dict[new_key] = int(value)


        elif new_key in keys_has:
            new_dict[new_key] = {"has": value}


        elif new_key in keys_contains:
            if new_key == 'brand':
                for brand_key, brand_value in PHONE_BRANDS_NAMES.items():
                    if value.lower() in [el.lower() for el in brand_value.split('/')]:
                        new_dict[new_key] = {"contains": brand_key, 'mode': 'insensitive'}
            elif new_key == 'os':
                for os_key, os_value in OS_NAMES.items():
                    if value.lower() in [el.lower() for el in os_value.split('/')]:
                        new_dict[new_key] = {"contains": os_key, 'mode': 'insensitive'}                
            else:
                new_dict[new_key] = {"contains": value, 'mode': 'insensitive'}


        elif new_key in keys_equals:
            try:
                new_dict[new_key] = {"equals": int(value.strip())}
            except ValueError:
                new_dict[new_key] = {"equals": value}


        elif new_key in keys_gt:
            new_current_key = new_key.split("_")
            new_current_key = "_".join(new_current_key[:-1])
            if new_current_key in new_dict:
                try:
                    new_dict[new_current_key]['gt'] = int(value)
                except ValueError:
                    if new_key == 'mainCamera':
                        if "гарною" in value or "гарна" in value or "якісна" in value or "якісною" in value:
                            new_dict[new_current_key]['gt'] = 64
                    else:
                        new_dict[new_current_key]['gt'] = 0
            else:
                try:
                    new_dict[new_current_key] = {'gt': int(value)}
                except ValueError:
                    if new_key == 'mainCamera':
                        if "гарною" in value or "гарна" in value or "якісна" in value or "якісною" in value:
                            new_dict[new_current_key] = {'gt': 64}
                    else:
                        new_dict[new_current_key] = {'gt': 0}


        elif new_key in keys_lt:
            new_current_key = new_key.split("_")
            new_current_key = "_".join(new_current_key[:-1])
            if new_current_key in new_dict:
                new_dict[new_current_key]['lt'] = int(value)
            else:
                new_dict[new_current_key] = {'lt': int(value)}

    return new_dict



def analyze(text):
    doc = nlp(text)
    entities_dict = {ent.label_: ent.text for ent in doc.ents}
    print('entities_dict:', entities_dict)
    result = rename_keys(entities_dict, KEY_MAP)
    return json.dumps(result, ensure_ascii=False)


if __name__ == "__main__":
    try:
        if len(sys.argv) < 2:
            json.dumps({"error": "No text argument provided"})
            print(json.dumps({"error": "No text argument provided"}))
        text = sys.argv[1]
        result = analyze(text)
        json.dumps(result)
        print(json.dumps(result))
    
    except Exception as e:
        error_result = {"message": "error", "error": str(e)}
        print(json.dumps(error_result))
