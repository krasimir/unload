const LS_THEME = 'unload_theme';
export const THEME_LIGHT = 'THEME_LIGHT';
export const THEME_DARK = 'THEME_DARK';

export default function todosMode({ data, state }) {
  const theme = state(localStorage.getItem(LS_THEME) || THEME_LIGHT);

  data({
    theme,
    changeTheme: theme.mutate((current, newMode) => {
      localStorage.setItem(LS_THEME, newMode);
      return newMode;
    })
  });
};
