import { forwardRef } from "react";

interface EditTaskFormProp {
  closeEditForm: () => void;
}
const EditTaskForm = forwardRef<HTMLDivElement, EditTaskFormProp>(
  function EditTaskForm({ closeEditForm }, ref) {
    return (
      <>
        <div className="modal" ref={ref}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Modal title</p>
            </header>
            <section className="modal-card-body">
              <p>Edit Form</p>
            </section>
            <footer className="modal-card-foot">
              <div className="buttons">
                <button className="button is-success">Save changes</button>
                <button className="button" onClick={closeEditForm}>
                  Cancel
                </button>
              </div>
            </footer>
          </div>
        </div>
      </>
    );
  }
);

export default EditTaskForm;
