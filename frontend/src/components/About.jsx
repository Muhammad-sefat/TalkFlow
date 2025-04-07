import { useSelector } from "react-redux";

const About = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-700">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          About Me
        </h2>

        <div className="flex flex-col items-center">
          <img
            src={
              "https://i.ibb.co.com/SwVLhnGg/guitar-with-black-body-yellow-body.jpg"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md mb-4"
          />

          {/* User Info */}
          <p className="text-left text-lg font-semibold text-gray-800">
            Name : {user?.name}
          </p>
          <p className="text-left text-gray-600 text-lg font-semibold">
            Email : {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
