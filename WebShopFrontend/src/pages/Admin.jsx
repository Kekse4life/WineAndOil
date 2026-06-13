import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5003';

export default function Admin() {
  const { user, token, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (!isAdmin) { navigate('/account'); return; }

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${apiUrl}/api/admin/orders`, { headers }).then(r => r.json()),
      fetch(`${apiUrl}/api/admin/users`, { headers }).then(r => r.json()),
    ]).then(([ordersData, usersData]) => {
      setOrders(ordersData);
      setUsers(usersData);
    }).finally(() => setLoading(false));
  }, [user]);

  const updateOrderStatus = async (id, status) => {
    await fetch(`${apiUrl}/api/admin/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const updateUserRole = async (id, role) => {
    await fetch(`${apiUrl}/api/admin/users/${id}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role })
    });
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
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

  if (loading) return <main className="flex items-center justify-center min-h-[70vh]"><p className="text-gray-500 italic">Laden…</p></main>;

  return (
    <main className="max-w-6xl mx-auto py-12 px-4 md:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold font-serif text-gray-900 dark:text-gray-100">Admin Panel</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">💎 Diamond</p>
        </div>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-sm"
        >
          Abmelden
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'orders' ? 'border-red-800 text-red-800 dark:text-red-400 dark:border-red-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          📦 Bestellungen ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'users' ? 'border-red-800 text-red-800 dark:text-red-400 dark:border-red-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          👥 User ({users.length})
        </button>
      </div>

      {/* Bestellungen Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-gray-400 dark:text-gray-500 italic text-center py-12">Noch keine Bestellungen.</p>
          ) : orders.map(order => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">Bestellung #{order.id}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.user?.name} – {order.user?.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString('de-AT')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">📍 {order.shippingAddress}, {order.shippingZip} {order.shippingCity}, {order.shippingCountry}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <select
                    value={order.status}
                    onChange={e => updateOrderStatus(order.id, e.target.value)}
                    className="text-xs px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1 border-t border-gray-100 dark:border-gray-700 pt-4">
                {order.items?.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{item.product?.name} × {item.quantity}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">€ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-900 dark:text-gray-100">Gesamt</span>
                  <span className="text-gray-900 dark:text-gray-100">€ {order.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-3">
          {users.map(u => (
            <div key={u.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900 dark:text-gray-100">{u.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{u.email}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Registriert: {new Date(u.createdAt).toLocaleDateString('de-AT')}</p>
              </div>
              <select
                value={u.role}
                onChange={e => updateUserRole(u.id, e.target.value)}
                className="text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="normal">Normal</option>
                <option value="diamond">💎 Diamond</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}