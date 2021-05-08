
from django.urls import path
from . import views
from api.views import *
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [

    # test url
    path('test', views.test, name="test"),

    # search views
    path('insertRAM', views.insertRAM, name="insertRAM"),
    path('insertProcessor', views.insertProcessor, name="insertProcessor"),
    path('insertMotherboard', views.insertMotherboard, name="insertMotherboard"),
    path('insertPowersupply', views.insertPowersupply, name="insertPowersupply"),
    path('insertSSD', views.insertSSD, name="insertSSD"),
    path('insertGPU', views.insertGPU, name="insertGPU"),
    path('insertMONITOR', views.insertMONITOR, name="insertMONITOR"),
    path('insertCABINET', views.insertCABINET, name="insertCABINET"),

    # search views
    path('searchRAM', views.searchRAM, name="searchRAM"),
    path('searchProcessor', views.searchProcessor, name="searchProcessor"),
    path('searchMotherboard', views.searchMotherboard, name="searchMotherboard"),
    path('searchPowersupply', views.searchPowersupply, name="searchPowersupply"),
    path('searchSSD', views.searchSSD, name="searchSSD"),
    path('searchGPU', views.searchGPU, name="searchGPU"),
    path('searchMONITOR', views.searchMONITOR, name="searchMONITOR"),
    path('searchCABINET', views.searchCABINET, name="searchCABINET"),

    # fetch views
    path('fetchRAM', views.fetchRAM, name="fetchRAM"),
    path('fetchProcessor', views.fetchProcessor, name="fetchProcessor"),
    path('fetchMotherboard', views.fetchMotherboard, name="fetchMotherboard"),
    path('fetchPowersupply', views.fetchPowersupply, name="fetchPowersupply"),
    path('fetchSSD', views.fetchSSD, name="fetchSSD"),
    path('fetchGPU', views.fetchGPU, name="fetchGPU"),
    path('fetchMONITOR', views.fetchMONITOR, name="fetchMONITOR"),
    path('fetchCABINET', views.fetchCABINET, name="fetchCABINET"),

    # auth views
    path(f'register', views.register, name="register"),
    path(f'login', views.login, name="login"),
    path(f'logout', views.logout, name="logout"),
    path(f'delete', views.delete, name="delete"),

    # admin views
    path('admin', admin.site.urls),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
