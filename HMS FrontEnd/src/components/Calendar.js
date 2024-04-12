import { ScheduleMeeting } from "react-schedule-meeting";
import { timeSlotDifference } from "react-schedule-meeting";

const Calendar = (props) => {
  const availableTimeslots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => {
    return {
      id,
      startTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          9,
          0,
          0,
          0
        )
      ),
      endTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          16,
          0,
          0,
          0
        )
      ),
    };
  });

  const unavailableTimeSlots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => {
    return {
      id,
      startTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          12,
          0,
          0,
          0
        )
      ),
      endTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          13,
          0,
          0,
          0
        )
      ),
    };
  });

  const availableTimeSlotsLessUnavailableTimeSlots = timeSlotDifference(
    availableTimeslots,
    unavailableTimeSlots
  );
  console.log(availableTimeSlotsLessUnavailableTimeSlots);
  return (
    <>
      <ScheduleMeeting
        borderRadius={10}
        primaryColor="#3f5b85"
        eventDurationInMinutes={30}
        availableTimeslots={availableTimeSlotsLessUnavailableTimeSlots}
        onStartTimeSelect={console.warn}
        selectedDateDayTitleFormatString="cccc, LLLL do"
      />
    </>
  );
};

export default Calendar;
