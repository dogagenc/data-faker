var fs = require('fs');
var lorem = require('lorem-ipsum');


var fileToArray = function(path) {
	var array = fs.readFileSync(path).toString().split(',');
	return array;
};

var randomProperty = function (obj) {
    var keys = Object.keys(obj);

    return keys[Math.floor(Math.random() * keys.length)];
};

var randomArrayItem = function(array) {
	return array[Math.floor(Math.random() * array.length)];
}

var randomArrayIndex = function(array) {
	return Math.floor(Math.random() * array.length);
}

var randomDate = function() {
	var start = new Date(2014,1,1,10,30,30,0);
	var end = new Date(2015,1,1,10,30,30,0);

	var date = new Date(+start + Math.random() * (end - start));
	var hour = Math.random() * 23 | 0;
	date.setHours(hour);
	return date;
}


var isArray = function(obj) {
	return Object.prototype.toString.call(obj).indexOf('Array') > -1; 
};

var transformArray = function(array) {
	var objSchema = array[0];
	var count = array[1];

	var newArray = [];

	for (var i = 0; i < count; i++) {
		var newObject = {};

		for ( schemaKey in objSchema) {
			if(objSchema.hasOwnProperty(schemaKey)) {
				if(dataFaker[objSchema[schemaKey]] !== undefined) {
					if(objSchema[schemaKey] == 'eMail') {
						newObject[schemaKey] = dataFaker[objSchema[schemaKey]](newObject);
					}
					else {
						newObject[schemaKey] = dataFaker[objSchema[schemaKey]](count);	
					}								
				}
				else {
					if ( isArray(objSchema[schemaKey]) ) {
						newObject[schemaKey] = transformArray(objSchema[schemaKey]);
					}
					//Check if its lorem
					else if(objSchema[schemaKey].toString().indexOf('lorem') == 0) {
						newObject[schemaKey] = dataFaker.lorem(objSchema[schemaKey]);
					}
					else {
						newObject[schemaKey] = objSchema[schemaKey];	
					}
				}
			}
		}
		newArray.push(newObject);
	}
	return newArray;
};

var objectKeys = function (obj) {
	//Check if schema argument is not array (object)
	if(!isArray(obj)) {
		Object.keys(obj).forEach(function (key) {
	   		if(typeof obj[key] == "object") {
	   			if(isArray(obj[key])) { 
	   				obj[key] = transformArray(obj[key]);
	   			}
	   		}
		});
		return obj;
	}
	else {
		return transformArray(obj);
	}
};

var dataFaker = {
	names: {
		female: fileToArray('./lib/female.txt'),
		male: fileToArray('./lib/male.txt')
	},
	surnames: fileToArray('./lib/surnames.txt'),
	createUsers: function(count) {
		var adjectives = fileToArray('./lib/adjectives.txt'),
			nouns = fileToArray('./lib/nouns.txt'),
			userNames = [];

		for (var i = 0; i < count; i++) {
			var item = randomArrayItem(adjectives) + '_' + randomArrayItem(nouns);

			userNames.push(item);
		};

		this.userNames = userNames;
	},
	gender: function () {
		if(! this.gender.gender) {
			this.firstName();
		}
		return this.gender.gender;	
	},
	firstName: function() {
		var gender = randomProperty(this.names);
		this.gender.gender = gender;

		var index = Math.floor(Math.random() * this.names[gender].length);
		var firstName = this.names[gender][index];

		return firstName;
	},
	lastName: function() {
		return randomArrayItem(this.surnames);
	},
	userName: function(count) {
		//if datafaker.userNames already generated, then pick one
		if( this.userNames && this.userNames.length > 0) {
			var index = randomArrayIndex(this.userNames),
				userName = this.userNames[index];

			this.userNames.splice(index, 1);
			return userName;	
		}
		// if datafaker.userNames doesn't exist, generate it and return a username
		else {
			this.createUsers(count);

			return this.userName();
		}
	},
	eMail: function(objSchema) {
		if(objSchema.userName) return objSchema.userName + '@example.com';
		else return 'no_username@example.com'
	},
	date: function() {
		return randomDate();
	},
	lorem: function(loremString) {
		var count = loremString.split('-')[1];
		return lorem({
			count: count,
			units: 'words'
		});
	},
	schema: function(mainObject) {
		return objectKeys(mainObject);
	},
	set: function() {
		var propName = arguments[0],
			array = arguments[1],
			unique, range;
		if(arguments.length === 3) {
			var unique = arguments[2].unique;
			var range = arguments[2].range;		
		}

		this[propName] = function() {
			var innerArray = array;

			if(range) {
				var min = innerArray[0],
					max = innerArray[1];
				var fakeArray = [];
				for (var i = min; i < max + 1; i++) {
					fakeArray.push(i);
				}
				innerArray = fakeArray;
			}
			var index = randomArrayIndex(innerArray);
			var item = innerArray[index];
			if(unique) {
				innerArray.splice(index, 1);
			}
			return item;
		}
	}
};


module.exports = dataFaker;