import React, { useState} from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";
import {Modal, Button} from "react-bootstrap";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            apiKey: ""}
        ;

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount(){
        this.setState({
            show : true,
            apiKey: ""
        })
    }

    handleClose() {
        let apiKey = this.state.apiKey;

        localStorage.setItem('apiKey', apiKey);

        this.setState({show: false});
    };

    handleShow() {
        this.setState({show: true});
    };

    render() {
        return (
            <div className="app">
                <main>
                    <React.Fragment>

                            {/*<button onClick={this.handleShow}>Api key megadása</button>*/}
                            <Modal show={this.state.show} onHide={this.handleClose}>
                                <Modal.Title className="m-2">
                                    Kérlek add meg az API kulcsodat!
                                </Modal.Title>
                                <Modal.Body>
                                    <input type="text" onChange={(c) => this.state.apiKey = c.target.value}/>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" onClick={this.handleClose}>Lekérdezés</Button>
                                </Modal.Footer>
                            </Modal>
                        {this.state.apiKey !== "" ? (
                        <div className="container">
                            <CurrentLocation/>
                        </div>
                        ) : ""}
                    </React.Fragment>
                </main>
            </div>
        );
    }
}

export default App;
