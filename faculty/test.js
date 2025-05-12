const contentSection = document.querySelector(".content-section")
const contentLabel = document.querySelector(".content-label")
const contentItems = document.querySelectorAll(".content-item")
const contentButton = document.querySelector(".content-button")
const inputButton = document.createElement("button")
inputButton.className = "input-button"
inputButton.innerHTML = "+"
let contentFlip = 0

fetch("https://shanemansueto.github.io/web_dev_class/resources/placeholder_questionares.json")
.then(res => res.json())
.then(json => {
		json.forEach(item => {
				localStorage.setItem(item.title, JSON.stringify(item))
		})
})

let inputCount = 0

const addInput = () => {
		inputButton.insertAdjacentHTML("beforebegin", `
				<div class="input-wrapper">
						<label for="question${inputCount}">Q${inputCount + 1}</label>
						<br/>
						<br/>
						<textarea class="content-input question" id="question${inputCount}" type="text"></textarea>
						<br/>
						<label for="answer${inputCount}">answer: </label>
						<input class="content-input answer" id="answer${inputCount}" type="text"/>
				</div>
				`)
		inputCount++
}

inputButton.onclick = addInput

const formatContent = () => {
		for (var i = 0; i < localStorage.length; i++) {
				let item = JSON.parse(localStorage.getItem(localStorage.key(i)))
				let formatedItem = document.createElement("a")
				let formatedElement1 = document.createElement("span")
				let formatedElement2 = document.createElement("span")
				formatedItem.className = "content-item"
				formatedElement1.className = "content-element"
				formatedElement2.className = "content-element"
				formatedElement1.innerHTML = item.course
				formatedElement2.innerHTML = item.title
				formatedItem.append(formatedElement1)
				formatedItem.append(formatedElement2)
				contentSection.append(formatedItem)
				formatedItem.onclick = () => {
						contentSection.innerHTML = ""
						contentSection.classList.add("show-content")
						formatedElement1.innerHTML = "Course: " + formatedElement1.innerHTML
						formatedElement2.innerHTML = "Title: " + formatedElement2.innerHTML
						contentSection.append(formatedElement1)
						contentSection.append(formatedElement2)
						item.problems.forEach(problem => {
								let formatedElement1 = document.createElement("span")
								let formatedElement2 = document.createElement("span")
								formatedElement1.className = "content-element"
								formatedElement2.className = "content-element"
								formatedElement1.innerHTML = problem.question
								formatedElement2.innerHTML = problem.answer
								formatedElement2.style = "color:red"
								contentSection.append(formatedElement1)
								contentSection.append(formatedElement2)
						})
						contentButton.innerHTML = "Return to Menu"
						contentButton.onclick = () => {
								contentSection.innerHTML = ""
								contentSection.classList.remove("show-content")
								contentSection.append(contentLabel)
								contentButton.onclick = contentFlipper
								contentButton.innerHTML = "Add Content"
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
				<label for="title">Title: </label>
				<input class="input-label" type="text" id="title"/>
				`)
		contentSection.append(inputButton)
		addInput()
		addInput()
		addInput()
}

const submitContent = () => {
		let label1 = document.querySelector("#course")
		let label2 = document.querySelector("#title")
		let problems = []
		for (var i = 0; i < inputCount; i++) {
				let element1 = document.querySelector(`#question${i}`)
				let element2 = document.querySelector(`#answer${i}`)
				problems.push({question:element1.value,answer:element2.value})
		}
		localStorage.setItem(label2.value, JSON.stringify({"course":label1.value, "title":label2.value, "problems":problems}))
		localStorage.removeItem("")

		contentSection.innerHTML = ""
		contentSection.classList.remove("form-section")
		contentSection.append(contentLabel)
		contentItems.forEach(item => {
				contentSection.append(item)
		})
				
		formatContent()
}

formatContent()

const contentFlipper = () => {
		if (contentFlip) {
				submitContent()
				contentButton.innerHTML = "Add Content"
		}
		else {
				addContent()
				contentButton.innerHTML = "Submit Content"
		}
		contentFlip = !contentFlip
}

contentButton.onclick = contentFlipper
