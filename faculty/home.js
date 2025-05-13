let classes = 0
let students = 0
let resources = 0
let formatedElement1 = document.createElement("span")
for (var i = 0; i < localStorage.length; i++) {
		let item = JSON.parse(localStorage.getItem(localStorage.key(i)))
		if (item.hasOwnProperty("problems")) resources++
		if (item.hasOwnProperty("class_list")) {
				classes++
				students += item.class_list.length
		}
}

const classHolder = document.querySelector("#classes")
const studentHolder = document.querySelector("#students")
const resourceHolder = document.querySelector("#resources")

classHolder.innerHTML = classes
studentHolder.innerHTML = students
resourceHolder.innerHTML = resources
