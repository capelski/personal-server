const { getNamespacedRelativeUrl } = require('../utils/app-publisher');

const absoluteDomain = "absolute-domain.com";
const absoluteApp = {
    name: "absolute-app",
    publicDomains: [ absoluteDomain ]
};

const localDomain = "localhost:3000";
const localApp = {
    name: "local-app"
};

const apps = [ localApp, absoluteApp ];

const rootDomainRequest = {
    domain: absoluteDomain,
    relativeUrl: '/'
};
const rootDomainResolvedUrl = getNamespacedRelativeUrl(apps, rootDomainRequest.domain, rootDomainRequest.relativeUrl);
if (rootDomainResolvedUrl != '/absolute-app')
    throw 'Expected "/absolute-app" but got "' + rootDomainResolvedUrl + '" instead';

const relativeDomainRequest = {
    domain: absoluteDomain,
    relativeUrl: '/relative-path'
};
const relativeDomainResolvedUrl = getNamespacedRelativeUrl(apps, relativeDomainRequest.domain, relativeDomainRequest.relativeUrl);
if (relativeDomainResolvedUrl != '/absolute-app/relative-path')
    throw 'Expected "/absolute-app/relative-path" but got "' + rootDomainResolvedUrl + '" instead';

const staticDomainRequest = {
    domain: absoluteDomain,
    relativeUrl: '/css/style.css'
};
const staticDomainResolvedUrl = getNamespacedRelativeUrl(apps, staticDomainRequest.domain, staticDomainRequest.relativeUrl);
if (staticDomainResolvedUrl != '/absolute-app/css/style.css')
    throw 'Expected "/absolute-app/css/style.css" but got "' + rootDomainResolvedUrl + '" instead';

const rootLocalRequest = {
    domain: 'localhost:3000',
    relativeUrl: '/local-app'
};
const rootLocalResolvedUrl = getNamespacedRelativeUrl(apps, rootLocalRequest.domain, rootLocalRequest.relativeUrl);
if (rootLocalResolvedUrl != '/local-app')
    throw 'Expected "/local-app" but got "' + rootLocalResolvedUrl + '" instead';

const relativeLocalRequest = {
    domain: 'localhost:3000',
    relativeUrl: '/local-app/relative-path'
};
const relativeLocalResvoledUrl = getNamespacedRelativeUrl(apps, relativeLocalRequest.domain, relativeLocalRequest.relativeUrl);
if (relativeLocalResvoledUrl != '/local-app/relative-path')
    throw 'Expected "/local-app/relative-path" but got "' + relativeLocalResvoledUrl + '" instead';

const staticLocalRequest = {
    domain: 'localhost:3000',
    relativeUrl: '/local-app/css/style.css'
};
const staticLocalResvoledUrl = getNamespacedRelativeUrl(apps, staticLocalRequest.domain, staticLocalRequest.relativeUrl);
if (staticLocalResvoledUrl != '/local-app/css/style.css')
    throw 'Expected "/local-app/css/style.css" but got "' + staticLocalResvoledUrl + '" instead';

const crossDomainRequest = {
    domain: absoluteDomain,
    relativeUrl: '/local-app'
};
const crossDomainResolvedUrl = getNamespacedRelativeUrl(apps, crossDomainRequest.domain, crossDomainRequest.relativeUrl);
if (crossDomainResolvedUrl != '/absolute-app/local-app')
    throw 'Expected "/absolute-app/local-app" but got "' + staticLocalResvoledUrl + '" instead';