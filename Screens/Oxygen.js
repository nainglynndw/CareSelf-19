import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Oxygen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    { label: "ကချင်", value: "kachin" },
    { label: "ကယား", value: "kayah" },
    { label: "ကရင်", value: "kayin" },
    { label: "ချင်း", value: "chin" },
    { label: "စစ်ကိုင်း", value: "sagaing" },
    { label: "တနင်္ဂသာရီ", value: "tanintharyi" },
    { label: "နေပြည်တော်", value: "naypyitaw" },
    { label: "ပဲခူး", value: "bago" },
    { label: "မကွေး", value: "magway" },
    { label: "မန္တလေး", value: "mandalay" },
    { label: "မွန်", value: "mon" },
    { label: "ရခိုင်", value: "arakan" },
    { label: "ရန်ကုန်", value: "yangon" },
    { label: "ၡမ်း", value: "shan" },
    { label: "ဧရာဝတီ", value: "aya" },
  ]);
  const [data, setData] = useState([]);

  const fetchData = () => {
    if (value !== "") {
      const db = firebase.firestore().collection(value);
      db.onSnapshot((query) => {
        const data = [];
        query.forEach((doc) => {
          data.push({
            ...doc.data(),
            key: doc.id,
          });
          setData(data);
        });
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Text selectable={true} style={styles.header}>
            {item.name}
          </Text>
        </View>
        <View style={styles.itemBody}>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons name="phone" size={24} color="black" />
            <Text selectable={true} style={styles.phoneText}>
              {item.phone}
            </Text>
          </View>

          <View
            style={{
              width: "90%",
              height: 2,
              borderBottomWidth: 1,
              borderBottomColor: "#b5b5b5",
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="map-marker" size={24} color="black" />
            <Text selectable={true} style={styles.addressText}>
              {item.address}{" "}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{}}>
        <DropDownPicker
          textStyle={{
            fontWeight: "bold",
          }}
          showArrowIcon={true}
          searchable={true}
          disableBorderRadius={true}
          theme="DARK"
          placeholder="တိုင်း/ပြည်နယ်ရွေးပါ"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Oxygen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  itemContainer: {
    overflow: "hidden",
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  itemHeader: {
    backgroundColor: "#18648c",
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#eee",
  },
  itemBody: {
    padding: 5,
    paddingHorizontal: 15,
    alignItems: "flex-start",
    backgroundColor: "#fff",
    width: Dimensions.get("window").width - 25,
  },
  phoneText: {
    marginVertical: 3,
    color: "#4f1313",
    marginLeft: 5,
  },
  addressText: {
    marginVertical: 3,
    color: "#4f1313",
  },
});
