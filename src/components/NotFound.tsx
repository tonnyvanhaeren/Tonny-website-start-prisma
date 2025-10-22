import { Link } from '@tanstack/react-router';

interface NotFoundProps {
  message?: string;
  showBackButton?: boolean;
}

export function NotFound({
  message = "Oops! This page doesn't exist.",
  showBackButton = true,
}: NotFoundProps) {
  return (
    <div className='min-h-screen bg-superhero-primary flex items-center justify-center'>
      <div className='text-center'>
        {/* Superhero-themed 404 Icon */}
        <div className='mb-8'>
          <div className='text-9xl font-bold text-superhero-accent mb-4'>
            404
          </div>
          <div className='w-24 h-24 mx-auto mb-6 relative'>
            {/* Superhero mask icon */}
            <div className='w-full h-full bg-superhero-secondary rounded-full flex items-center justify-center'>
              <div className='w-16 h-16 bg-superhero-primary rounded-full flex items-center justify-center'>
                <div className='w-8 h-8 bg-superhero-accent rounded-full'></div>
              </div>
            </div>
            {/* Cape effect */}
            <div className='absolute -right-2 top-4 w-8 h-16 bg-superhero-secondary transform rotate-12 rounded-t-full'></div>
            <div className='absolute -left-2 top-4 w-8 h-16 bg-superhero-secondary transform -rotate-12 rounded-t-full'></div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className='text-4xl font-bold text-superhero-light mb-4'>
          Page Not Found
        </h1>
        <p className='text-xl text-superhero-light mb-8 max-w-md mx-auto'>
          {message}
        </p>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className='bg-superhero-light rounded-lg px-6 py-3'
            >
              ← Go Back
            </button>
          )}
          <Link
            to='/'
            className='bg-superhero-light rounded-lg px-6 py-3 text-center'
          >
            🏠 Return Home
          </Link>
        </div>

        {/* Additional Help */}
        <div className='mt-12'>
          <div className='card-superhero max-w-md mx-auto'>
            <div className='card-header-superhero'>
              <h3 className='text-lg font-semibold text-amber-100'>
                Need Help?
              </h3>
            </div>
            <div className='card-body-superhero'>
              <p className='text-md mb-4 text-amber-100'>
                If you believe this is an error, try refreshing the page or
                contact support.
              </p>
              <div className='flex gap-2'>
                <button
                  onClick={() => window.location.reload()}
                  className='bg-superhero-light rounded-lg text-sm px-4 py-2'
                >
                  🔄 Refresh Page
                </button>
                <button
                  onClick={() =>
                    window.open('mailto:support@example.com', '_blank')
                  }
                  className='bg-superhero-light rounded-lg text-sm px-4 py-2'
                >
                  📧 Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Superhero Quote */}
        <div className='mt-8'>
          <blockquote className='text-superhero-accent italic text-lg'>
            "With great power comes great responsibility...
            <br />
            and sometimes, great 404 errors!"
          </blockquote>
          <cite className='text-superhero-light text-sm'>
            - Every Developer Ever
          </cite>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
