import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw"
import { renderTodo, renderPending } from "./use-cases";

const elementIDs = {
    ClearCompleted: ".clear-completed",
    Todolist: ".todo-list",
    NewTodoInput: "#new-todo-input",
    TodoFilters: ".filtro",
    PendingCountLabel: "#pending-count",
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        console.log(todos)
        renderTodo( elementIDs.Todolist, todos );
        updatePendingCount();
    };

    const updatePendingCount = () => {
        renderPending( elementIDs.PendingCountLabel )
    }

    (()=>{
        const app = document.createElement("div");
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos( );    
    })();

    const newDesctiptionInput = document.querySelector(elementIDs.NewTodoInput);
    const todoListUL = document.querySelector(elementIDs.Todolist);
    const clearCompletedButton = document.querySelector(elementIDs.ClearCompleted);
    const filtersLI = document.querySelectorAll(elementIDs.TodoFilters);

    newDesctiptionInput.addEventListener("keyup", ( Event ) => {
        if(Event.keyCode !== 13) return;
        if (Event.target.value.trim().length === 0) return;

        todoStore.addTodo( Event.target.value );
        displayTodos();
        Event.target.value = "";
    })

    todoListUL.addEventListener("click", (Event) => {
        const element = Event.target.closest("[data-id]");
        todoStore.toggleTodo(element.getAttribute("data-id"));
        displayTodos();
    });

    todoListUL.addEventListener("click", (Event) => {

        if(Event.target.className == "destroy"){
            const element = Event.target.closest("[data-id]");
            todoStore.deleteTodo(element.getAttribute("data-id"));
            displayTodos();
        }

    });

    clearCompletedButton.addEventListener("click", () => {
        todoStore.deteleCompleted(); 
        displayTodos();
        });

    filtersLI.forEach( element =>{
        element.addEventListener("click", (element) => {
            filtersLI.forEach( el => el.classList.remove("selected")); // .target abajo pero aqui no?
            element.target.classList.add("selected");

            switch (element.target.text){
                case "Todos":
                    todoStore.setFilter(Filters.All);
                break;

                case "Completados":
                    todoStore.setFilter(Filters.Completed);
                break;

                case "Pendientes":
                    todoStore.setFilter(Filters.Pending);
                break;
            };
            displayTodos();
        })
    })    
}