
"""
Portfolio Backend URL Configuration - Production Ready
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from portfolio.admin import admin_site

# Set custom admin site
admin.site = admin_site

urlpatterns = [
    path('admin/', admin_site.urls),
    path('api/', include('portfolio.urls')),
    path('', RedirectView.as_view(url='/api/', permanent=False)),
]

# Serve media files in all environments
if settings.DEBUG or True:  # Always serve media files
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Add custom error handlers for production
handler404 = 'portfolio.views.custom_404'
handler500 = 'portfolio.views.custom_500'
