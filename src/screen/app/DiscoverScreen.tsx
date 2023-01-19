import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import React from "react";

import { getDiscoverPosts } from "../../api/app/appApi";
import { PostType } from "../../api/app/appApiTypes";
import GetIsSkeleton from "../../components/app/Discover/GetIsSkeleton";
import PostCard from "../../components/app/Profile/PostCard";
import { AntDesign } from "@expo/vector-icons";
import { Input, InputGroup, InputLeftAddon, Stack } from "native-base";
const DiscoverScreen = () => {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [isLoader, setIsLoader] = React.useState(false);
  const [isSkeleton, setIsSkeleton] = React.useState(true);
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
      <FlatList
        data={posts}
        stickyHeaderIndices={[0]}
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
        ListHeaderComponent={() => (
          <>
            <Stack w={"100%"} style={{ backgroundColor: "#000" }}>
              <InputGroup
                w={{
                  base: "100%",
                  md: "285",
                }}
                justifyContent="center"
              >
                <InputLeftAddon
                  variant={"unstyled"}
                  w={"10%"}
                  backgroundColor="#000"
                  borderWidth={"0"}
                  children={
                    <TouchableOpacity>
                      <AntDesign name="search1" size={24} color="#fff" />
                    </TouchableOpacity>
                  }
                />
                <Input
                  style={{ color: "#fff" }}
                  w={{
                    base: "90%",
                    md: "100%",
                  }}
                  variant="unstyled"
                  placeholder="nativebase"
                />
              </InputGroup>
            </Stack>
          </>
        )}
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
