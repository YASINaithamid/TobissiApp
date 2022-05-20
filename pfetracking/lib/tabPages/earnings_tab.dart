import 'package:flutter/material.dart';

class EarningsTabPage extends StatefulWidget {
  const EarningsTabPage({Key? key}) : super(key: key);

  @override
  State<EarningsTabPage> createState() => _EarningsTabPageState();
}

class _EarningsTabPageState extends State<EarningsTabPage> {
  TextEditingController vehiculeNumberTextEditingController =
      TextEditingController();
  TextEditingController vehiculeDateDebutTextEditingController =
      TextEditingController();
  TextEditingController vehiculeDateFinTextEditingController =
      TextEditingController();
  TextEditingController vehiculeModelTextEditingController =
      TextEditingController();
  List<String> vehiculeTypeList = ["Grand Bus", "Moyen bus", "Petite"];
  String? selectedVehicultype;

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
              'Add Vehicules details',
              style: TextStyle(
                fontSize: 26,
                color: Colors.grey,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            TextField(
              controller: vehiculeModelTextEditingController,
              keyboardType: TextInputType.text,
              decoration: InputDecoration(
                labelText: "Modele",
                hintText: "Modele",
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
            TextField(
              controller: vehiculeNumberTextEditingController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: "Number",
                hintText: "Number",
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
            TextField(
              controller: vehiculeDateDebutTextEditingController,
              keyboardType: TextInputType.datetime,
              decoration: InputDecoration(
                labelText: "Date de debut de service",
                hintText: "Date de debut",
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
            TextField(
              controller: vehiculeDateFinTextEditingController,
              keyboardType: TextInputType.text,
              decoration: InputDecoration(
                labelText: "Date de Fin de service",
                hintText: "Date de fin de service",
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
            Padding(
              padding: EdgeInsets.all(16.0),
              child: const Text(
                'Choose Vehicule  type',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.grey,
                ),
              ),
            ),
            DropdownButton(
              dropdownColor: Colors.black,
              hint: const Text(
                'choose car type',
                style: TextStyle(
                  fontSize: 14.0,
                  color: Colors.grey,
                ),
              ),
              iconSize: 30,
              icon: const Icon(Icons.train_sharp),
              value: selectedVehicultype,
              onChanged: (newvalue) {
                selectedVehicultype = newvalue.toString();
              },
              items: vehiculeTypeList.map((vehicule) {
                return DropdownMenuItem(
                  child: Text(
                    vehicule,
                    style: const TextStyle(color: Colors.grey),
                  ),
                  value: vehicule,
                );
              }).toList(),
            ),
            SizedBox(
              height: 20,
            ),
            ElevatedButton(
              onPressed: () {
                //todo
                /*  Navigator.push(context,
                    MaterialPageRoute(builder: (c) => VehiculeInfosScreen())); */
              },
              style: ElevatedButton.styleFrom(
                primary: Colors.lightGreenAccent,
              ),
              child: Text(
                "Create Vehicule",
                style: TextStyle(
                  color: Color.fromARGB(255, 9, 9, 9),
                  fontSize: 26,
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
