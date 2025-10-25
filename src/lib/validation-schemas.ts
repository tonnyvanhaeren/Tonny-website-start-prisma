import { z } from 'zod';

//zod schema for form validation
export const registerSchema = z
  .object({
    firstname: z
      .string()
      .min(1, 'Voornaam is verplicht')
      .min(2, 'Voornaam moet minimaal 2 tekens bevatten'),
    lastname: z
      .string()
      .min(1, 'Familienaam is verplicht')
      .min(2, 'Familienaam moet minimaal 2 tekens bevatten'),
    email: z.email('Ongeldig e-mailadres'),
    password: z.string().min(8, 'Wachtwoord moet minimaal 6 tekens bevatten'),
    confirm_password: z.string().min(8, 'Bevestig wachtwoord is verplicht'),
    phoneNumber: z.string().min(9, 'Telefoonnummer is verplicht'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Wachtwoorden komen niet overeen',
    path: ['confirm_password'],
  });
