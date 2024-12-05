import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
import { useNavigate } from "react-router-dom";

export function Option1() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
  
    // Use useEffect to show the modal as soon as the component is mounted
    useEffect(() => {
      setShow(true); // Open the modal when the component mounts
    }, []); // Empty dependency array ensures this runs once after the initial render
  
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Profile: -username- displayed
          Credential Count: -total credential count displayed-
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export function Option2() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();  // Initialize navigate function
  
    const handleClose = () => setShow(false);
  
    // Use useEffect to show the modal as soon as the component is mounted
    useEffect(() => {
      setShow(true); // Open the modal when the component mounts
    }, []); // Empty dependency array ensures this runs once after the initial render
  
    const handleLogout = async () => {
      try {
        //need to clear user data
        sessionStorage.setItem('token',"INVALID_TOKEN")
        navigate("/login");
      } catch (error) {
        console.error("Logout failed", error);
      }
    };
  
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export function Option3() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();  // Initialize navigate function
  
    const handleClose = () => setShow(false);
  
    // Use useEffect to show the modal as soon as the component is mounted
    useEffect(() => {
      setShow(true); // Open the modal when the component mounts
    }, []); // Empty dependency array ensures this runs once after the initial render
  
    const handleDelete = async () => {
      try {
        
        //need to delete user data
        sessionStorage.setItem('token',"INVALID_TOKEN")
        //need to delete user
        navigate("/signup");
      } catch (error) {
        console.error("Delete account failed", error);
      }
    };
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to delete your account? 
        This action cannot be reversed and you will loose all your credentials.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

