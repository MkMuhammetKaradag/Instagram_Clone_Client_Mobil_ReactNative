import { useRoute } from "@react-navigation/native";
import { UserProfileScreenRouteProp } from "../../navigation/AppStack";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import ProfileHeader from "../../components/app/Profile/ProfileHeader";
import UserProfileCard from "../../components/app/Profile/UserProfileCard";
import { useAppSelector } from "../../redux/hooks";
import { Box, Center, HStack, Skeleton, Spinner, VStack } from "native-base";
import { getUser } from "../../api/app/appApi";
import { err } from "react-native-svg/lib/typescript/xml";
import UserPosts from "../../components/app/Profile/UserPosts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  TabView,
  SceneMap,
  SceneRendererProps,
  TabBar,
  NavigationState,
} from "react-native-tab-view";
import { getUserType, UserPostType, UserType } from "../../api/app/appApiTypes";
const SecondScreen = () => {
  return (
    <HStack space={8} justifyContent="center" alignItems="center">
      <Spinner size="lg" />
    </HStack>
  );
};
// const renderScene = SceneMap({
//   Posts: UserPosts,
//   second: SecondScreen,
// });

const CustopTabBar = ({
  props,
}: {
  props: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string;
      title: string;
    }>;
  };
}) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    tabStyle={{ backgroundColor: "#000", minHeight: 30, maxHeight: 60 }}
    renderLabel={({ route, focused, color }) => (
      <View>
        {route.title == "Posts" ? (
          <MaterialCommunityIcons
            name="grid"
            size={24}
            color={focused ? "#fff" : "gray"}
          />
        ) : (
          <MaterialCommunityIcons
            name="grid"
            size={24}
            color={focused ? "red" : "gray"}
          />
        )}
      </View>
    )}
  />
);
const UserProfileScreen = () => {
  const layout = useWindowDimensions();
  const [getUserIsloading, setGetUserIsloading] = React.useState(true);
  const [userPosts, setUserPosts] = React.useState<UserPostType[]>([]);
  const [userFollowUps, setUserFollowUps] = React.useState<number>(0);
  const [userFollowers, setUserFollowers] = React.useState<number>(0);
  const [userProfilePicture, setUserProfilePicture] = React.useState<
    string | null
  >();
  const user = useAppSelector((S) => S.auth.user);
  const {
    params: { userNickName },
  } = useRoute<UserProfileScreenRouteProp>();
  React.useEffect(() => {
    getUser(userNickName || user?.userNickName)
      .then((res) => {
        setUserPosts(res.data.user.userPosts);
        setUserFollowUps(res.data.user.followUps.length);
        setUserFollowers(res.data.user.followers.length);
        setUserProfilePicture(res.data.user.userProfilePicture);
      })
      .catch((err) => console.log(err))
      .finally(() => setGetUserIsloading(false));
  }, []);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Posts", title: "Posts" },
    { key: "second", title: "Second" },
  ]);
  const renderScene = ({
    route,
  }: {
    route: {
      key: string;
      title: string;
    };
  }) => {
    switch (route.key) {
      case "Posts":
        return <UserPosts userPosts={userPosts} />;
      case "second":
        return <SecondScreen />;
      default:
        return null;
    }
  };
  if (getUserIsloading) {
    return (
      <HStack space={8} justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </HStack>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      {/* <ScrollView
        style={{ flex: 1 }}
        stickyHeaderIndices={[2]}
        nestedScrollEnabled={true}
      > */}
      <ProfileHeader></ProfileHeader>
      <UserProfileCard
        userNickName={userNickName ? userNickName : user?.userNickName}
        userProfilePicture={
          userNickName ? userProfilePicture : user?.userProfilePicture
        }
        userPostLength={userPosts.length}
        userFollowUp={userFollowUps}
        userFollowers={userFollowers}
      ></UserProfileCard>

      <TabView
        navigationState={{ index, routes }}
        renderTabBar={(props) => <CustopTabBar props={props}></CustopTabBar>}
        renderScene={({ route }) => renderScene({ route })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width, height: 400 }}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({});
