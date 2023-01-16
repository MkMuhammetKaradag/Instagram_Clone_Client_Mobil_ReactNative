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
import { Box, Center, Skeleton, VStack } from "native-base";
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
import { getUserType, UserPostType } from "../../api/app/appApiTypes";
const SecondScreen = () => {
  return (
    <View>
      <Text style={{ color: "#fff" }}>second</Text>
    </View>
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
const MyProfileScreen = () => {
  const layout = useWindowDimensions();
  const user = useAppSelector((S) => S.auth.user);
  const myFollowUps = useAppSelector((s) => s.user.followUps).length;
  const myFollowers = useAppSelector((s) => s.user.followers).length;
  const [getUserIsloading, setGetUserIsloading] = React.useState(true);
  const [userPosts, setUserPosts] = React.useState<UserPostType[]>([]);
  React.useEffect(() => {
    getUser(user?.userNickName)
      .then((res) => setUserPosts(res.data.user.userPosts))
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
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        marginTop: StatusBar.currentHeight,
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        stickyHeaderIndices={[2]}

      >
    
        <ProfileHeader></ProfileHeader>
        <UserProfileCard
          userNickName={user?.userNickName}
          userProfilePicture={user?.userProfilePicture}
          userFollowUp={myFollowUps}
          userFollowers={myFollowers}
        ></UserProfileCard>

        <TabView
          navigationState={{ index, routes }}
          renderTabBar={(props) => <CustopTabBar props={props}></CustopTabBar>}
          renderScene={({ route }) => renderScene({ route })}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width, height: 400 }}
          style={{ minHeight: 800, flex: 1 }}
        />
       
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({});
