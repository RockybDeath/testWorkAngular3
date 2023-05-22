// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unused-vars
const db = require('./db.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unused-vars
const lodash = require('lodash');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/documents', (req: any, res: any) => {
  const result = readDocuments();

  res.send(result);
});

server.post('/create', (req: any, res: any) => {
  addDocument(req.body);

  res.send({ answer: 'All ok' });
});

server.put('/update', (req: any, res: any) => {
  editDocument(req.body);

  res.send({ answer: 'All ok' });
});

server.post('/delete', (req: any, res: any) => {
  deleteDocument(req.body);

  res.send({ answer: 'All ok' });
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

function readDocuments() {
  const dbRaw = fs.readFileSync('./server/db.json');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const documents = JSON.parse(dbRaw).documents;
  return documents;
}

function writeNewId(sequence: any): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const dbRaw = JSON.parse(fs.readFileSync('./server/db.json'));
  sequence.id++;
  lodash.set(dbRaw, 'sequence', sequence);

  fs.writeFileSync('./server/db.json', JSON.stringify(dbRaw));
}

function getNextId(): number {
  const dbRaw = fs.readFileSync('./server/db.json');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const sequence = JSON.parse(dbRaw).sequence;
  const id = sequence.id;
  writeNewId(sequence);
  return id;
}

function editDocument(document: any): void {
  let documents = readDocuments();
  // @ts-ignore
  documents = documents.filter((doc) => doc.id !== document.id);
  documents.push(document);
  refreshJsonDocuments(documents);
}

function refreshJsonDocuments(documents: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const dbRaw = JSON.parse(fs.readFileSync('./server/db.json'));
  lodash.set(dbRaw, 'documents', documents);

  fs.writeFileSync('./server/db.json', JSON.stringify(dbRaw));
}

function addDocument(document: any): void {
  const documents = readDocuments();
  const id = getNextId();
  documents.push({ ...document, id: id });
  refreshJsonDocuments(documents);
}

function deleteDocument(document: any): void {
  let documents = readDocuments();
  // @ts-ignore
  documents = documents.filter((doc) => doc.id !== document.id);
  refreshJsonDocuments(documents);
}
