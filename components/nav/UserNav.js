import Link from "next/link";
import { useEffect, useState } from "react";

const UserNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
      process.browser && setCurrent(window.location.pathname)
      // console.log(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-colum nav-pills mt-2">
        <div className={`nav-link ${current === '/user' && "active"}`}>
            <Link href="/user">
                Dashboard
            </Link>
        </div>

    </div>
  )
}

export default UserNav