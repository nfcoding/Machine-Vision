import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Card, CardBody, CardHeader, Form, Col, Container, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { getUsersApi, postUserApi, putUserApi } from "../services/user";
import Select from "react-select";

const User = () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [action, setAction] = useState("create");
  const [id, setId] = useState("");
  const titleOption = [
    { label: "Mr", value: "mr" },
    { label: "Mrs", value: "mrs" },
    { label: "Miss", value: "miss" },
  ];
  const columns = [
    {
      name: "Nama",
      selector: (row) => (row.nama ? row.nama : "-"),
    },
    {
      name: "Picture",
      selector: (row) => (row.picture ? row.picture : "-"),
    },

    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex">
          <Button color="primary" className="me-2" size="sm" onClick={() => console.log(row.id)}>
            Detail
          </Button>

          <Button color="success" className="me-2" size="sm" onClick={() => console.log(row.id)}>
            Edit
          </Button>

          <Button color="danger" className="me-2" size="sm" onClick={() => console.log(row.id)}>
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  // LOAD USER
  const getData = async () => {
    getUsersApi(page, limit)
      .then((res) => {
        const row = res.data.data;

        setData(row);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
  }, [page, limit]);

  const handleCreateUser = () => {
    setAction("create");
    setModal(true);
  };

  const toggle = () => setModal(!modal);

  const onClosedModal = () => {
    // setId(null);
  };

  const handleChange = (e, field) => {
    const data = e.target.value;
    if (field === "title") {
      setTitle(e);
    } else if (field === "firstName") {
      setFirstName(data);
    } else if (field === "lastName") {
      setLastName(data);
    } else if (field === "email") {
      setEmail(data);
    } else if (field === "picture") {
      setPicture(data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
          setModal(false);
          getData();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      putUserApi(id, payload)
        .then((res) => {
          setModal(false);
          getData();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h3 className="mb-0">User Page</h3>
            </CardHeader>
            <CardBody>
              <Button className="my-2" color="primary" size="small" type="button" onClick={() => setModal(true)}>
                Create User
              </Button>
              <Row>
                <Col>
                  <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    // paginationTotalRows={totalRows}
                    // paginationDefaultPage={currentPage}
                    // onChangeRowsPerPage={handlePerRowsChange}
                    // onChangePage={handlePageChange}
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
        <ModalBody>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Select onChange={(e) => handleChange(e, "title")} options={titleOption} placeholder="Pilih..." value={title} />
            </FormGroup>
            <FormGroup>
              <Label for="firstname">Firstname</Label>
              <Input id="firstname" name="firstname" placeholder="Input Firstname..." type="text" onChange={(e) => handleChange(e, "firstname")} value={firstName} />
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Lastname</Label>
              <Input id="lastname" name="lastname" placeholder="Input lastname..." type="text" onChange={(e) => handleChange(e, "lastname")} value={lastName} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input id="email" name="email" placeholder="Input email..." type="text" onChange={(e) => handleChange(e, "email")} value={email} />
            </FormGroup>
            <FormGroup>
              <Label for="picture">Picture</Label>
              <Input id="picture" name="picture" placeholder="Input picture..." type="text" onChange={(e) => handleChange(e, "picture")} value={picture} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      {/* END FORM USER */}
    </Container>
  );
};

export default User;
