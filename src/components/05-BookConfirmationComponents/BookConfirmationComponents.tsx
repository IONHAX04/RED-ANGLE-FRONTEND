import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface EventDetails {
  eventName: string;
  dateTime: Date | null;
  highlights: string;
  notes: string;
}

interface PaymentDetails {
  paymentType: "online" | "offline";
  amount: number;
  date: Date | null;
  notes: string;
}

const BookConfirmationComponents: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Event state
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    eventName: "",
    dateTime: null,
    highlights: "",
    notes: "",
  });
  const [submittedEvents, setSubmittedEvents] = useState<EventDetails[]>([]);

  // Payment state
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentType: "online",
    amount: 0,
    date: null,
    notes: "",
  });
  const [transactions, setTransactions] = useState<PaymentDetails[]>([]);
  const [overallAmount, setOverallAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  // Handle Event Submit
  const handleEventSubmit = () => {
    setSubmittedEvents([...submittedEvents, eventDetails]);
    setEventDetails({
      eventName: "",
      dateTime: null,
      highlights: "",
      notes: "",
    });
  };

  // Handle Payment Submit
  const handlePaymentSubmit = () => {
    setTransactions([...transactions, paymentDetails]);
    setPaidAmount(paidAmount + paymentDetails.amount);
    setOverallAmount(overallAmount + paymentDetails.amount);
    setPaymentDetails({
      paymentType: "online",
      amount: 0,
      date: null,
      notes: "",
    });
  };

  return (
    <div className="">
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        {/* EVENT DETAILS TAB */}
        <TabPanel header="Event Details">
          <div className="gap-4 mb-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <span className="p-float-label">
                  <InputText
                    className="w-full"
                    value={eventDetails.eventName}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        eventName: e.target.value,
                      })
                    }
                  />
                  <label>Event Name</label>
                </span>
              </div>
              <div className="flex-1">
                <Calendar
                  className="w-full"
                  value={eventDetails.dateTime}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      dateTime: e.value as Date,
                    })
                  }
                  showTime
                  hourFormat="12"
                  placeholder="Select Date & Time"
                />
              </div>
              <div className="flex-1"></div>
            </div>

            <div className="mt-3">
              <p>Highlights</p>
              <Editor
                value={eventDetails.highlights}
                onTextChange={(e) =>
                  setEventDetails({
                    ...eventDetails,
                    highlights: e.htmlValue || "",
                  })
                }
                style={{ height: "150px" }}
              />
            </div>

            <div className="mt-3">
              <p>Notes</p>
              <Editor
                value={eventDetails.notes}
                onTextChange={(e) =>
                  setEventDetails({ ...eventDetails, notes: e.htmlValue || "" })
                }
                style={{ height: "150px" }}
              />
            </div>

            <div className="flex justify-end mt-3">
              <Button
                label="Submit"
                icon="pi pi-check"
                severity="success"
                onClick={handleEventSubmit}
              />
            </div>
          </div>

          {/* Display Submitted Event Details */}
          <div className="gap-4">
            {submittedEvents.map((event, idx) => (
              <Card
                key={idx}
                title={event.eventName}
                subTitle={event.dateTime?.toString()}
              >
                <div dangerouslySetInnerHTML={{ __html: event.highlights }} />
                <div dangerouslySetInnerHTML={{ __html: event.notes }} />
              </Card>
            ))}
          </div>
        </TabPanel>

        {/* PAYMENT DETAILS TAB */}
        <TabPanel header="Payment Details">
          <div className="gap-4 mb-4">
            {/* Row 1 */}
            <div className="flex gap-3">
              <div className="flex-1">
                <p className="mb-1">Payment Type</p>
                <Dropdown
                  className="w-full"
                  value={paymentDetails.paymentType}
                  options={[
                    { label: "Online", value: "online" },
                    { label: "Offline", value: "offline" },
                  ]}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      paymentType: e.value,
                    })
                  }
                  placeholder="Select Payment Type"
                />
              </div>
              <div className="flex-1">
                <p className="mb-1">Amount</p>
                <InputText
                  className="w-full"
                  type="number"
                  placeholder="Enter Amount"
                  value={paymentDetails.amount}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      amount: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex-1">
                <p className="mb-1">Payment Date</p>
                <Calendar
                  className="w-full"
                  value={paymentDetails.date}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      date: e.value as Date,
                    })
                  }
                  placeholder="Select Payment Date"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="mt-3">
              <p className="mb-1">Notes</p>
              <InputText
                className="w-full"
                placeholder="Enter Notes"
                value={paymentDetails.notes}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    notes: e.target.value,
                  })
                }
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-3">
              <Button
                label="Submit"
                icon="pi pi-check"
                severity="success"
                onClick={handlePaymentSubmit}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mb-4">
            <Card className="flex-1" title="Overall Amount">
              <h2 className="text-2xl font-semibold">{overallAmount}</h2>
            </Card>
            <Card className="flex-1" title="Paid Amount">
              <h2 className="text-2xl font-semibold">{paidAmount}</h2>
            </Card>
          </div>

          {/* Transactions DataTable */}
          <DataTable value={transactions} paginator rows={5} showGridlines>
            <Column field="paymentType" header="Payment Type" />
            <Column field="amount" header="Amount" />
            <Column
              field="date"
              header="Date"
              body={(row) => row.date?.toLocaleDateString()}
            />
            <Column field="notes" header="Notes" />
          </DataTable>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default BookConfirmationComponents;
