


const form = document.querySelector('form')
form.addEventListener('submit', e => {
    e.preventDefault()
    //user input
    const newTask = { task: e.target.task.value }
    form.reset();
    // post request
    fetch('http://localhost:3000/todos', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    })
        .then(r => r.json())
        .then(renderOneTask)

})
const filterOption = document.querySelector('.filter-todo')
function filterTodo (e) {
  console.log(label)
}

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
              <button class="star">
              <i class="far fa-star"></i>
              </button>
              <button class="trash">
                <i class="fas fa-trash"></i>
              </button>
            </div>
    `
    const trash = todo.querySelector('.trash')
    const star = todo.querySelector('.star')
    const check = todo.querySelector('.check')
    const label = todo.querySelector('label')

    check.addEventListener('click', () => {
      label.classList.toggle('completed');
      todo.classList.toggle('opacity');

      fetch(`http://localhost:3000/todos/${task.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(check),
    })
        .then(r => r.json())
        .then(json => console.log(json))
  })


   const i = todo.querySelector('i')

    star.addEventListener('click', e => {
      if(task.important === true) {
        task.important = false;
        star.innerHTML = '<i class="far fa-star"></i>';
      }
      else if(task.important === false){
        task.important = true;
        star.innerHTML = '<i class="fas fa-star"></i>';
      } else {
        task.important = true;
        star.innerHTML = '<i class="fas fa-star"></i>';
      }
      fetch(`http://localhost:3000/todos/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ important: true })
    }) 
    })

    trash.addEventListener('click', () => {
      todo.remove()
      fetch(`http://localhost:3000/todos/${task.id}`, {
        method: 'DELETE'
        }) 
    })

    
        
    

    list.append(todo) 
}

fetch("http://localhost:3000/todos")
    .then(r => r.json())
    .then(renderAllTasks)
