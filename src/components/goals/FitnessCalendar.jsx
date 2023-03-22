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

  //--------------------------------------------------------

  const addNewGoal = (goal) => {
    //console.log(currentGoals)
    setCurrentGoals([...currentGoals, goal])
    console.log(currentGoals)

    //console.log("adding goal ")
    console.log(goal.id)
  }

  const removeGoal = () => {
    const newGoals = [...currentGoals] // copy
    newGoals.splice(currentGoals.length-1, 1) // remove goal, returns the removed goal also
    setCurrentGoals(newGoals) // update state
  }

  /* const checkDate = (start) => {
    let check = formatDate(start,'yyyy-MM-dd')
    let today = formatDate(new Date(),'yyyy-MM-dd')
    if(check < today)
    {
      console.log("false")
        return false
    }
    else
    {
      console.log("false")
        return true
    }
  } */

  //-----------------------------------------------------------
  const handleDateClick = (selected) => {
    //console.log(selected)
    const title = prompt("Enter goal title")
    const calenderApi = selected.view.calendar
    calenderApi.unselect()

    // check so date is not back in time
    //checkDate()

    if(title) {
      const newGoal = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        //end: selected.endStr,
        //end: '2023-03-20',
        allDay: selected.allDay,
        color: "red"
      }
      calenderApi.addEvent(newGoal)
      addNewGoal(newGoal)
    }
  }

  const handleEventClick = (selected) => {
    //console.log(selected)
    if (window.confirm(`Remove  '${selected.event.title}'`)) {
      selected.event.remove()
      removeGoal()
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

/* const events = [
  { title: 'Goal 1', start: new Date(), end: '2023-03-20' }
]

export function FitnessCalendar() {
  return (
    <div>
      <h1>Me Fit Calender</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
        headerToolbar={{
        start: 'today,prev,next', // will normally be on the left. if RTL, will be on the right
        center: 'title',
        end: 'dayGridMonth,dayGridWeek,dayGridDay', // will normally be on the right. if RTL, will be on the left
        }}
        height="80vh"
        initialEvents={[]} // get from
      />
    </div>
  )
}

 const addWeeksToDate = (dateObj, numberOfWeeks) => {
  dateObj.setDate(dateObj.getDate() + numberOfWeeks * 7);
  return dateObj;
} 

function handleDateClick(arg) {
  alert(arg.dateStr)
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}  */

  