const contentSection = document.querySelector(".content-section")
const contentLabel = document.querySelector(".content-label")
const contentItems = document.querySelectorAll(".content-item")
const contentButton = document.querySelector(".content-button")
const inputButton = document.createElement("button")
inputButton.className = "input-button"
inputButton.innerHTML = "+"
let contentFlip = 0



let inputCount = 0

const addInput = () => {
		inputButton.insertAdjacentHTML("beforebegin", `
				<div class="input-wrapper">
						<label for="user_id${inputCount}">Student${inputCount + 1} ID:</label>
						<input class="content-input" id="user_id${inputCount}" type="text"></input>
				<br/>
						<label for="username${inputCount}">Student${inputCount + 1} Name:</label>
						<input class="content-input" id="username${inputCount}" type="text"></input>
				</div>
				`)
		inputCount++
}

inputButton.onclick = addInput

function formatContent() {
		for (var i = 0; i < localStorage.length; i++) {
				let item = JSON.parse(localStorage.getItem(localStorage.key(i)))
				if (!item.hasOwnProperty("class_list")) continue
				let formatedItem = document.createElement("a")
				let formatedElement1 = document.createElement("span")
				let formatedElement2 = document.createElement("span")
				let formatedElement3 = document.createElement("span")
				formatedItem.className = "content-item"
				formatedElement1.className = "content-element"
				formatedElement2.className = "content-element"
				formatedElement3.className = "content-element"
				formatedElement1.innerHTML = item.course
				formatedElement2.innerHTML = item.group_number
				formatedElement3.innerHTML = item.class_list.length
				formatedItem.append(formatedElement1)
				formatedItem.append(formatedElement2)
				formatedItem.append(formatedElement3)
				contentSection.append(formatedItem)
				formatedItem.onclick = () => {
						contentSection.innerHTML = ""
						contentSection.classList.add("show-content")
						formatedElement1.innerHTML = "Course: " + formatedElement1.innerHTML
						formatedElement2.innerHTML = "Group Number: " + formatedElement2.innerHTML
						contentSection.append(formatedElement1)
						contentSection.append(formatedElement2)
						item.class_list.forEach(user => {
								let formatedElement1 = document.createElement("span")
								let formatedElement2 = document.createElement("span")
								let formatedElement3 = document.createElement("span")
								formatedElement1.className = "content-element"
								formatedElement2.className = "content-element"
								formatedElement3.className = "content-element"
								formatedElement1.innerHTML = "User ID: " + user.user_id
								formatedElement2.innerHTML = "Name: " + user.username
								formatedElement3.innerHTML = "GPA: " + user.gpa
								contentSection.append(document.createElement("br"))
								contentSection.append(formatedElement1)
								contentSection.append(formatedElement2)
								contentSection.append(formatedElement3)
						})
						contentButton.innerHTML = "Return to Menu"
						contentButton.onclick = () => {
								contentSection.innerHTML = ""
								contentSection.classList.remove("show-content")
								contentSection.append(contentLabel)
								contentButton.onclick = contentFlipper
								contentButton.innerHTML = "Add Class"
								formatContent()
						}
				}
//				contentSection.insertAdjacentHTML("beforeend", `
//						<a class="content-item">
//								<span class="content-element">
//										${item.course}
//								</span>
//								<span class="content-element">
//										${item.title}
//								</span>
//						</a>
//						`)
		}
}

const addContent = () => {
		inputCount = 0
		contentSection.innerHTML = ""
		contentSection.classList.add("form-section")
		contentSection.insertAdjacentHTML("beforeend", `
				<label for="course">Course Code: </label>
				<input class="input-label" type="text" id="course"/>
				<label for="group-number">Group Number: </label>
				<input class="input-label" type="text" id="group-number"/>
				`)
		contentSection.append(inputButton)
}

const submitContent = () => {
		let label1 = document.querySelector("#course")
		let label2 = document.querySelector("#group-number")
		let classList = []
		for (var i = 0; i < inputCount; i++) {
				let element1 = document.querySelector(`#username${i}`)
				classList.push({username:element1.value})
		}
		localStorage.setItem(label2.value, JSON.stringify({"course":label1.value, "group_number":label2.value, "class_list":classList}))
		localStorage.removeItem("")

		contentSection.innerHTML = ""
		contentSection.classList.remove("form-section")
		contentSection.append(contentLabel)
		contentItems.forEach(item => {
				contentSection.append(item)
		})
				
		formatContent()
}

async function initialize(){
	await fetch("https://shanemansueto.github.io/web_dev_class/resources/placeholder_classes.json")
	.then(res => res.json())
	.then(json => {
			console.log(json)
			json.forEach(item => {
					console.log(item)
					localStorage.setItem(item.group_number, JSON.stringify(item))
			})
	})
	formatContent()
}
initialize()
const contentFlipper = () => {
		if (contentFlip) {
				submitContent()
				contentButton.innerHTML = "Add Class"
		}
		else {
				addContent()
				contentButton.innerHTML = "Submit Class"
		}
		contentFlip = !contentFlip
}

contentButton.onclick = contentFlipper
