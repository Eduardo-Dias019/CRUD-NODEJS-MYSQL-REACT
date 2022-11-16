import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    cost: props.cost,
    category: props.category,
  });

  const handleEditGame = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      name: editValues.name,
      cost: editValues.cost,
      category: editValues.category,
    }).then(() => {});
    handleClose();
    document.location.reload();
  };

  const handleDeleteGames = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
    handleClose();
    document.location.reload();
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChangeValues = (value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [value.target.id]: value.target.value,
    }));
    document.location.reload();
  };
  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome do jogo"
            type="text"
            defaulValue={props.name}
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="cost"
            label="Preço do jogo"
            type="text"
            defaulValue={props.cost}
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Categoria do jogo"
            type="text"
            defaulValue={props.category}
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditGame}>Salvar</Button>
          <Button onClick={handleDeleteGames}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
