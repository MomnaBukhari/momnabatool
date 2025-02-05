import { Helmet } from "react-helmet";
import { useState } from "react";
import "../styling/contact.css";

const Contact = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const response = await fetch("https://formspree.io/f/mzzdzovg", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setIsDialogOpen(true); // Show the dialog box
      e.target.reset(); // Reset the form
    } else {
      alert("Failed to send the message. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Momna</title>
      </Helmet>

      <div className="contact-page">
        <div className="contact-form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Syeda Momna Batool"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="smomnabatool@gmail.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn</label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                placeholder="https://www.linkedin.com/in/momna-batool/"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                defaultValue="Hey, Cutie."
                required
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <iframe
            title="Jhelum, Punjab, Pakistan"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108744.2512792091!2d73.67063945!3d32.9340473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f8a687923cd49%3A0xf9a2a7d7f8f3b1a5!2sJhelum%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1698765432100!5m2!1sen!2s"
            width="100%"
            height="400"
            allowFullScreen=""
          ></iframe>
        </div>

        {/* Dialog Box */}
        {isDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <p>I received your message. Thank You!</p>
              <button onClick={() => setIsDialogOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Contact;