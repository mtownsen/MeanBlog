(function () {
  'use strict';

  angular
    .module('articles.services')
    .factory('ArticlesService', ArticlesService);

  ArticlesService.$inject = ['$resource', '$log', '$http'];

  function ArticlesService($resource, $log, $http) {
    var Article = $resource('/api/articles/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Article.prototype, {
      createOrUpdate: function () {
        var article = this;
        return createOrUpdate(article);
      },
      addComment: addComment
    });

    return Article;

    function createOrUpdate(article) {
      if (article._id) {
        return article.$update(onSuccess, onError);
      } else {
        return article.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(article) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function addComment(id, comment) {
      return $http.post('/api/articles/' + id + '/comments', comment);
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
