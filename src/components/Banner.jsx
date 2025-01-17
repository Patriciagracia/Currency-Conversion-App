import React from "react";

export default function Banner() {
  return (
    <>
      <hr />
      <div className="banner row text-center d-flex align-items-center my-3 p-4">
        <div className="col-12 my-1 my-md-2 col-md-4">
          <p>
            💻 Up-to-date rates sourced from the{" "}
            <a href="https://frankfurter.dev/" target="_blank">
              {" "}
              Frankfurter API{" "}
            </a>
          </p>
        </div>
        <div className=" col-12 my-1 my-md-2 col-md-4">
          {" "}
          <p>⚡Fast conversion</p>
        </div>
        <div className="col-12 my-1 my-md-2 col-md-4">
          <p>💱 Instant calculations with high precision</p>
        </div>
      </div>

      <hr />
    </>
  );
}
