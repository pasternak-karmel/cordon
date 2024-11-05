const AccountCallback = ({ callback }: { callback: string }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      AccountCallback
      <div>{callback}</div>
    </div>
  );
};
export default AccountCallback;
