const firestore = require("firebase-admin").firestore();

async function getInternships(req, res) {
  const email = req.params.email;
  if (!email) {
    res.status(400).json({ error: { code: "no-email" } });
    return;
  }

  const snapshot = await firestore.collection("internships").doc(email).get();
  if (!snapshot.exists) {
    res.status(404).json({ error: { code: "user-internships-found" } });
    return;
  }
  const internships = snapshot.data()["internshipArray"];

  res.status(200).json({ internships });
}

module.exports = getInternships;
