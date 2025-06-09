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