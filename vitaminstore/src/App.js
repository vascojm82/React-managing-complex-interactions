import React from 'react';
import logo from './logo.png';
import './App.css';
import Card from './components/Card';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import LazyLoad from 'react-lazyload';
import data from './data/data.json';

class App extends React.Component {
  state = {
    toggleLogo: true,
    loading: true,
    cards: []
  }

  componentWillMount(){
    this.setState(() => ({
      cards: data
    }));
  }

  componentDidMount(){
    setTimeout(() => this.setState(() => ({ loading: false })), 3000);
  }

  toggleLogo = () => {
    this.setState(() => ({
      toggleLogo: !this.state.toggleLogo
    }));
  }

  showBack = (card) => {
    let cards = this.state.cards;
    cards[card.id].animation = 'card card-flip';
    console.log(cards);

    this.setState(() => ({
      cards
    }));
  }

  showFront = (card) => {
    let cards = this.state.cards;
    cards[card.id].animation = 'card';
    console.log(cards);

    this.setState(() => ({
      cards
    }));
  }

  openNav = () => {
    document.getElementById("myNav").style.width = "100%";
  }

  closeNav = () => {
    document.getElementById("myNav").style.width = "0%";
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div onMouseEnter={this.toggleLogo} onMouseLeave={this.toggleLogo} onClick={this.openNav}>
            <img src={logo} className={this.state.toggleLogo? "static-logo": "static-logo animate__animated animate__jello"} alt="logo" />
          </div>
          <h1 className={this.state.toggleLogo? "menu-hidden": "menu animate__animated animate__bounceInDown"} onClick={this.openNav}>Menu</h1>
          <Navigation closeNav={this.closeNav} />
        </header>
        {
          this.state.loading? <Loading />:
          <div className="Grid animate__animated animate__bounceInUp">
            {this.state.cards.map((card, i) => {
              return (
                (i > 2)?
                  <LazyLoad height={650} offset={-100}>
                    <Card duration={150} key={card.id} card={card} showBack={this.showBack} showFront={this.showFront} />
                  </LazyLoad>:
                  <Card duration={150} key={card.id} card={card} showBack={this.showBack} showFront={this.showFront} />
              )
            })}
          </div>
        }
      </div>
    );
  }
}

export default App;
