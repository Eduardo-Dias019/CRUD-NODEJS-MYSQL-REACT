import React from "react";
import "./cards.css";
import FormDialog from "../../dialog/dialog";

const Cards = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickCard = () => {
    setOpen(true);
  };
  return (
    <div>
      <FormDialog
        open={open}
        setOpen={setOpen}
        name={props.name}
        cost={props.cost}
        category={props.category}
        id={props.id}
      />
      <div
        className="card-container"
        onClick={() => {
          handleClickCard();
        }}
      >
        <h1 className="card-title">{props.name}</h1>
        <p className="card-cost">R$ {props.cost}</p>
        <p className="card-category">{props.category}</p>
      </div>
    </div>
  );
};

export default Cards;
