import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config' 
import { collection,onSnapshot } from 'firebase/firestore'

const useGetData = collectionName  => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const collectionRef =collection(db,collectionName);


    useEffect(()=>{
        const getData = async() => {
            //======cập nhật dữ liệu thời gian thực firebase======
             await onSnapshot(collectionRef,(Snapshot)=>{
                setData(Snapshot.docs.map(doc => ({ ...doc.data(),id: doc.id})))
                setLoading(false)
            })
            
        };
        getData()
    },[]);
  return { data,loading };
};

export default useGetData;