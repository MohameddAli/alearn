import Link from "next/link";
import { useEffect, useState } from "react";

const InstructorNav = () => {
    const [current, setCurrent] = useState("");

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
        // console.log(window.location.pathname);
    }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills mt-2">
        <div>
            <Link legacyBehavior href="/instructor">
                <a className={`nav-link ${current === '/instructor' && "active"}`}>
                    Dashboard
                </a>
            </Link>
        </div>
        <div>
            <Link legacyBehavior href="/instructor/course/create">
                <a className={`nav-link ${current === '/instructor/course/create' && "active"}`}>
                    Course Create
                </a>
            </Link>
        </div>
    </div>
  )
}

export default InstructorNav;