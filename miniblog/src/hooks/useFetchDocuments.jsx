import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    getDocs, 
    query, 
    where, 
    orderBy, 
    snapshotEqual,
    onSnapshot
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {

    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // deak with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        let unsubscribe;

        async function loadData() {
            if (cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db, docCollection);

            try {
                let q;

                if(search) {
                    q = query(
                        collectionRef,
                        where("tagsArray", "array-contains", search),
                        orderBy("createdAt", "desc")
                    );
                } else {
                    q = query(collectionRef,
                        orderBy("createdAt", "desc"));
                }

                const onSuccess = (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                    setError(null);
                    setLoading(false);
                };

                const onError = (snapshotError) => {
                    if (search && snapshotError.code === "failed-precondition") {
                        const fallbackQuery = query(
                            collectionRef,
                            where("tagsArray", "array-contains", search)
                        );
                        unsubscribe = onSnapshot(
                            fallbackQuery,
                            onSuccess,
                            (e2) => {
                                console.error("Snapshot error:", e2);
                                setError(e2.message);
                                setLoading(false);
                            }
                        );
                    } else {
                        console.error("Snapshot error:", snapshotError);
                        setError(snapshotError.message);
                        setLoading(false);
                    }
                };

                unsubscribe = onSnapshot(q, onSuccess, onError);

            } catch (error) {
                console.log(error);
                setError(error.message);

                setLoading(false);
            }
        }    
        loadData();
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
            setCancelled(true);
        };
    }, [docCollection, search, uid]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);
    return { documents, loading, error };
}
