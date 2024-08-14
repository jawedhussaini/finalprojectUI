import { useState } from 'react';

function ForgotPasswordRequest() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const API = process.env.REACT_APP_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic email validation
    const isValidEmail = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!isValidEmail) {
      setMessage('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        // Handle server errors
        const errorData = await response.json();
        setMessage(errorData.message || 'An error occurred. Please try again.');
      } else {
        // Success message
        setMessage('If your email is in our system, you will receive a password reset link.');
      }
    } catch (error) {
      // Handle network errors
      setMessage('An error occurred. Please check your network connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Forgot Your Password?</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Request Reset'}
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPasswordRequest;
