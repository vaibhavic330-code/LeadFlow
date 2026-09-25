import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [savingLead, setSavingLead] = useState(false);

  // Editing lead
  const [editingLead, setEditingLead] = useState(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // =========================
  // LEAD FORM
  // =========================

  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "Website",
    message: "",
    status: "New",
    priority: "Medium",
    followUpDate: "",
    notes: "",
  });

  // =========================
  // USER
  // =========================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =========================
  // FETCH LEADS
  // =========================

  const fetchLeads = async () => {
    try {
      const response = await API.get("/leads");

      if (response.data.success) {
        setLeads(response.data.leads);
      }
    } catch (error) {
      console.error(
        "Failed to fetch leads:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch leads when dashboard loads
  useEffect(() => {
    fetchLeads();
  }, []);

  // =========================
  // HANDLE FORM INPUT
  // =========================

  const handleLeadChange = (event) => {
    const { name, value } = event.target;

    setLeadForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // CREATE / UPDATE LEAD
  // =========================

  const handleCreateLead = async (event) => {
    event.preventDefault();

    try {
      setSavingLead(true);

      let response;

      // =========================
      // UPDATE EXISTING LEAD
      // =========================

      if (editingLead) {
        response = await API.put(
          `/leads/${editingLead._id}`,
          leadForm
        );

        if (response.data.success) {
          setLeads((previous) =>
            previous.map((lead) =>
              lead._id === editingLead._id
                ? response.data.lead
                : lead
            )
          );
        }
      }

      // =========================
      // CREATE NEW LEAD
      // =========================

      else {
        response = await API.post(
          "/leads",
          leadForm
        );

        if (response.data.success) {
          setLeads((previous) => [
            response.data.lead,
            ...previous,
          ]);
        }
      }

      // =========================
      // RESET FORM
      // =========================

      if (response.data.success) {
        setLeadForm({
          name: "",
          phone: "",
          email: "",
          source: "Website",
          message: "",
          status: "New",
          priority: "Medium",
          followUpDate: "",
          notes: "",
        });

        setEditingLead(null);
        setShowLeadForm(false);
      }
    } catch (error) {
      console.error(
        "Failed to save lead:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to save lead"
      );
    } finally {
      setSavingLead(false);
    }
  };

  // =========================
  // EDIT LEAD
  // =========================

  const handleEditLead = (lead) => {
    setEditingLead(lead);

    setLeadForm({
      name: lead.name || "",
      phone: lead.phone || "",
      email: lead.email || "",
      source: lead.source || "Other",
      message: lead.message || "",
      status: lead.status || "New",
      priority: lead.priority || "Medium",

      // Convert MongoDB date
      // into HTML date format
      followUpDate: lead.followUpDate
        ? new Date(lead.followUpDate)
            .toISOString()
            .split("T")[0]
        : "",

      notes: lead.notes || "",
    });

    setShowLeadForm(true);
  };

  // =========================
  // DELETE LEAD
  // =========================

  const handleDeleteLead = async (leadId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await API.delete(
        `/leads/${leadId}`
      );

      if (response.data.success) {
        setLeads((previous) =>
          previous.filter(
            (lead) => lead._id !== leadId
          )
        );

        alert("Lead deleted successfully");
      }
    } catch (error) {
      console.error(
        "Failed to delete lead:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete lead"
      );
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================
  // DASHBOARD STATISTICS
  // =========================

  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  // =========================
  // FOLLOW-UP STATISTICS
  // =========================

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const todayFollowUps = leads.filter((lead) => {
    if (!lead.followUpDate) {
      return false;
    }

    const followUpDate = new Date(
      lead.followUpDate
    );

    followUpDate.setHours(0, 0, 0, 0);

    return (
      followUpDate.getTime() === today.getTime()
    );
  }).length;

  const upcomingFollowUps = leads.filter((lead) => {
    if (!lead.followUpDate) {
      return false;
    }

    const followUpDate = new Date(
      lead.followUpDate
    );

    followUpDate.setHours(0, 0, 0, 0);

    return followUpDate > today;
  }).length;

  const overdueFollowUps = leads.filter((lead) => {
    if (!lead.followUpDate) {
      return false;
    }

    const followUpDate = new Date(
      lead.followUpDate
    );

    followUpDate.setHours(0, 0, 0, 0);

    return followUpDate < today;
  }).length;

  // =========================
  // SEARCH & FILTER
  // =========================

  const filteredLeads = leads.filter((lead) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      lead.name
        ?.toLowerCase()
        .includes(search) ||
      lead.phone
        ?.toLowerCase()
        .includes(search) ||
      lead.email
        ?.toLowerCase()
        .includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      lead.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      lead.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  // =========================
  // OPEN ADD LEAD FORM
  // =========================

  const handleAddLead = () => {
    setEditingLead(null);

    setLeadForm({
      name: "",
      phone: "",
      email: "",
      source: "Website",
      message: "",
      status: "New",
      priority: "Medium",
      followUpDate: "",
      notes: "",
    });

    setShowLeadForm(true);
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="dashboard-container">

      <div className="dashboard-card">

        {/* =========================
            HEADER
        ========================= */}

        <div className="dashboard-header">

          <div>
            <h1>LeadFlow 🚀</h1>

            <p>
              AI-Powered Lead Management System
            </p>
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {/* =========================
            WELCOME
        ========================= */}

        <div className="welcome-section">

          <h2>
            Welcome, {user?.name || "User"}!
          </h2>

          <p>
            You have successfully logged into
            LeadFlow.
          </p>

        </div>

        {/* =========================
            DASHBOARD STATS
        ========================= */}

        <div className="dashboard-stats">

          {/* Total Leads */}

          <div className="stat-card">

            <h3>
              {loading ? "..." : totalLeads}
            </h3>

            <p>Total Leads</p>

          </div>

          {/* New Leads */}

          <div className="stat-card">

            <h3>
              {loading ? "..." : newLeads}
            </h3>

            <p>New Leads</p>

          </div>

          {/* Converted Leads */}

          <div className="stat-card">

            <h3>
              {loading ? "..." : convertedLeads}
            </h3>

            <p>Converted</p>

          </div>

          {/* Today's Follow-ups */}

          <div className="stat-card">

            <h3>
              {loading
                ? "..."
                : todayFollowUps}
            </h3>

            <p>Today's Follow-ups</p>

          </div>

          {/* Upcoming Follow-ups */}

          <div className="stat-card">

            <h3>
              {loading
                ? "..."
                : upcomingFollowUps}
            </h3>

            <p>Upcoming Follow-ups</p>

          </div>

          {/* Overdue Follow-ups */}

          <div className="stat-card">

            <h3>
              {loading
                ? "..."
                : overdueFollowUps}
            </h3>

            <p>Overdue Follow-ups</p>

          </div>

        </div>

        {/* =========================
            LEAD MANAGEMENT
        ========================= */}

        <div className="lead-management">

          <div className="lead-management-header">

            <h3>Lead Management</h3>

            <button
              className="add-lead-button"
              onClick={() => {
                if (showLeadForm) {
                  setShowLeadForm(false);
                  setEditingLead(null);
                } else {
                  handleAddLead();
                }
              }}
            >
              {showLeadForm
                ? "Close"
                : "+ Add Lead"}
            </button>

          </div>

          {/* =========================
              LEAD FORM
          ========================= */}

          {showLeadForm && (

            <form
              className="lead-form"
              onSubmit={handleCreateLead}
            >

              <div className="lead-form-grid">

                {/* Name */}

                <div className="lead-form-group">

                  <label>Name *</label>

                  <input
                    type="text"
                    name="name"
                    value={leadForm.name}
                    onChange={handleLeadChange}
                    placeholder="Enter lead name"
                    required
                  />

                </div>

                {/* Phone */}

                <div className="lead-form-group">

                  <label>Phone *</label>

                  <input
                    type="tel"
                    name="phone"
                    value={leadForm.phone}
                    onChange={handleLeadChange}
                    placeholder="Enter phone number"
                    required
                  />

                </div>

                {/* Email */}

                <div className="lead-form-group">

                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={leadForm.email}
                    onChange={handleLeadChange}
                    placeholder="Enter email"
                  />

                </div>

                {/* Source */}

                <div className="lead-form-group">

                  <label>Source</label>

                  <select
                    name="source"
                    value={leadForm.source}
                    onChange={handleLeadChange}
                  >

                    <option value="Website">
                      Website
                    </option>

                    <option value="WhatsApp">
                      WhatsApp
                    </option>

                    <option value="Instagram">
                      Instagram
                    </option>

                    <option value="Facebook">
                      Facebook
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                {/* Status */}

                <div className="lead-form-group">

                  <label>Status</label>

                  <select
                    name="status"
                    value={leadForm.status}
                    onChange={handleLeadChange}
                  >

                    <option value="New">
                      New
                    </option>

                    <option value="Contacted">
                      Contacted
                    </option>

                    <option value="Qualified">
                      Qualified
                    </option>

                    <option value="Converted">
                      Converted
                    </option>

                    <option value="Lost">
                      Lost
                    </option>

                  </select>

                </div>

                {/* Priority */}

                <div className="lead-form-group">

                  <label>Priority</label>

                  <select
                    name="priority"
                    value={leadForm.priority}
                    onChange={handleLeadChange}
                  >

                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>

                  </select>

                </div>

                {/* Follow-up Date */}

                <div className="lead-form-group">

                  <label>Follow-up Date</label>

                  <input
                    type="date"
                    name="followUpDate"
                    value={leadForm.followUpDate}
                    onChange={handleLeadChange}
                  />

                </div>

                {/* Message */}

                <div className="lead-form-group lead-form-full">

                  <label>Message</label>

                  <textarea
                    name="message"
                    value={leadForm.message}
                    onChange={handleLeadChange}
                    placeholder="Enter lead message"
                  />

                </div>

                {/* Notes */}

                <div className="lead-form-group lead-form-full">

                  <label>Notes</label>

                  <textarea
                    name="notes"
                    value={leadForm.notes}
                    onChange={handleLeadChange}
                    placeholder="Enter notes"
                  />

                </div>

              </div>

              {/* =========================
                  FORM BUTTONS
              ========================= */}

              <div className="lead-form-actions">

                <button
                  type="submit"
                  className="save-lead-button"
                  disabled={savingLead}
                >
                  {savingLead
                    ? "Saving..."
                    : editingLead
                    ? "Update Lead"
                    : "Save Lead"}
                </button>

                <button
                  type="button"
                  className="cancel-lead-button"
                  onClick={() => {
                    setShowLeadForm(false);
                    setEditingLead(null);
                  }}
                >
                  Cancel
                </button>

              </div>

            </form>

          )}

        </div>

        {/* =========================
            SEARCH & FILTERS
        ========================= */}

        <div className="lead-filters">

          {/* Search */}

          <div className="lead-filter-group">

            <label>Search Leads</label>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="Search by name, phone or email"
            />

          </div>

          {/* Status Filter */}

          <div className="lead-filter-group">

            <label>Status</label>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="New">
                New
              </option>

              <option value="Contacted">
                Contacted
              </option>

              <option value="Qualified">
                Qualified
              </option>

              <option value="Converted">
                Converted
              </option>

              <option value="Lost">
                Lost
              </option>

            </select>

          </div>

          {/* Priority Filter */}

          <div className="lead-filter-group">

            <label>Priority</label>

            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(
                  event.target.value
                )
              }
            >

              <option value="All">
                All Priority
              </option>

              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>

            </select>

          </div>

        </div>

        {/* =========================
            ALL LEADS
        ========================= */}

        <div className="lead-list">

          <h3>All Leads</h3>

          {/* Loading */}

          {loading ? (

            <p className="no-leads">
              Loading leads...
            </p>

          ) : filteredLeads.length === 0 ? (

            <p className="no-leads">
              No leads found.
            </p>

          ) : (

            <div className="lead-table-wrapper">

              <table className="lead-table">

                <thead>

                  <tr>

                    <th>Name</th>

                    <th>Phone</th>

                    <th>Email</th>

                    <th>Source</th>

                    <th>Status</th>

                    <th>Priority</th>

                    <th>Follow-up</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredLeads.map((lead) => (

                    <tr key={lead._id}>

                      <td className="lead-name">
                        {lead.name}
                      </td>

                      <td>
                        {lead.phone}
                      </td>

                      <td>
                        {lead.email || "-"}
                      </td>

                      <td>
                        {lead.source}
                      </td>

                      <td>

                        <span className="lead-status">
                          {lead.status}
                        </span>

                      </td>

                      <td>

                        <span className="lead-priority">
                          {lead.priority}
                        </span>

                      </td>

                      <td>

                        {lead.followUpDate
                          ? new Date(
                              lead.followUpDate
                            ).toLocaleDateString()
                          : "-"}

                      </td>

                      <td>

                        <button
                          type="button"
                          className="edit-lead-button"
                          onClick={() =>
                            handleEditLead(lead)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-lead-button"
                          onClick={() =>
                            handleDeleteLead(
                              lead._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;