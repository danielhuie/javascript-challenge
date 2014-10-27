/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

document.addEventListener('DOMContentLoaded', onReady);

var signupForm = document.getElementById('signup');

function onReady() {
	populateStates();

	document.getElementById('occupation').addEventListener('change', function() {
		var occupation = signupForm.elements['occupation'].value;
		var optionOther = signupForm.elements['occupationOther'];
		if (occupation == 'other'){
			optionOther.style.display = 'block';
		} else {
			optionOther.style.display = 'none';
		}
	});

	document.getElementById('cancelButton').addEventListener('click', function() {
		if (window.confirm('Are you sure you want to leave this page?')) {
			window.location = "http://www.google.com";
		}
	});

	document.getElementById('signup').addEventListener('submit', onSubmit);
}

var isValid = true;

function populateStates() {
	var stateSelect = signupForm.elements['state'];
	var stateOption;
	var i;

	for (i = 0; i < usStates.length; i++) {
		stateOption = document.createElement('option');
		stateOption.innerHTML = usStates[i].name;
		stateOption.value = usStates[i].code;
		stateSelect.appendChild(stateOption);
	}
}

function onSubmit(eventObject) {
	try {
		isValid = validateForm(this);
	} catch(exception) {
		console.log(exception);
		isValid = false;
	}

	if (!isValid && eventObject.preventDefault) {
		eventObject.preventDefault();
	}

	eventObject.returnValue = isValid;
	return eventObject.returnValue;
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];

	if (signupForm.elements['occupation'].value == 'other') {
		requiredFields.push('occupationOther');
	}
    
    var i;
    for (i = 0; i < requiredFields.length; i++) {
        isValid &= validateRequiredField(signupForm.elements[requiredFields[i]]);
    }

    isValid &= validateZip(signupForm.elements['zip']);
    isValid &= validateBirthdate(signupForm.elements['birthdate']);
    return isValid;
} //validateForm()


function validateZip(zip) {
	var zipRegExp = new RegExp('^\\d{5}$');
	var isZipValid = zipRegExp.test(zip.value);
	validateRequiredField(zip);
	if (!isZipValid) {
		zip.className = 'form-control invalid-field';
	}
	return isZipValid;
}

function validateBirthdate(birthday) {
	var birthdateElem = document.getElementById('birthdateMessage');
	var today = new Date();
    var dateOfBirth = new Date(birthday.value);
    var yearsDiff = today.getFullYear() - dateOfBirth.getUTCFullYear();
    var monthsDiff = today.getMonth() - dateOfBirth.getUTCMonth();
    var daysDiff = today.getDate() - dateOfBirth.getUTCDate();

    if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) { 
        yearsDiff--;
    }
    var DOBisValid = false;

    if (yearsDiff >= 13) {
    	DOBisValid = true;
    	birthdateElem.style.display = 'none';
    } else {
    	birthdateElem.innerHTML = 'You must be at least 13 years old to sign up.';
    }
    validateRequiredField(birthdate);
    return DOBisValid;
}

function validateRequiredField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;

    if (valid) {
        field.className = 'form-control';
        return true;
    } else {
        field.className = 'form-control invalid-field';
        return false;
    }
} //validateRequiredField()