import GlobalStyle from "./styles/global.js";
import styled from "styled-components";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";
import React, { useState, useEffect } from "react";
import { defaultApiUrl } from "./settings.js";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users , setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const getUsers= async () => {
    try {
    const res = await axios.get(defaultApiUrl);
      setUsers(res.data);
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(()=> {
    getUsers();
  }, [setUsers]);
  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left"/>
      <GlobalStyle/>
    </>
  );
}

export default App;
