import {useParams} from "react-router-dom";
import {useState} from "react";
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckOutlined,
    NumberOutlined,
    ThunderboltOutlined
} from "@ant-design/icons";
import {useGetCoinrankingDetailsQuery, useGetCoinrankingHistoryQuery} from "../services/coinrankingApi";
import {Col, Row, Select, Typography} from "antd";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import LineChart from "./LineChart";
import Loader from "./Loader";


const CoinDetails = () => {
    const {coinId} = useParams();
    const [timePeriod, setTimePeriod] = useState("7d");
    const {data, isFetching} = useGetCoinrankingDetailsQuery(coinId);
    const {data: coinHistory} = useGetCoinrankingHistoryQuery({coinId, timePeriod});
    const coinDetails = data?.data?.coin;
    if (isFetching) {
        return (
            <Loader/>
        );
    }
    const time = ["24h", "7d", "30d", "1y", "5y"];
    const coinStatistics = [
        {
            title: "Price to USD",
            value: `$ ${coinDetails.price && millify(coinDetails.price)}`,
            icon: <DollarCircleOutlined/>
        },
        {title: "Rank", value: coinDetails.rank, icon: <NumberOutlined/>},
        {
            title: "24h Volume",
            value: `$ ${coinDetails.volume && millify(coinDetails.volume)}`,
            icon: <ThunderboltOutlined/>
        },
        {
            title: "Market Cap",
            value: `$ ${coinDetails.marketCap && millify(coinDetails.marketCap)}`,
            icon: <DollarCircleOutlined/>
        },
        {
            title: "All-time-high(daily avg.)",
            value: `$ ${millify(coinDetails.allTimeHigh.price)}`,
            icon: <TrophyOutlined/>
        },
    ];
    const coinGenericStatistics = [
        {title: "Number Of Markets", value: coinDetails.numberOfMarkets, icon: <FundOutlined/>},
        {title: "Number Of Exchanges", value: coinDetails.numberOfExchanges, icon: <MoneyCollectOutlined/>},
        {
            title: "Approved Supply",
            value: coinDetails.approvedSupply ? <CheckOutlined/> : <StopOutlined/>,
            icon: <ExclamationCircleOutlined/>
        },
        {title: "Total Supply", value: `$ ${millify(coinDetails.totalSupply)}`, icon: <ExclamationCircleOutlined/>},
        {
            title: "Circulating Supply",
            value: `$ ${millify(coinDetails.circulatingSupply)}`,
            icon: <ExclamationCircleOutlined/>
        },
    ];
    return (
        <Col className={"coin-detail-container"}>
            <Col className={"coin-heading-container"}>
                <Typography.Title level={2} className={"coin-name"}>
                    {coinDetails.name} ({coinDetails.slug}) Price
                </Typography.Title>
                <p>
                    {coinDetails.name} Live Price in USD. View Value Statistics, Market Cap and Supply
                </p>
            </Col>
            <Select
                defaultValue={"7d"}
                className={"select-timeperiod"}
                placeholder={"Select Time Period"}
                onChange={(value) => (setTimePeriod(value))}
            >
                {
                    time.map((date, key) => (
                        <Select.Option value={date} key={key}>
                            {date}
                        </Select.Option>
                    ))
                }
            </Select>
            <LineChart
                coinHistory={coinHistory}
                currentPrice={millify(coinDetails.price)}
                coinName={coinDetails.name}
            />
            <Col className={"stats-container"}>
                <Col className={"coin-value-statistics"}>
                    <Col className={"coin-value-statistics-heading"}>
                        <Typography.Title level={3} className={"coin-details-heading"}>
                            {coinDetails.name} Value Statistics
                        </Typography.Title>
                        <p>
                            An Overview showing the Statistics of {coinDetails.name}
                        </p>
                    </Col>
                    {
                        coinStatistics.map(({icon, title, value}, key) => (
                            <Col className={"coin-stats"} key={key}>
                                <Col className={"coin-stats-name"}>
                                    <Typography.Text>{icon}</Typography.Text>
                                    <Typography.Text>{title}</Typography.Text>
                                </Col>
                                <Typography.Text className={"stats"}>{value}</Typography.Text>
                            </Col>
                        ))
                    }
                </Col>
                <Col className={"other-stats-info"}>
                    <Col className={"coin-value-statistics-heading"}>
                        <Typography.Title level={3} className={"coin-details-heading"}>
                            Other Statistics
                        </Typography.Title>
                        <p>
                            An Overview showing the Statistics of all Cryptocurrencies
                        </p>
                    </Col>
                    {
                        coinGenericStatistics.map(({icon, title, value}, key) => (
                            <Col className={"coin-stats"} key={key}>
                                <Col className={"coin-stats-name"}>
                                    <Typography.Text>{icon}</Typography.Text>
                                    <Typography.Text>{title}</Typography.Text>
                                </Col>
                                <Typography.Text className={"stats"}>{value}</Typography.Text>
                            </Col>
                        ))
                    }
                </Col>
            </Col>
            <Col className={"coin-desc-link"}>
                <Row className={"coin-desc"}>
                    <Typography.Title level={3} className={"coin-details-heading"}>
                        What is {coinDetails.name}
                        {
                            /* Parsing HTML into React Components */
                            HTMLReactParser(coinDetails.description)
                        }
                    </Typography.Title>
                </Row>
                <Col className={"coin-links"}>
                    <Typography.Title level={3} className={"coin-details-heading"}>
                        {coinDetails.name} Links
                    </Typography.Title>
                    {
                        coinDetails.links.map((link, key) => (
                            <Row className={"coin-link"} key={key}>
                                <Typography.Title className={"link-name"} level={5}>
                                    {link.name}
                                </Typography.Title>
                                <a href={link.url} target={"_blank"} rel={"noreferrer"}>
                                    {link.name}
                                </a>
                            </Row>
                        ))
                    }
                </Col>
            </Col>
        </Col>
    );
}

export default CoinDetails;