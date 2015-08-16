let React = require('react');
let materialUI = require('material-ui');
let ThemeManager = new materialUI.Styles.ThemeManager();
let RaisedButton = materialUI.RaisedButton;
let TextField = materialUI.TextField;
let Card = materialUI.Card;

let OrderEntry = React.createClass({

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
            <Card>
                <div className="row">
                    <div className="col-xs-3">
                        <RaisedButton label="Buy" primary={true}  />
                    </div>
                    <TextField className="col-xs-3" type="number" step={0.1}/>
                    <TextField className="col-xs-3" type="number" step={10}/>
                    <div className="col-xs-3">
                        <RaisedButton label="Sell" />
                    </div>
                </div>
            </Card>
        );
    }
});

module.exports = OrderEntry;

