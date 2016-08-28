import React from "react";

let Button = ({ show, state, click, onClass, offClass }) => {
    if (show) {
        let classes = "fa " + (state ? onClass : offClass);        
        
        return (
            <a className="button" onClick={click}>
                <i className={classes}></i>
            </a>
        );
    }
    else {
        return null;
    }
};

let Header = ({ title, showShade, shadeState, toggleShade, close }) => {
    return (
        <div className="header">
            { title }
            
            <Button show={ !!close }
                    state={true}
                    click={close}
                    onClass="fa-times"
            />
            
            <Button show={showShade}
                    state={shadeState}
                    click={toggleShade}
                    onClass="fa-plus"
                    offClass="fa-minus"
            />
        </div>
    );
};

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
            this.props.noFloat ? null : "float",
            "box",
            this.props.className,
            this.state.shade ? "shade" : null
        ];

        let classes = classList.filter(x => !!x).join(" ");
        
        return (
            <div className={ classes }>
                <Header title={ this.props.title }
                        showShade={ this.props.shade }
                        shadeState={ this.state.shade }
                        toggleShade={ this.toggleShade.bind(this) }
                        close={ this.props.close }/>
                
                <div className="body">
                    { this.props.children }
                </div>
            </div>
        );
    }
}
