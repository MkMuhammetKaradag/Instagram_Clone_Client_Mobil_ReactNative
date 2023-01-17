import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { getLogout } from "../../api/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/auth/AuthSlice";
import Header from "../../components/app/Home/Header";
import Stories from "../../components/app/Home/Stories";
import { getMyFollowUpsPosts } from "../../api/app/appApi";
import { PostType } from "../../api/app/appApiTypes";
import UserPosts from "../../components/app/Home/Post/UserPosts";
import { MaterialIcons } from "@expo/vector-icons";
const HomeScreen = () => {
  const [userPosts, setUserPosts] = React.useState<PostType[]>([]);
  const [isLoader, setIsLoader] = React.useState<boolean>(true);
  React.useEffect(() => {
    getMyFollowUpsPosts()
      .then((res) => {
        if (res.data.myFollowUpsPosts) {
          setUserPosts(res.data.myFollowUpsPosts);
          setIsLoader(res.data.myFollowUpsPosts.length % 5 === 0);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const fetchData = () => {
    if (userPosts.length % 5 === 0) {
      getMyFollowUpsPosts(Math.ceil(userPosts.length / 5 + 1))
        .then((res) => {
          if (res.data.myFollowUpsPosts) {
            setUserPosts((prev) => [...prev, ...res.data.myFollowUpsPosts]);
            setIsLoader(res.data.myFollowUpsPosts.length % 5 === 0);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const scrollViewRef = React.useRef<ScrollView>(null);
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.button} onPress={() => userLogOut()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity> */}
      <Header></Header>
      <ScrollView
        ref={scrollViewRef}
        // onContentSizeChange={(w: number, h: number) =>
        //   scrollViewRef.current?.scrollTo({ x: w, y: h, animated: true })
        // }
      >
        <Stories></Stories>
        <UserPosts
          userPosts={userPosts}
          setUserPosts={setUserPosts}
        ></UserPosts>
        {isLoader && userPosts.length > 0 && userPosts.length < 50 && (
          <View
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={fetchData}>
              <MaterialIcons name="add-to-photos" size={30} color="gray" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 20,
  },
  button: {
    backgroundColor: "#9acaf7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
});
