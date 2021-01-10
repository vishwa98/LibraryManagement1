import React, { Component } from "react";
import { Link } from "react-router-dom";


class wListNew extends Component {
    render() {
        const { wlistt } = this.props;
        return (
            <div>
                {JSON.stringify(wlistt)};
            </div>
        );
    }
}

export default wListNew;
