# ProjectName SDK exists test

import pytest
from nexarda_sdk import NexardaSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = NexardaSDK.test(None, None)
        assert testsdk is not None
