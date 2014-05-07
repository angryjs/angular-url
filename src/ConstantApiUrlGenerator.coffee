class ConstantApiUrlGenerator

  constructor: (@url) ->

  createUrl: (apiVersion = '') ->
    @url + '/' + apiVersion

angular.module('angryjs.url')
  .provider 'ConstantApiUrlGenerator',  ->

    apiUrl = null

    @setApiUrl = (url) ->
      apiUrl = url

    @$get = ->
      new ConstantApiUrlGenerator apiUrl

    @
