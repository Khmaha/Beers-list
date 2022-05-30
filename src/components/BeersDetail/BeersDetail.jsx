import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useHooks from "../../useHooks";
import { Tag, Space, PageHeader } from "antd";
import "./BeersDetail.scss";
import SkeletonComponent from "../commun/SkeletonComponent/SkeletonComponent";
import TableComponent from "../commun/TableComponent/TableComponent";
const BeersDetail = () => {
  const state = useSelector((state) => state);
  const cardBeerList = state.cardBeerList;
  const { getBeersByIdCallApi, loading } = useHooks();
  const { id } = useParams();
  const beerDetail = state.beerDetail;
  const beerOrdred = cardBeerList.filter((x) => x.id === parseInt(id));
  useEffect(() => {
    getBeersByIdCallApi(parseInt(id));
  }, []);
  const getIngredientColumns = (type) => {
    const columns = [
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        columnWidth: "25%",
        render: (text) => <span>{text}</span>,
      },
      {
        title: "Attribute",
        dataIndex: "attribute",
        key: "attribute",
        columnWidth: "25%",
        render: (text) => <span>{text}</span>,
      },
      {
        title: "Quantity",
        key: "quantity",
        dataIndex: "quantity",
        columnWidth: "25%",
        render: (quantity) =>
          quantity &&
          Object.keys(quantity).length && (
            <Tag color={"orange"}>{quantity.value + " " + quantity.unit}</Tag>
          ),
      },
    ];
    // if (type == "hops") {
    //   columns.splice(1, 0, {
    //     title: "Attribute",
    //     dataIndex: "attribute",
    //     key: "attribute",
    //     render: (text) => <span>{text}</span>,
    //   });
    // }
    return columns;
  };
  const getIngredientData = (array, type) => {
    var data = [];
    array &&
      array.length &&
      array.map((x, index) => {
        console.log("x", x);
        var obj = {
          key: type,
          attribute: x.attribute ? x.attribute : "-",
          category: x.name,
          quantity: x.amount,
          total: Math.floor(Math.random() * 90 + 10),
          passed_total: Math.floor(Math.random() * 90 + 10),
        };
        // if (type == "hops") {
        //   obj["attribute"] = x.attribute;
        // }
        data.push(obj);
      });
    return data;
  };
  return (
    <div className="beer-detail">
      {loading ? (
        <SkeletonComponent
          shape={"square"}
          size="large"
          rows="4"
        ></SkeletonComponent>
      ) : (
        beerDetail && (
          <>
            <div className="beer-detail__img">
              <img src={beerDetail.image_url} alt="beer_img_detail" />
            </div>
            <div className="beer-detail__content">
              <span className="beer-detail__content-subtitle">
                <span className="beer-detail__content--title">
                  <span>{beerDetail.name}</span>
                  <span className="beer-detail__content--ordred">
                    <Tag color="orange">
                      {beerOrdred && beerOrdred.length > 0
                        ? "Bière commandée"
                        : "Bière non commandée"}
                    </Tag>
                  </span>
                </span>
                <span className="beer-detail__content--tagline">
                  {beerDetail.tagline}
                </span>
              </span>

              <span className="beer-detail__content--description">
                <span style={{ fontWeight: "bold" }}>Description:</span>
                <span style={{ fontWeight: "400" }}>
                  {beerDetail.description}
                </span>
              </span>

              <span className="beer-detail__content--volume">
                <span style={{ fontWeight: "bold" }}>Volume:</span>
                {beerDetail.boil_volume.value +
                  " " +
                  beerDetail.boil_volume.unit}
              </span>
              <span className="beer-detail__content--brewers_tips">
                <span style={{ fontWeight: "bold" }}>Conseils:</span>
                {beerDetail.brewers_tips}
              </span>
              {beerDetail.ingredients &&
                Object.keys(beerDetail.ingredients).length > 0 && (
                  <span className="beer-detail__content--ingredients">
                    <span style={{ fontWeight: "bold" }}>Ingédients:</span>
                    <span className="beer-detail__content--ingredients-description">
                      {beerDetail.ingredients &&
                        //  (
                        //   <TableComponent
                        //     columns={columns}
                        //     data={data}
                        //   ></TableComponent>
                        // )

                        Object.keys(beerDetail.ingredients).length > 0 &&
                        Object.keys(beerDetail.ingredients).map(
                          (ingred, index) => (
                            <div key={index}>
                              {beerDetail.ingredients[ingred] &&
                                beerDetail.ingredients[ingred].length > 0 && (
                                  <>
                                    {/* <span>{ingred + " : "}</span> */}
                                    {/* <span> */}
                                    {typeof beerDetail.ingredients[ingred] ===
                                      "object" && (
                                      <>
                                        <TableComponent
                                          pagination={false}
                                          title={() => "Hedare"}
                                          columns={getIngredientColumns(ingred)}
                                          data={getIngredientData(
                                            beerDetail.ingredients[ingred],
                                            ingred
                                          )}
                                          bordered
                                        ></TableComponent>
                                        <PageHeader
                                          className="site-page-header"
                                          backIcon={false}
                                          title={ingred}
                                        />
                                      </>
                                    )}
                                  </>
                                )}
                            </div>
                          )
                        )}
                      <PageHeader
                        className="site-page-header"
                        backIcon={false}
                        title={beerDetail.ingredients.yeast}
                      />
                    </span>
                  </span>
                )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default BeersDetail;
