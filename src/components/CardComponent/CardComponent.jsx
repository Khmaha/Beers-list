import React, { useState, useEffect } from "react";
import { Skeleton, Card, Avatar, Button, Tag } from "antd";
import ModalComponent from "../commun/ModalComponent/ModalComponent";
import "./CardComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SkeletonComponent from "../commun/SkeletonComponent/SkeletonComponent";
import useHooks from "../../useHooks";
import { EyeOutlined } from "@ant-design/icons";
import { addToCardBeerList, deleteBeerFromPannier } from "../../store/actions";
const { Meta } = Card;
const CardComponent = ({ beer, type }) => {
  const navigate = useNavigate();
  const { loading } = useHooks();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const cardBeerList = state.cardBeerList;
  const cardBeer =
    cardBeerList && cardBeerList.length > 0
      ? cardBeerList.filter((x) => x.id === beer.id)
      : [];
  const [orderSelectedBeer, setOrderSelectedBeer] = useState(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    if (cardBeer && cardBeer.length > 0) {
      setOrderSelectedBeer(cardBeer[0].id);
    }
  }, []);
  const callModalDelete = (isVisible) => {
    setIsModalVisible(isVisible);
  };
  const handleDeleteBeerFromPanier = async ({ id }) => {
    await callModalDelete(false);
    await dispatch(deleteBeerFromPannier({ payload: id }));
  };
  const navigateToBeerDetail = (id) => {
    navigate("/detail/" + id);
  };
  const handleOrderBeers = (beer, ordred) => {
    if (ordred) {
      dispatch(deleteBeerFromPannier({ payload: beer.id }));
      setOrderSelectedBeer(-1);
    } else {
      dispatch(addToCardBeerList({ payload: beer }));
      setOrderSelectedBeer(beer.id);
    }
  };

  return (
    <>
      {beer && loading && type === "order" ? (
        <Skeleton></Skeleton>
      ) : (
        <Card
          hoverable={true}
          style={{ marginTop: 5 }}
          bordered={true}
          loading={loading}
          className={`${type}-comp`}
          cover={
            loading ? (
              type === "beers" ? (
                <Skeleton.Image
                  className={`${type}-comp__skeleton`}
                  active
                ></Skeleton.Image>
              ) : (
                <SkeletonComponent
                  shape={"square"}
                  size="large"
                  rows="2"
                ></SkeletonComponent>
              )
            ) : (
              type === "beers" && (
                <img
                  alt="beer"
                  width="100%"
                  height="100%"
                  className={`${type}-comp__img`}
                  src={beer.image_url}
                />
              )
            )
          }
          actions={
            loading
              ? null
              : [
                  type === "beers" ? (
                    <div className={`${type}-comp__actions`}>
                      <span className={`${type}-comp__actions__btns`}>
                        {orderSelectedBeer === beer.id ? (
                          <span
                            className={`${type}-comp__actions__btns--add ordred`}
                            style={{ color: "green" }}
                          >
                            <Button
                              className={`${type}-comp__actions__btns--delete`}
                            >
                              <span
                                onClick={() => handleOrderBeers(beer, true)}
                              >
                                {" "}
                                Retirer
                              </span>
                            </Button>
                          </span>
                        ) : (
                          <Button
                            className={`${type}-comp__actions__btns--add`}
                          >
                            <span onClick={() => handleOrderBeers(beer, false)}>
                              Commander
                            </span>
                          </Button>
                        )}
                        <span
                          className={`${type}-comp__actions__btns--detail`}
                          onClick={() => navigateToBeerDetail(beer.id)}
                        >
                          {"En savoir plus"}
                        </span>
                      </span>
                    </div>
                  ) : (
                    !loading && (
                      <div className={`${type}-comp__actions`}>
                        <span
                          className={`${type}-comp__actions ${type}-comp__actions--view icon-view`}
                          onClick={() => navigateToBeerDetail(beer.id)}
                        >
                          {" "}
                          <EyeOutlined />
                        </span>
                        <span
                          className={`${type}-comp__actions ${type}-comp__actions--trash icon-trash`}
                          onClick={() => callModalDelete(true)}
                        ></span>
                      </div>
                    )
                  ),
                ]
          }
        >
          <Meta
            className={`${type}-comp__title`}
            avatar={
              type === "order" && (
                <Avatar
                  src={beer.image_url}
                  className={`${type}-comp__avatar`}
                  shape="square"
                  size="large"
                />
              )
            }
            title={
              <span>
                <span
                  className={`${type}-comp__title ${
                    type === "beers" ? "horizontal" : "vertical"
                  }`}
                >
                  <span className={`${type}-comp__title--text`}>
                    {beer.name}
                  </span>
                  <span className={`${type}-comp__title--tag`}>
                    {beer.boil_volume &&
                      Object.keys(beer.boil_volume).length > 0 && (
                        <Tag color="orange">
                          {beer.boil_volume.value + " " + beer.boil_volume.unit}
                        </Tag>
                      )}
                  </span>
                </span>
              </span>
            }
          />
        </Card>
      )}
      {isModalVisible && (
        <ModalComponent
          title="Voulez-vous vraiment supprimer cette bière de votre panier ? "
          visible={isModalVisible}
          handleCancel={() => callModalDelete(false)}
          handleOk={() => handleDeleteBeerFromPanier({ id: beer.id })}
        >
          <Card bordered={false} className="modal-card">
            <Meta
              className="modal-card__title"
              avatar={
                <Avatar
                  src={beer.image_url}
                  className="modal-card__avatar"
                  shape="square"
                  size="large"
                />
              }
              title={
                <span>
                  <span
                    className={`${type}-comp__title modal ${
                      type === "beers" ? "horizontal" : "vertical"
                    }`}
                  >
                    <span className={`${type}-comp__title--text `}>
                      {beer.name}
                    </span>
                    <span className={`${type}-comp__title--tag`}>
                      {beer.boil_volume &&
                        Object.keys(beer.boil_volume).length > 0 && (
                          <Tag color="orange">
                            {beer.boil_volume.value +
                              " " +
                              beer.boil_volume.unit}
                          </Tag>
                        )}
                    </span>
                  </span>
                </span>
              }
            />
          </Card>
        </ModalComponent>
      )}
    </>
  );
};

export default CardComponent;
