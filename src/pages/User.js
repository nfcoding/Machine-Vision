import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Card, CardBody, CardHeader, Form, Col, Container, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, FormText } from "reactstrap";
import { deleteUserApi, getUserApi, getUsersApi, postUserApi, putUserApi } from "../services/user";
import Select from "react-select";
import Swal from "sweetalert2";

const User = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [lastName, setLastName] = useState("");
  const [errorLastName, setErrorLastName] = useState(false);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [picture, setPicture] = useState("");
  const [action, setAction] = useState("create");
  const [id, setId] = useState("");
  const [modalPreviewPicture, setModalPreviewPicture] = useState(false);
  const [previewPictureUrl, setPreviewPictureUrl] = useState("");
  const titleOption = [
    { label: "Mr", value: "mr" },
    { label: "Mrs", value: "mrs" },
    { label: "Miss", value: "miss" },
  ];
  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstName + " " + row.lastName
    },
    {
      name: "Picture",
      selector: (row) => (row.picture ? <img src={row.picture} alt='profil' style={{ width: '3rem', height: '3rem' }} onClick={() => handleShowPicture(row.picture)} /> : "-"),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex">
          <Button color="success" className="me-2" size="sm" onClick={() => handleEdit(row.id)}>
            Edit
          </Button>
          <Button color="danger" className="me-2" size="sm" onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // LOAD USER
  const getData = async () => {
    getUsersApi(page - 1, limit)
      .then((res) => {
        setData(res.data.data);
        setTotalRows(res.data.total)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const handleCreateUser = () => {
    setAction("create");
    setModal(true);
  };

  const toggle = () => setModal(!modal);
  const toggleModalPreview = () => setModalPreviewPicture(!modalPreviewPicture);

  const handleShowPicture = (url) => {
    setModalPreviewPicture(true)
    setPreviewPictureUrl(url)
  }

  const setErrorMessage = (e) => {
    let error = e?.response?.data?.data
    if (error?.hasOwnProperty("title")) {
      setErrorTitle(error.title)
    }
    if (error?.hasOwnProperty("firstName")) {
      setErrorFirstName(error.firstName)
    }
    if (error?.hasOwnProperty("lastName")) {
      setErrorLastName(error.lastName)
    }
    if (error?.hasOwnProperty("email")) {
      setErrorEmail(error.email)
    }
  }

  const resetErrorMessage = () => {
    setErrorTitle(false)
    setErrorFirstName(false)
    setErrorLastName(false)
    setErrorEmail(false)
  }

  const onClosedModal = () => {
    setAction('create')
    setId(null);
    setTitle("")
    setFirstName("")
    setLastName("")
    setEmail("")
    setPicture("")
    resetErrorMessage()
  };

  const handleChange = (e, field) => {
    if (field === "title") {
      setTitle(e);
    } else if (field === "firstname") {
      setFirstName(e.target.value);
    } else if (field === "lastname") {
      setLastName(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "picture") {
      setPicture(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    resetErrorMessage()
    const payload = {
      title: title.value,
      firstName,
      lastName,
      email,
      picture,
    };

    if (action === "create") {
      postUserApi(payload)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Data created !',
            showConfirmButton: false,
            timer: 2000,
            showCloseButton: true,
          })
          setModal(false);
          setLoading(false)

          getData();
        })
        .catch((e) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Something Wrong !',
            showConfirmButton: false,
            timer: 2000,
            showCloseButton: true,
          })
          setLoading(false)

          setErrorMessage(e)

          console.log(e)
        });
    } else {
      putUserApi(id, payload)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Data updated !',
            showConfirmButton: false,
            timer: 2000,
            showCloseButton: true,
          })
          setModal(false);
          setLoading(false)
          getData();
        })
        .catch((e) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Something Wrong !',
            showConfirmButton: false,
            timer: 2000,
            showCloseButton: true,
          })
          setLoading(false)
          setErrorMessage(e)
        });

    }

  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (limit, page) => {
    setLimit(limit);
  };

  const handleEdit = async (id) => {
    setAction("update");
    setId(id)
    getUserApi(id)
      .then((res) => {
        const data = res.data
        const selectedTitle = titleOption.find((item) => item.value === data.title)
        setTitle(selectedTitle)
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPicture(data.picture);
        setEmail(data.email);
        setModal(true);
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Something Wrong!",
          text: e,
          timer: 2000,
          showCloseButton: true,
          position: 'top-end'
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Data?",
      text: "Are you sure want to delete this data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserApi(id)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Data Deleted !",
              position: 'top-end',
              timer: 2000,
              showCloseButton: true,
            });
            getData();
          })
          .catch((e) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Something Wrong !',
              showConfirmButton: false,
              timer: 2000,
              showCloseButton: true,
            })
          })
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h3 className="mb-0">User Page</h3>
            </CardHeader>
            <CardBody>
              <Button className="my-2" color="primary" size="small" type="button" onClick={() => handleCreateUser()}>
                Create User
              </Button>
              <Row>
                <Col>
                  <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={page}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* BEGIN FORM USER */}
      <Modal isOpen={modal} toggle={toggle} onClosed={onClosedModal}>
        <ModalHeader toggle={toggle}>User Form</ModalHeader>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Select onChange={(e) => handleChange(e, "title")} options={titleOption} placeholder="Pilih..." value={title} />
              {errorTitle && <FormText color="danger">
                {errorTitle}
              </FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="firstname">Firstname</Label>
              <Input id="firstname" name="firstname" placeholder="Input Firstname..." type="text" onChange={(e) => handleChange(e, "firstname")} value={firstName} />
              {errorFirstName && <FormText color="danger">
                {errorFirstName}
              </FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Lastname</Label>
              <Input id="lastname" name="lastname" placeholder="Input lastname..." type="text" onChange={(e) => handleChange(e, "lastname")} value={lastName} />
              {errorLastName && <FormText color="danger">
                {errorLastName}
              </FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input id="email" name="email" placeholder="Input email..." type="email" onChange={(e) => handleChange(e, "email")} value={email} />
              {errorEmail && <FormText color="danger">
                {errorEmail}
              </FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="picture">Picture</Label>
              <Input id="picture" name="picture" placeholder="Input picture..." type="text" onChange={(e) => handleChange(e, "picture")} value={picture} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
            <Button color="primary" type="submit" disabled={loading}>
              Submit
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      {/* END FORM USER */}
      {/* BEGIN FORM PREVIEW PICTURE */}
      <Modal isOpen={modalPreviewPicture}>
        <ModalHeader toggle={toggleModalPreview}></ModalHeader>
        <img src={previewPictureUrl} alt="priview" />
      </Modal>
      {/* END FORM USER */}
    </Container >
  );
};

export default User;
