# audit-verwaltung-wmc-projekt

ein projekt für das fach WMC in TypeScript, React und PayloadCMS als Backend

um das projekt zu starten:

```
cd server
npm i
npm run dev

cd..

cd client
npm i
npm run dev
```

.env file muss mit den credentials für die mongoDB hinzugefügt werden wie zB.:
```
DATABASE_URI=mongodb://root:1234@localhost:27017/
PAYLOAD_SECRET=ec3a29e32ced378e1acccd4c```
