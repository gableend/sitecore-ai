import { useState } from 'react';

interface NewsletterSignupProps {
  className?: string;
}

export default function NewsletterSignup({ className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Success state
      setIsSubscribed(true);

      // Save email to localStorage
      localStorage.setItem('subscribed', 'true');
      localStorage.setItem('email', email);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {!isSubscribed ? (
        <>
          <p className="text-lg mb-4 font-medium">Be the first to know when we launch.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md bg-white border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed sitecore-gradient text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : 'Notify Me'}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <p className="text-xs mt-2 text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </>
      ) : (
        <div className="bg-white rounded-md shadow-md p-6 animate-fade-in border border-gray-100">
          <h3 className="text-2xl font-semibold mb-2 sitecore-gradient-text">Thank You!</h3>
          <p>
            We'll notify you at <span className="font-medium">{email}</span> when we launch.
          </p>
        </div>
      )}
    </div>
  );
}
