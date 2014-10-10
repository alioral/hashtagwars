from django.conf.urls import patterns, include, url
from website import views

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'hashtagbattle.views.home', name='home'),
    # url(r'^hashtagbattle/', include('hashtagbattle.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index, name ='index'),
    url(r'^get_hashtag_count/$', views.get_hashtag_count, name='get_hashtag_count'),
)
