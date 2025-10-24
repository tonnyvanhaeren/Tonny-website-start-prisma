// ('use client');

// import * as React from 'react';
import { Link } from '@tanstack/react-router';
import {
  LogIn,
  Home,
  UserRoundPlus,
  ChevronDownIcon,
  LogOut,
  User,
} from 'lucide-react';

// --- SHADCN UI IMPORTS ---
import { Button } from 'src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from 'src/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from 'src/components/ui/navigation-menu';

export function NavbarUi() {
  const userIsLoggedIn = false;
  const userName = 'S. Cooper';
  const userEmail = 's.cooper@example.com';

  const LoggedInNav = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
          <Avatar className='h-9 w-9'>
            {/* <AvatarImage src="/path/to/user-image.jpg" alt={userName} /> */}
            <AvatarFallback>
              {userName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{userName}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to='/auth/profile' className='flex items-center'>
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-600 focus:text-red-600'>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // 2. Logged Out User Navigation (Login/Register Buttons)
  const LoggedOutNav = () => (
    <div className='flex items-center space-x-2'>
      <Button variant='ghost' asChild>
        <Link to='/auth/login'>
          <LogIn className='mr-2 h-4 w-4' />
          Login
        </Link>
      </Button>
      <Button asChild>
        <Link to='/auth/register'>
          <UserRoundPlus className='mr-2 h-4 w-4 ' /> Register
        </Link>
      </Button>
    </div>
  );
  return (
    <header className='border-b bg-superhero-light'>
      {/* Container: Use flex and justify-between to push main links and auth links apart */}
      <nav className='mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6'>
        {/* Left/Center: Logo and Main Navigation Links (using NavigationMenu) */}
        <div className='flex items-center'>
          <Link
            className='mr-3 text-md text-white hover:bg-orange-600 px-3 py-1 rounded-md'
            to='/'
            activeProps={{
              className: 'bg-green-700',
            }}
          >
            Home
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {/* Simple Link */}
              <NavigationMenuItem>
                <Link to='/docs'>
                  <NavigationMenuLink className='bg-orange-400 hover:bg-orange-600 text-white px-3 py-2 rounded-md'>
                    Admin panel
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Link with Dropdown (Example) */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {/* Placeholder for actual dropdown content */}
                  <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                    <li className='row-span-3'>... Content ...</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side: Authentication/Profile */}
        {/* ml-auto pushes this div to the right edge */}
        <div className='ml-auto flex items-center'>
          {userIsLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </div>
      </nav>
    </header>
  );
}
