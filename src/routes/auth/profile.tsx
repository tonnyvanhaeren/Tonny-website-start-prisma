import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card';
import { AtSign, PhoneForwarded, UserStar } from 'lucide-react';

export const Route = createFileRoute('/auth/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { isAuthenticated, user, isLoading, isAdmin, hasRole, logout } =
    useAuth();

  if (!isAuthenticated) {
    navigate({ to: '/', replace: true });
    return null;
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex justify-between gap-4'>
        <div className='max-w-2xl'>
          <Card>
            <CardHeader>
              <CardTitle>
                <h1 className='text-2xl  text-orange-400'>
                  {user?.firstName} - {user?.lastName}
                </h1>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <p className='text-md text-gray-500 flex items-center gap-2'>
                <AtSign className='w-4 h-4 text-orange-500' />
                {user?.email}
              </p>{' '}
              <p className=' text-gray-500 flex items-center gap-2 text-md'>
                <PhoneForwarded className='w-4 h-4 text-green-500' />
                {user?.phoneNumber}
              </p>
              <p className='text-md text-gray-500 flex items-center gap-2'>
                <UserStar className='w-4 h-4 text-blue-500' /> {user?.role}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className='max-w-5xl min-w-4xl'>
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl  text-orange-400'>
                Inschrijvingen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <p className='text-lg text-gray-500'>Inschrijving 1</p>
                </div>
                <div className='flex items-center gap-2'>
                  <p className='text-lg text-gray-500'>Inschrijving 2</p>
                </div>
                <div className='flex items-center gap-2'>
                  <p className='text-lg text-gray-500'>Inschrijving 3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
