import React from "react";
import SubHeader from "../../Header/SubHeader/SubHeader";

const OverallEmployeeAttendance: React.FC = () => {
  return (
    <div>
      <SubHeader
        title="Overall Employee Attendance Report"
        subtitle={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      />
      
    </div>
  );
};

export default OverallEmployeeAttendance;
