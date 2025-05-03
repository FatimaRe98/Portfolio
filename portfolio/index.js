const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));  
app.use(express.json());

// Serve HTML pages
const servePage = (req, res) => {
  const page = req.path === '/' ? 'index.html' : `${req.path.substring(1)}.html`;
  res.sendFile(path.join(__dirname, 'public', page));
};

['/', '/about', '/contact', '/resume'].forEach(route => app.get(route, servePage));

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Read existing messages from messages.json
  fs.readFile('messages.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Parse the data and push the new message
    const messages = data ? JSON.parse(data) : [];
    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      date: new Date().toISOString()
    };
    messages.push(newMessage);

    // Write updated messages to messages.json
    fs.writeFile('messages.json', JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.json({ success: true, message: 'Message received!' });
    });
  });
});

app.get('/api/messages', (req, res) => {
  fs.readFile('messages.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const messages = data ? JSON.parse(data) : [];
    res.json(messages.sort((a, b) => b.id - a.id)); // Newest first
  });
});

// Start server
app.listen(PORT, () => console.log(`
  Server running on port ${PORT}
  Access messages at: /api/messages
`));
