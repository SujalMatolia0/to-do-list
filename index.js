const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const tos = [
  {
    id: 0,
    title: 'title',
    dis: 'description',
  },
];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create.html'));
});

app.get('/tose', (req, res) => {
  res.json(tos);
});

app.post('/display', (req, res) => {
  const newTodo = {
    id: tos.length,
    title: req.body.title.replace(/\n/g, '<br>'),
    dis: req.body.dis.replace(/\n/g, '<br>'),
  };
  tos.push(newTodo);

  res.json(newTodo);
});

app.delete('/delete', (req, res) => {
  const id = parseInt(req.query.id);
  const index = tos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    const deletedTodo = tos.splice(index, 1)[0];
    res.json(deletedTodo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(2000, () => {
  console.log('Server is online');
});
