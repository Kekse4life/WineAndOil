import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// --- 1. KOMPONENTE: HOME (Story + Herstellung) ---
const Home = () => (
  <main>
    <section className="relative h-[60vh] bg-neutral-900 flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-stone-900 to-black opacity-80">
        <img src="/images/ressidence02.jpeg" alt="Background" className="absolute inset-0 w-full h-full object-cover -z-10" />
      </div>
      <div className="relative z-10 text-center px-4">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 italic">Vom Hain ins Glas</h2>
        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-gray-300">Echte Handarbeit auf unserem Grundstück.</p>
        <Link to="/shop" className="mt-8 inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-red-800 hover:text-white transition-all">
          Zum Shop
        </Link>
      </div>
    </section>

    <section className="max-w-7xl mx-auto py-20 px-8 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-6 font-serif border-b-2 border-red-800 inline-block pb-2">Unsere Herstellung</h3>
        <div className="space-y-8 mt-6">
          <div className="flex gap-4">
            <span className="text-4xl">🍇</span>
            <div>
              <h4 className="font-bold text-lg text-red-900 font-serif">Traditionelle Weinlese</h4>
              <p className="text-gray-600">Handverlesen auf unserem Grundstück und direkt vor Ort gepresst.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-4xl">🌿</span>
            <div>
              <h4 className="font-bold text-lg text-green-900 font-serif">Kaltgepresstes Olivenöl</h4>
              <p className="text-gray-600">Mechanisch kaltgepresst am Tag der Ernte für maximales Aroma.</p>
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

// --- 2. KOMPONENTE: SHOP ---
const Shop = ({ products, addToCart }) => (
  <main className="max-w-7xl mx-auto py-12 px-8">
    <div className="flex justify-between items-end mb-12 border-b pb-6">
      <div>
        <h2 className="text-4xl font-bold text-gray-900 font-serif">Unser Sortiment</h2>
        <p className="text-gray-500 mt-2 italic">Hofeigene Erzeugnisse von höchster Qualität.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden flex flex-col">
          <div className="h-48 bg-gray-50 flex items-center justify-center italic text-gray-300 border-b border-gray-50 text-sm">
            <img src={`/images/${product.image}`} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-800 transition-colors">{product.name}</h3>
            <p className="text-2xl font-light text-gray-900 mt-auto">{product.price.toFixed(2)} €</p>
            <button
              onClick={() => addToCart(product)}
              className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl hover:bg-red-800 transition-all font-semibold active:scale-95 shadow-md shadow-gray-200"
            >
              &#43; In den Warenkorb
            </button>
          </div>
        </div>
      ))}
    </div>
  </main>
);

// --- 3. KOMPONENTE: WARENKORB ---
const Cart = ({ cartItems }) => (
  <main className="max-w-3xl mx-auto py-12 px-8 text-gray-900">
    <h2 className="text-3xl font-bold mb-8 font-serif">Dein Warenkorb</h2>
    {cartItems.length === 0 ? (
      <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
        <p className="text-gray-400 text-lg">Dein Warenkorb ist noch leer.</p>
        <Link to="/shop" className="text-red-800 font-bold mt-4 inline-block hover:underline">Jetzt einkaufen</Link>
      </div>
    ) : (
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <p className="font-bold text-lg">{item.name}</p>
              <p className="text-sm text-gray-500">Exklusive Handarbeit</p>
            </div>
            <p className="font-bold text-gray-900">{item.price.toFixed(2)} €</p>
          </div>
        ))}
        <div className="bg-gray-900 text-white p-8 rounded-3xl mt-12 shadow-2xl">
          <div className="flex justify-between text-xl font-bold border-b border-gray-700 pb-4 mb-6">
            <span>Gesamtsumme:</span>
            <span>{cartItems.reduce((s, i) => s + i.price, 0).toFixed(2)} €</span>
          </div>
          <button className="w-full bg-red-800 hover:bg-red-700 py-4 rounded-xl font-bold transition-all transform active:scale-[0.98]">
            Sicher zur Kasse gehen
          </button>
        </div>
      </div>
    )}
  </main>
);

// --- 4. Impressum ---
const Impressum = () => (
  <main className="max-w-4xl mx-auto py-16 px-8 text-gray-800">
    <h2 className="text-4xl font-bold mb-8 font-serif border-b pb-4">Impressum</h2>

    <div className="space-y-8">
      {/* 1. Informationen gemäß § 5 ECG und Offenlegung gemäß § 25 MedienG */}
      <section>
        <h3 className="text-xl font-bold mb-2 text-red-800">Informationen gemäß § 5 ECG</h3>
        <p className="leading-relaxed">
          Daniel [Dein Nachname]<br />
          [Deine Straße Hausnummer]<br />
          [PLZ Ort]<br />
          Österreich
        </p>
      </section>

      {/* 2. Kontaktdaten */}
      <section>
        <h3 className="text-xl font-bold mb-2 text-red-800">Kontakt</h3>
        <p className="leading-relaxed">
          E-Mail: [Deine E-Mail-Adresse]<br />
          Telefon: [Deine Telefonnummer]
        </p>
      </section>

      {/* 3. Berufsrechtliche Informationen (Wichtig in Österreich) */}
      <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
        <h3 className="text-xl font-bold mb-4">Weitere Informationen</h3>
        <ul className="space-y-3 text-sm">
          <li><strong>Mitglied bei:</strong> Wirtschaftskammer [Bundesland, z.B. Wien]</li>
          <li><strong>Berufsrecht:</strong> Gewerbeordnung: <a href="https://www.ris.bka.gv.at" target="_blank" className="text-red-800 underline">www.ris.bka.gv.at</a></li>
          <li><strong>Aufsichtsbehörde/Gewerbebehörde:</strong> Bezirkshauptmannschaft [Dein Bezirk]</li>
          <li><strong>Berufsbezeichnung:</strong> [z.B. Handelsgewerbe]</li>
          <li><strong>Verleihungsstaat:</strong> Österreich</li>
        </ul>
      </section>

      {/* 4. Online-Streitbeilegung */}
      <section>
        <h3 className="text-xl font-bold mb-2 text-red-800">Online-Streitbeilegung</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Verbraucher haben die Möglichkeit, Beschwerden an die Online-Streitbeilegungsplattform der EU zu richten:
          <a href="https://ec.europa.eu/consumers/odr/" className="text-red-800 underline ml-1" target="_blank" rel="noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>.
          Sie können allfällige Beschwerde auch an die oben angegebene E-Mail-Adresse richten.
        </p>
      </section>

      {/* 5. Urheberrecht */}
      <section>
        <h3 className="text-xl font-bold mb-2 text-red-800">Urheberrecht</h3>
        <p className="text-sm text-gray-500 leading-relaxed italic">
          Die Inhalte dieser Website (Fotos, Texte, Videos) unterliegen dem Urheberrecht. Bitte fragen Sie uns, bevor Sie die Inhalte dieser Website verbreiten, vervielfältigen oder verwerten wie gar auf anderen Websites erneut veröffentlichen.
        </p>
      </section>
    </div>
  </main>
);
// --- HAUPT-APP ---
function App() {
  const [products] = useState([
    { id: 1, name: "Premium Olivenöl", price: 18.50, image: "wine01.jpeg" },
    { id: 2, name: "Rotwein Riserva", price: 24.90, image: "wine01.jpeg" },
    { id: 3, name: "Weißwein Chardonnay", price: 14.20, image: "wine01.jpeg" },
    { id: 4, name: "Balsamico Essig", price: 12.00, image: "wine01.jpeg" },
  ]);

  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-red-100 selection:text-red-900">

        {/* Navigation */}
        <nav className="bg-white/90 backdrop-blur-md shadow-sm p-4 sticky top-0 z-50 flex justify-between items-center px-8 border-b border-gray-100">
          <Link to="/" className="text-2xl font-bold text-red-800 tracking-tighter flex items-center gap-2">
            WINE & OIL
          </Link>

          <div className="flex gap-10 items-center font-semibold text-gray-700">
            <Link to="/" className="hover:text-red-800 transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-red-800 transition-colors">Shop</Link>
            <Link to="/cart" className="bg-gray-900 text-white px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-red-800 transition-all shadow-lg hover:shadow-red-200">
              <span className="text-lg">🛒</span>
              <span>Warenkorb ({cartItems.length})</span>
            </Link>
          </div>
        </nav>

        {/* Seiten-Inhalt */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop products={products} addToCart={(p) => setCartItems([...cartItems, p])} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} />} />
            <Route path="/impressum" element={<Impressum />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 p-12 text-center">
          <div className="flex justify-center gap-10 mb-6 font-semibold text-gray-500">
            <Link to="/" className="hover:text-red-800">Startseite</Link>
            <Link to="/shop" className="hover:text-red-800">Produkte</Link>
            <Link to="/impressum" className="hover:text-red-800">Impressum</Link>
          </div>
          <p className="text-gray-400 text-sm">© 2026 Wine & Oil &ndash; Ein Projekt von Daniel.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;