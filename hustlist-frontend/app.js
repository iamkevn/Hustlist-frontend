


const form = document.querySelector('form')
form.addEventListener('submit', e => {
    e.preventDefault()
    //user input
    const newTask = { task: e.target.task.value }

    // post request
    fetch('http://localhost:3000/todos', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    })
        .then(r => r.json())
        .then(renderOneTask)

    //add to list
})

function renderAllTasks (tasks) {
    tasks.forEach(renderOneTask)
}

function renderOneTask(task) {
    const list = document.querySelector('.tasks')
    const todo = document.createElement('div')
    
    todo.className = 'task'
    todo.innerHTML = `
            <div>
              <label for="task-4">
                ${task.task}
              </label>
            </div>
            <div>
              <button class="check">
                <i class="fas fa-check"></i>
              </button>
              <button class="edit">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button class="trash">
                <i class="fas fa-trash"></i>
              </button>
            </div>
    `
    const trash = todo.querySelector('.trash')
    const edit = todo.querySelector('.edit')
    const check = todo.querySelector('.check')
    const label = todo.querySelector('label')

    check.addEventListener('click', () => {
      label.classList.toggle('completed');
      todo.classList.toggle('opacity');

    //   fetch(`http://localhost:3000/todos/${task.id}`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(check),
    // })
    //     .then(r => r.json())
    //     .then(json => console.log(json))
  })

    edit.addEventListener('click', e => {
      console.log(e.target.value)
    })

    trash.addEventListener('click', () => {
      todo.remove()
      fetch(`http://localhost:3000/todos/${task.id}`, {
        method: 'DELETE'
        }) 
    })

    // todo.addEventListener("click", buttonTodo);
    // function buttonTodo(e) {
    //     const button = e.target;
    //     if(button.classList[0] === '.edit'){
    //       console.log(e.target)
    //         // todo.classList.toggle('completed');
    //     } 
    // }
        
    

    list.append(todo) 
}

fetch("http://localhost:3000/todos")
    .then(r => r.json())
    .then(renderAllTasks)
