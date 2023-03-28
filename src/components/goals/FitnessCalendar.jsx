import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import listPlugin from "@fullcalendar/list";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
  Box,
  List, Typography
} from "@mui/material";
import React, { useState } from "react";

import { useEffect } from "react";
import { createGoal, deleteGoal, getGoalsByProfileId } from "../../api/goal";
import { getProfile } from "../../api/profile";
import keycloak from "../../keycloak";
import GoalListItem from "./goalList/GoalListItem";

export function FitnessCalendar() {
  const [currentGoals, setCurrentGoals] = useState([])
  const [loading, setLoading] = useState(true)

  /*
  Gets the goals from the api with the users id from the keycloak token.
  Loops through the result and sets a color of red or green depending on 
  if the goal has been achieved or not.
  Sets the state of current goals and state of loading to false.
  */
  useEffect( () => {
    const callApiForGoals = async() => {

      const data = await getGoalsByProfileId(keycloak.tokenParsed.sub)
      data[1].forEach(function (element) {
        if(element.achieved) {
          element.color="#a7fa9d" // green
        } else {
          element.color ="#ff5c5c" // red
        }        
      })
      setCurrentGoals(data[1])
      setLoading(false)
    }
    callApiForGoals()
  }, []) 

  /*
  Adds a new goal to the array held in state.
  */
  const addNewGoal = (goal) => {
    setCurrentGoals([...currentGoals, goal])
    console.log(goal.id)
  }

  /*
  Removes a goal in the array and sets the new state.
  */
  const removeGoal = (id) => {
    const newGoals = [...currentGoals] // copy
    let indexToRemove = null
    for(let i = 0; i < newGoals.length; i++) {
      if(newGoals[i].id == id) { 
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

  /*
  Calculates the end date of the goal set by user. The end date 
  becomes one week later.
  */
  const calculateEndDate = (start) => {
    let firstDay = new Date(start)
    let nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000)
    return nextWeek
  }

  /*
  Check to see so the clicked date is from today and forward, not in the past.
  */
  const checkDate = (date) => {
    return new Date(date).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0)
  }

  /*
  Handles the event of the user clicking on a date in the calendar.
  Sets a new object with the correct and selected properties.
  Posts the new goal and sets it in the calendar and adds it to the state.
  */
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

  /*
  Handles the event of user clicking a goal set in the calendar. If the user wants to
  remove the goal it is removed from calendar and deleted from api.
  */
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
 

  