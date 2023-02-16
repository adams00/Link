import { useState } from 'react';
import 'bulma'

function FileUploadMultiple() {
  const [fileList, setFileList] = useState(null);

  const handleFileChange = (e) => {
    setFileList(e.target.files);
  };

  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }

    // 👇 Create new FormData object and append files
    const data = new FormData();
    Object.keys(fileList).forEach(key => {
      data.append(fileList.item(key).name, fileList.item(key))
    })

    // 👇 Uploading the files using the fetch API to the server
    fetch('http://127.0.0.1:3001/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(()=> {setFileList(null)})
      .catch((err) => console.error(err));
  };

  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];

  return (
    <div className='filed'>
      <div className="file">
        <label htmlFor="" className="label file-label">
          <input  id='xxx' type="file" onChange={handleFileChange} multiple />
          <ul>
            {files.map((file, i) => (
              <li key={i}>
                {file.name} - {file.type}
              </li>
            ))}
          </ul>
          <button className="button" onClick={handleUploadClick}>Upload</button>
        </label>
      </div>
    </div>
  );
}

export default FileUploadMultiple;

    // function UploadFile() {
//   return (
//     <div className="field">
//         <div className="file">
//           <label className="file-label">
//             <input className="file-input" type="file" name="resume"/>
//             <span className="file-cta">
//              <span className="file-icon">
//             <i className="fas fa-upload"></i>
//           </span>
//           <span className="file-label">
//             Upload
//           </span>
//         </span>
//       </label>
//     </div>
// </div>
//   )
// }
