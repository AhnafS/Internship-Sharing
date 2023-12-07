const firestore = require("firebase-admin").firestore();
const { FieldValue } = require("firebase-admin/firestore");

async function addInternship(req, res) {
  const { email, internshipDetails } = req.body;
  const docRef = firestore.doc(`internships/${email}`);

  try {
    const doc = await docRef.get();

    if (doc.exists) {
      await docRef.update({
        internshipArray: FieldValue.arrayUnion({ ...internshipDetails }),
      });
      const fieldValue = await doc.data()["internshipArray"];

      if (fieldValue !== undefined) {
        res.status(200).json({ internshipArray: fieldValue });
      } else {
        res.status(404).json({
          error: `${internshipArray} does not exist in the document.`,
        });
      }
    } else {
      res.status(404).json({ error: "No such document!" });
    }
  } catch (error) {
    console.error("Error getting document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = addInternship;
