"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    petName: "",
    petType: "Dog",
    service: "Wellness Exam",
    date: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "Are you accepting new pet patients?",
      a: "Yes! We warmly welcome new dog, cat, and pocket pet patients. We suggest scheduling an initial introductory consultation so our veterinary team can review medical histories and establish a baseline.",
    },
    {
      q: "What should I bring to my pet's first appointment?",
      a: "Please bring any prior vaccination or medical records from previous clinics, a sample of their current food brand, and their favorite treats or blanket to help keep them at ease.",
    },
    {
      q: "How does 24/7 emergency care work at Petling?",
      a: "Our emergency triage unit is staffed around the clock. If you have an urgent medical crisis, call our 24/7 emergency hotline at (555) 838-PETS or come directly to our emergency intake entrance.",
    },
    {
      q: "Do you offer holiday boarding and grooming?",
      a: "Yes, our luxury daycare and boarding suites operate 365 days a year. Since holidays book quickly, we recommend reserving suites 3 to 4 weeks in advance.",
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <section
        style={{
          background: "linear-gradient(180deg, #fff7ed 0%, #fcfbfa 100%)",
          padding: "5rem 0 3.5rem",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <span className="badge" style={{ marginBottom: "1rem" }}>
            Reach Out to Petling
          </span>
          <h1
            style={{
              fontSize: "3.2rem",
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
            }}
          >
            Contact & Appointments
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#475569", lineHeight: 1.7 }}>
            Have a question, need to schedule a wellness visit, or looking to inquire
            about adoption? Send us a message or call our friendly pet concierge.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Info Cards */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.25fr 0.75fr",
              gap: "3.5rem",
              alignItems: "start",
            }}
          >
            {/* Form Column */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                border: "1px solid var(--border-color)",
                padding: "2.5rem",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: "0.5rem",
                }}
              >
                Schedule an Appointment or Ask a Question
              </h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.95rem",
                  marginBottom: "2rem",
                }}
              >
                Fill out the form below and our team will get back to you within 2 business hours.
              </p>

              {submitted ? (
                <div
                  style={{
                    padding: "2.5rem",
                    borderRadius: "16px",
                    background: "#f0fdf4",
                    border: "1.5px solid #86efac",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉 🐾</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#166534" }}>
                    Thank You, {formData.fullName || "Pet Parent"}!
                  </h3>
                  <p
                    style={{
                      color: "#15803d",
                      margin: "0.75rem 0 1.5rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Your request for <strong>{formData.petName || "your companion"}</strong> has been
                    received. We will contact you at <strong>{formData.email}</strong> shortly to
                    confirm your preferred timing.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        petName: "",
                        petType: "Dog",
                        service: "Wellness Exam",
                        date: "",
                        message: "",
                      });
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.25rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "#334155",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Jessica Taylor"
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem",
                          borderRadius: "12px",
                          border: "1px solid var(--border-color)",
                          fontSize: "0.95rem",
                          outline: "none",
                          fontFamily: "inherit",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "#334155",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem",
                          borderRadius: "12px",
                          border: "1px solid var(--border-color)",
                          fontSize: "0.95rem",
                          outline: "none",
                          fontFamily: "inherit",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.25rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "#334155",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="(555) 000-0000"
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem",
                          borderRadius: "12px",
                          border: "1px solid var(--border-color)",
                          fontSize: "0.95rem",
                          outline: "none",
                          fontFamily: "inherit",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "#334155",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Pet Name & Breed
                      </label>
                      <input
                        type="text"
                        value={formData.petName}
                        onChange={(e) =>
                          setFormData({ ...formData, petName: e.target.value })
                        }
                        placeholder="e.g. Toby (Golden)"
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem",
                          borderRadius: "12px",
                          border: "1px solid var(--border-color)",
                          fontSize: "0.95rem",
                          outline: "none",
                          fontFamily: "inherit",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.25rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "#334155",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Pet Species
                      </label>
                      <select
                        value={formData.petType}
                        onChange={(e) =>
                          setFormData({ ...formData, petType: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem",
                          borderRadius: "12px",
                          border: "1px solid var(--border-color)",
                          fontSize: "0.95rem",
                          outline: "none",
                          background: "#ffffff",
                          fontFamily: "inherit",
                        }}
                      >
                        <option value="Dog">Dog 🐕</option>
                        <option value="Cat">Cat 🐈</option>
                        <option value="Bird">Bird 🦜</option>
                        <option value="Small Pet">Small Mammal / Rabbit 🐇</option>
                        <option value="Other">Other Companion</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "#334155",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Desired Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem",
                          borderRadius: "12px",
                          border: "1px solid var(--border-color)",
                          fontSize: "0.95rem",
                          outline: "none",
                          background: "#ffffff",
                          fontFamily: "inherit",
                        }}
                      >
                        <option value="Wellness Exam">Wellness Checkup & Vaccines</option>
                        <option value="Spa Grooming">Luxury Spa & Grooming</option>
                        <option value="Dental Care">Dental Hygiene</option>
                        <option value="Daycare Boarding">Daycare / Boarding</option>
                        <option value="Adoption Inquiry">Adoption Inquiry</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "#334155",
                        marginBottom: "0.4rem",
                      }}
                    >
                      Additional Details / Special Notes
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us about your pet's needs, health background, or specific appointment preferences..."
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        borderRadius: "12px",
                        border: "1px solid var(--border-color)",
                        fontSize: "0.95rem",
                        outline: "none",
                        resize: "vertical",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", marginTop: "0.5rem" }}
                  >
                    Confirm & Send Booking Request 🐾
                  </button>
                </form>
              )}
            </div>

            {/* Contact Details & Clinic Info Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Emergency Banner */}
              <div
                style={{
                  background: "linear-gradient(135deg, #fff1f2, #ffe4e6)",
                  border: "2px solid #fecdd3",
                  borderRadius: "20px",
                  padding: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>🚨</span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#9f1239" }}>
                    24/7 Urgent Pet Care
                  </h3>
                </div>
                <p style={{ fontSize: "0.9rem", color: "#881337", lineHeight: 1.5, marginBottom: "1rem" }}>
                  In case of sudden accident, poisoning, or acute distress, call our priority hotline immediately.
                </p>
                <a
                  href="tel:5558387387"
                  style={{
                    display: "inline-block",
                    padding: "0.6rem 1.2rem",
                    background: "#e11d48",
                    color: "#ffffff",
                    borderRadius: "999px",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                  }}
                >
                  📞 Call (555) 838-PETS
                </a>
              </div>

              {/* Clinic details card */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  border: "1px solid var(--border-color)",
                  padding: "1.75rem",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1e293b", marginBottom: "1rem" }}>
                  Clinic & Spa Location
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.95rem" }}>
                  <div>
                    <strong style={{ color: "#334155" }}>📍 Physical Address</strong>
                    <p style={{ color: "#64748b", marginTop: "2px" }}>
                      742 Evergreen Paws Blvd, Suite 100<br />
                      Petling Village, CA 90210
                    </p>
                  </div>
                  <div>
                    <strong style={{ color: "#334155" }}>📧 Email</strong>
                    <p style={{ color: "#64748b", marginTop: "2px" }}>
                      care@petling.com
                    </p>
                  </div>
                  <div>
                    <strong style={{ color: "#334155" }}>⏰ Operating Hours</strong>
                    <p style={{ color: "#64748b", marginTop: "2px" }}>
                      Monday – Friday: 7:30 AM – 8:00 PM<br />
                      Saturday: 8:00 AM – 6:00 PM<br />
                      Sunday: 9:00 AM – 5:00 PM<br />
                      <em>Emergency room open 24 hours</em>
                    </p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "20px",
                  border: "1px solid var(--border-color)",
                  padding: "1.5rem",
                }}
              >
                <h4 style={{ fontWeight: 700, color: "#1e293b", marginBottom: "0.75rem" }}>
                  Visitor Amenities
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    fontSize: "0.88rem",
                    color: "#64748b",
                  }}
                >
                  <li>🚗 Free reserved patient parking right in front</li>
                  <li>🐱 Separate feline-only quiet waiting lounge</li>
                  <li>☕ Complimentary pet parent organic coffee bar</li>
                  <li>🐾 Secure outdoor leashed relief courtyard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="section"
        style={{ background: "#f8fafc", borderTop: "1px solid var(--border-light)" }}
      >
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="section-title-wrap">
            <span className="badge">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">
              Everything you need to know about scheduling, first-time visits, and our care standards.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid var(--border-color)",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "left",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#1e293b",
                    }}
                  >
                    <span>{faq.q}</span>
                    <span
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.2s ease",
                        color: "var(--primary)",
                        fontSize: "1.2rem",
                      }}
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: "0 1.5rem 1.25rem",
                        color: "#64748b",
                        fontSize: "0.95rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
