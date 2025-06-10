const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files

app.post('/create-page', (req, res) => {
  const { title, categories } = req.body;
  const cats = Array.isArray(categories) ? categories : categories.split(',');
  const filename = `${title.toLowerCase().replace(/\s+/g, '')}.html`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    h1 {
      color: #333;
    }
    .dropdown-content {
      display: flex;
      flex-direction: column;
      background-color: #f9f9f9;
      border: 1px solid #ccc;
      padding: 10px;
      margin-top: 10px;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.07);
    }
    .dropdown-content a {
      text-decoration: none;
      color: #007bff;
      padding: 8px 0;
      border-radius: 8px;
      transition: background 0.15s;
    }
    .dropdown-content a:hover {
      background: #e3f0fd;
      color: #1976d2;
    }
    button {
      margin-top: 24px;
      padding: 8px 18px;
      border: none;
      background-color: #e53935;
      color: #fff;
      font-size: 1rem;
      border-radius: 20px;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover {
      background-color: #b71c1c;
    }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <div class="dropdown-content">
    ${cats.map(cat => `<a href="#">${cat.trim()}</a>`).join('\n')}
  </div>
  <div><button onclick="window.location.href='index.html'">Go back</button></div>
</body>
</html>
`;

  // Only redirect after the file is written!
  fs.writeFile(path.join(__dirname, filename), html, (err) => {
    if (err) {
      res.status(500).send('Error creating file');
    } else {
      res.redirect(`/${filename}`);
    }
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));