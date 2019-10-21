/* eslint-disable no-unused-vars */
import Dexie from 'dexie';

function createDb() {
  const api = {};

  const db = new Dexie('unload');

  db.version(1).stores({
    todos: '++id, created, finished, text, done, archived, tags'
  });

  api.getTodos = function () {
    return db.todos.toArray();
  };
  api.addTodo = function ({
    text,
    created = new Date(),
    finished = null,
    done = false,
    archived = false,
    tags = []
  }) {
    return db.todos.add({
      created,
      finished,
      text,
      done,
      archived,
      tags
    });
  };
  api.delete = async function (id) {
    const entry = await db.todos.get({ objectId: id });

    if (entry) {
      await db.todos.delete(entry.id);
    } else {
      console.warn(`There is no todo with id "${ id }". You are trying to delete it but it is not there.`);
    }
  };
  api.updateTodo = function (todo) {
    return db.todos.put(todo);
  };

  return api;
}

const db = createDb();

export default db;
