from django.db import models


class MOTHERBOARD(models.Model):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=20)
    model = models.CharField(max_length=50)
    socket = models.CharField(max_length=50)
    form_factor = models.CharField(max_length=50)
    ram_slots = models.IntegerField()
    max_ram = models.IntegerField()
    price = models.IntegerField()
    imageurl = models.CharField(max_length=2000)


class PROCESSOR(models.Model):
    name = models.CharField(max_length=100, default=None)
    brand = models.CharField(max_length=10, default=None)
    socket = models.CharField(max_length=10, default=None)
    cores = models.IntegerField()
    base_clock = models.IntegerField()
    tdp = models.IntegerField(default=None)
    integrated_graphics = models.CharField(max_length=50, default=None)
    price = models.CharField(max_length=10, default=None)
    imageurl = models.CharField(max_length=2000)
    motherboard = models.CharField(max_length=5000, default=None)


class RAM(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    storage = models.IntegerField()
    frequency = models.IntegerField()
    generation = models.CharField(max_length=100, default='ddr4')
    serial = models.CharField(max_length=100)
    imageurl = models.CharField(max_length=2000)


class USER(models.Model):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.CharField(max_length=100, primary_key=True)
    password = models.CharField(max_length=500)
    is_active = models.BooleanField(default=False)


class POWERSUPPLY(models.Model):
    name = models.CharField(max_length=200)
    serial = models.CharField(max_length=100)
    imageurl = models.CharField(max_length=100)
    watt = models.CharField(max_length=100)
    price = models.IntegerField()


class SSD(models.Model):
    name = models.CharField(max_length=200)
    serial = models.CharField(max_length=100)
    imageurl = models.CharField(max_length=100)
    storage = models.IntegerField()
    price = models.IntegerField()


class GPU(models.Model):
    name = models.CharField(max_length=200)
    serial = models.CharField(max_length=100)
    imageurl = models.CharField(max_length=100)
    generation = models.CharField(max_length=10)
    storage = models.IntegerField()
    price = models.IntegerField()


class MONITOR(models.Model):
    serial = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    type = models.CharField(max_length=10)
    resolution = models.CharField(max_length=20)
    imageurl = models.CharField(max_length=100)


class CABINET(models.Model):
    serial = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    imageurl = models.CharField(max_length=100)