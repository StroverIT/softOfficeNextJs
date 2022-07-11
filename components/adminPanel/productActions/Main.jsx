import React from "react";
import { useRouter } from "next/router";

export default function Main() {
  const router = useRouter();
  const changeTypeAction = (type) => {
    // Trigger fragment change to fetch the new data
    router.push(`/adminPanel/#prodykti#${type}`, undefined, { shallow: true });
  };
  return (
    <div>
      <div>
        <button onClick={() => changeTypeAction("create")}>
          СЪЗДАЙ ПРОДУКТ
        </button>
      </div>
      <div>Get all</div>
    </div>
  );
}
