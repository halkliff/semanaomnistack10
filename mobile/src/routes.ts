import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: 'DevRadar'
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: 'Perfil no Github'
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#7D40E7'
        },
        headerTitleStyle: {
          color: '#FFF',
          fontWeight: '700',
          letterSpacing: 0.5
        },
        headerTintColor: '#FFF',
        headerBackTitle: null,
        headerBackTitleVisible: false
      }
    }
  )
);

export default Routes;
