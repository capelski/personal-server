var appMapper = require('../config/app-mapper');

var absoluteDomain = "absolute-domain.com";
var absoluteApp = {
    "appPath": "apps/absolute-app",
    "namespace": absoluteDomain,
    "mapToDomain": true
};

var localDomain = "localhost:3000";
var localApp = {
    "appPath": "apps/local-app",
    "namespace": "local-app",
    "mapToDomain": false
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

var rootDomainResolvedUrl = appMapper.updateRelativeUrl(apps, rootDomainRequest.domain, rootDomainRequest.relativeUrl);
var relativeDomainResolvedUrl = appMapper.updateRelativeUrl(apps, relativeDomainRequest.domain, relativeDomainRequest.relativeUrl);

console.log('Expected value: /absolute-domain.com', rootDomainResolvedUrl);
console.log('Expected value: /absolute-domain.com/relative-path', relativeDomainResolvedUrl);

var rootLocalRequest = {
    domain: 'localhost:3000',
    relativeUrl: '/local-app'
};
var relativeLocalRequest = {
    domain: 'localhost:3000',
    relativeUrl: '/local-app/relative-path'
};

var rootLocalResolvedUrl = appMapper.updateRelativeUrl(apps, rootLocalRequest.domain, rootLocalRequest.relativeUrl);
var relativeLocalResvoledUrl = appMapper.updateRelativeUrl(apps, relativeLocalRequest.domain, relativeLocalRequest.relativeUrl);
console.log('Expected value: /local-app', rootLocalResolvedUrl);
console.log('Expected value: /local-app/relative-path', relativeLocalResvoledUrl);