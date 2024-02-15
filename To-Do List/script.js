const checkboxs = document.querySelectorAll('.checkbox__input')
const listContainer = document.getElementById('list')

// Function to add line through functionality
function addCheckFunctionality(checkbox) {
    checkbox.addEventListener('change', () => {
        // get todo text
        var todoTextId = checkbox.dataset.list
        var todoText = document.getElementById(todoTextId)
        // if checked, strike through todo item
        if (checkbox.checked) {
            todoText.classList.add('checked')
        }
        // if unchecked, remove the stikethrough
        else{
            todoText.classList.remove('checked')
        }
    })
}

// Function to delete to-do item
function addDeleteFunctionality(closeIcon) {
    closeIcon.addEventListener('click', () => {
        // get todo item
        var todoId = closeIcon.dataset.list
        var todoItem = document.getElementById(todoId)
        // Remove todo item
        todoItem.remove();
    })
}

// Fuction to create a todo item template
function createTodoItemTemplate(index, text) {
    var todoItem = document.createElement('div')
    todoItem.className = 'flex gap-x-4 items-center'
    todoItem.id = 'todo' + index

    var label = document.createElement('label')
    label.className = 'relative overflow-hidden'

    var checkbox = document.createElement('input')
    checkbox.className = 'checkbox__input'
    checkbox.type = 'checkbox'
    checkbox.setAttribute('data-list', 'todo' + index + 'Text')

    var checkboxInner = document.createElement('span')
    checkboxInner.className = 'checkbox__inner'

    label.appendChild(checkbox)
    label.appendChild(checkboxInner)

    var todoText = document.createElement('p')
    todoText.className = 'text-lg truncate font-light text-stone-900 inline-block flex-grow'
    todoText.id = 'todo' + index + 'Text'
    todoText.textContent = text

    var closeIcon = document.createElement('span')
    closeIcon.className = 'material-symbols-outlined cursor-pointer'
    closeIcon.setAttribute('data-list', 'todo' + index)
    closeIcon.textContent = 'close'

    todoItem.appendChild(label)
    todoItem.appendChild(todoText)
    todoItem.appendChild(closeIcon)

    addCheckFunctionality(checkbox)
    addDeleteFunctionality(closeIcon)

    return todoItem
}

// Function to populate the list with items
function populateList(items) {
    items.forEach((item, index) => {
        var todoItem = createTodoItemTemplate(index + 1, item);
        listContainer.appendChild(todoItem)
    })
}

// Function to save todos to localstorage
function saveListToLocalStorage(items) {
    localStorage.setItem('todoItems', JSON.stringify(items));
}

// Function to retrive the todos from localStorage
function getListFromLocalStorage() {
    var storedList = localStorage.getItem('todoItems')
    return storedList ? JSON.parse(storedList) : []
}

// get items from localStorage
const todoItems = getListFromLocalStorage();

// Populate list
populateList(todoItems)


// Capture form submition
const addTodoForm = document.getElementById('addTodoForm')

addTodoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let newTodo = document.getElementById('newTodo')

    if (newTodo.value != ""){
        // and new todo to list
        todoItems.push(newTodo.value)
        // add item to list
        var todoItem = createTodoItemTemplate(todoItems.length, newTodo.value);
        listContainer.appendChild(todoItem)
        saveListToLocalStorage(todoItems)
    }
    newTodo.value = ''
})