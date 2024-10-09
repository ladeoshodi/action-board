import ActionBoardLogo from "../../assets/action-board-1.png";

import "../../styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="body-content">
      <figure className="logo-image">
        <img src={ActionBoardLogo} />
      </figure>
    </div>
  );
}

export default LandingPage;
