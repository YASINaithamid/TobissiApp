import 'package:flutter/material.dart';
import 'package:pfetracking/authentication/user.dart';
import 'package:pfetracking/mainScreen/main_screen.dart';
import 'package:pfetracking/widgets/progress_dialog.dart';
//import 'package:fluttertoast/fluttertoast.dart';
import 'package:toast/toast.dart';
//import 'package:untitled/authentication/Vehicule_infos.dart';
import 'package:pfetracking/authentication/login_screen.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:async';

class SignUpScreen extends StatefulWidget {
  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  TextEditingController nameTextEditingController = TextEditingController();
  TextEditingController emailTextEditingController = TextEditingController();
  TextEditingController phoneTextEditingController = TextEditingController();
  TextEditingController passwordTextEditingController = TextEditingController();

  validatForm() {
    ToastContext().init(context);
    if (nameTextEditingController.text.length < 3) {
      Toast.show("name lenght less than 3",
          duration: Toast.lengthShort, gravity: Toast.bottom);
    } else if (!emailTextEditingController.text.contains("@")) {
      Toast.show("email should contain @",
          duration: Toast.lengthShort, gravity: Toast.bottom);
    } else if (phoneTextEditingController.text.isEmpty) {
      Toast.show("shone shouldn't be empty",
          duration: Toast.lengthShort, gravity: Toast.bottom);
    } else if (passwordTextEditingController.text.length < 4) {
      Toast.show("pass lenght less than 4",
          duration: Toast.lengthShort, gravity: Toast.bottom);
    } else {
      saveSupervisorInfoNow();
    }
  }

  saveSupervisorInfoNow() {
    showDialog(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext c) {
          return ProgressDialog(
            message: "Processing, Please wait...",
          );
        });
    createUser(
        emailTextEditingController.text, passwordTextEditingController.text);
  }

  Future<User> createUser(String email, String password) async {
    final response = await http.post(
      Uri.parse('http://[::1]:3000/signup'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      // If the server did return a 201 CREATED response,
      // then parse the JSON.
      print("createdddddddd");
      Navigator.pop(context);
      Navigator.push(context, MaterialPageRoute(builder: (c) => LoginScreen()));
      return User.fromJson(jsonDecode(response.body));
    } else {
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      throw Exception('Failed to create User.');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: 10,
            ),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Image.asset('images/cir_logo.png'),
            ),
            SizedBox(
              height: 10,
            ),
            const Text(
              'Registre As supervisor',
              style: TextStyle(
                fontSize: 26,
                color: Colors.grey,
                fontWeight: FontWeight.bold,
              ),
            ),
            TextField(
              controller: nameTextEditingController,
              decoration: const InputDecoration(
                labelText: "Name",
                hintText: "Name",
                enabledBorder: UnderlineInputBorder(
                    borderSide:
                        BorderSide(color: Color.fromARGB(22, 83, 100, 100))),
                focusedBorder: UnderlineInputBorder(
                  borderSide:
                      BorderSide(color: Color.fromARGB(255, 11, 11, 11)),
                ),
                hintStyle: TextStyle(
                  color: Color.fromARGB(255, 14, 13, 13),
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
              controller: emailTextEditingController,
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(
                labelText: "Email",
                hintText: "Email",
                enabledBorder: UnderlineInputBorder(
                    borderSide:
                        BorderSide(color: Color.fromARGB(22, 83, 100, 100))),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.grey),
                ),
                hintStyle: TextStyle(
                  color: Color.fromARGB(255, 235, 225, 225),
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
              controller: phoneTextEditingController,
              keyboardType: TextInputType.phone,
              decoration: InputDecoration(
                labelText: "Phone",
                hintText: "ex:0698797897",
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
                contentPadding: EdgeInsets.all(12),
                isDense: true,
              ),
            ),
            TextField(
              controller: passwordTextEditingController,
              keyboardType: TextInputType.text,
              obscureText: true,
              decoration: InputDecoration(
                labelText: "Password",
                hintText: "password",
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
                contentPadding: EdgeInsets.all(12),
                isDense: true,
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            ElevatedButton(
              onPressed: () {
                validatForm();
              },
              /*  onPressed: () {
                //todo
                Navigator.push(
                    context, MaterialPageRoute(builder: (c) => LoginScreen()));
              }, */

              style: ElevatedButton.styleFrom(
                primary: Color.fromARGB(255, 109, 200, 5),
                fixedSize: Size(270, 50),
              ),
              child: Text(
                "Create Account",
                style: TextStyle(
                  color: Color.fromARGB(255, 9, 9, 9),
                  fontSize: 26,
                ),
              ),
            ),
            TextButton(
                onPressed: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (c) => LoginScreen()));
                },
                child: Text(
                  "Already have an account ? login here",
                  style: TextStyle(
                    color: Color.fromARGB(255, 22, 226, 8),
                    fontSize: 16,
                  ),
                ))
          ],
        ),
      ),
    );
  }
}
