(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$scope', 'articleResolve', 'Authentication', 'Notification'];

  function ArticlesController($scope, article, Authentication, Notification) {
    var vm = this;
    vm.article = article;
    vm.authentication = Authentication;
    vm.addComment = addComment;

    function addComment() {
      if (vm.form.commentForm.comment === '') { return; }

      vm.article.addComment(article._id, {
        body: vm.form.commentForm.comment
      })
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        console.log('success');
        vm.article.comments.push(res.data);
        vm.form.commentForm.comment = '';
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Comment added successfully!' });
      }

      function errorCallback(res) {
        console.log('fail');
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error saving comment!' });
      }
    }

  }
}());
