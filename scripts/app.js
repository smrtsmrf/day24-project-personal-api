angular.module('apiApp', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/', 
		templateUrl: '/views/home.html', 
		resolve: {
			nameData: function (service) {
				return service.getWhat('name').then(function (response) {
					return response.name;
				})
			}, 
			locationData: function (service) {
				return service.getWhat('location').then(function (response) {
					return response.location;
				})
			}
		}, 
		controller: function ($scope, service, nameData, locationData, $state) {
			$scope.name = nameData;
			$scope.location = locationData;
			
			$scope.putWhat = function (endpoint, value) {
				service.putWhat(endpoint,value).then(function () {
					 service.getWhat(endpoint).then(function (response) {
					 	 $scope[endpoint] = response[endpoint];
					 	 $scope.newName = '';
					 	 $scope.newLoc = '';
					 })
				})
			}
		}
	})

	.state('me', {
		url: '/me',
		templateUrl: '/views/me.html', 
		resolve: {
			hobbiesData: function (service) {
				return service.getWhat('hobbies').then(function (response) {
					return response.hobbies;
				})
			}, 
			occupationsData: function (service) {
				return service.getWhat('occupations').then(function (response) {
					return response.occupations;
				})
			}
		}, 
		controller: function ($scope, service, hobbiesData, occupationsData) {
			$scope.type = 'current';
			$scope.hobbies = hobbiesData;
			$scope.occupations = occupationsData;

			$scope.postWhat = function (endpoint, value, type) {
				service.postWhat(endpoint,value, type).then(function () {
					 service.getWhat(endpoint).then(function (response) {
					 	 $scope[endpoint] = response[endpoint];
					 	 $scope.newHobby = '';
					 	 $scope.newOccupation = '';
					 })
				})
			}
		}
	})

	.state('skills', {
		url: '/skills', 
		templateUrl: '/views/skills.html', 
		resolve: {
			skillsData: function (service) {
				return service.getWhat('skills')
			}
		}, 
		controller: function ($scope, service, skillsData) {
			$scope.experience = 'Noob';
			$scope.skills = skillsData;

			$scope.postWhat = function (endpoint, value,experience) {
				service.postWhat(endpoint,value,null,experience).then(function () {
					 service.getWhat(endpoint).then(function (response) {
					 	 $scope[endpoint] = response;
					 	 console.log(response);
					 	 $scope.newSkill = '';
					 })
				})
			}
		}
	})


	$urlRouterProvider.otherwise('/');
}])