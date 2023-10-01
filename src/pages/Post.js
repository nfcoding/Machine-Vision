import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Card, CardBody, CardHeader, Form, Col, Container, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, FormText } from "reactstrap";
import { deletePostApi, getPostApi, getPostsApi, postPostApi, putPostApi } from "../services/post";
import { optionUserApi } from "../services/option";
import Select from "react-select";
import Swal from "sweetalert2";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";

const Post = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [ownerOption, setOwnerOption] = useState([]);
  const [owner, setOwner] = useState("");
  const [errorOwner, setErrorOwner] = useState(false);
  const [text, setText] = useState("");
  const [errorText, setErrorText] = useState(false);
  const [image, setImage] = useState("");
  const [errorImage, setErrorImage] = useState(false);
  const [likes, setLikes] = useState(0);
  const [tags, setTags] = useState([]);
  const [errorTags, setErrorTags] = useState(false);
  const [action, setAction] = useState("create");
  const [id, setId] = useState("");
  const [modalPreviewPicture, setModalPreviewPicture] = useState(false);
  const [previewPictureUrl, setPreviewPictureUrl] = useState("");

  const columns = [
    {
      name: "Text",
      selector: (row) => row.text,
    },
    {
      name: "Tags",
      selector: (row) => row?.tags?.map((item) => `${item} `),
    },
    {
      name: "Image",
      selector: (row) => (row.image ? <img src={row.image} alt="profil" style={{ width: "3rem", height: "3rem" }} onClick={() => handleShowPicture(row.image)} /> : "-"),
    },
    {
      name: "User",
      selector: (row) => row?.owner?.firstName + " " + row?.owner?.lastName,
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

  // LOAD OPTION USER
  const getOptionOwner = async () => {
    optionUserApi()
      .then((res) => {
        let option = res.data.data.map((item) => {
          return { label: item.firstName + " " + item.lastName, value: item.id };
        });
        setOwnerOption(option);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (modal === true && action === "create") {
      getOptionOwner();
    }
  }, [modal]);

  // LOAD POST
  const getData = async () => {
    getPostsApi(page - 1, limit)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setTotalRows(res.data.total);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const handleCreatePost = () => {
    setAction("create");
    setModal(true);
  };

  const toggle = () => setModal(!modal);
  const toggleModalPreview = () => setModalPreviewPicture(!modalPreviewPicture);

  const handleShowPicture = (url) => {
    setModalPreviewPicture(true);
    setPreviewPictureUrl(url);
  };

  const resetErrorMessage = () => {
    setErrorImage(false);
    setErrorOwner(false);
    setErrorText(false);
    setErrorTags(false);
  };

  const onClosedModal = () => {
    setAction("create");
    setId(null);
    setText("");
    setImage("");
    setLikes(0);
    setTags("");
    setOwner("");
    resetErrorMessage();
  };

  const handleChange = (e, field) => {
    if (field === "owner") {
      setOwner(e);
    } else if (field === "text") {
      setText(e.target.value);
    } else if (field === "image") {
      setImage(e.target.value);
    } else if (field === "likes") {
      setLikes(e.target.value);
    } else if (field === "tags") {
      setTags(e.target.value);
    }
  };

  const handleChangeTags = (tags) => {
    setTags(tags);
  };

  const validation = () => {
    if (text === "") {
      setErrorText("Text required!");
    } else if (text.length < 6) {
      setErrorText("Minimal text length is 6!");
    } else {
      setErrorText(false);
    }
    if (image === "") {
      setErrorImage(true);
    } else {
      setErrorImage(false);
    }

    if (tags.length === 0) {
      setErrorTags(true);
    } else {
      setErrorTags(false);
    }
    if (owner === "") {
      setErrorOwner(true);
    } else {
      setErrorOwner(false);
    }

    if (errorText !== false || image === "" || tags.length === 0 || owner === "") {
      setLoading(false);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    resetErrorMessage();

    if (validation()) {
      const payload = {
        text,
        image,
        likes,
        tags,
        owner: owner.value,
      };

      if (action === "create") {
        postPostApi(payload)
          .then((res) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Data created !",
              showConfirmButton: false,
              timer: 2000,
              showCloseButton: true,
            });
            setModal(false);
            setLoading(false);

            getData();
          })
          .catch((e) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Something Wrong !",
              showConfirmButton: false,
              timer: 2000,
              showCloseButton: true,
            });
            setLoading(false);

            console.log(e);
          });
      } else {
        putPostApi(id, payload)
          .then((res) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Data updated !",
              showConfirmButton: false,
              timer: 2000,
              showCloseButton: true,
            });
            setModal(false);
            setLoading(false);
            getData();
          })
          .catch((e) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Something Wrong !",
              showConfirmButton: false,
              timer: 2000,
              showCloseButton: true,
            });
            setLoading(false);
          });
      }
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
    setId(id);
    getPostApi(id)
      .then((res) => {
        const data = res.data;
        getOptionOwner().then(() => {
          const selectedOwner = ownerOption.find((item) => item.value === data.owner.id);
          setOwner(selectedOwner);
        });
        setText(data.text);
        setImage(data.image);
        setLikes(data.likes);
        setTags(data.tags);
        setModal(true);
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Something Wrong!",
          text: e,
          timer: 2000,
          showCloseButton: true,
          position: "top-end",
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
        deletePostApi(id)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Data Deleted !",
              position: "top-end",
              timer: 2000,
              showCloseButton: true,
            });
            getData();
          })
          .catch((e) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Something Wrong !",
              showConfirmButton: false,
              timer: 2000,
              showCloseButton: true,
            });
          });
      }
    });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h3 className="mb-0">Post Page</h3>
            </CardHeader>
            <CardBody>
              <Button className="my-2" color="primary" size="small" type="button" onClick={() => handleCreatePost()}>
                Create Post
              </Button>
              <Row>
                <Col>
                  <DataTable columns={columns} data={data} pagination paginationServer paginationTotalRows={totalRows} paginationDefaultPage={page} onChangeRowsPerPage={handlePerRowsChange} onChangePage={handlePageChange} />
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
              <Label for="owner">Owner</Label>
              <Select onChange={(e) => handleChange(e, "owner")} options={ownerOption} placeholder="Pilih..." value={owner} />
              {errorOwner && <FormText color="danger">Owner required!</FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="text">Text</Label>
              <Input id="text" name="text" placeholder="Input text..." type="textarea" minLength="6" maxLength="50" onChange={(e) => handleChange(e, "text")} value={text} />
              <FormText color="secondary">
                <small>Min Length 6, Max Length 50</small>
              </FormText>
              <br />
              {errorText && <FormText color="danger">{errorText}</FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input id="image" name="image" placeholder="Input image url..." type="text" onChange={(e) => handleChange(e, "image")} value={image} />
              {errorImage && <FormText color="danger">Image required!</FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="likes">Likes</Label>
              <Input id="likes" name="likes" placeholder="Input likes..." type="text" onChange={(e) => handleChange(e, "likes")} value={likes} />
            </FormGroup>
            <FormGroup>
              <Label for="tags">Tags</Label>
              {/* <Input id="tags" name="tags" placeholder="Input tags..." type="text" onChange={(e) => handleChange(e, "tags")} value={tags} /> */}
              <TagsInput value={tags.length > 0 ? tags : []} onChange={(e) => handleChangeTags(e)} />
              {errorTags && <FormText color="danger">Tags required!</FormText>}
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
    </Container>
  );
};

export default Post;
