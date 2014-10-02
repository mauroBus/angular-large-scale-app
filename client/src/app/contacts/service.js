angular.module('contacts.service', [
  'utils.service'
])

// A RESTful factory for retrieving contacts from 'contacts.json'
.factory('contacts', ['$http', function($http, utils) {
  var path = 'mocks/contacts.json';

  // var contacts = $http.get(path).then(function(resp) {
  //   return resp.data.contacts;
  // });

  var contacts = [
    {
      "id": 1,
      "name": "Alice",
      "items": [
        {
          "id": "a",
          "type": "phone number",
          "value": "555-1234-1234"
        },
        {
          "id": "b",
          "type": "email",
          "value": "alice@mailinator.com"
        }
      ]
    },
    {
      "id": 42,
      "name": "Bob",
      "items": [
        {
          "id": "a",
          "type": "blog",
          "value": "http://bob.blogger.com"
        },
        {
          "id": "b",
          "type": "fax",
          "value": "555-999-9999"
        }
      ]
    },
    {
      "id": 123,
      "name": "Eve",
      "items": [
        {
          "id": "a",
          "type": "full name",
          "value": "Eve Adamsdottir"
        }
      ]
    }
  ];

  var factory = {
    all: function() {
      return contacts;
    },

    get: function(id) {
      // return contacts.then(function() {
        return utils.findById(contacts, id);
      // });
    }
  };

  return factory;
}]);
