import {Col, Row, Statistic, Typography} from "antd";
import {useGetCoinrankingQuery} from "../services/coinrankingApi";
import millify from "millify";
import {Link} from "react-router-dom";
import {Cryptocurrencies, News} from "./index";
import Loader from "./Loader";

const Homepage = () => {
    const {data, isFetching} = useGetCoinrankingQuery(10);
    if (isFetching) {
        return (
            <Loader/>
        );
    }
    const globalStatistics = data?.data?.stats;
    return (
        <>
            <Typography.Title level={2} className={"heading"}>
                Global Crypto Stats
            </Typography.Title>
            <Row>
                {/* AntD has 24 Columns so 12 Columns take half of the screen*/}
                <Col span={12}>
                    <Statistic title={"Total Cryptocurrencies"} value={globalStatistics.total}/>
                </Col>
                <Col span={12}>
                    <Statistic title={"Total Exchanges"} value={millify(globalStatistics.totalExchanges)}/>
                </Col>
                <Col span={12}>
                    <Statistic title={"Total Market Cap"} value={millify(globalStatistics.totalMarketCap)}/>
                </Col>
                <Col span={12}>
                    <Statistic title={"Total 24h Volume"} value={millify(globalStatistics.total24hVolume)}/>
                </Col>
                <Col span={12}>
                    <Statistic title={"Total Markets"} value={millify(globalStatistics.totalMarkets)}/>
                </Col>
            </Row>
            <div className={"home-heading-container"}>
                <Typography.Title level={2} className={"home-title"}>
                    Top 10 Cryptocurrencies in the World
                </Typography.Title>
                <Typography.Title level={2} className={"show-more"}>
                    <Link to={"/cryptocurrencies"}>Show More</Link>
                </Typography.Title>
            </div>
            <Cryptocurrencies simplified={true}/>
            <div className={"home-heading-container"}>
                <Typography.Title level={2} className={"home-title"}>
                    Latest Crypto News
                </Typography.Title>
                <Typography.Title level={2} className={"show-more"}>
                    <Link to={"/news"}>Show More</Link>
                </Typography.Title>
            </div>
            <News simplified={true}/>
        </>
    );
}

export default Homepage;