# Nexarda SDK feature factory

from nexarda_sdk.feature.base_feature import NexardaBaseFeature
from nexarda_sdk.feature.test_feature import NexardaTestFeature


def _make_feature(name):
    features = {
        "base": lambda: NexardaBaseFeature(),
        "test": lambda: NexardaTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
