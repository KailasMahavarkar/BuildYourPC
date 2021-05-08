import json
import os
from itertools import permutations
from pathlib import Path


def search(JsonData, query, defaultQuery='i5 i7 Ryzen'):
    """
    :param JsonData: json
    :param query: query
    :return: list
    """

    query = query.split(' ')
    flatten, result, finalUnique = {}, {}, []
    final = []

    k = [comb for x in range(1, len(query) + 1) for comb in list(permutations(query, x))]

    # helper
    uniq = list(set(tuple(frozenset(x)) for x in set(k)))

    [finalUnique.append(" ".join(elem).strip()) for elem in uniq]

    if all([len(x) >= 0 for x in finalUnique]):
        for elem in finalUnique:
            arr = []
            for data in JsonData:
                if elem.lower() in str(data['name']).lower():
                    arr.append(data['name'])

            if len(arr) > 0:
                result.update({len(arr): arr})

        sort = sorted(result.items())

        for count, data in sort:
            for x in data:
                flatten.update({x: None})

        for x in flatten.keys():
            for y in JsonData:
                if x == y['name']:
                    final.append(y)

        return final
    else:
        return search(JsonData=JsonData, query='')


if __name__ == "__main__":

    currentPath = Path(__file__).parent.parent.parent
    storage = os.path.join(currentPath, "storage")

    with open(file=os.path.join(storage, 'powersupply.json')) as file:
        jsonData = json.loads(file.read())

        newData = []

        res =search(JsonData=jsonData, query='Antec')

        for x in res:
            for y in x.items():
                print(y)