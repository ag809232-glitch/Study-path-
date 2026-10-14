import React, { useState } from 'react';

function UploadField({ label, accept, onChange, preview, help }) {
  return <div className="upload-field">
    <label>{label}</label>
    <input type="file" accept={accept} onChange={onChange} />
    <small>{help}</small>
    {preview && <img className="preview" src={preview} alt={`${label} preview`} />}
  </div>;
}

export default function App() {
  const [photo, setPhoto] = useState('');
  const [signature, setSignature] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ name: '', father: '', dob: '', education: '' });

  const chooseFile = (setter) => (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setMessage('Please choose a file smaller than 2 MB.');
      event.target.value = '';
      return;
    }
    setter(URL.createObjectURL(file));
    setMessage('');
  };

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    setMessage('Preview ready. This demo does not send or permanently save your personal information.');
  };

  return <div>
    <header className="topbar">
      <a className="brand" href="#home"><span className="brand-mark">S</span> Study Path</a>
      <nav><a href="#home">Home</a><a href="#resources">Study Resources</a><a href="#exams">Exams</a><a href="#application">Online Form</a></nav>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">LEARN • PREPARE • SUCCEED</p>
          <h1>Your Path to<br /><span>Better Learning.</span></h1>
          <p className="hero-text">Explore study materials, exam guidance, and simple online application tools in one place.</p>
          <div className="hero-actions"><a className="btn primary" href="#resources">Explore Study Materials</a><a className="btn light" href="#application">Apply Online</a></div>
        </div>
        <div className="hero-art"><div className="book">📘</div><div className="floating-note">Your goals start here ✨</div><div className="art-circle"></div></div>
      </section>

      <section className="section" id="resources">
        <div className="section-heading"><p className="eyebrow">YOUR LEARNING HUB</p><h2>Explore Study Resources</h2><p>Helpful starting points for your learning journey.</p></div>
        <div className="cards">
          <article className="resource-card"><div className="card-icon">📚</div><h3>Study Notes</h3><p>Organize topic-wise notes and revise important concepts.</p><a href="#application">Explore resources →</a></article>
          <article className="resource-card"><div className="card-icon">🗂️</div><h3>Syllabus</h3><p>Keep track of subjects, topics, and your study plan.</p><a href="#application">View syllabus →</a></article>
          <article className="resource-card" id="exams"><div className="card-icon">🎓</div><h3>Competitive Exams</h3><p>Find a simple starting point for exam preparation.</p><a href="#application">Explore exams →</a></article>
        </div>
      </section>

      <section className="form-section" id="application">
        <div className="form-intro"><p className="eyebrow">ONLINE FORM DEMO</p><h2>Student Application</h2><p>Enter sample details and preview your photo and signature. This demo does not submit information to a server.</p><div className="privacy-note">🔒 Your selected files are previewed in this browser only.</div></div>
        <form className="student-form" onSubmit={submit}>
          <div className="form-grid">
            <div className="field"><label htmlFor="name">Student Name *</label><input id="name" name="name" value={form.name} onChange={update} required placeholder="Enter full name" /></div>
            <div className="field"><label htmlFor="father">Father's Name</label><input id="father" name="father" value={form.father} onChange={update} placeholder="Enter father's name" /></div>
            <div className="field"><label htmlFor="dob">Date of Birth</label><input id="dob" name="dob" type="date" value={form.dob} onChange={update} /></div>
            <div className="field"><label htmlFor="education">Education</label><select id="education" name="education" value={form.education} onChange={update}><option value="">Select qualification</option><option>Class 10</option><option>Class 12</option><option>Graduate</option><option>Other</option></select></div>
          </div>
          <div className="uploads">
            <UploadField label="Passport Photo" accept="image/*" onChange={chooseFile(setPhoto)} preview={photo} help="Image file • Maximum 2 MB" />
            <UploadField label="Signature" accept="image/*" onChange={chooseFile(setSignature)} preview={signature} help="Image file • Maximum 2 MB" />
          </div>
          <button className="btn primary submit" type="submit">Review Application</button>
          {message && <p className="message" role="status">{message}</p>}
        </form>
      </section>
    </main>
    <footer><a className="brand footer-brand" href="#home"><span className="brand-mark">S</span> Study Path</a><p>Learn with confidence. Prepare with purpose.</p><small>Demo project • Not an official government website</small></footer>
  </div>;
}
