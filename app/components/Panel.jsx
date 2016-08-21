import React from "react";

function button({ show, state, click, onClass, offClass }) {
    let classes = "fa " + (state ? onClass : offClass);
    
    return show ? (
        <a className="button" onClick={ click }>
            <i className={ classes }></i>
        </a>
    ) : null;
}

class Header extends React.Component {
    render() {
        let shadeButton = button({
            show: this.props.showShade,
            state: this.props.shade,
            click: this.props.toggleShade,
            onClass: "fa-plus",
            offClass: "fa-minus"
        });

        let closeButton = button({
            show: !!this.props.close,
            state: true,
            click: this.props.close,
            onClass: "fa-times"
        });
        
        return (
            <div className="header">
                { this.props.title }
                { closeButton }
                { shadeButton }
            </div>
        );
    }
}

export default class Panel extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            shade: false
        };
    }

    toggleShade() {
        this.setState({
            ...this.state,
            shade: !this.state.shade
        });
    }
    
    render() {
        let classList = [
            "float",
            "box",
            this.props.className,
            this.state.shade ? "shade" : null
        ];

        let classes = classList.filter(x => !!x).join(" ");
        
        return (
            <div className={ classes }>
                <Header title={ this.props.title }
                        showShade={ this.props.shade }
                        shade={ this.state.shade }
                        toggleShade={ this.toggleShade.bind(this) }
                        close={ this.props.close }/>
                <div className="body">
                    { this.props.children }
                </div>
            </div>
        );
    }
}
