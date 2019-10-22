import db from './utils/db';

export default async function manageTodos({ data, state }) {
  const todos = state(await db.get());
  const toggle = todos.mutate((todos, todoToToggle) => {
    return todos.map(todo => ({
      ...todo,
      done: todoToToggle.id === todo.id ? !todo.done : todo.done
    }));
  });
  const update = todos.mutate(async (todos, todoToUpdate) => {
    await db.edit(todoToUpdate);
    return todos.map(todo => ({
      ...todo,
      text: todoToUpdate.id === todo.id ? todoToUpdate.text : todo.text
    }));
  });
  const reorder = todos.mutate((todos, from, to) => {
    todos.splice(to, 0, todos.splice(from, 1)[0]);
    todos.forEach((todo, i) => {
      todo.order = i;
      db.edit(todo);
    });
    return todos;
  });
  const del = todos.mutate(async (todos, todo) => {
    await db.delete(todo.id);
    return todos.filter(({ id }) => id !== todo.id);
  });
  const add = todos.mutate(async (todos, todo) => {
    const newTodo = await db.add(todo);
    return [ newTodo, ...todos ];
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
