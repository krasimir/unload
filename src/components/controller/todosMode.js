const LS_TODOS_MODE_ITEM = 'unload_todos_mode';
export const MODE_NODES = 'MODE_NODES';
export const MODE_CLOCK = 'MODE_CLOCK';
export const MODE_SETTINGS = 'MODE_SETTINGS';

export default function todosMode({ data, state }) {
  const mode = state(localStorage.getItem(LS_TODOS_MODE_ITEM) || MODE_NODES);

  data({
    mode,
    changeMode: mode.mutate((current, newMode) => {
      localStorage.setItem(LS_TODOS_MODE_ITEM, newMode);
      return newMode;
    })
  });
};
