import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from 'src/components/ui/card';
import { AtSign, PhoneForwarded, UserStar } from 'lucide-react';
import { Button } from 'src/components/ui/button';

export const Route = createFileRoute('/auth/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated, user, isLoading, isAdmin, hasRole, logout } =
    useAuth();

  if (!user) {
    //redirect to home
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className='text-3xl  text-orange-400'>
              {user?.firstName} - {user?.lastName}
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-lg text-gray-500 flex items-center gap-2'>
            <AtSign className='w-4 h-4 text-orange-500' />
            {user?.email}
          </p>{' '}
          <p className=' text-gray-500 flex items-center gap-2 text-lg'>
            <PhoneForwarded className='w-4 h-4 text-green-500' />
            {user?.phoneNumber}
          </p>
          <p className='text-lg text-gray-500 flex items-center gap-2'>
            <UserStar className='w-4 h-4 text-blue-500' /> {user?.role}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
