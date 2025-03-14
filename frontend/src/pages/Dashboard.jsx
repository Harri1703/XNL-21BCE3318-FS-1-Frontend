import React, { useState, useEffect } from "react";
import { Container, Button, Table, Form, Row, Col, Alert, Card, Modal } from "react-bootstrap";
import NavigationBar from "../components/Navbar";

const API_BASE = "https://fulfilling-dream-fintech.up.railway.app";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [transferTo, setTransferTo] = useState("");

  // Modal State for confirmation popups
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");

  useEffect(() => {
    fetchUser();
    fetchAccounts();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_BASE}/users/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (response.ok) setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await fetch(`${API_BASE}/accounts/fetch`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (response.ok) setAccounts(data.accounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/users/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();

      if (response.ok) {
        setUsers(data); // ✅ Directly setting data as it is an array
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
};


  const handleConfirmAction = async () => {
    setShowModal(false);
    if (modalAction === "deposit") {
      await depositMoney();
    } else if (modalAction === "withdraw") {
      await withdrawMoney();
    } else if (modalAction === "transfer") {
      await transferMoney();
    }
  };

  const handleAction = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  const createAccount = async () => {
    try {
      const response = await fetch(`${API_BASE}/accounts/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Account created successfully!");
        fetchAccounts();
      }
    } catch (error) {
      setMessage("Error creating account");
    }
  };

  const getBalance = async () => {
    try {
      const response = await fetch(`${API_BASE}/accounts/getbalance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ accountNumber: selectedAccount }),
      });
      const data = await response.json();
      if (response.ok) setBalance(data.balance);
    } catch (error) {
      setMessage("Error fetching balance");
    }
  };

  const depositMoney = async () => {
    try {
      const response = await fetch(`${API_BASE}/accounts/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ accountNumber: selectedAccount, amount: parseFloat(amount) }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Deposit successful!");
        fetchAccounts();
      }
    } catch (error) {
      setMessage("Error depositing money");
    }
  };

  const withdrawMoney = async () => {
    try {
      const response = await fetch(`${API_BASE}/accounts/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ accountNumber: selectedAccount, amount: parseFloat(amount) }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Withdrawal successful!");
        fetchAccounts();
      }
    } catch (error) {
      setMessage("Error withdrawing money");
    }
  };

  const transferMoney = async () => {
    if (!selectedAccount || !transferTo || !amount) {
      setMessage("Please enter valid account details");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/accounts/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          fromAccountNumber: selectedAccount,
          toAccountNumber: transferTo,
          amount: parseFloat(amount),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Transfer successful!");
        fetchAccounts();
      } else {
        setMessage(`Transfer failed!`);
      }
    } catch (error) {
      setMessage(`Error transferring money: ${error.message}`);
    }
  };

  return (
    <div style={{ backgroundColor: "#1c1c1c", minHeight: "100vh", color: "white" }}>
      <NavigationBar />
      <Container className="mt-4">
        {message && <Alert variant="info">{message}</Alert>}
        <h3>Welcome, {user?.name}</h3>

        {user?.role === "user" && (
          <>
            <Card className="bg-dark text-white p-3 mb-4">
              <Button variant="primary" onClick={createAccount}>Create Account</Button>
            </Card>

            <Card className="bg-dark text-white p-3">
              <Form.Select onChange={(e) => setSelectedAccount(e.target.value)} className="mb-3">
                <option>Select an Account</option>
                {accounts.map((acc) => (
                  <option key={acc.accountNumber} value={acc.accountNumber}>
                    {acc.accountNumber}
                  </option>
                ))}
              </Form.Select>

              <Button variant="success" onClick={getBalance}>Get Balance</Button>
              {balance !== null && <h5 className="mt-2">Balance: ₹{balance}</h5>}
            </Card>

            <Card className="bg-dark text-white p-3 mt-4">
              <Row>
                <Col>
                  <Form.Control type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </Col>
                <Col xs="auto">
                  <Button variant="warning" onClick={() => handleAction("deposit")}>Deposit</Button>
                </Col>
                <Col xs="auto">
                  <Button variant="danger" onClick={() => handleAction("withdraw")}>Withdraw</Button>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Form.Control type="text" placeholder="Receiver Account Number" value={transferTo} onChange={(e) => setTransferTo(e.target.value)} />
                </Col>
                <Col xs="auto">
                  <Button variant="info" onClick={() => handleAction("transfer")}>Transfer</Button>
                </Col>
              </Row>
            </Card>
          </>
        )}

{user?.role === "admin" && (
  <>
    <Card className="bg-dark text-white p-3">
      <Button variant="secondary" onClick={fetchUsers}>View All Users</Button>
    </Card>

    {users.length > 0 ? (
      <Table striped bordered hover variant="dark" className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined On</th>
          </tr>
        </thead>
        <tbody>
          {users.map((usr) => (
            <tr key={usr.id}>
              <td>{usr.name}</td>
              <td>{usr.email}</td>
              <td>{usr.role}</td>
              <td>{new Date(usr.createdAt).toLocaleDateString()}</td> {/* ✅ Formats date */}
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <p className="mt-3">No users found</p>
    )}
  </>
)}

      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Confirm {modalAction}</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to {modalAction} ${amount}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleConfirmAction}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
