class DomainApiUrlGenerator

  constructor: (@$location) ->

  createUrl: (apiVersion = '') ->
    @$location.protocol() + '://api.' + @$location.host() + '/' + apiVersion


angular.module('angryjs.url').factory 'DomainApiUrlGenerator', [
  '$location', ($location) ->
    new DomainApiUrlGenerator $location
]
