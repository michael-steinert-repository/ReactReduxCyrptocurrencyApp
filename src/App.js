import "./App.css";
import {Switch, Route, Link} from "react-router-dom";
import {Layout, Typography, Space} from "antd";
import {Navbar, Homepage, Cryptocurrencies, CoinDetails, News} from "./components";

const App = () => {
    return (
        <div className={"app"}>
            <div className={"navbar"}>
                <Navbar/>
            </div>
            <div className={"main"}>
                <Layout>
                    <div className={"routes"}>
                        <Switch>
                            <Route exact path={"/"}>
                                <Homepage/>
                            </Route>
                            <Route exact path={"/cryptocurrencies"}>
                                <Cryptocurrencies/>
                            </Route>
                            <Route exact path={"/coin/:coinId"}>
                                <CoinDetails/>
                            </Route>
                            <Route exact path={"/news"}>
                                <News/>
                            </Route>
                        </Switch>
                    </div>
                </Layout>
                <div className={"footer"}>
                    <Typography.Title level={5} style={{color: "white", textAlign: "center"}}>
                        Cryptocurrency App <br/>
                    </Typography.Title>
                    <Space>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/news"}>News</Link>
                    </Space>
                </div>
            </div>
        </div>
    );
}

export default App;
