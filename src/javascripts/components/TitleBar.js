let React = require('react');
let materialUI = require('material-ui');
let ThemeManager = new materialUI.Styles.ThemeManager();
let AppBar = materialUI.AppBar;

let TitleBar = React.createClass({

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
            <AppBar title="My Trading App!"  />
        );
    }
});

module.exports = TitleBar;

