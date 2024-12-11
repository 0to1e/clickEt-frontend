const LoginPage = () => {
  return (
    <div className="w-full h-screen bg-dark_bg text-white flex justify-center items-center">
      <div className="bg-on_dark_bg w-[60vw] h-[60vh] rounded-sm flex justify-center items-stretch">
        <div className="flex basis-[60%]">
          <form
            className="flex flex-col items-center w-full h-full justify-center px-20 gap-5"
            onSubmit={() => {}}
            method="POST"
          >
            <input
              className="w-full bg-[#3E2E2E] p-1 rounded-sm border border-primary outline-none"
              placeholder="Full name"
              type="text"
              name="full_name"
              id="full_name"
            />
            <input
              className="w-full bg-[#3E2E2E] p-1 rounded-sm border border-primary outline-none"
              placeholder="User name"
              type="text"
              name="user_name"
              id="user_name"
            />
            <input
              className="w-full bg-[#3E2E2E] p-1 rounded-sm border border-primary outline-none"
              placeholder="Email"
              type="email"
              name="email"
              id="email"
            />
            <input
              className="w-full bg-[#3E2E2E] p-1 rounded-sm border border-primary outline-none"
              placeholder="Phone number"
              type="number"
              name="phone"
              id="phone"
            />
            <input
              className="w-full bg-[#3E2E2E] p-1 rounded-sm border border-primary outline-none"
              placeholder="Password"
              type="password"
              name="password"
              id="password"
            />
          </form>
        </div>
        <div className="flex basis-[40%]">
          <div
            className="w-full bg-primary opacity-[70%]"
            style={{
              backgroundImage: "frontend/src/assets/auth/login.png",
              objectFit: "cover",
            }}
          >
            <div>rohan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
