import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5003';

export default function Checkout({ cartItems, clearCart, formatPrice }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });
  const [error, setError] = useState(null);

  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOrder = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          shippingAddress: form.address,
          shippingCity: form.city,
          shippingZip: form.zip,
          shippingCountry: form.country,
          items: cartItems.map(i => ({
            productId: i.id,
            quantity: i.quantity,
            price: i.price
          }))
        })
      });

      if (!res.ok) throw new Error('Bestellung fehlgeschlagen.');

      clearCart();
      setStep(3);
    } catch {
      setError('Bestellung fehlgeschlagen. Bitte versuche es nochmal.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && step !== 3) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-400 dark:text-gray-500 text-lg mb-4">Dein Warenkorb ist leer.</p>
          <Link to="/shop" className="text-red-800 dark:text-red-400 font-bold hover:underline">Zum Shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 md:px-8">
      {/* Steps */}
      {step !== 3 && (
        <div className="flex items-center gap-4 mb-10">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s ? 'bg-red-800 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                {s}
              </div>
              <span className={`text-sm font-semibold ${step >= s ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}`}>
                {s === 1 ? 'Lieferadresse' : 'Übersicht'}
              </span>
              {s < 2 && <div className="w-12 h-0.5 bg-gray-200 dark:bg-gray-700 ml-2" />}
            </div>
          ))}
        </div>
      )}

      {/* Step 1 – Adresse */}
      {step === 1 && (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold font-serif text-gray-900 dark:text-gray-100 mb-6">Lieferadresse</h2>
            {!user && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 px-4 py-3 rounded-xl mb-6 text-sm">
                <Link to="/login" className="font-bold hover:underline">Melde dich an</Link> um deine Bestellhistorie zu sehen.
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input name="name" value={form.name} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-800"
                  placeholder="Daniel Muster" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">E-Mail</label>
                <input name="email" value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-800"
                  placeholder="deine@email.at" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Straße & Hausnummer</label>
                <input name="address" value={form.address} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-800"
                  placeholder="Musterstraße 1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">PLZ</label>
                  <input name="zip" value={form.zip} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-800"
                    placeholder="1210" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Stadt</label>
                  <input name="city" value={form.city} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-800"
                    placeholder="Wien" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Land</label>
                <input name="country" value={form.country} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-800"
                  placeholder="Österreich" />
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!form.address || !form.city || !form.zip || !form.country}
              className="w-full mt-6 bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-xl hover:bg-red-800 transition-all font-semibold disabled:opacity-50"
            >
              Weiter zur Übersicht
            </button>
          </div>

          {/* Bestellübersicht rechts */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 h-fit">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Deine Bestellung</h3>
            <div className="space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">{item.name} × {item.quantity}</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-4 flex justify-between font-bold">
              <span className="text-gray-900 dark:text-gray-100">Gesamt</span>
              <span className="text-gray-900 dark:text-gray-100">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 – Übersicht */}
      {step === 2 && (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold font-serif text-gray-900 dark:text-gray-100 mb-6">Bestellübersicht</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 mb-4">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Lieferadresse</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {form.name}<br />
                {form.address}<br />
                {form.zip} {form.city}<br />
                {form.country}
              </p>
              <button onClick={() => setStep(1)} className="text-red-800 dark:text-red-400 text-sm font-semibold hover:underline mt-3 block">
                Ändern
              </button>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">
                {error}
              </div>
            )}

            {!user && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 px-4 py-3 rounded-xl mb-4 text-sm">
                Du bist nicht eingeloggt. <Link to="/login" className="font-bold hover:underline">Anmelden</Link> um die Bestellung zu speichern.
              </div>
            )}

            <button
              onClick={handleOrder}
              disabled={loading || !user}
              className="w-full bg-red-800 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              {loading ? 'Bestellung wird aufgegeben...' : 'Jetzt bestellen'}
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 h-fit">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Deine Bestellung</h3>
            <div className="space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">{item.name} × {item.quantity}</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-4 flex justify-between font-bold">
              <span className="text-gray-900 dark:text-gray-100">Gesamt</span>
              <span className="text-gray-900 dark:text-gray-100">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 3 – Erfolgreich */}
      {step === 3 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold font-serif text-gray-900 dark:text-gray-100 mb-4">Bestellung erfolgreich!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Vielen Dank für deine Bestellung. Wir werden sie so schnell wie möglich bearbeiten.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/shop" className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-semibold hover:bg-red-800 transition-all">
              Weiter einkaufen
            </Link>
            {user && (
              <Link to="/account" className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                Meine Bestellungen
              </Link>
            )}
          </div>
        </div>
      )}
    </main>
  );
}