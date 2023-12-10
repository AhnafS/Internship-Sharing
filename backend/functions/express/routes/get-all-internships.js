const firestore = require("firebase-admin").firestore();

async function getAllInternships(req, res) {
  try {
    // Get a reference to the collection
    const collectionRef = firestore.collection("internships");

    // Get all documents in the collection
    const snapshot = await collectionRef.get();

    // Initialize an array to store the result
    const resultArray = [];

    // Iterate through each document
    snapshot.docs.forEach((doc) => {
      // Get the data of the document
      const data = doc.data();

      // Calculate the length of 'allInternships' array
      const internshipArrayLength = data.internshipArray
        ? data.internshipArray.length
        : 0;

      // Create an object with document name and 'internshipArray' length
      const resultObject = {
        documentName: doc.id,
        internshipArrayLength: internshipArrayLength,
      };

      // Push the object to the result array
      resultArray.push(resultObject);
    });

    res.status(200).json({ resultArray });
  } catch (error) {
    console.error("Error getting internship lengths: ", error);
    res.status(500).json({ error });
  }
}

module.exports = getAllInternships;
