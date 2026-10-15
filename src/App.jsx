import React, { useState, useEffect } from 'react';
import { ref, push, set } from "firebase/database";
import { database } from "./firebase";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <section className="hero" id="home">
      <h1>Welcome to Study Path</h1>
      <p>Your guide to study resources, syllabus and competitive exams.</p>
      <Link to="/notes" className="btn">Explore Study Resources</Link>
    </section>
  );
}

function Notes() {
  return (
    <section className="section">
      <h1>Study Resources</h1>
      <div className="cards">
        <div className="card">
          <h2>Study Notes</h2>
          <p>Prepare your notes for important subjects.</p>
        </div>
        <div className="card">
          <h2>Practice Questions</h2>
          <p>Improve your preparation with practice.</p>
        </div>
      </div>
    </section>
  );
}

function Syllabus() {
  return (
    <section className="section">
      <h1>Syllabus</h1>
      <p>Choose your exam and prepare each subject step by step.</p>
    </section>
  );
}

function Exams() {
  return (
    <section className="section">
      <h1>Competitive Exams</h1>
      <div className="cards">
        <div className="card"><h2>SSC CHSL</h2><p>Study and practice for SSC CHSL.</p></div>
        <div className="card"><h2>PET</h2><p>Prepare general knowledge, maths and reasoning.</p></div>
        <div className="card"><h2>NIMCET</h2><p>Explore MCA entrance exam preparation.</p></div>
      </div>
    </section>
  );
}

function Application() {
  const [form, setForm] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('studentForm')) || {
      name: '',
      father: '',
      dob: '',
      education: ''
    };
  } catch {
    return {
      name: '',
      father: '',
      dob: '',
      education: ''
    };
  }
});

  const [photo, setPhoto] = useState('');
  const [signature, setSignature] = useState('');
  
useEffect(() => {
  const savedPhoto = localStorage.getItem('studentPhoto');
  const savedSignature = localStorage.getItem('studentSignature');

  if (savedPhoto) setPhoto(savedPhoto);
  if (savedSignature) setSignature(savedSignature);

  }, []);
  const [message, setMessage] = useState('');

  function update(event) {
  const updatedForm = {
    ...form,
    [event.target.name]: event.target.value
  };

  setForm(updatedForm);
  localStorage.setItem('studentForm', JSON.stringify(updatedForm));
}
    

  function uploadFile(event, setter) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setMessage('Please select a JPG or PNG image.');
      event.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage('Image size must be less than 2 MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

reader.onload = () => {
  const imageData = reader.result;

  setter(imageData);

  if (setter === setPhoto) {
    localStorage.setItem('studentPhoto', imageData);
  } else if (setter === setSignature) {
    localStorage.setItem('studentSignature', imageData);
  }

  setMessage('');
};

reader.readAsDataURL(file);
   }

  function submit(event) {
    event.preventDefault();

    if (!photo || !signature) {
      setMessage('Please upload both photo and signature.');
      return;
    }

    setMessage(
      'Preview ready! Preview ready! This demo form does not permanently save or submit your data.'
    );
  }

  return (
    <section className="form-section">
      <h1>Student Application Form</h1>

      <form onSubmit={submit}>
        <label>Student Name</label>
        <input name="name" value={form.name} onChange={update} required />

        <label>Father's Name</label>
        <input name="father" value={form.father} onChange={update} required />

        <label>Date of Birth</label>
        <input type="date" name="dob" value={form.dob} onChange={update} required />

        <label>Education</label>
        <input name="education" value={form.education} onChange={update} required />

        <label>Upload Photo (JPG/PNG, max 2 MB)</label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={(event) => uploadFile(event, setPhoto)}
          required
        />
        {photo && <img src={photo} alt="Student photo preview" width="120" />}

        <label>Upload Signature (JPG/PNG, max 2 MB)</label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={(event) => uploadFile(event, setSignature)}
          required
        />
        {signature && (
          <img src={signature} alt="Signature preview" width="180" />
        )}

        <button type="submit">Preview Form</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand-mark">S</span> Study Path
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/notes">Study Resources</Link>
          <Link to="/syllabus">Syllabus</Link>
          <Link to="/exams">Exams</Link>
          <Link to="/application">Online Form</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/application" element={<Application />} />
        </Routes>
      </main>

      <footer>
        <p>© Study Path | Learn and Grow</p>
      </footer>
    </BrowserRouter>
  );
}
