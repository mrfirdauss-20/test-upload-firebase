import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import {storage} from './firebaseConfig';


function App() {
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState<File>();
  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    setPercent(0)
    setFile(event.target.files?.[0]);
  }

  function handleUpload(){
    if(!file) return;
    let storageRef = ref(storage, '/files/'+ file.name);
    let uploadTask = uploadBytesResumable(storageRef, file);

    deleteObject(storageRef).then(() => {
      console.log('deleted')
    }).catch((error) => {
      console.log(error)
    })
    uploadTask.on('state_changed',
    (snapshot) => {
      let percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setPercent(percent);  
    },
    (err) => console.log(err),
    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url)
      })
    })
  }
  return (
    <div className="App">
      <input type="file" accept='image/*' onChange={handleChange}/>
      <button onClick={handleUpload}>Upload</button>
      <p>uploading: {percent}%</p>
    </div>
  );
}

export default App;
