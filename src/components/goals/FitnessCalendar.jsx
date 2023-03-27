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
import { getProfile } from "../../api/profile";

export function FitnessCalendar() {
  const [currentGoals, setCurrentGoals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    const callApiForGoals = async() => {

      const data = await getGoalsByProfileId(keycloak.tokenParsed.sub) // hämtar bara för id 1
      data[1].forEach(function (element) {
        if(element.achieved) {
          element.color="#a7fa9d" // green
        } else {
          element.color ="#ff5c5c" // red
        }        
      })
      setCurrentGoals(data[1]) // visar inte calendar
      setLoading(false)
    }
    callApiForGoals()
  }, []) 

  const addNewGoal = (goal) => {
    setCurrentGoals([...currentGoals, goal])
    console.log(goal.id)
  }

  const removeGoal = (id) => {
    const newGoals = [...currentGoals] // copy
    let indexToRemove = null
    for(let i = 0; i < newGoals.length; i++) {
      if(newGoals[i].id == id) { // dont check for type
        indexToRemove = i
      }
    }
    console.log(indexToRemove)
    if(indexToRemove !== null) {
      let removedGoal = newGoals.splice(indexToRemove, 1) // remove goal, returns the removed goal also
      console.log(removedGoal)
    }
    setCurrentGoals(newGoals) // update state
  }

  const calculateEndDate = (start) => {
    let firstDay = new Date(start)
    let nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000)
    return nextWeek
  }

  const checkDate = (date) => {
    return new Date(date).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0)
  }

  const handleDateClick = async (selected) => {   
    if(checkDate(selected.start)) {
      const title = prompt("Enter goal title")
      const calenderApi = selected.view.calendar
      calenderApi.unselect()

      let profile = await Promise.resolve(getProfile(keycloak.token, keycloak.tokenParsed.sub))
   
      if(title) {
        const goalToPost = {
          title: title,
          start: selected.startStr,
          end: calculateEndDate(selected.startStr),
          achieved: false,
          profileId: profile[1].id,
          allDay: selected.allDay,
          color: "#ff5c5c",
          }
        let postedGoal = createGoal(keycloak.token, goalToPost)    
        let promise = await Promise.resolve(postedGoal)
        addNewGoal(promise[1])
        console.log(promise[1])
        calenderApi.addEvent({...promise[1], color: "#ff5c5c", allDay: true })
      }
    }
  }

  const handleEventClick = (selected) => {
    console.log(selected)
    if (window.confirm(`Remove  '${selected.event.title}'`)) {
      selected.event.remove()
      let id = selected.event.id
      removeGoal(id) // delete from calendar
      deleteGoal(keycloak.token, id) // delete from api
    }
  }

  if(loading) {
    return <p>Loading goals...</p>
  }

  return (
    <Box m="20px">

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

              <GoalListItem key={event.id} goalId={event.id}/>
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
              left: "",
              center: "title",
              right: "prev,next today"
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventTextColor={"black"}
            select={handleDateClick}
            eventClick={handleEventClick}
            initialEvents={[...currentGoals]}
            displayEventTime= {false}
          />
        </Box>
      </Box>
    </Box>
  )
}
 

  