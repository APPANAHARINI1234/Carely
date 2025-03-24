import React from "react";

const NotificationSidebar = ({ notifications, onClose, setNotifications, setUnreadCount }) => {
  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
  };

  return (
    <div className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg p-4">
      <button onClick={onClose} className="text-gray-500">❌ Close</button>
      <h2 className="text-lg font-bold">All Notifications</h2>
      <button onClick={markAllAsRead} className="text-blue-500">Mark All as Read</button>

      <div className="overflow-y-auto h-5/6">
        {notifications.map((n, index) => (
          <div key={index} className="border-b p-2">
            <p className={`text-sm font-semibold ${n.read ? "text-gray-500" : "text-black"}`}>{n.title}</p>
            <p className="text-xs">{n.body}</p>
            <p className="text-gray-500 text-xs">{n.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSidebar;
