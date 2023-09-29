import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

const User = () => {
  const [data, setData] = useState([{ nama: "asdasd", picture: "picture" }]);
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

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h3 className="mb-0">User Page</h3>
            </CardHeader>
            <CardBody>
              <Button className="my-2" color="primary" size="small" onClick={() => console.log("asd")}>
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
    </Container>
  );
};

export default User;
