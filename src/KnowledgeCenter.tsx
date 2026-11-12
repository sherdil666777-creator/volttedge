import { BatteryCharging, Cable, Mail, MessageCircle, ShieldCheck, Sun, Wrench, Zap } from 'lucide-react';

const informationTopics = [
  { icon: Zap, title: 'Solar inverters & models', description: 'Get guidance on inverter brands, models, capacities, phases, hybrid, on-grid and off-grid systems, MPPT, outputs and specifications.' },
  { icon: BatteryCharging, title: 'Lithium batteries & batteryless systems', description: 'Ask about lithium battery types, capacity, voltage, BMS compatibility, backup planning and inverter models that support batteryless operation.' },
  { icon: Sun, title: 'Solar panels & specifications', description: 'Learn about panel brands, wattage, technologies, efficiency, datasheets, string design and choosing panels for your system.' },
  { icon: Cable, title: 'Wires & cables', description: 'Get help understanding AC/DC cables, copper and aluminium conductors, cable sizes, ratings and suitable applications.' },
  { icon: ShieldCheck, title: 'Electrical protection devices', description: 'Ask about MCB, MCCB, SPD, RCCB, RCBO, fuses, breakers, earthing and protection requirements.' },
  { icon: Wrench, title: 'Solar installation & electrical wiring', description: 'Discuss solar system installation, inverter connections, electrical wiring, troubleshooting, maintenance and safety.' },
  { icon: Zap, title: 'Any other electrical or solar component', description: 'Need information about another product, accessory, tool or electrical component? Contact our team and tell us what you need.' },
];

const whatsappUrl = 'https://wa.me/923484092930?text=Hello%20VoltEdge%2C%20I%20need%20information%20about%20an%20electrical%20or%20solar%20product.';
const emailUrl = 'mailto:voltedge1209@gmail.com?subject=Electrical%20%26%20Solar%20Information';

export default function KnowledgeCenter() {
  return (
    <section
      className="knowledge-center"
      id="knowledge-center"
      style={{ padding: 'clamp(48px, 7vw, 88px) 20px', background: 'linear-gradient(180deg, #f7fafc 0%, #ffffff 100%)' }}
    >
      <div className="kc-container" style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ maxWidth: 790, margin: '0 auto 38px', textAlign: 'center' }}>
          <div
            className="kc-eyebrow"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, color: '#0f766e', fontWeight: 700, letterSpacing: '0.12em', fontSize: 12, marginBottom: 16 }}
          >
            <Zap size={16} /> VOLTEDGE EXPERT GUIDANCE
          </div>
          <h2 style={{ color: '#102a43', fontSize: 'clamp(30px, 4.5vw, 46px)', lineHeight: 1.12, fontWeight: 800, margin: '0 0 14px' }}>
            Electrical &amp; Solar Information
          </h2>
          <h3 style={{ color: '#0f766e', fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700, margin: '0 0 16px' }}>
            Get Expert Guidance
          </h3>
          <p style={{ color: '#526477', fontSize: 17, lineHeight: 1.8, margin: 0 }}>
            Want to learn about any electrical or solar product? Contact us through WhatsApp or Email, and our team will provide you with the information you need.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 16,
            marginBottom: 34,
          }}
        >
          {informationTopics.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 15,
                padding: '22px 20px',
                background: '#ffffff',
                border: '1px solid #e4ebf1',
                borderRadius: 14,
                boxShadow: '0 5px 20px rgba(16, 42, 67, 0.045)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: '0 0 44px',
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  color: '#0f766e',
                  background: '#e8f5f3',
                }}
              >
                <Icon size={21} />
              </span>
              <div>
                <h4 style={{ color: '#16324f', fontSize: 16, fontWeight: 700, lineHeight: 1.4, margin: '1px 0 7px' }}>
                  {index + 1}. {title}
                </h4>
                <p style={{ color: '#607286', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{description}</p>
              </div>
            </article>
          ))}
        </div>

        <div
          style={{
            textAlign: 'center',
            padding: 'clamp(24px, 4vw, 38px)',
            borderRadius: 18,
            background: '#102a43',
            color: '#ffffff',
          }}
        >
          <h3 style={{ color: '#ffffff', fontSize: 'clamp(21px, 3vw, 27px)', fontWeight: 750, margin: '0 0 10px' }}>
            Talk to the VoltEdge Team
          </h3>
          <p style={{ color: '#d6e2ed', fontSize: 15, lineHeight: 1.7, margin: '0 auto 22px', maxWidth: 620 }}>
            Tell us which product or topic you want to understand. We will be happy to guide you.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                minHeight: 48,
                padding: '12px 22px',
                borderRadius: 9,
                background: '#16a34a',
                color: '#ffffff',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <MessageCircle size={19} /> WhatsApp: +923484092930
            </a>
            <a
              href={emailUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                minHeight: 48,
                padding: '12px 22px',
                borderRadius: 9,
                background: '#ffffff',
                color: '#102a43',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <Mail size={19} /> voltedge1209@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
