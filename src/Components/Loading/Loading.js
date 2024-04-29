"use client";
export default function Loading(props) {
  if (props.isLoading) {
    return (
      <div className="loading loading-spinner loading-lg text-primary mx-auto flex justify-center"></div>
    );
  } else return "";
}
