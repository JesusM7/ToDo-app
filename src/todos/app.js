import todoStore from "../store/todo.store";
import html from "./app.html?raw"
import { renderTodo } from "./use-cases";

const elementIDs = {
    Todolist: ".todo-list",
    NewTodoInput: "#new-todo-input"
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        console.log(todos)
        renderTodo( elementIDs.Todolist, todos );
    };

    (()=>{
        const app = document.createElement("div");
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();    
    })();

    const newDesctiptionInput = document.querySelector(elementIDs.NewTodoInput);
    const todoListUL = document.querySelector(elementIDs.Todolist);

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
    })

}