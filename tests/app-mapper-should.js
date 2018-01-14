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

var apps = [ absoluteApp, localApp ];

var rootDomainRequest = {
    domain: 'absolute-domain.com',
    relativeUrl: '/'
};
var relativeDomainRequest = {
    domain: 'absolute-domain.com',
    relativeUrl: '/relative-path'
};
var staticDomainRequest = {
    domain: 'absolute-domain.com',
    relativeUrl: '/absolute-app/css/style.css'
};

var rootDomainResolvedUrl = appMapper.updateRelativeUrl(apps, rootDomainRequest.domain, rootDomainRequest.relativeUrl);
var relativeDomainResolvedUrl = appMapper.updateRelativeUrl(apps, relativeDomainRequest.domain, relativeDomainRequest.relativeUrl);
var staticDomainResolvedUrl = appMapper.updateRelativeUrl(apps, staticDomainRequest.domain, staticDomainRequest.relativeUrl);

console.log('Expected value: /absolute-app', rootDomainResolvedUrl);
console.log('Expected value: /absolute-app/relative-path', relativeDomainResolvedUrl);
console.log('Expected value: /absolute-app/css/style.css', staticDomainResolvedUrl);

var rootLocalRequest = {
    domain: 'localhost:3000',
    relativeUrl: '/local-app'
};
var relativeLocalRequest = {
    domain: 'localhost:3000',
    relativeUrl: '/local-app/relative-path'
};
var staticLocalRequest = {
    domain: 'localhost:3000',
    relativeUrl: '/local-app/css/style.css'
};

var rootLocalResolvedUrl = appMapper.updateRelativeUrl(apps, rootLocalRequest.domain, rootLocalRequest.relativeUrl);
var relativeLocalResvoledUrl = appMapper.updateRelativeUrl(apps, relativeLocalRequest.domain, relativeLocalRequest.relativeUrl);
var staticLocalResvoledUrl = appMapper.updateRelativeUrl(apps, staticLocalRequest.domain, staticLocalRequest.relativeUrl);

console.log('Expected value: /local-app', rootLocalResolvedUrl);
console.log('Expected value: /local-app/relative-path', relativeLocalResvoledUrl);
console.log('Expected value: /local-app/css/style.css', staticLocalResvoledUrl);