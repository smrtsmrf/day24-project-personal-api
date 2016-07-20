angular.module('apiApp').service('service', ['$http', function ($http) {

	this.getWhat = function (endpoint) {
		return $http.get('http://localhost:3000/' + endpoint).then(function (response) {
			return response.data;
		});
	}

	this.putWhat = function(endpoint, value) {
		data = {};
		data[endpoint] = value;
		return $http.put('http://localhost:3000/' + endpoint, data)
	}

	this.postWhat= function(endpoint, value, type, experience) {
		data = {};
		switch (endpoint) {
			case 'hobbies':
				data.name = value;
				data.type = type;
				break;
			case 'occupations':
				data.name = value;
				break;	
			case 'skills':
				data.name = value;
				data.experience = experience;
				break;	
			default:
				break;
		}
		return $http.post('http://localhost:3000/' + endpoint, data)
	}
}])