import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, query, orderBy, limit } from "firebase/firestore";

function firebaseConfigVariavel() {
    if (typeof process !== 'undefined') {
        console.log('process: ', process);
    }
    return {
        apiKey: "AIzaSyC0JQiG5B7Tdf0Znd-qFMO5L8xT4G7sWnI",
        authDomain: "djliveryjogo.firebaseapp.com",
        projectId: "djliveryjogo",
        storageBucket: "djliveryjogo.appspot.com",
        messagingSenderId: "187206692394",
        appId: "1:187206692394:web:49abad1a130600c6155d53",
        measurementId: "G-2TKG4HKWH6"
    };
}

const app = initializeApp(firebaseConfigVariavel());
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Função para buscar valores na coleção 'placar'
export async function getScores() {
  const scoresCollection = collection(db, 'placar');
  const scoresQuery = query(scoresCollection, orderBy('pontuacao', 'desc'), limit(10));
  const scoresSnapshot = await getDocs(scoresQuery);
  const scoresList = scoresSnapshot.docs.map(doc => doc.data());
  return scoresList;
}

// Função para adicionar valores à coleção 'placar'
export async function addScore(name: any, score: any) {
    try {
      await addDoc(collection(db, 'placar'), { nome: name, pontuacao: score });
      console.log("Score adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar score: ", error);
    }
  }


