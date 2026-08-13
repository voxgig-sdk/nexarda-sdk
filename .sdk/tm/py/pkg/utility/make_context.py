# Nexarda SDK utility: make_context

from projectname_sdk.core.context import NexardaContext


def make_context_util(ctxmap, basectx):
    return NexardaContext(ctxmap, basectx)
