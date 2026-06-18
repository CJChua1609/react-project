import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents reloads of page
    setSubmitted(true);
    // setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact">
      <div className="contact__box">
        <h1 className="contact__title">Get in touch</h1>
        <p className="contact__subtitle">
          Have a question? Send a message below.
        </p>

        {submitted ? (
          <div className="contact__success" role="status">
            Thanks {form.name} — your message has been sent.
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit}>
            <label className="contact__field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
            </label>

            <label className="contact__field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder='Enter email'
                required
              />
            </label>

            <label className="contact__field">
              <span>Message</span>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder='Message here...'
                required
              />
            </label>

            <button type="submit" className="contact__submit">
              Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;