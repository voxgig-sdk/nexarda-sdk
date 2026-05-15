<?php
declare(strict_types=1);

// Nexarda SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

NexardaUtility::setRegistrar(function (NexardaUtility $u): void {
    $u->clean = [NexardaClean::class, 'call'];
    $u->done = [NexardaDone::class, 'call'];
    $u->make_error = [NexardaMakeError::class, 'call'];
    $u->feature_add = [NexardaFeatureAdd::class, 'call'];
    $u->feature_hook = [NexardaFeatureHook::class, 'call'];
    $u->feature_init = [NexardaFeatureInit::class, 'call'];
    $u->fetcher = [NexardaFetcher::class, 'call'];
    $u->make_fetch_def = [NexardaMakeFetchDef::class, 'call'];
    $u->make_context = [NexardaMakeContext::class, 'call'];
    $u->make_options = [NexardaMakeOptions::class, 'call'];
    $u->make_request = [NexardaMakeRequest::class, 'call'];
    $u->make_response = [NexardaMakeResponse::class, 'call'];
    $u->make_result = [NexardaMakeResult::class, 'call'];
    $u->make_point = [NexardaMakePoint::class, 'call'];
    $u->make_spec = [NexardaMakeSpec::class, 'call'];
    $u->make_url = [NexardaMakeUrl::class, 'call'];
    $u->param = [NexardaParam::class, 'call'];
    $u->prepare_auth = [NexardaPrepareAuth::class, 'call'];
    $u->prepare_body = [NexardaPrepareBody::class, 'call'];
    $u->prepare_headers = [NexardaPrepareHeaders::class, 'call'];
    $u->prepare_method = [NexardaPrepareMethod::class, 'call'];
    $u->prepare_params = [NexardaPrepareParams::class, 'call'];
    $u->prepare_path = [NexardaPreparePath::class, 'call'];
    $u->prepare_query = [NexardaPrepareQuery::class, 'call'];
    $u->result_basic = [NexardaResultBasic::class, 'call'];
    $u->result_body = [NexardaResultBody::class, 'call'];
    $u->result_headers = [NexardaResultHeaders::class, 'call'];
    $u->transform_request = [NexardaTransformRequest::class, 'call'];
    $u->transform_response = [NexardaTransformResponse::class, 'call'];
});
