# cs-api

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/DSC-UNSRI/cs-api/tree/deploy/heroku)

## Membuat Sistem Informasi InUnsri (Informasi Unsri)

Deskripsi: Sistem Informasi yang membuat Mahasiswa Unsri mengetahui informasi terupdate.  
</br>
Latar Belakang: Informasi yang beredar biasanya tidak beraturan, dimana informasi event, lomba, masih tersebar pada platform atau media yang berbeda.

Sebab itulah InUnsri dibuat untuk membuat semua informasi menyatu dan beraturan.
  
Resource Backend:
-   Database: PostgreSQL
-   Bahasa Server: Nodejs

Cara memulai :
-   ubah nama file `.example.env` menjadi `.env` dan ubah isi variabel environtment

```
npm install
npm start
```  

Menjalankan test : 
```
npm run test
```

Mengambil Token Owner : 
```
npm run auth-owner
```

## API Docs
[Click Here](https://documenter.getpostman.com/view/13546351/TzecDkHM)

## Accessing API Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/13546351-1bc247d8-0f66-44f7-9674-e652fcb8572e?action=collection%2Ffork&collection-url=entityId%3D13546351-1bc247d8-0f66-44f7-9674-e652fcb8572e%26entityType%3Dcollection%26workspaceId%3Df2bc5b24-9df1-4bc5-9677-e0bb5b0eb745)

## Manually Importing Collection
1. Download .json postman collection in dev > DSC.postman_collection.json
2. Download .json postman environment in dev > DSC CS-API.postman_environment.json
3. Import .json collection and .json environment file to postman
4. Use the environment before start to sending requests  