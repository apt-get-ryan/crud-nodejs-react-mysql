import React, { useEffect, useRef} from 'react';
import styled from "styled-components";
import { toast } from 'react-toastify';
import { defaultApiUrl } from '../settings';
import axios from 'axios';

const FormContainer = styled.form`
    display: flex;
    align-items: end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;
const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;
const Input = styled.input`
    display: block;
    margin: 0;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;
const Label = styled.label``;
const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;
const CancelButton = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #e9d543;
    color: white;
    height: 42px;
`;

function Form({onEdit, setOnEdit, getUsers}) {
    const ref = useRef();
    useEffect(() => {
        if(onEdit) {
            const user = ref.current;
            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.data_nascimento.value = onEdit.data_nascimento;
        }

    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;
        if(
            !user.nome.value ||
            !user.email.value ||
            !user.fone.value ||
            !user.data_nascimento.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios.put(defaultApiUrl + onEdit.id, {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                data_nascimento: user.data_nascimento.value
            })
            .then(({data}) => toast.success(data))
            .catch(({data}) => toast.error(data));
        } else {
            await axios.post(defaultApiUrl, {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                data_nascimento: user.data_nascimento.value
            })
            .then(({data}) => toast.success(data))
            .catch(({data}) => toast.error(data));
        }

        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.data_nascimento.value = "";

        setOnEdit(null);
        getUsers();

    };
    function handleCancelButton(e) {
        e.preventDefault();
        const user = ref.current;
        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.data_nascimento.value = "";
        setOnEdit(null);
    }

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome"/>
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name="email" type="email"/>
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone"/>
            </InputArea>
            <InputArea>
                <Label>Data de nascimento</Label>
                <Input name="data_nascimento" type="date"/>
            </InputArea>
            <div>
            <Button  type="submit">SALVAR</Button>
            </div>
            { onEdit && <CancelButton onClick={handleCancelButton}>CANCELAR</CancelButton>}
        </FormContainer>
    )
}

export default Form