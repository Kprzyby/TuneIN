import React, { Component } from "react";

export class FetchData extends Component {
    
    state = {
        forecasts: [],
        loading: true
    }

    async componentDidMount(): Promise<void> {
        const url = "/api/weatherforecast";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }

    render(): React.ReactNode {
        return <div>
            {this.state.loading ? <div>loading...</div> : <div>person...</div>}
        </div>
    }

}