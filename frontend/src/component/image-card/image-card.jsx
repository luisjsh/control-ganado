import React, {Component} from "react";

import {
  Card,
  CardHeader,
  CardNoImage,
  CardImage,
  CardSection,
  HeaderWrapper,
  HeaderWrapperBottom,
  Span,
  Hierro
} from './image-card-styles'

import SecundaryText from '../secundary-text/secundary-text'

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hierro: false,
      interval: false,
      hovered: false,
    };
    this.onHover = this.onHover.bind(this);
    this.onHoverLeft = this.onHoverLeft.bind(this);
  }

  async componentDidMount() {
    await fetch(
      "/configuration/getparticularhierro/" +
        this.props.hierro,
      {
        method: "GET",
      }
    ).then(async (hierroResponse) =>
      this.setState({ hierro: await hierroResponse.json() })
    );
  }

  onHover() {
    this.setState({
      interval: setTimeout(() => this.setState({ hovered: true }), 1000),
    });
  }

  onHoverLeft() {
    clearTimeout(this.state.interval);
    this.setState({ interval: false, hovered: false });
  }

  componentWillUnmount(){
    clearTimeout(this.state.interval);
    this.setState({ interval: false, hovered: false });
  }

  render() {
    return (
        <Card
          animationDelay={this.props.animationDelay}
          onMouseEnter={this.onHover}
          onFocus={this.onHover}
          onBlur={this.onHoverLeft}
          onMouseLeave={this.onHoverLeft}
          onClick={this.props.handleClick}
          title={this.props.nombre}
          >
          <CardHeader
            hovered={this.state.hovered}
          >
            <HeaderWrapper>
              <Hierro
                className="hierro-logo"
                style={{
                  backgroundImage: this.state.hierro
                    ? "url(" +
                      this.state.hierro.response.path +
                      ")"
                    : "",
                }}
              ></Hierro>
              <Span> {this.props.nombre}</Span>
              <Span> - {this.props.fechanac}</Span>
            </HeaderWrapper>
            <HeaderWrapperBottom
              hovered={this.state.hovered}
            >
              Datos de la tienta
              <SecundaryText title='Resultado:'>{this.props.tientaResultado}</SecundaryText>
              <SecundaryText title='Lugar:'>{this.props.tientaLugar}</SecundaryText>
              <SecundaryText title='Fecha:'>{this.props.tientaDia}</SecundaryText>
              <SecundaryText title='Tentado por:'>{this.props.tientaTentadoPor}</SecundaryText>
            </HeaderWrapperBottom>
          </CardHeader>
          <CardSection>
          {
            this.props.imagenes[0] !== undefined ?
              <CardImage 
                path={this.props.imagenes[0].path}
                hovered={this.state.hovered}
              />
             : 
             
              <CardNoImage 
                  hovered={this.state.hovered}
                />
          }</CardSection>
        </Card>
    );
  }
}

export default ImageCard