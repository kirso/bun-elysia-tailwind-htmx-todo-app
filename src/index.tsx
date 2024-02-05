import { Elysia, t } from 'elysia';
import { html } from '@elysiajs/html';
import * as elements from 'typed-html';

const app = new Elysia()
  .use(html())
  .get('/', ({ html }) =>
    html(
      <BaseHtml>
        <body
          class='flex w-full h-screen justify-center items-center'
          hx-get='/todos'
          hx-trigger='load'
          hx-swap='innerHTML'
        />
      </BaseHtml>
    )
  )
  .post('clicked', () => (
    <div class='text-blue-600'>Coming from the server</div>
  ))
  .get('/todos', () => <TodoList todos={db} />)
  // add todo
  .post(
    '/todos',
    ({ body }) => {
      // input -> is an empty string
      if (body.content.length === 0) {
        throw new Error('Content is required');
      }
      // fetch the last id in db
      let lastId = db.length > 0 ? db[db.length - 1].id : 0;
      // create a new todo
      const newTodo = {
        id: lastId++,
        content: body.content,
        completed: false,
      };
      db.push(newTodo);
      return <TodoItem {...newTodo} />;
    },
    {
      body: t.Object({
        content: t.String(),
      }),
    }
  )
  // toggle todo completion
  .post(
    '/todos/toggle/:id',
    // on request
    ({ params }) => {
      // find the todo based on ID
      const todo = db.find((todo) => todo.id === params.id);
      // toggle the completed property
      if (todo) {
        todo.completed = !todo.completed;
        return <TodoItem {...todo} />;
      }
    },
    // input validation from the route params using t Object from ElysiaJS. "t" will automatically coerce any string to a number.
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .delete(
    '/todos/:id',
    ({ params }) => {
      // find the todo based on ID
      const todo = db.find((todo) => todo.id === params.id);
      // remove the todo from the database
      if (todo) {
        db.splice(db.indexOf(todo), 1);
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

const BaseHtml = ({ children }: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THE BETH STACK</title>
    <script src="https://unpkg.com/htmx.org@1.9.3"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
${children}
`;

type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

const db: Todo[] = [
  { id: 1, content: 'Buy groceries', completed: false },
  { id: 2, content: 'Learn Typescript', completed: false },
];

function TodoItem({ content, completed, id }: Todo) {
  return (
    <div class='flex flex-row space-x-3'>
      <p>{content}</p>
      <input
        type='checkbox'
        checked={completed}
        hx-post={`/todos/toggle/${id}`}
        hx-target='closest div'
        hx-swap='outerHTML'
      />
      <button
        class='text-red-500'
        hx-delete={`/todos/${id}`}
        hx-target='closest div'
        hx-swap='outerHTML'
      >
        X
      </button>
    </div>
  );
}

function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div class='flex flex-col space-y-3'>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  );
}

function TodoForm() {
  return (
    <form
      class='flex flex-row space-x-3'
      hx-post='/todos'
      hx-swap='beforebegin'
    >
      <input
        type='text'
        name='content'
        class='border border-black rounded-md p-2'
      />
      <button type='submit'>Add</button>
    </form>
  );
}
