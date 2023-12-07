const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getAuth: getAdminAuth } = require("firebase-admin/auth");
const firestore = require("firebase-admin").firestore();

async function register(req, res) {
  const { email, password, secureNote } = req.body;
  if (!secureNote) {
    res.status(400).json({ error: { code: "no-secure-note" } });
    return;
  }

  try {
    const auth = getAuth();
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const adminAuth = getAdminAuth();
    const token = await adminAuth.createCustomToken(credential.user.uid);
    await firestore.doc(`users/${credential.user.uid}`).set({ secureNote });
    await firestore.doc(`internships/${email}`).set({ internshipArray: [] });
    res.status(201).json({ token });
  } catch (err) {
    const { code } = err;
    if (code === "auth/email-already-in-use") {
      res.status(400);
      console.log(err);
    } else {
      console.log(err);
      console.log(err);
      res.status(500);
    }
    res.json({
      error: {
        code: code ? code.replace("auth/", "") : undefined,
      },
    });
  }
}

module.exports = register;
