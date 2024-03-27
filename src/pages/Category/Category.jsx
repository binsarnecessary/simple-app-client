import React from "react";
import { Container, Button } from "react-bootstrap";
import HeaderNavbar from "../../components/HeaderNavbar";
import CategoryServices from "../../services/CategoryServices";
import { FormInput } from "./FormInput";
import * as Icon from "react-bootstrap-icons";
import Swal from "sweetalert2";
import Cookies from 'js-cookie'

class Category extends React.Component {
  CategoryModel = {
    name: "",
    initial: "",
  };

  constructor() {
    super();

    this.state = {
      listCategory: [],
      show: false,
      mode: "",
      CategoryModel: this.CategoryModel,
      errors: "",
      role: localStorage.getItem("role"),
    };
  }

  handleOpenModal = () => {
    this.setState({
      show: true,
      mode: "create",
    });
  };

  handleCloseModal = () => {
    this.setState({
      show: false,
      errors: "",
      CategoryModel: this.CategoryModel,
    });
  };

  handleGetCategory = async () => {
    const response = await CategoryServices.getAllCategory();

    if (response.success) {
      this.setState({
        listCategory: response.data,
      });
    }
  };

  componentDidMount() {
    this.handleGetCategory();
    console.log(Cookies.get())
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      CategoryModel: {
        ...this.state.CategoryModel,
        [name]: value,
      },
      errors: "",
    });
  };

  createHandle = async () => {
    const { CategoryModel } = this.state;

    if (this.validationHandler()) {
      const response = await CategoryServices.createCategory(CategoryModel);
      console.log(response);
      if (response.success) {
        this.handleGetCategory();
        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
        this.setState({
          show: false,
          CategoryModel: this.CategoryModel,
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: response.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        this.setState({
          CategoryModel: this.CategoryModel,
        });
      }
    }
  };

  openModalEdit = async (id) => {
    const response = await CategoryServices.getCategoryById(id);

    if (response.success) {
      this.setState({
        show: true,
        mode: "edit",
        CategoryModel: response.data,
      });
    }
  };

  validationHandler = () => {
    const { CategoryModel } = this.state;
    var formIsValid = true;
    var errors = {};

    if (CategoryModel.name === "") {
      formIsValid = false;
      errors.name = "Name is Required";
    }
    if (CategoryModel.initial === "") {
      formIsValid = false;
      errors.initial = "Initial is Required";
    }

    this.setState({
      errors: errors,
    });

    return formIsValid;
  };

  editHandler = async () => {
    const { CategoryModel } = this.state;

    if (this.validationHandler()) {
      const response = await CategoryServices.editCategory(CategoryModel);
      console.log(response);
      if (response.success) {
        this.handleGetCategory();
        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
        this.setState({
          show: false,
          CategoryModel: this.CategoryModel,
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: response.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  deleteHandler = async () => {
    const { CategoryModel } = this.state;

    const response = await CategoryServices.softDeleteCategory(CategoryModel);

    if (response.success) {
      this.handleGetCategory();
      Swal.fire({
        title: "Success!",
        text: response.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      this.setState({
        show: false,
        CategoryModel: this.CategoryModel,
      });
    } else {
      Swal.fire({
        title: "Failed!",
        text: response.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  openModalDelete = async (id) => {
    const response = await CategoryServices.getCategoryById(id);

    if (response.success) {
      this.setState({
        show: true,
        mode: "delete",
        CategoryModel: response.data,
      });
    }
  };

  render() {
    const { listCategory, show, mode, CategoryModel, errors, role } =
      this.state;
    return (
      <>
        <HeaderNavbar />
        <div className="main" style={{ backgroundColor: "#F0F1F3" }}>
          <Container>
            <Button
              onClick={this.handleOpenModal}
              className="btn btn-primary mt-5"
            >
              Tambah
            </Button>
            <div className="row" style={{ marginTop: "20px" }}>
              {listCategory.length === 0 ? (
                <h6 style={{ marginTop: "120px", marginLeft: "480px" }}>
                  Data tidak ditemukan
                </h6>
              ) : (
                <>
                  <div className="col mb-5">
                    <div className="card flex-fill">
                      <div className="card-header">
                        <h5 className="card-title mb-0">Category</h5>
                      </div>
                      <table
                        className="table table-hover my-0"
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Category Name</th>
                            <th>Initial</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listCategory.map((data, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data.category_name}</td>
                              <td>{data.category_initial}</td>
                              <td>
                                {role === "Admin" ? (
                                  <>
                                    <Button
                                      variant="outline-primary"
                                      onClick={() =>
                                        this.openModalEdit(data._id)
                                      }
                                    >
                                      <Icon.Pen />
                                    </Button>{" "}
                                    <Button
                                      variant="outline-danger"
                                      onClick={() =>
                                        this.openModalDelete(data._id)
                                      }
                                    >
                                      <Icon.Trash />
                                    </Button>
                                  </>
                                ) : (
                                  <Icon.Eye />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Container>
          <FormInput
            show={show}
            close={this.handleCloseModal}
            mode={mode}
            handleChange={this.handleChange}
            errors={errors}
            createHandle={this.createHandle}
            CategoryModel={CategoryModel}
            editHandler={this.editHandler}
            deleteHandler={this.deleteHandler}
          />
        </div>
      </>
    );
  }
}

export default Category;
