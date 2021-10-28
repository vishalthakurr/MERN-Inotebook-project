

import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

const innotes =[
  {
    "_id": "615ac5d9fe064b39ceced58e",
    "user": "615abdf530b13608f5191c5e",
    "title": "hello",
    "description": "hello vishal",
    "tag": " i am good",
    "date": "2021-10-04T09:14:01.996Z",
    "__v": 0
  },
  {
    "_id": "615ac5dafe064b39ceced590",
    "user": "615abdf530b13608f5191c5e",
    "title": "hello",
    "description": "hello vishal",
    "tag": " i am good",
    "date": "2021-10-04T09:14:02.229Z",
    "__v": 0
  },
  {
    "_id": "615ac5dafe064b39ceced592",
    "user": "615abdf530b13608f5191c5e",
    "title": "hello",
    "description": "hello vishal",
    "tag": " i am good",
    "date": "2021-10-04T09:14:02.302Z",
    "__v": 0
  },
  {
    "_id": "615ac5dafe064b39ceced594",
    "user": "615abdf530b13608f5191c5e",
    "title": "hello",
    "description": "hello vishal",
    "tag": " i am good",
    "date": "2021-10-04T09:14:02.509Z",
    "__v": 0
  },
  {
    "_id": "615ac5dafe064b39ceced596",
    "user": "615abdf530b13608f5191c5e",
    "title": "hello",
    "description": "hello vishal",
    "tag": " i am good",
    "date": "2021-10-04T09:14:02.563Z",
    "__v": 0
  },
  {
    "_id": "615ac5dafe064b39ceced598",
    "user": "615abdf530b13608f5191c5e",
    "title": "hello",
    "description": "hello vishal",
    "tag": " i am good",
    "date": "2021-10-04T09:14:02.820Z",
    "__v": 0
  },
  {
    "_id": "615c3cd05d647a6712a5187e",
    "user": "615abdf530b13608f5191c5e",
    "title": "welcome",
    "description": "good morning nagin",
    "tag": " greet",
    "date": "2021-10-05T11:53:52.859Z",
    "__v": 0
  }
]


const [note, setNote] = useState(innotes)

  return (


    <NoteContext.Provider  value={{note , setNote }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

//   const note = 
//     {
//       _id: "615c3cd05d647a6712a5187e",
//       user: "615abdf530b13608f5191c5e",
//       title: "welcome",
//       description: "good morning vanshika",
//       tag: " greet",
//       date: "2021-10-05T11:53:52.859Z",
//       __v: 0
//     } 

//   // const [notes , setNotes ] = useState(notein)

//     return ( 

//         <NoteContext.Provider value={{note}} >
//             {props.children}


//         </NoteContext.Provider>
//     )


// }