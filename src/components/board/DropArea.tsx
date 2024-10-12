import { useState } from "react";

interface DropAreaProp {
  onDrop: () => void;
}

function DropArea({ onDrop }: DropAreaProp) {
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
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={showDrop ? "section drop-area mb-3" : "hide-drop"}
    >
      Drop Here
    </section>
  );
}

export default DropArea;
