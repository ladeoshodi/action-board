import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../interfaces/outletContext";

function VertBoardView() {
  const { user } = useOutletContext<IOutletContext>();
  console.log(user);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${user?.lists.length}, 1fr)`,
    gap: "10px",
  };

  return (
    <div className="board" style={gridStyle}>
      {user?.lists.map((list, key) => {
        return (
          <div className="box" key={key}>
            {list.name}
          </div>
        );
      })}
    </div>
  );
}

export default VertBoardView;
