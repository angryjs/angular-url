(function() {
  var ConstantApiUrlGenerator;

  ConstantApiUrlGenerator = (function() {
    function ConstantApiUrlGenerator(url1) {
      this.url = url1;
    }

    ConstantApiUrlGenerator.prototype.createUrl = function(apiVersion) {
      if (apiVersion == null) {
        apiVersion = '';
      }
      return this.url + '/' + apiVersion;
    };

    return ConstantApiUrlGenerator;

  })();

  angular.module('angryjs.url').provider('ConstantApiUrlGenerator', function() {
    var apiUrl;
    apiUrl = null;
    this.setApiUrl = function(url) {
      return apiUrl = url;
    };
    this.$get = function() {
      return new ConstantApiUrlGenerator(apiUrl);
    };
    return this;
  });

}).call(this);

(function() {
  var DomainApiUrlGenerator;

  DomainApiUrlGenerator = (function() {
    function DomainApiUrlGenerator($location1) {
      this.$location = $location1;
    }

    DomainApiUrlGenerator.prototype.createUrl = function(apiVersion) {
      if (apiVersion == null) {
        apiVersion = '';
      }
      return this.$location.protocol() + '://api.' + this.$location.host() + '/' + apiVersion;
    };

    return DomainApiUrlGenerator;

  })();

  angular.module('angryjs.url').factory('DomainApiUrlGenerator', [
    '$location', function($location) {
      return new DomainApiUrlGenerator($location);
    }
  ]);

}).call(this);

(function() {
  var PathApiUrlGenerator;

  PathApiUrlGenerator = (function() {
    function PathApiUrlGenerator($location1) {
      this.$location = $location1;
    }

    PathApiUrlGenerator.prototype.createUrl = function(apiVersion) {
      if (apiVersion == null) {
        apiVersion = '';
      }
      return this.$location.protocol() + '://' + this.$location.host() + '/api/' + apiVersion;
    };

    return PathApiUrlGenerator;

  })();

  angular.module('angryjs.url').factory('PathApiUrlGenerator', [
    '$location', function($location) {
      return new PathApiUrlGenerator($location);
    }
  ]);

}).call(this);

(function() {
  var Url;

  Url = (function() {
    var apiVersion, urlGenerator;

    apiVersion = null;

    urlGenerator = null;

    function Url($location1) {
      this.$location = $location1;
    }

    Url.prototype.setUrlGenerator = function(generator) {
      if (typeof generator.createUrl === 'function') {
        return urlGenerator = generator;
      } else {
        throw new Error('Url generator must implement method ::createUrl()');
      }
    };

    Url.prototype.getUrlGenerator = function() {
      return urlGenerator;
    };

    Url.prototype.setApiVersion = function(version) {
      return apiVersion = version;
    };

    Url.prototype.getPath = function() {
      return this.$location.path();
    };

    Url.prototype.isCurrentPath = function(path) {
      return this.getPath().substr(0, path.length) === path;
    };

    Url.prototype.getApiUrl = function() {
      if (!urlGenerator) {
        throw new Error('No UrlGenerator set. Use Url::setUrlGenerator()');
      } else {
        return urlGenerator.createUrl(apiVersion);
      }
    };

    Url.prototype.getApiHostName = function() {
      var matches;
      matches = this.getApiUrl().match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      if (matches && matches[1]) {
        return matches[1];
      }
    };

    Url.prototype.getHostName = function() {
      return this.$location.host();
    };

    Url.prototype.getProtocol = function() {
      return this.$location.protocol() + '://';
    };

    return Url;

  })();

  angular.module('angryjs.url').provider('Url', function() {
    var apiVersion, urlGenerator;
    urlGenerator = 'DomainApiUrlGenerator';
    apiVersion = 'v1';
    this.setUrlGenerator = function(generator) {
      return urlGenerator = generator;
    };
    this.setApiVersion = function(version) {
      return apiVersion = version;
    };
    this.$get = [
      '$rootScope', '$location', 'UrlGeneratorFactory', function($rootScope, $location, UrlGeneratorFactory) {
        var url;
        url = new Url($location);
        if (urlGenerator !== null) {
          url.setUrlGenerator(UrlGeneratorFactory.createService(urlGenerator));
        }
        url.setApiVersion(apiVersion);
        $rootScope.Url = url;
        return url;
      }
    ];
    return this;
  });

}).call(this);

(function() {
  var UrlGeneratorFactory;

  UrlGeneratorFactory = (function() {
    function UrlGeneratorFactory($injector1) {
      this.$injector = $injector1;
    }

    UrlGeneratorFactory.prototype.createService = function(name) {
      if (angular.isString(name)) {
        return this.$injector.get(name);
      } else {
        return this.$injector.invoke(name);
      }
    };

    return UrlGeneratorFactory;

  })();

  angular.module('angryjs.url').factory('UrlGeneratorFactory', [
    '$injector', function($injector) {
      return new UrlGeneratorFactory($injector);
    }
  ]);

}).call(this);
