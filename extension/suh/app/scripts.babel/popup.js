'use strict';

document.addEventListener('DOMContentLoaded', function () {
	var neural_network;
	var input = document.getElementById('input');
	var grade = document.getElementById('grade');
	var train = document.getElementById('train');

	var tokenInput = document.getElementById('token');
	var deleteToken = document.getElementById('delete');
	var persistToken = document.getElementById('persist');

	persistToken.addEventListener('click', function () {
		chrome.storage.sync.set({ 'canvas_nn_token': '11224~b12O1BOviSqZaqAzrksZqiPas39zaihNyoHJNw8lu7ufYU5rIx24LlV9KwaMxxMr' });
		console.log('Token persisted');
	});
	deleteToken.addEventListener('click', function () {
		chrome.storage.sync.set({ 'canvas_nn_token': null });
		console.log('Token deleted');
	});

	chrome.storage.sync.get('canvas_nn_json', function (data) {
		neural_network = data['canvas_nn_json'];
		//neural_network = data['canvas_nn_json'].fromJSON();
	});

	function trainFunc() {
		chrome.tabs.getSelected(null, function (tab) {
			var tablink = tab.url;
			if (!tablink.includes('canvas.ubc.ca/courses')) {
				return;
			}
			var url_parts = tablink.split('/');
			var course_id_index = url_parts.indexOf('courses') + 1;
			var course_id = url_parts[course_id_index];

			chrome.storage.sync.get('canvas_nn_token', function (data) {
				var token = data['canvas_nn_token'];
				console.log('Bearer ' + token);
				fetch('https://canvas.ubc.ca/api/v1/courses/', {
					method: 'GET', 
					headers: {'Authorization': 'Bearer ' + data['canvas_nn_token']}
				}).then(function(resp) {
					console.log(resp);
					return resp.json();
				}).then(function(jsn) {
					console.log('oh');
				});
			});
		});
	}

	function gradeFunc() {
		console.log('graded');
		console.log(input.value);
	}

	train.addEventListener('click', trainFunc);
	grade.addEventListener('click', gradeFunc);
});