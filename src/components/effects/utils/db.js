/* eslint-disable no-unused-vars */
import Dexie from 'dexie';

function createDb() {
  const api = {};

  const db = new Dexie('unload');

  db.version(1).stores({
    todos: '++id, created, finished, text, done, archived, tags, order'
  });

  api.get = function () {
    return db.todos.toArray();
  };
  api.add = async function ({
    text,
    created = new Date(),
    finished = null,
    done = false,
    archived = false,
    tags = []
  }) {
    const newTodo = {
      created,
      finished,
      text,
      done,
      archived,
      tags,
      order: 0
    };

    newTodo.id = await db.todos.add(newTodo);
    return newTodo;
  };
  api.delete = async function (id) {
    const entry = await db.todos.get({ id });

    if (entry) {
      await db.todos.delete(entry.id);
    } else {
      console.warn(`There is no todo with id "${ id }". You are trying to delete it but it is not there.`);
    }
  };
  api.edit = function (todo) {
    return db.todos.put(todo);
  };

  return api;
}

const db = createDb();

export default db;
