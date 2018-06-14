import React, { Component } from 'react';
import {
  //Text,
  AsyncStorage,
  Dimensions,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { connect } from 'react-redux';
import { getTeamData } from '../../actions';
import { BackgroundImage } from '../common';
import { Biochemical, Defense, Sniper, Special, Soldier, Assault } from '../../images';
//import data from '../../Setting.json';

const { height, width } = Dimensions.get('window');

class LeaderInfo extends Component {

  componentWillMount() {
    this.props.getTeamData();
  }

  logout() {
    Parse.User.logOut()
      .then(async () => {
        await AsyncStorage.removeItem('sessionToken');
        await AsyncStorage.removeItem('userID');
        Actions.pop();
        Actions.login();
        Parse.User.current();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderCareer() {
    const { careerStyle } = styles;
    if (this.props.career.name === '戰士') {
      return (
        <Image
        source={Soldier}
        style={careerStyle}
        />
      );
    } else if (this.props.career.name === '特勤部隊') {
        return (
          <Image
          source={Special}
          style={careerStyle}
          />
        );
    } else if (this.props.career.name === '急襲部隊') {
        return (
          <Image
          source={Assault}
          style={careerStyle}
          />
        );
    } else if (this.props.career.name === '狙擊部隊') {
      return (
        <Image
        source={Sniper}
        style={careerStyle}
        />
      );
    } else if (this.props.career.name === '防禦部隊') {
      return (
        <Image
        source={Defense}
        style={careerStyle}
        />
      );
    } else if (this.props.career.name === '生化小組') {
      return (
        <Image
        source={Biochemical}
        style={careerStyle}
        />
      );
    } 
  }

  render() {
    const { containerStyle } = styles;
    return (
      <BackgroundImage style={containerStyle}>
        {this.renderCareer()}
      </BackgroundImage>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  careerStyle: {
    height: height / 1.1,
    width: width / 1.1,
    resizeMode: Image.resizeMode.contain
  }
};

const mapStateToProps = ({ player }) => {
  const {  
    batch, //國高or大專
    camp, //陣營
    name, //第幾小隊
    team_total_score, //總分
    career, //職業

    //國高能力值
    strength, //力量
    wisdom, //智慧
    vitality, //體力
    faith, //信心
    agility, //敏捷

    //大專能力值
    passion, //熱情
    creativity, //創意
    intelligence, //智慧
    love, //愛心
    patience//耐力
   } = player;

  return { 
    batch, //國高or大專
    camp, //陣營
    name, //第幾小隊
    team_total_score, //總分
    career, //職業

    strength, //力量
    wisdom, //智慧
    vitality, //體力
    faith, //信心
    agility, //敏捷

    //大專能力值
    passion, //熱情
    creativity, //創意
    intelligence, //智慧
    love, //愛心
    patience//耐力
  };
};

export default connect(mapStateToProps, {
  getTeamData
})(LeaderInfo);
