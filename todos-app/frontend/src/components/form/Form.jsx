import { useState } from "react";
import { func } from "prop-types";
import Input from "./input/Input";
import Button from "../shared/button/Button";
import Block from "../shared/block/Block";

import "./form.css";

function Form({ addTodo }) {
  const [content, setContent] = useState("");

  const handleAddTodo = () => {
    addTodo(content);
    setContent("");
  };

  return (
    <Block text="Añade una tarea">
      <Input content={content} setContent={setContent} />
      <Button onClick={handleAddTodo} text="Añadir" />
    </Block>
  );
}

Form.propTypes = {
  addTodo: func,
};

export default Form;
