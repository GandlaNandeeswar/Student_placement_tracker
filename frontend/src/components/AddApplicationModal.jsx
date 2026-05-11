import { useState } from "react";
import API from "../services/api";

function AddApplicationModal({ closeModal, refresh }) {

    const [form, setForm] = useState({

        companyName: "",
        role: "",
        status: "APPLIED",
        notes: "",
        resumeLink: "",
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/applications", form);

            refresh();

            closeModal();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Add Application</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="resumeLink"
                        placeholder="Resume Link"
                        onChange={handleChange}
                    />

                    <div className="modal-buttons">

                        <button type="submit">
                            Add
                        </button>

                        <button
                            type="button"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddApplicationModal;
