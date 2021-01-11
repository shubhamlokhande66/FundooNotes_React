

import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import "./Dashboard.css";
import CreateNote from "../../components/CreateNotes/CreateNotes";
import { getNoteList } from "../../Service/NoteService";
import DisplayCard from "../../components/DisplayNotes/DisplayNotes";
import Appbar from "../../components/AppBar/Appbar";
import Collaborator from "../../components/Collaborator/Collaborator";

  const DashBoard = () => {
    const [showCard, setShowCard] = useState("take_note");
    const [noteList, setNoteList] = useState([]);
    const [collabUser, setCollabUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectCard, setSelectCard] = useState('note')
    const [pinText, setPinText] = useState(false)
    const [refresh, setRefresh] = useState(Math.random())
    const [searchNote, setSearchNote] = useState('')
    const [isGrid, setIsGrid] = useState(true)
    const [showCheckBox, setShowCheckBox] = useState(true)
   
    useEffect(() => {
      getNoteList()
        .then((res) => {
          setNoteList(res.data.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.warn("error", err);
        });
    }, [showCard,refresh]);
  
    
  
    return (
      <div>
        <Appbar selectCard={selectCard} 
        setSelectCard={setSelectCard} setRefresh={setRefresh} 
        setSearchNote={setSearchNote} setIsGrid={setIsGrid} isGrid={isGrid}/>
        <div className="noteContainer">
          {(showCard === "take_note" ) ? (
            <Card
              className="cardContainer"
              onClick={() => setShowCard("create_note")}
            >
              <CardContent className="subCardContainer">
                <Typography className="noteTitle">Take a note...</Typography>
                <div className="imageCheckBoxContainer">
                  <CheckBoxOutlinedIcon onClick={() => setShowCheckBox(false)}
                   style={{ cursor: 'pointer' }}/>
                  <ImageIcon />
                </div>
              </CardContent>
            </Card>
          ) : null}
          {showCard === "create_note" ? (
            <CreateNote collabUser={collabUser} setShowCard={setShowCard} 
            setRefresh={setRefresh} setShowCheckBox={setShowCheckBox} showCheckBox={showCheckBox}/>
          ) : null}
          {showCard === "collaborator" ? (
            <Collaborator
              setCollabUser={setCollabUser}
              setShowCard={setShowCard}
            />
          ) : null}
        </div>
        {isLoading ? (
          <div className="progressBar">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div>
            <Container className="displayCardContainer">
            {pinText ? <div className="pinText">Pin</div>: null}
             {searchNote === '' ?
               <Grid
                container
                className="gridContainer"
                spacing={2}
                direction="row"
                alignItems="center"
              >
                
              </Grid> : null}
              {pinText ? <div className="otherText">Other</div>: null}
              {searchNote === '' ?
                <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                className="gridContainer"
              >
                {noteList.map((item, index) => {         
                if(selectCard === 'note'){
                  return(
                    <React.Fragment key={index}>
                      {!item.isPined && !item.isArchived && item.isDeleted === false ?
                      <DisplayCard key={index} item={item} setRefresh={setRefresh} setPinText={setPinText} isGrid={isGrid}/>:null}
                    </React.Fragment>
                  )
                }
   
                 return ( 
                   <React.Fragment key={index}>
                     {item.noteLabels.map((labelItem,labelIndex)=>{
                       if(labelItem.label === selectCard){
                        return(
                          <DisplayCard key={labelIndex} item={item} setRefresh={setRefresh} setPinText={setPinText} isGrid={isGrid}/>
                        )
                      }
                      return(
                        <div >
                          {false &&
                        <DisplayCard key={index} item={item} />}
                        </div>
                      )
                      })}
                  </React.Fragment>
                    )
                  }
                )}
              </Grid> : null}
              </Container>
          </div>
        )}
      </div>
    );
  };
  
  export default DashBoard;