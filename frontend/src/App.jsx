import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard')

  const [showBugForm, setShowBugForm] = useState(false)
  const [showTestForm, setShowTestForm] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [severity, setSeverity] = useState('Medium')
  const [status, setStatus] = useState('Open')

  const [testTitle, setTestTitle] = useState('')
  const [testSteps, setTestSteps] = useState('')
  const [expectedResult, setExpectedResult] = useState('')
  const [testStatus, setTestStatus] = useState('Not Run')

  const [search, setSearch] = useState('')

  const [bugs, setBugs] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/bugs")
      .then((response) => response.json())
      .then((data) => {
        setBugs(data)
      })
      .catch((error) => {
        console.log("Error loading bugs:", error)
      })
  }, [])

  const [testCases, setTestCases] = useState([
    {
      id: 'TC-001',
      title: 'Verify user login',
      status: 'Passed'
    },
    {
      id: 'TC-002',
      title: 'Verify password reset',
      status: 'Not Run'
    }
  ])

  const handleBugSubmit = async () => {
    if (title.trim() === '') {
      alert('Please enter a bug title')
      return
    }

    const newBug = {
      id: `BUG-${String(bugs.length + 1).padStart(3, '0')}`,
      title: title,
      description: description,
      severity: severity,
      status: status
    }

    try {
      const response = await fetch("http://localhost:5000/bugs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBug)
      })

      const savedBug = await response.json()

      setBugs([...bugs, savedBug])

      setTitle('')
      setDescription('')
      setSeverity('Medium')
      setStatus('Open')
      setShowBugForm(false)

    } catch (error) {
      console.log("Error creating bug:", error)
    }
  }

  const updateBugStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/bugs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: newStatus
          })
        }
      )

      const updatedBug = await response.json()

      setBugs(
        bugs.map((bug) =>
          bug.id === id ? updatedBug : bug
        )
      )

    } catch (error) {
      console.log("Error updating bug:", error)
    }
  }

  const deleteBug = async (id) => {
    try {
      await fetch(`http://localhost:5000/bugs/${id}`, {
        method: "DELETE"
      })

      setBugs(
        bugs.filter((bug) => bug.id !== id)
      )

    } catch (error) {
      console.log("Error deleting bug:", error)
    }
  }

  const handleTestSubmit = () => {
    if (testTitle.trim() === '') {
      alert('Please enter a test case title')
      return
    }

    const newTestCase = {
      id: `TC-${String(testCases.length + 1).padStart(3, '0')}`,
      title: testTitle,
      status: testStatus
    }

    setTestCases([...testCases, newTestCase])

    setTestTitle('')
    setTestSteps('')
    setExpectedResult('')
    setTestStatus('Not Run')
    setShowTestForm(false)
  }

  const openCount = bugs.filter(
    (bug) => bug.status === 'Open'
  ).length

  const progressCount = bugs.filter(
    (bug) => bug.status === 'In Progress'
  ).length

  const testingCount = bugs.filter(
    (bug) => bug.status === 'Ready for Testing'
  ).length

  const resolvedCount = bugs.filter(
    (bug) => bug.status === 'Resolved'
  ).length

  const filteredBugs = bugs.filter((bug) => {
    const searchText = search.toLowerCase()

    return (
      bug.id.toLowerCase().includes(searchText) ||
      bug.title.toLowerCase().includes(searchText) ||
      bug.severity.toLowerCase().includes(searchText) ||
      bug.status.toLowerCase().includes(searchText)
    )
  })

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">B</div>

          <div>
            <h2>BugTrack</h2>
            <p>QA Management</p>
          </div>
        </div>

        <nav>

          <a
            className={`nav-item ${
              currentPage === 'Dashboard' ? 'active' : ''
            }`}
            onClick={() => setCurrentPage('Dashboard')}
          >
            Dashboard
          </a>

          <a
            className={`nav-item ${
              currentPage === 'All Bugs' ? 'active' : ''
            }`}
            onClick={() => setCurrentPage('All Bugs')}
          >
            All Bugs
          </a>

          <a
            className={`nav-item ${
              currentPage === 'Test Cases' ? 'active' : ''
            }`}
            onClick={() => setCurrentPage('Test Cases')}
          >
            Test Cases
          </a>

          <a
            className={`nav-item ${
              currentPage === 'Reports' ? 'active' : ''
            }`}
            onClick={() => setCurrentPage('Reports')}
          >
            Reports
          </a>

        </nav>

        <div className="sidebar-footer">
          <p>Logged in as</p>
          <strong>Rusha Limbu</strong>
        </div>

      </aside>

      <main className="main-content">

        {currentPage === 'Dashboard' && (
          <>

            <header className="topbar">

              <div>
                <p className="page-label">OVERVIEW</p>

                <h1>QA Dashboard</h1>

                <p className="subtitle">
                  Monitor software issues and testing progress.
                </p>
              </div>

              <button
                className="create-button"
                onClick={() => setShowBugForm(true)}
              >
                + Create Bug
              </button>

            </header>

            <section className="stats">

              <div className="stat-card">
                <div className="stat-icon red">!</div>

                <div>
                  <p>Open Issues</p>
                  <h2>{openCount}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">↻</div>

                <div>
                  <p>In Progress</p>
                  <h2>{progressCount}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon blue">✓</div>

                <div>
                  <p>Ready for Testing</p>
                  <h2>{testingCount}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">✓</div>

                <div>
                  <p>Resolved</p>
                  <h2>{resolvedCount}</h2>
                </div>
              </div>

            </section>

            <section className="bugs-section">

              <div className="section-header">

                <div>
                  <h2>Recent Bugs</h2>

                  <p>
                    Latest issues reported by the QA team.
                  </p>
                </div>

                <input
                  className="search-box"
                  type="text"
                  placeholder="Search bugs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>

              <div className="table-wrapper">

                <table>

                  <thead>
                    <tr>
                      <th>Bug ID</th>
                      <th>Title</th>
                      <th>Severity</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredBugs.map((bug) => (
                      <tr key={bug.id}>

                        <td className="bug-id">
                          {bug.id}
                        </td>

                        <td>{bug.title}</td>

                        <td>
                          <span
                            className={`badge severity-${bug.severity
                              .toLowerCase()
                              .replace(' ', '-')}`}
                          >
                            {bug.severity}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`badge status-${bug.status
                              .toLowerCase()
                              .replaceAll(' ', '-')}`}
                          >
                            {bug.status}
                          </span>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          </>
        )}

        {currentPage === 'All Bugs' && (
          <>

            <header className="topbar">

              <div>
                <p className="page-label">ISSUES</p>

                <h1>All Bugs</h1>

                <p className="subtitle">
                  View and manage all reported software bugs.
                </p>
              </div>

              <button
                className="create-button"
                onClick={() => setShowBugForm(true)}
              >
                + Create Bug
              </button>

            </header>

            <section className="bugs-section">

              <div className="section-header">

                <div>
                  <h2>Bug List</h2>

                  <p>
                    All reported issues in BugTrack.
                  </p>
                </div>

                <input
                  className="search-box"
                  type="text"
                  placeholder="Search bugs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>

              <div className="table-wrapper">

                <table>

                  <thead>
                    <tr>
                      <th>Bug ID</th>
                      <th>Title</th>
                      <th>Severity</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredBugs.map((bug) => (
                      <tr key={bug.id}>

                        <td className="bug-id">
                          {bug.id}
                        </td>

                        <td>{bug.title}</td>

                        <td>
                          <span
                            className={`badge severity-${bug.severity
                              .toLowerCase()
                              .replace(' ', '-')}`}
                          >
                            {bug.severity}
                          </span>
                        </td>

                        <td>
                          <select
                            value={bug.status}
                            onChange={(e) =>
                              updateBugStatus(
                                bug.id,
                                e.target.value
                              )
                            }
                          >
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Ready for Testing</option>
                            <option>Resolved</option>
                          </select>
                        </td>

                        <td>
                          <button
                            className="delete-button"
                            onClick={() => deleteBug(bug.id)}
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          </>
        )}

        {currentPage === 'Test Cases' && (
          <>

            <header className="topbar">

              <div>
                <p className="page-label">TESTING</p>

                <h1>Test Cases</h1>

                <p className="subtitle">
                  Create and manage QA test cases.
                </p>
              </div>

              <button
                className="create-button"
                onClick={() => setShowTestForm(true)}
              >
                + Create Test Case
              </button>

            </header>

            <section className="bugs-section">

              <div className="section-header">

                <div>
                  <h2>Test Case Library</h2>

                  <p>
                    Keep track of your manual QA test cases.
                  </p>
                </div>

              </div>

              <div className="table-wrapper">

                <table className="test-table">

                  <thead>
                    <tr>
                      <th>Test ID</th>
                      <th>Test Case</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {testCases.map((test) => (
                      <tr key={test.id}>

                        <td className="bug-id">
                          {test.id}
                        </td>

                        <td>
                          {test.title}
                        </td>

                        <td>
                          <span className="badge">
                            {test.status}
                          </span>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          </>
        )}

        {currentPage === 'Reports' && (
          <>

            <header className="topbar">

              <div>
                <p className="page-label">ANALYTICS</p>

                <h1>Reports</h1>

                <p className="subtitle">
                  Review QA statistics and issue progress.
                </p>
              </div>

            </header>

            <section className="stats">

              <div className="stat-card">
                <div className="stat-icon red">!</div>

                <div>
                  <p>Open Issues</p>
                  <h2>{openCount}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">↻</div>

                <div>
                  <p>In Progress</p>
                  <h2>{progressCount}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon blue">✓</div>

                <div>
                  <p>Ready for Testing</p>
                  <h2>{testingCount}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">✓</div>

                <div>
                  <p>Resolved</p>
                  <h2>{resolvedCount}</h2>
                </div>
              </div>

            </section>

            <section className="bugs-section">

              <h2>Bug Summary</h2>

              <p className="subtitle">
                Total bugs: {bugs.length}
              </p>

              <p className="subtitle">
                Total test cases: {testCases.length}
              </p>

            </section>

          </>
        )}

      </main>

      {showBugForm && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>
                <p className="page-label">
                  NEW ISSUE
                </p>

                <h2>Create Bug</h2>
              </div>

              <button
                className="close-button"
                onClick={() => setShowBugForm(false)}
              >
                ×
              </button>

            </div>

            <div className="form-group">

              <label>Bug Title</label>

              <input
                type="text"
                placeholder="Example: Login button not working"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>Description</label>

              <textarea
                placeholder="Describe what happened..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>Severity</label>

                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>

              </div>

              <div className="form-group">

                <label>Status</label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Ready for Testing</option>
                  <option>Resolved</option>
                </select>

              </div>

            </div>

            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() => setShowBugForm(false)}
              >
                Cancel
              </button>

              <button
                className="submit-button"
                onClick={handleBugSubmit}
              >
                Create Bug
              </button>

            </div>

          </div>

        </div>

      )}

      {showTestForm && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>
                <p className="page-label">
                  NEW TEST
                </p>

                <h2>Create Test Case</h2>
              </div>

              <button
                className="close-button"
                onClick={() => setShowTestForm(false)}
              >
                ×
              </button>

            </div>

            <div className="form-group">

              <label>Test Case Title</label>

              <input
                type="text"
                placeholder="Example: Verify user login"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>Test Steps</label>

              <textarea
                placeholder="Enter the steps to perform the test..."
                value={testSteps}
                onChange={(e) => setTestSteps(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>Expected Result</label>

              <textarea
                placeholder="What should happen?"
                value={expectedResult}
                onChange={(e) => setExpectedResult(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>Status</label>

              <select
                value={testStatus}
                onChange={(e) => setTestStatus(e.target.value)}
              >
                <option>Not Run</option>
                <option>Passed</option>
                <option>Failed</option>
              </select>

            </div>

            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() => setShowTestForm(false)}
              >
                Cancel
              </button>

              <button
                className="submit-button"
                onClick={handleTestSubmit}
              >
                Create Test Case
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default App