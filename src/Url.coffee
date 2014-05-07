class Url

  apiVersion = null
  urlGenerator = null

  constructor: (@$location) ->

  setUrlGenerator: (generator) ->
    if typeof generator.createUrl == 'function'
      urlGenerator = generator
    else
      throw new Error 'Url generator must implement method ::createUrl()'

  getUrlGenerator: ->
    urlGenerator

  setApiVersion: (version) ->
    apiVersion = version

  getPath: ->
    @$location.path()

  isCurrentPath: (path) ->
    @getPath().substr(0, path.length) == path

  getApiUrl: ->
    if !urlGenerator
      throw new Error 'No UrlGenerator set. Use Url::setUrlGenerator()'
    else
      urlGenerator.createUrl apiVersion

  getApiHostName: ->
    matches = @getApiUrl().match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    if matches && matches[1] then matches[1]

  getHostName: ->
    @$location.host()

  getProtocol: ->
    @$location.protocol() + '://'

angular.module('angryjs.url')
  .provider 'Url', ->

    urlGenerator = 'DomainApiUrlGenerator'
    apiVersion = 'v1'

    invokeUrlGenerator = ($injector) ->
      if angular.isString urlGenerator
        $injector.get urlGenerator
      else
        $injector.invoke urlGenerator

    @setUrlGenerator = (generator) ->
      urlGenerator = generator

    @setApiVersion = (version) ->
      apiVersion = version

    @$get = [
      '$rootScope', '$location', '$injector',
      ($rootScope, $location, $injector) ->
        url = new Url $location
        if urlGenerator != null
          url.setUrlGenerator invokeUrlGenerator $injector
        url.setApiVersion apiVersion
        $rootScope.Url = url;
        url
    ]

    @
