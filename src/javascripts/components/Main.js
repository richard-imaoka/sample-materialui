let React = require('react');
let materialUI = require('material-ui');
let ThemeManager = new materialUI.Styles.ThemeManager();
let TitleBar =require("./TitleBar");
let OrderEntry = require("./OrderEntry");

let Main = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    render() {
        return (
            <div className="container">
                <TitleBar/>
                <OrderEntry/>
            </div>
        );
    }
});

module.exports = Main;
