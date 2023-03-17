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
import GoalListItem from "./goalList/GoalListItem"

export function FitnessCalendar() {
  const [currentGoals, setCurrentGoals] = useState([])

  const handleDateClick = (selected) => {
    console.log(selected)
    const title = prompt("Enter goal title")
    const calenderApi = selected.view.calendar
    calenderApi.unselect()

    if(title) {
      calenderApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        // end: selected.endStr,
        end: '2023-03-20',
        allDay: selected.allDay
      })
    }
  }

  const handleEventClick = (selected) => {
    console.log(selected)
    if (window.confirm(`Remove  '${selected.event.title}'`)) {
      selected.event.remove()
    }
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
              <GoalListItem key={event.id} goal={event}/>
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
            eventsSet={(events) => setCurrentGoals(events)}
            initialEvents={[
              {
                id: "1",
                title: "Goal1",
                date: "2023-03-14",
              },
              {
                id: "2",
                title: "Goal2",
                date: "2023-03-28",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  )
}

// export default FitnessCalendar


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