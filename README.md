# audit-verwaltungs app für wmc

Ein Projekt für das Fach WMC in TypeScript mit React. 
PayloadCMS wird als Backend verwendet

Für das Backend wird MongoDB benötigt und der Connection-String der DB muss in PayloadCMS reingegeben. 

um das projekt zu starten:

```sh
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
PAYLOAD_SECRET=ec3a29e32ced378e1acccd4c
```
