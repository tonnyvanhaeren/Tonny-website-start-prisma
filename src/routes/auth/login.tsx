import { createFileRoute } from '@tanstack/react-router';
import LoginForm from 'src/components/auth/LoginForm';

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
