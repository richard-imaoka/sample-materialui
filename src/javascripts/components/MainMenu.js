let React = require('react');
let materialUI = require('material-ui');
let ThemeManager = new materialUI.Styles.ThemeManager();
let IconMenu = materialUI.IconMenu;
let MenuItem = require('material-ui/lib/menus/menu-item');
let MenuDivider = require('material-ui/lib/menus/menu-divider');

let MainMenu = React.createClass({

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
            <IconMenu iconButtonElement={iconButtonElement} openDirection="bottom-right">
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Send feedback" />
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
            </IconMenu>
        );
    }
});

module.exports = MainMenu;
