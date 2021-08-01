import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App(){
        return (
            <div className="app">
                <main>
                    {/*<Modal show={handleShow} onHide={handleClose}>*/}
                    {/*    <Modal.Header>*/}
                    {/*       <Modal.Title>Üdvözöllek!</Modal.Title>*/}
                    {/*    </Modal.Header>*/}
                    {/*    <Modal.Body>Kérlek add meg az OpenWeatherMap Api kulcsodat!*/}
                    {/*        <Input type="text" ref="apiKey" placeholder="API_KEY" />*/}
                    {/*    </Modal.Body>*/}
                    {/*    <Modal.Footer>*/}
                    {/*        <Button variant="secondary" onClick={handleClose}>Close</Button>*/}
                    {/*        <Button variant="primary" onClick={handleClose}>Save changes</Button>*/}
                    {/*    </Modal.Footer>*/}
                    {/*</Modal>*/}

                    {/*<div className="search-box">*/}
                    {/*    <Search*/}
                    {/*        location={location}*/}
                    {/*        isSearching={isSearching}*/}
                    {/*        onLocationChange={handleLocationChange}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    {/*<div className="location-box">*/}
                    {/*    {(typeof weatherData.main != 'undefined') ? (*/}
                    {/*        <div>*/}
                    {/*            <WeatherCard location={location} />*/}
                    {/*        </div>*/}
                    {/*    ) : (*/}
                    {/*        <div>*/}
                    {/*            /!*<Dimmer active>*!/*/}
                    {/*            /!*    <Loader>Loading..</Loader>*!/*/}
                    {/*            /!*</Dimmer>*!/*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    <React.Fragment>
                        <div className="container">
                            <CurrentLocation />
                        </div>
                    </React.Fragment>

                </main>

                {/*<header className="App-header">*/}
                {/*  <img src={logo} className="App-logo" alt="logo" />*/}
                {/*  <p>*/}
                {/*    Edit <code>src/App.js</code> and save to reload.*/}
                {/*  </p>*/}
                {/*  <a*/}
                {/*    className="App-link"*/}
                {/*    href="https://reactjs.org"*/}
                {/*    target="_blank"*/}
                {/*    rel="noopener noreferrer"*/}
                {/*  >*/}
                {/*    Learn React*/}
                {/*  </a>*/}
                {/*</header>*/}
            </div>
        );
    }
export default App;
