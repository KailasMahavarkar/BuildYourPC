# Generated by Django 3.1.7 on 2021-04-27 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0042_auto_20210427_1930'),
    ]

    operations = [
        migrations.CreateModel(
            name='Motherboard',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=512)),
                ('brand', models.CharField(max_length=20)),
                ('model', models.CharField(max_length=50)),
                ('socket', models.CharField(max_length=50)),
                ('form_factor', models.CharField(max_length=50)),
                ('ram_slots', models.IntegerField()),
                ('max_ram', models.IntegerField()),
                ('price', models.IntegerField()),
                ('imageurl', models.CharField(max_length=2000)),
            ],
        ),
        migrations.CreateModel(
            name='POWERSUPPLY',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('serial', models.CharField(max_length=100)),
                ('imageurl', models.CharField(max_length=100)),
                ('watt', models.CharField(max_length=100)),
                ('price', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Processor',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(default=None, max_length=50)),
                ('brand', models.CharField(default=None, max_length=10)),
                ('socket', models.CharField(default=None, max_length=10)),
                ('cores', models.IntegerField()),
                ('base_clock', models.IntegerField()),
                ('tdp', models.IntegerField(default=None)),
                ('integrated_graphics', models.CharField(default=None, max_length=50)),
                ('price', models.CharField(default=None, max_length=10)),
                ('imageurl', models.CharField(max_length=2000)),
                ('motherboard', models.CharField(default=None, max_length=5000)),
            ],
        ),
        migrations.CreateModel(
            name='RAM',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('price', models.IntegerField()),
                ('storage', models.IntegerField()),
                ('frequency', models.IntegerField()),
                ('generation', models.CharField(default='ddr4', max_length=100)),
                ('serial', models.CharField(max_length=100)),
                ('imageurl', models.CharField(max_length=2000)),
            ],
        ),
        migrations.CreateModel(
            name='USER',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('firstname', models.CharField(max_length=100)),
                ('lastname', models.CharField(max_length=200)),
                ('email', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=500)),
                ('is_active', models.BooleanField(default=False)),
            ],
        ),
    ]
