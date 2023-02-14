import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

const Bottombar = () => {
  const liStyle = "";
  const linkStyle = "";
  return (
    <ul className="sm:hidden flex items-center border-b w-full py-3 px-5 justify-between">
      <li className={liStyle}>
        <Link to={"/"} className={linkStyle}>
          <Icon className="text-3xl" icon="material-symbols:home" />
        </Link>
      </li>
      <li className={liStyle}>
        <Link to={"/create"} className={linkStyle}>
          <Icon className="text-3xl" icon="ph:hash-bold" />
        </Link>
      </li>
      <li className={liStyle}>
        <Link to={"/search"} className={linkStyle}>
          <Icon className="text-3xl" icon="uil:search" />
        </Link>
      </li>
      <li className={liStyle}>
        <Link to={"/notifications"} className={linkStyle}>
          <Icon className="text-3xl" icon="ph:bell-fill" />
        </Link>
      </li>
      <li className={liStyle + " md:block hidden"}>
        <Link to={"/messages"} className={linkStyle}>
          <Icon className="text-3xl" icon="tabler:message-circle-2-filled" />
        </Link>
      </li>
      {/* <li className="mt-5 lg:w-full">
        <Link
          to={"/"}
          className="lg:w-full lg:py-2 lg:px-0 p-3 text-lg text-textColor hover:opacity-70 transition bg-primary block text-center rounded-full"
        >
          <span className="lg:block hidden">Tweet</span>
          <Icon
            className="lg:hidden block text-3xl"
            icon="fa-solid:feather-alt"
          />
        </Link>
      </li> */}
    </ul>
  );
};

export default Bottombar;
