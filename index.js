require('dotenv').config();
const server = require('./server');
const PORT = process.env.PORT || 3300;

console.log(`Starting server on port ${PORT}…`);
app.listen(PORT, () => {
  console.log(`✅ Server is live at http://0.0.0.0:${PORT}`);
});
