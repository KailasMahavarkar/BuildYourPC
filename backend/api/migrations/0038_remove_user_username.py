# Generated by Django 3.1.7 on 2021-04-27 13:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0037_user_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
    ]
