// Toggles a class on an element
function toggleClass(element, className) {
	if (element.classList.contains(className)) {
		element.classList.remove(className);
	} else {
		element.classList.add(className);
	}
}

// Adds a class to an element
function addClass(element, className) {
	element.classList.add(className);
}

// Removes a class from an element
function removeClass(element, className) {
	element.classList.remove(className);
}

// Get Element by ID
function getById(id) {
	return document.getElementById(id);
}

// Get Element by Class
function getByClass(className) {
	return document.getElementsByClassName(className);
}

// Get Element by Tag
function getByTag(tagName) {
	return document.getElementsByTagName(tagName);
}
