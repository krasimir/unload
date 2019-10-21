import db from './utils/db';

export default async function manageTodos({ data, state }) {
  const todos = state(await db.getTodos());
  const toggle = todos.mutate((todos, todoToToggle) => {
    return todos.map(todo => ({
      ...todo,
      done: todoToToggle.id === todo.id ? !todo.done : todo.done
    }));
  });
  const update = todos.mutate((todos, todoToUpdate) => {
    return todos.map(todo => ({
      ...todo,
      text: todoToUpdate.id === todo.id ? todoToUpdate.text : todo.text
    }));
  });
  const reorder = todos.mutate((todos, from, to) => {
    todos.splice(to, 0, todos.splice(from, 1)[0]);
    return todos;
  });
  const del = todos.mutate((todos, todo) => {
    return todos.filter(({ id }) => id !== todo.id);
  });
  const add = todos.mutate(async (todos, todo) => {
    const newTodo = await db.addTodo(todo);
    return [...todos, newTodo ];
  });

  data({
    todos,
    toggle,
    update,
    reorder,
    del,
    add
  });
}

export function getNewTodo() {
  return {
    text: ''
  };
}
