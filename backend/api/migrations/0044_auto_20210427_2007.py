# Generated by Django 3.1.7 on 2021-04-27 14:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0043_motherboard_powersupply_processor_ram_user'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Motherboard',
        ),
        migrations.DeleteModel(
            name='POWERSUPPLY',
        ),
        migrations.DeleteModel(
            name='Processor',
        ),
        migrations.DeleteModel(
            name='RAM',
        ),
        migrations.DeleteModel(
            name='USER',
        ),
    ]
