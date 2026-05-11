import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import API from "../services/api";
import EditApplicationModal from "./EditApplicationModal";

import "./Kanban.css";

function KanbanBoard() {

  const [applications, setApplications] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedApp, setSelectedApp] = useState(null);

  const [search, setSearch] = useState("");

  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications = async () => {

    try {

      const response = await API.get("/applications");

      console.log(response.data);

      setApplications(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const statuses = [
    "APPLIED",
    "INTERVIEW",
    "OFFER",
    "REJECTED",
  ];

  const filteredApplications = applications.filter((app) => {

    const matchesSearch =
      app.companyName
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "" ||
      app.status
        ?.toString()
        .toUpperCase() === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const onDragEnd = async (result) => {

    if (!result.destination) return;

    const applicationId = result.draggableId;

    const newStatus = result.destination.droppableId;

    try {

      await API.put(
        `/applications/${applicationId}/status`,
        {
          status: newStatus,
        }
      );

      fetchApplications();

    } catch (error) {

      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this application?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/applications/${id}`);

      fetchApplications();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="board-container">

      <h1 className="board-title">
        Smart Placement Tracker
      </h1>

      {/* SEARCH + FILTERS */}

      <div className="filters">

        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >

          <option value="">
            All Status
          </option>

          <option value="APPLIED">
            Applied
          </option>

          <option value="INTERVIEW">
            Interview
          </option>

          <option value="OFFER">
            Offer
          </option>

          <option value="REJECTED">
            Rejected
          </option>

        </select>

      </div>

      {/* BOARD */}

      <DragDropContext onDragEnd={onDragEnd}>

        <div className="kanban-board">

          {statuses.map((status) => (

            <Droppable
              droppableId={status}
              key={status}
            >

              {(provided) => (

                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >

                  <h2>{status}</h2>

                  {filteredApplications
                    .filter(
                      (app) =>
                        app.status
                          ?.toString()
                          .toUpperCase() === status
                    )
                    .map((app, index) => (

                      <Draggable
                        draggableId={app.id.toString()}
                        index={index}
                        key={app.id}
                      >

                        {(provided) => (

                          <div
                            className="card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >

                            <h3>
                              {app?.companyName}
                            </h3>

                            <p>
                              {app?.role}
                            </p>

                            <p>
                              {app?.notes}
                            </p>

                            <p>
                              <strong>Status:</strong>{" "}
                              {app?.status}
                            </p>

                            {/* ACTION BUTTONS */}

                            <div className="card-buttons">

                              <button
                                className="edit-btn"
                                onClick={() => {

                                  setSelectedApp(app);

                                  setShowEditModal(true);
                                }}
                              >
                                Edit
                              </button>

                              <button
                                className="delete-btn"
                                onClick={() =>
                                  handleDelete(app.id)
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </div>
                        )}

                      </Draggable>
                    ))}

                  {provided.placeholder}

                </div>
              )}

            </Droppable>
          ))}

        </div>

      </DragDropContext>

      {/* EDIT MODAL */}

      {
        showEditModal && selectedApp && (

          <EditApplicationModal

            application={selectedApp}

            closeModal={() =>
              setShowEditModal(false)
            }

            refresh={() => {

              fetchApplications();

              setShowEditModal(false);
            }}
          />
        )
      }

    </div>
  );
}

export default KanbanBoard;