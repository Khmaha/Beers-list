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
              <span className="beer-detail__content__title">
                <span className="beer-detail__content__title--subtitle">
                  <span>{beerDetail.name}</span>
                  <span className="beer-detail__content__title--ordred">
                    <Tag color="orange">
                      {beerOrdred && beerOrdred.length > 0
                        ? "Bi??re command??e"
                        : "Bi??re non command??e"}
                    </Tag>
                  </span>
                </span>
                <span className="beer-detail__content__title--tagline">
                  {beerDetail.tagline}
                </span>
              </span>

              <span className="beer-detail__content__description">
                <span className="beer-detail__content__description--name">
                  Description:
                </span>
                <span className="beer-detail__content__description--value">
                  {beerDetail.description}
                </span>
              </span>

              <span className="beer-detail__content__volume">
                <span className="beer-detail__content__volume--name">
                  Volume:
                </span>
                <span className="beer-detail__content__volume--value">
                  {beerDetail.boil_volume.value +
                    " " +
                    beerDetail.boil_volume.unit}
                </span>
              </span>
              <span className="beer-detail__content__brewers_tips">
                <span className="beer-detail__content__brewers_tips--name">
                  Conseils:
                </span>
                <span className="beer-detail__content__brewers_tips--value">
                  {beerDetail.brewers_tips}
                </span>
              </span>
              {beerDetail.ingredients &&
                Object.keys(beerDetail.ingredients).length > 0 && (
                  <span className="beer-detail__content__ingredients">
                    <span style={{ fontWeight: "bold" }}>Ing??dients:</span>
                    <span className="beer-detail__content__ingredients--description">
                      {beerDetail.ingredients &&
                        Object.keys(beerDetail.ingredients).length > 0 &&
                        Object.keys(beerDetail.ingredients).map(
                          (ingred, index) => (
                            <div key={index}>
                              {beerDetail.ingredients[ingred] &&
                                beerDetail.ingredients[ingred].length > 0 && (
                                  <>
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
                                          bordered={true}
                                        ></TableComponent>
                                        <PageHeader
                                          className="site-page-header"
                                          backIcon={false}
                                          title={ingred}
                                        />
                                      </>
                                    )}
                                    {typeof beerDetail.ingredients[ingred] ===
                                      "string" && (
                                      <PageHeader
                                        className="site-page-header"
                                        backIcon={false}
                                        title={
                                          ingred +
                                          " :" +
                                          beerDetail.ingredients.yeast
                                        }
                                      />
                                    )}
                                  </>
                                )}
                            </div>
                          )
                        )}
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
