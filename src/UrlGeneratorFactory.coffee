class UrlGeneratorFactory

  constructor: (@$injector) ->

  createService: (name) ->
    if angular.isString name
      @$injector.get name
    else
      @$injector.invoke name

angular.module('angryjs.url').factory 'UrlGeneratorFactory', [
  '$injector', ($injector) ->
    new UrlGeneratorFactory $injector
]
