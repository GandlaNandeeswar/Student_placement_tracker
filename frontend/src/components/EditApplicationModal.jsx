import { useState } from "react";
import API from "../services/api";

function EditApplicationModal({

    application,
    closeModal,
    refresh
}) {

    const [form, setForm] = useState({

        companyName: application.companyName,
        role: application.role,
        status: application.status,
        notes: application.notes,
        resumeLink: application.resumeLink,
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

            await API.put(

                `/applications/${application.id}`,
                form
            );

            refresh();

            closeModal();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Edit Application</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                    />

                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                    />

                    <div className="modal-buttons">

                        <button type="submit">
                            Save
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

export default EditApplicationModal;