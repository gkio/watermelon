import React, { Component } from 'react';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import styled from 'styled-components';
import './App.css';

const Label = styled.h3`
  text-align: center;
  color: #333;
`

const Wr = styled.div`
  background-color: #ccc;
  max-width: 1200px;
  margin: 0 auto;
  height: 70vh;
`

const MainContent = styled.div`
  position:relative;
`

const Fruit = styled.div`
  
  width: 100px;
  height: 100px;
  border: ${props => props.waterQuantity}px solid #27ae60;
  background-color: #e74c3c;
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  position:absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
`

const VerticalSliderWr = styled.div`
  width: 10%;
  max-width: 10%;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  > * {
  display: inline-block;
  }
  padding: 20px;
`

const HorizontalSliderWr = styled.div`
  width: 100%;
`;

class App extends Component {

  state = {
    maxWeightValue: 100,
    maxWaterValue: 99,
    weightValue : 100,
    waterValue : 99,
  }

  countWatermelonWeight = () => {
    const {weightValue, waterValue} = this.state
    const nonWater = weightValue/100

    this.setState(() => ({watermelonWeight: +(nonWater * (100/(100 - waterValue))).toFixed(2)}))
  }

  componentDidMount() {
    this.countWatermelonWeight()
  }

  handleOnWeightChange = (value) => {
    this.changeWeightValue(value)
    this.countWatermelonWeight()
  }

  handleOnWaterPercentChange = (value) => {
    this.changeWaterValue(value)
    this.countWatermelonWeight()
  }

  changeWeightValue = (value) => {
    if(Number.isInteger(value)) {
      this.setState(() => ({weightValue: value}))
    }
  }

  changeWaterValue = (value) => {
    if(Number.isInteger(value)){
      this.setState(() => ({waterValue : value}))
    }
  }

  render() {
    const {weightValue, maxWeightValue,watermelonWeight, maxWaterValue, waterValue} = this.state
    return (
      <div>
        <Label>Все после усыхания:{watermelonWeight} кг.</Label>
        <Wr>
          <MainContent>
            <VerticalSliderWr>
              <Slider
                style={{
                  margin: '20px 0',
                }}
                value={weightValue}
                orientation="vertical"
                onChangeComplete={this.handleOnWeightChange}
                onChange={this.changeWeightValue}
                min={1}
                max={maxWeightValue}
                />
            </VerticalSliderWr>
            <Fruit waterQuantity={(weightValue - waterValue) / 2}/>
          </MainContent>
          <HorizontalSliderWr>
            <Slider
              value={waterValue}
              orientation="horizontal"
              onChangeComplete={this.handleOnWaterPercentChange}
              onChange={this.changeWaterValue}
              min={1}
              max={maxWaterValue}
            />
          </HorizontalSliderWr>
        </Wr>
      </div>
    );
  }
}

export default App;
