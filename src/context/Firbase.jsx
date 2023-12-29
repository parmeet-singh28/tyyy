
import { initializeApp, getApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA5fjD-4847R_mzhK0MBU_AiFToeYgrnDI",
  authDomain: "bookify-b6efc.firebaseapp.com",
  projectId: "bookify-b6efc",
  storageBucket: "bookify-b6efc.appspot.com",
  messagingSenderId: "555926985855",
  appId: "1:555926985855:web:356f4fdcf52afa3c4ab34a"
};

export const app = initializeApp(firebaseConfig);
const FirebaseContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const firebaseApp = getApp();
const storage = getStorage(firebaseApp);




export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  }, [])
  // if(user){
  //   setisLoggedIn(true);
  // }
  useEffect(()=>{
    if(user) setisLoggedIn(true);
    else setisLoggedIn(false);
  },[user])
  // const isLoggedIn = user ? true : false;
  const signUpWithEmailAndPassord = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }

  const loginUserWithEmailAndPAssword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }

  const signupWihGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert(errorMessage)
    });
  }
  // console.log("user data", user);

  const handelCreateNewListing = async (name, isbn, price, cover) => {
    const storageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(storageRef, cover);
    return await addDoc(collection(db, "books"), {
      name: name,
      isbnNumber: isbn,
      price: price,
      imgURL: uploadResult.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
    // console.log("Document written with ID: ", docRef.id);
  }
  const fetchMyBooks = async (userId) => {
    if(user===null) return null;
    const collectionRef = collection(db, "books");
    const q = query(collectionRef, where("userId", "==", userId));
    const result = await getDocs(q);
    return result;

  }
  const listAllBooks = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    return querySnapshot;

  }
  const getBookById = async (id) => {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path))
    
  }
  const signoutUser = () => {
    signOut(auth)
    setisLoggedIn(false);
  }
  
  const placeOrder = async (bookId, quantity) => {
    return await addDoc(collection(db, "books", bookId, "orders"), {
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      quantity: Number(quantity),
    });
    
  }
  const getOrders = async (bookId) => {
    const collRef = collection(db, "books", bookId, "orders")
    const res = await getDocs(collRef);
    return res;
  }
    return (
    <FirebaseContext.Provider value={{getOrders, user, fetchMyBooks, placeOrder, getBookById, signUpWithEmailAndPassord, loginUserWithEmailAndPAssword, signupWihGoogle, isLoggedIn, handelCreateNewListing, listAllBooks, getImageURL, signoutUser}}>
        {props.children}
    </FirebaseContext.Provider>
    )
    }