# Nexarda SDK feature factory

from nexarda_sdk.feature.base_feature import NexardaBaseFeature
from nexarda_sdk.feature.ratelimit_feature import NexardaRatelimitFeature
from nexarda_sdk.feature.retry_feature import NexardaRetryFeature
from nexarda_sdk.feature.test_feature import NexardaTestFeature
from nexarda_sdk.feature.timeout_feature import NexardaTimeoutFeature


_FEATURES = {
    "base": lambda: NexardaBaseFeature(),
    "ratelimit": lambda: NexardaRatelimitFeature(),
    "retry": lambda: NexardaRetryFeature(),
    "test": lambda: NexardaTestFeature(),
    "timeout": lambda: NexardaTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
