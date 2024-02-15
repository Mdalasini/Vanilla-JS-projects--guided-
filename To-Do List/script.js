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
        var todoIdNumber = parseInt(todoId.substring(4), 10)
        // Remove todo item from HTML
        todoItem.remove()
        // Remove todo from LocalStorage
        todoItems.removeValue(todoIdNumber)
        saveListToLocalStorage(todoItems.getAllValues())
    })
}

// Fuction to create a todo item template
function createTodoItemTemplate(id, text) {
    var todoItem = document.createElement('div')
    todoItem.className = 'flex gap-x-4 items-center'
    todoItem.id = 'todo' + id

    var label = document.createElement('label')
    label.className = 'relative overflow-hidden'

    var checkbox = document.createElement('input')
    checkbox.className = 'checkbox__input'
    checkbox.type = 'checkbox'
    checkbox.setAttribute('data-list', 'todo' + id + 'Text')

    var checkboxInner = document.createElement('span')
    checkboxInner.className = 'checkbox__inner'

    label.appendChild(checkbox)
    label.appendChild(checkboxInner)

    var todoText = document.createElement('p')
    todoText.className = 'text-lg truncate font-light text-stone-900 inline-block flex-grow'
    todoText.id = 'todo' + id + 'Text'
    todoText.textContent = text

    var closeIcon = document.createElement('span')
    closeIcon.className = 'material-symbols-outlined cursor-pointer'
    closeIcon.setAttribute('data-list', 'todo' + id)
    closeIcon.textContent = 'close'

    todoItem.appendChild(label)
    todoItem.appendChild(todoText)
    todoItem.appendChild(closeIcon)

    addCheckFunctionality(checkbox)
    addDeleteFunctionality(closeIcon)

    return todoItem
}

// Function to populate the list with items
function populateList(dict) {
    dict.getAllKeyValuePairs().forEach((pair) => {
        var id = pair.key
        var value = pair.value
        var todoItem = createTodoItemTemplate(id, value);
        listContainer.appendChild(todoItem)
    })
}

// Function to save todos to localstorage
function saveListToLocalStorage(list) {
    localStorage.setItem('todoItems', JSON.stringify(list));
}

// Function to retrive the todos from localStorage
function getListFromLocalStorage() {
    var storedList = localStorage.getItem('todoItems')
    var dictionary = createDictionary()
    if (storedList) {
        var list = JSON.parse(storedList)
        for (const value of list){
            dictionary.addValue(value)
        }
    }
    return dictionary
}

// get items from localStorage
const todoItems = getListFromLocalStorage()

// Function to create a dict that stores the todoItems
function createDictionary () {
    const dictionary = {}
    let nextId = 1

    // Function to add a value to the dictionary with automatically generated ID
    function addValue(value) {
        const id = nextId++
        dictionary[id] = value;
        return id;
    }

    // Function to get the value from the dictionary based on the ID
    function getValue(id) {
        return dictionary[id];
    }

    // Funtion to remove a value from the dictionary based on the ID
    function removeValue(id) {
        if (dictionary.hasOwnProperty(id)) {
            delete dictionary[id]
            return true;
        }
        return false;
    }

    function getAllKeyValuePairs() {
        const keyValuePairs = []
        for (const key in dictionary) {
            if (dictionary.hasOwnProperty(key)) {
                keyValuePairs.push({key, value: dictionary[key]})
            }
        }
        return keyValuePairs
    }

    function getAllValues() {
        const values = []
        for (const key in dictionary) {
            if (dictionary.hasOwnProperty(key)){
                values.push(dictionary[key])
            }            
        }
        return values
    }

    return {
        addValue,
        getValue,
        removeValue,
        getAllKeyValuePairs,
        getAllValues,
    }
}

// Populate list on load
populateList(todoItems)


// Capture form submition
const addTodoForm = document.getElementById('addTodoForm')

addTodoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let newTodo = document.getElementById('newTodo')

    if (newTodo.value != ""){ // if newTodo not empty string
        // and new todo to list
        var id = todoItems.addValue(newTodo.value)
        // add item to list
        var todoItem = createTodoItemTemplate(id, todoItems.getValue(id));
        // Add to ui
        listContainer.appendChild(todoItem)
        saveListToLocalStorage(todoItems.getAllValues())
    }
    newTodo.value = ''
})