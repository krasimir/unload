import { theme, LS_THEME, THEME_DARK, THEME_DARK_COLOR, THEME_LIGHT_COLOR } from '../../state';

export default function todosMode({ data }) {
  data({
    theme,
    changeTheme: theme.mutate((current, newMode) => {
      localStorage.setItem(LS_THEME, newMode);
      document.body.style.backgroundColor = newMode === THEME_DARK ? THEME_DARK_COLOR : THEME_LIGHT_COLOR;
      return newMode;
    })
  });
};
