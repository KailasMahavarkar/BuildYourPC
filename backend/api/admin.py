from django.contrib import admin

from .models import MOTHERBOARD, PROCESSOR, RAM, USER, POWERSUPPLY, SSD, GPU, MONITOR

admin.site.register(MOTHERBOARD)
admin.site.register(PROCESSOR)
admin.site.register(RAM)
admin.site.register(POWERSUPPLY)
admin.site.register(SSD)
admin.site.register(GPU)
admin.site.register(MONITOR)
admin.site.register(USER)