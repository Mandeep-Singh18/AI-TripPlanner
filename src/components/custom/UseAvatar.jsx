import React, { useState, useRef, useEffect } from 'react';

function UserAvatar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef();

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <img
        className="rounded-full h-[35px] w-[35px] cursor-pointer"
        src={user?.picture}
        alt="User"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
          <button
            className="block w-full text-black cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;