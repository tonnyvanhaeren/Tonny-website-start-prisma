import { createFileRoute } from '@tanstack/react-router';
import { getUsers } from '../../server/functions/user-server-fn';

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
  loader: () => {
    return getUsers();
  },
});

function RouteComponent() {
  const users = Route.useLoaderData();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
