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
[Click Here](https://documenter.getpostman.com/view/13016039/Tzef92vF)

## Accessing API Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/fb3ccdf00eb81199cb42#?env%5BDSC%20CS-API%5D=W3sia2V5IjoiYmFzZV91cmwiLCJ2YWx1ZSI6ImxvY2FsaG9zdDo1MDAwIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJvcm1hd2FJZCIsInZhbHVlIjoiSURfT1JNQVdBIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJldmVudElkIiwidmFsdWUiOiJJRF9FVkVOVCIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiYWNjZXNzX3Rva2VuIiwidmFsdWUiOiJBQ0NFU1NfVE9LRU4iLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InJlZnJlc2hfdG9rZW4iLCJ2YWx1ZSI6IlJFRlJFU0hfVE9LRU4gIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJvd25lcl90b2tlbiIsInZhbHVlIjoiT1dORVJfVE9LRU4iLCJlbmFibGVkIjp0cnVlfV0=)

## Manually Importing Collection
1. Download .json postman collection in dev > DSC.postman_collection.json
2. Download .json postman environment in dev > DSC CS-API.postman_environment.json
3. Import .json collection and .json environment file to postman
4. Use the environment before start to sending requests  
