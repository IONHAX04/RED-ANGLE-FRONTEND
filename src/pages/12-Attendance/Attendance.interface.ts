export interface Attendance {
  id: number;
  employee_id: number;
  date: string;
  punch_in_time: string | null;
  punch_out_time: string | null;
  total_hours: string | null;
  status: "Present" | "Absent" | "Half-day" | string;
  created_at: string;
  created_by: string | null;
}
