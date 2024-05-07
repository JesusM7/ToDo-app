import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: "All",
    Completed: "Completed",
    Pending: "Pending"
} 

const state = {
    todos: [
        new Todo("test1"),
        new Todo("test2"),
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
    console.log(state);
    console.log("init store");
}

const loadStore = () => {
  if (!localStorage.getItem("state")) return;
  
  const {todos = [] , filter = Filters.All } = JSON.parse( localStorage.getItem("state") );
  state.todos = todos;
  state.filter = filter; 
}

const setTodoToLocalStore = () => {
    localStorage.setItem("state", JSON.stringify(state))
}

const getTodos = (filter = Filters.All ) => {

    switch (filter){

        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);

        default:
            throw new Error(` ${filter} no implementado`);              
    }
} 

const addTodo = (description) => {
    if (!description)  throw new Error('Descripcion requerida');
    state.todos.push( new Todo(description));
    setTodoToLocalStore();
} 


const toggleTodo = (todoId) => {
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ){
            todo.done = !todo.done;
        }
        return todo;
    });
    setTodoToLocalStore();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);
    setTodoToLocalStore();
}

const deteleCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    setTodoToLocalStore();
}

const setFilter = (newFilter = Filters.All ) => {
    state.filter = newFilter;
    setTodoToLocalStore();
}


const getCurrentFilter = () => {
    return state.filter
} 

export default {
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deteleCompleted,
    getCurrentFilter,
    setFilter,
    getTodos,
}