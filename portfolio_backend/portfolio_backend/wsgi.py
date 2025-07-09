
"""
WSGI config for portfolio_backend project.
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')

application = get_wsgi_application()
