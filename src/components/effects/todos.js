export default function manageTodos({ data, state }) {
  const todos = state([
    {
      id: 1,
      created: new Date(),
      finished: new Date(),
      text: 'Do A',
      done: false
    },
    {
      id: 2,
      created: new Date(),
      finished: new Date(),
      text: 'Do B',
      done: false
    },
    {
      id: 3,
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

  data({
    todos,
    toggle,
    update
  });
}
