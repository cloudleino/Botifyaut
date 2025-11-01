// Laddar in miljövariabler från .env
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Importerar nödvändiga moduler
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Testutskrift för att se att .env laddas in korrekt
console.log("PORT:", process.env.PORT, "MONGO_URI:", process.env.MONGO_URI);

// Ansluter till MongoDB (lokalt eller Atlas)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB är uppkopplat!");

    //  Testmodell för att skapa en collection
    const testSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model("Test", testSchema);

    // Skapa ett testdokument om databasen är tom
    TestModel.findOne().then((doc) => {
      if (!doc) {
        new TestModel({ name: "Första roboten" }).save();
        console.log(" Test-dokument skapat!");
      }
    });
  })
  .catch((err) => console.error("Fel vid MongoDB-anslutning:", err));

// Test-route för att kolla att servern funkar
app.get("/", (req, res) => {
  res.send("Botify API körs");
});

// Startar servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
