import React, { useEffect, useState } from "react";
import { Card, CardBody, CardText, Col, Container, Input, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import { getPostByTagApi, getPostsApi } from "../services/post";

const Home = () => {
  const [data, setData] = useState([]);
  const [, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [limit] = useState(8);
  // const pagesCount = Math.ceil(totalRows / limit);

  const [keyword, setKeyword] = useState("");

  // LOAD POST
  const getData = async () => {
    if (keyword) {
      getPostByTagApi(page, limit, keyword)
        .then((res) => {
          setData(res.data.data);
          setTotalRows(res.data.total);
          setPagesCount(Math.ceil(res.data.total / limit));
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      getPostsApi(page, limit)
        .then((res) => {
          setData(res.data.data);
          setTotalRows(res.data.total);
          setPagesCount(Math.ceil(res.data.total / limit));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const handleClick = (e, index) => {
    e.preventDefault();

    setPage(index);
  };

  const handleSubmitSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setPage(0);
      getData();
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col xs={12} md={4}>
          <Input id="text" name="text" placeholder="Search by tag (single tag)" type="text" onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => handleSubmitSearch(e)} />
        </Col>
      </Row>

      <div className="mt-4">
        <Row>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <Col md={3} className="mb-2" key={index + 1}>
                <Card>
                  <img alt="Card" src={item?.image ?? "/public/no image.png"} height="250rem" />
                  <CardBody>
                    <CardText>
                      <b>{item?.owner?.firstName + "_" + item?.owner?.lastName}</b>
                      <br />
                      <span>{item?.text}</span>
                      <br />
                      <span className="text-primary">{item?.tags?.map((tag) => tag)}</span>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Col md={12} className="mb-2">
              <Card>
                <CardBody>
                  {/* <CardTitle tag="h5">{data.owner.firstName}</CardTitle> */}
                  <CardText>
                    <h4>No Post Available...</h4>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          )}

          <Col xs={12} className="d-flex justify-content-center mt-3">
            <Pagination>
              <PaginationItem disabled={page <= 0}>
                <PaginationLink onClick={(e) => handleClick(e, page - 1)} previous href="#" />
              </PaginationItem>

              {[...Array(pagesCount)].map((item, i) => {
                return (
                  <PaginationItem active={page === i} key={i}>
                    <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem disabled={page >= pagesCount - 1}>
                <PaginationLink onClick={(e) => handleClick(e, page + 1)} next href="#" />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Home;
