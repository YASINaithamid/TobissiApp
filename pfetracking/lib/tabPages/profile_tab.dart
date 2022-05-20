import 'dart:convert';
import 'package:jwt_decode/jwt_decode.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:pfetracking/authentication/login_screen.dart';

class ProfileTabPage extends StatefulWidget {
  @override
  State<ProfileTabPage> createState() => _ProfileTabPageState();
}

class _ProfileTabPageState extends State<ProfileTabPage> {
  Map<String, String> headers = new Map();

  @override
  Widget build(BuildContext context) {
    final Size screenSize = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Colors.black,
      body: SingleChildScrollView(
        child: Column(
          children: [
            /* FutureBuilder<Map>(
              future:
                  getUserData(), //sets getServerData method as the expected Future
              builder: (context, snapshot) {
                List<Widget> widgetList = List<Widget>.empty(growable: true);
                if (snapshot.hasData) {
                  //checks if response returned valid data
                  widgetList = getUserInfo(snapshot.data);
                } else if (snapshot.hasError) {
                  //checks if the response threw error
                  widgetList.add(Text("${snapshot.error}"));
                } else {
                  widgetList.add(getRowWithText("Id", "${userData.id}"));
                  widgetList.add(getRowWithText("Username", userData.username));
                  widgetList.add(CircularProgressIndicator());
                }
                return Container(
                  height: (screenSize.height - 60) * 0.26,
                  color: Colors.blue[500],
                  padding: new EdgeInsets.all(10.0),
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: widgetList),
                );
              },
            ), */
          ],
        ),
      ),
    );
  }

  Widget getPosts(List<dynamic> _posts) {
    for (int i = 0; i < _posts.length; i++) {
      _posts.add(getPostCard(_posts[i]));
    }
    return ListView.separated(
      shrinkWrap: true,
      physics: const AlwaysScrollableScrollPhysics(),
      itemCount: _posts.length,
      itemBuilder: (BuildContext context, int index) {
        return _posts[index];
      },
      separatorBuilder: (BuildContext context, int index) => const Divider(),
    );
  }

  Widget getPostCard(post) {
    return Card(
      color: Colors.teal[300],
      child: ListTile(
        subtitle: Text(post),
      ),
    );
  }

  Widget getTextContainer(text) {
    return Container(
      padding: EdgeInsets.only(left: 5, right: 5),
      child: Text(text),
    );
  }

  Widget getRowWithText(label, value) {
    return Row(
      children: <Widget>[
        getTextContainer(label),
        getTextContainer(value),
      ],
    );
  }

  List<Widget> getUserInfo(map) {
    return <Widget>[
      Row(
        children: <Widget>[
          Expanded(
            child: Container(
              height: 100,
              padding: EdgeInsets.only(left: 10),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  getRowWithText("Id", '${map["id"]}'),
                  getRowWithText("Username", map["username"]),
                  getRowWithText("First name", map["name"]["first"]),
                  getRowWithText("Last name", map["name"]["last"]),
                ],
              ),
            ),
          ),
        ],
      ),
      getRowWithText("Phone Number", '${map["phone"]}'),
      getRowWithText("Email", map["email"]),
    ];
  }

  Future<Map> getUserData() async {
    Map<String, dynamic> responseMap = new Map<String, dynamic>();
    final url = Uri.parse('http://[::1]:3000/whoAmI');
    await http.get(url, headers: headers).then((response) {
      responseMap = json.decode(response.body);
      if (response.statusCode == 200) {
        responseMap = responseMap["userdata"];
      } else {
        if (responseMap.containsKey("message"))
          print("hahaahahah" + responseMap["message"]);
      }
    });
    return responseMap;
  }
}
