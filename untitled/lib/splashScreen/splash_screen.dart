import 'dart:async';

import 'package:flutter/material.dart';
import 'package:untitled/authentication/signup_screen.dart';
import 'package:untitled/mainScreen/main_screen.dart';

class MySplashScreen extends StatefulWidget {
  const MySplashScreen({Key? key}) : super(key: key);

  @override
  State<MySplashScreen> createState() => _MySplashScreenState();
}

class _MySplashScreenState extends State<MySplashScreen> {
  startTimer() {
    Timer(const Duration(seconds: 3), () async {
      //send user to main screen
      Navigator.push(
          context, MaterialPageRoute(builder: (c) => const SignUpScreen()));
    });
  }

  // initState called whenever we go to a page
  @override
  void initState() {
    super.initState();
    startTimer();
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Container(
        color: Color.fromARGB(255, 27, 26, 27),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                "images/cir_logo.png",
              ),
              const Text(
                'Bus Tracking App',
                style: TextStyle(
                    fontSize: 26,
                    color: Colors.white60,
                    fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
