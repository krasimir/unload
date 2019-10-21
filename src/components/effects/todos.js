export default function manageTodos({ data, state }) {
  const todos = state([
    {
      id: '1a',
      created: new Date(),
      finished: new Date(),
      text: 'Do A',
      done: false
    },
    {
      id: '2b',
      created: new Date(),
      finished: new Date(),
      text: 'Do B',
      done: false
    },
    {
      id: '3c',
      created: new Date(),
      finished: new Date(),
      text: 'Do C',
      done: true
    }
  ]);
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

  data({
    todos,
    toggle,
    update,
    reorder,
    del
  });
}
