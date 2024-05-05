import { Todo } from "../todos/models/todo.model";

const Filters = {
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
    console.log(state)
    console.log("init store");
}

const loadStore = () => {
    throw new Error('no implementado');
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
    
} 


const toggleTodo = (todoId) => {
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ){
            todo.id = !todo.id;
        }
        return todo;
    });
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);
}

const deteleCompleted = () => {
    state.todos = state.todos.filter( todo => todo.done );
}

const setFilter = (newFilter = Filters.All ) => {
    state.filter = newFilter;
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