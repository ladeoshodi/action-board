import VertBoardView from "./VertBoardView";

function Board() {
  return (
    <section className="section">
      <div className="box">
        <p>Main Board</p>
        <button className="button is-ghost">Add new list +</button>
      </div>
      <VertBoardView />
    </section>
  );
}

export default Board;
