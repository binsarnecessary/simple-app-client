import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export const FormInput = (props) => {
  const {
    show,
    close,
    handleChange,
    errors,
    createHandle,
    CategoryModel,
    mode,
    editHandler,
    deleteHandler,
  } = props;

  var title;
  var button;

  if (mode === "create") {
    title = <Modal.Title>Tambah</Modal.Title>;
    button = (
      <Button variant="primary" onClick={createHandle}>
        Simpan
      </Button>
    );
  } else if (mode === "edit") {
    title = <Modal.Title>Ubah</Modal.Title>;
    button = (
      <Button variant="primary" onClick={editHandler}>
        Ubah
      </Button>
    );
  } else {
    title = <Modal.Title>Hapus</Modal.Title>;
    button = (
      <Button variant="danger" onClick={deleteHandler}>
        Hapus
      </Button>
    );
  }

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>{title}</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            {mode === "delete" ? (
              <h6 className="text-center">Apakah anda yakin Ingin menghapus {CategoryModel.name}?</h6>
            ) : (
              <>
                <Form>
                  <Form.Label>
                    Nama<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="name"
                    value={CategoryModel.name}
                  />
                  <Form.Text className="text-danger mb-3">
                    {errors.name}
                  </Form.Text>
                </Form>
                <Form>
                  <Form.Label>
                    Initial<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="initial"
                    value={CategoryModel.initial}
                  />
                  <Form.Text className="text-danger">
                    {errors.initial}
                  </Form.Text>
                </Form>
              </>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        {button}
      </Modal.Footer>
    </Modal>
  );
};
