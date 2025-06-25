"""
Portfolio Backend URL Configuration - Production Ready
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('portfolio.urls')),
    path('', RedirectView.as_view(url='/api/', permanent=False)),
]

# ✅ Serve media and static files
if settings.DEBUG or True:  # You can change this to only run in DEBUG if needed
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# ✅ Custom error handlers (make sure they exist in portfolio/views.py)
handler404 = 'portfolio.views.custom_404'
handler500 = 'portfolio.views.custom_500'
