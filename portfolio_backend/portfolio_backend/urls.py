from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from portfolio.views import custom_404, custom_500
from django.views.static import serve


# Custom error handlers
handler404 = custom_404
handler500 = custom_500

urlpatterns = [
    path("favicon.ico", serve, {"path": "favicon.ico", "document_root": settings.STATIC_ROOT}),
    path("admin/", admin.site.urls),

    # ✅ Register namespaced API only ONCE
    path("api/", include(("portfolio.urls", "portfolio"), namespace="portfolio")),

    # Optional fallback root (not conflicting)
    path("", TemplateView.as_view(template_name="404.html"), name="root"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.site_header = "Portfolio Admin"
admin.site.site_title = "Portfolio Admin Portal"
admin.site.index_title = "Welcome to Portfolio Administration"
