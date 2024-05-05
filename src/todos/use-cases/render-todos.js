import { createTodoHTML } from "./create-todo-html";

let element;


export const renderTodo = ( elementId, todos = [] ) => {

    if (!element) {element = document.querySelector( elementId ) };

    if (!element) { throw new Error("ID no encontrado")};

    element.innerHTML = " ";

    todos.forEach( todo => {

        element.append( createTodoHTML(todo) )
    });

};