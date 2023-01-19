import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Modal } from "native-base";
import { getSearchUsers } from "../../api/app/appApi";
import { PostUserType } from "../../api/auth/authApiType";
type SearchScreenPropsType = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  searchUser: string;
};

const SearchScreen = ({
  modalVisible,
  setModalVisible,
  searchUser,
}: SearchScreenPropsType) => {
  const [searchUsers, setSearchUsers] = React.useState<PostUserType[]>([]);
  const [isLoader, setIsLoader] = React.useState(false);
  React.useEffect(() => {
    fetchData();
  }, [searchUser]);

  const fetchData = async () => {
    if (searchUsers.length % 5 === 0) {
      getSearchUsers(searchUser, Math.ceil(searchUsers.length / 5 + 1))
        .then((res) => {
          setSearchUsers((prev) => [...prev, ...res.data.users]);
          setIsLoader(res.data.users.length % 5 === 0);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <Modal
      isOpen={modalVisible}
      onClose={() => setModalVisible(false)}
      size={`full`}
      height="full"
    >
      <Modal.Content
        minHeight={"full"}
        style={{ marginBottom: "auto", marginTop: StatusBar.currentHeight }}
      >
        <Modal.CloseButton />
        <Modal.Header>{searchUser}</Modal.Header>
        <Modal.Body>
          <ScrollView>
            {searchUsers.map((item) => (
              <Text key={item._id} style={{ marginTop: 200 }}>
                {item.userNickName}
              </Text>
            ))}
          </ScrollView>
          {/* <FlatList
            style={{ flex: 1 }}
            data={searchUsers}
            // stickyHeaderIndices={[0]}
            ListFooterComponent={() =>
              isLoader && searchUsers.length > 0 ? (
                <View style={{ flex: 1, alignItems: "center" }}>
                  <TouchableOpacity onPress={fetchData}>
                    <AntDesign name="pluscircle" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              ) : null
            }
            scrollEnabled={true}
            renderItem={({ item }) => (
              <Text style={{ marginTop: 200 }}>{item.userNickName}</Text>
            )}
            keyExtractor={(item) => item._id}
          ></FlatList> */}
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setModalVisible(false);
              }}
            >
              Cancel
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
