import { node, string } from "prop-types";
import Title from "../title/Title";

import "./block.css";

function Block({ children, text }) {
  return (
    <div className="block-container">
      <Title text={text} />
      <div className="border-container">{children}</div>
    </div>
  );
}

Block.propTypes = {
  children: node,
  text: string,
};

export default Block;
