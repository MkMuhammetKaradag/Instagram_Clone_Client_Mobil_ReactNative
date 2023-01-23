import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Button, Modal } from "native-base";
import { getSearchUsers } from "../../api/app/appApi";
import { PostUserType } from "../../api/auth/authApiType";
import { NULL_URL } from "../../api/url";
import { useNavigation } from "@react-navigation/native";
import { AppScreenNavigationProp } from "../../navigation/AppStack";
import { MaterialIcons } from "@expo/vector-icons";

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
  const navigation = useNavigation<AppScreenNavigationProp["navigation"]>();
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
      backgroundColor={"#000"}
    >
      <Modal.Content
        minHeight={"full"}
        style={{
          marginBottom: "auto",
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#000",
        }}
      >
        <Modal.CloseButton />
        <Modal.Header style={{ backgroundColor: "#000" }}>
          <Text style={{ color: "#fff", fontSize: 20 }}>{searchUser}</Text>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000", flex: 1 }}>
          <ScrollView>
            {searchUsers.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("UserProfile", {
                    userNickName: item.userNickName,
                  });
                }}
                style={{
                  borderBottomWidth: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  borderColor: "gray",
                  padding: 5,
                }}
                key={item._id}
              >
                <Image
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                  source={{
                    uri: item.userProfilePicture || NULL_URL,
                  }}
                ></Image>
                <Text style={{ color: "#fff", marginLeft: 20 }}>
                  {item.userNickName}
                </Text>
              </TouchableOpacity>
            ))}
            {isLoader && searchUsers.length > 0 && (
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
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#000" }}>
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
