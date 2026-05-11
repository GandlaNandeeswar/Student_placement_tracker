import React from "react";

const EditApplicationModal = ({
  app,
  onClose,
  onSave,
  setEditData,
}) => {
  if (!app) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Application</h2>

        <input
          type="text"
          placeholder="Company"
          value={app.companyName}
          onChange={(e) =>
            setEditData({
              ...app,
              companyName: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Role"
          value={app.role}
          onChange={(e) =>
            setEditData({
              ...app,
              role: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Notes"
          value={app.notes}
          onChange={(e) =>
            setEditData({
              ...app,
              notes: e.target.value,
            })
          }
        />

        <div style={{ marginTop: "20px" }}>
          <button onClick={onSave}>
            Save
          </button>

          <button
            onClick={onClose}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditApplicationModal;