import React, { FunctionComponent } from 'react';
import { WebView } from 'react-native-webview';
import { NavigationStackProp } from 'react-navigation-stack';

export interface ProfileProps {
  navigation: NavigationStackProp<{ github_username: string }>;
}

const Profile: FunctionComponent<ProfileProps> = ({
  navigation
}: ProfileProps) => {
  const githubUsername = navigation.getParam('github_username');

  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: `https://github.com/${githubUsername}` }}
    />
  );
};

export default Profile;
