import os
from storages.backends.azure_storage import AzureStorage


class AzureMediaStorage(AzureStorage):
    account_name = 'radiusstorage' # <storage_account_name>
    account_key = os.environ['account_key'] # <storage_account_key>
    azure_container = 'media'
    expiration_secs = None

class AzureStaticStorage(AzureStorage):
    account_name = 'radiusstorage' # <storage_account_name>
    account_key = os.environ['account_key'] # <storage_account_key>
    azure_container = 'static'
    expiration_secs = None