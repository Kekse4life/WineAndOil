import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5003';

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const msg = await res.text();
        setError(msg);
        return;
      }
      const data = await res.json();
      login(data.token, data.user);
      navigate(data.user.isAdmin ? '/admin' : '/account');
    } catch {
      setError('Verbindungsfehler.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-bold font-serif text-gray-900 dark:text-gray-100 mb-2">Anmelden</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Willkommen zurück!</p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">E-Mail</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-800"
              placeholder="deine@email.at"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Passwort</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-800"
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-xl hover:bg-red-800 dark:hover:bg-red-700 transition-all font-semibold disabled:opacity-50"
        >
          {loading ? 'Wird angemeldet...' : 'Anmelden'}
        </button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Noch kein Konto?{' '}
          <Link to="/register" className="text-red-800 dark:text-red-400 font-bold hover:underline">
            Jetzt registrieren
          </Link>
        </p>
      </div>
    </main>
  );
}