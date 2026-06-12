import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRegionDetector } from './hooks/useRegionDetector'
import { useDarkMode } from './hooks/useDarkMode';

const euro = new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' });
const [darkMode, setDarkMode] = useDarkMode();

// --- 1. KOMPONENTE: HOME ---
const Home = () => {
  const { t } = useTranslation();
  return (
    <main>
      <section className="relative h-[60vh] bg-neutral-900 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-stone-900 to-black opacity-80">
          <img src="/images/ressidence02.jpeg" alt="Background" className="absolute inset-0 w-full h-full object-cover -z-10" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 italic">{t('hero.title')}</h2>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-gray-300">{t('hero.subtitle')}</p>
          <Link to="/shop" className="mt-8 inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-red-800 hover:text-white transition-all">
            {t('hero.cta')}
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-20 px-8 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6 font-serif border-b-2 border-red-800 inline-block pb-2">{t('production.title')}</h3>
          <div className="space-y-8 mt-6">
            <div className="flex gap-4">
              <span className="text-4xl">🍇</span>
              <div>
                <h4 className="font-bold text-lg text-red-900 font-serif">{t('production.wine.title')}</h4>
                <p className="text-gray-600">{t('production.wine.desc')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-4xl">🌿</span>
              <div>
                <h4 className="font-bold text-lg text-green-900 font-serif">{t('production.oil.title')}</h4>
                <p className="text-gray-600">{t('production.oil.desc')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative bg-gray-100 h-80 rounded-3xl flex items-center justify-center text-gray-400 italic shadow-inner border border-gray-200 text-center p-6">
          <img src="/images/ressidence01.jpeg" alt="Our Residence" className="w-full h-full object-cover rounded-3xl" />
        </div>
      </section>
    </main>
  );
};

// --- 2. KOMPONENTE: SHOP ---
const Shop = ({ products, loading, error, addToCart }) => {
  const { t } = useTranslation();
  return (
    <main className="max-w-7xl mx-auto py-12 px-8">
      <div className="flex justify-between items-end mb-12 border-b pb-6">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 font-serif">{t('shop.title')}</h2>
          <p className="text-gray-500 mt-2 italic">{t('shop.subtitle')}</p>
        </div>
      </div>
      {loading && <p className="text-gray-500 italic">Produkte werden geladen…</p>}
      {error && <p className="text-red-700">Fehler beim Laden der Produkte: {error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden flex flex-col">
              <div className="h-48 bg-gray-50 flex items-center justify-center italic text-gray-300 border-b border-gray-50 text-sm">
                <img src={`/images/${product.imageUrl}`} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-800 transition-colors">{product.name}</h3>
                <p className="text-2xl font-light text-gray-900 mt-auto">{euro.format(product.price)}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl hover:bg-red-800 transition-all font-semibold active:scale-95 shadow-md shadow-gray-200"
                >
                  &#43; {t('nav.cart')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

// --- 3. KOMPONENTE: WARENKORB ---
const Cart = ({ cartItems, updateQuantity, removeItem }) => {
  const { t } = useTranslation();
  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  return (
    <main className="max-w-3xl mx-auto py-12 px-8 text-gray-900">
      <h2 className="text-3xl font-bold mb-8 font-serif">{t('cart.title')}</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-lg">{t('cart.empty', 'Dein Warenkorb ist noch leer.')}</p>
          <Link to="/shop" className="text-red-800 font-bold mt-4 inline-block hover:underline">{t('cart.cta', 'Jetzt einkaufen')}</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <p className="font-bold text-lg">{item.name}</p>
                <p className="text-sm text-gray-500">{t('cart.subtitle')}</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold" aria-label="Menge verringern">−</button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold" aria-label="Menge erhöhen">+</button>
                <p className="font-bold text-gray-900 w-24 text-right">{euro.format(item.price * item.quantity)}</p>
                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-700 ml-2" aria-label="Aus Warenkorb entfernen">✕</button>
              </div>
            </div>
          ))}
          <div className="bg-gray-900 text-white p-8 rounded-3xl mt-12 shadow-2xl">
            <div className="flex justify-between text-xl font-bold border-b border-gray-700 pb-4 mb-6">
              <span>{t('cart.total')}</span>
              <span>{euro.format(total)}</span>
            </div>
            <button className="w-full bg-red-800 hover:bg-red-700 py-4 rounded-xl font-bold transition-all transform active:scale-[0.98]">
              {t('cart.checkout', 'Sicher zur Kasse gehen')}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

// --- 4. Impressum ---
const Impressum = () => {
  const { t } = useTranslation();
  return (
    <main className="max-w-4xl mx-auto py-16 px-8 text-gray-800">
      <h2 className="text-4xl font-bold mb-8 font-serif border-b pb-4">{t('imprint.title')}</h2>
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold mb-2 text-red-800">{t('imprint.info_title')}</h3>
          <p className="leading-relaxed">
            Daniel Fida<br />Musterstraße 1<br />1210 Wien<br />Österreich
          </p>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-2 text-red-800">{t('imprint.contact_title')}</h3>
          <p className="leading-relaxed">
            E-Mail: danielfida08@gmail.com<br />Telefon: +43 677 123 456 78
          </p>
        </section>
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold mb-4">{t('imprint.more_title')}</h3>
          <ul className="space-y-3 text-sm">
            <li><strong>{t('imprint.member')}</strong> Wirtschaftskammer Muster</li>
            <li><strong>{t('imprint.law')}</strong> Gewerbeordnung: <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-red-800 underline">www.ris.bka.gv.at</a></li>
            <li><strong>{t('imprint.authority')}</strong> Bezirkshauptmannschaft Floridsdorf</li>
            <li><strong>{t('imprint.profession')}</strong> Mustergewerbe</li>
            <li><strong>{t('imprint.country')}</strong> Österreich</li>
          </ul>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-2 text-red-800">{t('imprint.dispute_title')}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t('imprint.dispute_text')}
            <a href="https://ec.europa.eu/consumers/odr/" className="text-red-800 underline ml-1" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-2 text-red-800">{t('imprint.copyright_title')}</h3>
          <p className="text-sm text-gray-500 leading-relaxed italic">{t('imprint.copyright_text')}</p>
        </section>
      </div>
    </main>
  );
};

// --- SPRACHWÄHLER ---
const LanguageSwitcher = ({ onSelect }) => {
  const { i18n } = useTranslation();
  const languages = [
    { code: 'de', label: 'DE' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'it', label: 'IT' },
    { code: 'es', label: 'ES' },
    { code: 'hr', label: 'HR' },
    { code: 'sr', label: 'SR' },
    { code: 'bs', label: 'BS' },
    { code: 'sl', label: 'SL' },
  ];
  return (
    <div className="flex flex-wrap gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => { i18n.changeLanguage(lang.code); onSelect?.(); }}
          className={`px-2 py-1 text-xs rounded font-bold transition-all ${i18n.language === lang.code
              ? 'bg-red-800 text-white'
              : 'text-gray-500 hover:text-red-800'
            }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

// --- BURGER MENU ---
const BurgerMenu = ({ cartCount, darkMode, setDarkMode }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  // Menu schließen wenn außerhalb geklickt
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('#burger-menu')) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div id="burger-menu" className="relative">

      {/* Burger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-gray-100 transition-all"
        aria-label="Menu öffnen"
      >
        <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-14 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">

          {/* Navigation Links */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Navigation</p>
            <div className="flex flex-col gap-1">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 font-semibold transition-all">
                🏠 {t('nav.home')}
              </Link>
              <Link to="/shop" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 font-semibold transition-all">
                🛍️ {t('nav.shop')}
              </Link>
              <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-gray-700 font-semibold transition-all">
                🛒 {t('nav.cart')} ({cartCount})
              </Link>
            </div>
          </div>

          {/* Sprache */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Sprache</p>
            <LanguageSwitcher onSelect={() => setOpen(false)} />
          </div>

          {/* 🌙 DARK MODE */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Darstellung</p>
            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${darkMode ? 'bg-red-800' : 'bg-gray-200'
                  }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${darkMode ? 'left-7' : 'left-1'
                  }`} />
              </button>
            </div>
          </div>

          {/* 💱 WÄHRUNG – hier einbauen */}
          <div className="p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Währung</p>
            <div className="px-3 py-2.5 rounded-xl bg-gray-50 text-gray-400 text-sm italic">
              {/* TODO: Currency Switcher hier einfügen */}
              Currency Switcher coming soon...
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

// --- HAUPT-APP ---
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const { t } = useTranslation();

  useRegionDetector();

  useEffect(() => {
    const controller = new AbortController();
    const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5003';
    fetch(`${apiUrl}/api/products`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      quantity <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const removeItem = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const cartCount = useMemo(() => cartItems.reduce((n, i) => n + i.quantity, 0), [cartItems]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans selection:bg-red-100 selection:text-red-900">

        {/* Navigation */}
        <nav className="bg-white/90 backdrop-blur-md shadow-sm p-4 sticky top-0 z-50 flex justify-between items-center px-8 border-b border-gray-100">
          <Link to="/" className="text-2xl font-bold text-red-800 tracking-tighter">
            WINE & OIL
          </Link>
          <BurgerMenu cartCount={cartCount} darkMode={darkMode} setDarkMode={setDarkMode} />
        </nav>

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop products={products} loading={loading} error={error} addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} />} />
            <Route path="/impressum" element={<Impressum />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 p-12 text-center">
          <div className="flex justify-center gap-10 mb-6 font-semibold text-gray-500">
            <Link to="/" className="hover:text-red-800">{t('footer.home')}</Link>
            <Link to="/shop" className="hover:text-red-800">{t('footer.products')}</Link>
            <Link to="/impressum" className="hover:text-red-800">{t('footer.imprint')}</Link>
          </div>
          <p className="text-gray-400 text-sm">{t('footer.copy')}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;