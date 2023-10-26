import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useEffect } from "react";
import { useState } from "react";
import BookingRow from "./BookingRow";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const url = `http://127.0.0.1:5000/booking?email=${user?.email}`;

    useEffect(() => {
        fetch(url)
          .then((res) => res.json())
          .then((data) => setBookings(data));
    }, [url])

    const handleDelete = (id) => {
      const proceed = confirm("Are you sour you want to delete");
      if (proceed) {
        fetch(`http://127.0.0.1:5000/booking/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount === 1) {
                alert("Deleted Completed!");
                const remaining = bookings.filter(booking => booking._id !== id);
                setBookings(remaining);
            }
          });
      }
    };

    return (
      <div className="overflow-x-auto my-8">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Action</th>
              <th>Photo</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <BookingRow
                key={booking._id}
                booking={booking}
                handleDelete={handleDelete}
              ></BookingRow>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Bookings;