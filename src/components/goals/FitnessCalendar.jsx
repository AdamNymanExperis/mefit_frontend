import React from "react";
import { useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import listPlugin from "@fullcalendar/list"
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme
} from "@mui/material"

import goal, { getGoalsByProfileId } from "../../api/goal"
import { useEffect } from "react";
import { mockGoals } from "../../data/mockData";
import GoalListItem from "./goalList/GoalListItem";
import { createGoal, deleteGoal } from "../../api/goal";
import keycloak from "../../keycloak";

export function FitnessCalendar() {
  const [currentGoals, setCurrentGoals] = useState([])

  useEffect( () => {
    const callApiForGoals = async() => {
      const data = await getGoalsByProfileId(1) 
      data[1].forEach(function (element) {
        if(element.achieved) {
          element.color="green"
        } else {
          element.color ="red"
        }        
      })
      setCurrentGoals(data[1])
    }
    callApiForGoals()
  }, []) 

  useEffect( () => {
    console.log(...currentGoals)
  }, [currentGoals]) 

  //--------------------------------------------------------

  const addNewGoal = (goal) => {
    setCurrentGoals([...currentGoals, goal])
    console.log(goal.id)
  }

  const removeGoal = () => {
    const newGoals = [...currentGoals] // copy
    newGoals.splice(currentGoals.length-1, 1) // remove goal, returns the removed goal also
    setCurrentGoals(newGoals) // update state
  }

  const calculateEndDate = (start) => {
    let firstDay = new Date(start)
    let nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000)
    return nextWeek
  }

  //-----------------------------------------------------------
  const handleDateClick = async (selected) => {
    console.log(selected)
    const title = prompt("Enter goal title")
    const calenderApi = selected.view.calendar
    calenderApi.unselect()
    // check so date is not back in time

    if(title) {
      const goalToPost = {
        title: title,
        start: selected.startStr,
        end: calculateEndDate(selected.startStr),
        achieved: false,
        profileId: 1,
        allDay: selected.allDay,
        color: "red"
        }
      let postedGoal = await createGoal(keycloak.token, goalToPost)
      addNewGoal(postedGoal)
      calenderApi.addEvent(goalToPost)
      //calenderApi.addEvent(postedGoal) // den här innehåller id för att kunna delete frpn api
    }
  }

  const handleEventClick = (selected) => {
    console.log(selected)
    if (window.confirm(`Remove  '${selected.event.title}'`)) {
      selected.event.remove()
      removeGoal()
      //deleteGoal(keycloak.token, 18) // delete from api
      // ändra till draggable false ------------------------------------------>
      // ta bort overlap till false
    }
  }

  if (currentGoals.length === 0) {
    return <p>Loading goals...</p>;
  }

  return (
    <Box m="20px">
      {/* <Header title="Calendar" subtitle="Full Calendar Interactive Page" /> */}

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          // backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Goals</Typography>
          <List>
            {currentGoals.map((event) => ( 
              <GoalListItem key={event.id} goal={event}/> // displayar ingen title
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            //eventsSet={(events) => setCurrentGoals(events)}
            initialEvents={[...currentGoals]} // wait for this async
            displayEventTime= {false}
          />
        </Box>
      </Box>
    </Box>
  )
}
 

  