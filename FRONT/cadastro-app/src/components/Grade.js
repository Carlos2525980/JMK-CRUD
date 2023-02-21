import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

//style da grid
const Table = styled.table`
  background-color: #fff;
  padding: 10px;
  width: 10000px;
  height: 300px;
  box-shadow: 0px 0px 5px #ccc;
  margin: 20px;
  background-color: #d3d3d3;
  border-radius: 5px;
  max-width: 1320px;
`;
//Comportamento da grid quando estiver na resolução 500px
export const Tr = styled.tr``;
export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Th = styled.th`
  padding-bottom: 5px;
  text-align: start;
  border-bottom: inset;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
  padding-top: 15px;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };
  //função de evento delete
  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
    setOnEdit(null);
  };
  // formato da grid html
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th onlyWeb>Telefone</Th>
          <Th>Endereço</Th>
          <Th>Número</Th>
          <Th>UF</Th>
          <Th>Complemento</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td width="20%">{item.email}</Td>
            <Td width="10%" onlyWeb>
              {item.fone}
            </Td>
            <Td width="20%">{item.endereco}</Td>
            <Td width="10%">{item.numero}</Td>
            <Td width="30%">{item.uf}</Td>
            <Td width="30%">{item.complemento}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
