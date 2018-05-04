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
            .controller('ActionCtrl', function ($scope, SharedService) {
                  $scope.actions = ['+'];
                  $scope.$on('getActionData', function() {
                        console.log('Data: ', SharedService.message )
                        $scope.actions.push( SharedService.message );
                  });
            })
            .controller('TodoCtrl', function ($scope, $stateParams, SharedService) {
                  $scope.addTodo = ()=>{
                        // console.log('Add todo Text: ', $scope.todotext );
                        SharedService.prepForBroadcast( $scope.todotext );
                  };
                  
            })
            .factory('SharedService', function($rootScope) {
                  const sharedService = {};
                  sharedService.message = null;
                  sharedService.prepForBroadcast = function(msg) {
                        this.message = msg;
                        this.broadcastItem();
                  };
                  
                  sharedService.broadcastItem = function() {
                        $rootScope.$broadcast('getActionData');
                  };
            
                  return sharedService;
            })
            .component('topHeader', {
                  bindings: {},
                  controller: [function() {
                        this.buttonList = [{
                                                label: "Home",
                                                navigate: "index"
                                          },
                                          {
                                                label: "List",
                                                navigate: "list"
                                          },
                                          {
                                                label: "Todo",
                                                navigate: "todo"
                                          }];
                  }],
                  templateUrl: 'components/top-header.html'
            })
})();
