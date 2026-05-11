import { useState } from "react";

import API from "../services/api";

function ResumeUpload() {

    const [file, setFile] = useState(null);

    const uploadResume = async () => {

        const formData = new FormData();

        formData.append("file", file);

        try {

            await API.post(

                "/resumes/upload",

                formData,

                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            alert("Resume Uploaded");

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div>

            <h2>Upload Resume</h2>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setFile(e.target.files[0])
                }
            />

            <button onClick={uploadResume}>
                Upload
            </button>

        </div>
    );
}

export default ResumeUpload;