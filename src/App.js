import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App(){
        return (
            <div className="app">
                <main>
                    <React.Fragment>
                        <div className="container">
                            <CurrentLocation />
                        </div>
                    </React.Fragment>

                </main>
            </div>
        );
    }
export default App;
