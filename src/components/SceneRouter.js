import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { 
  getTeamData,
} from '../actions';
import TabIcon from './TabIcon';
import Login from './login/Login';
import LeaderInfo from './player/LeaderInfo';
import SettingPage from './player/SettingPage';
import Rank from './player/Rank';
import Mission from './player/Mission';
import Skills from './player/Skills';
import GiveScore from './gm/GiveScore';
import Begin from './Begin';
import { ifIphoneX } from './IphoneXDetector';

import CareerInfo from './setting/CareerInfo';
import MP from './setting/MP';
import About from './setting/About';
import Policy from './setting/Policy';


class RouterComponent extends Component {
  render() {
    return (
      <Router
       backAndroidHandler={() => (true)}
      >
        <Stack
          duration={0}
        >
          <Scene key="root" initial gesturesEnabled={false}>
            <Scene key="begin" component={Begin} hideNavBar initial />
            <Scene key="login" component={Login} hideNavBar />
          </Scene>

          <Scene key="main" gesturesEnabled={false}>
            <Scene 
              key="tabbar" 
              tabs 
              tabBarPosition={'bottom'} 
              swipeEnabled={false} 
              animationEnabled={false}
              tabBarStyle={styles.tabBarStyle}
              tabBarOnPress={(a) => {
                 this.props.getTeamData();
                 const temp = a.scene.route.key;         
                 Actions[temp]();
              }}
            >

              <Scene key="tab0" title="排名" icon={TabIcon}>
                <Scene key="rank" initial component={Rank} hideNavBar />
              </Scene>
              <Scene key="tab1" title="配點" icon={TabIcon}>
                <Scene key="skills" initial component={Skills} hideNavBar />
              </Scene>
              <Scene key="tab2" initial title="首頁" icon={TabIcon}>
                <Scene key="teamInfo" initial component={LeaderInfo} hideNavBar />
              </Scene>
              <Scene key="tab3" title="支線任務" icon={TabIcon}>
                <Scene key="mission" initial component={Mission} hideNavBar />
              </Scene>
              <Scene key="tab4" title="設定" icon={TabIcon}>
                <Scene key="settingPage" initial component={SettingPage} hideNavBar />
              </Scene>        

            </Scene>
          </Scene>

          <Scene key="gm" gesturesEnabled={false}>
            <Scene 
              key="tabbar2" 
              tabs 
              tabBarPosition={'bottom'} 
              swipeEnabled={false} 
              animationEnabled={false}
              tabBarStyle={styles.tabBarStyle}
              tabBarOnPress={(a) => {
                const temp = a.scene.route.key;
                Actions[temp]();
             }}
            >

              <Scene key="tab5" title="排名" icon={TabIcon}>
                <Scene key="rank2" initial component={Rank} hideNavBar />
              </Scene>
              <Scene key="tab6" initial title="配點" icon={TabIcon}>
                <Scene key="giveScore" initial component={GiveScore} hideNavBar />
              </Scene>
              <Scene key="tab7" title="設定" icon={TabIcon}>
                <Scene key="settingPage2" initial component={SettingPage} hideNavBar />
              </Scene>        

            </Scene>
          </Scene>

          {/* setting pages */}
          <Scene key="careerInfo" component={CareerInfo} hideNavBar />   
          <Scene key="mp" component={MP} hideNavBar /> 
          <Scene key="about" component={About} hideNavBar /> 
          <Scene key="policy" component={Policy} hideNavBar /> 

        </Stack>
      </Router>
    );
  }
}

const styles = {
  tabBarStyle: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        ...ifIphoneX({
          paddingBottom: 20,
          height: 45
        },
        {
          paddingBottom: 0
        }),
        shadowColor: '#CBD4E4',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 } // 左右不要有陰影
      },
      android: {
        elevation: 8
      }
    })
  }
};


export default connect(null, { 
  getTeamData,
})(RouterComponent);
