/* eslint-disable max-len */
import { state, merge, subscribe } from 'riew';

import { weekDay, toString } from './components/controller/utils/dateHelpers';

export const LS_THEME = 'unload_theme';
export const LS_KEYWORDS = 'LS_KEYWORDS';
export const THEME_LIGHT = 'THEME_LIGHT';
export const THEME_LIGHT_COLOR = '#fff';
export const THEME_DARK = 'THEME_DARK';
export const THEME_DARK_COLOR = '#1c1c1c';
export const DEFAULT_KEYWORDS = 'house';

export const todos = state([]);
export const clock = state(new Date());
export const theme = state(localStorage.getItem(LS_THEME) || THEME_LIGHT);
export const settings = state({ keywords: localStorage.getItem('LS_KEYWORDS') || DEFAULT_KEYWORDS });

const completed = todos.map(todos => todos.filter(({ done }) => done).length);
const allTodos = todos.map(todos => todos.length);
const pageTitle = merge({ completed, allTodos, clock });

subscribe(pageTitle.pipe(({ completed, allTodos, clock }) => {
  document.title = `${ weekDay(clock.getDay()) } ${ toString(clock.getHours()) }:${ toString(clock.getMinutes()) } • ${ completed }/${ allTodos }`;
}), true);
subscribe(settings.pipe(value => {
  localStorage.setItem('LS_KEYWORDS', value.keywords);
}));
