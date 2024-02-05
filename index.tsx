import { Elysia } from 'elysia';
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
      <input type='checkbox' checked={completed} />
      <button class='text-red-500'>X</button>
    </div>
  );
}

function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div class='flex flex-col space-y-3'>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <button hx-post='/add' hx-swap='outerHTML'>
        Add
      </button>
    </div>
  );
}
