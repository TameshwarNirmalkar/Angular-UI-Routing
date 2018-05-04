(function () {
      angular.module('MyApp', ['ui.router'])
            .config(function ($stateProvider, $urlRouterProvider) {

                  $urlRouterProvider.otherwise('list');

                  $stateProvider
                        .state('index', {
                              abstract: true,
                              //url: '/',
                              views: {
                                    '@': {
                                          templateUrl: './views/layout.html',
                                          controller: 'IndexCtrl'
                                    },
                                    'top@index': {
                                          templateUrl: './views/tpl.top.html',
                                    },
                                    'left@index': {
                                       templateUrl: './views/tpl.left.html',
                                    },
                                    'main@index': {
                                          templateUrl: './views/tpl.main.html',
                                    },
                              },
                        })
                        .state('list', {
                              parent: 'index',
                              url: '/list',
                              templateUrl: './views/list.html',
                              controller: 'ListCtrl'
                        })
                        .state('list.detail', {
                              url: '/:id',
                              views: {
                                    'detail@index': {
                                          templateUrl: './views/detail.html',
                                          controller: 'DetailCtrl'
                                    },
                                    // 'actions@index': {
                                    //       templateUrl: './views/actions.html',
                                    //       controller: 'ActionCtrl'
                                    // },
                              },
                        })
                        .state('todo', {
                              parent: 'list',
                              url: '/todo',
                              views: {
                                    'detail@index': {
                                          templateUrl: './views/todo.html',
                                          controller: 'TodoCtrl'
                                    },
                                    'actions@index': {
                                          templateUrl: './views/actions.html',
                                          controller: 'ActionCtrl'
                                    },
                              },
                        })
            })
            .controller('IndexCtrl', function () {})
            .controller('ListCtrl', function () {})
            .controller('DetailCtrl', function ($scope, $stateParams) {
                  $scope.id = $stateParams.id;
            })
            .controller('ActionCtrl', function ($scope, $rootScope) {
                  $scope.actions = ['+'];
                  $rootScope.$on('getActionData', function(event, data) {
                        console.log('Data: ', data )
                        $scope.actions.push( data );
                  });
            })
            .controller('TodoCtrl', function ($scope, $stateParams, $rootScope) {
                  $scope.addTodo = ()=>{
                        console.log('Add todo Text: ', $scope.todotext );
                        $rootScope.$broadcast('getActionData', $scope.todotext);
                  };
                  
            })
})();