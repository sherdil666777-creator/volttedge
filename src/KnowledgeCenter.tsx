import { Mail, MessageCircle } from 'lucide-react';

const whatsappUrl = 'https://wa.me/923484092930?text=Hello%20VoltEdge%2C%20I%20need%20information%20about%20an%20electrical%20or%20solar%20product.';
const emailUrl = 'mailto:voltedge1209@gmail.com?subject=Electrical%20%26%20Solar%20Information';

const informationTopics = [
  'Solar inverters and their models.',
  'Lithium batteries and batteryless systems.',
  'Solar panels and their specifications.',
  'Electrical wires and cables.',
  'MCB, MCCB, SPD and protection devices.',
  'Solar installation and electrical wiring.',
  'Any other electrical or solar component.',
];

export default function KnowledgeCenter() {
  return (
    <section
      className="knowledge-center"
      id="knowledge-center"
      style={{ padding: 'clamp(44px, 6vw, 72px) 20px', background: 'linear-gradient(180deg, #f7fafc 0%, #ffffff 100%)' }}
    >
      <div className="kc-container" style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 26px' }}>
          <p style={{ color: '#0f766e', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', margin: '0 0 13px' }}>
            VOLTEDGE
          </p>
          <h2 style={{ color: '#102a43', fontSize: 'clamp(28px, 4.5vw, 42px)', lineHeight: 1.15, fontWeight: 800, margin: '0 0 12px' }}>
            Electrical &amp; Solar Information – Get Expert Guidance
          </h2>
          <p style={{ color: '#526477', fontSize: 16, lineHeight: 1.8, margin: 0 }}>
            Want to learn about any electrical or solar product? Contact us through WhatsApp or Email, and our team will provide you with the information you need.
          </p>
        </div>

        <div style={{ maxWidth: 700, margin: '0 auto 30px', padding: '22px clamp(18px, 4vw, 30px)', border: '1px solid #e5edf2', borderRadius: 14, background: '#ffffff' }}>
          <p style={{ color: '#16324f', fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>
            Customers can ask us about:
          </p>
          <ul style={{ color: '#526477', fontSize: 15, lineHeight: 1.85, margin: 0, paddingLeft: 22, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', columnGap: 28, rowGap: 3 }}>
            {informationTopics.map((topic) => <li key={topic}>{topic}</li>)}
          </ul>
        </div>

        <div style={{ textAlign: 'center', padding: 'clamp(24px, 4vw, 34px) 18px', borderRadius: 16, background: '#102a43' }}>
          <h3 style={{ color: '#ffffff', fontSize: 'clamp(20px, 3vw, 25px)', fontWeight: 750, margin: '0 0 9px' }}>
            Contact VoltEdge
          </h3>
          <p style={{ color: '#d6e2ed', fontSize: 14, lineHeight: 1.7, margin: '0 auto 20px', maxWidth: 580 }}>
            Choose WhatsApp or Email and tell us what information you need.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 48, padding: '12px 22px', borderRadius: 9, background: '#16a34a', color: '#ffffff', fontWeight: 700, textDecoration: 'none' }}>
              <MessageCircle size={19} /> WhatsApp Us: +923484092930
            </a>
            <a href={emailUrl} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 48, padding: '12px 22px', borderRadius: 9, background: '#ffffff', color: '#102a43', fontWeight: 700, textDecoration: 'none' }}>
              <Mail size={19} /> Email Us: voltedge1209@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
