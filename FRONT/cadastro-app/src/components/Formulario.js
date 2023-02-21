import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

//criação stylo do formulario de inputs
const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  itens com flex: 1;  
  background-color: 	#D3D3D3;
  padding: 20px;
  width: 1280px;
  gap: 10px;
  flex-wrap: wrap;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;

`;
// manipulando os inputs de modo permanecer linha.
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;
//style dos inputs
const Input = styled.input`
  border: 1px solid #bbb;
  border-radius: 5px;
  width: 400px;
  padding: 0 10px;
  height: 40px;
`;

const Label = styled.label``;
// style do botao
const Button = styled.button`
  width: 420px;
  padding: 10px;
  background-color: #6a5acd;
  color: white;
  height: 42px;
  cursor: pointer;
  border-radius: 5px;
  border: none; 
`;
// Metodo comportamento botão de edição
const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.endereco.value = onEdit.endereco;
      user.numero.value = onEdit.numero;
      user.uf.value = onEdit.uf;
      user.complemento.value = onEdit.complemento;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  // Metodo responsavel pela execução do vento handle pós clique.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.endereco.value ||
      !user.numero.value ||
      !user.uf.value ||
      !user.complemento.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          endereco: user.endereco.value,
          numero: user.numero.value,
          uf: user.uf.value,
          complemento: user.complemento.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          endereco: user.endereco.value,
          numero: user.numero.value,
          uf: user.uf.value,
          complemento: user.complemento.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.endereco.value = "";
    user.numero.value = "";
    user.uf.value = "";
    user.complemento.value = "";
    user.data_nascimento.value = "";

    setOnEdit(null);
    getUsers();
  };

  //criação do formulario parte html.
  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Endereço</Label>
        <Input name="endereco" />
      </InputArea>
      <InputArea>
        <Label>Número</Label>
        <Input name="numero" />
      </InputArea>
      <InputArea>
        <Label>Estado</Label>
        <Input name="uf" />
      </InputArea>
      <InputArea>
        <Label>Complemento</Label>
        <Input name="complemento" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
