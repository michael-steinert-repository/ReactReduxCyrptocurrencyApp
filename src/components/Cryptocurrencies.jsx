import {useGetCoinrankingQuery} from "../services/coinrankingApi";
import {useEffect, useState} from "react";
import {Card, Col, Input, Row} from "antd";
import {Link} from "react-router-dom";
import millify from "millify";
import Loader from "./Loader";

const Cryptocurrencies = ({simplified}) => {
    const coinCount = simplified ? 10 : 42;
    const {data, isFetching} = useGetCoinrankingQuery(coinCount);
    const [coins, setCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    if (isFetching) {
        return (
            <Loader></Loader>
        );
    }
    useEffect(() => {
        const filteredData = data?.data?.coins.filter((coin) => (
                coin.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setCoins(filteredData);
    }, [data, searchTerm]);

    return (
        <>
            {
                !simplified && (
                    <div className={"search-crypto"}>
                        <Input
                            placeholder={"Search Cryptocurrency"}
                            onChange={(event => setSearchTerm(event.target.value))}
                        />
                    </div>
                )
            }
            <Row gutter={[32, 32]} className={"crypto-card-container"}>
                {
                    /* The Question Mark checks if the List coins exists if yes then it is mapping through it */
                    coins?.map((coin, key) => (
                        /* 24 Columns are the max Width in AntD */
                        <Col xs={24} sm={12} log={6} className={"crypto-card"} key={key}>
                            <Link to={`/coin/${coin.id}`}>
                                <Card
                                    title={`${coin.rank}. ${coin.name}`}
                                    extra={<img className={"crypto-image"} src={coin.iconUrl}/>}
                                    hoverable
                                >
                                    <p>Price: {millify(coin.price)}</p>
                                    <p>Market Cap: {millify(coin.marketCap)}</p>
                                    <p>Daily Change: {millify(coin.change)}%</p>
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </>
    );
}

export default Cryptocurrencies;