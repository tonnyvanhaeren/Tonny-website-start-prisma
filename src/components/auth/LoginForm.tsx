import { loginSchema } from '~/lib/validation-schemas';
import { login } from '~/server/functions/user-server-fn';
import { toast } from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Button } from 'src/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

const defaultValues: z.infer<typeof loginSchema> = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const form = useForm({
    defaultValues,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async (data) => {
      login({ data: data.value })
        .then((response) => {
          console.log(response);
          navigate({ to: '/' });
        })
        .catch((error) => {
          toast.error(
            error.message || 'Er is een fout opgetreden tijdens registratie.'
          );
        });

      console.log('login', data);
    },
  });

  return (
    <div className='m-3'>
      {/* <h2 className="m-5 text-center text-2xl font-bold text-white">
        Register uw Account
      </h2> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <Card className='mx-auto max-w-2xl bg-orange-50 shadow-lg'>
          <CardTitle className='mx-6 rounded-md border-2 border-orange-500 p-4 text-center text-4xl text-orange-500'>
            Login
          </CardTitle>

          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <form.Field name='email'>
                {({ state, handleChange }) => (
                  <div className='space-y-2'>
                    <Label
                      className='mb-2 text-lg text-orange-400'
                      htmlFor='email'
                    >
                      Email
                    </Label>
                    <Input
                      ref={inputRef}
                      id='email'
                      name='email'
                      type='email'
                      placeholder='type email'
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    {state.meta.errors.length > 0 && (
                      <em className='mt-1 text-sm text-red-600'>
                        {state.meta.errors[0]?.message}
                      </em>
                    )}
                  </div>
                )}
              </form.Field>
              <form.Field name='password'>
                {({ state, handleChange }) => (
                  <div className='space-y-2'>
                    <Label
                      className='mb-2 text-lg text-orange-400'
                      htmlFor='password'
                    >
                      Wachtwoord
                    </Label>
                    <Input
                      id='password'
                      name='password'
                      type='password'
                      placeholder='type wachtwoord > 8 tekens'
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    {state.meta.errors.length > 0 && (
                      <em className='mt-1 text-sm text-red-600'>
                        {state.meta.errors[0]?.message}
                      </em>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
          </CardContent>
          <CardFooter className='mt-4 justify-between px-6 pb-6'>
            {/** flex items-center justify-between */}
            {/* Submit Button */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  variant={'outline'}
                  type='submit'
                  disabled={!canSubmit}
                  className='text-md bg-green-600 font-medium text-white hover:bg-green-300'
                >
                  {isSubmitting ? 'Submitting...' : 'Login'}
                </Button>
              )}
            </form.Subscribe>

            <Button
              variant='link'
              className='text-md text-gray-700'
              onClick={() => navigate({ to: '/auth/register' })}
            >
              <p>
                Nog geen een account -
                <span className='text-blue-400'>Ga naar Register</span>
              </p>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
