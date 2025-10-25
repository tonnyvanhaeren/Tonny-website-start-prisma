import { createFileRoute } from '@tanstack/react-router';
import RegisterForm from '~/components/auth/RegisterForm';

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
