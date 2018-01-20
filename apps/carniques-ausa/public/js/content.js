var contentScope;
angular.module('Content', [])

	.filter('html', function($sce) {
		return $sce.trustAsHtml;
	})

	.factory('SafeContext', function() {

		var apply = function (scope, fn, delay) {

			if(delay == null) {
				(scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
			}
			else {
				setTimeout(function() {
					safeApply(scope, fn);       		
				}, delay);
			}
		};		

		return {
			apply: apply
		};
	})

	.service('ContentData', function(SafeContext) {

		return function(scope, languages) {

			var content = {
				scope: scope,
				currentLanguage: '',
				current: {},
				add: function(data) {

					for(var languageBlock in data) {

						this.ensureLanguage(languageBlock);
						for(var property in data[languageBlock]) {
							this[languageBlock][property] = data[languageBlock][property]; 
						}
					}
				},
				ensureLanguage: function(language) {

					if(!this.hasOwnProperty(language))
						throw "Invalid language selected: " + language;
				},
				translate: function(language) {

					this.ensureLanguage(language);
					this.currentLanguage = language;
					SafeContext.apply(this.scope, function() {
						content.current = content[language];
					});
				}
			};

			for(var i = 0; i < languages.length; ++i) {
				content[languages[i]] = {};
			}

			if(languages.length > 0) {
				content.currentLanguage = languages[0];
				content.current = content[languages[0]];
			}

			return content;
		};
	})	

	.controller('ContentCtrl', function($scope, ContentData) {

		angular.element(document).ready(function() {
			contentScope = $scope;
		});

		$scope.content = ContentData($scope, ['es', 'en', 'ca']);
		
		$scope.content.add(navbarContent);
		$scope.content.add(valuesContent);
		$scope.content.add(aboutUsContent);
		$scope.content.add(catalogContent);
		$scope.content.add(contactContent);
	});
