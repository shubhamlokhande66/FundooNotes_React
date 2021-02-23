import React, { useState } from "react";
import ReminderIcon from "@material-ui/icons/NotificationsOutlined";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./Reminder.css";
import { Button, Card, CardContent, ClickAwayListener, Divider, Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import moment from "moment";

const Reminder = ({setDateTimeChip, setDisplayDateTime, item}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showReminder, setShowReminder] = useState(false);
  const [showDateTime, setShowDateTime] = useState(false);

  const handleDateChange = (day) => {
    setShowDateTime(false)
    setShowReminder(false)
    let time = ''
    let date = ''
    if(day === 'today'){
        date = moment(selectedDate).format("MMM Do YY")
        time = '8:00PM'
    }else if(day === 'tomorrow'){
        date = moment(selectedDate).add(1,'day').format("MMM Do YY")
        time = '8:00AM'
    }
    else{
        date = moment(selectedDate).format("MMM Do YY")
        time = moment(selectedDate).format("LT")
    }
    if(item !== undefined){
      setDateTimeChip(selectedDate)
    }else{
      setDateTimeChip(selectedDate)
      setDisplayDateTime(date+' '+time)
    }
  };

  return (
    <ClickAwayListener onClickAway={()=> setShowReminder(false)}>
    <div>
    <div className="tools">
      <ReminderIcon
        className="reminderContainer"
        onClick={() => setShowReminder(!showReminder)}
      />
      </div>
      {showReminder ? (
        <div className="dateTimeContainer">
          <Card>
            <div className="dateTimeCardContainer">
              <CardContent className="dateTimeCardContentReminder">
                Reminder:
              </CardContent>
              <CardContent className="dateTimeCardContentStyle">
                <div className="dateTimeSubCardcontentStyle"
                    onClick={()=>handleDateChange('today')}
                >
                  Later Today
                  <div>8:00PM</div>
                </div>
                <div className="dateTimeSubCardcontentStyle"
                    onClick={()=>handleDateChange('tomorrow')}
                >
                  Tomorrow
                  <div>8:00AM</div>
                </div>
                <div
                  className="pickDateTimeLabel"
                  onClick={() => setShowDateTime(!showDateTime)}
                >
                  <AccessTimeIcon  />
                  Pick date & time
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      ) : null}
      {showDateTime ? (
        <div style={{ position: "absolute" }}>
          <Card >
            <CardContent
              className="dateTimePickerContainer"
              onClick={() => setShowDateTime(!showDateTime)}
            >
              <ArrowBackIcon/>
              <div>Pick date & time</div>
            </CardContent>
            <Divider />
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar={false}
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <div className="saveButton">
                <Button color="primary" variant="text" onClick={()=>handleDateChange()}>
                  save
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
    </ClickAwayListener>
  );
};

export default Reminder;