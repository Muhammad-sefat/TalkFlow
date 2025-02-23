import { useState, useEffect } from "react";
import {
  getFriends,
  getPendingRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getSentRequests,
} from "../api/friendsApi";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchFriends();
    fetchRequests();
    fetchSentRequests();
  }, []);

  const fetchFriends = async () => {
    try {
      const data = await getFriends();
      setFriends(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const data = await getPendingRequests();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSentRequests = async () => {
    try {
      const data = await getSentRequests();
      setSentRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendRequest = async () => {
    try {
      await sendFriendRequest(email);
      alert("Request sent!");
      setEmail("");
      fetchSentRequests();
    } catch (error) {
      alert(error);
    }
  };

  const handleAcceptRequest = async (senderId) => {
    try {
      await acceptFriendRequest(senderId);
      fetchFriends();
      fetchRequests();
      fetchSentRequests();
    } catch (error) {
      alert(error);
    }
  };

  const handleRejectRequest = async (senderId) => {
    try {
      await rejectFriendRequest(senderId);
      fetchRequests();
      fetchSentRequests();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Friends</h2>

      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter User Email"
        className="w-full p-2 border rounded-lg mt-4"
      />
      <button
        onClick={handleSendRequest}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mt-2"
      >
        Send Friend Request
      </button>

      <h3 className="text-lg font-bold mt-4">Pending Requests</h3>
      {requests.map((req) => (
        <div key={req._id} className="flex justify-between mt-2">
          <p>{req.name}</p>
          <div>
            <button
              onClick={() => handleAcceptRequest(req._id)}
              className="bg-green-500 text-white px-2 py-1 rounded-lg mr-1"
            >
              Accept
            </button>
            <button
              onClick={() => handleRejectRequest(req._id)}
              className="bg-red-500 text-white px-2 py-1 rounded-lg"
            >
              Reject
            </button>
          </div>
        </div>
      ))}

      <h3 className="text-lg font-bold mt-4">Sent Requests</h3>
      {sentRequests.map((req) => (
        <div key={req.receiver._id} className="flex justify-between mt-2">
          <p>
            {req.receiver.name} - {req.status}
          </p>
        </div>
      ))}

      <h3 className="text-lg font-bold mt-4">Your Friends</h3>
      {friends.map((friend) => (
        <p key={friend._id}>{friend.name}</p>
      ))}
    </div>
  );
};

export default Friends;
