import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React from "react";

import { getDiscoverPosts } from "../../api/app/appApi";
import { PostType } from "../../api/app/appApiTypes";
import GetIsSkeleton from "../../components/app/Discover/GetIsSkeleton";
import PostCard from "../../components/app/Profile/PostCard";
import { AntDesign } from "@expo/vector-icons";
import { Input, InputGroup, InputLeftAddon, Stack } from "native-base";
import SearchScreen from "./SearchScreen";
const DiscoverScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [isLoader, setIsLoader] = React.useState(false);
  const [isSkeleton, setIsSkeleton] = React.useState(true);
  const [searchUserInput, setSearchUserInput] = React.useState("");
  React.useEffect(() => {
    getDiscoverPosts(1)
      .then((res) => {
        if (res.data.posts) {
          setPosts(res.data.posts);
          setIsLoader(res.data.posts.length % 15 === 0);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSkeleton(false);
      });
  }, []);
  const fetchData = () => {
    if (posts.length % 15 === 0) {
      setIsSkeleton(true);
      getDiscoverPosts(Math.ceil(posts.length / 15 + 1))
        .then((res) => {
          if (res.data.posts) {
            setPosts((prev) => [...prev, ...res.data.posts]);
            setIsLoader(res.data.posts.length % 15 === 0);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsSkeleton(false);
        });
      // }, 1500);
    }
  };
  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#000",
        flex: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: Dimensions.get("window").width,
          paddingHorizontal: 10,

          alignItems: "center",
          height: Dimensions.get("window").height * 0.06,
          minHeight: 40,
        }}
      >
        {searchUserInput.length > 0 && modalVisible && (
          <SearchScreen
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            searchUser={searchUserInput}
          ></SearchScreen>
        )}

        <TouchableOpacity
          style={{ width: "10%" }}
          onPress={() => {
            setModalVisible(() => (!!searchUserInput ? true : false));
          }}
        >
          <AntDesign name="search1" size={24} color="#fff" />
        </TouchableOpacity>
        <Stack space={1} w={"100%"} mx="auto" style={{ marginLeft: 10 }}>
          <Input
            maxLength={100}
            style={{ color: "#fff" }}
            value={searchUserInput}
            onChangeText={(e) => setSearchUserInput(e)}
            w={"80%"}
            variant="unstyled"
            placeholder="Search"
          />
        </Stack>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={posts}
        // stickyHeaderIndices={[0]}
        ListFooterComponent={() =>
          isSkeleton ? (
            <GetIsSkeleton></GetIsSkeleton>
          ) : isLoader && posts.length > 0 ? (
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity onPress={fetchData}>
                <AntDesign name="pluscircle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : null
        }
        // ListHeaderComponent={() => (
        //   <>

        //   </>
        // )}
        // nestedScrollEnabled={true}
        scrollEnabled={true}
        // stickyHeaderIndices={[0]}
        // stickyHeaderHiddenOnScroll={tr}
        renderItem={({ item }) => <PostCard post={item}></PostCard>}
        keyExtractor={(item) => item._id}
        numColumns={3}
      />
    </SafeAreaView>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({});
