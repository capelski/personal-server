var appMapper = require('../config/app-mapper');

var absoluteDomain = "absolute-domain.com";
var absoluteApp = {
    "appPath": "apps/absolute-app",
    "namespace": "absolute-app",
    "domain": absoluteDomain
};

var localDomain = "localhost:3000";
var localApp = {
    "appPath": "apps/local-app",
    "namespace": "local-app"
};

var apps = [ localApp, absoluteApp ];

var rootDomainRequest = {
    domain: absoluteDomain,
    relativeUrl: '/'
};
var rootDomainResolvedUrl = appMapper.prefixRelativeUrl(apps, rootDomainRequest.domain, rootDomainRequest.relativeUrl);
if (rootDomainResolvedUrl != '/absolute-app')
    throw 'Expected "/absolute-app" but got "' + rootDomainResolvedUrl + '" instead';

var relativeDomainRequest = {
    domain: absoluteDomain,
    relativeUrl: '/relative-path'
};
var relativeDomainResolvedUrl = appMapper.prefixRelativeUrl(apps, relativeDomainRequest.domain, relativeDomainRequest.relativeUrl);
if (relativeDomainResolvedUrl != '/absolute-app/relative-path')
    throw 'Expected "/absolute-app/relative-path" but got "' + rootDomainResolvedUrl + '" instead';

var staticDomainRequest = {
    domain: absoluteDomain,
    relativeUrl: '/absolute-app/css/style.css'
};
var staticDomainResolvedUrl = appMapper.prefixRelativeUrl(apps, staticDomainRequest.domain, staticDomainRequest.relativeUrl);
if (staticDomainResolvedUrl != '/absolute-app/css/style.css')
    throw 'Expected "/absolute-app/css/style.css" but got "' + rootDomainResolvedUrl + '" instead';

var rootLocalRequest = {
    domain: 'localhost:3000',
    relativeUrl: '/local-app'
};
var rootLocalResolvedUrl = appMapper.prefixRelativeUrl(apps, rootLocalRequest.domain, rootLocalRequest.relativeUrl);
if (rootLocalResolvedUrl != '/local-app')
    throw 'Expected "/local-app" but got "' + rootLocalResolvedUrl + '" instead';

var relativeLocalRequest = {
    domain: 'localhost:3000',
    relativeUrl: '/local-app/relative-path'
};
var relativeLocalResvoledUrl = appMapper.prefixRelativeUrl(apps, relativeLocalRequest.domain, relativeLocalRequest.relativeUrl);
if (relativeLocalResvoledUrl != '/local-app/relative-path')
    throw 'Expected "/local-app/relative-path" but got "' + relativeLocalResvoledUrl + '" instead';

var staticLocalRequest = {
    domain: 'localhost:3000',
    relativeUrl: '/local-app/css/style.css'
};
var staticLocalResvoledUrl = appMapper.prefixRelativeUrl(apps, staticLocalRequest.domain, staticLocalRequest.relativeUrl);
if (staticLocalResvoledUrl != '/local-app/css/style.css')
    throw 'Expected "/local-app/css/style.css" but got "' + staticLocalResvoledUrl + '" instead';

var crossDomainRequest = {
    domain: absoluteDomain,
    relativeUrl: '/local-app'
};
var crossDomainResolvedUrl = appMapper.prefixRelativeUrl(apps, crossDomainRequest.domain, crossDomainRequest.relativeUrl);
if (staticLocalResvoledUrl != '/local-app/css/style.css')
    throw 'Expected "/local-app/css/style.css" but got "' + staticLocalResvoledUrl + '" instead';