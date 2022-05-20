////beging

import 'package:flutter/material.dart';

import 'package:pfetracking/authentication/signup_screen.dart';
import 'package:pfetracking/authentication/user.dart';
import 'package:pfetracking/mainScreen/main_screen.dart';
import 'package:http/http.dart' as http;
import 'package:pfetracking/tabPages/home_tab.dart';
import 'dart:convert';
import 'dart:async';
import 'package:toast/toast.dart';

class LoginScreen extends StatefulWidget {
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  TextEditingController emailTextEditingController = TextEditingController();
  TextEditingController passwordTextEditingController = TextEditingController();
  validatForm() {
    ToastContext().init(context);
    if (passwordTextEditingController.text.length < 3) {
      Toast.show("name lenght less than 3",
          duration: Toast.lengthShort, gravity: Toast.bottom);
    } else if (!emailTextEditingController.text.contains("@")) {
      Toast.show("email should contain @",
          duration: Toast.lengthShort, gravity: Toast.bottom);
    } else {
      loginUser(
          emailTextEditingController.text, passwordTextEditingController.text);
    }
  }

  loginUser(String email, String password) async {
    final response = await http.post(
      Uri.parse('http://[::1]:3000/users/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );
    if (response.statusCode == 200) {
      ToastContext().init(context);
      Toast.show("login successfully",
          duration: Toast.lengthLong, gravity: Toast.bottom);
      Navigator.push(context, MaterialPageRoute(builder: (c) => MainScreen()));

      print(response.body);
    } else {
      ToastContext().init(context);
      Toast.show("login Faild",
          duration: Toast.lengthLong, gravity: Toast.bottom);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
          child: Column(
        children: [
          const SizedBox(
            height: 10,
          ),
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Image.asset('images/cir_logo.png'),
          ),
          const SizedBox(
            height: 10,
          ),
          const Text(
            'Login As supervisor',
            style: TextStyle(
              fontSize: 26,
              color: Colors.grey,
              fontWeight: FontWeight.bold,
            ),
          ),
          Icon(Icons.card_travel),
          TextField(
            controller: emailTextEditingController,
            decoration: const InputDecoration(
              labelText: "Email",
              hintText: "Email",
              enabledBorder: UnderlineInputBorder(
                  borderSide:
                      BorderSide(color: Color.fromARGB(22, 83, 100, 100))),
              focusedBorder: UnderlineInputBorder(
                borderSide: BorderSide(color: Color.fromARGB(255, 33, 32, 32)),
              ),
              hintStyle: TextStyle(
                color: Colors.grey,
                fontSize: 10,
              ),
              labelStyle: TextStyle(
                color: Colors.grey,
                fontSize: 20,
              ),
              contentPadding: EdgeInsets.all(12),
              isDense: true,
            ),
          ),
          TextField(
            controller: passwordTextEditingController,
            decoration: const InputDecoration(
              labelText: "Password",
              hintText: "Password",
              enabledBorder: UnderlineInputBorder(
                  borderSide:
                      BorderSide(color: Color.fromARGB(22, 83, 100, 100))),
              focusedBorder: UnderlineInputBorder(
                borderSide: BorderSide(color: Colors.grey),
              ),
              hintStyle: TextStyle(
                color: Colors.grey,
                fontSize: 10,
              ),
              labelStyle: TextStyle(
                color: Colors.grey,
                fontSize: 20,
              ),
              contentPadding: const EdgeInsets.all(12),
              isDense: true,
            ),
          ),
          SizedBox(
            height: 10,
          ),
          ElevatedButton(
            onPressed: () async {
              validatForm();
            },
            /*  onPressed: () {
                todo
               /*  Navigator.push(context,
                    MaterialPageRoute(builder: (c) => VehiculeInfosScreen()));
              }, */ */
            style: ElevatedButton.styleFrom(
              primary: Color.fromARGB(255, 4, 185, 7),
              fixedSize: Size(270, 50),
            ),
            child: Text(
              "Login",
              style: TextStyle(
                color: Color.fromARGB(255, 9, 9, 9),
                fontSize: 26,
              ),
            ),
          ),
          TextButton(
              onPressed: () {
                Navigator.push(
                    context, MaterialPageRoute(builder: (c) => SignUpScreen()));
              },
              child: Text(
                "Don't  have an account ? Register here",
                style: TextStyle(
                  color: Color.fromARGB(255, 22, 226, 8),
                  fontSize: 16,
                ),
              ))
        ],
      )),
    );
  }
}
///////////////end