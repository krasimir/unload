import db from './utils/db';

export default async function manageTodos({ data, state }) {
  const todos = state(await db.get());
  const toggle = todos.mutate(async (todos, todoToToggle) => {
    // todoToToggle.done = !todoToToggle.done;
    const newTodos = todos.map(todo => ({
      ...todo,
      done: todoToToggle.id === todo.id ? !todo.done : todo.done
    }));

    await db.edit({ ...todoToToggle, done: !todoToToggle.done });
    return newTodos;
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
    const all = [ newTodo, ...todos ];

    all.forEach((todo, i) => {
      todo.order = i;
      db.edit(todo);
    });
    return all;
  });
  const clearCompleted = todos.mutate(async (todos) => {
    return todos.filter(todo => {
      if (todo.done) {
        db.delete(todo.id);
        return false;
      }
      return true;
    });
  });

  data({
    todos,
    toggle,
    update,
    reorder,
    del,
    add,
    clearCompleted
  });
}

export function getNewTodo() {
  return {
    text: ''
  };
}
