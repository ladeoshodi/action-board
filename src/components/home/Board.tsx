import { useOutletContext } from "react-router-dom";
import VertBoardView from "./VertBoardView";
import { IOutletContext } from "../../interfaces/outletContext";

function Board() {
  const { user } = useOutletContext<IOutletContext>();
  console.log(user);

  return (
    <section className="section">
      <div className="box">
        <p>Main Board</p>
      </div>
      <VertBoardView />
    </section>
  );
}

export default Board;
