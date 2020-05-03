import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: 'Create project',
    done: true,
    fix: false,
  },
  {
    id: 2,
    text: 'Styling component',
    done: true,
    fix: false,
  },
  {
    id: 3,
    text: 'Make Context',
    done: false,
    fix: false,
  },
  {
    id: 4,
    text: 'Implementing the Function',
    done: false,
    fix: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.todo];
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    case 'FIX': {
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, fix: !todo.fix } : todo,
      );
      // const fixTodo = state.find((todo) => todo.id === action.id);
      // const afterState = state.filter((todo) => todo.id !== action.id);
      //
      // console.log(fixTodo);
      // return [
      //   ...afterState,
      //   { fixTodo: { id: action.id, text: '', fix: !action.fix } },
      // ];
    }
    case 'UPDATE':
      return state.map((todo) =>
        todo.id === action.id
          ? { ...todo, text: action.value, fix: false }
          : todo,
      );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

function TodoContext({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoContext');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoContext');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoContext');
  }
  return context;
}

export default TodoContext;
