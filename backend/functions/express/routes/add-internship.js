const firestore = require("firebase-admin").firestore();
const { FieldValue } = require("firebase-admin/firestore");

async function addInternship(req, res) {
  const { email, internshipDetails } = req.body;
  const docRef = firestore.doc(`internships/${email}`);

  try {
    const doc = await docRef.get();

    if (doc.exists) {
      let fieldValue = await doc.data()["internshipArray"];

      if (fieldValue === undefined) {
        // If internshipArray doesn't exist, create it with an empty array
        fieldValue = [];
      }

      await docRef.update({
        internshipArray: FieldValue.arrayUnion({ ...internshipDetails }),
      });

      res.status(200).json({ internshipArray: fieldValue });
    } else {
      // If the document doesn't exist, create it with internshipArray as an empty array
      await docRef.set({ internshipArray: [] });
      res.status(200).json({ internshipArray: [] });
    }
  } catch (error) {
    console.error("Error getting/updating document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = addInternship;
