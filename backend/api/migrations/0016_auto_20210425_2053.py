# Generated by Django 3.1.7 on 2021-04-25 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20210425_2052'),
    ]

    operations = [
        migrations.AlterField(
            model_name='processor',
            name='motherboard',
            field=models.CharField(default=None, max_length=5000),
        ),
    ]
