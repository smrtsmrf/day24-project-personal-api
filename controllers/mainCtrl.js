me = require('../models/me');
skills = require('../models/skills')
secrets = require('../models/secrets')


module.exports = {
	getName: function (req, res, next) {
		res.status(200).json({'name': me.name});
	}, 

	getLocation: function (req, res, next) {
		res.status(200).json({'location': me.location});
	}, 

	getOccupations: function (req, res, next) {
		switch (req.query.order) {
			case 'asc':
				var occupations = me.occupations.sort();
				break;
			case 'desc':
				var occupations = me.occupations.reverse();
				break;
			default:
				var occupations = me.occupations;
				break;
		}

		switch (req.query.name) {
			case 'missionary':
				var nameQueriedOccupations = 'missionary';
				break;
			case 'teacher':
				var nameQueriedOccupations = 'teacher';
				break;
			case 'student':
				var nameQueriedOccupations = 'student';
				break;	
			default:
				var nameQueriedOccupations = occupations;
				break;
		}

		res.status(200).json({'occupations': nameQueriedOccupations})
		
	}, 

	getLatestOccupation: function (req, res, next) {
		res.status(200).json({'latestOccupation': me.occupations[me.occupations.length-1]});
	}, 

	getHobbies: function (req, res, next) {
		var name = req.query.name;
		var result = name ? me.hobbies.filter(function(hobby) {
			return hobby.name === name;
		}) : me.hobbies
		res.status(200).json({'hobbies': result});
	}, 

	getHobbiesOfType: function (req, res, next) {
		var type = req.params.id;
		var results = me.hobbies.filter(function(hobby) {
			return hobby.type === type;
		});
		res.status(200).json({'hobbies': results});
	}, 


	changeName: function (req, res, next) {
		me.name = req.body.name;
		res.status(200).json({'name': me.name});
	}, 

	changeLocation: function (req, res, next) {
		me.location = req.body.location;
		res.status(200).json({'location': me.location});
	}, 

	addHobby: function (req, res, next) {
		me.hobbies.push({'name' : req.body.name, 'type': req.body.type});
		res.status(200).json({'hobbies': me.hobbies});
	}, 

	addOccupation: function (req, res, next) {
		me.occupations.push(req.body.name);
		res.status(200).json({'occupations': me.occupations});
	}, 

	getSkills: function (req, res, next) {
		var exp = req.query.experience;
		var result = exp ? skills.filter(function(skill) {
			return skill.experience === exp;
		}) : skills;
		res.status(200).json(result);
	}, 

	getSkillWithName: function (req, res, next) {
		var name = req.params.name;
		var results = skills.filter(function(skill) {
			return skill.name === name;
		});
		res.status(200).json(results);
	}, 

	addSkill: function (req, res, next) {
		skills.push({'id': req.body.id, 'name': req.body.name, 'experience': req.body.experience});
    		res.status(200).json(skills);
	}, 

	getSecrets: function (req, res, next) {
		res.status(200).json(secrets);
	}
}