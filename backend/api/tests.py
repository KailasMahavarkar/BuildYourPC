import json
import os
import time
from pathlib import Path
import logging
from shutil import copyfile
import os
import pathlib

import requests

currentPath = Path(__file__).parent.parent
storage = os.path.join(currentPath, "storage")
filePath = os.path.join(storage, 'ram.json')

def crawlImages(directory):
    allowedExtensions = ['.jpg', '.png', '.jpeg']
    res = []
    for root, dirs, files in os.walk(directory):
        for f in files:
            if pathlib.Path(f).suffix in allowedExtensions:
                fileName = os.path.abspath(os.path.join(root, f))
                if fileName not in res:
                    res.append(fileName.split('\\')[-1])
    return res


# with open(file=filePath, mode='r', encoding='utf-8') as file:
#     data = json.loads(file.read())
#     images = [x['imageurl'] for x in data]
#
#     print(images)
#
#     for x in images:
#         if x in crawlImages(directory=fr"C:\Users\kai\Desktop\Memory_ RAM_files"):
#             copyfile(
#                 src=fr'C:\Users\kai\Desktop\Memory_ RAM_files\{x}',
#                 dst=fr'{storage}\ram\{x}'
#             )

#     final = []
#     for x in data:
#
#         d = {
#             "ram_serial": x['ram_serial'],
#             "ram_name": x['ram_name'],
#             "price": x['price'],
#             "ram_size": x['ram_size'],
#             "ram_speed": x['ram_speed'],
#             "ram_type": x['ram_type'],
#             "imageurl": x['imageurl'].replace('%20', ' ')
#         }
#         final.append(d)
#
# print(json.dumps(data))

final = {}
with open(file=f"{storage}\\monitor.json") as file:
    data = json.loads(file.read())

    for i, item in enumerate(data):
        data[item]['imageurl'] = "monitor\\"+data[item]['imageurl']
        final.update({i: data[item]})


print(json.dumps(final))