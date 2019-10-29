import db from './utils/db';

import { todos } from '../../state';

export default async function manageTodos({ data }) {
  const [ , setTodos ] = todos;
  const toggle = todos.mutate(async (todos, todoToToggle) => {
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
  const colorTodos = todos.map(todos => {
    const colors = {};
    const getStart = todo => todo.text.split(' ').shift();

    todos.forEach(todo => {
      const start = getStart(todo);

      if (!colors[start]) {
        colors[start] = [ todo.id ];
      } else {
        colors[start].push(todo.id);
      }
    });

    Object.keys(colors).forEach(start => {
      if (colors[start].length >= 2) {
        const color = randomRGB();

        todos.forEach(todo => {
          if (colors[start].indexOf(todo.id) >= 0) {
            todo.color = color;
          }
        });
      } else {
        todos.find(todo => todo.id === colors[start][0]).color = false;
      }
    });

    return todos;
  });

  setTodos(await db.get());

  data({
    todos: colorTodos,
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

function randomRGB() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}
