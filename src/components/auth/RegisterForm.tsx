import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { useForm } from '@tanstack/react-form';
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
import { registerSchema } from '~/lib/validation-schemas';
import { any, z } from 'zod';
import { registerUser } from '~/server/functions/user-server-fn';
import { toast } from 'react-hot-toast';

//zod schema for form validation
// const registerSchema = z
//   .object({
//     firstname: z
//       .string()
//       .min(1, "Voornaam is verplicht")
//       .min(2, "Voornaam moet minimaal 2 tekens bevatten"),
//     lastname: z
//       .string()
//       .min(1, "Familienaam is verplicht")
//       .min(2, "Familienaam moet minimaal 2 tekens bevatten"),
//     email: z.email("Ongeldig e-mailadres"),
//     password: z.string().min(8, "Wachtwoord moet minimaal 6 tekens bevatten"),
//     confirm_password: z.string().min(8, "Bevestig wachtwoord is verplicht"),
//     phoneNumber: z.string().min(9, "Telefoonnummer is verplicht"),
//   })
//   .refine((data) => data.password === data.confirm_password, {
//     message: "Wachtwoorden komen niet overeen",
//     path: ["confirm_password"],
//   });

const defaultValues: z.infer<typeof registerSchema> = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirm_password: '',
  phoneNumber: '',
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const form = useForm({
    defaultValues,
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async (data) => {
      registerUser({ data: data.value })
        .then((user) => {
          console.log('User registered successfully:', user);
          // Navigate to home
          navigate({ to: '/' });
        })
        .catch((error) => {
          toast.error(
            error.message || 'Er is een fout opgetreden tijdens registratie.'
          );
          //console.error('Error registering user:', error);
          // Handle error (e.g., show error message to user)
        });
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
            Registreer
          </CardTitle>

          <CardContent className='space-y-4'>
            <div className='mb- grid grid-cols-1 gap-4 md:grid-cols-2'>
              <form.Field name='firstname'>
                {({ state, handleChange }) => (
                  <div className='space-y-2'>
                    <Label
                      className='mb-2 text-lg text-orange-400'
                      htmlFor='firstname'
                    >
                      Voornaam
                    </Label>
                    <Input
                      ref={inputRef}
                      id='firstname'
                      name='firstname'
                      type='text'
                      placeholder='type voornaam'
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    {state.meta.errors.length > 0 && (
                      <em className='mt-1 text-sm text-red-500'>
                        {state.meta.errors[0]?.message}
                      </em>
                    )}
                  </div>
                )}
              </form.Field>
              <form.Field name='lastname'>
                {({ state, handleChange }) => (
                  <div className='space-y-2'>
                    <Label
                      className='mb-2 text-lg text-orange-400'
                      htmlFor='lastname'
                    >
                      Familienaam
                    </Label>
                    <Input
                      id='lastname'
                      name='lastname'
                      type='text'
                      placeholder='type familienaam'
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
              <form.Field name='phoneNumber'>
                {({ state, handleChange }) => (
                  <div className='space-y-2'>
                    <Label
                      className='mb-2 text-lg text-orange-400'
                      htmlFor='phoneNumber'
                    >
                      Telefoon
                    </Label>
                    <Input
                      id='phoneNumber'
                      name='phoneNumber'
                      type='text'
                      placeholder='type telefoonnummer +32 444 55 66 77'
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
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
              <form.Field name='confirm_password'>
                {({ state, handleChange }) => (
                  <div className='space-y-2'>
                    <Label
                      className='mb-2 text-lg text-orange-400'
                      htmlFor='confirm_password'
                    >
                      Confirm Wachtwoord
                    </Label>
                    <Input
                      id='confirm_password'
                      name='confirm_password'
                      type='password'
                      placeholder='confirm wachtwoord'
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
                  {isSubmitting ? 'Submitting...' : 'Registreer'}
                </Button>
              )}
            </form.Subscribe>

            <Button
              variant='link'
              className='text-md text-gray-700'
              onClick={() => navigate({ to: '/auth/login' })}
            >
              <p>
                Al een account -{' '}
                <span className='text-blue-400'>Ga naar Login</span>
              </p>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>

    // <div className='flex min-h-screen items-center justify-center p-4'>
    //   <Card className='w-full max-w-sm'>
    //     <CardHeader>
    //       <CardTitle>Register uw Account</CardTitle>
    //       <CardDescription>Vul je gegevens in</CardDescription>
    //       <CardAction>
    //         <Button variant='link'>Login</Button>
    //       </CardAction>
    //     </CardHeader>
    //     <CardContent>
    //       <form
    //         onSubmit={(e) => {
    //           e.preventDefault();
    //           form.handleSubmit();
    //         }}
    //       >
    //         <div className='flex flex-col gap-6'>
    //           <div className='grid gap-2'>
    // <form.Field name='firstname'>
    //   {({ state, handleChange }) => (
    //     <div>
    //       <Label className='mb-1' htmlFor='firstname'>
    //         Voornaam
    //       </Label>
    //       <Input
    //         id='firstname'
    //         name='firstname'
    //         type='text'
    //         placeholder='type voornaam'
    //         value={state.value}
    //         onChange={(e) => handleChange(e.target.value)}
    //       />
    //       {state.meta.errors.length > 0 && (
    //         <em className='text-sm text-red-600 mt-1'>
    //           {state.meta.errors[0]?.message}
    //         </em>
    //       )}
    //     </div>
    //   )}
    // </form.Field>
    // <form.Field name='lastname'>
    //   {({ state, handleChange }) => (
    //     <div>
    //       <Label className='mb-1' htmlFor='lastname'>
    //         Familienaam
    //       </Label>
    //       <Input
    //         id='lasttname'
    //         name='lastname'
    //         type='text'
    //         placeholder='type familienaam'
    //         value={state.value}
    //         onChange={(e) => handleChange(e.target.value)}
    //       />
    //       {state.meta.errors.length > 0 && (
    //         <em className='text-sm text-red-600 mt-1'>
    //           {state.meta.errors[0]?.message}
    //         </em>
    //       )}
    //     </div>
    //   )}
    // </form.Field>
    // <form.Field name='email'>
    //   {({ state, handleChange }) => (
    //     <div>
    //       <Label className='mb-1' htmlFor='email'>
    //         Email
    //       </Label>
    //       <Input
    //         id='email'
    //         name='email'
    //         type='email'
    //         placeholder='type email'
    //         value={state.value}
    //         onChange={(e) => handleChange(e.target.value)}
    //       />
    //       {state.meta.errors.length > 0 && (
    //         <em className='text-sm text-red-600 mt-1'>
    //           {state.meta.errors[0]?.message}
    //         </em>
    //       )}
    //     </div>
    //   )}
    // </form.Field>
    // <form.Field name='phoneNumber'>
    //   {({ state, handleChange }) => (
    //     <div>
    //       <Label className='mb-1' htmlFor='phoneNumber'>
    //         Telefoon
    //       </Label>
    //       <Input
    //         id='phoneNumber'
    //         name='phoneNumber'
    //         type='text'
    //         placeholder='type telefoonnummer +32 444 55 66 77'
    //         value={state.value}
    //         onChange={(e) => handleChange(e.target.value)}
    //       />
    //       {state.meta.errors.length > 0 && (
    //         <em className='text-sm text-red-600 mt-1'>
    //           {state.meta.errors[0]?.message}
    //         </em>
    //       )}
    //     </div>
    //   )}
    // </form.Field>
    //             <form.Field name='password'>
    //               {({ state, handleChange }) => (
    //                 <div>
    //                   <Label className='mb-1' htmlFor='password'>
    //                     Wachtwoord
    //                   </Label>
    //                   <Input
    //                     id='password'
    //                     name='password'
    //                     type='password'
    //                     placeholder='type wachtwoord > 8 tekens'
    //                     value={state.value}
    //                     onChange={(e) => handleChange(e.target.value)}
    //                   />
    //                   {state.meta.errors.length > 0 && (
    //                     <em className='text-sm text-red-600 mt-1'>
    //                       {state.meta.errors[0]?.message}
    //                     </em>
    //                   )}
    //                 </div>
    //               )}
    //             </form.Field>
    //             <form.Field name='confirm_password'>
    //               {({ state, handleChange }) => (
    //                 <div>
    //                   <Label className='mb-1' htmlFor='confirm_password'>
    //                     Confirm Wachtwoord
    //                   </Label>
    //                   <Input
    //                     id='confirm_password'
    //                     name='confirm_password'
    //                     type='password'
    //                     placeholder='confirm wachtwoord'
    //                     value={state.value}
    //                     onChange={(e) => handleChange(e.target.value)}
    //                   />
    //                   {state.meta.errors.length > 0 && (
    //                     <em className='text-sm text-red-600 mt-1'>
    //                       {state.meta.errors[0]?.message}
    //                     </em>
    //                   )}
    //                 </div>
    //               )}
    //             </form.Field>
    //           </div>
    //           {/* <div className='grid gap-2'>
    //             <Label htmlFor='email'>Email</Label>
    //             <Input
    //               id='email'
    //               type='email'
    //               placeholder='m@example.com'
    //               required
    //             />
    //           </div>
    //           <div className='grid gap-2'>
    //             <div className='flex items-center'>
    //               <Label htmlFor='password'>Password</Label>
    //               <a
    //                 href='#'
    //                 className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
    //               >
    //                 Forgot your password?
    //               </a>
    //             </div>
    //             <Input id='password' type='password' required />
    //           </div> */}

    // {/* Submit Button */}
    // <div className='flex justify-end'>
    //   <form.Subscribe
    //     selector={(state) => [state.canSubmit, state.isSubmitting]}
    //   >
    //     {([canSubmit, isSubmitting]) => (
    //       <Button type='submit' disabled={!canSubmit}>
    //         {isSubmitting ? 'Submitting...' : 'Submit Form'}
    //       </Button>
    //     )}
    //   </form.Subscribe>
    // </div>

    //           {/* Debug Output */}
    //           <form.Subscribe selector={(state) => state.values}>
    //             {(values) => (
    //               <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
    //                 <h3 className='font-medium mb-2'>Current Form Values:</h3>
    //                 <pre className='text-sm text-gray-600'>
    //                   {JSON.stringify(values, null, 2)}
    //                 </pre>
    //               </div>
    //             )}
    //           </form.Subscribe>

    //           <div className='grid gap-2'>
    //             <input
    //               type='submit'
    //               value='Register'
    //               className='bg-orange-400 px-3 py-2 rounded-md text-lg  text-amber-50 font-medium hover:bg-orange-600'
    //             />
    //           </div>
    //         </div>
    //       </form>
    //     </CardContent>
    //     {/* <CardFooter className='flex-col gap-2'>
    //       <Button type='submit' className='w-full'>
    //         Register
    //       </Button>
    //       <Button variant='outline' className='w-full'>
    //         Login with Google
    //       </Button>
    //     </CardFooter> */}
    //   </Card>
    // </div>

    // <form>
    //   <h1>Register</h1>
    //   <div></div>
    // </form>
  );
};

export default RegisterForm;
