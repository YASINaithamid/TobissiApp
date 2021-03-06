import 'package:flutter/material.dart';
import 'package:pfetracking/tabPages/earnings_tab.dart';
import 'package:pfetracking/tabPages/home_tab.dart';
import 'package:pfetracking/tabPages/profile_tab.dart';
import 'package:pfetracking/tabPages/vehiculesTripes_tab.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen>
    with SingleTickerProviderStateMixin {
  TabController? tabController;
  int selectedIdex = 0;

  onItemClicked(int index) {
    setState(() {
      selectedIdex = index;
      tabController!.index = selectedIdex;
    });
  }

  @override
  void initState() {
    super.initState();
    tabController = TabController(length: 4, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: TabBarView(
        physics: const NeverScrollableScrollPhysics(),
        controller: tabController,
        children: [
          HomeTabPage(),
          EarningsTabPage(),
          VehiculesTripesTabPqge(),
          ProfileTabPage(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: "home",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.credit_card),
            label: "manage bus",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.start),
            label: "show trafic",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: "Profile",
          ),
        ],
        unselectedItemColor: Colors.white70,
        selectedItemColor: Colors.white,
        backgroundColor: Colors.black87,
        type: BottomNavigationBarType.fixed,
        selectedLabelStyle: const TextStyle(fontSize: 14),
        showSelectedLabels: true,
        currentIndex: selectedIdex,
        onTap: onItemClicked,
      ),
    );
  }
}
