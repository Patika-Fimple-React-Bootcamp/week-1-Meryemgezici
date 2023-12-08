document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.querySelector(".todoForm");
  const titleInput = document.querySelector(".titleInput");
  const checkboxInput = document.querySelector(".checkboxInput");
  const todoList = document.querySelector(".todoList");
  const loading = document.querySelector(".loading");

  // Api'den veri çekme
  const getData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );
      const data = await response.json();
      displayTodos(data);
    } catch (error) {
      console.error("Üzgünüz bir hata oluştu. Hata:", error);
    }
  };

  const displayTodos = (todos) => {
    loading.style.display = "none";
    todoList.style.display = "block";
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Title: ${todo.title} - Completed: ${todo.completed}`;
      todoList.appendChild(listItem);
    });
  };

  // Form submit edildiğinde
  todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newTodo = {
      title: titleInput.value,
      completed: checkboxInput.checked,
    };

    // Yeni bir liste elemanı ekleme
    const listItem = document.createElement("li");
    listItem.textContent = `Title: ${newTodo.title} - Completed: ${newTodo.completed}`;
    todoList.appendChild(listItem);

    // Formu temizle
    titleInput.value = "";
    checkboxInput.checked = false;
  });

  getData();
});
