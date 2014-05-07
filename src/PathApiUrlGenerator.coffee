class PathApiUrlGenerator

  constructor: (@$location) ->

  createUrl: (apiVersion = '') ->
    @$location.protocol() + '://' + @$location.host() + '/api/' + apiVersion


angular.module('angryjs.url').factory 'PathApiUrlGenerator', [
  '$location', ($location) ->
    new PathApiUrlGenerator $location
]
