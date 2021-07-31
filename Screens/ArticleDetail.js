import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";

const ArticleDetail = ({ route, navigation }) => {
  const item = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ကျန်းမာရေးဗဟုသုတများ</Text>
      </View>

      <View style={styles.body}>
        <ScrollView>
          <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text style={styles.itemAuthor}>{item.author}</Text>
                <Text style={styles.itemAuthor}>{item.date}</Text>
              </View>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            <View style={styles.itemBody}>
              <Text style={styles.bodyText}>{item.text}</Text>
              <View style={styles.imgContainer}>
                <Image
                  style={styles.img}
                  source={{
                    uri: item.image,
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ArticleDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#eee",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    width: "100%",
    backgroundColor: "#18648c",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  headerTitle: {
    color: "#eee",
    fontWeight: "bold",
    fontSize: 18,
  },
  itemContainer: {
    width: "100%",
    backgroundColor: "#fff",

    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
  itemHeader: {
    width: "100%",
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 5,
  },
  itemAuthor: {
    fontSize: 12,
    color: "gray",
  },
  body: {
    width: "100%",
    padding: 5,
    flex: 1,
  },
  itemBody: {
    width: "100%",
  },
  bodyText: {
    color: "#2e2e2e",
  },
  imgContainer: {
    marginTop: 10,
  },

  img: {
    resizeMode: "contain",
    width: "100%",
    height: 200,
  },
});
