import { createFileRoute } from '@tanstack/react-router';
import { getUsers } from '../../server/functions/user-server-fn';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isLoading, error, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isPending) return <div>isPending...</div>;
  if (isLoading) return <div>isLoading...</div>;
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
