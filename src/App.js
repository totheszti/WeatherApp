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
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.setState({
            show : true,
            apiKey: ""
        })
    }

    handleClose() {
        this.setState({show: false});
    };

    handleShow() {
        this.setState({show: true});
    };

    onSubmit(e) {
        e.preventDefault();
        let apiKey = this.state.apiKey;

        localStorage.setItem('apiKey', apiKey);

        console.log(apiKey);
    }

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
                                    <Button variant="secondary" onClick={this.handleClose}>Mégse</Button>
                                    <Button variant="success" onClick={this.onSubmit}>Lekérdezés</Button>
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
