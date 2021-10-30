import {useGetBingNewsSearchQuery} from "../services/bingNewsSearchApi";
import {useGetCoinrankingQuery} from "../services/coinrankingApi";
import {Avatar, Card, Col, Row, Select, Typography} from "antd";
import {useEffect, useState} from "react";
import moment from "moment";
import Loader from "./Loader";


const News = ({simplified}) => {
    const [bingNewsSearch, setBingNewsSearch] = useState([]);
    const [bingNewsSearchCategory, setBingNewsSearchCategory] = useState("Cryptocurrency");
    const {data, isFetching} = useGetBingNewsSearchQuery({
        newsCategory: bingNewsSearchCategory,
        newsCount: simplified ? 6 : 12
    });
    const {data: coinList} = useGetCoinrankingQuery(100);
    const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
    useEffect(() => {
        setBingNewsSearch(data?.value);
    }, [data]);
    if (isFetching) {
        return (
            <Loader/>
        );
    }
    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className={"select-news"}
                        placeholder={"Select a Cryptocurrency"}
                        optionFilterProp={"children"}
                        onChange={(value) => (setBingNewsSearchCategory(value))}
                        /* Show only selected Cryptocurrency */
                        filterOption={(input, option) => (
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        )}
                    >
                        <Select.Option value={"Cryptocurrency"}>Cryptocurrency</Select.Option>
                        {
                            coinList?.data?.coins?.map((coin, key) => (
                                <Select.Option value={coin.name} key={key}>{coin.name}</Select.Option>
                            ))
                        }
                    </Select>
                </Col>
            )}
            {
                bingNewsSearch?.map((news, key) => (
                    <Col xs={24} sm={12} lg={8} key={key}>
                        <Card className={"news-card"} hoverable>
                            <a href={news.url} target={"_blank"} rel={"noreferrer"}>
                                <div className={"news-image-container"}>
                                    <Typography.Title className={"news-title"} level={4}>{news.name}</Typography.Title>
                                    <img
                                        style={{maxWidth: "200px", maxHeight: "100px"}}
                                        src={news?.image?.thumbnail?.contentUrl || demoImage}
                                        alt={"News"}
                                    />
                                </div>
                                <p>
                                    {
                                        news.description.length > 250
                                            ? `${news.description.substring(0, 100)} ...`
                                            : news.description
                                    }
                                </p>
                                <div className={"provider-container"}>
                                    <div>
                                        <Avatar
                                            src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                                            alt={"News Avatar"}
                                        />
                                        <Typography.Text
                                            className={"provider-name"}>{news.provider[0]?.name}</Typography.Text>
                                    </div>
                                    <Typography.Text>{moment(news.datePublished).startOf("ss").fromNow()}</Typography.Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    );
}

export default News;