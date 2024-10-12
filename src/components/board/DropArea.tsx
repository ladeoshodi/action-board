import { useState } from "react";

function DropArea() {
  const [showDrop, setShowDrop] = useState(false);

  function dragEnter() {
    setShowDrop(true);
  }

  function dragLeave() {
    setShowDrop(false);
  }

  return (
    <section
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      className={showDrop ? "section drop-area mb-3" : "hide-drop"}
    >
      Drop Here
    </section>
  );
}

export default DropArea;
