import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5003';

export default function Account() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetch(`${apiUrl}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 md:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold font-serif text-gray-900 dark:text-gray-100">Mein Konto</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Willkommen, {user?.name}!</p>
        </div>
        <div className="flex gap-3">
          {user?.isAdmin && (
            <Link to="/admin" className="px-4 py-2 bg-red-800 text-white rounded-xl font-semibold hover:bg-red-700 transition-all text-sm">
              Admin Panel
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-sm"
          >
            Abmelden
          </button>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 mb-8">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Kontoinformationen</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Name</p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{user?.name}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">E-Mail</p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Bestellungen */}
      <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4">Meine Bestellungen</h3>
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 italic">Bestellungen werden geladen…</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-gray-400 dark:text-gray-500 text-lg">Noch keine Bestellungen.</p>
          <Link to="/shop" className="text-red-800 dark:text-red-400 font-bold mt-4 inline-block hover:underline">
            Jetzt einkaufen
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">Bestellung #{order.id}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('de-AT')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="space-y-2">
                {order.items?.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{item.product?.name} × {item.quantity}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">€ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-4 flex justify-between">
                <span className="font-bold text-gray-900 dark:text-gray-100">Gesamt</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">€ {order.total?.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}