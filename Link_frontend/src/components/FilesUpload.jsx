import { useState } from 'react';
import 'bulma'

export function FilesUpload() {
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
            .then(() => { setFileList(null) })
            .catch((err) => console.error(err));
    };

    // 👇 files is not an array, but it's iterable, spread to get an array of files
    const files = fileList ? [...fileList] : [];

    return (
        <div className='filed'>
            <div className="file">
                <label htmlFor="" className="label file-label">
                    <input id='xxx' type="file" onChange={handleFileChange} multiple />
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