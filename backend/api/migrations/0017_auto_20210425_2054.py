# Generated by Django 3.1.7 on 2021-04-25 15:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20210425_2053'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='processor',
            name='boost_clock',
        ),
        migrations.RemoveField(
            model_name='processor',
            name='multithreading',
        ),
    ]
