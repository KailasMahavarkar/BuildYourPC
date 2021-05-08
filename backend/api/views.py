import os
import re
from string import punctuation, whitespace
from django.http import JsonResponse
from api.Controllers.search import search
import json
from .models import MOTHERBOARD, PROCESSOR, RAM, USER, POWERSUPPLY, SSD, GPU
from .models import MONITOR, CABINET
from hashlib import sha256
from django.views.decorators.csrf import csrf_exempt
from pathlib import Path


currentPath = Path(__file__).parent.parent
storage = os.path.join(currentPath, "storage")


# helper functions
def error(msg, status=400):
    return JsonResponse({"msg": f"Validation Error: {msg}"}, status=status)


def searchwrapper(request, data, part):
    if request.method == 'POST':
        loadedJson = json.loads(request.body)

        if "query" in loadedJson and type(loadedJson['query']) == str:
            query = loadedJson['query']
            updated = []
            res = search(JsonData=data, query=query)

            for x in res.copy():
                currUpdated = {}
                for k, v in x.items():
                    if k == part:
                        v = eval(v)
                        currUpdated.update({k: v})
                    else:
                        currUpdated.update({k: v})
                updated.append(currUpdated)
            return JsonResponse({'msg': updated})
        else:
            return JsonResponse({'msg': "invalid request with incorrect query body"}, status=404)


def test(request):
    data = MOTHERBOARD.objects.all().values()
    return searchwrapper(request=request, data=data, part='motherboard')


# insertion views

def insertMotherboard(request):
    MOTHERBOARD.objects.all().delete()
    with open(file=os.path.join(storage, "motherboard.json")) as file:
        data = json.loads(file.read())
        for k, v in data.items():
            name = v['name']
            brand = v['brand']
            model = v['model']
            socket = v['socket'],
            form_factor = v['form_factor']
            ram_slots = v['ram_slots'],
            max_ram = v['max_ram']['total'] // 1000000000,
            price = v['price']
            imageurl = v['imageurl']

            MOTHERBOARD.objects.create(
                name=name,
                brand=brand,
                model=model,
                socket=socket[0],
                form_factor=form_factor,
                ram_slots=ram_slots[0],
                max_ram=max_ram[0],
                price=price,
                imageurl=imageurl
            )

    if MOTHERBOARD.objects.all().count() > 0:
        return JsonResponse({
            "msg": f"Data Inserted",
            "count": MOTHERBOARD.objects.all().count()
        })


def insertProcessor(request):
    PROCESSOR.objects.all().delete()
    # processor
    with open(file=os.path.join(storage, "processor.json"), mode='r') as file:
        data = json.loads(file.read())
        for k, v in data.items():

            name = v['name']
            brand = v['brand']
            socket = v['socket']
            cores = v['cores']
            base_clock = v['base_clock']['cycles']
            tdp = v['tdp']
            integrated_graphics = v['integrated_graphics']
            price = v['price']
            imageurl = v['imageurl']
            motherboard = []
            for i, item in enumerate(v['motherboard']):
                motherboard.append(item + ',')
            motherboard = "".join(motherboard)[:-1]

            PROCESSOR.objects.create(
                name=name, brand=brand, socket=socket, cores=cores,
                base_clock=base_clock, tdp=tdp,
                integrated_graphics=integrated_graphics,
                price=price, imageurl=imageurl, motherboard=motherboard
            )

    if PROCESSOR.objects.all().count() > 0:
        return JsonResponse({
            "msg": f"Data Inserted",
            "count": PROCESSOR.objects.all().count()
        })


def insertRAM(request):
    RAM.objects.all().delete()
    with open(file=os.path.join(storage, 'ram.json')) as file:
        data = json.loads(file.read())

    for x in data:
        RAM.objects.create(
            name=data[x]['ram_name'],
            serial=data[x]['ram_serial'],
            frequency=data[x]['ram_speed'],
            storage=data[x]['ram_size'],
            generation=data[x]['ram_type'],
            imageurl=data[x]['imageurl'],
            price=data[x]['price']
        )

    if RAM.objects.all().count() > 0:
        return JsonResponse({
            "msg": f"Data Inserted",
            "count": RAM.objects.all().count()
        })


def insertPowersupply(request):
    POWERSUPPLY.objects.all().delete()
    # processor
    with open(file=os.path.join(storage, "powersupply.json"), mode='r') as file:
        data = json.loads(file.read())
        for x in data:
            POWERSUPPLY.objects.create(
                name=data[x]['name'], serial=data[x]['serial'], imageurl=data[x]['imageurl'],
                watt=data[x]['watt'], price=data[x]['price']
            )

    if POWERSUPPLY.objects.all().count() > 0:
        return JsonResponse({
            "msg": f"Data Inserted",
            "count": POWERSUPPLY.objects.all().count()
        })


def insertSSD(request):
    SSD.objects.all().delete()
    # ssd
    with open(file=os.path.join(storage, "ssd.json"), encoding='utf-8-sig', mode='r') as file:
        data = json.loads(file.read())

        for x in data:
            print(data[x])
            name = data[x]['name']
            serial = data[x]['serial'],
            price = int(data[x]['price']),
            _storage = int(data[x]['storage']),
            imageurl = data[x]['imageurl']

            SSD.objects.create(
                name=name, serial=serial[0], storage=_storage[0],
                price=price[0], imageurl=imageurl
            )

    if SSD.objects.all().count() > 0:
        return JsonResponse({
            "msg": f"Data Inserted",
            "count": SSD.objects.all().count()
        })


def insertGPU(request):
    GPU.objects.all().delete()
    # GPU
    with open(file=os.path.join(storage, "gpu.json"), encoding='utf-8-sig', mode='r') as file:
        data = json.loads(file.read())

        for x in data:
            name = data[x]['name']
            serial = data[x]['serial'],
            price = int(data[x]['price']),
            _storage = int(data[x]['storage']),
            imageurl = data[x]['imageurl'],
            generation = data[x]['generation']

            GPU.objects.create(
                name=name, serial=serial[0], storage=_storage[0],
                price=price[0], generation=generation, imageurl=imageurl[0]
            )

    if GPU.objects.all().count() > 0:
        return JsonResponse({
            "msg": f"Data Inserted",
            "count": GPU.objects.all().count()
        })


def insertMONITOR(request):
    MONITOR.objects.all().delete()
    # MONITOR
    with open(file=os.path.join(storage, "monitor.json"), encoding='utf-8-sig', mode='r') as file:
        data = json.loads(file.read())

        for x in data:
            name = data[x]['name']
            serial = data[x]['serial'],
            price = int(data[x]['price']),
            imageurl = data[x]['imageurl'],
            _type = data[x]['type'],
            resolution = data[x]['resolution']

            MONITOR.objects.create(
                name=name, serial=serial[0], type=_type[0],
                price=price[0], resolution=resolution, imageurl=imageurl[0]
            )

    if MONITOR.objects.all().count() > 0:
        return JsonResponse({
            "msg": f"Data Inserted",
            "count": MONITOR.objects.all().count()
        })


def insertCABINET(request):
    CABINET.objects.all().delete()
    # GPU
    with open(file=os.path.join(storage, "cabinet.json"), encoding='utf-8-sig', mode='r') as file:
        data = json.loads(file.read())

        for x in data:
            name = data[x]['name']
            serial = data[x]['serial'],
            price = int(data[x]['price']),
            imageurl = data[x]['imageurl'],

            CABINET.objects.create(
                name=name, serial=serial[0],
                price=price[0], imageurl=imageurl[0]
            )

    if CABINET.objects.all().count() > 0:
        return JsonResponse({
            "msg": f"Data Inserted",
            "count": CABINET.objects.all().count()
        })


# search views
@csrf_exempt
def searchProcessor(request):
    data = PROCESSOR.objects.all().values()
    return searchwrapper(request=request, data=data, part='processor')

@csrf_exempt
def searchMotherboard(request):
    data = MOTHERBOARD.objects.all().values()
    return searchwrapper(request=request, data=data, part='motherboard')

@csrf_exempt
def searchRAM(request):
    data = RAM.objects.all().values()
    return searchwrapper(request=request, data=data, part='ram')

@csrf_exempt
def searchPowersupply(request):
    data = POWERSUPPLY.objects.all().values()
    return searchwrapper(request=request, data=data, part='powersupply')

@csrf_exempt
def searchSSD(request):
    data = SSD.objects.all().values()
    return searchwrapper(request=request, data=data, part='ssd')

@csrf_exempt
def searchGPU(request):
    data = GPU.objects.all().values()
    return searchwrapper(request=request, data=data, part='gpu')

@csrf_exempt
def searchMONITOR(request):
    data = MONITOR.objects.all().values()
    return searchwrapper(request=request, data=data, part='monitor')

@csrf_exempt
def searchCABINET(request):
    data = CABINET.objects.all().values()
    return searchwrapper(request=request, data=data, part='monitor')


def fetchMotherboard(request):
    data = MOTHERBOARD.objects.all().values()

    response = {}
    for i, x in enumerate(data):
        response.update({
            i: {
                "name": x['name'],
                "brand": x['brand'],
                "model": x['model'],
                "socket": x['socket'],
                "form_factor": x['form_factor'],
                "ram_slots": x['ram_slots'],
                "max_ram": x['max_ram'],
                "price": x['price'],
                "imageurl": x['imageurl']
            }
        })

    return JsonResponse(response)


def fetchProcessor(request):
    data = PROCESSOR.objects.all().values()
    response = {}

    for i, x in enumerate(data):
        print(x)
        response.update({
            i: {
                "name": x['name'],
                "brand": x["brand"],
                "socket": x["socket"],
                "cores": x["cores"],
                "base_clock": x["base_clock"],
                "tdp": x["tdp"],
                "integrated_graphics": x["integrated_graphics"],
                "price": x["price"],
                "motherboard": x["motherboard"].split(','),
                "imageurl": x["imageurl"]
            }
        })

    return JsonResponse(response)


def fetchRAM(request):
    data = RAM.objects.all().values()
    response = {}
    for i, x in enumerate(data):
        response.update({
            i: {
                "name": x['name'],
                "serial": x['serial'],
                "frequency": x['frequency'],
                "storage": x['storage'],
                "generation": x['generation'],
                "imageurl": x['imageurl'],
                "price": x['price']
            }
        })

    return JsonResponse(response)


def fetchPowersupply(request):
    data = POWERSUPPLY.objects.all().values()
    response = {}
    for i, x in enumerate(data):
        response.update({
            i: {
                "name": x["name"],
                "serial": x["serial"],
                "imageurl": x["imageurl"],
                "watt": x["watt"],
                "price": x["price"]
            }
        })

    return JsonResponse(response)


def fetchSSD(request):
    data = SSD.objects.all().values()
    response = {}
    for i, x in enumerate(data):
        response.update({
            i: {
                "name": x['name'],
                "serial": x['serial'],
                "price": x['price'],
                "storage": x['storage'],
                "imageurl": x['imageurl']
            }
        })
    return JsonResponse(response)


def fetchGPU(request):
    data = GPU.objects.all().values()
    response = {}
    for i, x in enumerate(data):
        response.update({
            i: {
                "name": x['name'],
                "serial": x['serial'],
                "price": x['price'],
                "storage": x['storage'],
                "generation": x['generation'],
                "imageurl": x['imageurl']
            }
        })
    return JsonResponse(response)


def fetchMONITOR(request):
    data = MONITOR.objects.all().values()
    response = {}
    for i, x in enumerate(data):
        response.update({
            i: {
                "name": x['name'],
                "serial": x['serial'],
                "price": x['price'],
                "imageurl": x['imageurl'],
                "type": x['type'],
                "resolution": x['resolution']
            }
        })
    return JsonResponse(response)


def fetchCABINET(request):
    data = CABINET.objects.all().values()
    response = {}
    for i, x in enumerate(data):
        response.update({
            i: {
                "name": x['name'],
                "serial": x['serial'],
                "price": x['price'],
                "imageurl": x['imageurl'],
            }
        })
    return JsonResponse(response)


@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        expected = {
            'firstname': str,
            'lastname': str,
            'email': str,
            'password': str
        }

        if set(data.keys()) == set(expected.keys()):
            if not all([key in expected.keys() and type(key) == expected[key] for key in data.keys()]):
                return error(msg=f"Keys Expected {[x for x in expected]}")
        else:
            return error(msg=f"Json Request expects correct data {[k for k, v in expected.items()]}")

        # Create your views here.
        def checkPassword(query: str) -> bool:
            lowercase = uppercase = digit = False

            for x in query:
                if x.isdigit() is True:
                    digit = True
                elif x.isupper() is True:
                    uppercase = True
                elif x.islower() is True:
                    lowercase = True

            if len(query) >= 80 or len(query) <= 8:
                length = False
            else:
                length = True

            if digit and uppercase and lowercase and length:
                return True
            else:
                return False

        def checkName(query: str) -> bool:
            flag = True
            if len(query) <= 1:
                flag = False
            else:
                for x in query:
                    if x in punctuation or x in whitespace:
                        flag = False
            return flag

        def checkEmail(email: str) -> bool:
            if not isinstance(email, str) or email.find('@') == -1:
                return False
            elif email.count('@') > 1 or email.count('.') > 1:
                return False

            res = re.split(r"([@.])", email)
            if len(res) != 5:
                return False
            elif len(res[0]) == 0 and len(res[-1]) == 0:
                return False
            elif res[1] != '@' or res[-2] != '.':
                return False
            return True

        # running checks
        if not isinstance(data['firstname'], str) or not checkName(query=data['firstname']):
            return error(msg="Invalid firstname")
        elif not isinstance(data['lastname'], str) or not checkName(query=data['lastname']):
            return error(msg="Invalid lastname")
        elif not checkEmail(email=data['email']):
            return error(msg="Invalid email")
        elif not checkPassword(query=data['password']):
            return error(msg="password error")
        if USER.objects.filter(email=data['email']).count() == 1:
            return error(msg="Email exists")

        USER.objects.create(
            firstname=data['firstname'],
            lastname=data['lastname'],
            email=data['email'],
            password=sha256(str(data['password']).encode()).hexdigest()
        )

        return JsonResponse({"msg": f"new user created {data['email']}", "status": True})


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        expected = {
            'email': str,
            'password': str
        }
        if set(data.keys()) == set(expected.keys()):
            if not all([key in expected.keys() and type(key) == expected[key] for key in data.keys()]):
                return JsonResponse({
                    "msg": f"Keys Expected {[x for x in expected]}",
                    "status": True
                }, status=200)
        else:
            return JsonResponse({
                "msg": f"Json Request expects correct data {[k for k, v in expected.items()]}",
                "status": True
            }, status=200)

        if USER.objects.filter(email=data['email']).count() == 1:
            k = USER.objects.get(email=data['email'])

            if k.is_active:
                return JsonResponse({
                    "msg": "already logged in",
                    "status": True
                }, status=200)

            if k.email == data['email'] and k.password == sha256(str(data['password']).encode()).hexdigest():
                USER.objects.filter(pk=data['email']).update(is_active=True)

                return JsonResponse({
                    "msg": "user logged in",
                    "status": True
                }, status=200)
            else:
                return JsonResponse({
                    "msg": "Invalid Credentials",
                    "status": False
                }, status=400)
        else:
            return JsonResponse({
                "msg": "Validation error: Does not exists",
                "status": False
            }, status=400)


@csrf_exempt
def logout(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        expected = {
            'email': str,
            'password': str
        }

        if set(data.keys()) == set(expected.keys()):
            if not all([key in expected.keys() and type(key) == expected[key] for key in data.keys()]):
                return JsonResponse({
                    "msg": f"expects {[x for x in expected]}",
                    "status": False
                }, status=400)
        else:
            return JsonResponse({
                "msg": f"expects correct data {[k for k, v in expected.items()]}",
                "status": False
            }, status=400)

        if USER.objects.filter(email=data['email']).count() == 1:
            k = USER.objects.get(email=data['email'])

            if k.is_active is False:
                return JsonResponse({
                    "msg": "already logged out",
                    "status": True
                }, status=200)

            if k.email == data['email'] and k.password == sha256(str(data['password']).encode()).hexdigest():
                USER.objects.filter(pk=data['email']).update(is_active=False)
                return JsonResponse({
                    "msg": "user logged out",
                    "status": True
                }, status=200)
            else:
                return JsonResponse({
                    "msg": "Validation error: Invalid Credentials",
                    "status": False
                }, status=400)
        else:
            return JsonResponse({
                "msg": "Validation error: Does not exists",
                "status": False
            }, status=400)


@csrf_exempt
def delete(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        expected = {
            'email': str,
            'password': str
        }

        if set(data.keys()) == set(expected.keys()):
            if not all([key in expected.keys() and type(key) == expected[key] for key in data.keys()]):
                return JsonResponse({
                    "msg": f"expects {[x for x in expected]}",
                    "status": False
                }, status=400)
        else:
            return JsonResponse({
                "msg": f"expects correct data {[k for k, v in expected.items()]}",
                "status": False
            }, status=400)

        if USER.objects.filter(email=data['email']).count() == 1:
            k = USER.objects.get(email=data['email'])
            k.delete()

            return JsonResponse({
                "msg": "User Deleted sucessfully",
                "status": False
            }, status=200)

        else:
            return JsonResponse({
                "msg": "Validation error: Does not exists",
                "status": False
            }, status=400)
