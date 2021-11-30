const todoContainer = document.querySelector('.todo')
const todoInput = document.querySelector('.todo-input')
const addTask = document.querySelector('.todo-add')
const taskList = document.querySelector('.task-list')

const taskDone = document.querySelector('.done-btn')
const taskDelete = document.querySelector('.delete-btn')

addTask.addEventListener('click', function() {
    if (todoInput.value) {
        let taskContainer = document.createElement('div')
        taskContainer.className = 'task-container'

        let doneBtn = document.createElement('div')
        doneBtn.className = 'done-btn'

        doneBtn.addEventListener('click', function() {
            this.parentElement.children[1].classList.add('done')
        })


        let taskText = document.createElement('div')
        taskText.className = 'task-inner'
        taskText.innerHTML = todoInput.value


        let deleteBtn = document.createElement('div')
        deleteBtn.className = 'delete-btn'

        deleteBtn.addEventListener('click', function() {
            this.parentElement.remove()
        })

        taskContainer.append(doneBtn, taskText, deleteBtn)

        taskList.append(taskContainer)
        todoInput.value = ''
    }
})