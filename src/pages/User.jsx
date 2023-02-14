import Card from "../components/Card";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
import { getUserById } from "../store/userSlice";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

const User = () => {
  const { userid } = useParams();
  const loggedUserId = useSelector((state) => state.auth.userid);
  const { loading, error, data } = useSelector((state) => state.user);

  const avatarRef = useRef();
  const coverRef = useRef();

  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());
  }

  async function updataAvatar() {
    let imgPath;
    const [file] = avatarRef.current.files;
    const avatarImgRef = ref(storage, Date.now() + "-" + file.name);
    await uploadBytes(avatarImgRef, file)
      .then((e) => {
        imgPath =
          "https://firebasestorage.googleapis.com/v0/b/twitter-clone-362d5.appspot.com/o/" +
          e.metadata.fullPath;
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    dispatch(getUserById(userid));
  }, [userid]);

  return !loading && data && !error ? (
    <>
      <section className="header border-b pb-5 mb-5">
        <div className="header">
          {data?.cover ? (
            <img
              src={data?.cover}
              alt="cover"
              className="w-full md:h-[250px] h-[160px] object-cover"
            />
          ) : (
            <div className="w-full flex items-center justify-center md:h-[250px] h-[160px] bg-gray-100">
              <button
                onClick={() => coverRef.current.click()}
                className="py-2 rounded px-5 border-2 border-primary text-primary"
              >
                Add Cover Picture
              </button>
            </div>
          )}
        </div>
        <div className="md:px-5 px-3">
          <div className="py-5 h-[100px] flex justify-between">
            <div className="md:-translate-y-[80px] -translate-y-[60px]">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt="user avatar"
                  className="md:w-[150px] md:h-[150px] w-[120px] h-[120px] border-bg border-4 object-cover rounded-full"
                />
              ) : (
                <div className="md:w-[150px] md:h-[150px] w-[120px] h-[120px] border-bg border-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <button onClick={() => avatarRef.current.click()}>
                    <Icon
                      icon={"ic:baseline-camera-alt"}
                      className="text-6xl text-gray-300"
                    />
                  </button>
                </div>
              )}
            </div>
            <div>
              {userid === loggedUserId ? (
                <>
                  <Link
                    to="/update"
                    className="sm:text-base text-sm py-2 mr-3 rounded px-5 border-2 border-primary text-white bg-primary"
                  >
                    Update
                  </Link>
                  <button
                    onClick={logoutUser}
                    className="sm:text-base text-sm py-2 rounded px-5 border-2 border-primary text-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button className="py-2 rounded px-5 border-2 border-primary text-primary">
                  follow
                </button>
              )}
            </div>
            <input
              type="file"
              className="absolute -top-full opacity-0"
              ref={avatarRef}
              name="avatar"
              id="avatar"
            />
            <input
              type="file"
              className="absolute -top-full opacity-0"
              ref={coverRef}
              name="cover"
              id="cover"
            />
          </div>
          <div>
            <h2 className="md:text-3xl text-2xl font-medium capitalize">
              {data.displayName}
            </h2>

            <p className="text-lg text-primary">
              {data.username ? (
                "@" + data.username
              ) : (
                <Link to="/update">@username</Link>
              )}
            </p>
          </div>
          <div className="mt-5">
            <p>{data.description || "No Description"}</p>
          </div>
          <div className="flex items-center md:gap-5 gap-x-5 gap-y-2 mt-3 flex-wrap text-gray-700">
            <span>
              <span className="text-lg font-semibold text-black">
                {data.followers}
              </span>{" "}
              Followers
            </span>
            <span>
              <span className="text-lg font-semibold text-black">
                {data.followings}
              </span>{" "}
              Following
            </span>
            <span className="flex items-center gap-2">
              <Icon
                className="md:text-3xl text-2xl"
                icon="material-symbols:location-on"
              />
              {data.location || "Not Updated"}
            </span>
            <span className="flex items-center gap-2">
              <Icon
                className="md:text-3xl text-2xl"
                icon="material-symbols:date-range"
              />
              Joined Jan 2010
            </span>
          </div>
        </div>
      </section>
      <section className="py-5">
        <h3 className="text-2xl font-medium text-center">
          Don't Have Posts Yet.
        </h3>
      </section>
    </>
  ) : (
    <Loading />
  );
};

export default User;
