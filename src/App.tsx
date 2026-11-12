import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BatteryCharging,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  PlugZap,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sun,
  Wrench,
  X,
  Zap,
  Star,
  Plus,
  Minus,
  Send,
  Filter,
  SlidersHorizontal,
  Lightbulb,
  Cable,
  Fan,
  CircuitBoard,
  Hammer,
  HardHat,
  Building2,
  Home,
  Factory,
  ClipboardCheck,
  Truck,
  Award,
  Headphones,
} from 'lucide-react';
import { api } from '@appdeploy/client';
import BusinessPlatform from './BusinessPlatform';
import KnowledgeCenter from './KnowledgeCenter';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  priceLabel?: string;
  description: string;
  image: string;
  tag?: string;
  specs: string[];
};
type Service = {
  title: string;
  desc: string;
  icon: typeof Zap;
  image: string;
  bullets: string[];
};
const WHATSAPP = '923484092930';
const COMPANY = 'VoltEdge Electricals';
const money = (n: number) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(n);
const wa = (message: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
const services: Service[] = [
  {
    title: 'Residential Wiring',
    desc: 'Safe, organised wiring for new homes, renovations and extensions.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900',
    bullets: [
      'New installation and rewiring',
      'Load planning and circuit protection',
      'Switches, sockets and lighting',
    ],
  },
  {
    title: 'Commercial Electrical',
    desc: 'Dependable electrical fit-outs and maintenance for business spaces.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900',
    bullets: [
      'Office and retail fit-outs',
      'Power distribution and lighting',
      'Preventive maintenance',
    ],
  },
  {
    title: 'Industrial Solutions',
    desc: 'Practical electrical support for workshops, facilities and industry.',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=900',
    bullets: [
      'Equipment connections',
      'Panel and motor wiring',
      'Fault finding and maintenance',
    ],
  },
  {
    title: 'Solar Installation',
    desc: 'Plan and install solar solutions designed around your energy needs.',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900',
    bullets: [
      'Site and load assessment',
      'Panel and inverter installation',
      'System testing and handover',
    ],
  },
  {
    title: 'UPS & Inverters',
    desc: 'Backup power solutions for homes, offices and essential equipment.',
    icon: BatteryCharging,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900',
    bullets: [
      'Capacity recommendations',
      'UPS and inverter installation',
      'Battery and wiring checks',
    ],
  },
  {
    title: 'Repair & Maintenance',
    desc: 'Troubleshooting and repairs to help keep electrical systems reliable.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900',
    bullets: [
      'Electrical fault diagnosis',
      'Repairs and replacement',
      'Routine safety checks',
    ],
  },
  {
    title: 'Lighting Installation',
    desc: 'Thoughtful indoor, outdoor and commercial lighting installations.',
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900',
    bullets: [
      'LED and decorative lighting',
      'Outdoor and security lights',
      'Energy-efficient upgrades',
    ],
  },
  {
    title: 'DB & Safety Inspection',
    desc: 'Distribution board upgrades and checks for safer electrical operation.',
    icon: CircuitBoard,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900',
    bullets: [
      'DB installation and labelling',
      'Breaker and earthing checks',
      'Inspection and recommendations',
    ],
  },
];
const legacySampleProducts: Product[] = [
  {
    id: 1,
    name: 'Copper Building Wire 7/ Standard',
    category: 'Cables & Wires',
    price: 185,
    description:
      'Sample per-metre listing for general building wiring. Confirm gauge and brand before ordering.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700',
    tag: 'Popular',
    specs: [
      'Copper conductor',
      'Sample price per metre',
      'Gauge/brand to be confirmed',
    ],
  },
  {
    id: 2,
    name: 'MCB Circuit Breaker',
    category: 'Circuit Protection',
    price: 1250,
    description:
      'Sample miniature circuit breaker listing. Rating and pole configuration are configurable.',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=700',
    specs: [
      'Sample 1P listing',
      'Current rating to confirm',
      'Brand subject to availability',
    ],
  },
  {
    id: 3,
    name: 'Modular Switch & Socket',
    category: 'Switches & Sockets',
    price: 680,
    description:
      'Modern modular switch accessory for residential and commercial interiors.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=700',
    specs: ['Modular design', 'Finish options available', 'Sample unit price'],
  },
  {
    id: 4,
    name: 'LED Panel Light 18W',
    category: 'LED Lighting',
    price: 1450,
    description:
      'Energy-conscious LED panel light for offices, shops and homes.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700',
    tag: 'Energy saver',
    specs: ['18W sample model', 'Colour temperature to confirm', 'Indoor use'],
  },
  {
    id: 5,
    name: 'Ceiling Fan',
    category: 'Fans',
    price: 8900,
    description:
      'Sample ceiling fan listing. Brand, size and finish can be updated.',
    image: 'https://images.unsplash.com/photo-1618941716939-553df3c6c278?w=700',
    specs: [
      'Sample retail price',
      'Size and colour configurable',
      'Warranty by supplier',
    ],
  },
  {
    id: 6,
    name: 'Distribution Board 8-Way',
    category: 'Distribution Boards',
    price: 4200,
    description: 'Compact distribution board for organised circuit protection.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700',
    specs: [
      '8-way sample configuration',
      'Enclosure type to confirm',
      'Breakers sold separately',
    ],
  },
  {
    id: 7,
    name: 'Solar Hybrid Inverter',
    category: 'Solar & Backup',
    price: 185000,
    description:
      'Sample hybrid inverter listing. Capacity and features must be confirmed.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700',
    tag: 'Solar',
    specs: [
      'Sample 5kW-class price',
      'Model subject to confirmation',
      'Installation quoted separately',
    ],
  },
  {
    id: 8,
    name: 'Digital Multimeter',
    category: 'Tools & Safety',
    price: 3600,
    description: 'General-purpose electrical testing tool for trained users.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=700',
    specs: [
      'Digital display',
      'Model/specification to confirm',
      'Use according to safety instructions',
    ],
  },
];
const products: Product[] = [
  {
    id: 101,
    name: 'Inverex NitroX 8kW SP-Hybrid',
    category: 'Solar Inverters',
    price: 320000,
    priceLabel: 'Rs. 320,000 – 535,000',
    description: '8kW hybrid inverter, 48V battery system and dual output.',
    image: '/resources/inverex-nitrox-8kw.jpg',
    tag: '8kW · 48V',
    specs: ['8kW hybrid inverter', '48V battery system', 'Dual output'],
  },
  {
    id: 102,
    name: 'SunLife SL 6kW Waterproof IP65',
    category: 'Solar Inverters',
    price: 135000,
    priceLabel: 'Rs. 135,000 – 214,000',
    description: '6kW waterproof IP65 inverter, 48V and dual output.',
    image: '/resources/sunlife-sl-6kw-ip65.jpg',
    tag: 'IP65 waterproof',
    specs: ['6kW inverter', 'IP65 waterproof rating', '48V · dual output'],
  },
  {
    id: 103,
    name: 'SunLife 6kW Big Screen',
    category: 'Solar Inverters',
    price: 125000,
    priceLabel: 'Rs. 125,000 – 140,000',
    description: 'SunLife 6kW inverter with large display, 48V and dual output.',
    image: '/resources/sunlife-6kw-big-screen.jpg',
    tag: 'Big screen',
    specs: ['6kW inverter', 'Large display', '48V · dual output'],
  },
  {
    id: 104,
    name: 'Inverex NitroX 6kW Hybrid',
    category: 'Solar Inverters',
    price: 240000,
    priceLabel: 'Rs. 240,000 – 275,000',
    description: 'Inverex NitroX 6kW hybrid inverter, 48V and dual output.',
    image: '/resources/inverex-nitrox-6kw.jpg',
    tag: '6kW · 48V',
    specs: ['6kW hybrid inverter', '48V battery system', 'Dual output'],
  },
];
const projects = [
  {
    title: 'Inverex Solar Installation',
    type: 'Solar',
    image: '/resources/project-technician-inverex.jpg',
    desc: 'A VoltEdge installation featuring an Inverex inverter and battery system.',
  },
  {
    title: 'Crown Inverter Installation',
    type: 'Inverter',
    image: '/resources/project-crown-inverter.jpg',
    desc: 'Crown inverter installation with its control and protection setup.',
  },
  {
    title: 'Sinewave Inverter Control Panel',
    type: 'Electrical Panel',
    image: '/resources/project-sinewave-panel.jpg',
    desc: 'Installed Sinewave solar inverter and electrical control panel.',
  },
  {
    title: 'Inverex Inverter Setup',
    type: 'Inverter',
    image: '/resources/project-inverex-installation.jpg',
    desc: 'Close-up view of an installed Inverex inverter system.',
  },
  {
    title: 'Inverex NitroX Hybrid Inverter',
    type: 'Solar Product',
    image: '/resources/product-inverex-nitrox.jpg',
    desc: 'Inverex NitroX 8kW 48V SP-Hybrid inverter.',
  },
  {
    title: 'Inverter Battery Connections',
    type: 'Electrical Work',
    image: '/resources/project-inverter-connections.jpg',
    desc: 'Inverter battery terminals and system connection details.',
  },
  {
    title: 'Apex Solar Installation',
    type: 'Solar Product',
    image: '/resources/product-apex-solar.jpg',
    desc: 'Apex Solar battery and inverter installation.',
  },
  {
    title: 'Electrical Distribution Board',
    type: 'Electrical Panel',
    image: '/resources/project-distribution-panel.jpg',
    desc: 'Electrical distribution board, breakers and load control panel.',
  },
  {
    title: 'SunLife Solar Inverter',
    type: 'Solar Product',
    image: '/resources/product-sunlife-inverter.jpg',
    desc: 'SunLife solar inverter installation and wiring.',
  },
];
const articles = [
  {
    title: 'Electrical Safety: 7 Checks Every Home Should Know',
    date: 'Learning guide',
    category: 'Safety',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700',
    desc: 'Learn why correct circuit protection, earthing and qualified inspection matter.',
  },
  {
    title: 'Understanding Solar Inverter Basics',
    date: 'Learning guide',
    category: 'Solar',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700',
    desc: 'A simple introduction to inverter capacity, batteries and solar system planning.',
  },
  {
    title: 'Choosing the Right Cable for Your Project',
    date: 'Learning guide',
    category: 'Wiring',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700',
    desc: 'Cable selection depends on load, installation method, distance and local standards.',
  },
];
const categories = [
  'All Products',
  ...Array.from(new Set(products.map(p => p.category))),
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Products');
  const [sort, setSort] = useState('featured');
  const [activeModal, setActiveModal] = useState<Product | Service | null>(
    null
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [serviceChoice, setServiceChoice] = useState('');
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const filtered = useMemo(() => {
    let list = products.filter(
      p =>
        (category === 'All Products' || p.category === category) &&
        (p.name + p.description + p.category)
          .toLowerCase()
          .includes(search.toLowerCase())
    );
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, search, sort]);
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );
  const addToCart = (product: Product) => {
    setCart(old => {
      const found = old.find(i => i.product.id === product.id);
      return found
        ? old.map(i =>
            i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...old, { product, qty: 1 }];
    });
    setNotice(product.name + ' added to your cart');
    window.setTimeout(() => setNotice(''), 2600);
  };
  const changeQty = (id: number, delta: number) =>
    setCart(old =>
      old
        .map(i => (i.product.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter(i => i.qty > 0)
    );
  const openQuote = (service = '') => {
    setServiceChoice(service);
    setForm(f => ({ ...f, service }));
    setQuoteOpen(true);
    setMobileOpen(false);
  };
  const submitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setFormError('Please complete your name, phone number and message.');
      return;
    }
    setSending(true);
    try {
      await api.post('/api/inquiries', { ...form, source: 'website-quote' });
      setNotice(
        'Your request has been received. Our team will contact you soon.'
      );
      setQuoteOpen(false);
      setForm({ name: '', phone: '', email: '', service: '', message: '' });
    } catch {
      const msg = `Hello, my name is ${form.name}. Phone: ${form.phone}. Service: ${form.service || 'General enquiry'}. ${form.message}`;
      window.open(wa(msg), '_blank', 'noopener,noreferrer');
      setFormError(
        'The online request could not be sent. WhatsApp has been opened so you can send your enquiry directly.'
      );
    } finally {
      setSending(false);
      window.setTimeout(() => setNotice(''), 5000);
    }
  };
  const submitOrder = async () => {
    if (!cart.length) return;
    const summary = cart
      .map(
        i => `${i.qty} × ${i.product.name} — ${money(i.product.price * i.qty)}`
      )
      .join('\n');
    const message = `Hello! I would like to request an order quotation:\n${summary}\nEstimated total: ${money(total)}\nPlease confirm availability and final pricing.`;
    try {
      await api.post('/api/inquiries', {
        name: 'Website product order',
        phone: 'Please contact via WhatsApp',
        email: '',
        service: 'Product order',
        message,
        source: 'website-cart',
      });
      setNotice(
        'Order request saved. Continue on WhatsApp to confirm product availability.'
      );
    } catch {
      setNotice('Continue on WhatsApp to send your order request.');
    }
    window.open(wa(message), '_blank', 'noopener,noreferrer');
    setCartOpen(false);
  };
  const nav = [
    ['Home', '#home'],
    ['About', '#about'],
    ['Services', '#services'],
    ['Products', '#products'],
    ['Projects', '#projects'],
    ['Insights', '#knowledge-center'],
    ['Contact', '#contact'],
  ];
  return (
    <div className="site-shell">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            <MapPin size={13} /> Serving Dera Ismail Khan & surrounding areas{' '}
            <i>•</i> <Clock3 size={13} /> Mon–Sat, 9:00 AM–6:00 PM
          </span>
          <span className="top-links">
            <a href="tel:+923484092930">
              <Phone size={13} /> +92 348 4092930
            </a>
            <a
              href={wa('Hello, I have an electrical enquiry.')}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={13} /> WhatsApp us
            </a>
          </span>
        </div>
      </div>
      <header className="header">
        <div className="container nav-wrap">
          <a className="brand" href="#home">
            <span className="brand-mark">
              <Zap size={25} fill="currentColor" />
            </span>
            <span>
              <b>
                VOLT<span>EDGE</span>
              </b>
              <small>ELECTRICAL SOLUTIONS</small>
            </span>
          </a>
          <nav className={mobileOpen ? 'nav-links open' : 'nav-links'}>
            {nav.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-btn cart-trigger"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={19} />
              <span>{cart.reduce((s, i) => s + i.qty, 0)}</span>
            </button>
            <button
              className="btn btn-primary nav-quote"
              onClick={() => openQuote()}
            >
              Get a Quote <ArrowUpRight size={16} />
            </button>
            <button
              className="mobile-toggle"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main>
        <section className="hero" id="home">
          <div className="hero-image"></div>
          <div className="hero-overlay"></div>
          <div className="container hero-content">
            <div className="hero-copy">
              <div className="eyebrow light">
                <span></span> POWERING WHAT MATTERS
              </div>
              <h1>
                Electrical expertise.
                <br />
                <em>Powerful</em> possibilities.
              </h1>
              <p>
                Professional electrical services, quality products and
                dependable solutions for homes, businesses and industry.
              </p>
              <div className="hero-buttons">
                <a className="btn btn-yellow" href="#services">
                  Explore Services <ArrowRight size={17} />
                </a>
                <a className="btn btn-outline-light" href="#products">
                  Browse Products
                </a>
              </div>
              <div className="hero-proof">
                <div className="proof-icon">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <b>Safety-led workmanship</b>
                  <small>Practical solutions. Professional care.</small>
                </div>
                <div className="proof-divider"></div>
                <div>
                  <b>Home · Business · Industry</b>
                  <small>One team for your electrical needs</small>
                </div>
              </div>
            </div>
            <div className="hero-card">
              <span className="hero-card-icon">
                <PlugZap size={24} />
              </span>
              <b>Powering your next project?</b>
              <p>
                Tell us what you need. Get a clear, no-obligation quotation.
              </p>
              <button onClick={() => openQuote()} className="text-link">
                Request a quote <ArrowUpRight size={16} />
              </button>
              <div className="hero-card-line"></div>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>DEPENDABLE BY DESIGN</span>
            <div></div>
            <span>BUILT AROUND YOUR NEEDS</span>
          </div>
        </section>
        <KnowledgeCenter />
        <section className="trust-strip">
          <div className="container trust-grid">
            <div>
              <ShieldCheck />
              <span>
                <b>Safety first</b>
                <small>Work with care</small>
              </span>
            </div>
            <div>
              <BadgeCheck />
              <span>
                <b>Quality focused</b>
                <small>Products & workmanship</small>
              </span>
            </div>
            <div>
              <Headphones />
              <span>
                <b>Helpful support</b>
                <small>From enquiry to handover</small>
              </span>
            </div>
            <div>
              <Award />
              <span>
                <b>Clear quotations</b>
                <small>Know the scope upfront</small>
              </span>
            </div>
          </div>
        </section>
        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div className="about-copy">
              <div className="eyebrow">
                <span></span> WHO WE ARE
              </div>
              <h2>
                More than electrical work.
                <br />
                <em>Complete peace of mind.</em>
              </h2>
              <p className="lead">
                VoltEdge Electricals is a business profile concept built around
                dependable electrical services and carefully selected electrical
                products.
              </p>
              <p>
                From a home wiring project to a commercial installation or a
                solar power enquiry, our goal is to make the process clear,
                practical and customer-focused. Our team profile, credentials
                and company history can be personalised with your real business
                information.
              </p>
              <div className="about-points">
                <div>
                  <Check /> Clear scope & quotations
                </div>
                <div>
                  <Check /> Safety-conscious approach
                </div>
                <div>
                  <Check /> Service and product support
                </div>
                <div>
                  <Check /> Solutions for every scale
                </div>
              </div>
              <a href="#contact" className="under-link">
                More about our approach <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">
                  <span></span> WHAT WE DO
                </div>
                <h2>
                  Electrical solutions
                  <br />
                  <em>for every environment.</em>
                </h2>
              </div>
              <div className="section-head-side">
                <p>
                  From everyday electrical repairs to complete installations,
                  explore services designed around your space and requirements.
                </p>
                <a href="#contact" className="under-link">
                  Discuss your project <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <div className="services-grid">
              {services.map((s, i) => (
                <article className="service-card" key={s.title}>
                  <div className="service-img">
                    <img src={s.image} alt={s.title} />
                    <span className="service-number">0{i + 1}</span>
                    <span className="service-icon">
                      <s.icon size={22} />
                    </span>
                  </div>
                  <div className="service-body">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <button
                      className="card-link"
                      onClick={() => setActiveModal(s)}
                    >
                      Explore service <ArrowUpRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="dark-band">
          <div className="container dark-band-inner">
            <div className="band-icon">
              <Zap size={28} />
            </div>
            <div>
              <div className="eyebrow light">
                <span></span> YOUR PROJECT, OUR PRIORITY
              </div>
              <h2>Need an electrician or a product recommendation?</h2>
              <p>
                Share a few details and we'll help you work out the next step.
              </p>
            </div>
            <button className="btn btn-yellow" onClick={() => openQuote()}>
              Talk to our team <ArrowUpRight size={17} />
            </button>
          </div>
        </section>
        <section className="section products-section" id="products">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">
                  <span></span> THE PRODUCT RANGE
                </div>
                <h2>
                  Quality essentials.
                  <br />
                  <em>Ready for your next job.</em>
                </h2>
              </div>
              <div className="section-head-side">
                <p>
                  Browse sample electrical products and send an enquiry for
                  current stock, brands and final pricing.
                </p>
                <a href="#contact" className="under-link">
                  Need something specific? <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <div className="shop-toolbar">
              <div className="category-pills">
                {categories.map(c => (
                  <button
                    key={c}
                    className={category === c ? 'active' : ''}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="shop-controls">
                <label className="search-box">
                  <Search size={16} />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search products"
                  />
                </label>
                <label className="sort-box">
                  <SlidersHorizontal size={15} />
                  <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="featured">Featured</option>
                    <option value="low">Price: low to high</option>
                    <option value="high">Price: high to low</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="products-grid">
              {filtered.map(p => (
                <article className="product-card" key={p.id}>
                  <div className="product-img">
                    <img src={p.image} alt={p.name} />
                    {p.tag && <span className="product-tag">{p.tag}</span>}
                    <button
                      className="quick-add"
                      aria-label={'Add ' + p.name + ' to cart'}
                      onClick={() => addToCart(p)}
                    >
                      <Plus size={19} />
                    </button>
                  </div>
                  <div className="product-info">
                    <small>{p.category}</small>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <div className="product-bottom">
                      <div>
                        <b>{p.priceLabel || money(p.price)}</b>
                        <small>Price range · confirm availability</small>
                      </div>
                      <button
                        onClick={() => setActiveModal(p)}
                        aria-label={'View ' + p.name}
                      >
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                    <button
                      className="product-wa"
                      onClick={() =>
                        window.open(
                          wa(
                            'Hello, please share details and availability for ' +
                              p.name +
                              '.'
                          ),
                          '_blank',
                          'noopener,noreferrer'
                        )
                      }
                    >
                      <MessageCircle size={14} /> WhatsApp inquiry
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="empty-state">
                No products match your search. Try another term or category.
              </div>
            )}
            <p className="catalog-note">
              <i>ⓘ</i> Inverter photos and price ranges are supplied by VoltEdge Electricals. Final price and availability are confirmed on enquiry.
            </p>
          </div>
        </section>
        <section className="projects-section section" id="projects">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow light">
                  <span></span> WORK THAT POWERS PROGRESS
                </div>
                <h2>
                  Projects built around
                  <br />
                  <em>real-world needs.</em>
                </h2>
              </div>
              <div className="section-head-side">
                <p>
                  Use this gallery to showcase your completed installations. The
                  examples below are illustrative placeholders, not claimed
                  company projects.
                </p>
              </div>
            </div>
            <div className="projects-grid">
              {projects.map((p, i) => (
                <article className="project-card" key={p.title}>
                  <img src={p.image} alt={p.title} />
                  <div className="project-shade"></div>
                  <div className="project-content">
                    <span>
                      {p.type} / GALLERY {i + 1}
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <button
                      onClick={() => openQuote(p.type + ' project enquiry')}
                      aria-label={'Enquire about ' + p.title}
                    >
                      <ArrowUpRight />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="stats-section">
          <div className="container stats-inner">
            <div>
              <span className="stats-label">A BUSINESS BUILT ON TRUST</span>
              <h2>
                Your experience
                <br />
                should speak for itself.
              </h2>
              <p>
                Replace these editable placeholders with verified company
                milestones when ready.
              </p>
            </div>
            <div className="stats-grid">
              <div>
                <b>—</b>
                <span>Projects completed</span>
                <small>ADD VERIFIED TOTAL</small>
              </div>
              <div>
                <b>—</b>
                <span>Happy customers</span>
                <small>ADD VERIFIED TOTAL</small>
              </div>
              <div>
                <b>—</b>
                <span>Years of experience</span>
                <small>ADD VERIFIED YEARS</small>
              </div>
              <div>
                <b>24/7</b>
                <span>Enquiry access</span>
                <small>WEBSITE AVAILABLE</small>
              </div>
            </div>
          </div>
        </section>
        <section className="section insights-section" id="insights">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">
                  <span></span> KNOWLEDGE & INSIGHTS
                </div>
                <h2>
                  Smarter choices start
                  <br />
                  <em>with good information.</em>
                </h2>
              </div>
              <div className="section-head-side">
                <p>
                  Helpful starting points for understanding electrical systems,
                  safety and energy solutions.
                </p>
              </div>
            </div>
            <div className="insights-grid">
              {articles.map(a => (
                <article className="article-card" key={a.title}>
                  <div className="article-img">
                    <img src={a.image} alt={a.title} />
                    <span>{a.category}</span>
                  </div>
                  <div className="article-body">
                    <small>{a.date}</small>
                    <h3>{a.title}</h3>
                    <p>{a.desc}</p>
                    <button
                      className="card-link"
                      onClick={() =>
                        setActiveModal({
                          title: a.title,
                          desc: a.desc,
                          image: a.image,
                          icon: Lightbulb,
                          bullets: [
                            'Always use a qualified electrician for electrical work.',
                            'Follow applicable local electrical codes and manufacturer instructions.',
                            'Have installations inspected and tested before use.',
                          ],
                        } as Service)
                      }
                    >
                      Read article <ArrowUpRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="testimonial-section">
          <div className="container testimonial-inner">
            <div className="testimonial-left">
              <div className="eyebrow light">
                <span></span> CUSTOMER EXPERIENCES
              </div>
              <h2>
                Trust is earned
                <br />
                <em>one job at a time.</em>
              </h2>
              <p>
                Customer feedback belongs here. Add genuine, permission-approved
                reviews before publishing testimonials.
              </p>
            </div>
            <div className="review-placeholder">
              <div className="stars">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <blockquote>
                “Add a genuine customer review here describing their experience
                with your service, communication and completed work.”
              </blockquote>
              <div className="review-person">
                <div className="avatar">CR</div>
                <div>
                  <b>Customer review placeholder</b>
                  <small>Replace with a verified customer</small>
                </div>
                <span>PLACEHOLDER</span>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-section section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <div className="eyebrow">
                <span></span> LET'S CONNECT
              </div>
              <h2>
                Let's get your
                <br />
                <em>project powered.</em>
              </h2>
              <p>
                Have a repair, installation or product enquiry? Tell us what you
                need and we'll help you take the next step.
              </p>
              <div className="contact-list">
                <a href="tel:+923484092930">
                  <span>
                    <Phone />
                  </span>
                  <div>
                    <small>CALL OUR TEAM</small>
                    <b>+92 348 4092930</b>
                  </div>
                </a>
                <a href="mailto:hello@yourcompany.com">
                  <span>
                    <Mail />
                  </span>
                  <div>
                    <small>EMAIL US</small>
                    <b>hello@yourcompany.com</b>
                  </div>
                </a>
                <div>
                  <span>
                    <MapPin />
                  </span>
                  <div>
                    <small>BUSINESS LOCATION</small>
                    <b>Dera Ismail Khan, Pakistan</b>
                  </div>
                </div>
                <div>
                  <span>
                    <Clock3 />
                  </span>
                  <div>
                    <small>WORKING HOURS</small>
                    <b>Monday – Saturday · 9 AM – 6 PM</b>
                  </div>
                </div>
              </div>
              <a
                className="btn btn-dark"
                href={wa(
                  'Hello! I am interested in your electrical services/products. Please provide more information.'
                )}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={17} /> Chat on WhatsApp
              </a>
            </div>
            <form className="contact-form" onSubmit={submitInquiry}>
              <div className="form-head">
                <span>START A CONVERSATION</span>
                <h3>Request a free quotation</h3>
                <p>Fields marked * are required.</p>
              </div>
              <div className="form-row">
                <label>
                  Full name *
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </label>
                <label>
                  Phone number *
                  <input
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+92 3XX XXXXXXX"
                  />
                </label>
              </div>
              <label>
                Email address
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Service required
                <select
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                >
                  <option value="">Choose a service</option>
                  {services.map(s => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                  <option>Electrical products enquiry</option>
                  <option>Other / Not sure</option>
                </select>
              </label>
              <label>
                How can we help? *
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us a little about your project..."
                />
              </label>
              {formError && <div className="form-error">{formError}</div>}
              <button className="btn btn-primary submit-btn" disabled={sending}>
                {sending ? 'Sending request...' : 'Send enquiry'}{' '}
                <Send size={16} />
              </button>
              <small className="privacy-note">
                Your details are used to respond to this enquiry. No payment is
                collected through this form.
              </small>
            </form>
          </div>
        </section>
        <BusinessPlatform />
      </main>
      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <a className="brand brand-light" href="#home">
              <span className="brand-mark">
                <Zap size={25} fill="currentColor" />
              </span>
              <span>
                <b>
                  VOLT<span>EDGE</span>
                </b>
                <small>ELECTRICAL SOLUTIONS</small>
              </span>
            </a>
            <p>
              Electrical services and product enquiries for homes, businesses
              and industry. Reliable solutions start with a conversation.
            </p>
            <div className="socials">
              <a href="#" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#about">About us</a>
            <a href="#services">Our services</a>
            <a href="#products">Product catalogue</a>
            <a href="#projects">Project gallery</a>
            <a href="#insights">Learning centre</a>
          </div>
          <div className="footer-col">
            <h4>Our services</h4>
            {services.slice(0, 5).map(s => (
              <a key={s.title} href="#services">
                {s.title}
              </a>
            ))}
          </div>
          <div className="footer-col footer-contact">
            <h4>Get in touch</h4>
            <span>
              <Phone /> +92 348 4092930
            </span>
            <span>
              <Mail /> hello@yourcompany.com
            </span>
            <span>
              <MapPin /> Dera Ismail Khan, Pakistan
            </span>
            <a
              className="footer-wa"
              href={wa('Hello! I have an electrical enquiry.')}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle /> Message on WhatsApp
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} VoltEdge Electricals. All rights
            reserved.
          </span>
          <span>Professional electrical solutions · Pakistan</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
      <a
        className="floating-wa"
        href={wa(
          'Hello! I am interested in your electrical services/products. Please provide more information.'
        )}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={25} />
        <span>Chat with us</span>
      </a>
      {notice && (
        <div className="toast">
          <Check size={17} />
          {notice}
          <button onClick={() => setNotice('')}>
            <X size={15} />
          </button>
        </div>
      )}
      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside className="drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-head">
              <div>
                <small>YOUR SELECTION</small>
                <h3>Shopping cart ({cart.reduce((s, i) => s + i.qty, 0)})</h3>
              </div>
              <button
                className="close-btn"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <X />
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingCart size={40} />
                <h3>Your cart is empty</h3>
                <p>
                  Explore the product range and add items to request a
                  quotation.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setCartOpen(false);
                    document
                      .getElementById('products')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Browse products
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(i => (
                    <div className="cart-item" key={i.product.id}>
                      <img src={i.product.image} alt="" />
                      <div className="cart-item-info">
                        <b>{i.product.name}</b>
                        <small>{money(i.product.price)} each</small>
                        <div className="qty-control">
                          <button
                            onClick={() => changeQty(i.product.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus />
                          </button>
                          <span>{i.qty}</span>
                          <button
                            onClick={() => changeQty(i.product.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus />
                          </button>
                        </div>
                      </div>
                      <b>{money(i.product.price * i.qty)}</b>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div>
                    <span>Estimated subtotal</span>
                    <b>{money(total)}</b>
                  </div>
                  <p>
                    Sample prices only. Final price, brand and availability will
                    be confirmed by our team.
                  </p>
                  <button className="btn btn-primary" onClick={submitOrder}>
                    Request order on WhatsApp <ArrowUpRight />
                  </button>
                  <button className="clear-cart" onClick={() => setCart([])}>
                    Clear cart
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
      {quoteOpen && (
        <div className="overlay" onClick={() => setQuoteOpen(false)}>
          <div className="modal quote-modal" onClick={e => e.stopPropagation()}>
            <button
              className="close-btn modal-close"
              onClick={() => setQuoteOpen(false)}
              aria-label="Close"
            >
              <X />
            </button>
            <div className="eyebrow">
              <span></span> FREE PROJECT QUOTATION
            </div>
            <h2>
              Tell us what you <em>have in mind.</em>
            </h2>
            <p>
              Share your contact details and a short description. We'll get back
              to you.
            </p>
            <form onSubmit={submitInquiry}>
              <label>
                Your name *
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label>
                Phone number *
                <input
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </label>
              <label>
                Service
                <select
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                >
                  <option value="">Select a service</option>
                  {services.map(s => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                </select>
              </label>
              <label>
                Project details *
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </label>
              {formError && <div className="form-error">{formError}</div>}
              <button className="btn btn-primary submit-btn" disabled={sending}>
                {sending ? 'Sending...' : 'Send quotation request'}{' '}
                <ArrowRight />
              </button>
            </form>
          </div>
        </div>
      )}
      {activeModal && (
        <div className="overlay" onClick={() => setActiveModal(null)}>
          <div
            className="modal detail-modal"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="close-btn modal-close"
              onClick={() => setActiveModal(null)}
              aria-label="Close"
            >
              <X />
            </button>
            <img
              className="detail-image"
              src={activeModal.image}
              alt={activeModal.title}
            />
            <div className="detail-content">
              <div className="eyebrow">
                <span></span>{' '}
                {'category' in activeModal
                  ? activeModal.category
                  : 'SERVICE INFORMATION'}
              </div>
              <h2>{activeModal.title}</h2>
              <p>
                {'description' in activeModal
                  ? activeModal.description
                  : activeModal.desc}
              </p>
              {'price' in activeModal && (
                <h3 className="detail-price">
                  {'priceLabel' in activeModal && activeModal.priceLabel ? activeModal.priceLabel : money(activeModal.price)} <small>price range</small>
                </h3>
              )}
              <ul>
                {('specs' in activeModal
                  ? activeModal.specs
                  : activeModal.bullets
                ).map(x => (
                  <li key={x}>
                    <Check size={15} />
                    {x}
                  </li>
                ))}
              </ul>
              <div className="detail-actions">
                {'price' in activeModal && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      addToCart(activeModal);
                      setActiveModal(null);
                    }}
                  >
                    <ShoppingCart size={16} /> Add to cart
                  </button>
                )}
                <button
                  className="btn btn-dark"
                  onClick={() =>
                    window.open(
                      wa(
                        'Hello, I would like more information about ' +
                          activeModal.title +
                          '.'
                      ),
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                >
                  <MessageCircle size={16} /> WhatsApp enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
